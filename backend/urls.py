from django.contrib import admin
from django.urls import path, include
from universities.views import CreateUserView
from universities.views import university_list

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('admin/', admin.site.urls),
    path("universities/user/register/", CreateUserView.as_view(), name="register"),
    path("universities/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("universities/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("universities-auth/", include("rest_framework.urls")),
    path('universities/', include('universities.urls')),
]
