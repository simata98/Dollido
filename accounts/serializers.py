from accounts.models import User, UserManager
from rest_framework import serializers

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserManager
        fields = "__all__"

class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"