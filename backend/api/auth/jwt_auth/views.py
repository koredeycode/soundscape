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
            email = data.get('email')
            password = data.get('password')

            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return JsonResponse({'error': "Email does not exist"}, status=404)
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
            first_name = data.get('first_name')
            last_name = data.get('last_name')
            if User.objects.filter(username=username).exists():
                return JsonResponse({'error': 'Username already taken'}, status=400)
            if User.objects.filter(email=email).exists():
                return JsonResponse({'error': 'User with that email exists'}, status=400)
            user = User.objects.create(
                username=username, email=email, first_name=first_name, last_name=last_name)
            user.set_password(password)
            user.save()
            return JsonResponse(UserSerializer(user).data)
        except json.JSONDecodeError:
            return JsonResponse({"error": "invalid data"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)


class GetUserView(View):
    @method_decorator(user_required)
    def get(self, request):
        return JsonResponse(UserSerializer(request.user).data)


# class GetArtistView(View):
#     @method_decorator(artist_required)
#     def get(self, request):
#         return JsonResponse(ArtistSerializer(request.user.artist).data)
