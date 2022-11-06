from django.urls import path
from . import views


urlpatterns = [
    path('', views.VacancyListAPIView.as_view(), name='vacancies'),
    path('<slug:slug>', views.VacancyDetailAPIView.as_view(), name='vacancies'),
]