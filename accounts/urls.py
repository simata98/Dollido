from django.urls import path, include, re_path
from rest_framework import urls
from . import views
from rest_framework_simplejwt.views import TokenRefreshView
from dj_rest_auth.registration.views import VerifyEmailView, RegisterView
from rest_framework import routers

app_name = 'accounts'

# router = routers.DefaultRouter()
# router.register('list', views.UserViewSet) # 유저리스트 (테스트용)

urlpatterns = [

    path("register/", views.RegisterAPIView.as_view()),
    path('activate/<str:uidb64>/<str:token>/', views.Activate.as_view()),
    path("auth/refresh/", TokenRefreshView.as_view()),
    path('auth/', views.AuthAPIView.as_view()),
]