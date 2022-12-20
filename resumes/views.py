from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, \
    RetrieveUpdateDestroyAPIView, GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import Http404
from config.permissions import ResumePermission
from .serializers import *


class ResumeListAPIView(ListCreateAPIView):
    serializer_class = ResumeSerializer
    queryset = Resume.objects.filter(is_published=True)
    permission_classes = (ResumePermission,)

    def perform_create(self, serializer):
        return serializer.save(creator_id=self.request.user)

    def get_queryset(self):
        return self.queryset.all()


class ResumeDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = ResumeSerializer
    queryset = Resume.objects.filter(is_published=True)
    permission_classes = (ResumePermission,)
    lookup_field = 'slug'

    def perform_create(self, serializer):
        return serializer.save(updated_date=self.request.data)


class GetResumeAPI(GenericAPIView):
    queryset = Resume.objects.all()
    serializer_class = ResumeSerializer

    @swagger_auto_schema(
        operation_description='Get resume id for user.'
    )
    def get(self, request, *args, **kwargs):
        try:
            resume = get_object_or_404(self.queryset, creator_id=request.user.id)
            serializer = self.serializer_class(resume)
            return Response(serializer.data)
        except Http404:
            return Response({
                'error': 'The resume does not exist.'
            }, status=status.HTTP_404_NOT_FOUND)

        return Response({"resume_slug": resume.slug, "resume_id": resume.id}, status=status.HTTP_200_OK)

