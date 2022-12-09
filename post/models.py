from django.db import models
from accounts.models import User

class Category(models.Model):
  category_id = models.AutoField(primary_key=True)
  upper_category = models.CharField(max_length=20)
  middle_category = models.CharField(max_length=20)
  lower_category = models.CharField(max_length=20)
  color = models.CharField(max_length=10)

class ApiListId(models.Model):
  # API list primary key
  atcId = models.CharField(max_length=30, primary_key=True)
  # 물품명
  fdPrdtNm = models.CharField(max_length=200, null=True, default = '')
  # 분실물 이미지 명
  fdFilePathImg = models.CharField(max_length=300)
  # 게시제목
  fdSbjt = models.CharField(max_length=100)
  # 보관 장소
  depPlace = models.CharField(max_length=30)
  # 습득일자  
  fdYmd = models.DateField(max_length=10, auto_now=False, auto_now_add=False)
  # 카테고리 (외래키)
  # category = models.ForeignKey(Category, on_delete=models.CASCADE)
  category = models.CharField(max_length=20)
  # 색상명
  clrNm = models.CharField(max_length=10)
  
class DollidoLstId(models.Model):
  # 
  dollido_lst_id = models.AutoField(primary_key=True)
  # 물품명
  lstPrdtNm = models.CharField(max_length=200, null=True, default='')
  # 분실물 이미지 명
  lstFilePathImg = models.CharField(max_length=300)
  # 분실물 상태명
  lstSteNm = models.CharField(max_length=100)
  # 분실지역명
  lstLctNm = models.CharField(max_length=200)
  # 분실장소
  lstPlace = models.CharField(max_length=100)
  # 기관전화번호
  tel = models.CharField(max_length=15)
  # 기관명
  orgNm = models.CharField(max_length=100)
  # 분실일자
  lstYmd = models.DateField(max_length=10, auto_now=False, auto_now_add=False)
  # 카테고리 (외래키)
  category = models.ForeignKey(Category, on_delete=models.CASCADE)
  