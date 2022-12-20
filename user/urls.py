from django.urls import path, include, re_path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView

from user.views.profile import *
from user.views.authentication import *

urlpatterns = [
    path('login/', LoginAPIView.as_view(), name='auth_login'),
    # Update access token
    path('login/refresh/', TokenRefreshView.as_view(), name='auth_refresh'),
    # Check refresh token verify
    path('verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('logout/', LogoutAPIView.as_view(), name='auth_logout'),
    path('register/', RegisterAPIView.as_view(), name='auth_register'),
    path('email_verify/', VerifyEmailAPIView.as_view(), name='email_verify'),
    path('change_password/', ChangePasswordAPIView.as_view(), name='auth_change_password'),
    path('my_profile/', MyProfileAPI.as_view(), name='my_profile'),
    path('update_profile/<str:username>/', UpdateProfileView.as_view(), name='update_profile'),

    # Profile by username
    path('profile/<str:username>/', ProfileAPI.as_view(), name='profile'),

    # Password reset
    path('request-reset-email/', RequestPasswordResetEmail.as_view(), name="request-reset-email"),
    # path('password-reset/<uidb64>/<token>/', PasswordTokenCheckAPI.as_view(), name='password-reset-confirm'),
    path('password-reset-complete/', SetNewPasswordAPIView.as_view(), name='password-reset-complete'),

    # Phones POST or DELETE
    path('phones/', PhoneAPI.as_view(), name='phones'),

    # Get request user resume
    path('get_resume/', GetResumeAPI.as_view(), name='get_resume'),

    # Country list for form
    path('counties/', CountryList.as_view(), name='country_list'),

]
