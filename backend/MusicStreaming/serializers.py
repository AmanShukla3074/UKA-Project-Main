from rest_framework import serializers
from .models import *


class MusicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Music_M
        fields = '__all__'