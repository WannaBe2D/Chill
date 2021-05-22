from django.contrib import admin

from.models import Room, Sounds


@admin.register(Room)
class AdminRoom(admin.ModelAdmin):
    pass


@admin.register(Sounds)
class AdminSounds(admin.ModelAdmin):
    pass
