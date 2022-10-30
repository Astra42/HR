from .serializers import NewTokenObtainPairSerializer, ChangePasswordSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import RegisterSerializer
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import UpdateAPIView
from rest_framework import generics
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken


class NewObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = NewTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


class ChangePasswordView(UpdateAPIView):
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
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)

        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)