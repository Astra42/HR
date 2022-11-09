from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, RetrieveAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.views import APIView

from .permissions import *
from .serializers import *
from .utils import Util


class VacancyListAPIView(ListCreateAPIView):
    serializer_class = VacancySerializer
    queryset = Vacancy.objects.all()
    permission_classes = (IsHead,)

    def perform_create(self, serializer):
        return serializer.save(creator_id=self.request.user,
                               department=self.request.user.departments)

    def get_queryset(self):
        return self.queryset.all()


class VacancyDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = VacancySerializer
    queryset = Vacancy.objects.all()
    permission_classes = (IsHead,)
    lookup_field = 'slug'

    def perform_create(self, serializer):
        return serializer.save(updated_at=self.request.data)


class RepliesListAPIView(ListCreateAPIView):
    serializer_class = RepliesSerializer
    queryset = Vacancy.objects.all()
    lookup_field = 'slug'
    permission_classes = (RepliesPermission,)

    def perform_create(self, serializer):
        return serializer.save(creator_id=self.request.user,
                               department=self.request.user.departments)

    def get_queryset(self):
        return self.queryset

    def create(self, request, *args, **kwargs):
        resume = Resume.objects.get(slug=request.data['slug'])
        vacancy = Vacancy.objects.get(slug=kwargs['slug'])

        email = User.objects.get(id=resume.creator_id.id).email
        Util.send_email(email, request, resume=request.data['slug'], vacancy=kwargs['slug'])

        return Response({
            'ok': f'u are invite "{resume.title}" resume to vacancy'
        })

    reject_param_config = openapi.Parameter(
        'resume', in_=openapi.IN_QUERY, description='data', type=openapi.TYPE_STRING)

    @swagger_auto_schema(manual_parameters=[reject_param_config])
    def delete(self, request, *args, **kwargs):
        resume = Resume.objects.get(slug=request.GET.get('resume'))
        vacancy = Vacancy.objects.get(slug=kwargs['slug'])
        vacancy.resumes.remove(resume)
        return Response({
            'ok': f'u are reject "{resume.title}" resume'
        })


class AcceptInviteAPIView(APIView):
    permission_classes = (ResumeAccept,)

    def get(self, request, *args, **kwargs):

        resume = Resume.objects.get(slug=kwargs['resume_slug'])
        vacancy = Vacancy.objects.get(slug=kwargs['vacancy_slug'])
        vacancy.resumes.add(resume)
        return Response({
            'ok': f'u are invite "{resume.title}" resume to vacancy'
        })


class ApplyAPIView(CreateAPIView):
    pass
