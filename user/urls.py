from django.urls import path, include, re_path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView

from user.views.profile import *
from user.views.authentication import *

urlpatterns = [
    path('login/', LoginAPIView.as_view(), name='auth_login'),
    path('login/refresh/', TokenRefreshView.as_view(), name='auth_refresh'),
    path('verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('logout/', LogoutAPIView.as_view(), name='auth_logout'),
    path('register/', RegisterAPIView.as_view(), name='auth_register'),
    path('email_verify/', VerifyEmailAPIView.as_view(), name='email_verify'),
    path('change_password/', ChangePasswordAPIView.as_view(),
         name='auth_change_password'),
    # path('change_email/', ChangeEmailAPIView.as_view(),
    #      name='auth_change_email'),
    path('profile/', ProfileAPI.as_view(), name='profile'),
    path('request-reset-email/', RequestPasswordResetEmail.as_view(),
         name="request-reset-email"),
    path('password-reset/<uidb64>/<token>/',
         PasswordTokenCheckAPI.as_view(), name='password-reset-confirm'),
    path('password-reset-complete', SetNewPasswordAPIView.as_view(),
         name='password-reset-complete')
]
