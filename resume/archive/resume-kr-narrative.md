Github: **@ohchanwu** || Portfolio: **ohchanwu.dev** || Email: **ohchanwu@pm.me** || Mobile: **01020612280**

# 오찬우 - Chanwu (Tyler) Oh

하네스 엔지니어링으로 AI를 서비스에 도입하는 클라우드 BE 개발자. 영·한 bilingual이므로, 문화간의 기술 소통을 즐거워합니다.

## 프로젝트

### [Job Scraper 🔗](https://github.com/ohchanwu/job-scraper) || 채용 공고 스크레이퍼, AI 적합성 평가

**BE: Go | FE: JS, CSS, HTML** || _2026 5월 - 현재까지_

여러 채용 포털에 흩어진 신입 개발자 공고를 한곳에 모으고, 키워드 매칭과 AI 추론으로 사용자별 적합도를 계산하는 앱을 만들고 있습니다. 현재는 사용자가 로컬에서 직접 스크래핑을 실행해 사용자가 늘수록 같은 포털 요청이 반복되는 문제가 있습니다. 이를 줄이기 위해 **스크래핑과 공고 정규화는 AWS에서 공통 처리**하고, 사용자별 적합도 계산은 로컬에 남기는 하이브리드 구조로 이전하고 있습니다.

### [Cha Physical Therapy 🔗](https://chaphysicaltherapy.com/) || 웹앱 (미국 NYC 물리치료 클리닉) {.cha-pt}

**배포: Docker, AWS, Terraform, Cloudflare | BE: Go | FE: JS, CSS, HTML** || _2025 8월 - 2026 4월_

#### Squarespace → AWS 마이그레이션

Squarespace 기반 클리닉 웹사이트를 AWS 기반 웹앱으로 이전해 UI 개선, Stripe 결제 연동, 레이턴시 감축을 구현했습니다. 기존 SaaS 환경은 UI 커스터마이징과 성능 개선에 제약이 있었고, 마케팅 팀을 설득하기 위해 GitHub Pages 데모로 개선된 UI와 속도를 직접 보여줬습니다. 이후 **Go 백엔드와 Docker 배포 구조**로 웹앱을 재구축하며, 마이그레이션 설득에는 작동하는 프로토타입이 가장 효과적이라는 점을 배웠습니다.

#### 크래시 후 서비스 복구 및 하드닝

2026년 4월, AWS EBS gp3 볼륨의 I/O 처리량 한도 초과로 서비스 장애가 발생했습니다. 원인은 데이터 누적, 비효율적인 쿼리, 타임아웃 부재로 인한 디스크 I/O 급증이었습니다. 새 EBS 볼륨으로 서비스를 복구한 뒤 **쿼리 재작성, 인덱스 추가, 타임아웃 설정, 데이터 정리 작업, CloudWatch 모니터링**을 적용해 재발 가능성을 낮췄고, 자세한 내용은 [사후 보고서 🔗](https://github.com/ohchanwu/cha-pt-postmortems/blob/main/2026-04-17/2026-04-17.ko.md)에 정리했습니다.

### [Alix Chaput Architecture 🔗](https://ohchanwu.github.io/alix-chaput-architecture/) || 웹앱 (프랑스 건축가 포트폴리오)

**배포: GitHub Pages | FE: JS, CSS, HTML** || _2025 5월 - 2025 7월_

프랑스 건축가 포트폴리오 사이트를 데스크톱, 태블릿, 모바일에서 일관되게 보이도록 구현했습니다. 큰 이미지 용량으로 로딩이 느렸고, 화면 크기별 레이아웃 유지가 필요했기 때문에 **CSS breakpoint와 JavaScript로 반응형 레이아웃**을 만들고 이미지를 WebP로 변환했습니다. GitHub Pages에 배포해 별도 도메인 비용 없이 운영했고, 이 과정에서 복잡한 화면 상태에는 React 같은 선언형 프레임워크가 유용하다는 점을 체감했습니다.

<!-- page-break -->

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
