from rest_framework.response import Response
from rest_framework.decorators import api_view
from post.models import ApiListId, DollidoLstId, Stat_info
from .serializers import ApiSerializer, DollidoSerializer
from django.shortcuts import get_object_or_404
from datetime import date, timedelta
from rest_framework import status
from tqdm import tqdm

@api_view(['GET'])
def Mainpage_info(request):    
    
    today = date.today()
    today = today.strftime('%Y-%m-%d')
    
    # 20dlf 전 ~ 오늘, 집계된 습득물 개수
    res = {'dollido_cnt':{},
           'api_cnt':{},
           }
    for i in range(19,0,-1):
        day = date.today() - timedelta(i)
        day = day.strftime('%Y-%m-%d')
        res['dollido_cnt'][day]= Stat_info.objects.get(date=day).dollido_cnt
        res['api_cnt'][day] = Stat_info.objects.get(date=day).api_cnt
    # data = Stat_info.objects.filter(fdYmd=today)[:10]
    # serializer = ApiSerializer(data, many=True)
    # res['data'] = serializer.data
    
    return Response(res)
    

@api_view(['GET'])
def Mainpage_detail(request, pk):
    data = get_object_or_404(ApiListId, pk=pk)
    serializer = ApiSerializer(data)
    return Response(serializer.data)