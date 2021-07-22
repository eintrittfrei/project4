from django.db import models

# Create your models here.

class Show(models.Model):
    name = models.CharField(max_length=50, default=None)
    image = models.CharField(max_length=300, default=None)
    year = models.PositiveBigIntegerField(default=None)
    designer = models.CharField(max_length=50, default=None)
    color = models.CharField(max_length=50, default=None)
    description = models.CharField(max_length=100, default=None)

    def __str__(self):
        return f"{self.name} - {self.year}"
        
