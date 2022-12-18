from django.http import Http404
from rest_framework import status, mixins
from rest_framework.generics import ListCreateAPIView, \
    RetrieveUpdateDestroyAPIView, GenericAPIView
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from rest_framework.views import APIView
from config.permissions import *
from .serializers import *
from .utils import *


class VacancyListAPIView(ListCreateAPIView):
    serializer_class = VacancySerializer
    permission_classes = (IsNotEmployee,)

    def perform_create(self, serializer):
        return serializer.save(
            creator_id=self.request.user,  # Creator
            department=self.request.user.departments  # Creator Department
        )

    def get_queryset(self):
        return Vacancy.objects.filter(is_published=True)


class DepVacancyListAPIView(mixins.ListModelMixin, GenericAPIView):
    permission_classes = (IsNotEmployee,)
    serializer_class = VacancySerializer

    def get_queryset(self):
        user = self.request.user
        vacancies = Vacancy.objects.filter(department=user.departments,
                                           creator_id=user.id)
        return vacancies

    @swagger_auto_schema(
        operation_description='Department vacancies list.'
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class VacancyDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = VacancySerializer
    queryset = Vacancy.objects.filter(is_published=True)
    permission_classes = (IsNotEmployee,)
    lookup_field = 'slug'

    def perform_create(self, serializer):
        return serializer.save(updated_at=self.request.data)


class RepliesListAPIView(APIView):
    serializer_class = RepliesSerializer
    permission_classes = (RepliesPermission,)
    queryset = Vacancy.objects.all()
    lookup_field = 'slug'

    def perform_create(self, serializer):
        return serializer.save(
            creator_id=self.request.user,
            department=self.request.user.departments
        )

    @swagger_auto_schema(
        operation_description='Returns a list of resumes and their '
                              'creators who responded to the job.'
    )
    def get(self, request, *args, **kwargs):
        try:
            vacancy = get_object_or_404(self.queryset, slug=kwargs['vacancy_slug'])
        except Http404:
            return Response({
                'error': 'The vacancy does not exist, or has '
                         'been withdrawn from publication.'
            }, status=status.HTTP_404_NOT_FOUND)

        serializer = RepliesSerializer(vacancy)
        return Response(serializer.data)

    @swagger_auto_schema(
        manual_parameters=[swagger_param('resume_slug', 'Add resume on vacancy')],
        operation_description='Sends an email to an employee of the company, '
                              'which contains an invitation to the position. '
                              'He must follow the link in it or add himself '
                              'to the open position.')
    def post(self, request, *args, **kwargs):
        error = Response({
            'error': 'The employee did not post his or her '
                     'resume for the job search.'
        }, status=status.HTTP_404_NOT_FOUND)
        resume_slug = request.GET.get('resume_slug')

        try:
            resume = get_object_or_404(Resume.objects.all(), slug=resume_slug)
        except Http404:
            return error

        if not resume.is_published:
            return error

        email = get_object_or_404(User.objects.all(), id=resume.creator_id.id).email
        vacancy = get_object_or_404(Vacancy.objects.all(), slug=kwargs['vacancy_slug'])
        send_invite_email(email, request, resume=resume, vacancy=vacancy)

        return Response({
            'ok': f'You are invite {resume.title} resume to vacancy.'
        }, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        manual_parameters=[swagger_param('resume_slug', 'Reject resume on vacancy')],
        operation_description='Removes the resume from the '
                              'list of those who responded to the '
                              'job. This is essentially a rejection.')
    def delete(self, request, *args, **kwargs):
        try:
            resume = get_object_or_404(Resume.objects.all(), slug=request.GET.get('resume_slug'))
            vacancy = get_object_or_404(Vacancy.objects.all(), slug=kwargs['vacancy_slug'])
        except Http404:
            return Response({
                'error': 'Incorrect identifier.'
            }, status=status.HTTP_404_NOT_FOUND)

        vacancy.resumes.remove(resume)
        return Response(status=status.HTTP_204_NO_CONTENT)


class RespondAPIView(APIView):
    @swagger_auto_schema(
        operation_description='Allows the job seeker to '
                              'respond to the vacancy.'
    )
    def patch(self, request, *args, **kwargs):
        try:
            user = request.user
            resume = get_object_or_404(Resume.objects.all(), creator_id=user.id)
            vacancy = get_object_or_404(Vacancy.objects.all(), slug=kwargs['vacancy_slug'])
        except Http404:
            return Response({
                'error': 'Incorrect identifier.'
            }, status=status.HTTP_404_NOT_FOUND)

        if vacancy.is_published and resume.is_published:
            vacancy.resumes.add(resume)
            return Response({
                'ok': f'You sent your resume {resume.title} for the position resume to vacancy {vacancy.title}.'
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'error': 'The vacancy has been closed or resume not active.'
            }, status=status.HTTP_200_OK)


class VacancyStatusAPIView(APIView):
    permission_classes = (RepliesPermission,)
    serializer_class = VacancyStatusSerializer

    @swagger_auto_schema(
        manual_parameters=[swagger_param('status', 'Change vacancy status', type=openapi.TYPE_BOOLEAN)],
        operation_description='Changes the status of a vacancy to open or closed. (Removes it from the publication and no more)'
    )
    def patch(self, request, *args, **kwargs):
        try:
            vacancy = get_object_or_404(Vacancy.objects.all(), slug=kwargs['vacancy_slug'])
        except Http404:
            return Response({
                'error': 'Incorrect identifier.'
            }, status=status.HTTP_404_NOT_FOUND)

        data = {'is_published': request.GET.get('status')}
        serializer = VacancyStatusSerializer(vacancy, data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            if serializer.data["is_published"] is True:
                response = {'ok': 'Vacancy status is open', }
            else:
                response = {'ok': 'Vacancy status is close', }

            return Response(response, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
