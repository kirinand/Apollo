from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime, timedelta
from django.db.models import Count, F

from journal.models import JournalEntry

@api_view(['GET'])
def aggregate_sentiments(request):
  end = datetime.today().date()
  period = request.GET.get('period')
  
  match period:
    case 'week':
      start = end - timedelta(days=7)
    case 'month':
      start = end - timedelta(days=30)
    case 'quarter':
      start = end - timedelta(days=90)
    case 'year':
      start = end - timedelta(days=365)
    case _:
      start = end
      
  result = (JournalEntry.objects
    .filter(user=request.user, date__gte=start, date__lte=end)
    .values('labels__id', 'labels__name')
    .annotate(id=F('labels__id'), name=F('labels__name'), count=Count('labels__id'))
    .values('id', 'name', 'count')
    .order_by('labels__id')
  )
  
  return Response({'data': result})
