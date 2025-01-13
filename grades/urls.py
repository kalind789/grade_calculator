from django.urls import path
from .views import LandingPageAPIView, SignUpAPIView, LogInAPIView

urlpatterns = [
    path('landing/', LandingPageAPIView.as_view(), name='landing_api'),
    path('signup/', SignUpAPIView.as_view(), name='signup_api'),
    path('login/', LogInAPIView.as_view(), name='login_api'),
    # path('dashboard/', dashboard_view, name='dashboard'),
    # path('logout/', logout_view, name='logout')
]
