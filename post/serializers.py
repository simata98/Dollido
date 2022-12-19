from rest_framework import serializers
from .models import DollidoLstId

# https://velog.io/@kmnkit/drf-rwonly
class PostSerializer(serializers.ModelSerializer):
  user = serializers.ReadOnlyField(source='dollidolstid.user_id')
  image_url = serializers.ImageField(required=True)
  
  class Meta:
    model = User
    fields = fields = '__all__'