from rest_framework import serializers
from .models import Category, Task
 
 
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'color']
 
 
class TaskSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(
        source='category.name', read_only=True)
 
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'status',
                  'priority', 'due_date', 'category',
                  'category_name', 'completed_at']
        read_only_fields = ['completed_at']

    def validate_category(self, value):
        user = self.context['request'].user
        if value and value.owner != user:
            raise serializers.ValidationError(
                'ასეთი კატეგორია არ არსებობს')
        return value

    def validate_title(self, value):
        if len(value.strip()) < 3:
            raise serializers.ValidationError(
                'სათაური მინიმუმ 3 სიმბოლო უნდა იყოს')
        return value.strip()

