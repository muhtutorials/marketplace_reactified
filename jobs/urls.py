from django.urls import path

from . import views


urlpatterns = [
    path('', views.JobListCreateView.as_view()),
    path('<int:pk>/', views.PostDetailEditDeleteView.as_view()),
    path('<int:pk>/accept/', views.JobAcceptView.as_view()),
    path('<int:pk>/decline/', views.JobDeclineView.as_view()),
    path('<int:pk>/done/', views.JobDoneView.as_view()),
]
