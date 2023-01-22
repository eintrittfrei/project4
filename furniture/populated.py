from jwt_auth.serializer import UserSerializer
from rooms.serializers.common import RoomSerializer
from comments.serializers.common import CommentSerializer
from type.serializers.common import TypeSerializer
from .common import ShowSerializer


class PopulatedShowSerializer(ShowSerializer):
    comments = CommentSerializer(many=True)
    type = TypeSerializer(many=True)
    room = RoomSerializer(many=True)
    owner = UserSerializer()