from .models import User
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = '__all__'
    
  def create(self, validated_data):
    user = User.objects.create_user(
        username=validated_data['username'],
        email = validated_data['email'],
        tel = validated_data['tel'],
        address = validated_data['address'],
        password = validated_data['password'],
    )
    return user

    
class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=64)
    password = serializers.CharField(max_length=128, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        email = data.get("email", None)
        password = data.get("password", None)
        user = authenticate(email=email, password=password)
        is_active = data.get('is_active', None)

        if user is None:
            return {
                'email': 'None'
            }
        try:
            payload = JWT_PAYLOAD_HANDLER(user)
            jwt_token = JWT_ENCODE_HANDLER(payload) # 토큰 발행
            update_last_login(None, user)
        except User.DoesNotExist:
            raise serializers.ValidationError(
                '이메일 또는 비밀번호가 잘못 입력되었습니다'
            )
        return {
            'email': user.email,
            'is_active': user.is_active,
            'token': jwt_token,
        }