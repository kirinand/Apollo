from django.urls import path

from . import views

urlpatterns = [
    path('aggregate/type', views.aggregate_sentiments, name='aggregate_sentiments'),
    path('aggregate/score', views.aggregate_scores_by_day, name='aggregate_scores')
]
