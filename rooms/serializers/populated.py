from furniture.common import ShowSerializer
from .common import RoomSerializer

class PopulatedRoomSerializer(RoomSerializer):
    furniture = ShowSerializer(many=True)
