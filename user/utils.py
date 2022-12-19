from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMessage
from user.models.user import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.urls import reverse


def send_email(data):
    """Sends a confirmation link by email. (refresh token)"""
    email = EmailMessage(
        subject=data['email_subject'],
        body=data['email_body'],
        to=[data['to_email']],
        from_email=settings.EMAIL_HOST_USER + '@yandex.ru',
    )
    email.send()


def send_verify_email(user_data, request):
    user = User.objects.get(email=user_data['email'])
    token = RefreshToken.for_user(user).access_token
    current_site = get_current_site(request).domain
    relative_link = reverse('email_verify')
    abs_url = 'http://' + current_site + relative_link + "?token=" + str(token)
    email_body = 'Hi, ' + user.username + '!\nUse link to verify your email. \n' + abs_url

    data = {
        'email_body': email_body,
        'to_email': user.email,
        'email_subject': 'Verify your email'
    }
    send_email(data)

