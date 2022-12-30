from rest_framework.serializers import ModelSerializer
from post.models import ApiListId
from post.models import DollidoLstId

class ApiSerializer(ModelSerializer):
    class Meta:
        model = ApiListId
        fields = '__all__'

class DollidoSerializer(ModelSerializer):
    class Meta:
        model = DollidoLstId
        fields = '__all__'
