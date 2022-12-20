from django import forms
from .models import User
from django.contrib.auth.forms import UserCreationForm
import re

def tel_validator(value):
  if len(str(value)) != 11:
    raise forms.ValidationError('정확한 핸드폰 번호를 입력해주세요!')

def email_validator(value):
  email_valid = re.compile('^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')
  if email_valid.match(value) == None:
    raise forms.ValidationError('정확한 이메일을 입력해주세요!')
  
class RegisterForm(UserCreationForm):
  def __init__(self, *args, **kwargs):
    super(RegisterForm, self).__init__(*args, **kwargs)
    
    self.fields['username'].label = '이름'
    self.fields['email'].widget.attrs.update({
      'class' : 'form-control',
    })
    self.fields['email'].label = '이메일'
    self.fields['email'].validators = [email_validator]
    self.fields['email'].widget.attrs.update({
      'class' : 'form-control',
      'autofocus':False,
    })
    self.fields['password1'].label = '비밀번호'
    self.fields['password1'].widget.attrs.update({
      'class':'form-control'
    })
    self.fields['password2'].label = '비밀번호 확인'
    self.fields['password2'].widget.attrs.update({
        'class': 'form-control',
    })
    self.fields['tel'].label = '핸드폰번호'
    self.fields['tel'].validators = [tel_validator]
    self.fields['tel'].widget.attrs.update({
        'class': 'form-control',
    })
    self.fields['address'].label = '주소'
    self.fields['address'].widget.attrs.update({
        'class': 'form-control',
    })
  class Meta:
    model = User
    fields = ['username','email', 'password1', 'password2', 'tel', 'address']
      
  def save(self, commit=True):
    user = super(RegisterForm, self).save(commit=False)
    user.is_active = False
    user.save()
    return user
  
class LoginForm(forms.Form):
  email = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control',}),
                            error_messages={'required':'아이디를 입력해주세요.'},
                            max_length=100,
                            label='아이디')
  password = forms.CharField(widget=forms.PasswordInput(attrs={'class':'form-control',}),
                             error_messages={'required':'비밀번호를 입력해주세요.'},
                             label='비밀번호')
# https://docs.djangoproject.com/en/3.0/ref/forms/widgets/
def clean(self):
  cleaned_data = super().clean()
  email = cleaned_data.get('email')
  password = cleaned_data.get('password')
  
  if email and password:
    try:
      user = User.objects.get(email=email)
    except User.DoesNotExist:
      self.add_error('email', '이메일이 존재하지 않습니다')
      return
    if not check_password(password, user.password):
      self.add_error('password', '비밀번호가 틀렸습니다')