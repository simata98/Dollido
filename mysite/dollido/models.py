from django.db import models
from django.utils import timezone

# Create your models here.
class Lost(models.Model):
    image = models.FileField('사진 등록',upload_to='lost_image', blank=True)
    item = models.CharField('분실물 이름', max_length=200)
    description = models.CharField('특이사항',max_length=500, default='')
    create_date = models.DateTimeField(default=timezone.now)


    def __str__(self):
        return self.item
    class Meta:
        db_table = 'lost_item'

class DollidoLstId(models.Model):
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