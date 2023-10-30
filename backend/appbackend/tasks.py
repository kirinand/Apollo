from celery import shared_task

from multi_label_emo_classifier.predict import predict
from journal.models import JournalEntry
from sentiment.models import EmotionLabel

from celery.utils.log import get_task_logger

logger = get_task_logger(__name__)

@shared_task
def analyse_sentiment(entry_id):
  logger.info("Task started")
  entry = JournalEntry.objects.get(id=entry_id)
  content = entry.content

  if not entry.is_analysed and _check_analyse_needed(content, entry.analysed_content):
    
    if content:
      label_ids = _get_label_ids(content)
      print(label_ids)
      labels = EmotionLabel.objects.filter(id__in=label_ids)
      entry.labels.set(labels)
    else:
      entry.labels.clear()
      
    entry.is_analysed = True
    entry.analysed_content = content
    entry.save()
    logger.info("Task ended")
    
 
def _check_analyse_needed(content, analysed_content):
  if not content and not analysed_content:
    return False
  
  if content == analysed_content:
    return False
  
  return True


def _get_label_ids(content):
  output = predict(content)[0]
  label_ids = [idx for idx, label in enumerate(output) if label == 1]
  return label_ids
