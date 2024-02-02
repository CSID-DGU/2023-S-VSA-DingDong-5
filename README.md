# 🐾 2023-여름학기-산학연계프로젝트
> 2023년 여름학기, 산학연계프로젝트 5조 딩동팀입니다.
<br/>

## ✍️ 과제 소개
주식회사 자버와 진행한 <Web 3.0 기반 분산형 커뮤니티 서비스>는 블록체인의 특성 중 하나인 <b> '탈중앙성' </b>에 초점을 맞추어 제작하였습니다. <p>기존의 web 2.0커뮤니티는 본문과 댓글들이 종속된 형태를 보여 본문이 삭제되면 거기에 속한 요소들도 다함께 사라지는 문제점이 있었습니다.<p> 이에 대안책으로 딩동팀은 위계질서가 없는 <b>각 요소들의 독립성을 살린 커뮤니티</b>를 만들게 되었습니다. 
<br/>

## 🧑‍💻 프로젝트 소개
> 프로젝트명

딩동 커뮤니티✈️ <p>
[딩동커뮤니티에 접속하고 싶다면? 클릭해주세요! 👀](https://dingdong-front.vercel.app/)   
<div>테스트 유저 ID: user1@email ~ user6@email</div>   
<div>테스트 유저 PW: user1 ~ user6   </div>
<br/>
> 프로젝트 목표

하나의 게시글에서 독립적인 댓글이 허용된 커뮤니티로 댓글이 하나의 '객체'로 작용하도록 구현하는 것을 목표로 합니다.
<br/>

> 과제 접근 방법

사용자가 게시글, 답변 그리고 댓글을 스크랩하는 동작을 보이면 전체 복제본을 사용자가 가지게 됩니다.<p> 따라서 본문이나 다른 요소들이 삭제되더라도 저장된 요소는 사용자의 마이페이지에서 확인할 수 있습니다.
<br/>

## 🎞️ 시연영상
> 비로그인 상태인 경우

https://github.com/CSID-DGU/2023-S-VSA-DingDong-5/assets/96400257/600cb770-32b7-48e9-a07e-87b7f9f425e9

<br/>

> 로그인 상태인 경우

<b>'탈중앙화'라는 프로젝트 특성을 가장 많이 반영한 부분입니다.<b/>

https://github.com/CSID-DGU/2023-S-VSA-DingDong-5/assets/96400257/8d8ee6c3-4df4-4741-927b-1ef0b67dc947

<br/>

## ⚙️ 시스템 아키텍처
> 다음은 프로젝트 구조도입니다.
<p align="center"><img src="https://github.com/CSID-DGU/2023-S-VSA-DingDong-5/assets/96400257/3d252e39-f579-42bc-9f2a-0e72bfe74c27" width="70%" height="50%"></p>

<br/>

## 🧨 패키지설치
- backend
```
cd server
yarn install
node server.js
```
- frontend
```
yarn install
yarn start
```
<br/>

## 📚 기술 스택
<b>Common</b>

<img src="https://img.shields.io/badge/visualstudiocode-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white"> <img src="https://img.shields.io/badge/ESLint-4B3263?style=flat-square&logo=ESLint&logoColor=white"> <img src="https://img.shields.io/badge/prettier-F7B93E?style=flat-square&logo=prettier&logoColor=white"> <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=white"> 

<b>Frontend</b>

<img src="https://img.shields.io/badge/react-444444?style=flat-square&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/recoil-f26b00?style=flat-square&logo=recoil&logoColor=white"> <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=flat-square&logo=styledcomponents&logoColor=white">


<b>Backend</b>

<img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white"> <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/Amazon AWS-232F3E?style=flat-square&logo=Amazon AWS&logoColor=white">

<br/>

## 🫧 기대효과

- 탈중앙적 구조의 Q&A 게시판으로 한 게시글에 속한 모든 요소들을 객체화시켰습니다.
- 투표 기능을 추가하여 정보 판별에 유용합니다.
- 해시태그 기능이 있어 정보를 카테고리화할 수 있습니다.
- 검색기능을 추가하여 원하는 정보를 원활하게 찾을 수 있습니다.

<br/>

## 🗂️ 폴더구조
### - public 
### - server
   admin ⇒ 관리자 모드 <br/>
   middlewares ⇒ JWT 경로 저장파일 <br/>
   models ⇒ 데이터 타입 관리 <br/>
   routes ⇒ api 호출 관리 <br/>
   utils ⇒ util 파일 관리 <br/>
### - src
  api ⇒ api 목록 <br/>
  assets ⇒ 이미지와 icon 관리 <br/>
  components ⇒ 공통 컴포넌트 관리 <br/>
  db ⇒ mocking 데이터 관리 <br/>
  pages ⇒ router 페이지 관리 <br/>
  routes/Layout ⇒ router 기본 틀 컴포넌트 <br/>
  stores ⇒ 리코일 관련 모듈 <br/>
  utils ⇒ util 파일 관리 <br/>
  types ⇒ 타입 지정 <br/>

<br/>

## 👻 팀원구성

|       팀원       | 팀원 |       팀원       | 팀장 |
|:--------------:|:--:|:--------------:|:--:|
|    **공소연**     |**김민정**|    **윤석규**     |**이지민**|
|     **FE**     |**BE**|   **BE**    |**FE**|
|   **경제학과**   |**의생명공학과**|   **통계학과**   |**수학과**|
|   **2020110210**   |**2019111791**|   **2020113296**   |**2020110408**|g

<br/>

## 🗝️ 팀원 역할

<b> 공소연 <b/> : 게시글 • 댓글 • 답변 작성, 마이페이지, Replies페이지 ,전체 레이아웃 구현 <br/>
<b> 김민정 <b/> : DB 설계, 게시글, 댓글, 답변, JWT로그인, 저장, 투표, 조회수, 해시태그 api 구현 <br/>
<b> 윤석규 <b/> :  로그인, 전체 해시태그 api 구현 <br/>
<b> 이지민 <b/> : 메인페이지, 로그인페이지, Questions 페이지, 해시태그, 검색기능 구현 <br/>
