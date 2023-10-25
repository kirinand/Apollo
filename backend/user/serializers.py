from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

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
    def validate(self, attrs):
        data = super().validate(attrs)
        
        print(self.user.is_active)
        
        data.update({'email': self.user.email})
        data.update({'name': self.user.name})
        
        return data

