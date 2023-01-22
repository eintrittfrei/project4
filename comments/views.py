from rest_framework.exceptions import NotFound
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from comments.models import Comment
from .serializers.common import CommentSerializer

class CommentListView(APIView):

    def post(self, request):
        request.data['owner'] = request.user.id
        comment_to_create = CommentSerializer(data=request.data)
        if comment_to_create.is_valid():
            comment_to_create.save()
            return Response(comment_to_create.data, status=status.HTTP_201_CREATED)
        return Response(comment_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class CommentDetailView(APIView):

    def delete(self, _request, pk):
        try:
            comment_to_delete = Comment.objects.get(pk=pk)
        except Comment.DoesNotExist:
            raise NotFound(detail="Comment not found")
        comment_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


      