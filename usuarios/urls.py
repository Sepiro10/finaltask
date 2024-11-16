from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from usuarios import views

urlpatterns = [
    path('create-super/', views.CreateSuperUserView.as_view(), name='create-superuser'),  # Endpoint para crear superusuario
    path('create/', views.CreateUserView.as_view()),
    path('UpdateModifyDestroy/<int:pk>', views.RetreiveUpdateUserView.as_view()),
    path('token/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('getList/', views.EmpeladoListView.as_view()),
    path('userList/', views.UserList.as_view())
]