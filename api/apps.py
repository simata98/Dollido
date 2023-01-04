from django.apps import AppConfig

class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'
    def ready(self):
        from post.models import ApiListId
        from .broker import sched_lost, get_lost112, count_rows
        # get_lost112()
        # count_rows()
        # sched_lost()
