from django.urls import path
from . import views


urlpatterns = [
    path('', views.VacancyListAPIView.as_view(), name='vacancies'),
    path('dep_vacancies/', views.DepVacancyListAPIView.as_view(),
         name='dep_vacancies'),
    path('<slug:slug>/', views.VacancyDetailAPIView.as_view(), name='vacancy'),

    # job posting reactions
    # invite resume on vacancy
    # reject resume
    path('<slug:vacancy_slug>/replies/', views.RepliesListAPIView.as_view(), name='replies'),

    # accept invite resume on vacancy by resume author
    path('<slug:vacancy_slug>/respond/', views.RespondAPIView.as_view(), name='respond'),

    # change status vacancy
    path('<slug:vacancy_slug>/status/', views.VacancyStatusAPIView.as_view(), name='status'),
]
