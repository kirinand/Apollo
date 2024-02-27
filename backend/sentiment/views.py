from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime, timedelta
from django.db.models import Count, F, Avg

from journal.models import JournalEntry

@api_view(['GET'])
def aggregate_sentiments(request):
  start = request.GET.get('start')
  end = request.GET.get('end')
      
  result = (JournalEntry.objects
    .filter(user=request.user, date__gte=start, date__lte=end)
    .values('labels__id', 'labels__name')
    .annotate(id=F('labels__id'), name=F('labels__name'), count=Count('labels__id'))
    .values('id', 'name', 'count')
    .order_by('labels__id')
  )
  
  return Response({'data': result})


@api_view(['GET'])
def aggregate_scores_by_day(request):
  start = request.GET.get('start')
  end = request.GET.get('end')
  
  result = (JournalEntry.objects
    .filter(user=request.user, date__gte=start, date__lte=end)
    .values('date')
    .annotate(score=Avg('labels__score'))
    .order_by('date')
  )
  
  print(start)
  
  return Response({'data': result})
