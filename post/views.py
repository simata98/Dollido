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
from accounts.serializers import UserSerializer
import tensorflow as tf
from tensorflow import keras
import matplotlib.pyplot as plt
import numpy as np
import os
from keras.models import model_from_json

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
      
      # 색상 구분 파이프라인
      json_file = open("post/color_classification/model.json", "r")
      loaded_model_json = json_file.read()
      json_file.close()
      loaded_model = model_from_json(loaded_model_json)

      loaded_model.load_weights('post/color_classification/fashion-EFN-model.best.h5')
      IMAGE_PATH = serializer.data['lstFilePathImg'][1:]
      IMAGE_SIZE = 224
      THRESHOLD = 0.1
      
      def predict_color(img_path=IMAGE_PATH, isize=IMAGE_SIZE, thrs=THRESHOLD):
        classes = ['Beige', 'Black', 'Blue', 'Brown', 'Gold', 'Green', 'Grey', 'Maroon', 'Navy',
          'Olive', 'Orange', 'Pink', 'Purple', 'Red', 'Silver', 'White', 'Yellow']
      
        image = keras.preprocessing.image.load_img(img_path, target_size=(isize, isize))
        data = np.asarray(image)
        ndata = np.expand_dims(data, axis=0)
        y_prob = loaded_model.predict(ndata/255)
        y_prob.argmax(axis=-1)
        
        color_result_list = [classes[i] for i in np.where(np.ravel(y_prob)>thrs)[0]]
        confident_result_list = [np.ravel(y_prob)[i] for i in list(np.where(np.ravel(y_prob)>thrs)[0])]
        classification_result = color_result_list[confident_result_list.index(max(confident_result_list))]
        
        print('color', color_result_list)
        print('values', confident_result_list)
        print('results', classification_result)
        return classification_result
      
      print(serializer.data)
      new_serializer_data = serializer.data
      new_serializer_data['clrNm'] = predict_color(img_path=IMAGE_PATH)
      return Response(new_serializer_data, status=status.HTTP_201_CREATED)
    return Response(new_serializer_data.errors, status=404)

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
