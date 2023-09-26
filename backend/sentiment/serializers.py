from rest_framework import serializers
from .models import EmotionLabel

class EmotionLabelSerializer(serializers.ModelSerializer):
  class Meta:
    model = EmotionLabel
    fields = ['name']