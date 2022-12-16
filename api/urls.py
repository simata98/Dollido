from django.urls import path
from . import views

app_name = 'api'

urlpatterns = [
    path('', views.api_detail_list, name='api_list'),
    path('<pk>/', views.api_detail_view, name='api_detail'),
]