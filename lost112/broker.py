from django.shortcuts import render
from django.http import HttpResponse
from django.apps import AppConfig
from rest_framework import status

import os
import time
import requests
import xml.etree.ElementTree as ET
import xmltodict

from pytz import utc
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.executors.pool import ThreadPoolExecutor, ProcessPoolExecutor

def get_lost112_1():
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

def get_lost112_2():
    url = 'http://apis.data.go.kr/1320000/LostGoodsInfoInqireService/getLostGoodsInfoAccTpNmCstdyPlace'
    params ={'serviceKey' : 'QKItEKc++kSGuac4NXrc3ukFyI5co7vZL8RJs+zQTLNGLbpF8Ye4FyPMljEXst017F0idpn3lKcCJjbT0XsxsA==',
             'LST_PLACE' : '역', 
             'LST_PRDT_NM' : '가방', 
             'pageNo' : '1', 
             'numOfRows' : '10' }

    response = requests.get(url, params=params).content
    jsonObject = xmltodict.parse(response)
    return jsonObject

def get_lost112_3():
    url = 'http://apis.data.go.kr/1320000/LostGoodsInfoInqireService/getLostGoodsDetailInfo'
    params ={'serviceKey' : 'QKItEKc++kSGuac4NXrc3ukFyI5co7vZL8RJs+zQTLNGLbpF8Ye4FyPMljEXst017F0idpn3lKcCJjbT0XsxsA==', 
             'ATC_ID' : 'L2018120100000706' }

    response = requests.get(url, params=params).content
    jsonObject = xmltodict.parse(response)
    return jsonObject

    # for j in jsonObject['response']['body']['items']['item']:
    #     api = ApiListId()
        
    #     # API list primary key
    #     api.atcId = j['api']
    #     # 물품명
    #     api.fdPrdtNm = j['fdPrdtNm']
    #     # 분실물 이미지 명
    #     api.fdFilePathImg = j['fdFilePathImg']
    #     # 게시제목
    #     api.fdSbjt = ['fdSbjt']
    #     # 보관 장소
    #     api.depPlace = ['depPlace']
    #     # 습득일자
    #     api.fdYmd = ['fdYmd']
    #     # 카테고리 (외래키)
    #     api.category = ['category']
    #     # 색상명
    #     api.clrNm  = ['clrNm']
        
    #     api.save()
        
    #     print('2 completed')

def job():
    print(f'scheduler testing : {time.strftime("%H:%M:%S")}')
    print(get_lost112_1())

def sched_lost():
    executors = {
        'default': ThreadPoolExecutor(20),
        'processpool': ProcessPoolExecutor(5)
    }
    
    job_defaults = {
        'coalesce': True,
        'max_instances': 3
    }
    
    timezone='Asia/Seoul'
    scheduler = BackgroundScheduler( executors=executors, job_defaults=job_defaults, timezone=timezone)
    scheduler.add_job(job, 'interval', seconds = 10, id='test')
    scheduler.start()
    

class MyAppConfig(AppConfig):
    name = "lost112"
    verbose_name = "MyAppConfig"
    
    def ready(self):
        if not os.environ.get('APP'):
            os.environ['APP'] = 'True'
            sched_lost()
                