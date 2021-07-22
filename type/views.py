from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers.populated import PopulatedTypeSerializer
from .models import Type


class TypeListView(APIView):

    def get(self, _request):
        types = Type.objects.all()
        serialized_types = PopulatedTypeSerializer(types, many=True)
        return Response(serialized_types.data, status=status.HTTP_200_OK)
        
