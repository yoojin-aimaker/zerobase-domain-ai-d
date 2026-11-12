"""Build synthetic role exercises using the retained lecture templates."""
from pathlib import Path
import html
import json
import re
import zipfile

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
H = html.escape

ROLES = {
    'md': {
        'name': 'MD / 상품기획', 'short': 'MD',
        'title': '리뷰 근거로 상품 개선안 만들기',
        'user': '패션과 뷰티 상품을 검토하는 MD',
        'problem': '리뷰에서 개선 후보를 고를 근거가 흩어져 있다.',
        'input': '가상 상품 P01 리뷰 10건과 상품 기준',
        'task': '리뷰 ID별 불편과 원문 근거 분류',
        'output': '리뷰 근거표와 상품 개선 제안 1장',
        'decision': '개선 우선순위와 상품 제안 이유',
        'hold': '상품 ID 또는 원문이 없으면 보류',
        'exclude': '다른 상품의 리뷰와 근거 없는 효능 주장',
        'limit': '소량의 가상 리뷰로 시장 수요나 매출 효과를 증명하지 않는다.',
        'before': ['리뷰를 한 건씩 읽기', '불편과 근거 직접 정리', '개선 후보 선택'],
        'after': ['상품과 원문 확인', 'AI가 근거표 초안', 'MD가 분류와 우선순위 검수'],
        'source': '''# 가상 리뷰 입력

수업용 합성 자료입니다. 실제 상품, 고객, 기업 자료가 아닙니다.
대상 상품: P01 / 가상 50mL 펌프형 핸드크림. P02는 다른 상품입니다.
개선 범위: 용기와 사용 안내. 실제 제조 조건과 효능은 제공하지 않습니다.

| ID | 상품 | 리뷰 원문 |
| --- | --- | --- |
| R01 | P01 | 펌프를 한 번 눌렀는데 원하는 양보다 많이 나왔어요. |
| R02 | P01 | 가방 안에서 뚜껑이 빠져 있었어요. |
| R03 | P01 | 뒤쪽 사용 안내 글씨가 작아 읽기 어려웠어요. |
| R04 | P01 | 가지고 다니다 보니 뚜껑 안쪽에 내용물이 새어 있었어요. |
| R05 | P01 | 펌프가 부드럽게 눌려 사용하기 편했어요. |
| R06 | P01 | 향이 제 취향에는 강했어요. |
| R07 | P02 | 가지고 다니다 내용물이 샜어요. |
| R08 | 미상 | 펌프가 잘 눌리지 않아요. |
| R09 | P01 | [원문 없음] |
| R10 | P01 | 여러 번 눌러야 조금씩 나오네요. |
''',
        'rule': '분류: 토출, 휴대와 누액, 안내 가독성, 긍정, 범위 밖, 제외, 보류. R01과 R10처럼 반대 관찰은 합쳐 단일 원인으로 단정하지 않는다. R06은 원문에 남기되 이번 용기 개선의 우선순위 집계에서 제외한다. 빈도는 이 표 안의 관찰 건수로만 센다.',
        'reference': '''# 구성 예시 / 실제 AI 실행 결과 아님

| ID | 초안 분류 | 원문 근거 | 사람의 판정 |
| --- | --- | --- | --- |
| R01 | 토출 | 원하는 양보다 많이 나왔어요 | 채택. R10과 상반돼 원인 추가 확인 |
| R02 | 휴대와 누액 | 가방 안에서 뚜껑이 빠져 | 채택 |
| R03 | 안내 가독성 | 글씨가 작아 읽기 어려웠어요 | 채택 |
| R04 | 휴대와 누액 | 뚜껑 안쪽에 내용물이 새어 | 채택. R02와 같은 원인인지는 미확인 |
| R05 | 긍정 | 부드럽게 눌려 사용하기 편했어요 | 불편 집계에서 제외 |
| R06 | 범위 밖 | 향이 제 취향에는 강했어요 | 향 개선은 이번 범위 밖 |
| R07 | 제외 | 상품 ID P02 | 대상 상품이 아님 |
| R08 | 보류 | 상품 ID 미상 | 대상 상품 확인 요청 |
| R09 | 보류 | 원문 없음 | 원문 요청 |
| R10 | 토출 | 여러 번 눌러야 조금씩 | 채택. R01과 상반된 관찰 유지 |

입력 10건 = 대상 판독 가능 7건 + 다른 상품 1건 + 보류 2건.
대상 7건 = 개선 범위 안 불편 5건 + 긍정 1건 + 범위 밖 1건.
불편 5건 = 토출 2건 + 휴대와 누액 2건 + 안내 가독성 1건.

사람의 제안 예시: 휴대 중 뚜껑 이탈과 누액을 먼저 점검한다. 같은 분류의 2건이라는 관찰과 사용 장면을 근거로 고른 수업용 판단이다. 빈도만으로 원인, 실제 위험, 수요를 확정하지 않는다. 뚜껑 체결과 누액 원인을 별도로 확인해야 한다.
대안: 체결 상태 안내 보완과 용기 구조 검토를 비교한다. 제조 가능성과 개선 효과는 미검증이다.
''',
        'cases': [
            ('정상', 'R02', '휴대와 누액 분류, 원문 인용, 원인 미확정'),
            ('정상', 'R03', '안내 가독성 분류, 원문 인용'),
            ('예외', 'R08', '상품 ID 확인을 요청하고 집계 보류'),
            ('예외', 'R09', '원문을 요청하고 분류 보류'),
        ],
        'failure': '상반된 토출 관찰을 같은 원인으로 단정하거나, 다른 상품을 집계에 섞는 경우',
        'visual': '리뷰 근거표 → 개선 후보 선택 → 상품 개선 제안',
    },
    'product': {
        'name': '제품디자인', 'short': '제품디자인',
        'title': '사용 불편에서 생활가전 설계 대안 고르기',
        'user': '생활가전 콘셉트를 검토하는 제품디자이너',
        'problem': '사용 관찰을 요구사항과 설계 선택으로 연결하기 어렵다.',
        'input': '가상 정수기 A01 사용 관찰과 디자인 브리프',
        'task': '관찰과 추측을 나누고 요구사항 초안',
        'output': '근거표, 요구사항과 대안 스케치 2개',
        'decision': '제약을 비교한 대안 선택과 기각 이유',
        'hold': '관찰이 없거나 제약과 충돌하면 확인 요청',
        'exclude': '치수, 소재, 제조성과 안전 성능의 임의 확정',
        'limit': '콘셉트와 스케치는 실제 제작 가능성이나 안전 검증을 의미하지 않는다.',
        'before': ['사용 관찰 읽기', '요구사항과 아이디어 정리', '대안을 스케치하고 비교'],
        'after': ['관찰과 제약 확인', 'AI가 요구사항과 대안 초안', '디자이너가 스케치와 선택'],
        'source': '''# 가상 생활가전 사용 관찰

수업용 합성 자료입니다. 특정 회사 제품의 실제 사용성이나 성능을 설명하지 않습니다.
대상: 가상 탁상형 정수기 A01. A02는 다른 제품입니다.
디자인 브리프: 조작부 안내와 물받이 사용 경험을 검토합니다.
제품 외형 확대와 내부 배관 변경은 이번 범위에서 제외합니다. 실제 치수와 재질은 미제공입니다.

| ID | 제품 | 관찰 원문 |
| --- | --- | --- |
| U01 | A01 | 사용자는 온수와 상온수 아이콘을 번갈아 보고 설명서를 펼쳤다. |
| U02 | A01 | 젖은 손으로 물받이 가장자리를 두 번 잡은 뒤 분리했다. |
| U03 | A01 | 높은 텀블러를 기울여 놓았으나 물을 받지 않고 치웠다. |
| U04 | A01 | 사용자는 상온수 버튼을 누르고 컵에 물을 받았다. |
| U05 | A02 | 물받이를 빼기 어려웠다고 말했다. |
| U06 | A01 | [관찰 원문 없음] |

추가 제안 X01: 제품 높이를 늘리고 내부 배관을 바꾸자. 이 제안은 위 브리프의 제외 범위와 충돌합니다.
''',
        'rule': '관찰 사실, 해석 가설, 요구사항, 대안, 미검증 항목을 분리한다. U01에서 혼동 가능성은 가설이며 안전사고가 발생했다고 쓰지 않는다. U03은 기록하되 치수나 외형 변경을 임의로 확정하지 않는다. 스케치는 사람이 직접 작성하거나 AI 초안을 직접 수정하고 기여를 기록한다.',
        'reference': '''# 구성 예시 / 실제 AI 실행 결과 아님

| 근거 | 관찰 사실 | 해석 가설 | 요구사항 |
| --- | --- | --- | --- |
| U01 | 아이콘을 번갈아 보고 설명서를 펼침 | 모드 구분이 어려울 수 있음 | 조작 전에 모드를 구분할 단서 제공 |
| U02 | 물받이 가장자리를 두 번 잡고 분리 | 잡는 위치를 찾기 어려울 수 있음 | 잡는 위치와 분리 방향을 알아볼 단서 제공 |
| U03 | 텀블러를 기울인 뒤 치움 | 공간 제약 가능성 | 실제 치수와 사용 의도 추가 확인 |
| U04 | 상온수 버튼을 누르고 물을 받음 | 정상 사용 관찰 | 개선 근거로 과장하지 않음 |
| U05 | 다른 제품 A02의 기록 | 대상 밖 | 비교 근거에서 제외 |
| U06 | 관찰 원문 없음 | 해석 불가 | 원문 요청 후 보류 |

대안 A: 기존 조작부에 모드 이름과 구분 단서를 배치하는 스케치.
대안 B: 기존 물받이에 잡는 위치와 분리 방향 단서를 배치하는 스케치.
비교 기준: 원문 연결, 브리프 범위, 사용자가 확인할 행동, 아직 필요한 검증.
선택 예시: 이번에는 A를 고르고 아이콘 구분 과제를 시험한다. B는 별도 물받이 관찰이 더 필요해 보류한다. 이는 가상 과제의 선택이며 더 우수한 실제 제품이라는 주장이 아니다.
sketch-alternatives.svg는 위 두 대안의 수업용 선화 예시다. 학습자는 이를 그대로 자기 작업으로 쓰지 않고 직접 수정한 스케치 2개에 근거 ID를 표시한다. 실제 제품 도면은 아니다.
X01은 외형과 배관 변경을 요구해 현재 범위에서 보류한다.
''',
        'cases': [
            ('정상', 'U01', '관찰과 혼동 가설을 분리하고 요구사항 연결'),
            ('정상', 'U02', '잡는 위치 가설과 사용 단서 대안 연결'),
            ('예외', 'U06', '관찰 원문 요청 후 해석 보류'),
            ('예외', 'X01', '브리프와 충돌하므로 범위 확인 후 보류'),
        ],
        'failure': '관찰만 보고 치수와 안전성을 확정하거나, 렌더링을 실제 사용성 검증으로 설명하는 경우',
        'visual': '관찰 근거 → 요구사항 → 스케치 A와 B → 선택 이유',
    },
    'hr': {
        'name': 'HR / 경영지원', 'short': 'HR',
        'title': '가상 온보딩 안내의 누락 점검하기',
        'user': '입사 준비 안내를 확인하는 HR 담당자',
        'problem': '일정과 안내문을 대조할 때 빠진 항목을 찾기 어렵다.',
        'input': '가상 일정의 필수 항목과 안내문',
        'task': '항목별 일치, 누락, 충돌과 보류 초안',
        'output': '누락 근거표와 확인 질문, 안내문 초안',
        'decision': '담당자에게 확인할 항목과 안내문 채택',
        'hold': '기준이나 담당자가 없으면 확인 필요로 보류',
        'exclude': '실제 사내 제도 생성과 지원자 합격 판단',
        'limit': '가상 과제이며 실제 회사 규정이나 법적 적합성을 검증한 결과가 아니다.',
        'before': ['일정과 안내문 읽기', '필수 항목을 하나씩 대조', '담당자 확인과 안내 수정'],
        'after': ['가상 기준과 안내 준비', 'AI가 누락과 충돌 초안', 'HR이 담당자 확인과 채택'],
        'source': '''# 가상 온보딩 입력

수업용 합성 자료입니다. 실제 직원 개인정보나 회사 규정이 아닙니다.
주제는 첫 회차 관심 업무 확인 전 제안입니다. 채용 운영이나 교육 운영을 원하면 대상 자료와 항목을 다시 정합니다.

## 입력 A / 필수 기준표

| ID | 필수 항목 | 기준 | 담당 |
| --- | --- | --- | --- |
| C01 | 첫날 시작 | 09:30 | 인사 담당 |
| C02 | 도착 장소 | 3층 안내 데스크 | 인사 담당 |
| C03 | 계정 안내 | 입사 전날 18시까지 | IT 담당 |
| C04 | 첫날 준비물 | 노트북 | 경영지원 담당 |
| C05 | 문의 담당 | 인사 담당 | 인사 담당 |
| C06 | 교육 수강 기한 | [기준 미제공] | [담당 미제공] |

## 입력 B / 안내문 원문

L01: 첫날 오전 10시에 3층 안내 데스크로 와 주세요.
L02: 개인 노트북을 준비해 주세요.
L03: 궁금한 점은 담당자에게 문의해 주세요.
L04: 교육은 안내된 기한까지 수강해 주세요.
''',
        'rule': '필수 기준표를 기준으로 안내문을 대조한다. 기준표가 없는 항목은 회사 규정으로 추정하지 않는다. 시간 충돌은 날짜를 만들어 해결하지 않고 담당자 확인을 요청한다. 문의 담당은 역할이 명시돼야 충족으로 본다. 안내문 초안의 미확정 내용은 [확인 필요]로 남기고 실제 발송하지 않는다.',
        'reference': '''# 구성 예시 / 실제 AI 실행 결과 아님

| ID | 기준과 안내문 근거 | 상태 | 사람의 다음 행동 |
| --- | --- | --- | --- |
| C01 | 09:30 / L01 오전 10시 | 충돌 | 인사 담당에게 확정 시각 질문 |
| C02 | 3층 안내 데스크 / L01 일치 | 일치 | 채택 |
| C03 | 계정 안내 기한 / L01~L04에 없음 | 누락 | IT 담당에게 전달 일정 확인 |
| C04 | 노트북 / L02 개인 노트북 | 일치 + 추가 확인 | 노트북 항목은 충족. 개인 지참 여부는 기준에 없어 확인 |
| C05 | 인사 담당 / L03 담당자만 표기 | 불명확 | 문의할 역할을 명시하도록 요청 |
| C06 | 기한과 담당 미제공 / L04 | 보류 | 기준과 담당을 요청 |

6항목 = 충돌 1 + 일치 2 + 누락 1 + 불명확 1 + 보류 1.
추가 확인 1건(C04)은 위 상태 집계와 별도의 주석이다.

안내문 초안: 첫날 [확정 시각 확인 필요]에 3층 안내 데스크로 와 주세요. 노트북 준비 방식은 [개인 지참 여부 확인 필요]입니다. 계정 안내는 [IT 담당 확인 필요], 문의 창구는 인사 담당 [연락 방법 확인 필요]입니다. 교육 기한은 [기준 확인 필요]입니다.
담당자 확인과 수정 후에만 실제 운영용 안내로 사용할 수 있다. 이 예시는 발송하지 않는다.
''',
        'cases': [
            ('정상', 'C02', '기준과 L01을 대조해 일치로 표시'),
            ('정상', 'C03', '안내문 전체에서 찾지 못해 누락으로 표시'),
            ('예외', 'C01', '09:30과 10시 충돌 표시, 확정 보류'),
            ('예외', 'C06', '기준과 담당 요청, 임의 기한 생성 금지'),
        ],
        'failure': '원문에 없는 제도와 담당자를 만들거나, 충돌 시간을 임의로 확정하는 경우',
        'visual': '가상 기준과 안내문 → 누락 근거표 → 담당자 확인 → 안내 초안',
    },
}

