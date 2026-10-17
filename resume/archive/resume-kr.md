Github: **@ohchanwu** || Portfolio: **ohchanwu.dev** || Email: **ohchanwu@pm.me** || Mobile: **01020612280**

# 오찬우 - Chanwu (Tyler) Oh

하네스 엔지니어링으로 AI를 서비스에 도입하는 클라우드 BE 개발자. 영·한 bilingual이므로, 문화간의 기술 소통을 즐거워합니다.

## 프로젝트

### [Job Scraper 🔗](https://github.com/ohchanwu/job-scraper) || 채용 공고 스크레이퍼, AI 적합성 평가

**BE: Go | FE: JS, CSS, HTML** || _2026 5월 - 현재까지_

목적: 여러 채용 포털의 신입 개발자 **공고를 한곳에 모으고, AI 추론으로 사용자별 적합도를 계산**
문제: 로컬 스크래핑 구조라 사용자가 늘수록 같은 포털에 같은 요청이 반복됨
분석: 적합도 계산은 로컬 처리가 유리하지만, 공고 수집과 정규화는 사용자별 반복이 불필요
해결: **스크래핑과 공고 정규화는 AWS, 사용자별 적합도 계산은 로컬**로 나누는 하이브리드 구조로 이전 중
예측: 채용 포털 요청량은 O(users × posts) → O(posts)로 감소
가설: 사용자별 적합도 계산은 로컬에 두고, 공통 스크래핑 작업은 클라우드로 옮기면 반복 요청과 인프라 비용을 줄일 수 있음

### [Cha Physical Therapy 🔗](https://chaphysicaltherapy.com/) || 웹앱 (미국 NYC 물리치료 클리닉) {.cha-pt}

**배포: Docker, AWS, Terraform, Cloudflare | BE: Go | FE: JS, CSS, HTML** || _2025 8월 - 2026 4월_

#### Squarespace → AWS 마이그레이션

목적: UI 개선, **Stripe 결제 연동, 레이턴시 감축** 구현
문제: Squarespace SaaS의 UI 커스터마이징 제약과 느린 페이지 응답 속도
분석: 마케팅 팀 설득에는 설명보다 개선된 UI와 속도를 직접 보여주는 방식이 더 효과적이라고 판단
해결: GitHub Pages 데모로 **AWS 이전을 설득**하고, Go 백엔드와 Docker 배포 구조로 재구축
교훈: 마이그레이션이나 새 기능을 설득할 때는 **작동하는 프로토타입**이 효과적

#### 크래시 후 서비스 복구 및 하드닝 (자세한 내용: [사후 보고서 🔗](https://github.com/ohchanwu/cha-pt-postmortems/blob/main/2026-04-17/2026-04-17.ko.md))

문제: 2026년 4월, AWS EBS gp3 볼륨의 I/O 처리량 한도 초과로 서비스 장애 발생
분석: 데이터 누적과 비효율적인 쿼리, 타임아웃 부재로 디스크 I/O가 급증
해결: **쿼리 재작성, 인덱스 추가, 타임아웃 설정, 데이터 정리 작업, CloudWatch 모니터링** 적용
교훈: DB 최적화와 모니터링은 성능 개선을 넘어 서비스 안정성의 핵심

<!-- page-break -->

### [Alix Chaput Architecture 🔗](https://ohchanwu.github.io/alix-chaput-architecture/) || 웹앱 (프랑스 건축가 포트폴리오)

**배포: GitHub Pages | FE: JS, CSS, HTML** || _2025 5월 - 2025 7월_

목적: 프랑스 건축가 포트폴리오를 **데스크톱, 태블릿, 모바일에서 일관되게 구현**
문제: 큰 이미지 용량으로 로딩이 느렸고, 화면 크기별 레이아웃 유지가 필요
분석: 클라이언트가 별도 도메인 비용을 원하지 않아 GitHub Pages 기반 정적 사이트가 적합
해결: **CSS breakpoint와 JavaScript로 반응형 레이아웃**을 만들고, 이미지는 WebP로 변환해 용량 감소
교훈: 반응형 UI를 직접 구현하며 기본기를 다졌고, 복잡한 화면 상태에는 선언형 프레임워크가 유용하다는 점을 체감

<!-- columns-start -->

## 스택

Languages: ==Go== ==Java== ==JS== ==Python==
Database: ==MySQL== ==MongoDB==
배포: ==AWS== ==Docker== ==Terraform== ==Cloudflare==
Tools: ==Git==

## 오픈소스

### freeCodeCamp || _JS 커리큘럼_

- WeakSet 레선 부정확한 내용 수정

<!-- column-break -->

## 교육

### 한양대학교 || _서울특별시_

**국제학부 학사** || _2017-2025_

- GPA: 3.91 / 4.5 (졸업우등상)

## 자격증

### TOEFL (IBT) || _119 / 120_

- C2 - Native (영어 원어민 수준)

## 군복무

### 제2작전사령부 || 대구광역시

**영·한 통역병** || _2020-2022_
