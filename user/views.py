import jwt
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


class LoginView(generics.GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RegisterView(generics.GenericAPIView):
    '''
        Register user, end send verify on email.
    '''

    queryset = User.objects.all()
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


class VerifyEmail(views.APIView):
    '''
        Gives the user information about the confirmation mail.
        Gives a refresh token to send here POST.
    '''

    serializer_class = EmailVerificationSerializer

    def get(self, request):
        token = request.GET.get('token')
        print(token)
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            print(payload)
            profile = Profile.objects.get(user_id=payload['user_id'])
            if not profile.is_verified:
                profile.is_verified = True
                profile.save()

            return Response({'email': 'Successfully activated'}, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError as identifer:
            return Response({'error': 'Activation Expired. Login and we will send you a confirmation email again.'},
                            status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifer:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)


class ChangePasswordView(UpdateAPIView):
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


class LogoutView(APIView):
    '''
        Adds refresh token to black list = Logout
    '''
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)

        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)