COMMON_HOMEWORK = {
    1: '프로젝트 지침서 MD와 같은 내용의 HTML 또는 PDF. 직무, 문제 근거, AI와 사람의 역할, 정상 1건과 예외 1건의 검수 계획을 기록합니다. 실행은 선택입니다.',
    2: '수정 지침서, PRD와 업무 순서도, 정상 2건과 예외 2건의 기대 결과. Markdown, PDF 또는 HTML 중 읽을 수 있는 형식으로 제출합니다.',
    3: '직무 결과물 초안, 실제 실행 기록과 검증표 4건, 실패 또는 한계 2건, 수정 전후. 발표 구성 초안을 함께 준비합니다.',
    4: '최종 포트폴리오 1건을 PDF, PPT 또는 HTML 중 하나로 제출합니다. 5분 발표와 면접 90초 답변을 준비합니다. 라이브 데모는 선택입니다.',
}

HOMEWORK_PROMPT = '''내가 만든 지침서와 업무 순서도, 정상 2건과 예외 2건의 기대 결과를 읽어줘.
세 자료의 입력, 출력, 사람의 판단과 보류 조건이 일치하는지 확인해줘.
빠진 부분은 질문으로 남기고 없는 근거나 실행 결과는 만들지 마.
Markdown, PDF 또는 HTML 중 내가 고른 형식으로 정리해줘.
Agent 생성과 코드 구현은 필수가 아니야.'''


