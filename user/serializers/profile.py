from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from django_countries.serializer_fields import CountryField
from rest_framework import serializers
from rest_framework_simplejwt.exceptions import AuthenticationFailed

from user.models.departments import Department
from user.models.phone import Phone
from user.models.role import Role
from user.models.tags import Tag
from user.models.user import User


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = [
            'title',
        ]


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = [
            'title',
        ]


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = [
            'title',
        ]


class PhoneSerializer(serializers.ModelSerializer):
    number = serializers.CharField()

    class Meta:
        model = Phone
        fields = [
            'number',
        ]


class ProfileSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)
    email = serializers.EmailField(max_length=68)
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    birth_date = serializers.DateTimeField()
    country = CountryField(name_only=True)
    photo = serializers.ImageField()
    phone_set = PhoneSerializer(many=True, read_only=True)
    departments = DepartmentSerializer(read_only=True)
    head_of_department = DepartmentSerializer(source='department',
                                              read_only=True)
    about_me = serializers.CharField()
    tags = TagSerializer(many=True)
    roles = RoleSerializer(many=True)

    class Meta:
        model = User
        fields = ('phones',)

    def update(self, instance, validated_data):
        if validated_data.get('username'):
            instance.username = validated_data.get('username',
                                                   instance.username)

        if validated_data.get('first_name'):
            instance.username = validated_data.get('first_name',
                                                   instance.first_name)

        if validated_data.get('last_name'):
            instance.username = validated_data.get('last_name',
                                                   instance.last_name)

        instance.save()
        return instance


class ChangePasswordSerializer(serializers.Serializer):
    model = User
    old_password = serializers.CharField(min_length=6, max_length=68, write_only=True)
    password = serializers.CharField(min_length=6, max_length=68, write_only=True)
    password2 = serializers.CharField(min_length=6, max_length=68, write_only=True)

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        password = attrs.get('password')
        user = self.context['request'].user
        user.set_password(password)
        user.save()

        return attrs

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError({"old_password": "Old password is not correct."})
        return value


class ResetPasswordEmailRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)

    class Meta:
        fields = ['email']


class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(min_length=6, max_length=68, write_only=True)
    token = serializers.CharField(min_length=1, write_only=True)
    uidb64 = serializers.CharField(min_length=1, write_only=True)

    class Meta:
        fields = ['password', 'token', 'uidb64']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            token = attrs.get('token')
            uidb64 = attrs.get('uidb64')

            id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('The reset link is invalid', 401)

            user.set_password(password)
            user.save()

            return (user)
        except Exception as e:
            raise AuthenticationFailed('The reset link is invalid', 401)
