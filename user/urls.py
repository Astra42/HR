from django.urls import path, include, re_path
from rest_framework_simplejwt.views import TokenRefreshView

from user.views import *


urlpatterns = [
    path('login/', LoginView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='auth_logout'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('email_verify/', VerifyEmail.as_view(), name='email_verify'),
    path('change_password/', ChangePasswordView.as_view(), name='auth_change_password'),
]