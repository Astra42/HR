from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from user.models.user import Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['tokens']

    def get_tokens(self, obj):
        profile = Profile.objects.get(user_id=obj['id'])

        return {
            'refresh': profile.tokens()['refresh'],
            'access': profile.tokens()['access']
        }


class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=68, write_only=True)
    profile = ProfileSerializer(many=False, read_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'profile']

    def validate(self, attrs):
        user_obj = User.objects.filter(
            email=attrs.get("username")).first() or User.objects.filter(
            username=attrs.get("username")).first()
        credentials = {
            'username': '',
            'password': attrs.get('password')
        }

        if user_obj:
            credentials['username'] = user_obj.username

        user = self.authenticate(credentials['username'], credentials['password'])
        if not user:
            raise AuthenticationFailed('Invalid credentials, try again.')
        if not user.is_active:
            raise AuthenticationFailed('Account disabled, contact admin.')

        profile = Profile.objects.get(user_id=user.id)
        if not profile.is_verified:
            raise AuthenticationFailed('Email is not verified. Check your email.')

        refresh = RefreshToken.for_user(user)

        return {
            'email': user.email,
            'username': user.username,
            'profile': profile,
        }

    @staticmethod
    def authenticate(username=None, password=None, **kwargs):
        from django.contrib.auth import get_user_model
        UserModel = get_user_model()
        if username is None:
            username = kwargs.get(UserModel.USERNAME_FIELD)
        try:
            user = UserModel._default_manager.get_by_natural_key(
                username)
            if user.check_password(password):
                return user
            else:
                print('invalid password')
        except UserModel.DoesNotExist:
            # Run the default password hasher once to reduce the timing
            # difference between an existing and a non-existing user (#20760).
            UserModel().set_password(password)


# class LoginSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, user):
#         token = super(LoginSerializer, cls).get_token(user)
#
#         # Add custom claims
#         token['username'] = user.username
#         return token
#
#     def validate(self, attrs):
#         '''
#             Validates the entered data by login or email.
#         '''
#         credentials = {
#             'username': '',
#             'password': attrs.get("password")
#         }
#         user_obj = User.objects.filter(
#             email=attrs.get("username")).first() or User.objects.filter(
#             username=attrs.get("username")).first()
#         if user_obj:
#             credentials['username'] = user_obj.username
#
#         user = self.authenticate(credentials['username'], credentials['password'])
#         profile = Profile.objects.get(user_id=user.id)
#
#         if not user.is_active:
#             raise AuthenticationFailed('Account disabled, contact admin.')
#         if not profile.is_verified:
#             raise AuthenticationFailed('Email is not verified. Check your email.')
#         if not user:
#             raise AuthenticationFailed('Invalid credentials, try again.')
#
#         return super().validate(credentials)
#
#     # # # # #
#     @staticmethod
#     def authenticate(username=None, password=None, **kwargs):
#         from django.contrib.auth import get_user_model
#         UserModel = get_user_model()
#         if username is None:
#             username = kwargs.get(UserModel.USERNAME_FIELD)
#         try:
#             user = UserModel._default_manager.get_by_natural_key(
#                 username)
#             if user.check_password(password):
#                 return user
#             else:
#                 print('invalid password')
#         except UserModel.DoesNotExist:
#             # Run the default password hasher once to reduce the timing
#             # difference between an existing and a non-existing user (#20760).
#             UserModel().set_password(password)


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user


class EmailVerificationSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=255)

    class Meta:
        model = User
        fields = ['token']


class ChangePasswordSerializer(serializers.Serializer):
    model = User

    old_password = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
    password2 = serializers.CharField(required=True)

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError({"old_password": "Old password is not correct."})
        return value