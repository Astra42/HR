from django.contrib.auth.models import User
from django.utils.safestring import mark_safe
from rest_framework import serializers

from user.models.departments import Department
from user.models.user import Profile


class DepartmentProfileADDSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = [
            'title',
        ]


class DepartmentADDSerializer(serializers.ModelSerializer):

    class Meta:
        model = Department
        fields = [
            'title'
        ]


class ProfileADDSerializer(serializers.ModelSerializer):
    department = DepartmentProfileADDSerializer(many=False, read_only=True)

    class Meta:
        model = Profile
        fields = [
            'photo',
            'roles',
            'tags',
            'department',
        ]


class ProfileSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)
    email = serializers.EmailField(max_length=68)
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    profile = ProfileADDSerializer(many=False, read_only=True)
    head_of_department = DepartmentADDSerializer(source='department', read_only=True)

    class Meta:
        model = User
        fields = '__all__'

    def update(self, instance, validated_data):
        if validated_data.get('username'):
            instance.username = validated_data.get('username', instance.username)

        if validated_data.get('first_name'):
            instance.username = validated_data.get('first_name', instance.first_name)

        if validated_data.get('last_name'):
            instance.username = validated_data.get('last_name', instance.last_name)

        instance.save()
        return instance



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