from django.shortcuts import render, redirect, get_object_or_404
from dollido.forms import LostForm
from dollido.models import Lost, DollidoLstId
from django.http import HttpResponse
from django.contrib import messages

# Create your views here.

def detail_lost(request, pk):
    lost = get_object_or_404(DollidoLstId, pk=pk)
    return render(request, 'detail_lost.html', {'lost':lost})

def create_lost(request):
    if request.method == 'POST': # POST 방식으로 요청이 들어왔을 때
        form = LostForm(request.POST, request.FILES) # 입력된 내용들을 form이라는 변수에 저장
        if form.is_valid(): # form이 유효하다면(= models.py에서 정의한 필드에 적합하다면)
            lost = form.save(commit=False)
            lost.save()
            return redirect('/show_lost')
    else:
        form = LostForm()
    return render(request, 'create.html', {'form':form})

def show_lost(request):
    lost = DollidoLstId.objects.order_by('-id');
    return render(request, 'index.html', {'lost' : lost})

def edit_lost(request, pk):
    lost = get_object_or_404(DollidoLstId, pk=pk)
    if request.method == "POST":
        form = LostForm(request.POST, instance=lost)
        if form.is_valid():
            lost = form.save(commit=False)
            lost.save()
            return redirect('detail_lost', pk=lost.pk)
    else:
        form = LostForm(instance=lost)
    return render(request, 'create.html', {'form':form})


def delete_lost(request, id):
    lost = DollidoLstId.objects.get(id=id)
    lost.delete()
    messages.success(request, '삭제 성공!')    
    return redirect('/show_lost')
             
                
