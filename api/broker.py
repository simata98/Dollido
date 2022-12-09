from django.shortcuts import render
from django.http import HttpResponse
from django.apps import AppConfig
from rest_framework import status

import os
# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

# import django
# django.setup()

# import sys
# sys.path.append('C:/Users/User/Desktop/Bigproject2/post')
import time
import requests
import xmltodict

from pytz import utc
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.executors.pool import ThreadPoolExecutor, ProcessPoolExecutor
from post.models import ApiListId

def get_lost112():
    url = 'http://apis.data.go.kr/1320000/LosfundInfoInqireService/getLosfundInfoAccToClAreaPd'
    params ={'serviceKey' : 'QKItEKc++kSGuac4NXrc3ukFyI5co7vZL8RJs+zQTLNGLbpF8Ye4FyPMljEXst017F0idpn3lKcCJjbT0XsxsA==', 
             'PRDT_CL_CD_01' : 'PRH000', 
             #'PRDT_CL_CD_02' : 'PRH200', 
             'FD_COL_CD' : 'CL1002', 
             #'START_YMD' : '20180302', 
             #'END_YMD' : '20180802', 
             #'N_FD_LCT_CD' : 'LCA000', 
             # 'pageNo' : '1', 
             'numOfRows' : '1000'}

    response = requests.get(url, params=params).content
    jsonObject = xmltodict.parse(response)
    api = ApiListId()
    
    for j in jsonObject['response']['body']['items']['item']:
        api = ApiListId()
        
        # API list primary key
        api.atcId = j['atcId']
        # 물품명
        api.fdPrdtNm = j['fdPrdtNm']
        # 분실물 이미지명
        api.fdFilePathImg = j['fdFilePathImg']
        # 게시제목
        api.fdSbjt = j['fdSbjt']
        # 보관 장소
        api.depPlace = j['depPlace']
        # 습득일자
        api.fdYmd = j['fdYmd']
        # 카테고리 (외래키)
        api.category = j['prdtClNm']
        # 색상명
        api.clrNm  = j['clrNm']
        
        api.save()
        
    print('2 completed')
    return

def job():
    print(f'scheduler testing : {time.strftime("%H:%M:%S")}')
    get_lost112()

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
    scheduler.add_job(job, 'interval', minutes =1, id='test')
    scheduler.start()
    

# class MyAppConfig(AppConfig):
#     name = "api"
#     verbose_name = "MyAppConfig"
    
#     def ready(self):
#         from post.models import ApiListId
#         sched_lost()
