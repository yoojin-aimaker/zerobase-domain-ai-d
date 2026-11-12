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
