from django.urls import path
from .views import TypeListView

urlpatterns = [
    path('', TypeListView.as_view())
]

