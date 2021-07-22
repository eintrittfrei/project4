from comments.serializers.common import CommentSerializer
from type.serializers.common import TypeSerializer
from .common import ShowSerializer


class PopulatedShowSerializer(ShowSerializer):
    comments = CommentSerializer(many=True)
    type = TypeSerializer(many=True)