def files_for(k):
    prd = f'''# PRD / {k['title']}

수업용 합성 자료를 사용하는 설계 예시입니다. 개인 프로젝트 주제는 자료 확인 후 확정합니다.
사용자: {k['user']}
문제: {k['problem']}
입력: {k['input']}
첫 기능: {k['task']}
출력: {k['output']}
사람의 결정: {k['decision']}
보류: {k['hold']}
제외: {k['exclude']}
완료 기준: 입력 ID, 원문 근거, 초안, 사람의 판정이 연결되고 정상 2건과 예외 2건을 확인한다.
한계: {k['limit']}
'''
    guide = f'''# 작업 지침 / {k['short']}

목적: {k['problem']}
참고: PRD.md, WORKFLOW.md, input.md
역할 하나: {k['task']}
결과: {k['output']}
규칙: {k['rule']}
사람의 결정: {k['decision']}
보류 조건: {k['hold']}
제외 범위: {k['exclude']}
실행 전에 실제로 읽은 파일명을 확인한다. 원문 ID와 인용을 함께 남긴다.
reference-output.md와 expected.md는 실행 입력으로 읽지 않는다. 실행 뒤 사람이 비교할 검수 참고다.
AI가 만든 초안은 미검수로 표시한다. 없는 자료와 수치, 실행하지 않은 결과를 만들지 않는다.
{k['limit']}
'''
    flow = f'''# 업무 순서도 / {k['short']}

1. 사람: {k['input']} 준비. 사용 범위와 대상 ID 확인.
2. AI: {k['task']}. 원문 ID와 근거 인용을 결과에 붙인다.
3. 보류 분기: {k['hold']}. 누락 자료와 확인 질문을 남기고 해당 항목을 멈춘다.
4. 사람: 원문 대조 후 채택, 수정 또는 보류. {k['decision']}을 직접 기록.
5. 결과: {k['output']}. 미검증 항목과 다음 확인 작업 표시.

웹 채팅에서 한 역할로 수행해도 된다. Agent 파일 생성, 코딩과 외부 연동은 선택이다.
'''
    prompt = f'''첨부한 input.md, PRD.md, WORKFLOW.md와 GUIDELINES.md를 읽어줘.
실제로 읽은 파일을 먼저 알려주고, 파일이 없으면 요청해줘.
내 직무는 {k['name']}이고 이번 작업은 다음과 같아: {k['task']}.
입력별 ID / 관찰 또는 원문 / AI 초안 / 근거 / 상태 / 사람 확인 질문으로 정리해줘.
{k['rule']}
{k['hold']}.
{k['exclude']}은 하지 마.
검수용 expected.md와 reference-output.md는 입력으로 읽지 마.
출력은 검수 전 초안으로 표시하고 사람이 결정할 지점에서 멈춰줘.
실제 AI 실행이 불가능하면 구성 예시임을 명시하고 실행했다고 쓰지 마.
'''
    expected = '# 검수 참고 / 실행 입력에 첨부하지 않기\n\n| 유형 | 입력 ID | 기대 행동 |\n| --- | --- | --- |\n' + ''.join(f'| {a} | {b} | {c} |\n' for a,b,c in k['cases'])
    validation = '# 실제 실행 검증표 / 학습자가 작성\n\n결과 예시와 실제 실행을 구분합니다. 아직 실행하지 않은 칸은 미실행입니다.\n\n| 유형 | 입력 ID | 기대 행동 | 실제 결과 | 근거 | 판정 | 사람의 수정 |\n| --- | --- | --- | --- | --- | --- | --- |\n' + ''.join(f'| {a} | {b} | {c} | 미실행 | 미기록 | 미판정 | 미기록 |\n' for a,b,c in k['cases'])
    validation += f'\n추가 점검: {k["failure"]}.\n실행 전후 시간은 직접 측정한 경우에만 비교합니다. 가상 사례를 현업 성과로 쓰지 않습니다.\n'
    readme = f'''# {k['name']} 실습 자료

주제: {k['title']}
모든 입력은 수업용 합성 자료입니다. 참고 결과는 사람이 작성한 구성 예시이며 AI의 실제 실행 로그가 아닙니다.

1. input.md와 PRD.md, WORKFLOW.md, GUIDELINES.md를 읽습니다.
2. prompt.md를 사용해 AI에 첫 작업을 맡깁니다. ChatGPT, Claude, Gemini 등 파일 또는 텍스트를 읽을 수 있는 채팅에서 진행할 수 있습니다. 도구별 기능을 확인합니다.
3. reference-output.md와 expected.md는 처음 실행에 첨부하지 않습니다. 독립 실행 뒤 사람의 검수에 사용합니다.
4. 실제 응답과 원문을 대조해 validation.md를 채웁니다.
5. {k['decision']}을 직접 기록하고 수정 전후를 남깁니다.
6. 제품디자인 트랙의 스케치는 학습자가 별도로 제작합니다. 텍스트 예시만으로 스케치를 만들었다고 기록하지 않습니다.

## 공통 제출 기준
''' + '\n'.join(f'{n}주차: {s}\n' for n,s in COMMON_HOMEWORK.items())
    return {'README.md': readme, 'input.md': k['source'], 'PRD.md': prd, 'WORKFLOW.md': flow, 'GUIDELINES.md': guide, 'prompt.md': prompt, 'reference-output.md': k['reference'], 'expected.md': expected, 'validation.md': validation, 'homework.md': HOMEWORK_PROMPT}


