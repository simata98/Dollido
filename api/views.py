from rest_framework.response import Response
from rest_framework.decorators import api_view
from post.models import ApiListId
from .serializers import ApiSerializer
from django.shortcuts import get_object_or_404
from django.db.models import Q
from rest_framework import status


@api_view(['GET', 'POST'])
def api_detail_list(request):
  q=Q()
  if request.data['color']=="" and request.data['category']=="":
    post = ApiListId.objects.all()
  else:
    if request.data['color']:
        q &= Q(clrNm__contains =request.data['color'])
    if request.data['category']:
      if request.data['category'] == "휴대폰":
        q &= Q(category__startswith = "휴대폰")
      elif request.data['category'] == "지갑":
        q &= Q(category__startswith  = "지갑")
    post = ApiListId.objects.filter(q)
  serializer = ApiSerializer(post, many=True)
  return Response(serializer.data, status=status.HTTP_200_OK)
    
@api_view(['GET'])
def api_detail_view(request, pk):
    data = get_object_or_404(ApiListId, pk=pk)
    serializer = ApiSerializer(data)
    return Response(serializer.data)
