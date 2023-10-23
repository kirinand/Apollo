from django.db import models

class EmotionLabel(models.Model):
  name = models.CharField(max_length=32)
  entries = models.ManyToManyField('journal.JournalEntry', related_name='emotion_labels')
  score = models.FloatField(default=0.0)