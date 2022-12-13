from django.shortcuts import render
from django.http import HttpResponse
from django.apps import AppConfig
from rest_framework import status

import os
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
             'PRDT_CL_CD_01' : 'PRJ000', 
             #'PRDT_CL_CD_02' : 'PRH200', 
            #  'FD_COL_CD' : 'CL1002', 
             'START_YMD' : '20220101', 
             'END_YMD' : '20221212', 
             #'N_FD_LCT_CD' : 'LCA000', 
             # 'pageNo' : '1', 
            #  'numOfRows' : '100000'
             }

    # response = requests.get(url, params=params).content
    # jsonObject = xmltodict.parse(response)
    # api = ApiListId()
    
    # for j in jsonObject['response']['body']['items']['item']:
    #     api = ApiListId()
        
    #     # API list primary key
    #     api.atcId = j['atcId']
    #     if 'fdPrdtNm' in j.keys():
    #         # 물품명
    #         api.fdPrdtNm = j['fdPrdtNm']
    #     if 'fdFilePathImg' in j.keys():
    #         # 분실물 이미지명
    #         api.fdFilePathImg = j['fdFilePathImg']
    #     if 'fdSbjt' in j.keys():
    #         # 게시제목
    #         api.fdSbjt = j['fdSbjt']
    #     if 'depPlace' in j.keys():
    #         # 보관 장소
    #         api.depPlace = j['depPlace']
    #     if 'fdYmd' in j.keys():
    #         # 습득일자
    #         api.fdYmd = j['fdYmd']
    #     if 'prdtClNm' in j.keys():
    #         # 카테고리 (외래키)
    #         api.category = j['prdtClNm']
    #     if 'clrNm' in j.keys():
    #         # 색상명
    #         api.clrNm  = j['clrNm']
        
    #     api.save()
        
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
    scheduler.add_job(job, 'interval', minutes =60, id='test')
    scheduler.start()
    

# class MyAppConfig(AppConfig):
#     name = "api"
#     verbose_name = "MyAppConfig"
    
#     def ready(self):
#         from post.models import ApiListId
#         sched_lost()
