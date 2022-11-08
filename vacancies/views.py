from rest_framework.generics import ListCreateAPIView, \
    RetrieveUpdateDestroyAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .permissions import *
from .serializers import *


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


class RepliesListAPIView(RetrieveAPIView):
    serializer_class = RepliesSerializer
    queryset = Vacancy.objects.all()
    lookup_field = 'slug'
    permission_classes = (RepliesPermission,)

    def perform_create(self, serializer):
        return serializer.save(creator_id=self.request.user,
                               department=self.request.user.departments)

    def get_queryset(self):
        user = self.request.user

        return self.queryset
