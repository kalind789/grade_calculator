from django.urls import path
from .views import LandingPageAPIView, SignUpAPIView, LogInAPIView, DashboardAPIView, LogoutAPIView

urlpatterns = [
    path('landing/', LandingPageAPIView.as_view(), name='landing'),
    path('signup/', SignUpAPIView.as_view(), name='signup'),
    path('login/', LogInAPIView.as_view(), name='login'),
    path('dashboard/', DashboardAPIView.as_view(), name='dashboard'),
    path('logout/', LogoutAPIView.as_view(), name='logout')
]
