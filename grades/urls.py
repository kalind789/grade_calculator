from django.urls import path
from .views import LandingPageAPIView, SingUpAPIView, LogInAPIView

urlpatterns = [
    path('', LandingPageAPIView.as_view(), name='landing_api'),
    path('signup/', SingUpAPIView.as_view(), name='signup_api'),
    path('login/', LogInAPIView.as_view(), name='login_api'),
    # path('dashboard/', dashboard_view, name='dashboard'),
    # path('logout/', logout_view, name='logout')
]
