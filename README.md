# 제로베이스 도메인별 AI 역량 강화 프로그램

D그룹 강의 사이트. MD, 제품디자인, HR의 4주 직무 프로젝트를 위한 자료입니다.

기존 강의의 보라색 템플릿을 보존하고 직무별 사례, 실습, 숙제를 조정했습니다. 정적 사이트는 dist에 있습니다.

## 자료 재생성

기존 강의와 스타일을 유지하면서 아래 순서로 실행합니다.

```sh
python3 scripts/build-role-materials.py
python3 scripts/build-week1-materials.py
python3 scripts/align-course-flow.py
python3 scripts/build-cohort-cases.py
```

이전 차수 자료는 content/cohort-cases.json의 검토된 익명 발췌만 배포합니다. 실명과 원본 파일 경로가 있는 대조 기록은 이 저장소와 배포 폴더 밖에 둡니다.

## 공개 범위

배포 시 `python3 scripts/prepare-release.py`로 `.release`를 만듭니다. 2~4주차 강의와 해당 주차의 HTML 실습 페이지는 잠금 안내로 배포하며 원본은 dist에 보존합니다. 주차를 열 때는 이 스크립트와 홈 카드, 주차 메뉴를 함께 수정합니다.

1주차 2-7과 2-8은 한 페이지로 합쳤습니다. 기존 22번 주소는 21번으로 연결되며 이후 실습과 숙제 주소는 유지합니다. JD 링크는 content/jd-references.json에 기록했습니다.
