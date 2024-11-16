from django.urls import path
from insignias import views
from .views import list_badges_by_user

urlpatterns = [
    path('create/', views.createBadge.as_view()),
    path('UpdateModifyDestroy/<int:pk>', views.detailBadge.as_view()),
    path('createUB/', views.createUserBadge.as_view()),
    path('UpdateModifyDestroyUB/<int:pk>', views.detailUserBadge.as_view()),
    path('listUserBadge/', list_badges_by_user, name='listUserBadge'),
    path('listBadge/', views.listBadge.as_view()),
]
