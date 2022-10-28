from django.urls import path, include, re_path

from user.views import *

urlpatterns = [
    path("", TestView.as_view()),
]