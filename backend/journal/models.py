from django.db import models

class JournalEntry(models.Model):
  user = models.ForeignKey('user.User', on_delete=models.CASCADE)
  content = models.TextField(null=True, blank=True)
  labels = models.ManyToManyField('sentiment.EmotionLabel', related_name='journal_entries')
  time_created = models.DateTimeField(auto_now_add=True)
  last_updated = models.DateTimeField(auto_now=True)
  