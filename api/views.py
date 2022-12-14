from django.views.generic import ListView
from post.models import ApiListId
from django.db.models import Q
from django.contrib import messages
# from users.decorators import login_message_required
from django.shortcuts import render, get_object_or_404

class ApiListView(ListView):
    model = ApiListId
    paginate_by = 15
    template_name = 'api/api_list.html'  #DEFAULT : <app_label>/<model_name>_list.html
    context_object_name = 'api_list'        #DEFAULT : <model_name>_list

    def get_queryset(self):
        search_keyword = self.request.GET.get('q', '')
        search_type = self.request.GET.get('type', '')
        api_list = ApiListId.objects.order_by('-fdYmd', 'fdPrdtNm')
        
        if search_keyword :
            if len(search_keyword) > 1 :
                if search_type == 'all':
                    search_api_list = api_list.filter(Q (fdSbjt__icontains=search_keyword) | Q (category__icontains=search_keyword) | Q (clrNm__icontains=search_keyword))
                elif search_type == 'title':
                    search_api_list = api_list.filter(fdSbjt__icontains=search_keyword)
                elif search_type == 'category':
                    search_api_list = api_list.filter(category__icontains=search_keyword)
                elif search_type == 'color':
                    search_api_list = api_list.filter(clrNm__icontains=search_keyword)    

                # if not search_api_list :
                #     messages.error(self.request, '일치하는 검색 결과가 없습니다.')
                return search_api_list
            else:
                messages.error(self.request, '검색어는 2글자 이상 입력해주세요.')
        return api_list[:100]
    
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

        search_keyword = self.request.GET.get('q', '')
        search_type = self.request.GET.get('type', '')

        if len(search_keyword) > 1 :
            context['q'] = search_keyword
        context['type'] = search_type

        return context

def api_detail_view(request, pk):
    api = get_object_or_404(ApiListId, pk=pk)
    # api = ApiListId.objects.get(atcId=pk)
    # session_cookie = request.session['user_id']
    # cookie_name = F'notice_hits:{session_cookie}'

    # if request.user == api.writer:
    #     notice_auth = True
    # else:
    #     notice_auth = False
    
    context = {
        'api': api,
        # 'notice_auth': notice_auth,
    }
    return render(request, 'api/api_detail.html', context)