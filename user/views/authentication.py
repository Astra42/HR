import jwt
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.permissions import AllowAny
from rest_framework import generics, status, views
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from config import settings
from user.serializers.authentication import *
from user.serializers.profile import *
from user.utils import *


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
            if not user.is_verified:
                send_email({'email': user.email}, request)

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
        send_verify_email(user_data, request)

        return Response(user_data, status=status.HTTP_201_CREATED)


class VerifyEmailAPIView(views.APIView):
    '''
        Gives the user information about the confirmation mail.
        Gives a refresh token to send here POST.
    '''

    serializer_class = EmailVerificationSerializer

    token_param_config = openapi.Parameter(
        'token', in_=openapi.IN_QUERY, description='Access token', type=openapi.TYPE_STRING)

    @swagger_auto_schema(manual_parameters=[token_param_config])
    def get(self, request):
        token = request.GET.get('token')

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            print(payload)
            user = User.objects.get(id=payload['user_id'])
            if not user.is_verified:
                user.is_verified = True
                user.save()
            else:
                return Response({'ok': 'The account is already verified.'})
            return Response({'email': 'Successfully activated'}, status=status.HTTP_200_OK)

        except jwt.ExpiredSignatureError as identifer:
            return Response({'error': 'Activation Expired.'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifer:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)


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
