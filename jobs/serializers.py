from rest_framework import serializers

from .models import Job


class JobSerializer(serializers.ModelSerializer):
    freelancer = serializers.StringRelatedField()
    status = serializers.SerializerMethodField()

    class Meta:
        model = Job
        fields = '__all__'
        read_only_fields = ['user', 'freelancer', 'is_done']

    def get_status(self, obj):
        if obj.is_done:
            status = 'done'
        elif obj.freelancer:
            status = 'taken'
        else:
            status = 'available'
        return status
