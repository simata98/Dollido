from django import forms
from .models import Lost
#import datetime

YEARS= [x for x in range(2022,2023)]


class LostForm(forms.ModelForm):
    item = forms.CharField(label='분실물 이름',widget= forms.TextInput(attrs={'class':'form-control',' placeholder':'분실물 이름을 입력하세요.'}))
    description = forms.CharField(label='특이사항',widget= forms.TextInput(attrs={'class':'form-control',' placeholder':'특이사항을 입력하세요.'}))
    image = forms.FileField(label='사진')
    #create_date = forms.DateField(label='날짜', initial=datetime.date.today, widget=forms.SelectDateWidget(years=YEARS))

    class Meta:
        model = Lost
        fields = ['item', 'description', 'image']
