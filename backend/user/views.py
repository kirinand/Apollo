from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from rest_framework.views import APIView
from rest_framework.response import Response
from djoser.social.views import ProviderAuthView
import environ
import os
from django.conf import settings

from .serializers import CustomTokenObtainPairSerializer, CustomTokenRefreshSerializer, CustomTokenVerifySerializer, CustomProviderAuthSerializer

env = environ.Env()
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENV_PATH = os.path.join(BASE_DIR, '.env')
environ.Env.read_env(ENV_PATH)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        
        if response.status_code == 200:
            access_token = response.data.get(settings.AUTH_COOKIE['ACCESS'])
            refresh_token = response.data.get(settings.AUTH_COOKIE['REFRESH'])
            
            response.set_cookie(
                settings.AUTH_COOKIE['ACCESS'], 
                access_token, 
                max_age=settings.AUTH_COOKIE['ACCESS_MAX_AGE'], 
                httponly=settings.AUTH_COOKIE['HTTP_ONLY'], 
                samesite=settings.AUTH_COOKIE['SAME_SITE'], 
                secure=settings.AUTH_COOKIE['SECURE']
            )
            response.set_cookie(
                settings.AUTH_COOKIE['REFRESH'], 
                refresh_token, 
                max_age=settings.AUTH_COOKIE['ACCESS_MAX_AGE'], 
                httponly=settings.AUTH_COOKIE['HTTP_ONLY'], 
                samesite=settings.AUTH_COOKIE['SAME_SITE'], 
                secure=settings.AUTH_COOKIE['SECURE']
            )
        
        return response

class CustomTokenRefreshView(TokenRefreshView):
    serializer_class = CustomTokenRefreshSerializer
    
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get(settings.AUTH_COOKIE['REFRESH'])
        
        if refresh_token:
            request.data[settings.AUTH_COOKIE['REFRESH']] = refresh_token
            
        response = super().post(request, *args, **kwargs)
        
        if response.status_code == 200:
            access_token = response.data.get(settings.AUTH_COOKIE['ACCESS'])
            response.set_cookie(
                settings.AUTH_COOKIE['ACCESS'], 
                access_token, 
                max_age=settings.AUTH_COOKIE['ACCESS_MAX_AGE'], 
                httponly=settings.AUTH_COOKIE['HTTP_ONLY'], 
                samesite=settings.AUTH_COOKIE['SAME_SITE'], 
                secure=settings.AUTH_COOKIE['SECURE']
            )
            
        return response
    
class CustomTokenVerifyView(TokenVerifyView):
    serializer_class = CustomTokenVerifySerializer
    
    def post(self, request, *args, **kwargs):
        access_token = request.COOKIES.get(settings.AUTH_COOKIE['ACCESS'])
        
        if access_token:
            request.data['token'] = access_token
            
        return super().post(request, *args, **kwargs)
    
class LogoutView(APIView):
    def post(self, _req, *args, **kwargs):
        res = Response()
        res.delete_cookie(settings.AUTH_COOKIE['ACCESS'])
        res.delete_cookie(settings.AUTH_COOKIE['REFRESH'])
        res.data = {
            'success': True,
            'message': 'Logout success'
        }
        return res
    
class CustomProviderAuthView(ProviderAuthView):
    def get_serializer_class(self):
        return CustomProviderAuthSerializer
    
    def perform_create(self, serializer):
        super().perform_create(serializer)
        user = serializer.instance.get('user')

        if user and hasattr(user, 'first_name'):
            if user.first_name:
                user.name = user.first_name
            elif hasattr(user, 'last_name') and user.last_name:
                user.name = user.last_name
            user.save()
    
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        
        if response.status_code == 201:
            access_token = response.data.get(settings.AUTH_COOKIE['ACCESS'])
            refresh_token = response.data.get(settings.AUTH_COOKIE['REFRESH'])
            
            response.set_cookie(
                settings.AUTH_COOKIE['ACCESS'], 
                access_token, 
                max_age=settings.AUTH_COOKIE['ACCESS_MAX_AGE'], 
                httponly=settings.AUTH_COOKIE['HTTP_ONLY'], 
                samesite=settings.AUTH_COOKIE['SAME_SITE'], 
                secure=settings.AUTH_COOKIE['SECURE']
            )
            response.set_cookie(
                settings.AUTH_COOKIE['REFRESH'], 
                refresh_token, 
                max_age=settings.AUTH_COOKIE['ACCESS_MAX_AGE'], 
                httponly=settings.AUTH_COOKIE['HTTP_ONLY'], 
                samesite=settings.AUTH_COOKIE['SAME_SITE'], 
                secure=settings.AUTH_COOKIE['SECURE']
            )
            
        return response
    
class UpdateNameView(APIView):
    def post(self, request, *args, **kwargs):
        user = request.user
        name = request.data.get('name')
        user.name = name
        user.save()
        return Response({'message': 'Successfully updated name', 'name':name})
        