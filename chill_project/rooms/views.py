from rest_framework.viewsets import ReadOnlyModelViewSet

from .serializers import RoomSerializer, SoundsSerializer
from .models import Room, Sounds


class RoomList(ReadOnlyModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class SoundList(ReadOnlyModelViewSet):
    queryset = Sounds.objects.all()
    serializer_class = SoundsSerializer