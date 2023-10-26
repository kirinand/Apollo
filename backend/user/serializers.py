from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer, TokenVerifySerializer
import jwt

from django.conf import settings
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'name', 'password']
        extra_kwargs = {'password': {'write_only': True}}
        
    def validate_email(self, value):
        if not value:
            raise serializers.ValidationError("Users must have an email address")
        return value

    def validate_password(self, value):
        if not value:
            raise serializers.ValidationError("Users must have a password")
        return value
        
    def create(self, validated_data):    
        return User.objects.create_user(**validated_data)
    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        token['email'] = user.email
        token['name'] = user.name
        
        return token
    
    def validate(self, attrs):
        data = super().validate(attrs)
        
        data.update({'email': self.user.email})
        data.update({'name': self.user.name})
        
        return data

class CustomTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        token = attrs['refresh']
        
        decoded_token = jwt.decode(token, settings.SIMPLE_JWT['SIGNING_KEY'], algorithms=[settings.SIMPLE_JWT['ALGORITHM']])
        
        data.update({'email': decoded_token.get('email')})
        data.update({'name': decoded_token.get('name')})
        
        return data
    
class CustomTokenVerifySerializer(TokenVerifySerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        token = attrs['token']

        decoded_token = jwt.decode(token, settings.SIMPLE_JWT['SIGNING_KEY'], algorithms=[settings.SIMPLE_JWT['ALGORITHM']])
        
        data.update({'email': decoded_token.get('email')})
        data.update({'name': decoded_token.get('name')})
        
        return data
