from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.core.paginator import Paginator

from .models import JournalEntry
from .serializers import JournalEntrySerializer

@api_view(['POST'])
def create_entry(request):
    content = request.data.get('content')
    entry = JournalEntry.objects.create(user=request.user, content=content)
    entry.save()
    
    return Response({'message': 'Successfully created new entry', 'id': entry.id})

@api_view(['POST'])
def update_entry(request, eid):
    entry = get_object_or_404(JournalEntry, pk=eid, user=request.user)
    entry.content = request.data.get('content', entry.content)
    entry.save()
    
    return Response({'message': 'Successfully updated entry', 'id': entry.id})

@api_view(['POST'])
def delete_entry(request, eid):
    entry = get_object_or_404(JournalEntry, pk=eid, user=request.user)
    entry.delete()
    
    return Response({'message': 'Successfully deleted entry'})

@api_view(['GET'])
def get_recent_entries(request):
    entries = JournalEntry.objects.filter(user=request.user).order_by('-time_created')
    
    paginator = Paginator(entries, 10)
    page = request.GET.get('page')
    entries = paginator.get_page(page)
    
    serializer = JournalEntrySerializer(entries, many=True)
    
    return Response({'entries': serializer.data})

@api_view(['GET'])
def get_entries_by_date(request, year, month, day):
    entries = JournalEntry.objects.filter(user=request.user, time_created__year=year, time_created__month=month, time_created__day=day).order_by('-time_created')
    
    if entries.count() > 10:
        paginator = Paginator(entries, 10)
        page = request.GET.get('page')
        entries = paginator.get_page(page)
    
    serializer = JournalEntrySerializer(entries, many=True)
    
    return Response({'entries': serializer.data})
    

@api_view(['GET'])
def get_entry_by_id(request, eid):
    entry = get_object_or_404(JournalEntry, pk=eid, user=request.user)
    
    serializer = JournalEntrySerializer(entry)
    return Response({'entry': serializer.data})
    
