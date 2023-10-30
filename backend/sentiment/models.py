from django.db import models

class EmotionLabel(models.Model):
  id = models.IntegerField(primary_key=True)
  name = models.CharField(max_length=32, unique=True, null=False)
  score = models.FloatField(default=0)