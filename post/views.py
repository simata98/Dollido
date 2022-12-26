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
# yolo 관련
from keras.models import model_from_json
from ast import literal_eval
import collections
import yolov5
# 이미지 메타데이터 관련
from PIL import Image
from PIL.ExifTags import TAGS

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
      
      # !색상 구분 파이프라인
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
      
      # !yolo 파이프라인
      def predict_yolo(img_path=IMAGE_PATH, isize=IMAGE_SIZE):
        model = yolov5.load('post/yolo_classification/best.pt')
        model.conf = 0.15
        model.iou = 0.25
        
        img = keras.preprocessing.image.load_img(img_path, target_size=(isize, isize))
        results = model(img, size=IMAGE_SIZE)
        results_list = results.pandas().xyxy[0].to_json(orient="records")
        results_list = literal_eval(results_list)
        classes_list = [item["name"] for item in results_list]
        results_counter = collections.Counter(classes_list)
        print(classes_list)
        return classes_list
      
      # !이미지 메타데이터 파이프라인
      # https://www.jbmpa.com/python_advanced/3
      def metadata(img_path=IMAGE_PATH):
        img = Image.open(img_path)
        info = img._getexif();
        img.close()
        
        taglabel = {}
        for tag, value in info.items():
          decoded = TAGS.get(tag, tag)
          taglabel[decoded] = value
          
        print(taglabel['DateTimeOriginal'])
        print(taglabel['GPSInfo'])
        
        exifGPS = taglabel['GPSInfo']
        latData = exifGPS[2]
        lonData = exifGPS[4]

        # 도, 분, 초 계산
        latDeg = latData[0]
        latMin = latData[1]
        latSec = latData[2]
        lonDeg = lonData[0]
        lonMin = lonData[1]
        lonSec = lonData[2]
        
        # 도, 분, 초로 나타내기
        Lat = str(int(latDeg)) + "°" + str(int(latMin)) + "'" + str(latSec) + "\"" + exifGPS[1]
        Lon = str(int(lonDeg)) + "°" + str(int(lonMin)) + "'" + str(lonSec) + "\"" + exifGPS[3]
        
        # 위도 계산
        Lat = (latDeg + (latMin + latSec / 60.0) / 60.0)

        # 북위, 남위인지를 판단, 남위일 경우 -로 변경
        if exifGPS[1] == 'S': Lat = Lat * -1

        # 경도 계산
        Lon = (lonDeg + (lonMin + lonSec / 60.0) / 60.0)

        # 동경, 서경인지를 판단, 서경일 경우 -로 변경
        if exifGPS[3] == 'W': Lon = Lon * -1
        print(Lat, ",",  Lon)
        
        return "https://www.google.com/maps/place/"+str(Lat)+"+"+str(Lon), taglabel['DateTimeOriginal']
      
      new_serializer_data = serializer.data
      predicted_color = predict_color(img_path=IMAGE_PATH)
      new_serializer_data['clrNm'] = predicted_color
      predicted_yolo = predict_yolo(img_path=IMAGE_PATH)
      predicted_yolo_str = ' '.join(set(predicted_yolo))
      product = predicted_color + ' color ' + predicted_yolo_str
      new_serializer_data['lstPrdtNm'] = product
      img_gps, img_date = metadata(img_path=IMAGE_PATH)
      new_serializer_data['lstPlace'] = img_gps
      new_serializer_data['lstYmd'] = img_date
      
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
