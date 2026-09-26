from rest_framework.permissions import BasePermission

class IsAdminRole(BasePermission):

    def has_permission(self, request, view):
        if request.method in ["GET", "HEAD", "OPTIONS"]:
            return True

        if not request.user.is_authenticated:
            return False

        return request.user.is_superuser or getattr(request.user, "role", None) == "admin"
        