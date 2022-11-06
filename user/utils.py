from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMessage
from user.models.user import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.urls import reverse


class Util:
    @staticmethod
    def send_email(user_data, request):
        '''
            Sends a confirmation link by email. (refresh token)
        '''
        user = User.objects.get(email=user_data['email'])

        token = RefreshToken.for_user(user).access_token
        current_site = get_current_site(request).domain
        relative_link = reverse('email_verify')
        absurl = 'http://' + current_site + relative_link + "?token=" + str(token)
        email_body = 'Hi, ' + user.username + '!\nUse link to verify your email. \n' + absurl
        data = {
            'email_body': email_body,
            'to_email': user.email,
            'email_subject': 'Verify your email'}
        # Send
        email = EmailMessage(
            subject=data['email_subject'],
            body=data['email_body'],
            to=[data['to_email']],
            from_email=settings.EMAIL_HOST_USER + '@yandex.ru',
        )
        email.send()
