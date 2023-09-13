from django.http import JsonResponse


def custom_404_view(request, exception=None):
    return JsonResponse({"error": "Resource not found"}, status=404)
