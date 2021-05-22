from django.db import models


class Sounds(models.Model):
    name = models.CharField(max_length=200)
    music = models.FileField(upload_to="music")

    def __str__(self):
        return f'ID: {self.id}  {self.name}'


class Room(models.Model):
    name = models.CharField(max_length=200)
    image = models.ImageField(upload_to="background")
    sound = models.ManyToManyField(Sounds)

    def __str__(self):
        return f'ID: {self.id}  {self.name}'
