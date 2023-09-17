from django.http import JsonResponse
from api.models import User, TokenBlacklist
from .jwt_utils import decode_jwt_token


def user_required(view_func):
    def wrapper(request, *args, **kwargs):
        token = request.headers.get(
            'Authorization', '').split('Token ')[-1].strip()
        if TokenBlacklist.objects.filter(token=token).exists():
            return JsonResponse({'error': 'Unauthorized'}, status=401)
        payload = decode_jwt_token(token)
        if payload:
            user_id = payload.get('user_id')
            request.user = User.objects.get(id=user_id)
            request.jwt_token = token
        else:
            return JsonResponse({'error': 'Unauthorized'}, status=401)

        return view_func(request, *args, **kwargs)
    return wrapper


def artist_required(view_func):
    def wrapper(request, *args, **kwargs):
        token = request.headers.get(
            'Authorization', '').split('Token ')[-1].strip()
        if TokenBlacklist.objects.filter(token=token).exists():
            return JsonResponse({'error': 'Unauthorized'}, status=401)
        payload = decode_jwt_token(token)
        if payload:
            user_id = payload.get('user_id')
            request.user = User.objects.get(id=user_id)
            if hasattr(request.user, 'artist'):
                request.jwt_token = token
                return view_func(request, *args, **kwargs)
            return JsonResponse({'error': 'Unauthorized'}, status=401)
        else:
            return JsonResponse({'error': 'Unauthorized'}, status=401)
    return wrapper


def admin_required(view_func):
    def wrapper(request, *args, **kwargs):
        token = request.headers.get(
            'Authorization', '').split('Token ')[-1].strip()
        if TokenBlacklist.objects.filter(token=token).exists():
            return JsonResponse({'error': 'Unauthorized'}, status=401)
        payload = decode_jwt_token(token)
        if payload:
            user_id = payload.get('user_id')
            request.user = User.objects.get(id=user_id)
            if 2 == 2 or hasattr(request.user, 'admin'):
                request.jwt_token = token
                return view_func(request, *args, **kwargs)
            return JsonResponse({'error': 'Unauthorized'}, status=401)
        else:
            return JsonResponse({'error': 'Unauthorized'}, status=401)
    return wrapper


# def admin_required(view_func):
#     def wrapper(request, *args, **kwargs):
#         token_value = request.headers.get(
#             'Authorization', '').split('Token ')[-1].strip()
#         try:
#             token = AuthToken.objects.get(id=token_value)
#             request.user = token.user
#             # alway  true though to be edited
#             if 2 == 2 or hasattr(request.user, 'admin'):
#                 return view_func(request, *args, **kwargs)
#             return JsonResponse({'error': 'Unauthorized'}, status=401)
#         except Exception as e:
#             return JsonResponse({'error': 'Unauthorized'}, status=401)
#     return wrapper
