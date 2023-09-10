from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
import jwt, datetime
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
        raise AuthenticationFailed('Incorrect email or password')
    
    payload = {
        'uid': user.id,
        'username': user.email,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
        'iat': datetime.datetime.utcnow()
    }
    token = jwt.encode(payload, env('JWT_SECRET'), algorithm='HS256')
    
    res = Response()
    res.set_cookie(key='jwt', value=token, httponly=True)
    res.data = {
        'jwt': token
    }
    return res

@api_view(['GET'])
def get_user(request):
    token = request.COOKIES.get('jwt')
    
    if not token:
        raise AuthenticationFailed('Unauthorized')
    
    try:
        payload = jwt.decode(token, env('JWT_SECRET'), algorithms='HS256')
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Unauthorized')
    
    user = User.objects.filter(id=payload['uid']).first()
    serializer = UserSerializer(user)
    
    return Response(serializer.data)

@api_view(['POST'])
def logout(_request):
    res = Response()
    res.delete_cookie('jwt')
    res.data = {
        'message': 'Logout success'
    }
    return res