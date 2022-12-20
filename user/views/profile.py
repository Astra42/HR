import os

from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMessage
from django.http import Http404, HttpResponsePermanentRedirect
from django.urls import reverse
from django.utils.encoding import smart_bytes, smart_str, \
    DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.generics import UpdateAPIView, GenericAPIView, \
    RetrieveAPIView, CreateAPIView, DestroyAPIView
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from config import settings
from resumes.models import Resume
from user.serializers.profile import *
from vacancies.utils import swagger_param
from django_countries import countries


class CustomRedirect(HttpResponsePermanentRedirect):

    allowed_schemes = ['http', 'https']


class MyProfileAPI(APIView):
    serializer_class = ProfileSerializer

    def get_object(self, queryset=None):
        return self.request.user

    def get(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = ProfileSerializer(user)

        return Response(serializer.data)


class UpdateProfileView(UpdateAPIView):
    lookup_field = 'username'
    queryset = User.objects.all()
    serializer_class = UpdateUserSerializer


class ProfileAPI(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = 'username'


class ChangePasswordAPIView(GenericAPIView):
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

    def patch(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class ChangeEmailAPIView(GenericAPIView):
#     '''
#         Changing email with:
#         [ Old email ]
#         [ New email ]
#     '''
#     serializer_class = ChangeEmailSerializer
#     model = User
#
#     def get_object(self, queryset=None):
#         return self.request.user
#
#     def patch(self, request, *args, **kwargs):
#         user = self.get_object()
#         serializer = self.get_serializer(data=request.data)
#
#         if serializer.is_valid():
#             response = {
#                 'status': 'success',
#                 'code': status.HTTP_200_OK,
#                 'message': 'email updated successfully',
#                 'data': []
#             }
#
#             return Response(response)
#
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RequestPasswordResetEmail(GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer

    @swagger_auto_schema(operation_description='Send email for reset email.')
    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        email = request.data.get('email', '')

        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            current_site = get_current_site(
                request=request).domain
            relativeLink = reverse(
                'password-reset-confirm',
                kwargs={'uidb64': uidb64, 'token': token})

            absurl = 'http://' + current_site + relativeLink
            email_body = 'Hello, \n Use link below to reset your password  \n' + \
                         absurl
            data = {'email_body': email_body, 'to_email': user.email,
                    'email_subject': 'Reset your passsword'}

            email = EmailMessage(
                subject=data['email_subject'],
                body=data['email_body'],
                to=[data['to_email']],
                from_email=settings.EMAIL_HOST_USER + '@yandex.ru',
            )
            email.send()

            return Response(
                {'success': 'We have sent you a link to reset your password'},
                status=status.HTTP_200_OK)

        return Response(
            {'success': "This email isn't registered"},
            status=status.HTTP_200_OK)


class PasswordTokenCheckAPI(GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    @swagger_auto_schema(operation_description='Token and uid verification')
    def get(self, request, uidb64, token):
        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'error': 'Token not valid'})

            return Response({'success': True, 'message': 'Valid',
                             'uidb64': uidb64, 'token': token})

        except DjangoUnicodeDecodeError as identifier:
            return Response(
                {'error': 'Token is not valid, please request a new one'},
                status=status.HTTP_400_BAD_REQUEST)


class SetNewPasswordAPIView(GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    @swagger_auto_schema(operation_description='Change password from email')
    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success': True, 'message': 'Password reset success'},
                        status=status.HTTP_200_OK)


class CountryList(APIView):
    @swagger_auto_schema(
        operation_description='List countries codes and names.')
    def get(self, request, *args, **kwargs):
        data = {}
        for code, name in countries.countries.items():
            data[code] = name
        return Response(data)


class PhoneAPI(CreateAPIView, DestroyAPIView):
    serializer_class = PhoneSerializer
    queryset = Phone.objects.all()

    @swagger_auto_schema(
        operation_description='Add phone number to account')
    def post(self, request, *args, **kwargs):
        try:
            phone = get_object_or_404(self.queryset, number=request.data['number'])
            return Response({
                'error': 'This phone number is already busy.'
            }, status=status.HTTP_400_BAD_REQUEST)

        except Http404:
            request.data['number'] = '+' + request.data['number']
            return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)


    @swagger_auto_schema(
        manual_parameters=[swagger_param('number', 'phone number')],
        operation_description='Delete phone number from account')
    def delete(self, request, *args, **kwargs):
        try:
            number = request.GET.get('number')
            phone = get_object_or_404(self.queryset, number=number)
            if phone.user == request.user:
                request.data['number'] = number
                self.perform_destroy(phone)
                return Response(status=status.HTTP_204_NO_CONTENT)
            return Response({
                'error': 'This phone does not belong to you.'
            }, status=status.HTTP_400_BAD_REQUEST)

        except Http404:
            return Response({
                'error': 'This phone does not exist.'
            }, status=status.HTTP_400_BAD_REQUEST)

