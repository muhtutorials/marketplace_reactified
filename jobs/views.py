from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from .models import Job
from .serializers import JobSerializer
from .permissions import IsOwnerOrReadOnly


class JobListCreateView(generics.ListCreateAPIView):
    queryset = Job.objects.all().order_by('-timestamp')
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    # add user object contained in request to job instance when creating it
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PostDetailEditDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsOwnerOrReadOnly]


class JobAcceptView(generics.RetrieveAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        job = Job.objects.get(pk=self.kwargs['pk'])
        # allow the job to be taken by only one user
        if not job.freelancer:
            job.freelancer = request.user
            job.save()
        return self.retrieve(request, *args, **kwargs)


class JobDeclineView(generics.RetrieveAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        job = Job.objects.get(pk=self.kwargs['pk'])
        # allow only the user who has taken the job to decline it
        if request.user == job.freelancer:
            job.freelancer = None
            job.is_done = False
            job.save()
        return self.retrieve(request, *args, **kwargs)


class JobDoneView(generics.RetrieveAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        job = Job.objects.get(pk=self.kwargs['pk'])
        # allow only the user who has taken the job to mark it as done
        if request.user == job.freelancer:
            job.is_done = True
            job.save()
        return self.retrieve(request, *args, **kwargs)
