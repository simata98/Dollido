from rest_framework import serializers
from .models import DollidoLstId

# https://velog.io/@kmnkit/drf-rwonly
class PostSerializer(serializers.ModelSerializer):
  user = serializers.ReadOnlyField(source='dollidolstid.user_id')  
  class Meta:
    model = DollidoLstId
    fields = '__all__'