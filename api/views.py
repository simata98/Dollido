from rest_framework.response import Response
from rest_framework.decorators import api_view
from post.models import ApiListId
from .serializers import ApiSerializer
from django.shortcuts import get_object_or_404


@api_view(['GET'])
def api_detail_list(request):
    data = ApiListId.objects.all()
    serializer = ApiSerializer(data, many=True)
    return Response(serializer.data)
    

@api_view(['GET'])
def api_detail_view(request, pk):
    data = get_object_or_404(ApiListId, pk=pk)
    serializer = ApiSerializer(data, many=True)
    return Response(serializer.data)