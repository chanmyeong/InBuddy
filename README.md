## [InBuddy ✈ 접속하기!](https://inbuddy.site:1110/login)

![로고](/etc/pngs/InBuddy%20logo.png)

<br>

# ✈ InBuddy

1. [프로젝트 소개](#프로젝트-소개)
2. [Abstract](#Abstract)
3. [UCC](#UCC)
4. [주요 기능 소개](#주요-기능-소개)
5. [기술 소개](#기술-소개)
6. [기대효과](#기대효과)
7. [시스템 아키텍처](#시스템-아키텍처)
8. [개발 환경](#개발-환경)
9. [팀소개](#팀소개)

### ✨프로젝트 소개

---

> ##### 😖 괜히 해외여행 가기 전에 필요한 무언가를 두고 왔을 거 같애.
>
> ##### 😫 인천 공항에 도착했는데 여권을 두고 오다니..!
>
> ##### 🤨 오늘 날씨가 별로인데 비행기가 뜰까?

##### 당신의 여정에 차질이 없도록 **InBuddy**

### ✨Abstract

---

> ##### 😖 I think I left something I needed before I went abroad for no reason.
>
> ##### 😫 I just arrived at the Incheon International airport and I can't believe I left my passport behind...!
>
> ##### 🤨 The weather is not good today. Will the plane fly?

###### So that there's no disruption to your journey **InBuddy**

<!-- <br>

### 📼UCC

---

[![이미지 텍스트](/uploads/283946223a961b6b0b5d85c3b9c9a5be/image.png)](https://drive.google.com/file/d/1I8hpLC0rNQqLs66ZnpKi5NPBKmFfAvZa/view?usp=sharing)

_위의 사진을 클릭하면 영상 링크로 이동합니다._ -->

<br>

### 🔍주요 기능 소개

#### 로그인

![로그인](/etc/gifs/로그인.gif)

#### 여정 및 항공권 등록

![여정 및 항공권 등록](/etc/gifs/여정%20및%20항공권%20등록.gif)

#### 준비물 리스트

![준비물 리스트](/etc/gifs/준비물%20리스트.gif)

#### 점검 리스트 - 여권 및 탑승

![점검 리스트1](/etc/gifs/여권%20탑승.gif)

#### 점검 리스트 - 환전 및 로밍

![점검 리스트2](/etc/gifs/환전%20로밍.gif)

#### 항공권 바코드로 좌석 등록

![좌석 등록](/etc/gifs/항공권%20사진.gif)

#### 항공편 사유 확인

![항공편 사유 확인](/etc/gifs/항공%20티켓.gif)

<br>

![구현 사항](/etc/pngs/InBuddy%20구현사항.png)

1. 여정을 등록하고 관리

2. 여정별 준비물 리스트 등록 및 체크

3. 여정별 점검 리스트 등록 및 체크

4. 이슈 발생 시 대처 방법 안내 및 인천국제공항 내 대처 장소 확인

5. 여정별 항공편 등록 및 항공편 현황 확인

6. 인천국제공항, 도착 공항 날씨 실시간 확인

7. 체크인 카운터 확인 및 터미널 간 이동 방법 안내

8. 항공편 지연, 회황, 취소 시 사유 확인

9. 날씨에 의한 지연시 지연 예측

<br>

### 🛠기술 소개

---

1. `Hadoop`, `Spark`, `Kafka`를 사용하여 항공편 빅데이터 분산 저장 및 읽기

2. `머신러닝`을 이용하여 날씨에 따른 항공편 지연 예측

3. `Redis`를 이용하여 Refresh 토큰과 오늘 이후의 항공편과 날씨 정보를 관리하여 빠른 데이터접근 및 효율성 증대

4. `PWA(프로그레시브 웹 앱)`를 활용하여 사용자에게 앱과 유사한 경험을 웹에서 제공할 수 있습니다.

#### Lasso 모델

`Lasso(Least Absolute Shrinkage and Selection Operator) 모델`은 회귀 분석에서 사용되는 기법으로, 과적합을 방지하며 변수 선택 기능을 가지고 있습니다. 이 모델은 손실 함수에 절대값 기반의 규제 항(L1 규제)을 추가하여, 일부 회귀 계수를 정확히 0으로 만들어 불필요한 변수를 제거합니다. 따라서 모델의 복잡도를 줄이면서도 중요한 변수만을 선택하여 해석력이 높은 모델을 구축할 수 있습니다. Lasso는 특히 변수가 많은 데이터셋에 유용하게 적용됩니다.

InBuddy의 경우 비행기 지연 예측할 때 항공편명, 항공사 등 범주형 데이터들에 대해 one-hot 인코딩을 수행했는데, 데이터의 특성이 너무 많아져 과적합이 될 우려가 있었습니다.

그렇기에 다중 선형 회귀 모델 중 정규화를 포함한 Lasso 모델을 선택했고, 정규화 작업과 교차검증 작업을 통해 과적합을 방지했습니다.

<br>

### ✨기대효과

---

1. 체계적인 여행 준비
2. 신속한 문제 대처
3. 시간 절약

<br>

### 💡시스템 아키텍처

---

![시스템 아키텍처](/etc/pngs/InBuddy%20시스템%20아키텍처.png)

<br>

### ⚙개발 환경

---

#### Back End

Java: 17

IntelliJ 2023.3.2

Springboot: 3.2.2

JVM: 17.0.9

Fast API: 0.110.0

### Database

Redis : 7.2.4

MySQL: 8.0.34

#### Front End

VS Code: 1.85.1

React: 18.2.0

Tailwind CSS: 3.4.1

Vite: 5.1.6

Node.js: 20.10.0

Redux Toolkit: 2.2.2

TanStack: 5.28.8

Query v5

shadcn/ui

#### Big Data

Hadoop: 3.4.0

Spark: 3.5.1

Kafka: 0.10.2

#### Infra

AWS EC2 Ubuntu 20.04.6 LTS

Docker

Jenkins

<br>

### 📂 기획 및 설계 산출물

---

##### 요구사항 정의, 기능 명세서

![산출물](/etc/pngs/InBuddy%20기획%20및%20설계%20산출물.png)

###### 용어 정리

- `여정 컬렉션`: 사용자의 지난 여정부터 예정된 여정까지 모든 여정이 담겨있는 컬렉션입니다.
- `준비물 리스트`: 사용자가 공항에 도착하기 전 챙겨야 할 준비물(ITEM) 리스트입니다.
  - 여권, 지갑 등 필수적으로 준비해야 하는 준비물은 제공됩니다.
  - 추가로 준비할 준비물을 사용자가 추가할 수 있습니다.
  - 등록된 모든 준비물을 준비했다고 표시하면, `점검 리스트`의 준비물 점검 사항이 완료됩니다.
- `점검 리스트`: 사용자가 출국 전 공항에서 완료해야 할 점검(TASK) 리스트입니다.
  - 준비물 점검, 발권 등 필수적으로 완료해야 하는 점검 사항은 제공됩니다. 제공된 점검 사항은 돌발 상황 시 대처할 요령 또한 제공합니다.
  - 추가로 완료해야할 점검 사항을 사용자가 추가할 수 있습니다. 하지만 사용자가 직접 추가한 점검 사항에는 대처 요령은 제공되지 않습니다.
  - 모든 점검 사항을 완료하면, 최종 완료 버튼이 활성화됩니다.
  - 최종 완료 버튼을 누르면 항공편의 운항 현황에 따라 _정상 운항 페이지_ 또는 *비정상 운항 페이지*로 넘어갑니다.

##### ERD

![ERD](/etc/pngs/InBuddy%20ERD.png)

##### 와이어 프레임

![WireFrame](/etc/pngs/InBuddy%20WireFrame.png)

<br>

### 💻팀소개

---

- 김금환 `팀장`
  - `BE`, `발표`
  - ERD 설계
  - Hadoop, Spark Cluster 구축
  - Spark에서 Kafka로부터 과거 항공편 데이터를 가져와 Hadoop HDFS에 누적 적재
  - Redis에 저장된 항공 데이터 Spring Boot와 연동
- 김성민
  - `FE`
  - 피그마 와이어 프레임 설계
  - PWA
  - 여정 리스트, 여권, 로밍, 환전 대처 페이지 구현
  - Adobe illustrator 을 사용한 인천공항 내부 지도 및 주요 편의시설 마커가 포함된 svg 파일 제작
  - react-panning-zoom libary를 사용한 인천공항 내부 지도 줌, 드래그 기능 구현
- 우찬명
  - `FE`
  - 피그마 와이어 프레임 설계
  - PWA
  - tanstack query
  - redux toolkit 스켈레톤 템플릿 코드 구현
  - 점검 리스트, 준비물 리스트 구현
- 임서정
  - `BE`, `FE`
  - oauth2, jwt, spring security 활용한 소셜 로그인
  - 항공, 날씨 데이터 수집
  - zxing library 활용한 항공편 정보 추출 및 가공
  - UCC 편집
- 오상훈
  - `Infra`, `BE`, `ML`
  - 데이터 수집
  - 배포 자동화
  - 테스트서버 구축
  - 데이터 스케줄러 제작
  - Kafka Cluster 구축
- 이예진
  - `BE`
  - API 명세서 작성
  - 여정 컬렉션 CRUD 구현 (JPA)
  - 점검 리스트 CRUD 구현 (JPA)
  - 준비물 리스트 CRUD 구현 (JPA)
  - 항공편 정보 CRUD 구현 (JPA)
  - Swagger
