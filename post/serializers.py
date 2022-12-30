from rest_framework import serializers
from .models import DollidoLstId
from accounts.serializers import UserSerializer

# https://velog.io/@kmnkit/drf-rwonly
class PostSerializer(serializers.ModelSerializer):
  # user_id = serializers.ReadOnlyField(source='user.username')
  class Meta:
    model = DollidoLstId
    fields = '__all__'
