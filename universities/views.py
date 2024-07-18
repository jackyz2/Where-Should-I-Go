from django.shortcuts import render
from .models import get_university_rankings
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

def university_list(request):
    universities = get_university_rankings()
    return render(request, 'universities/university_list.html', {'universities' : universities})

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


# Create your views here.
