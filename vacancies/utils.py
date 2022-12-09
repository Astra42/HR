from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMessage
from drf_yasg import openapi
from django.urls import reverse


def send_invite_email(email, request, resume, vacancy):
    """Sends a confirmation link by email. (refresh token)"""

    current_site = get_current_site(request).domain
    relative_link = reverse('vacancies')
    abs_url = 'http://' + current_site + '/api/vacancies/' + vacancy.slug + '/respond'
    email_body = 'Hi!\nYou will be invite on vacancy!  \n' + abs_url

    data = {
        'email_body': email_body,
        'to_email': email,
        'email_subject': f'Your resume {resume.title} will be invite on vacancy {vacancy.title}!'}
    # Send
    email = EmailMessage(
        subject=data['email_subject'],
        body=data['email_body'],
        to=[data['to_email']],
        from_email=settings.EMAIL_HOST_USER + '@yandex.ru',
    )
    email.send()


def swagger_param(title: str, desc: str, req: bool = True,
                  type=openapi.TYPE_STRING) -> openapi.Parameter:
    return openapi.Parameter(
        title, in_=openapi.IN_QUERY, description=desc,
        type=type, required=req
    )
