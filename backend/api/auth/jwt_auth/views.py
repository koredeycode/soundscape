from api.serializers import ArtistSerializer, UserSerializer
from .decorators import user_required
from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from api.models import User, TokenBlacklist
from .jwt_utils import generate_jwt_token
import json


class LoginView(View):
    def post(self, request):
        try:
            data = json.loads(request.body.decode('utf-8'))
            username = data.get('username')
            password = data.get('password')
            try:
                user = User.objects.get(username=username)
            except User.DoesNotExist:
                return JsonResponse({'error': "Username does not exist"}, status=404)
            if not user.check_password(password):
                return JsonResponse({'error': "Incorrect password"}, status=404)
            token = generate_jwt_token(str(user.id))
            return JsonResponse({'token': str(token)})
        except json.JSONDecodeError:
            return JsonResponse({"error": "invalid data"}, status=400)


class LogoutView(View):
    @method_decorator(user_required)
    def post(self, request):
        # BlacklistToken
        TokenBlacklist.objects.create(token=request.jwt_token)
        return JsonResponse({'message': 'Logout successful'})


class RegisterView(View):
    def post(self, request):
        try:
            data = json.loads(request.body.decode('utf-8'))
            username = data.get('username')
            password = data.get('password')
            email = data.get('email')
            if User.objects.filter(username=username).exists():
                return JsonResponse({'error': 'User already exists'})
            user = User.objects.create(username=username, email=email)
            user.set_password(password)
            user.save()
            return JsonResponse(UserSerializer(user).data)
        except json.JSONDecodeError:
            return JsonResponse({"error": "invalid data"})
        except Exception as e:
            return JsonResponse({"error": str(e)})


class GetUserView(View):
    @method_decorator(user_required)
    def get(self, request):
        return JsonResponse(UserSerializer(request.user).data)


# class GetArtistView(View):
#     @method_decorator(artist_required)
#     def get(self, request):
#         return JsonResponse(ArtistSerializer(request.user.artist).data)
