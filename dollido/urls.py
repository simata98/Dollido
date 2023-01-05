from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls', namespace='accounts')),
    path('lost112/', include('api.urls')),
    path('post/', include('post.urls')),
    path('', include('mainpage.urls')),
]
