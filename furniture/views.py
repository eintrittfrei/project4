from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .models import Show
from .serializers import ShowSerializer


# Create your views here.

class ShowListView(APIView):

    def get(self, _request):
        furniture = Show.objects.all()
        serialized_furniture = ShowSerializer(furniture, many=True)
        return Response(serialized_furniture.data, status=status.HTTP_200_OK)


class ShowDetailView(APIView):
    
    def get_one(self, pk):
        try:
            return Show.objects.get(pk=pk)
        except Show.DoesNotExist:
            raise NotFound(detail="🐙 Can't find that piece")


    def get(self, _reqeust, pk):
        furniture_one = self.get_one(pk=pk)
        serialized_furniture_one = ShowSerializer(furniture_one)
        return Response(serialized_furniture_one.data, status=status.HTTP_200_OK)


