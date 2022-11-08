from django.urls import path
from . import views


urlpatterns = [
    path('', views.VacancyListAPIView.as_view(), name='vacancies'),
    path('<slug:slug>', views.VacancyDetailAPIView.as_view(), name='vacancy'),

    # job posting reactions
    path('replies/<slug:slug>', views.RepliesListAPIView.as_view(), name='replies'),
    #
    # # invite resume on vacancy
    # path('replies/<slug:slug>/invite', views.VacancyDetailAPIView.as_view(), name='replies-invite'),
    #
    # # reject resume
    # path('replies/<slug:slug>/reject', views.VacancyDetailAPIView.as_view(), name='replies-reject'),
    #
    # # confirm resume on vacancy
    # path('replies/<slug:slug>/confirm', views.VacancyDetailAPIView.as_view(), name='replies-confirm'),
]