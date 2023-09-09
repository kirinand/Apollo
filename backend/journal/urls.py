from django.urls import path

from . import views

urlpatterns = [
    # path(""),
    path('new', views.index),
    # path("recent"),
]
