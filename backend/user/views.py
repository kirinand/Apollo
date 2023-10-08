from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from rest_framework.views import APIView
from rest_framework.response import Response
from djoser.social.views import ProviderAuthView
import environ
import os
from django.conf import settings

env = environ.Env()
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENV_PATH = os.path.join(BASE_DIR, '.env')
environ.Env.read_env(ENV_PATH)

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        
        if response.status_code == 200:
            access_token = response.data.get(settings.AUTH_COOKIE.ACCESS)
            refresh_token = response.data.get(settings.AUTH_COOKIE.REFRESH)
            
            response.set_cookie(
                settings.AUTH_COOKIE.ACCESS, 
                access_token, 
                max_age=settings.AUTH_COOKIE.ACCESS_MAX_AGE, 
                httponly=settings.AUTH_COOKIE.HTTPONLY, 
                samesite=settings.AUTH_COOKIE.SAMESITE, 
                secure=settings.AUTH_COOKIE.SECURE
            )
            response.set_cookie(
                settings.AUTH_COOKIE.REFRESH, 
                refresh_token, 
                max_age=settings.AUTH_COOKIE.REFRESH_MAX_AGE,
                httponly=settings.AUTH_COOKIE.HTTPONLY, 
                samesite=settings.AUTH_COOKIE.SAMESITE, 
                secure=settings.AUTH_COOKIE.SECURE
            )
        
        return response

class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get(settings.AUTH_COOKIE.REFRESH)
        
        if refresh_token:
            request.data[settings.AUTH_COOKIE.REFRESH] = refresh_token
            
        response = super().post(request, *args, **kwargs)
        
        if response.status_code == 200:
            access_token = response.data.get(settings.AUTH_COOKIE.ACCESS)
            response.set_cookie(
                settings.AUTH_COOKIE.ACCESS, 
                access_token, 
                max_age=settings.AUTH_COOKIE.ACCESS_MAX_AGE, 
                httponly=settings.AUTH_COOKIE.HTTPONLY, 
                samesite=settings.AUTH_COOKIE.SAMESITE, 
                secure=settings.AUTH_COOKIE.SECURE
            )
            
        return response
    
class CustomTokenVerifyView(TokenVerifyView):
    def post(self, request, *args, **kwargs):
        access_token = request.COOKIES.get(settings.AUTH_COOKIE.ACCESS)
        
        if access_token:
            request.data['token'] = access_token
            
        return super().post(request, *args, **kwargs)
    
class LogoutView(APIView):
    def post(self, _req, *args, **kwargs):
        res = Response()
        res.delete_cookie(settings.AUTH_COOKIE.ACCESS)
        res.delete_cookie(settings.AUTH_COOKIE.REFRESH)
        res.data = {
            'success': True,
            'message': 'Logout success'
        }
        return res
    
class CustomProviderAuthView(ProviderAuthView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        
        if response.status_code == 201:
            access_token = response.data.get(settings.AUTH_COOKIE.ACCESS)
            refresh_token = response.data.get(settings.AUTH_COOKIE.REFRESH)
            
            response.set_cookie(
                settings.AUTH_COOKIE.ACCESS, 
                access_token, 
                max_age=settings.AUTH_COOKIE.ACCESS_MAX_AGE, 
                httponly=settings.AUTH_COOKIE.HTTPONLY, 
                samesite=settings.AUTH_COOKIE.SAMESITE, 
                secure=settings.AUTH_COOKIE.SECURE
            )
            response.set_cookie(
                settings.AUTH_COOKIE.REFRESH, 
                refresh_token, 
                max_age=settings.AUTH_COOKIE.REFRESH_MAX_AGE,
                httponly=settings.AUTH_COOKIE.HTTPONLY, 
                samesite=settings.AUTH_COOKIE.SAMESITE, 
                secure=settings.AUTH_COOKIE.SECURE
            )
            
        return response
    