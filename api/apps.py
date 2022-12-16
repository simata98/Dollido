from django.apps import AppConfig

class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'
    def ready(self):
        from post.models import ApiListId
        from .broker import sched_lost, get_lost112
        get_lost112()
        sched_lost()
