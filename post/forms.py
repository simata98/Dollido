from django import forms
from .models import DollidoLstId

class DocumentForm(forms.ModelForm):
  lstPrdtNm = forms.CharField(label='습득물 이름',widget= forms.TextInput(attrs={'class':'form-control',' placeholder':'분실물 이름을 입력하세요.'}))
  lstcontent = forms.CharField(label='상세설명',widget= forms.TextInput(attrs={'class':'form-control',' placeholder':'특이사항을 입력하세요.'}))
  lstFilePathImg = forms.ImageField(label='사진', required=False)
  lstYmd = forms.DateField(label='습득일자', initial=datetime.date.today, widget=forms.SelectDateWidget(years=YEARS))
  selectoption = [('kt탄방타워 정문','kt탄방타워 정문')]
  lstPlace = forms.ChoiceField(label='보관장소', widget= forms.Select(attrs={ "class":"form-control input_felid"}),choices=selectoption)

  class Meta:
    model = DollidoLstId
    fields = '__all__'
