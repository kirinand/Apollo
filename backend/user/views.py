from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken, TokenBackendError, TokenError
from rest_framework_simplejwt.state import token_backend
from rest_framework import status
import environ
import os

from .serializers import UserSerializer
from .models import User

env = environ.Env()
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENV_PATH = os.path.join(BASE_DIR, '.env')
environ.Env.read_env(ENV_PATH)

@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)
     
@api_view(['POST']) 
def login(request):
    data = request.data
    email = data.get('email', None)
    password = data.get('password', None)
    
    user = authenticate(email=email, password=password)
    
    if user is None:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_404_NOT_FOUND)
    
    token = get_tokens_for_user(user)
      
    res = Response()
    res.set_cookie(key='jwt_access', value=token['access'], httponly=True)
    res.set_cookie(key='jwt_refresh', value=token['refresh'], httponly=True)
    res.data = {
        'user': {
            'email': user.email,
            'name': user.name,
        }
    }
    return res

@api_view(['GET'])
def check_user_status(request):
    access_token = request.COOKIES.get('jwt_access')
    is_refreshed = False
    
    if not access_token:
        return Response({"error": "Access token is missing"}, status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        token_data = token_backend.decode(access_token, verify=True) 
    except TokenBackendError:
        refresh_token = request.COOKIES.get('jwt_refresh')
        
        if not refresh_token:
            return Response({"error": "Refresh token is missing"}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)
            token_data = token_backend.decode(access_token, verify=True)
            is_refreshed = True
        except (TokenBackendError, TokenError):
            return Response({'error': 'Invalid or expired tokens'}, status=status.HTTP_401_UNAUTHORIZED)
     
    user_id = token_data["user_id"]
    
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)   
        
    res = Response()
    if is_refreshed:
        res.set_cookie(key='jwt_access', value=access_token, httponly=True)
    res.data = {
        'user': {
            'email': user.email,
            'name': user.name,
        }
    }
    
    return res

@api_view(['POST'])
def logout(_request):
    res = Response()
    res.delete_cookie('jwt_access')
    res.delete_cookie('jwt_refresh')
    res.data = {
        'success': True,
        'message': 'Logout success'
    }
    return res

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
