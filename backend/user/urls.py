from django.urls import path, include

from . import views

urlpatterns = [
    path('login', views.CustomTokenObtainPairView.as_view()),
    path('verify', views.CustomTokenVerifyView.as_view()),
    path('refresh', views.CustomTokenRefreshView.as_view()),
    path('logout', views.LogoutView.as_view()),
]
