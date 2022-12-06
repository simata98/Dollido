from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import status

import time
from apscheduler.schedulers.background import BackgroundScheduler
from django.apps import AppConfig
import requests
import xml.etree.ElementTree as ET
import xmltodict

def get_lost112():
    url = 'http://apis.data.go.kr/1320000/LostGoodsInfoInqireService/getLostGoodsInfoAccToClAreaPd'
    params ={'serviceKey' : 'QKItEKc++kSGuac4NXrc3ukFyI5co7vZL8RJs+zQTLNGLbpF8Ye4FyPMljEXst017F0idpn3lKcCJjbT0XsxsA==', 
            'START_YMD' : '20221201',
            'END_YMD' : '20221206',
            'PRDT_CL_CD_01' : 'PRA000',
            'PRDT_CL_CD_02' : 'PRA300', 
            'LST_LCT_CD' : 'LCA000', 
            'pageNo' : '1',
            'numOfRows' : '10' }

    response = requests.get(url, params=params).content
    jsonObject = xmltodict.parse(response)
    return jsonObject

def job():
    print(f'scheduler testing : {time.strftime("%H:%M:%S")}')
    print(get_lost112())
    
def scheduler_test(self):
    sched = BackgroundScheduler()
    sched.add_job(job, 'interval', seconds= 5, id='test')
    sched.start()


def next_job(self):
    print('next job')

class MyAppConfig(AppConfig):
    name = "lost112"
    def ready(self):
        scheduler_test(self)
        
# def index(request):
#     return render(request, 'layout.html')