def rows2(items):
    return '<div class="prd-sheet"><header>D그룹 / 직무별 실습</header><div class="prd-columns">' + ''.join('<section><dl>'+''.join(f'<dt>{H(a)}</dt><dd>{H(b)}</dd>' for a,b in col)+'</dl></section>' for col in [items[:2],items[2:]]) + '</div></div>'


def flow3(k, before=False):
    values = k['before'] if before else k['after']
    return '<div class="agent-connection-track">' + '<span class="wf-arrow">→</span>'.join(f'<div class="wf-node {"wf-ai" if i==1 and not before else ""}"><h4>{["입력", "처리", "검수"][i]}</h4><p>{H(v)}</p></div>' for i,v in enumerate(values)) + '</div>'


def w3_cards(items):
    compact = {
        '가상 상품 P01 리뷰 10건과 상품 기준':'가상 상품 리뷰 10건',
        '가상 정수기 A01 사용 관찰과 디자인 브리프':'가상 정수기 사용 관찰',
        '가상 일정의 필수 항목과 안내문':'가상 일정과 안내문',
        '리뷰 ID별 불편과 원문 근거 분류':'불편과 원문 근거 분류',
        '관찰과 추측을 나누고 요구사항 초안':'관찰에서 요구사항 초안',
        '항목별 일치, 누락, 충돌과 보류 초안':'누락과 충돌 대조',
        '상품 ID 또는 원문이 없으면 보류':'상품 ID와 원문 확인',
        '관찰이 없거나 제약과 충돌하면 확인 요청':'관찰 누락과 제약 충돌',
        '기준이나 담당자가 없으면 확인 필요로 보류':'기준과 담당 미상 보류',
        '리뷰 근거표와 상품 개선 제안 1장':'근거표와 개선 제안',
        '근거표, 요구사항과 대안 스케치 2개':'요구사항과 스케치 2개',
        '누락 근거표와 확인 질문, 안내문 초안':'누락표와 안내문 초안',
        '개선 우선순위와 상품 제안 이유':'개선 우선순위 선택',
        '제약을 비교한 대안 선택과 기각 이유':'대안 선택과 기각 이유',
        '담당자에게 확인할 항목과 안내문 채택':'확인 질문과 안내문 채택',
        '치수, 소재, 제조성과 안전 성능의 임의 확정':'치수와 성능 확정 금지',
        '다른 상품의 리뷰와 근거 없는 효능 주장':'다른 상품과 효능 주장',
        '실제 사내 제도 생성과 지원자 합격 판단':'제도 생성과 합격 판단',
        '정상 2건과 예외 2건, 수정 전후':'정상 2건과 예외 2건',
        '입력과 지침 첨부 → 실제 응답 저장':'입력 첨부와 응답 저장',
        '원문과 응답 대조 → 내 판단 기록':'원문 대조와 판단 기록',
        '반복 처리나 파일 생성이 필요할 때':'필요할 때 코드로 확장',
        'input, PRD, WORKFLOW, GUIDELINES':'입력과 설계 문서 4개',
        'expected와 reference-output은 검수용':'기대표와 결과 예시',
        '실습 자료의 prompt.md 사용':'prompt.md 사용',
        '도구와 실행일, 실제 응답 보관':'실제 응답과 실행일',
        '입력 ID와 인용이 실제 존재하는가':'입력 ID와 인용 확인',
        '의도한 입력에서 근거와 결과 확인':'근거와 결과 대조',
        '누락과 충돌에서 보류하는지 확인':'누락과 충돌 시 보류',
        '기존 결과 조회와 AI 실제 호출 구분':'조회와 실제 호출 구분',
        'ID 선택 → 근거와 사람의 판정 표시':'ID별 근거와 판정 보기',
        '4건 검증, 한계 2건과 수정 전후':'검증 4건과 한계 2건',
        'PPT 완성은 필수가 아닙니다.':'문제와 판단, 결과 개요',
        '직무 결과물 초안과 실제 검증 기록':'결과물 초안과 검증표',
        '최종 포트폴리오 1건과 5분 발표':'포트폴리오와 5분 발표',
        '파일명: 주차_이름_결과물':'주차_이름_결과물',
        '개인정보 제외와 열람 권한 확인':'공개 범위와 열람 권한',
    }
    items=[(a,compact.get(b,b)) for a,b in items]
    return '<div class="agent-connection-track">' + '<span class="wf-arrow">→</span>'.join(f'<div class="wf-node"><h4>{H(a)}</h4><p>{H(b)}</p></div>' for a,b in items) + '</div>'


def w3_action(text):
    return '<p class="course-action"><b>지금 할 일</b> '+H(text)+'</p>'


def kit_link(rid, prefix='', label='직무별 입력과 검수 자료 열기 ↗'):
    return f'<a class="heading-link" href="{prefix}role-lab.html?role={rid}">{label}</a>'


def codebox(text, key):
    if key=='prompt.md':
        lines=text.splitlines()
        text='\n'.join(lines[:4]+lines[5:9])
        label='실행 요청 요약 / 상세 규칙은 첨부 지침 확인'
    else: label='직무 예시 / 복사 후 내 자료로 수정'
    return f'<div class="prompt-card"><header><span>{label}</span><button class="copy-full" data-role-copy="{key}">전체 프롬프트 복사</button></header><pre>{H(text)}</pre></div>'


