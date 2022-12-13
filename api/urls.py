from django.urls import path
from . import views

app_name = 'api'

urlpatterns = [
    path('', views.ApiListView.as_view(), name='api_list'),
]