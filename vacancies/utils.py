from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMessage
from drf_yasg import openapi

from user.models.user import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.urls import reverse


def send_email(email, request, resume, vacancy):
    '''
        Sends a confirmation link by email. (refresh token)
    '''

    absurl = 'http://127.0.0.1:8000/vacancies/' + vacancy + '/respond'
    email_body = 'Hi!\nYou will be invite on vacancy!  \n' + absurl
    data = {
        'email_body': email_body,
        'to_email': email,
        'email_subject': 'You will be invite on vacancy!'}
    # Send
    email = EmailMessage(
        subject=data['email_subject'],
        body=data['email_body'],
        to=[data['to_email']],
        from_email=settings.EMAIL_HOST_USER + '@yandex.ru',
    )
    email.send()


def swagger_param(title: str,
                  desc: str,
                  req: bool = True,
                  type=openapi.TYPE_STRING) -> openapi.Parameter:
    return openapi.Parameter(
        title, in_=openapi.IN_QUERY, description=desc,
        type=type, required=req
    )
