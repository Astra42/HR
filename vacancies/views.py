from rest_framework.generics import ListCreateAPIView, \
    RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated

from .permissions import *
from .serializers import *


class VacancyListAPIView(ListCreateAPIView):
    serializer_class = VacancySerializer
    queryset = Vacancy.objects.all()

    def perform_create(self, serializer):
        return serializer.save(creator_id=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(creator_id=self.request.user)


class VacancyDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = VacancySerializer
    queryset = Vacancy.objects.all()
    permission_classes = (IsHead,)
    lookup_field = 'slug'

    def perform_create(self, serializer):
        return serializer.save(creator_id=self.request.user)
