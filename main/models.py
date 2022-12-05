from django.db import models

class Category(models.Model):
  category_id = models.AutoField(primary_key=True)
  upper_category = models.CharField(max_length=20)
  middle_category = models.CharField(max_length=20)
  lower_category = models.CharField(max_length=20)
  color = models.CharField(max_length=10)

class ApiListId(models.Model):
  api_lst_id = models.AutoField(primary_key=True)
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
  
class DollidoLstId(models.Model):
  dollido_lst_id = models.AutoField(primary_key=True)
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
  
# class User(models.Model):
#   user_id = models.AutoField(primary_key=True)
#   user_name = models.CharField(max_length=20)
#   tel = models.IntegerField(max_length=10)
#   email = models.CharField(max_length=100)
#   address = models.CharField(max_length=100)
#   password = models.CharField(max_length=30)
  
