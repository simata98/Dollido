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
    # path("", include(router.urls)),
    # path('', include('dj_rest_auth.urls')),
    # path('login/', views.LoginView.as_view(), name='login'),
    # path('logout/', views.logout_view, name='logout'),
    # path('agreement/', views.AgreementView.as_view(), name='agreement'),
    # path('registerauth/', views.register_success, name='register_success'),
    path("register/", views.RegisterAPIView.as_view()),
    path('activate/<str:uidb64>/<str:token>/', views.Activate.as_view()),
    # path('main/', views.main_view, name='main'),
    path("auth/refresh/", TokenRefreshView.as_view()),
    path('auth/', views.AuthAPIView.as_view()),
    # 일반 회원 회원가입/로그인
    # path('dj-rest-auth/', include('dj_rest_auth.urls')),
    # path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    # # 유효한 이메일이 유저에게 전달
    # re_path(r'^account-confirm-email/$', VerifyEmailView.as_view(), name='account_email_verification_sent'),
    # # 유저가 클릭한 이메일(=링크) 확인
    # re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$', views.ConfirmEmailView.as_view(), name='account_confirm_email'),
]