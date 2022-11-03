import jwt
from djoser.serializers import UserSerializer
from rest_framework.permissions import AllowAny
from rest_framework import generics, status, views
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import UpdateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from config import settings
from .serializers import *
from .utils import Util
from .models.user import Profile


class ProfileAPIList(generics.ListCreateAPIView,):

    def get(self, request):
        serializer = UserSerializer(request.user)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        try:
            serializer = UserSerializer(request.user, context={'request': request})
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class LoginAPIView(generics.GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        user_data = serializer.data
        username = user_data['username']
        try:
            user = User.objects.get(username=username)
            if not Profile.objects.get(user_id=user.id).is_verified:
                Util.send_email({'email': user.email}, request)

                return Response({'ok': f'Hello, {user}! We sent you a confirmation email.'},  status=status.HTTP_200_OK)
        except:
            pass

        return Response(serializer.data, status=status.HTTP_200_OK)


class RegisterAPIView(generics.GenericAPIView):
    '''
        Register user, end send verify on email.
    '''

    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data

        Util.send_email(user_data, request)

        return Response(user_data, status=status.HTTP_201_CREATED)


class VerifyEmailAPIView(views.APIView):
    '''
        Gives the user information about the confirmation mail.
        Gives a refresh token to send here POST.
    '''

    serializer_class = EmailVerificationSerializer

    def get(self, request):
        token = request.GET.get('token')

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            print(payload)
            profile = Profile.objects.get(user_id=payload['user_id'])
            if not profile.is_verified:
                profile.is_verified = True
                profile.save()
            else:
                return Response({'ok': 'The account is already verified.'})
            return Response({'email': 'Successfully activated'}, status=status.HTTP_200_OK)

        except jwt.ExpiredSignatureError as identifer:
            return Response({'error': 'Activation Expired.'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifer:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)


class ChangePasswordAPIView(UpdateAPIView):
    '''
        Changing password with:
        [ Old password ]
        [ New password ]
        [ Confirm new password ]
    '''
    serializer_class = ChangePasswordSerializer
    model = User

    def get_object(self, queryset=None):
        return self.request.user

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutAPIView(generics.GenericAPIView):
    '''
        You need an access token for headers and a refresh token for the form.
    '''

    serializer_class = LogoutSerializer

    permission_classes = (IsAuthenticated,)

    def post(self, request):

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({'ok': 'Bye!'}, status=status.HTTP_204_NO_CONTENT)
