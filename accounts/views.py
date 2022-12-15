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

# JWT 토큰 관련
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .serializers import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import status
from rest_framework.response import Response


################################################################
class RegisterAPIView(APIView):
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
            
            mail_title = "돌리도 서비스 회원가입을 위해 이메일 인증을 완료해주세요"
            mail_to = data['email']
            email = EmailMessage(mail_title, message_data, to=[mail_to])
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
    # 유저 정보 확인
    def get(self, request):
        try:
            # access token을 decode 해서 유저 id 추출 => 유저 식별
            access = request.COOKIES['access']
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
    def get(self, request, uidb64, token):
        try:
            uid  = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
            
            if account_activation_token.check_token(user, token):
                user.is_active = True
                user.save()
                return JsonResponse({"message" : "SUCCESS"}, status=200)

            return JsonResponse({"message" : "AUTH FAIL"}, status=400)

        except ValidationError:
            return JsonResponse({"message" : "TYPE_ERROR"}, status=400)
        except KeyError:
            return JsonResponse({"message" : "INVALID_KEY"}, status=400)

class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer
################################################################
# django 홈페이지 버전

# # 메인화면(로그인 전) 임시
# def index(request):
#     # ip = get_ip(request)
#     # if ip is not None:
#     #     print (ip)
#     # else:
#     #     print ("IP FIND ERROR")

#     return render(request, 'accounts/index.html')

# # 임시 MainView
# def main_view(request):
#     # notice_list = Notice.objects.order_by('-id')[:5]
#     # calendar_property = [x.event_id for x in Calender.objects.all() if x.d_day == False]
#     # calendar_list = Calender.objects.exclude(event_id__in=calendar_property).order_by('start_date')[:5]
#     # free_list = Free.objects.filter(category='정보').order_by('-id')[:5]
#     # anonymous_list = sorted(Anonymous.objects.all(), key=lambda t: t.like_count, reverse=True)[:5]

#     # context = {
#     #     'notice_list' : notice_list,
#     #     'calendar_list' : calendar_list,
#     #     'free_list' : free_list,
#     #     'anonymous_list' : anonymous_list,
#     # }
#     return render(request, 'accounts/main.html')

# 로그인 View
# @method_decorator(logout_message_required, name='dispatch')
# class LoginView(FormView):
#     template_name = 'accounts/login.html'
#     form_class = LoginForm
#     success_url = '/accounts/main/'

#     def form_valid(self, form):
#         email = form.cleaned_data.get("email")
#         password = form.cleaned_data.get("password")
#         user = authenticate(self.request, username=email, password=password)
        
#         if user is not None:
#             self.request.session['email'] = email
#             login(self.request, user)

#         return super().form_valid(form)

# # 로그아웃
# def logout_view(request):
#     logout(request)
#     return redirect('/')

# # 약관동의 View
# class AgreementView(View):
#     def get(self, request, *args, **kwargs):
#         request.session['agreement'] = False
#         return render(request, 'accounts/agreement.html')
    
#     def post(self, request, *args, **kwargs):
#         if request.POST.get('agreement1', False) and request.POST.get('agreement2', False):
#             request.session['agreement'] = True
#             return redirect('/accounts/register/')
        
#         else:
#             messages.info(request, '약관에 모두 동의해주세요')
#             return render(request, 'accounts/agreement.html')

# # 회원가입 성공시 register_auth와 세션값을 비교하여 인증메일 발송 안내창 render
# def register_success(request):
#     if not request.session.get('register_auth', False):
#         raise PermissionDenied
#     request.session['register_auth'] = False
#     return render(request, 'accounts/register_success.html')

# # 회원가입 View
# class UserCreateView(CreateView):      
#     model = User  
#     template_name = 'accounts/register.html'
#     form_class = RegisterForm
    
#     def get(self, request, *args, **kwargs):
#         if not request.session.get('agreement', False):
#             raise PermissionDenied
#         request.session['agreement'] = False
#         return super().get(request, *args, **kwargs)
    
#     def get_success_url(self):
#         self.request.session['register_auth'] = True
#         messages.success(self.request, "입력한 Email 주소로 인증 메일이 발송되었습니다. 인증 후 로그인이 가능합니다.")
#         return reverse('accounts:register_success')
    
#     # 이메일 인증 View
#     # https://stackoverflow.com/questions/55578387/email-verification-in-django
#     def form_valid(self, form):
#         self.object = form.save()
#         # 회원가입 인증 메일 발송
#         send_mail(
#             '돌리도 서비스 회원가입 인증메일 입니다.',
#             [self.object.email],
#             html = render_to_string('accounts/register_email.html', {
#                 'user': self.object,
#                 # token값 encoding, decoding 구현
#                 'uid': urlsafe_base64_encode(force_bytes(self.object.pk)).encode().decode(),
#                 'domain': self.request.META['HTTP_HOST'],
#                 # default_token_generator로 생성된 token값을 전송할 메일인 html 파일에 domain과 함께 값을 담아 메일 전송
#                 'token': default_token_generator.make_token(self.object),
#             }),
#         )
#         return redirect(self.get_success_url())

# # 이메일 인증에 성공할 경우 is_active True상태로 변경
# def activate(request, uid64, token):
#     try:
#         uid = force_text(urlsafe_base64_decode(uid64))
#         current_user = User.objects.get(pk=uid)
#     except(TypeError, ValueError, OverflowError, User.DoesNotExist, ValidationError):
#         messages.error(request, '메일 인증에 실패했습니다')
#         return redirect('accounts:login')
    
#     if default_token_generator.check_token(current_user, token):
#         current_user.is_active = True
#         current_user.save()
        
#         messages.info(request, '메일 인증에 성공하였습니다! 돌리도 서비스를 이제부터 사용 가능합니다!')
#         return redirect('accounts:login')
    
#     messages.error(request, '메일 인증에 실패했습니다. 이메일 인증을 했는지 확인해주세요!')
#     return redirect('accounts:login')