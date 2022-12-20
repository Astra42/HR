from django.urls import path
from . import views


urlpatterns = [
    path('', views.ResumeListAPIView.as_view()),
    # Get request user resume
    path('get_resume/', views.GetResumeAPI.as_view(), name='get_resume'),
    path('<slug:slug>/', views.ResumeDetailAPIView.as_view(), name='resume_detail'),
]