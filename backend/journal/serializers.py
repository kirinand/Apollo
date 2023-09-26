from rest_framework import serializers
from .models import JournalEntry

class JournalEntrySerializer(serializers.ModelSerializer):
  class Meta:
    model = JournalEntry
    fields = ['id', 'content', 'labels', 'time_created', 'last_updated']