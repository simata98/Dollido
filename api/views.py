from django.views.generic import ListView
from post.models import ApiListId

class ApiListView(ListView):
    model = ApiListId
    paginate_by = 10
    template_name = 'api/api_list.html'  #DEFAULT : <app_label>/<model_name>_list.html
    context_object_name = 'api_list'        #DEFAULT : <model_name>_list

    def get_queryset(self):
        api_list = ApiListId.objects.order_by('-fdYmd', 'fdPrdtNm')[:100]
        return api_list
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        paginator = context['paginator']
        page_numbers_range = 5
        max_index = len(paginator.page_range)

        page = self.request.GET.get('page')
        current_page = int(page) if page else 1

        start_index = int((current_page - 1) / page_numbers_range) * page_numbers_range
        end_index = start_index + page_numbers_range
        if end_index >= max_index:
            end_index = max_index

        page_range = paginator.page_range[start_index:end_index]
        context['page_range'] = page_range

        print(context)
        return context