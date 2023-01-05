from django.conf.urls import include, url
from django.urls import path
from .views import PostList, PostDetail, PostFilter
from django.conf.urls.static import static
from django.conf import settings

app_name = 'post'

urlpatterns = [
    # path('lost/<int:pk>/', views.detail_lost, name='detail_lost'),
    # path('create_lost', views.create_lost, name='create_lost'),
    # path('', views.show_lost, name='show_lost'),
    # path('lost/<int:pk>/edit/', views.edit_lost, name='edit_lost'),
    # path('delete_lost/<int:id>', views.delete_lost, name='delete_lost'),
    path('', PostList, name='post_list'),
    path('<int:pk>/', PostDetail, name='post_detail'),
    path('filter/', PostFilter, name='post_filter')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
