from django import forms
from .models import DollidoLstId
import datetime

YEARS= [x for x in range(2022,2023)]

'''
class LostForm(forms.ModelForm):
    item = forms.CharField(label='분실물 이름',widget= forms.TextInput(attrs={'class':'form-control',' placeholder':'분실물 이름을 입력하세요.'}))
    description = forms.CharField(label='특이사항',widget= forms.TextInput(attrs={'class':'form-control',' placeholder':'특이사항을 입력하세요.'}))
    image = forms.FileField(label='사진')
    #create_date = forms.DateField(label='날짜', initial=datetime.date.today, widget=forms.SelectDateWidget(years=YEARS))

    class Meta:
        model = Lost
        fields = ['item', 'description', 'image']'''

class LostForm(forms.ModelForm):
    lstPrdtNm = forms.CharField(label='습득물 이름',widget= forms.TextInput(attrs={'class':'form-control',' placeholder':'분실물 이름을 입력하세요.'}))
    lstcontent = forms.CharField(label='상세설명',widget= forms.TextInput(attrs={'class':'form-control',' placeholder':'특이사항을 입력하세요.'}))
    lstFilePathImg = forms.ImageField(label='사진')
    lstYmd = forms.DateField(label='습득일자', initial=datetime.date.today, widget=forms.SelectDateWidget(years=YEARS))
    
    selectoption = [('kt탄방타워 정문','kt탄방타워 정문')]
    lstPlace = forms.ChoiceField(label='보관장소', widget= forms.Select(attrs={ "class":"form-control input_felid"}),choices=selectoption)
    
    class Meta:
        model = DollidoLstId
        fields = ['lstPrdtNm', 'lstcontent', 'lstFilePathImg', 'lstYmd', 'lstPlace']


class TakeForm(forms.ModelForm):
    lstPrdtNm = forms.CharField(label='습득물 이름',widget= forms.TextInput(attrs={'class':'form-control',' placeholder':'분실물 이름을 입력하세요.'}))
    lstcontent = forms.CharField(label='상세설명',widget= forms.TextInput(attrs={'class':'form-control',' placeholder':'특이사항을 입력하세요.'}))
    # lstFilePathImg = forms.ImageField(label='사진')
    lstYmd = forms.DateField(label='습득일자', initial=datetime.date.today, widget=forms.SelectDateWidget(years=YEARS))
    
    selectoption = [('kt탄방타워 정문','kt탄방타워 정문')]
    lstPlace = forms.ChoiceField(label='보관장소', widget= forms.Select(attrs={ "class":"form-control input_felid"}),choices=selectoption)
    
    class Meta:
        model = DollidoLstId
        fields = ['lstPrdtNm', 'lstcontent', 'lstYmd', 'lstPlace']