from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Show

from .common import ShowSerializer
from .populated import PopulatedShowSerializer


 
# Create your views here.

class ShowListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
     
    def get(self, _request):
        
        furniture = Show.objects.all()
        serialized_furniture = PopulatedShowSerializer(furniture, many=True)
        return Response(serialized_furniture.data, status=status.HTTP_200_OK)


    def post(self, request):
        request.data['owner'] = request.user.id
        furniture_to_add = ShowSerializer(data=request.data)
        if furniture_to_add.is_valid():
            furniture_to_add.save()
            return Response(furniture_to_add.data, status=status.HTTP_201_CREATED)
        return Response(furniture_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)



class ShowDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
    
    def get_one(self, pk):
        try:
            return Show.objects.get(pk=pk)
        except Show.DoesNotExist:
            raise NotFound(detail="🐙 Can't find that piece")


    def get(self, _request, pk):
        furniture_one = self.get_one(pk=pk)
        serialized_furniture_one = PopulatedShowSerializer(furniture_one)
        return Response(serialized_furniture_one.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        request.data['owner'] = request.user.id
        piece_to_edit = self.get_one(pk=pk)
        updated_piece = ShowSerializer(piece_to_edit, data=request.data)
        if updated_piece.is_valid():
            updated_piece.save()
            return Response(updated_piece.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_piece.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        

    def delete(self, _request, pk):
        piece_to_delete = self.get_one(pk=pk)
        piece_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

