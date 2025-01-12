from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout

# Create your views here.
class LandingPageAPIView(APIView):
    def get(self, request):
            return Response({"message": "Welcome to the Grade Tracker API!"}, status=status.HTTP_200_OK)

class SingUpAPIView(APIView):
    def post(self, request):
            username = request.data.get('username')
            email = request.data.get('email')
            password = request.data.get('password')
            password2 = request.data.get('password2')

            if password != password2:
                return Response({"error": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)
            
            if User.objects.filter(username=username).exists():
                return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST) 
            
            user = User.objects.create_user(username=username, password=password, email=email)
            token, created = Token.objects.get_or_create(user=user)

            return Response({"message": "User created successfully", "token": token.key}, status=status.HTTP_201_CREATED)


class LogInAPIView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"message": "Login successful", "token": token.key}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid username or password"}, status=status.HTTP_401_UNAUTHORIZED)