from django.contrib.auth import get_user_model
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken, TokenBackendError, TokenError
from rest_framework_simplejwt.state import token_backend
from rest_framework_simplejwt.tokens import UntypedToken

class SetUserMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        paths_to_exclude = ['/api/user/signup', '/api/user/login', '/api/user/logout']

        if request.path_info in paths_to_exclude:
          return self.get_response(request)
        
        access_token = request.COOKIES.get('jwt_access')
        
        try:
          token_data = UntypedToken(access_token)
        except TokenError:
          return JsonResponse({'error': 'Invalid access token'}, status=401)  
            
        user_id = token_data.payload['user_id']
        User = get_user_model()
        
        try:
          user = User.objects.get(pk=user_id)
          # Set user using _force_auth_user to avoid being overwritten
          request._force_auth_user = user
        except User.DoesNotExist:
          return JsonResponse({'error': 'Invalid user id'}, status=401)
        
        response = self.get_response(request)
        return response
