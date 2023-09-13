from api.serializers.user import UserSerializer
from .decorators import user_required
from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from api.models import AuthToken, User

import json


class LoginView(View):
    def post(self, request):
        try:
            data = json.loads(request.body.decode('utf-8'))
            username = data.get('username')
            password = data.get('password')
            user = User.objects.filter(
                username=username, password=password).first()
            if user is not None:
                token, _ = AuthToken.objects.get_or_create(user=user)
                return JsonResponse({'token': token.id})
            else:
                return JsonResponse({'error': 'Invalid credentials'})
        except json.JSONDecodeError:
            return JsonResponse({"error": "invalid data"})


class LogoutView(View):
    @method_decorator(user_required)
    def post(self, request):
        token = AuthToken.objects.get(user=request.user)
        token.delete()
        return JsonResponse({'message': 'Logout successful'})


class RegisterView(View):
    def post(self, request):
        try:
            data = json.loads(request.body.decode('utf-8'))
            print(data)
            username = data.get('username')
            password = data.get('password')
            email = data.get('email')
            if User.objects.filter(username=username).exists():
                return JsonResponse({'error': 'User already exists'})
            user = User.objects.create(username=username,
                                       password=password, email=email)
            return JsonResponse(UserSerializer(user).data)
        except json.JSONDecodeError:
            return JsonResponse({"error": "invalid data"})
        except Exception as e:
            print(e)
            return JsonResponse({"error": str(e)})


class GetMeView(View):
    @method_decorator(user_required)
    def get(self, request):
        return JsonResponse(UserSerializer(request.user).data)
