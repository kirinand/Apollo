from django.urls import path

from . import views

urlpatterns = [
    path('new', views.create_entry, name='create_entry'),
    path('<eid>/update', views.update_entry, name='update_entry'),
    path('<eid>/delete', views.delete_entry, name='delete_entry'),
    path('recent', views.get_recent_entries, name='get_recent_entries'),
    path('<eid>', views.get_entry_by_id, name='get_entry_by_id'),
    path('calendar/<year>/<month>/<day>', views.get_entries_by_date, name='get_entries_by_date')
]