def lesson_content(rid,k,files):
    rule_short = f"근거 ID와 인용을 남기고, {k['hold']}한다.\n{k['exclude']}은 하지 않는다.\n최종 선택은 사람이 한다."
    w2 = {
        'slide-21': ('지난주 지침서를 PRD로 구체화합니다',rows2([('가져올 것','1주차 지침서, 원문과 출처, 질문 1개'),('수정할 것','받은 의견 중 채택할 수정과 이유'),('PRD에 남길 것','사용자, 첫 처리, 제외 범위와 완료 기준'),('다음 단계','같은 자료로 순서도와 검수 기준 작성')])),
        'slide-25': ('업무 순서도는 문서로 먼저 만듭니다',rows2([('입력','내 지침서와 PRD, 실제 원문 ID'),('핵심 흐름','입력 → AI 초안 → 사람 검수'),('보류 경로',k['hold']),('저장','WORKFLOW.md / HTML 순서도는 선택')])),
        'slide-40': ('처음 만든 작업 지침서를 보완합니다',rows2([('그대로 이어 쓰기','1주차 AI작업지침서.md를 최신 기준으로 수정'),('PRD와 맞추기','입력, 출력, 역할과 보류 조건 일치'),('키트의 GUIDELINES','내 지침서와 같은 역할 / 별도 필수 아님'),('선택 / Code','필요하면 같은 기준을 CLAUDE.md로 옮기기')])),
        'slide-41': ('다음 주에 넘길 문서와 입력을 확인합니다',rows2([('최신 지침서','내가 채택한 수정과 이유를 보관'),('PRD와 WORKFLOW','첫 처리와 업무 흐름을 같은 기준으로'),('입력','input.md의 원문 ID와 출처 유지'),('별도 검수 자료','정상 2건과 예외 2건의 기대 행동')])),
        'slide-42': ('실제로 읽은 기준을 먼저 확인합니다',rows2([('기본 / 웹 채팅','지침, PRD와 순서도, 입력을 전달'),('읽기 확인','파일명뿐 아니라 목적과 기준을 요약받기'),('불일치','옛 지침과 충돌하면 최신 기준 확인'),('선택 / Code','같은 작업 기준을 파일로 읽혀 적용')])),
        'slide-44': ('설계와 기대 기준을 정하고 다음 주로',rows2([('2주차 완료','수정 지침, PRD와 순서도, 기대 행동 4건'),('선택 PoC','작은 입력으로 지침을 시험해도 됨'),('실행했다면','실제 응답과 수정 기록을 별도 저장'),('3주차 필수','같은 입력과 지침으로 실행하고 4건 검수')])),
        'slide-58': ('문제와 설계가 다음 주 실행의 기준입니다',rows2([('문제','사용자, 원문 근거와 확인할 가설'),('설계','첫 처리와 사람 검수, 제외 범위'),('기대 기준','정상 2건과 예외 2건 / 실행 전 작성'),('다음 주','실제 응답, 검증표와 내 수정 기록')])),
        'slide-3': ('누구의 어떤 결정을 돕나요?', rows2([('WHO',k['user']),('WHY',k['problem']),('WHY AI',k['task']),('사람의 판단',k['decision'])])),
        'slide-5': ('첫 결과물 하나로 범위를 좁힙니다', rows2([('넓은 아이디어',k['title']),('첫 처리',k['task']),('결과물',k['output']),('제외 범위',k['exclude'])])),
        'slide-14': ('AI 초안과 내 판단을 나눕니다', rows2([('입력',k['input']),('AI가 할 일',k['task']),('내가 결정할 일',k['decision']),('보류 조건',k['hold'])])),
        'slide-15': ('직무와 업무 장면을 함께 적습니다', rows2([('사용자',k['user']),('업무 장면',k['problem']),('결과 사용',k['decision']),('추가 확인',k['limit'])])),
        'slide-18': ('내 직무의 첫 결과물과 검수 기준', rows2([('WHO / WHY',k['user']+' / '+k['problem']),('INPUT / OUTPUT',k['input']+' → '+k['output']),('FLOW / SCOPE','AI 초안 → 사람 검수 / '+k['exclude']+' 제외'),('DONE / HOLD','원문 ID와 판단 연결 / '+k['hold'])])),
        'slide-20': ('직무별 PRD를 내 자료로 바꿉니다', rows2([('첫 기능',k['task']),('완료 기준','원문 ID와 인용, 사람의 판정 연결'),('첫 시험','정상 2건과 예외 2건 / 별도 기대표'),('한계',k['limit'])])),
        'slide-33': ('입력부터 사람의 결정까지', rows2([('입력 확인',k['input']),('AI 초안',k['task']),('사람 검수',k['decision']),('보류 분기',k['hold'])])),
        'slide-39': ('작업 지침에는 검수할 핵심만 남깁니다', '<div class="code-example"><pre>'+H(f"# {k['name']} / 작업 지침\n\n목적: {k['problem']}\n입력: input.md, PRD.md, WORKFLOW.md\n출력: {k['output']}\n\n## 규칙\n{rule_short}\n\n예상 답안은 실행 후 사람의 검수에만 사용한다.")+'</pre></div>'),
        'slide-47': ('첫 시험은 역할 하나로 시작합니다', rows2([('담당 역할',k['task']),('실행 방법','웹 채팅 또는 파일을 읽는 AI 중 선택'),('필수','실제 응답과 원문 대조, 검수 기록'),('선택 심화','여러 Agent, 코드와 외부 연동')])),
        'slide-48': ('내 지침으로 작은 입력을 시험합니다',codebox(files['prompt.md'],'prompt.md')),
        'slide-49': ('정상과 예외에서 기준을 확인합니다',rows2([(a+' / '+b,c) for a,b,c in k['cases']])),
        'slide-72': ('2주차 숙제 / 순서도와 검수 기준',rows2([('수정 지침서와 PRD',k['task']+'와 보류 조건 반영'),('업무 순서도','입력 → AI 초안 → 사람 검수와 보류'),('검수 기준','정상 2건과 예외 2건의 기대 행동'),('다음 회차','12/3 목요일 20시 / 상세 마감과 제출 위치는 채널 공지')])),
        'slide-73': ('내 직무의 설계와 검수 기준을 정리합니다',codebox(HOMEWORK_PROMPT,'homework.md')),
    }
    w3 = {
        'slide-5': ('2주차 자료를 같은 프로젝트에서 이어 씁니다',w3_cards([('가져올 문서','최신 지침과 PRD, 순서도'),('가져올 입력','원문 ID와 출처를 유지'),('별도 기대표','실행 뒤 사람 검수에 사용')])+w3_action('새 주제를 만들지 않고, 채택한 수정만 기존 지침에 반영합니다.')),
        'slide-6': ('지침과 원문을 읽히고 기대표는 분리합니다',w3_cards([('기본 입력','최신 지침, PRD와 순서도'),('원문','input.md와 원문 ID'),('검수 참고','expected는 처음에 제외')])+w3_action('자료를 읽었는지 파일명과 목적을 대조합니다. 피드백 PDF와 HTML 순서도는 필수가 아닙니다.')),
        'slide-7': ('수정할 기준 하나를 고른 뒤 적용합니다',w3_cards([('비교','지침과 PRD의 불일치 확인'),('선택','내가 채택한 수정만 반영'),('보관','수정 전후와 선택 이유')])+w3_action('받은 피드백이 없으면 원문과 완료 기준을 대조합니다. 없는 의견을 만들지 않습니다.')),
        'slide-8': ('최신 지침 한 벌로 실행합니다',w3_cards([('기준 파일','지침, PRD와 순서도'),('일치 확인','입력과 보류 조건 대조'),('실행 준비','현재 문서 버전 기록')])+w3_action('AI작업지침서와 키트 GUIDELINES는 같은 역할입니다. 서로 다른 기준을 병행하지 않습니다.')),
        'slide-23': ('실제 기록을 발표 구성 초안으로 정리합니다',w3_cards([('문제와 선택','근거와 제외한 대안'),('실제 실행','응답과 검증, 내 수정'),('남은 한계','미실행과 확인할 질문')])+w3_action('3주차는 구성 초안입니다. 4주차에 PDF, PPT 또는 HTML 중 하나로 완성합니다.')),
        'slide-27': ('지원 직무에서 읽을 증거를 고릅니다',w3_cards([('근거','원문과 실제 실행 결과'),('내 기여',k['decision']),('정리 형식','PDF, PPT 또는 HTML')])+w3_action('제품디자인은 스케치와 대안 비교를 함께 배치합니다. 구현하지 않은 기능은 미구현으로 표시합니다.')),
        'slide-29': ('내 기록을 바탕으로 발표 내용을 구성합니다',w3_cards([('읽힐 자료','문제, 지침과 실제 결과'),('설명 순서','문제 → 판단 → 검증'),('아직 없는 것','추가 확인과 미실행 표시')])+w3_action('최종 형식을 선택해 5분 설명으로 정리합니다. 시연은 선택이고, 없는 성과를 생성하지 않습니다.')),
        'slide-33': ('같은 사례를 보완하고 발표합니다',w3_cards([('보완','검증 오류와 설명 수정'),('파일 확인','열람 권한과 내용 일치'),('발표','내 판단과 남은 한계')])+w3_action('최종 포트폴리오 1건과 5분 발표, 면접 90초 답변을 준비합니다. 프로토타입과 배포는 선택입니다.')),
        'slide-4': ('오늘 남길 세 가지',w3_cards([('직무 결과물',k['output']),('실제 검증','정상 2건과 예외 2건, 수정 전후'),('발표 구성 초안','문제 → 내 판단 → 실행 → 한계')])+w3_action('웹 채팅으로도 진행합니다. 코드와 여러 Agent는 선택 심화입니다.')),
        'slide-9': ('내 직무의 기존 흐름과 AI 활용 흐름','<div class="wf-label"><b>기존 흐름</b><span>사람이 자료 정리부터 판단까지 수행</span></div>'+flow3(k,True)+'<div class="wf-label"><b>AI 활용 후</b><span>AI 초안을 원문과 대조하고 직접 결정</span></div>'+flow3(k)),
        'slide-13': ('내 직무의 첫 AI 작업 지침',w3_cards([('입력',k['input']),('할 일',k['task']),('검수',k['hold'])])+w3_action('내 판단: '+k['decision']+'. 직접 기록합니다.')),
        'slide-14': ('지침과 입력을 실제 결과로 연결합니다',flow3(k)+w3_action('처음에는 input.md와 설계 문서만 첨부합니다. 기대표는 실행 뒤 검수에 사용합니다.')),
        'slide-16': ('웹 채팅과 Code 중 필요한 방법을 고릅니다',w3_cards([('기본 / 웹 채팅','입력과 지침 첨부 → 실제 응답 저장'),('내가 할 일','원문과 응답 대조 → 내 판단 기록'),('선택 / Code','반복 처리나 파일 생성이 필요할 때')])+w3_action('도구 설치나 Agent 생성 없이도 같은 직무 과제를 수행할 수 있습니다.')),
        'slide-17': ('실습 1 / 내 직무의 입력 준비',w3_cards([('받을 파일','input, PRD, WORKFLOW, GUIDELINES'),('처음에 제외','expected와 reference-output은 검수용'),('도구 선택','파일 첨부 또는 본문 붙여넣기')])+w3_action('실제 자료를 쓴다면 출처와 공개 가능 범위를 먼저 확인합니다.')),
        'slide-17b': ('이번 실습은 역할 하나와 사람 검수',w3_cards([('역할 하나',k['task']),('사람의 결정',k['decision']),('보류',k['hold'])])+w3_action('코드와 여러 Agent는 필요할 때만 선택합니다.')),
        'slide-18': ('실습 2 / 지침과 실제 입력으로 요청',w3_cards([('지침 확인','목적, 입력, 출력과 보류 조건'),('요청 붙여넣기','실습 자료의 prompt.md 사용'),('응답 저장','도구와 실행일, 실제 응답 보관')])+w3_action('상단 입력과 검수 자료에서 내 직무의 실행 프롬프트를 받습니다.')),
        'slide-19': ('실습 3 / 원문 근거와 내 판정',w3_cards([('원문 근거','입력 ID와 인용이 실제 존재하는가'),('범위 확인',k['exclude']),('내 판정','채택, 수정 또는 보류와 이유')])+w3_action(k['failure']+'를 찾아 수정합니다.')),
        'slide-20': ('실습 4 / 정상과 예외 4건 검수',w3_cards([('정상 2건','의도한 입력에서 근거와 결과 확인'),('예외 2건','누락과 충돌에서 보류하는지 확인'),('검증표 작성','기대와 실제, 판정과 수정 기록')])+w3_action('기대표는 실행 뒤 비교합니다. 실행하지 않은 항목은 미실행으로 남깁니다.')),
        'slide-24': ('직무 결과물에서 내 판단을 보여줍니다',w3_cards([('근거',k['input']),('결과물',k['output']),('내 기여',k['decision'])])+w3_action('구성 예시는 실제 실행 로그가 아닙니다. 내 응답과 검수 기록으로 교체합니다.')),
        'slide-25': ('핵심 흐름을 확인하는 작은 프로토타입',w3_cards([('고르기',k['visual'].split(' → ')[0]),('살펴보기','원문 근거와 초안을 함께 보기'),('결정하기',k['decision'])])+w3_action('프로토타입과 라이브 데모는 선택입니다. 직무 결과물과 검증 기록이 먼저입니다.')),
        'slide-26': ('선택 / 내 직무 결과물을 화면으로',w3_cards([('실제 결과 넣기',k['output']),('핵심 동작 하나','ID 선택 → 근거와 사람의 판정 표시'),('구현 범위 표시','기존 결과 조회와 AI 실제 호출 구분')])+w3_action('제품디자인은 화면 대신 스케치와 대안 비교로 설명해도 됩니다.')),
        'slide-30': ('3주차 숙제 / 실행과 검증 기록',w3_cards([('직무 결과물 초안',k['output']),('검증과 수정','4건 검증, 한계 2건과 수정 전후'),('발표 구성 초안','PPT 완성은 필수가 아닙니다.')])+w3_action('최종 포트폴리오는 4주차에 PDF, PPT 또는 HTML 중 하나로 정리합니다.')),
        'slide-31': ('공통 제출 기준을 확인합니다',w3_cards([('3주차 필수','직무 결과물 초안과 실제 검증 기록'),('4주차 필수','최종 포트폴리오 1건과 5분 발표'),('선택','라이브 데모, 코드와 여러 Agent')])+w3_action('최종 형식은 PDF, PPT 또는 HTML 중 선택합니다.')),
        'slide-32': ('제출 위치와 자료 공개 범위 확인',w3_cards([('제출 준비','파일명: 주차_이름_결과물'),('제출 위치','D그룹 채널 공지 확인'),('원문과 권한','개인정보 제외와 열람 권한 확인')])+w3_action('실제 응답과 미실행 항목을 구분하고 검증표를 함께 준비합니다.')),
    }
    return {'week2_deck.html':w2,'week3/index.html':w3}


