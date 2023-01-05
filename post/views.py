import json
import jwt
from accounts.models import User
from dollido.settings import SECRET_KEY
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
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.decorators import login_required
from django.db.models import Q

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
@login_required(login_url='/accounts/auth/')
def PostList(request):
  # if not request.session.get('writer'):
  #   return redirect('http://localhost:3000/Signin')
  
  # 게시물 읽어오기
  if request.method == 'GET':
    post = DollidoLstId.objects.all()
    serializer = PostSerializer(post, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
  
  # 게시물 생성하기
  elif request.method == 'POST':
    serializer = PostSerializer(data=request.data)
    # writer_id = request.session.get('writer')
    # writer = User.object.get(pk = writer_id)
    
    if serializer.is_valid():
      serializer.save()
      # user_id 
      
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
        classes = ['베이지색', '검정색', '파랑색', '갈색', '금색', '초록색', '회색', '밤색', '네이비색',
          '올리브색', '오렌지색', '핑크색', '보라색', '빨간색', '은색', '하얀색', '노란색']
      
        image = keras.preprocessing.image.load_img(img_path, target_size=(isize, isize))
        data = np.asarray(image)
        ndata = np.expand_dims(data, axis=0)
        y_prob = loaded_model.predict(ndata/255)
        y_prob.argmax(axis=-1)
        
        color_result_list = [classes[i] for i in np.where(np.ravel(y_prob)>thrs)[0]]
        confident_result_list = [np.ravel(y_prob)[i] for i in list(np.where(np.ravel(y_prob)>thrs)[0])]
        classification_result = color_result_list[confident_result_list.index(max(confident_result_list))]

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
        class_dict = {'phone':'스마트폰', 'wallet':'지갑', 'apple':'애플', 'balenciaga':'발렌시아가', 'coach':'코치', 'louisvuitton':'루이비똥', 'metrocity':'메트로시티', 'samsung':'삼성'}
        translated_list = set([class_dict[x] for x in classes_list])
        return translated_list
      
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
      
      if predict_color(img_path=IMAGE_PATH):
        predicted_color = predict_color(img_path=IMAGE_PATH)
      else:
        predicted_color = '탐지되지 않은 색깔'
      new_serializer_data['clrNm'] = predicted_color
      
      if predict_yolo(img_path=IMAGE_PATH):
        predicted_yolo = predict_yolo(img_path=IMAGE_PATH)
        predicted_yolo_str = ' '.join(set(predicted_yolo))
      else:
        predicted_yolo_str = '탐지되지 않은 물건'

      product = predicted_color + ' ' + predicted_yolo_str
      new_serializer_data['lstPrdtNm'] = product
      
      try:
        img_gps, img_date = metadata(img_path=IMAGE_PATH)
      except:
        img_gps = '탐지되지 않은 위치'
        img_date = '1999-01-01'
      
      new_serializer_data['lstPlace'] = img_gps
      new_serializer_data['lstYmd'] = img_date
      new_serializer_data['lstcontent'] = product + '을 습득하여 해당 위치에 보관중입니다. 찾으시려면 찾기 버튼을 눌러주세요.'
      
      # !작성자 관련
      access = request.COOKIES.get('access')
      payload = jwt.decode(access, SECRET_KEY, algorithms=['HS256'])
      pk = payload.get('user_id')
      user = get_object_or_404(User, pk=pk)
      serializer = UserSerializer(instance=user)
      new_serializer_data['writer'] = serializer.data['email']
      new_serializer_data['writer_id'] = serializer.data['id']
      
      return Response(new_serializer_data, status=status.HTTP_201_CREATED)
    return Response(new_serializer_data.errors, status=404)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
@login_required(login_url='/accounts/auth/')
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

@api_view(['GET', 'POST'])
def PostFilter(request):
  print(request.data['color'])
  q=Q()
  if request.data['color']=="" and request.data['category']=="":
    post = DollidoLstId.objects.all()
  else:
    if request.data['color']:
      q &= Q(clrNm__contains = request.data['color'])
    if request.data['category']:
      if request.data['category'] == "휴대폰":
        q &= Q(lstPrdtNm__contains = "스마트폰")
      elif request.data['category'] == "지갑":
        q &= Q(lstPrdtNm__contains = "지갑")
    post = DollidoLstId.objects.filter(q)
  serializer = PostSerializer(post, many=True)
  return Response(serializer.data, status=status.HTTP_200_OK)