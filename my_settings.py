# MySQL 데이터베이스 설정
import pymysql

pymysql.install_as_MySQLdb()

DATABASES = {
  'default' : {
    'ENGINE': 'django.db.backends.mysql',
    'NAME': 'dollido',
    'USER': 'root',
    'PASSWORD': 'aivle',
    'HOST': '127.0.0.1',
    'PORT': '3306',
  }
}

SECRET_KEY = 'django-insecure-=&m=-bhcn&232@%588=ig8%()b@-0ti(a8g$)z#wyz8^(-6ll%'