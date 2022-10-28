from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


class TestView(APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        return Response({
            'ok': 'ура, мы получили доступ к странице!'
        })
