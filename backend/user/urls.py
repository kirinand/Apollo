from django.urls import path

from . import views

urlpatterns = [
    path('o/<str:provider>/', views.CustomProviderAuthView.as_view()),
    path('login', views.CustomTokenObtainPairView.as_view()),
    path('verify', views.CustomTokenVerifyView.as_view()),
    path('refresh', views.CustomTokenRefreshView.as_view()),
    path('logout', views.LogoutView.as_view()),
    path('update/name', views.UpdateNameView.as_view()),
]
