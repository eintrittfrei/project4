from django.urls import path
from .views import ProfileView, RegisterView
from .views import LoginView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('<int:pk>/', ProfileView.as_view())
]