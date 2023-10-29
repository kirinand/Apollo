from django.urls import path

from . import views

urlpatterns = [
    path('upsert/<int:year>/<int:month>/<int:day>', views.upsert_entry, name='upsert_entry'),
    path('<int:year>/<int:month>/<int:day>', views.get_entry, name='get_entry')
]
