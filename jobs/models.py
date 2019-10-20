from django.db import models
from django.contrib.auth.models import User


class Job(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    freelancer = models.ForeignKey(
        User, related_name='freelancer', blank=True, null=True, on_delete=models.SET_NULL
    )
    title = models.CharField(max_length=50)
    description = models.TextField()
    budget = models.PositiveIntegerField()
    is_done = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    def get_status(self):
        if self.is_done:
            status = 'Done'
        elif self.freelancer:
            status = 'Taken'
        else:
            status = 'Available'
        return status
