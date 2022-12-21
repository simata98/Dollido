from django.contrib import admin
from .models import DollidoLstId

admin.site.site_title = "제목 수정"

@admin.register(DollidoLstId)
class DollidoLstIdAdmin(admin.ModelAdmin):
    list_display = ['lstPrdtNm', 'lstPlace', 'lstYmd', 'create_date', 'find_status']
    list_filter = ['find_status']
    search_fields = ['lstPrdtNm', 'lstPlace']
