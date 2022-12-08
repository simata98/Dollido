# MySQL 데이터베이스 설정
import pymysql

pymysql.install_as_MySQLdb()

DATABASES = {
  'default' : {
    'ENGINE': 'django.db.backends.mysql',
    'NAME': 'DOLLIDO',
    'USER': 'root',
    'PASSWORD': 'aivle',
    'HOST': 'localhost',
    'PORT': '3306',
  }
}

SECRET_KEY = 'django-insecure-=&m=-bhcn&232@%588=ig8%()b@-0ti(a8g$)z#wyz8^(-6ll%'