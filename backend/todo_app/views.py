from django.shortcuts import render
from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from .models import Task, Category
from .serializers import TaskSerializer, CategorySerializer
from rest_framework.decorators import action
from django.utils import timezone
from rest_framework.response import Response


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['name', 'color']

    def get_queryset(self):
        return Category.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend,
        filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'priority', 'category']
    search_fields = ['title', 'description']
 
    def get_queryset(self):
        return (Task.objects
                .filter(owner=self.request.user)
                .select_related('category'))
 
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=True, methods=['get', 'post'])
    def complete(self, request, pk=None):
        task = self.get_object()
        task.status = Task.Status.DONE
        task.completed_at = timezone.now()
        task.save(update_fields=['status', 'completed_at'])
        return Response(self.get_serializer(task).data)

    @action(detail=False, methods=['get'])
    def stats(self, request):
        qs = self.get_queryset()
        today = timezone.now().date()
        done = qs.filter(status=Task.Status.DONE)
 
        return Response({
            'total': qs.count(),
            'done': done.count(),
            'overdue': qs.filter(due_date__lt=today)
                         .exclude(status=Task.Status.DONE)
                         .count(),
        })

