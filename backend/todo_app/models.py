from django.conf import settings
from django.db import models
 
 
class Category(models.Model):
    name = models.CharField(max_length=60)
    color = models.CharField(max_length=7, default='#44b78b')
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='categories',
    )
 
    class Meta:
        unique_together = ('owner', 'name')
 
    def __str__(self):
        return self.name

class UserProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='profile',
    )
    daily_goal = models.PositiveIntegerField(default=5)
    timezone = models.CharField(max_length=50, default='Asia/Tbilisi')


class Task(models.Model):
    class Status(models.TextChoices):
        TODO = 'todo', 'გასაკეთებელი'
        IN_PROGRESS = 'in_progress', 'მიმდინარე'
        DONE = 'done', 'დასრულებული'

    class Priority(models.IntegerChoices):
        LOW = 1, 'დაბალი'
        MEDIUM = 2, 'საშუალო'
        HIGH = 3, 'მაღალი'
 
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20,
        choices=Status.choices, default=Status.TODO)
    priority = models.PositiveSmallIntegerField(
        choices=Priority.choices,
        default=Priority.MEDIUM
    )
    due_date = models.DateField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE, related_name='tasks')
    category = models.ForeignKey(Category, null=True,
        blank=True, on_delete=models.SET_NULL, related_name='tasks')
    created_at = models.DateTimeField(auto_now_add=True)
 
    class Meta:
        ordering = ['-priority', 'due_date']
