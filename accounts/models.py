from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from django.utils.translation import gettext_lazy as _

class UserManager(BaseUserManager):
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('이메일을 입력해야 합니다!')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        extra_fields.setdefault('is_active', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(
        verbose_name=_('username'), 
        max_length=10,
        help_text='이름을 입력해주세요'
    )
    
    email = models.EmailField(
        verbose_name=_('이메일 주소'),
        max_length=64,
        unique=True,
        help_text='이메일 주소를 입력해주세요'
    )
    
    tel = models.CharField(
        verbose_name=_('전화번호'),
        max_length=11,
        help_text='전화번호를 입력해주세요. 입력 예시 : 01012345678'
    )
    address = models.CharField(
        verbose_name=_('주소'),
        max_length=30,
        help_text = '현 거주지 주소를 입력해주세요'
    )
    
    is_staff = models.BooleanField(
        _('관리자 권한'),
        default=False,
        help_text=_('사용자가 관리사이트에 로그인할 수 있는지 여부 확인'),
    )
    is_active = models.BooleanField(
        _('활성화 상태'),
        default=False,
        help_text=_(
            '사용자가 활성상태인지 여부 확인'
            '계정을 삭제하는 대신 이것을 선택 해제'
        ),
    )
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)

    objects = UserManager()

    # 이메일 필드를 사용자 이름으로 사용하게 설정
    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username','tel', 'address',]
    
    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')
        
    def __str__(self):
        return self.email