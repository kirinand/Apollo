from django.urls import path

from . import views

urlpatterns = [
    path('', views.get_user),
    path('signup', views.signup),
    path('login', views.login),
    path('logout', views.logout),
]
