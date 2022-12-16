from django.urls import path
from . import views


urlpatterns = [
    path('', views.ResumeListAPIView.as_view(), name='vacancies'),
    path('<slug:slug>/', views.ResumeDetailAPIView.as_view(), name='vacancies'),
]