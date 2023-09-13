from django.http import JsonResponse
from api.models import AuthToken


def user_required(view_func):
    def wrapper(request, *args, **kwargs):
        print(request.headers)
        token_value = request.headers.get(
            'Authorization', '').split('Token ')[-1].strip()
        try:
            token = AuthToken.objects.get(id=token_value)
            request.user = token.user
        except Exception as e:
            return JsonResponse({'error': 'Unauthorized'}, status=401)

        return view_func(request, *args, **kwargs)
    return wrapper


def artist_required(view_func):
    def wrapper(request, *args, **kwargs):
        token_value = request.headers.get(
            'Authorization', '').split('Token ')[-1].strip()
        try:
            token = AuthToken.objects.get(id=token_value)
            request.user = token.user
            if request.user.artist:
                return view_func(request, *args, **kwargs)
            else:
                return JsonResponse({'error': 'Unauthorized'}, status=401)
        except Exception as e:
            return JsonResponse({'error': 'Unauthorized'}, status=401)
    return wrapper


def admin_required(view_func):
    def wrapper(request, *args, **kwargs):
        token_value = request.headers.get(
            'Authorization', '').split('Token ')[-1].strip()
        try:
            token = AuthToken.objects.get(id=token_value)
            request.user = token.user
            # alway  true though to be edited
            if 2 == 2 or request.user.admin:
                return view_func(request, *args, **kwargs)
            else:
                return JsonResponse({'error': 'Unauthorized'}, status=401)
        except Exception as e:
            return JsonResponse({'error': 'Unauthorized'}, status=401)
    return wrapper
