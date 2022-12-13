from dollido import views
from django.conf.urls import include, url
from django.urls import path

urlpatterns = [
    path('lost/<int:pk>/', views.detail_lost, name='detail_lost'),
    path('create_lost', views.create_lost),
    path('', views.show_lost),
    path('show_lost/', views.show_lost),
    path('lost/<int:pk>/edit/', views.edit_lost, name='edit_lost'),
    path('delete_lost/<int:id>', views.delete_lost),
]