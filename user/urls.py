from django.urls import path, include, re_path
from rest_framework_simplejwt.views import TokenRefreshView

from user.views.profile import *
from user.views.authentication import *


urlpatterns = [
    path('login/', LoginAPIView.as_view(), name='auth_login'),
    path('login/refresh/', TokenRefreshView.as_view(), name='auth_refresh'),
    path('logout/', LogoutAPIView.as_view(), name='auth_logout'),
    path('register/', RegisterAPIView.as_view(), name='auth_register'),
    path('email_verify/', VerifyEmailAPIView.as_view(), name='email_verify'),
    path('change_password/', ChangePasswordAPIView.as_view(), name='auth_change_password'),
    path('profile/', ProfileAPI.as_view(), name='profile'),

]