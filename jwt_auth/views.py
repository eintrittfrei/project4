from datetime import datetime, timedelta
from rest_framework.views import APIView

from rest_framework.response import Response

from rest_framework import status
from rest_framework.exceptions import PermissionDenied
import jwt
from django.contrib.auth import get_user_model
from django.conf import settings
from .serializer import UserSerializer

from rest_framework.permissions import IsAuthenticated


User = get_user_model()



class RegisterView(APIView):

    def post(self, request):
        user_to_create = UserSerializer(data=request.data)
        if user_to_create.is_valid():
            user_to_create.save()
            return Response({ 'message': 'Registration Successfull' })
        return Response(user_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class LoginView(APIView):

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        try:
            user_to_login = User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied(detail='Invalid Credentials')
        if not user_to_login.check_password(password):
            raise PermissionDenied(detail='Invalid Credentials')

        dt = datetime.now() + timedelta(days=7)
        token = jwt.encode(
            {'sub': user_to_login.id, 'exp': int(dt.strftime('%s'))},
            settings.SECRET_KEY,
            algorithm='HS256'
        )
        return Response({ 'token': token, 'message': f"Welcome back {user_to_login.username}" })

class ProfileView(APIView):
    permission_classes = (IsAuthenticated, )
    
    def get(self, _request, pk):
        profile = User.objects.get(pk=pk)
        serialized_profile = UserSerializer(profile)
        return Response(serialized_profile.data, status=status.HTTP_200_OK)

 