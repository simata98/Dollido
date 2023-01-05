from rest_framework.response import Response
from rest_framework.decorators import api_view
from post.models import ApiListId, DollidoLstId, Stat_info
from .serializers import ApiSerializer, DollidoSerializer
from django.shortcuts import get_object_or_404
from datetime import date, timedelta
from rest_framework import status

@api_view(['GET'])
def Mainpage_info(request):    
    try:
        today = date.today()
        today = today.strftime('%Y-%m-%d')
        
        # 20일 전 ~ 오늘, 집계된 습득물 개수
        res = {'dollido_cnt':{},
            'api_cnt':{},
            'total_cnt':{}
            }
        
        wallet_cnt = 0
        phone_cnt = 0
        for i in range(9,-1,-1):
            day = date.today() - timedelta(i)
            day = day.strftime('%Y-%m-%d')
            temp = Stat_info.objects.get(date=day)
            
            res['dollido_cnt'][day]= temp.dollido_wallet_cnt + temp.dollido_phone_cnt
            res['api_cnt'][day] = temp.lost112_wallet_cnt + temp.lost112_phone_cnt
            res['total_cnt'][day] = temp.total_cnt
            
            wallet_cnt = wallet_cnt + temp.dollido_wallet_cnt + temp.lost112_wallet_cnt
            phone_cnt = phone_cnt + temp.dollido_phone_cnt + temp.lost112_phone_cnt
            
        res['wallet_cnt'] = wallet_cnt
        res['phone_cnt'] = phone_cnt
        
        data = DollidoLstId.objects.all().order_by('-lstYmd')[:20]
        serializer = DollidoSerializer(data, many=True)
        res['current_lost'] = serializer.data
        return Response(res)
    except:
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def Mainpage_detail(request, pk):
    data = get_object_or_404(ApiListId, pk=pk)
    serializer = ApiSerializer(data)
    return Response(serializer.data)