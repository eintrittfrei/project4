from django.db import models

# Create your models here.

class Show(models.Model):
    name = models.CharField(max_length=50, default=None)
    image = models.CharField(max_length=300, default=None)
    year = models.PositiveBigIntegerField(default=None)
    designer = models.CharField(max_length=50, default=None)
    color = models.CharField(max_length=50, default=None)
    description = models.CharField(max_length=100, default=None)
    type = models.ManyToManyField("type.Type", related_name="furniture")
    room = models.ManyToManyField('rooms.Room', related_name="furniture")
    owner = models.ForeignKey(
      "jwt_auth.User",
      related_name="furniture",
      on_delete = models.CASCADE
    )

    def __str__(self):
        return f"{self.name} - {self.year}"
        
