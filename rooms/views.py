from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers.populated import PopulatedRoomSerializer
from .models import Room

class RoomListView(APIView):

    def get(self, _request):
        rooms = Room.objects.all()
        serialized_rooms = PopulatedRoomSerializer(rooms, many=True)
        return Response(serialized_rooms.data, status=status.HTTP_200_OK)