def replace_article(text,ident,title,body,note):
    pat=r'<article\b[^>]*\bid="'+re.escape(ident)+r'".*?</article>'
    m=re.search(pat,text,re.S)
    if not m: raise ValueError(ident)
    a=m.group()
    a=re.sub(r'data-title="[^"]*"','data-title="'+H(title,quote=True)+'"',a,count=1)
    a=re.sub(r'data-note="[^"]*"','data-note="'+H(note,quote=True)+'"',a,count=1)
    a=re.sub(r'<h3\b[^>]*>.*?</h3>','<h3>'+H(title)+'</h3>',a,count=1,flags=re.S)
    a=re.sub(r'<a class="heading-link".*?</a>','',a,flags=re.S)
    start=a.index('<div class="ppt-body">')
    footer=a.rfind('<footer')
    a=a[:start]+'<div class="ppt-body">'+body+'</div>'+a[footer:]
    return text[:m.start()]+a+text[m.end():]


def update_json_const(text,name,updates):
    match=re.search(r'\b'+re.escape(name)+r'\s*=\s*(?=[\[{])',text)
    if not match: raise ValueError('Missing JSON assignment: '+name)
    start=match.end()
    value,end=json.JSONDecoder().raw_decode(text[start:])
    if isinstance(value,list):
        for idx,val in updates.items():value[idx]=val
    else:value.update(updates)
    return text[:start]+json.dumps(value,ensure_ascii=False)+text[start+end:]


