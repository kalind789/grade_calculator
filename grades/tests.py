from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

class GradesAppTests(TestCase):
    def setUp(self):
        # Set up test data and client
        self.client = APIClient()

        # Create a test user
        self.user = User.objects.create_user(username="testuser", password="testpassword")
        self.token, _ = Token.objects.get_or_create(user=self.user)

        # Authenticate all subsequent requests
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token.key}")

    def test_landing_page(self):
        # Test the landing page API
        response = self.client.get(reverse('landing'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["message"], "Welcome to your Grade Tracker!")

    def test_dashboard_access(self):
        # Debug: Log the token being used
        print(f"Using token: {self.token.key}")

        # Make the request with the Authorization header
        response = self.client.get(
            reverse('dashboard'),
            HTTP_AUTHORIZATION=f"Token {self.token.key}"  # Ensure the token is passed
        )
        print(f"Response status code: {response.status_code}")
        print(f"Response data: {response.data}")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["username"], "testuser")

    def test_invalid_login(self):
        # Test login with invalid credentials
        response = self.client.post(reverse('login'), {
            "username": "wronguser",
            "password": "wrongpassword"
        })
        self.assertEqual(response.status_code, 401)
        self.assertIn("error", response.data)

    def test_valid_login(self):
        # Test login with valid credentials
        response = self.client.post(reverse('login'), {
            "username": "testuser",
            "password": "testpassword"
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn("token", response.data)