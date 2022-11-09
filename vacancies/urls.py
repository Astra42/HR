from django.urls import path
from . import views


urlpatterns = [
    path('', views.VacancyListAPIView.as_view(), name='vacancies'),
    path('<slug:slug>', views.VacancyDetailAPIView.as_view(), name='vacancy'),

    # job posting reactions
    # invite resume on vacancy
    # reject resume
    path('replies/<slug:slug>', views.RepliesListAPIView.as_view(), name='replies'),

    # accept invite resume on vacancy by resume author
    path('accept-invite/<slug:vacancy_slug>/<slug:resume_slug>', views.AcceptInviteAPIView.as_view(), name='accept-invite'),

    # apply resume on vacancy
    path('<slug:vacancy_slug>/apply/<slug:resume_slug>', views.ApplyAPIView.as_view(), name='apply'),
]