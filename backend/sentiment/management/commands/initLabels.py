from django.core.management.base import BaseCommand
from sentiment.data import all_labels
from sentiment.models import EmotionLabel

class Command(BaseCommand):
  help = 'Initialize the sentiment labels in the database.'

  def handle(self, *args, **options):
    for id, label in all_labels.items():
      try:
        _, created = EmotionLabel.objects.update_or_create(id=id, name=label[0], score=label[1])
      except:
        self.stdout.write(self.style.ERROR(f'Error creating/updating label {label[0]}'))
         
      if created:
        self.stdout.write(self.style.SUCCESS(f'Successfully created label {label[0]}'))
      else:
        self.stdout.write(self.style.SUCCESS(f'Successfully updated label {label[0]}'))   
