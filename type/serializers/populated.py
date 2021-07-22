from .common import TypeSerializer
from furniture.common import ShowSerializer

class PopulatedTypeSerializer(TypeSerializer):
    
    type = ShowSerializer(many=True)
    
