from django.views import View
from django.http import JsonResponse


class StatusView(View):
    def get(self, request):
        """
        status/
        """
        return JsonResponse({"status": "active"})
