from django.db import models
from accounts.models import User
from django.utils import timezone, dateformat

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
    class Meta:
        verbose_name_plural = '돌리도 게시판'
    # 사용자 (외래키)
    writer = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='작성자', null=True, blank=True)
    # 물품명
    lstPrdtNm = models.CharField('습득물 이름',max_length=200, blank=True, null=True)
    # 습득물 이미지
    lstFilePathImg = models.ImageField('사진 등록', upload_to='images/', blank=True, null=True)
    # 습득물 특이사항
    lstcontent = models.CharField('특이사항', max_length=500, default='', blank=True, null=True)
    # 습득일자
    # lstYmd = models.DateField(max_length=10, auto_now=False, auto_now_add=False, blank=True, null=True)
    # lstYmd = models.CharField('습득일자', blank=True, max_length=200, null=True)
    lstYmd = models.DateField('습득일자', blank=True, max_length=10, null=True)
    # 보관장소 (수거함)
    lstPlace = models.CharField(blank=True, max_length=200, null=True)
    # 게시일자
    create_date = models.DateField(default=dateformat.format(timezone.now(), 'Y-m-d'))
    # 물건을 찾았는지
    find_status = models.BooleanField(default=False)
    # 분류된 색상 결과
    clrNm = models.CharField(max_length=10, blank=True, null=True)

    def __str__(self):
        return self.lstPrdtNm

class Stat_info(models.Model):
  date = models.CharField(primary_key=True, max_length=10)
  lost112_wallet_cnt = models.IntegerField()
  lost112_phone_cnt = models.IntegerField()
  dollido_wallet_cnt = models.IntegerField()
  dollido_phone_cnt = models.IntegerField()
  total_cnt = models.IntegerField()