from .common import TypeSerializer
from furniture.common import ShowSerializer

class PopulatedTypeSerializer(TypeSerializer): 
    furniture = ShowSerializer(many=True)

