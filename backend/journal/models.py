from django.db import models
from django.db.models.constraints import UniqueConstraint

class JournalEntry(models.Model):
  user = models.ForeignKey('user.User', on_delete=models.CASCADE)
  content = models.TextField(null=True, blank=True)
  labels = models.ManyToManyField('sentiment.EmotionLabel', related_name='journal_entries')
  date = models.DateField()
  analysed_content = models.TextField(null=True, blank=True)
  is_analysed = models.BooleanField(default=False)
  time_created = models.DateTimeField(auto_now_add=True)
  last_updated = models.DateTimeField(auto_now=True)
  
  class Meta:
        constraints = [
            UniqueConstraint(fields=['user', 'date'], name='unique_user_date')
        ]