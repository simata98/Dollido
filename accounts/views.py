# 회원가입 관련
import jwt
from rest_framework.views import APIView
from .serializers import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.shortcuts import render, get_object_or_404
from dollido.settings import SECRET_KEY
from dj_rest_auth.registration.serializers import RegisterSerializer
from django.contrib import messages

from django.views.generic.edit import FormView, View, CreateView
from .forms import LoginForm, RegisterForm

# Email 관련
import json
from .token              import account_activation_token
from .text                  import message

from django.views                    import View
from django.http                     import HttpResponse, JsonResponse
from django.core.exceptions          import ValidationError
from django.core.validators          import validate_email
from django.shortcuts                import redirect
from django.contrib.sites.shortcuts  import get_current_site
from django.utils.http               import urlsafe_base64_encode,urlsafe_base64_decode
from django.core.mail                import EmailMessage
from django.utils.encoding           import force_bytes, force_text
from django.template.loader          import render_to_string


# JWT 토큰 관련
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

################################################################
class RegisterAPIView(APIView):
    permissions_classes = [AllowAny]
    def post(self, request):
        data = json.loads(request.body)
        try:
            validate_email(data['email'])
            if User.objects.filter(email=data["email"]).exists():
                return JsonResponse({"message" : "EXISTS_EMAIL"}, status=400)
            
            serializer = UserSerializer(data=request.data)
            if serializer.is_valid():
                user = serializer.save()
                
                # 인증 이메일
                current_site = get_current_site(request)
                domain = self.request.META['HTTP_HOST']
                uidb64 = urlsafe_base64_encode(force_bytes(user.pk)).encode().decode()
                token = account_activation_token.make_token(user)
                message_data = message(domain, uidb64, token)
                message_data_2 = render_to_string('accounts/register_email.html', {
                    'domain' : domain,
                    'uidb64' : uidb64,
                    'token' : token,
                })
                
                
                mail_title = "돌리도 서비스 회원가입을 위해 이메일 인증을 완료해주세요"
                mail_to = data['email']
                email = EmailMessage(mail_title, message_data_2, to=[mail_to])
                email.content_subtype = "html"
                email.send()
                
                # jwt 토큰 접근
                token = TokenObtainPairSerializer.get_token(user)
                refresh_token = str(token)
                access_token = str(token.access_token)
                res = Response(
                    {
                        "user": serializer.data,
                        "message": "register successs",
                        "token": {
                            "access": access_token,
                            "refresh": refresh_token,
                        },
                    },
                    status=status.HTTP_200_OK,
                )
                
                # jwt 토큰 => 쿠키에 저장
                res.set_cookie("access", access_token, httponly=True)
                res.set_cookie("refresh", refresh_token, httponly=True)
                return res
            
        except KeyError:
            return JsonResponse({'message': 'SUCCESS'}, status=400)
        except TypeError:
            return JsonResponse({'message': 'INVALID_KEY'}, status=400)
        except ValidationError:
            return JsonResponse({'message': 'VALIDATION_ERROR'}, status=400)

class AuthAPIView(APIView):
    permissions_classes = [AllowAny]
    # 유저 정보 확인
    def get(self, request):
        try:
            # access token을 decode 해서 유저 id 추출 => 유저 식별
            access = request.COOKIES.get('access')
            payload = jwt.decode(access, SECRET_KEY, algorithms=['HS256'])
            pk = payload.get('user_id')
            user = get_object_or_404(User, pk=pk)
            serializer = UserSerializer(instance=user)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except(jwt.exceptions.ExpiredSignatureError):
            # 토큰 만료 시 토큰 갱신
            data = {'refresh': request.COOKIES.get('refresh', None)}
            serializer = TokenRefreshSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                access = serializer.data.get('access', None)
                refresh = serializer.data.get('refresh', None)
                payload = jwt.decode(access, SECRET_KEY, algorithms=['HS256'])
                pk = payload.get('user_id')
                user = get_object_or_404(User, pk=pk)
                serializer = UserSerializer(instance=user)
                res = Response(serializer.data, status=status.HTTP_200_OK)
                res.set_cookie('access', access)
                res.set_cookie('refresh', refresh)
                return res
            raise jwt.exceptions.InvalidTokenError

        except(jwt.exceptions.InvalidTokenError):
            # 사용 불가능한 토큰일 때
            return JsonResponse({"message" : "사용 불가능한 토큰"}, status=400)

    # 로그인
    def post(self, request):
    	# 유저 인증
        user = authenticate(
            email=request.data.get("email"), 
            password=request.data.get("password")
        )
        
        # 이미 회원가입 된 유저일 때
        if user is not None:
            serializer = UserSerializer(user)
            # 이메일 인증을 했을 경우와 아닐 경우에는 user 정보 RESPONSE
            # 이메일 인증 여부 확인
            # jwt 토큰 접근
            token = TokenObtainPairSerializer.get_token(user)
            refresh_token = str(token)
            access_token = str(token.access_token)
            res = Response(
                {
                    "user": serializer.data,
                    "message": "login success",
                    "token": {
                        "access": access_token,
                        "refresh": refresh_token,
                    },
                },
                status=status.HTTP_200_OK,
            )
            # jwt 토큰 => 쿠키에 저장
            res.set_cookie("access", access_token, httponly=True)
            res.set_cookie("refresh", refresh_token, httponly=True)
            return res
        else:
            res = Response(
                {
                    "user": {
                        "is_active" : False
                    },
                    "message": "회원가입이 되어 있지 않은 계정이거나 이메일 인증이 되지 않은 계정",
                    "token": {
                        "access": "unvalid_token"
                    },
                }, status=400
            )
            return res

    # 로그아웃
    def delete(self, request):
        # 쿠키에 저장된 토큰 삭제 => 로그아웃 처리
        response = Response({
            "message": "Logout success"
            }, status=status.HTTP_202_ACCEPTED)
        response.delete_cookie("access")
        response.delete_cookie("refresh")
        return response

class Activate(View):
    permissions_classes = [AllowAny]
    def get(self, request, uidb64, token):
        react_port = '3000'
        hostname = request.get_host().split(':')[0]
        
        try:
            uid  = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
            
            if account_activation_token.check_token(user, token):
                user.is_active = True
                user.save()
                return render(request, 'accounts/register_success.html')

            return JsonResponse({"message" : "AUTH FAIL"}, status=400)

        except ValidationError:
            messages.error(request, '메일 인증에 실패했습니다. 입력오류입니다!')
            return JsonResponse({"message" : "TYPE_ERROR"}, status=400)
        except KeyError:
            messages.error(request, '메일 인증에 실패했습니다. 키 오류입니다!')
            return JsonResponse({"message" : "INVALID_KEY"}, status=400)

class Password(APIView):
    permissions_classes = [AllowAny]
    def post(self, request):
        # 인증 이메일
        message_data = '보관함 비밀번호는 2023입니다!'
        mail_title = "돌리도 보관함 비밀번호 안내입니다."
        access = request.COOKIES.get('access')
        payload = jwt.decode(access, SECRET_KEY, algorithms=['HS256'])
        pk = payload.get('user_id')
        user = get_object_or_404(User, pk=pk)
        email = EmailMessage(mail_title, message_data, to=[user])
        email.content_subtype = "html"
        email.send()
        return Response(status=status.HTTP_200_OK)
