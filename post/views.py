import json
from django.shortcuts import render, redirect, get_object_or_404
from .models import DollidoLstId
from django.http import HttpResponse
from django.contrib import messages
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class PostView(APIView):
  serializer_class = PostSerializer
  queryset = DollidoLstId.objects.all()
  
  def detail_lost(request, pk):
    lost_list = get_object_or_404(queryset, pk=pk)
    return Resonse({"lost":lost}, status=status.HTTP_200_OK)