from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.db import transaction
from .models import Class
from .serializers import ClassSerializer

# Create your views here.
class LandingPageAPIView(APIView):
    permission_classes = [AllowAny] 

    def get(self, request):
        return Response({"message": "Welcome to your Grade Tracker!"}, status=status.HTTP_200_OK)

@method_decorator(csrf_exempt, name='dispatch')
class SignUpAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        # Extract data from the request
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        password2 = request.data.get('password2')

        # Validate passwords
        if password != password2:
            return Response({"error": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if username already exists
        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

        # Check if email already exists
        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Use a transaction to ensure atomicity
            with transaction.atomic():
                # Create the user
                user = User.objects.create_user(username=username, password=password, email=email)
                token, created = Token.objects.get_or_create(user=user)

                return Response({"message": "User created successfully", "token": token.key}, status=status.HTTP_201_CREATED)
        except Exception as e:
            # Log the error and return an appropriate response
            print(f"Error during signup: {e}")
            return Response({"error": "An error occurred while creating the user"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@method_decorator(csrf_exempt, name='dispatch')
class LogInAPIView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        # Extract username and password from the request
        username = request.data.get('username')
        password = request.data.get('password')

        # Validate inputs
        if not username or not password:
            return Response({"error": "Both username and password are required"}, status=status.HTTP_400_BAD_REQUEST)

        # Authenticate the user
        user = authenticate(username=username, password=password)
        if user:
            # Generate or retrieve token
            token, created = Token.objects.get_or_create(user=user)
            return Response({"message": "Login successful", "token": token.key}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid username or password"}, status=status.HTTP_401_UNAUTHORIZED)
        
class DashboardAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        print(f"Headers: {request.headers}")  # Debug headers
        print(f"Authenticated user: {request.user}")
        print(f"User is authenticated: {request.user.is_authenticated}")
        return Response({"username": request.user.username}, status=status.HTTP_200_OK)
    
class LogoutAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # Delete the user's token
            token = Token.objects.get(user=request.user)
            token.delete()
            return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
        except Token.DoesNotExist:
            return Response({"error": "Token not found"}, status=status.HTTP_400_BAD_REQUEST)
        
class ClassListCreateAPIView(ListCreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = ClassSerializer

    def get_queryset(self):
        return Class.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
