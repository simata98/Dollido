from django.db import models
from accounts.models import User
from django.utils import timezone

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
  fdPrdtNm = models.CharField(max_length=500, null=True, default = '')
  # 분실물 이미지 명
  fdFilePathImg = models.CharField(max_length=300)
  # 게시제목
  fdSbjt = models.CharField(max_length=500)
  # 보관 장소
  depPlace = models.CharField(max_length=30)
  # 습득일자  
  fdYmd = models.DateField(max_length=10, null = True)
  # 카테고리 (외래키)
  # category = models.ForeignKey(Category, on_delete=models.CASCADE)
  category = models.CharField(max_length=20)
  # 색상명
  clrNm = models.CharField(max_length=10)

class DollidoLstId(models.Model):
    # 사용자 (외래키)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # 물품명
    lstPrdtNm = models.CharField('습득물 이름',max_length=200)
    # 습득물 이미지
    lstFilePathImg = models.ImageField('사진 등록', upload_to='lost_image', blank=True)
    # 습득물 상세설명
    lstcontent = models.CharField('특이사항',max_length=500, default='')
    # 습득일자
    lstYmd = models.DateField(max_length=10, auto_now=False, auto_now_add=False)
    # 보관장소 (수거함)
    lstPlace = models.CharField(blank = True, max_length =50)
    # 게시일자
    create_date = models.DateTimeField(default=timezone.now)

  
    def __str__(self):
            return self.item
