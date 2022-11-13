from django.http import Http404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.generics import UpdateAPIView, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from user.serializers.profile import *


class ProfileAPI(APIView):
    serializer_class = ProfileSerializer

    def get_object(self, *args, **kwargs):
        username = self.kwargs.get("username")
        if username is not None:
            obj = get_object_or_404(User, username=username)
            if obj == None:
                raise Http404
        self.check_object_permissions(self.request, obj)
        return obj

    def get(self, request, *args, **kwargs):
        user = request.user
        serializer = ProfileSerializer(user)
        return Response(serializer.data)


class ChangePasswordAPIView(UpdateAPIView):
    '''
        Changing password with:
        [ Old password ]
        [ New password ]
        [ Confirm new password ]
    '''
    serializer_class = ChangePasswordSerializer
    model = User

    def get_object(self, queryset=None):
        return self.request.user

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
