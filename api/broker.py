import time
import requests
import xmltodict
from datetime import date, timedelta

from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.executors.pool import ThreadPoolExecutor, ProcessPoolExecutor
from post.models import ApiListId, DollidoLstId, Stat_info
from django.db.models import Q

CATEGORY = ['PRH000', 'PRJ000']
START_YMD = '20221220'
# END_YMD = '20221215'
today = date.today()
END_YMD = today.strftime('%Y%m%d')

def call_api(**kwargs):
    url = 'http://apis.data.go.kr/1320000/LosfundInfoInqireService/getLosfundInfoAccToClAreaPd'
    params ={'serviceKey' : 'QKItEKc++kSGuac4NXrc3ukFyI5co7vZL8RJs+zQTLNGLbpF8Ye4FyPMljEXst017F0idpn3lKcCJjbT0XsxsA=='}
    
    for key, value in kwargs.items():
        params[key] = value
    
    response = requests.get(url, params=params).content
    jsonObject = xmltodict.parse(response)
    
    return jsonObject


def get_lost112(CATEGORY=CATEGORY, START_YMD=START_YMD, END_YMD=END_YMD):
    cnt = 0
    for cat in CATEGORY:
        initial_value = call_api(numOfRows='1',
                PRDT_CL_CD_01=cat, 
                START_YMD=START_YMD,
                END_YMD=END_YMD)
        
        print(cat, initial_value['response']['body']['totalCount'])
        
        jsonObject = call_api(numOfRows=initial_value['response']['body']['totalCount'],
                PRDT_CL_CD_01=cat, 
                START_YMD=START_YMD,
                END_YMD=END_YMD)
        
        for j in jsonObject['response']['body']['items']['item']:
            api = ApiListId()
            
            # API list primary key
            api.atcId = j['atcId']
            if 'fdPrdtNm' in j.keys():
                # 물품명
                api.fdPrdtNm = j['fdPrdtNm']
            if 'fdFilePathImg' in j.keys():
                # 분실물 이미지명
                api.fdFilePathImg = j['fdFilePathImg']
            if 'fdSbjt' in j.keys():
                # 게시제목
                api.fdSbjt = j['fdSbjt']
            if 'depPlace' in j.keys():
                # 보관 장소
                api.depPlace = j['depPlace']
            if 'fdYmd' in j.keys():
                # 습득일자
                api.fdYmd = j['fdYmd']
            if 'prdtClNm' in j.keys():
                # 카테고리 (외래키)
                api.category = j['prdtClNm']
            if 'clrNm' in j.keys():
                # 색상명
                api.clrNm  = j['clrNm']    
            api.save()
            
            cnt += 1
            if cnt % 5000 == 0:
                print(cnt)
    print('api completed')
    return

def count_rows():
    today = date.today()
    today = today.strftime('%Y-%m-%d')

    queryset = Stat_info.objects.all()
    if len(queryset) > 0:
        queryset.delete()

    # 열흘 전 ~ 오늘, 집계된 습득물 개수
    for i in range(10):
        day = date.today() - timedelta(i)
        day = day.strftime('%Y-%m-%d')
        
        print(day)
        
        lost112_wallet = ApiListId.objects.filter(Q(fdYmd=day) & Q(category__startswith="지갑"))
        lost112_wallet_cnt = lost112_wallet.count()
        
        lost112_phone = ApiListId.objects.filter(Q(fdYmd=day) & Q(category__startswith="휴대폰"))
        lost112_phone_cnt = lost112_phone.count()
        
        # 조건 수정해야함
        dollido_wallet = DollidoLstId.objects.filter(Q(lstYmd=day) & Q(lstPrdtNm__contains="지갑"))
        dollido_wallet_cnt = dollido_wallet.count()
        
        dollido_phone = DollidoLstId.objects.filter(Q(lstYmd=day) & Q(lstPrdtNm__contains="스마트폰"))
        dollido_phone_cnt = dollido_phone.count()
        
        stat = Stat_info()
        stat.date = day
        stat.lost112_wallet_cnt = lost112_wallet_cnt
        stat.lost112_phone_cnt = lost112_phone_cnt
        stat.dollido_wallet_cnt = dollido_wallet_cnt
        stat.dollido_phone_cnt = dollido_phone_cnt
        stat.total_cnt = lost112_wallet_cnt+lost112_phone_cnt+dollido_wallet_cnt+dollido_phone_cnt
        stat.save()
    print('Stat info completed')

def job():
    today = date.today()
    yesterday = date.today() - timedelta(1)
    
    today = today.strftime('%Y%m%d')
    yesterday = yesterday.strftime('%Y%m%d')
    print(today, yesterday)
    print(f'scheduler testing : {time.strftime("%H:%M:%S")}')
    
    get_lost112(START_YMD=yesterday, END_YMD=today)
    count_rows()
    
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
    scheduler.add_job(job, 'interval', minutes = 30, id='test')
    scheduler.start()
    

# class MyAppConfig(AppConfig):
#     name = "api"
#     verbose_name = "MyAppConfig"
    
#     def ready(self):
#         from post.models import ApiListId
#         sched_lost()
