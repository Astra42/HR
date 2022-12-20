from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from django_countries.serializer_fields import CountryField
from django_countries import countries
from rest_framework import serializers
from rest_framework_simplejwt.exceptions import AuthenticationFailed
from phonenumber_field.serializerfields import PhoneNumberField

from user.models.departments import Department
from user.models.phone import Phone
from user.models.role import Role
from user.models.tags import Tag
from user.models.user import User


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = [
            'id',
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
    number = PhoneNumberField()

    class Meta:
        model = Phone
        fields = [
            'user',
            'number',
        ]
        extra_kwargs = {
            'user': {'required': False, 'read_only': True, },
        }



class ProfileSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)
    email = serializers.EmailField(max_length=68)
    is_head = serializers.BooleanField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    birth_date = serializers.DateField()
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


class UpdateUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=False)
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    username = serializers.CharField(required=False)
    birth_date = serializers.DateField(required=False)
    photo = serializers.ImageField(required=False)
    country = CountryField(required=False)
    about_me = serializers.CharField(required=False)

    class Meta:
        model = User
        fields = [
            'email', 'first_name', 'last_name', 'username', 'birth_date',
            'photo', 'country', 'about_me',
        ]

    def validate_email(self, value):
        user = self.context['request'].user
        if User.objects.exclude(pk=user.pk).filter(email=value).exists():
            raise serializers.ValidationError({"email": "This email is already in use."})
        return value

    def validate_username(self, value):
        user = self.context['request'].user
        if User.objects.exclude(pk=user.pk).filter(username=value).exists():
            raise serializers.ValidationError({"username": "This username is already in use."})
        return value

    def update(self, instance, validated_data):
        user = self.context['request'].user

        if user.pk != instance.pk:
            raise serializers.ValidationError(
                {"authorize": "You dont have permission for this user."})

        if 'first_name' in validated_data:
            instance.first_name = validated_data['first_name']
        if 'last_name' in validated_data:
            instance.last_name = validated_data['last_name']
        if 'email' in validated_data:
            instance.email = validated_data['email']
        if 'username' in validated_data:
            instance.username = validated_data['username']
        if 'country' in validated_data:
            for code, name in countries.countries.items():
                if code == validated_data['country']:
                    instance.country = code
        if 'about_me' in validated_data:
            instance.about_me = validated_data['about_me']
        if 'photo' in validated_data:
            instance.photo = validated_data['photo']
        if 'birth_date' in validated_data:
            instance.birth_date = validated_data['birth_date']

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

            return user
        except Exception as e:
            raise AuthenticationFailed('The reset link is invalid', 401)

