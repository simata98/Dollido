***
# Dollido KT AIVLE Big Project
<p align="center"><img width="400" alt="image" src="/markdown/logo.png"></center></p>  
</br>

[![license](https://img.shields.io/github/license/simata98/Dollido?color=green)](LICENSE) [![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg)](https://github.com/RichardLitt/standard-readme) [![All Contributors](https://img.shields.io/badge/all_contributors-7-orange.svg)](#Contributors)
</br>

**[Github](https://github.com/simata98/Dollido)레포지토리에서 더욱 깔끔한 README를 보실 수 있습니다!**

## 목차
- [소개](#소개)
- [기존 사례 분석](#기존-사례-분석)
  - [기존 서비스의 문제점](#기존-서비스의-문제점)
  - [이번 프로젝트에서 개선할 점](#이번-프로젝트에서-개선할-점)
- [컴포넌트](#컴포넌트)
- [주기능](#주기능)
  - [프론트엔드](#프론트엔드)
    - [회원가입 및 로그인](#회원가입-및-로그인)
    - [메인페이지](#메인페이지)
    - [경찰청 분실물 조회 페이지](#경찰청-분실물-조회-페이지)
    - [돌리도(Dollido) 분실물 조회 페이지](#돌리도(Dollido)-분실물-조회-페이지)
    - [모바일 반응](#모바일-반응)
  - [백엔드](#백엔드)
    - [경찰청 API Scheduler](#경찰청-API-Scheduler)
    - [회원가입 및 로그인](#회원가입-및-로그인)
    - [REST API](#REST-API)
    - [AI Pipeline](#AI-Pipeline)
- [Futhermore](#furthermore)
- [API](#api)
- [Contributors](#contributors)
***

## 소개

> 기존 유실물 찾기 서비스의 불편함을 해소하고 개선하고자, 습득자는 유실물을 간편하게 등록하고 분실자는 간단한 인증을 통해 유실물을 찾아가고자 본 서비스를 고안하게 되었습니다.

</br>

## 기존 사례 분석

![](/markdown/lost112.png)

### 기존 서비스의 문제점

1. 회원가입, 로그인 유효성 검사 기능의 부재
2. 경찰서 마다 카테고리별 지칭명이 서로 달라 찾는데 어려움
3. 잃어버린 물건을 찾으러 경찰서에 방문 필수
4. 게시물마다 일부 정보의 부재(사진, 물품명, 보관장소 등)
5. 웹과 앱의 연동 부재
6. 경찰관들이 분실물을 수동으로 정보를 기입해야하는 문제

### 이번 프로젝트에서 개선할 점

1. 회원가입, 로그인 기능 강화 및 보안성 강화
2. 습득물건을 사용자가 자발적으로 신고 후 직접 찾을 수 있도록 기능 개선
3. 분류된 결과를 자동으로 기입하여 편의성 개선
4. 웹과 앱의 연동

</br></br>

***
# 컴포넌트
<img src="markdown/react.jpeg" width="200" height="100">
<img src="markdown/AWS.png" width="200" height="100">
<img src="markdown/Tensorflow.png" width="200" height="100">
<img src="markdown/SQL.png" width="200" height="100">
<img src="markdown/REST.png" width="200" height="100">
</br>

- **Front**
  - [REACT](https://ko.reactjs.org/)
- **Object Detection & Color Detection**
  - [Tensorflow](https://www.tensorflow.org/?hl=ko)
- **Back**
  - [Django](https://www.djangoproject.com/)
  - [Django RestFramework](https://www.django-rest-framework.org/)
- **Device**
  - ipad Air 5th Generation


***
# 주기능

## 프론트엔드(FrontEnd)

### 회원가입 및 로그인
<p align="center"><img width="600" alt="image" src="/markdown/agree.png"></center></p>  
</br>

>개인 정보 제공 동의 후 회원가입이 가능하며,  
모든 동의를 받으면 회원가입 페이지로 진입할 수 있습니다.  

</br></br>

<p align="center"><img width="600" alt="image" src="/markdown/signup.png">
</br>

>회원가입 진행시 유효성 검사를 실시간으로 진행하며, 
모든 유효성 검사를 충족시 회원가입을 진행합니다.  

</br></br>

<p align="center"><img width="600" alt="image" src="/markdown/email.png">  
</br>

>회원가입시 가입한 이메일로 이메일 인증 메일이 전송됩니다.  
해당 메일에서 인증을 진행하여야 본 서비스를 이용하실 수 있습니다.

</br></br>

### 메인페이지

<p align="center">
<img width="600" alt="image" src="/markdown/mainpage.gif">
</p>
</br>

>메인페이지에서는 분실물 통계현황과 분실물 분포를 확인할 수 있습니다.
또한 돌리도 오프라인 보관함의 위치를 지도를 통해 확인하실 수 있습니다.

<p align="center">
<img width="300" alt="image" src="/markdown/dollido_offline.png">
</p>

>저희 오프라인 돌리도 보관함은 대전 탄방 KT에서 확인하실 수 있습니다!

</br></br>

### 경찰청 분실물 조회 페이지
<p align="center">
<img width="600" alt="image" src="/markdown/api.gif">
</p>
</br>

>경찰청 분실물 API를 사용하여 Dollido 서비스에 등록되지 않은 물건들의 정보도 확인할 수 있는 페이지입니다.

> 분실물 API 링크 : https://www.data.go.kr/data/15000799/openapi.do?recommendDataYn=Y

</br></br>

### 돌리도(Dollido) 분실물 조회 페이지
<p align="center">
<img width="600" alt="image" src="/markdown/dollido.gif">
</p>
</br>
<p align="center">
<img width="600" alt="image" src="/markdown/email2.gif">
</p>
</br>

>돌리도 서비스에 자동 분류되어 업로드된 분실물들의 목록을 볼 수 있습니다. 
해당 게시물을 클릭하면 상세 정보를 볼 수 있으며, 작성자의 경우 수정 및 삭제가 가능합니다. 
회수 버튼을 누르면 회수 요청이되며 본인 메일로 오프라인 보관함 비밀번호가 전송됩니다.
사진으로부터 가져온 위치 메타데이터를 기반으로 구글 지도와 연동되어 클릭시 분실품을 찾으러 갈 수 있도록 구글 지도에 맵핀을 표시하여줍니다.

</br>

</br></br>

### 돌리도(Dollido) 분실물 등록
<p align="center">
<img width="600" alt="image" src="/markdown/dollido_service.gif">
</p>
</br>

>돌리도 서비스 이용 예시입니다.

### 모바일 반응
<p align="center">
<img width="170" height="300" alt="image" src="/markdown/mobile.gif">
</p>

>모바일 환경에서도 돌리도 서비스를 이용할 수 있도록 반응형 웹을 구현하였습니다.

</br>

***
## 백엔드(BackEnd)
### 경찰청 API Scheduler
[scheduler.py](api/broker.py "스케쥴러")
apscheduler 라이브러리를 사용하여 일정 시간 마다 경찰청에 등록된 분실물 정보를 가져옵니다.
</br></br>

### 회원가입 및 로그인
<p align="center">
<img width="400" height="200" alt="image" src="/markdown/JWT.png">


[accounts](accounts/ "계정")
>JWT Token을 사용하여 로그인 시 access와 refresh토큰을 발급받습니다. 발급된 토큰은 5분간 유효하며, 시간이 지나면 만료되어 돌리도 서비스를 이용하기 위해서 다시 로그인해야합니다. 이 기능은 오프라인 보관함 서비스를 이용하는 사용자의 계정의 보안을 위함입니다.

</br>

<p align="center"><img width="500" alt="image" src="/markdown/JWT_decode.png"></center></p>  
</br>

>JWT 토큰을 디코딩(Decoding)하면 만료시간 및 사용자 pk값 등 필요한 정보만 있고, 민감한 정보는 들어있지않아 토큰이 탈취되어도 보안문제가 발생하지 않게하였습니다. 또한 이 pk값을 통해 프론트에서 자격증명을 할 때 사용되었습니다.

</br></br>

### REST API
>REACT 프론트팀에서 Response값을 받아 사용할 수 있도록 백엔드의 모든 출력값을 django REST Framework를 사용하여 API화하였습니다.
~~~python
class PostSerializer(serializers.ModelSerializer):
  class Meta:
    model = DollidoLstId
    fields = '__all__'
~~~
>JSON형태로 응답하기 위해 Serializer, 즉 직렬화를 하여 시리얼 상태로 변환하여 사용하였습니다.

</br></br>

### AI Pipeline
[AI Pipeline](post/views.py "ai")

>물건의 종류 및 색상을 객체탐지(Object Detection)와 분류(Classification)하기 위해 총 2개의 모델을 사용하였습니다.
<p align="center"><img width="500" alt="image" src="/markdown/roboflow.png"></center></p> 
</br>

>[roboflow](https://app.roboflow.com/ "roboflow") 에서 수집한 지갑, 스마트폰 데이터셋의 Annotation을 생성하고, 증강하여 총 1800개의 train set, 163개의 test set, 80개의 validation set을 사용했습니다.
물건의 종류와 물건의 브랜드를 객체 인식하여 결과를 리턴합니다.

</br></br>

<p align="center"><img width="400" alt="image" src="/markdown/EfficientNet.png"></center></p>  

>색상 분류를 위해서 처음에는 CNN모델을 사용하여 분류하였습니다. 하지만 모델의 성능이 좋지않아 Parameter의 개수는 적으면서 최대의 성능을 이끌어내기 위해 EfficientNetB3 모델을 사용하였습니다.

</br>

**모델 성능비교**
| Model | Valid Accuracy |
| :---------: | :---------: |
[CNN](post/color_classification/color_detection.ipynb "CNN") | 0.5764
[EfficientNetB3](post/color_classification/color_tag_fashion2.ipynb "EfficientNetB3") | **<span style="color:red">0.6741</span>**

</br></br>

### 사진 메타데이터 자동 크롤링
>사진을 업로드하는 것으로 분실물의 위치와 발견날짜를 자동으로 불러오게 하기 위해서 사진메타데이터 정보를 수집하여 사용하였습니다.
~~~python
from PIL import Image
from PIL.ExifTags import TAGS

def metadata(img_path=IMAGE_PATH):
  img = Image.open(img_path)
  info = img._getexif();
  img.close()
  
  taglabel = {}
  for tag, value in info.items():
    decoded = TAGS.get(tag, tag)
    taglabel[decoded] = value

  ...

  return "https://www.google.com/maps/place/"+str(Lat)+"+"+str(Lon), taglabel['DateTimeOriginal']
~~~
<p align="center"><img width="600" alt="image" src="/markdown/GPS.png"></center></p> 

>PIL의 ExifTags 라이브러리를 사용하였습니다. 내부 연산으로 경도와 위도를 뽑아낸 후 구글 맵스 URL과 결합하여 링크를 생성하여 응답하도록 하였습니다.

</br></br>

# API
<img width="300" alt="rss_api" src="markdown/public_portal.png">
</br>

>공공데이터포털의 경찰청 분실물정보 조회 서비스 API를 사용하였습니다.

</br></br>

# Contributors
<table>
  <tr>
    <td align="center"><img src="markdown/ljh.jpg" width="100px;" alt=""/><br /><b>이정형</b><br/>BE, Modeling</td>
    <td align="center"><img src="markdown/yhj.jpg" width="100px;" alt=""/><br /><b>유현주</b><br/>FE</td>
    <td align="center"><img src="markdown/sbs.jpg" width="100px;" alt=""/><br /><b>송병섭</b><br/>FE</td>
    <td align="center"><img src="markdown/hsk.jpg" width="100px;" alt=""/><br /><b>황순규</b><br/>FE, BE</td>
</tr>
  <tr>
    <td align="center"><img src="markdown/ysi.png" width="100px;" alt=""/><br /><b>윤소이</b><br/>Modeling</td>
    <td align="center"><img src="markdown/lhk.jpg" width="100px;" alt=""/><br /><b>임희건</b><br/>FE</td>
    <td align="center"><img src="markdown/csy.jpg" width="100px;" alt=""/><br /><b>최세영</b><br/>FE</td>
  <tr>
  </tr>
<table>
