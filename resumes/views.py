from rest_framework.generics import ListCreateAPIView, \
    RetrieveUpdateDestroyAPIView

from .models import Resume
from .permissions import *
from .serializers import *


class ResumeListAPIView(ListCreateAPIView):
    serializer_class = ResumeSerializer
    queryset = Resume.objects.all()
    permission_classes = (IsCreator,)

    def perform_create(self, serializer):
        return serializer.save(creator_id=self.request.user)

    def get_queryset(self):
        return self.queryset.all()


class ResumeDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = ResumeSerializer
    queryset = Resume.objects.all()
    permission_classes = (IsCreator,)
    lookup_field = 'slug'

    def perform_create(self, serializer):
        return serializer.save(updated_date=self.request.data)
