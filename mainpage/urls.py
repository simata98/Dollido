from django.conf.urls import include, url
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from .views import Mainpage_info, Mainpage_detail

app_name = 'mainpage'

urlpatterns = [
    path('', Mainpage_info, name='mainpage_info'),
    path('<pk>/', Mainpage_detail, name='mainpage_detail'),
]

