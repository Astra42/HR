from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMessage
from user.models.user import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.urls import reverse


class Util:
    @staticmethod
    def send_email(email, request, resume, vacancy):
        '''
            Sends a confirmation link by email. (refresh token)
        '''

        absurl = 'http://127.0.0.1:8000/vacancies/accept-invite/' + vacancy + "/" + resume
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
