import json
from django.shortcuts import render, redirect, get_object_or_404
from .models import DollidoLstId
from django.http import HttpResponse
from django.contrib import messages
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import PostSerializer

@api_view(['GET', 'POST'])
def PostList(request):
  # 게시물 읽어오기
  if request.method == 'GET':
    post = DollidoLstId.objects.all()
    serializer = PostSerializer(post, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
  
  # 게시물 생성하기
  elif request.method == 'POST':
    serializer = PostSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=201)
    return Response(serializer.errors, status=404)

@api_view(['GET', 'PUT', 'DELETE'])
def PostDetail(request, pk):
  # pk에 해당하는 Post가 존재하는지 확인
  try:
    post = DollidoLstId.objects.get(pk=pk)
  except DollidoLstId.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)
  
  # Detail
  if request.method == 'GET':
    serializer = PostSerializer(post)
    return Response(serializer.data)
  
  # Update
  elif request.method == 'PUT':
    serializer = PostSerializer(post, data=request.data)
    
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_204_NO_CONTENT)
    
  # Delete
  elif request.method == 'DELETE':
    post.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
