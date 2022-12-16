from rest_framework.serializers import ModelSerializer
from post.models import ApiListId

class ApiSerializer(ModelSerializer):
    class Meta:
        model = ApiListId
        fields = '__all__'
        # fields = ['fdSbjt', 'category', 'clrNm', 'fdYmd', 'depPlace']
