from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from rest_framework.views import APIView
from rest_framework.response import Response
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
            access_token = response.data.get('access')
            refresh_token = response.data.get('refresh')
            
            response.set_cookie(
                'access', 
                access_token, 
                max_age=settings.AUTH_COOKIE_ACCESS_MAX_AGE, 
                httponly=True, 
                samesite='None', 
                secure=env.bool('AUTH_COOKIE_SECURE', True)
            )
            response.set_cookie(
                'refresh', 
                refresh_token, 
                max_age=settings.AUTH_COOKIE_REFRESH_MAX_AGE,
                httponly=True, 
                samesite='None', 
                secure=env.bool('AUTH_COOKIE_SECURE', True)
            )
        
        return response

class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh')
        
        if refresh_token:
            request.data['refresh'] = refresh_token
            
        response = super().post(request, *args, **kwargs)
        
        if response.status_code == 200:
            access_token = response.data.get('access')
            response.set_cookie(
                'access', 
                access_token, 
                max_age=settings.AUTH_COOKIE_ACCESS_MAX_AGE, 
                httponly=True, 
                samesite='None', 
                secure=env.bool('AUTH_COOKIE_SECURE', True)
            )
            
        return response
    
class CustomTokenVerifyView(TokenVerifyView):
    def post(self, request, *args, **kwargs):
        access_token = request.COOKIES.get('access')
        
        if access_token:
            request.data['token'] = access_token
            
        return super().post(request, *args, **kwargs)
    
class LogoutView(APIView):
    def post(self, _req, *args, **kwargs):
        res = Response()
        res.delete_cookie('access')
        res.delete_cookie('refresh')
        res.data = {
            'success': True,
            'message': 'Logout success'
        }
        return res
    