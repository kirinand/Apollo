from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db import IntegrityError

from .models import JournalEntry
from .serializers import JournalEntrySerializer
from appbackend.tasks import analyse_sentiment

PREFIX_AS = 'analyse_sentiment'

@api_view(['POST'])
def upsert_entry(request, year, month, day):
    content = request.data.get('content')
    action = 'updated'
    try:
        entry = JournalEntry.objects.get(user=request.user, date__year=year, date__month=month, date__day=day)
        entry.content = content
        entry.is_analysed = False
    except JournalEntry.DoesNotExist:
        entry = JournalEntry.objects.create(user=request.user, content=content, date=f'{year}-{month}-{day}')
        action = 'created'
    entry.save()
    
    try:
        analyse_sentiment.apply_async(args=(entry.id,), countdown=300, task_id=f'{PREFIX_AS}_{request.user.id}_{entry.id}')
    except Exception as e:
        print("Failed to add to task queue", e)
        
    return Response({'message': f'Successfully {action} entry', 'id': entry.id})

@api_view(['POST'])
def analyse_entry(request, year, month, day):
    try:
        entry = JournalEntry.objects.get(user=request.user, date__year=year, date__month=month, date__day=day)
    except JournalEntry.DoesNotExist:
        return Response({})
    
    if not entry.is_analysed:
        try:
            analyse_sentiment.apply_async(args=(entry.id,), countdown=5, task_id=f'{PREFIX_AS}_{request.user.id}_{entry.id}')
        except Exception as e:
            print("Failed to add to task queue", e)
            
    return Response({})

@api_view(['GET'])
def get_entry(request, year, month, day):
    entry = get_object_or_404(JournalEntry, user=request.user, date__year=year, date__month=month, date__day=day)
    
    serializer = JournalEntrySerializer(entry)
    return Response({'entry': serializer.data})
        
@api_view(['POST'])
def create_entry(request, year, month, day):
    content = request.data.get('content')
    try:
        entry = JournalEntry.objects.create(user=request.user, content=content, date=f'{year}-{month}-{day}')
    except IntegrityError:
        return Response({'message': 'Entry already exists for this date'}, status=400)
    
    entry.save()
    return Response({'message': 'Successfully created new entry', 'id': entry.id})

@api_view(['PUT'])
def update_entry(request, year, month, day):
    entry = get_object_or_404(JournalEntry, user=request.user, date__year=year, date__month=month, date__day=day)
    entry.content = request.data.get('content', entry.content)
    entry.save()
    
    return Response({'message': 'Successfully updated entry', 'id': entry.id})

@api_view(['DELETE'])
def delete_entry(request, year, month, day):
    try:
        entry = JournalEntry.objects.get(user=request.user, date__year=year, date__month=month, date__day=day)
        entry.delete()
    except JournalEntry.DoesNotExist:
        return Response({'message': 'Entry does not exist'})
    
    return Response({'message': 'Successfully deleted entry'})

@api_view(['GET'])
def test_debug_task(request):
    from appbackend.celery import debug_task
    result = debug_task()
    return Response({'message': f'{result}'})
