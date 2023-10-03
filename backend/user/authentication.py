from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings

class CustomJWTAuthentication(JWTAuthentication):
	def authenticate(self, request):
		try:
			raw_token = request.COOKIES.get('access')

			if raw_token is None:
				return None

			validated_token = self.get_validated_token(raw_token)

			return self.get_user(validated_token), validated_token
		except:
			return None

