from django.urls import path

from . import views

urlpatterns = [
    path('new/<int:year>/<int:month>/<int:day>', views.create_entry, name='create_entry'),
    path('update/<int:year>/<int:month>/<int:day>', views.update_entry, name='update_entry'),
    path('delete/<int:year>/<int:month>/<int:day>', views.delete_entry, name='delete_entry'),
    path('<int:year>/<int:month>/<int:day>', views.get_entry, name='get_entry')
]