def main():
    all_files={rid:files_for(k) for rid,k in ROLES.items()}
    lessons={rid:lesson_content(rid,k,all_files[rid]) for rid,k in ROLES.items()}
    all_files['product']['sketch-alternatives.svg'] = '''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="760" viewBox="0 0 1200 760"><rect width="1200" height="760" fill="#faf9fc"/><g font-family="sans-serif" fill="#25212d"><text x="45" y="55" font-size="29">제품디자인 / 수업용 콘셉트 스케치</text><text x="45" y="95" font-size="19">가상 관찰 기반 구성 예시. 실제 제품 도면, 치수, 제조성과 안전성 검증이 아닙니다.</text><text x="65" y="160" font-size="25">대안 A / 모드 구분 단서</text><text x="650" y="160" font-size="25">대안 B / 물받이 분리 단서</text></g><g stroke="#7048b5" fill="none" stroke-width="3"><rect x="140" y="190" width="280" height="370" rx="20"/><rect x="725" y="190" width="280" height="370" rx="20"/><path d="M160 370 H400 M745 370 H985 M260 330 V390 H285 M845 330 V390 H870"/><rect x="185" y="260" width="80" height="42"/><rect x="290" y="260" width="80" height="42"/><circle cx="800" cy="281" r="15"/><circle cx="925" cy="281" r="15"/><path d="M170 510 H390 V540 H170 Z M755 510 H975 V540 H755 Z M790 520 H940 M865 550 V600 M850 580 L865 600 L880 580"/><path d="M70 330 L180 280 M1080 480 L960 520" stroke-dasharray="7 5"/></g><g font-family="sans-serif" fill="#63596d" font-size="20"><text x="194" y="288">상온수</text><text x="306" y="288">온수</text><text x="50" y="365">U01: 모드 이름과</text><text x="50" y="393">구분 단서 배치</text><text x="960" y="450">U02: 잡는 위치와</text><text x="960" y="478">분리 방향 표시</text><text x="55" y="650">비교할 행동: 설명서 없이 모드를 고를 수 있는가?</text><text x="640" y="650">비교할 행동: 잡는 위치와 방향을 찾는가?</text><text x="55" y="705">학습자 작업: 두 대안의 원문 근거와 제약을 대조하고, 직접 수정한 스케치와 선택 이유를 남기세요.</text></g></svg>'''
    for rid,files in all_files.items():
        folder=DIST/'role-kits'/rid;folder.mkdir(parents=True,exist_ok=True)
        for name,content in files.items():(folder/name).write_text(content)
        with zipfile.ZipFile(DIST/'role-kits'/f'{rid}-practice-kit.zip','w',zipfile.ZIP_DEFLATED) as z:
            for name in files:z.write(folder/name,arcname=f'{rid}/{name}')

    homework='\n\n'.join(f'{n}주차: {s}' for n,s in COMMON_HOMEWORK.items())
    for name in ['week2_deck.html','week3/index.html']:
        p=DIST/name;t=p.read_text()
        for ident,(title,body) in lessons['md'][name].items():
            prefix='../' if '/' in name else ''
            body += (w3_action('직무별 자료는 상단 직무 버튼으로 바꿉니다.') if '/' in name else '')
            t=replace_article(t,ident,title,body,'수업용 합성 자료로 진행합니다. '+COMMON_HOMEWORK[3 if '/' in name else 2])
        if name=='week2_deck.html':
            t=t.replace('PRD 예시 / MENTOR OS','PRD 예시 / 직무별 결과물').replace('멘토링 OS / 한눈에 보는 흐름','직무별 업무 흐름').replace('확정한 Agent 생성','역할 하나로 첫 시험').replace('생성한 Agent 시험','정상과 예외 검수')
            t=t.replace('2. 멘토 피드백으로 내 PRD 만들기','2. 내 직무의 PRD 만들기').replace('5. 작은 입력으로 시험하기 (PoC)','5. 작은 입력으로 시험하기 (PoC)').replace('3. 실행할 워크플로우 설계','3. 실행할 워크플로우 설계')
            t=t.replace('멘토 PDF 피드백이 있어요','내 프로젝트 피드백이 있어요').replace('과제 MD + 멘토 PDF를 읽어줘.','프로젝트 지침서와 받은 피드백을 읽어줘.')
            t=t.replace('NEXT / 지침에서 Agent로','NEXT / 지침에서 실제 시험으로')
            for label in ['Parallel / 병렬 처리','Routing / 라우팅','Gen / Eval / 사람 검수']:
                t=t.replace('data-title="'+label+'"','data-title="선택 심화 / '+label+'"')
            updates={'PoC_Agent_역할목록.md':'내 지침서에서 이번에 실행할 AI 역할 하나와 입력, 결과, 검수 기준을 정리해줘. 웹 채팅으로 충분하면 그 방법을 사용해줘. 여러 Agent와 코딩은 선택 확장이야.', 'PoC_Agent_파일생성.md':all_files['md']['prompt.md'],'PoC_Agent_첫시험.md':all_files['md']['prompt.md'], '최종_숙제_통합프롬프트.md':homework, '내_PRD_생성요청.md':'내 목표 직무와 input.md를 읽고 PRD.md를 작성해줘. 사용자, 근거, 첫 처리, 결과물, 제외 범위와 보류 조건을 적어줘. 원문에 없는 문제나 성과를 만들지 마.'}
            t=update_json_const(t,'assets',updates)
            t=update_json_const(t,'notes',{i-1:COMMON_HOMEWORK[2]+' 직무 선택 버튼으로 사례를 전환합니다. 여러 Agent와 코딩은 선택입니다.' for i in [18,20,33,39,47,48,49,72,73]})
        else:
            t=t.replace('M2. 첫 AGENT 만들기','M2. 첫 AI 작업 실행').replace('M3. 포트폴리오 PPT','M3. 직무 결과물과 발표 구성')
            # Align all remaining instructional text, including note attributes.
            t=t.replace('발표 PPT는 필수','발표 구성 초안 준비').replace('필수 제출은 PPT 1개','최종 형식은 PDF, PPT 또는 HTML 중 하나').replace('발표용 PPT 한 개','포트폴리오 초안과 검증 기록').replace('최종 제출은 최종 결과를 보여주는 발표용 PPT 한 개입니다.','3주차 제출은 직무 결과물 초안과 검증 기록입니다.')
            t=update_json_const(t,'prompts',{'homework':homework,'delegate':all_files['md']['prompt.md']})
            # Supplementary direct routes must point to the new common reference.
            t=t.replace('3주차_실행프롬프트.html#homework','../role-lab.html#homework').replace('3주차_실행프롬프트.html#step-02b','../role-lab.html').replace('3주차_과제안내.md','../course-homework.md').replace('발표_준비양식.md','../portfolio-outline.md')
        src='../role-course.js' if '/' in name else 'role-course.js'
        if src not in t:t=t.replace('</body>',f'<script src="{src}"></script></body>')
        p.write_text(t)

    # The external script swaps examples in the existing slots, preserving every stylesheet.
    data={'roles':ROLES,'files':all_files,'lessons':lessons,'homework':COMMON_HOMEWORK}
    (DIST/'role-course-data.js').write_text('window.D_ROLE_COURSE = '+json.dumps(data,ensure_ascii=False)+';\n')
    for name in ['week2_deck.html','week3/index.html']:
        p=DIST/name;t=p.read_text();prefix='../' if '/' in name else ''
        if 'role-course-data.js' not in t:t=t.replace(f'<script src="{prefix}role-course.js">',f'<script src="{prefix}role-course-data.js"></script><script src="{prefix}role-course.js">')
        p.write_text(t)

    index=(DIST/'index.html').read_text();head=index.split('<main')[0];foot=index.split('</main>')[1]
    body='<div class="hero"><div><div class="eyebrow">GROUP D / 직무별 시연과 실습</div><h1>내 자료로 실행하고<br>내 판단을 남깁니다</h1><p>모든 샘플은 수업용 합성 자료입니다. 결과 예시는 실제 AI 실행 결과가 아니며, 내 실행과 검수 기록으로 바꿉니다.</p></div></div>'
    body+='<section class="section"><h2>실습 순서</h2><div class="flow"><div><b>01 / 자료</b><span>input과 설계 문서만 첨부</span></div><div><b>02 / 실행</b><span>채팅에서 역할 하나 실행</span></div><div><b>03 / 검수</b><span>별도 기대표와 원문 대조</span></div><div><b>04 / 수정</b><span>내 판단과 수정 전후 기록</span></div></div></section>'
    for rid,k in ROLES.items():
        body+=f'<section class="section" id="{rid}"><div class="eyebrow">{H(k["name"])}</div><h2>{H(k["title"])}</h2><p>{H(k["problem"])}</p>'
        if rid=='hr':body+='<p>온보딩은 수업 제안입니다. 첫 회차에 채용 운영, 교육 운영, 경영지원 중 관심 업무를 확인한 뒤 주제를 확정합니다.</p>'
        body+=f'<div class="card lav"><h3>최종 결과물</h3><p>{H(k["output"])}</p><p>내 판단: {H(k["decision"])}</p><p>{H(k["limit"])}</p></div><div class="grid">'
        labels={'input.md':'입력 샘플','PRD.md':'PRD 예시','WORKFLOW.md':'업무 순서도','GUIDELINES.md':'작업 지침','prompt.md':'실행 프롬프트','reference-output.md':'구성 예시 / 실제 실행 아님','expected.md':'기대 행동 / 검수용','validation.md':'실제 검증표 / 작성용'}
        for f,label in labels.items():body+=f'<a class="card" href="role-kits/{rid}/{f}" download><h3>{label}</h3><p>{f} 받기 ↓</p></a>'
        if rid=='product':body+='<a class="card" href="role-kits/product/sketch-alternatives.svg" target="_blank"><h3>대안 A와 B 스케치 구성 예시</h3><p>가상 관찰 기반 선화 / 제조성과 성능 미검증</p></a>'
        body+=f'</div><p><a href="role-kits/{rid}-practice-kit.zip" download>전체 실습 자료 ZIP 받기 ↓</a></p><p><a href="week2_deck.html?role={rid}#slide-18">이 직무로 2주차 시연 보기 →</a> / <a href="week3/index.html?role={rid}#slide-13">이 직무로 3주차 실행 보기 →</a></p><div class="card"><h3>검수에서 찾을 오류</h3><p>{H(k["failure"])}</p></div></section>'
    body+='<section class="section" id="homework"><h2>주차별 공통 제출 기준</h2><div class="grid">'+''.join(f'<div class="card"><h3>{n}주차</h3><p>{H(s)}</p></div>' for n,s in COMMON_HOMEWORK.items())+'</div><p>제출 위치와 상세 마감은 D그룹 채널 공지로 확인합니다. 12/10은 포트폴리오 완성 제안 목표일입니다.</p></section>'
    (DIST/'role-lab.html').write_text(re.sub(r'<title>.*?</title>','<title>D그룹 직무별 실습 자료 / YUJIN FLOW</title>',head)+'<main class="page">'+body+'</main>'+foot)
    (DIST/'course-homework.md').write_text('# D그룹 공통 제출 기준\n\n'+homework+'\n\n상세 마감과 제출 위치는 D그룹 채널 공지로 확인합니다.\n')
    (DIST/'portfolio-outline.md').write_text('# 직무 포트폴리오 구성\n\n1. 직무와 사용자 문제\n2. 원문 근거와 사용 범위\n3. AI를 선택한 이유와 제외한 기능\n4. 실제 실행 결과와 사람이 한 판단\n5. 정상 2건과 예외 2건 검수\n6. 수정 전후와 한계 2건\n7. 지원 직무와 연결\n\n최종 형식은 PDF, PPT 또는 HTML 중 선택합니다. 가상 과제를 현업 성과로 쓰지 않습니다.\n')


if __name__=='__main__':main()
