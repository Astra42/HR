from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken

from user.models.user import Profile


class ProfileAuthSerializer(serializers.ModelSerializer):
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
    profile = ProfileAuthSerializer(many=False, read_only=True)

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


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    default_error_message = {
        'bad_token': ('Token is expired or invalid')
    }

    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):

        try:
            RefreshToken(self.token).blacklist()

        except TokenError:
            self.fail('bad_token')


class EmailVerificationSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=255)

    class Meta:
        model = User
        fields = ['token']