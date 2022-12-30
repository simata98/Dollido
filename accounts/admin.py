from django.contrib import admin
from .models import User
from django.contrib.auth.models import Group

class UserAdmin(admin.ModelAdmin):
  list_display = ('id', 'username', 'email', 'date_joined' ,'tel', 'is_active' ,'is_staff')
  search_fields = ('id', 'username', 'email', 'tel')

admin.site.register(User)
admin.site.unregister(Group)