from django.urls import path, include
from rest_framework import urls
from . import views

app_name = 'accounts'

urlpatterns = [
    path('', include('dj_rest_auth.urls')),
    path('registration/', include('dj_rest_auth.registration.urls'), name='registration'),
    # path('agreement/', views.AgreementView.as_view(), name='agreement'),
    # path('main/', views.main_view, name='main'),
    # path('login/', views.LoginView.as_view(), name='login'),
    # path('logout/', views.logout_view, name='logout'),
]