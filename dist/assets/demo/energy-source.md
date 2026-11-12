# 실제 데이터 시연의 출처

- 제공: Our World in Data, Energy dataset
- 원천: Ember, Yearly Electricity Data (2026)
- 원본 CSV: https://catalog.ourworldindata.org/energy/owid_energy/owid_energy.csv
- 열 설명서: https://catalog.ourworldindata.org/energy/owid_energy/owid_energy.codebook.csv
- 원천 안내: https://ember-energy.org/data/yearly-electricity-data/
- 추출일: 2026-10-06
- 선택 범위: South Korea, 2020년부터 2024년까지 5개 연도
- 선택 열: country, year, electricity_demand_twh
- 단위: TWh. 전력 수요이며 전체 에너지 소비와 다릅니다.
- 변환: 행과 열 선택만 수행. 값과 열 이름은 원본 그대로 보존.
- 재사용: Ember CC BY 4.0. Ember와 Our World in Data를 함께 출처로 표시.
- 한계: 연간 국가 통계 5건입니다. 특정 기업의 수요나 증가 원인을 설명하는 자료가 아닙니다. 원본 갱신 시 값이 달라질 수 있습니다.

## 강사 시연 / 5분

1. OWID 저장소의 새 에너지 데이터 CSV 링크를 열어 다운로드합니다.
2. Excel 또는 Google Sheets에서 파일을 불러옵니다.
3. country는 South Korea, year는 2020~2024로 필터합니다.
4. 필터된 5행에서 위 세 열만 새 시트에 복사하고 CSV로 저장합니다.
5. 원본과 행 수, 값, 단위를 대조합니다. 인터넷이 불안정하면 제공한 샘플로 이어갑니다.
6. Claude에 CSV를 첨부해 표를 읽게 합니다. 기간과 단위를 명시하고 원인 추정은 금지합니다.

## 요청 예시

첨부한 energy-sample.csv는 한국의 연간 전력 수요 5건이다.
연도와 TWh 값을 그대로 표로 보여주고, 2020년과 2024년의 차이를 계산식과 함께 적어줘.
자료에 없는 증가 원인은 추정하지 마. 비어 있는 값은 보완하지 마.

확인값: 625.38 - 577.11 = 48.27 TWh. AI 출력은 실제 실행 후 대조합니다.
