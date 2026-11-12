"""Extend the retained week-one deck and audit the four-week handoff."""
from pathlib import Path
import html
import importlib.util
import json
import re
import zipfile

ROOT=Path(__file__).resolve().parents[1]
D=ROOT/'dist'
spec=importlib.util.spec_from_file_location('role_materials',ROOT/'scripts/build-role-materials.py')
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
H=html.escape
R=base.ROLES
VERSION='20261112-week1'

DETAIL={
 'md': dict(field='패션과 뷰티',jd='상품 리뷰와 판매 자료를 살펴 개선 후보를 정리한다.\n상품 제안의 근거와 확인할 조건을 작성한다.\n관련 담당자와 개선 우선순위를 협의한다.',fact='R02: 가방 안에서 뚜껑이 빠져 있었어요.',hypothesis='휴대 중 용기 사용 불편이 있을 수 있다.',first='리뷰 근거표와 개선 후보 1개',reason='표현이 다른 불편을 묶되 원문을 직접 대조하려고',exclude='매출 예측, 효능 주장과 제조 조건 확정',rule='상품 ID와 원문 유무는 정해진 규칙으로 확인',evidence='실제 희망 상품의 리뷰와 공고 확보',n='R02',x='R08',normal='휴대 불편 후보와 원문 인용',exception='상품 ID 확인 요청 후 보류'),
 'product':dict(field='생활가전 제품디자인',jd='제품의 사용 장면과 사용자 불편을 조사한다.\n요구사항을 정리하고 콘셉트 스케치를 비교한다.\n제품의 제약을 고려해 선택 이유를 설명한다.',fact='U01: 온수와 상온수 아이콘을 번갈아 보고 설명서를 펼쳤다.',hypothesis='조작 모드를 구분하기 어려울 수 있다.',first='관찰 근거와 요구사항 후보 1개',reason='관찰과 해석을 나눠 대안 검토의 출발점을 만들려고',exclude='치수와 재질 확정, 제조성과 안전 성능 단정',rule='대상 제품 ID와 브리프 제외 범위 확인',evidence='관심 가전의 공개 자료와 사용 관찰 확보',n='U01',x='U06',normal='관찰 사실과 해석 가설을 분리',exception='관찰 원문 요청 후 해석 보류'),
 'hr':dict(field='소비재와 이커머스 / HR과 경영지원',jd='입사 준비 일정과 안내 자료를 관리한다.\n필수 준비 항목과 전달 상태를 대조한다.\n관련 담당자와 누락 사항을 확인한다.',fact='C02의 장소는 3층 안내 데스크이며 L01에도 같은 장소가 있다.',hypothesis='기준표와 안내문 대조가 운영 누락 점검에 도움이 될 수 있다.',first='가상 안내 항목의 대조표',reason='흩어진 기준과 안내 문장을 대조하되 확정은 담당자가 하도록',exclude='실제 회사 제도 생성, 채용 평가와 자동 발송',rule='항목 ID와 기준 존재 여부 확인',evidence='첫 회차 관심 업무와 가상 기준의 사용 범위 확인',n='C02',x='C06',normal='기준표와 안내문을 대조해 일치 표시',exception='기준과 담당을 요청하고 기한 확정 보류'),
}

HANDOFF='''# D그룹 / 같은 프로젝트를 4주 동안 발전시키기

1주차: AI작업지침서.md에 사용자, 문제 근거, 범위, AI와 사람의 역할, 정상 1건과 예외 1건의 검수 계획을 적습니다. 같은 내용의 HTML 또는 PDF를 함께 제출합니다. 실행은 선택입니다.
2주차: 1주차 지침서를 수정해 이어 씁니다. PRD.md와 WORKFLOW.md로 첫 처리와 업무 순서를 구체화하고 정상 2건과 예외 2건의 기대 행동을 정합니다. 결과를 본 뒤 기대 기준을 바꾸지 않습니다.
3주차: 같은 지침과 실제 입력으로 결과물 초안을 만들고 4건을 검증합니다. 실제 응답, 내 수정 전후, 실패 또는 한계 2건과 발표 구성 초안을 남깁니다.
4주차: 같은 사례를 최종 포트폴리오 1건으로 정리합니다. PDF, PPT 또는 HTML 중 선택하고 5분 발표와 면접 90초 답변을 준비합니다. 라이브 데모와 배포는 선택입니다.

## 파일 이름과 역할

- AI작업지침서.md: 1주차 원본을 매주 수정하는 작업 기준입니다. 별도 새 프로젝트를 만들 필요가 없습니다.
- PRD.md: 2주차의 사용자, 문제, 첫 기능과 완료 범위를 적습니다.
- WORKFLOW.md: 2주차의 입력, AI 처리, 사람 검수와 보류 흐름입니다. HTML 순서도는 선택입니다.
- input.md: 실제로 사용한 입력입니다. 자료 ID와 출처를 유지합니다.
- GUIDELINES.md: 실습 키트에서 쓰는 지침 파일명입니다. 내 지침서와 같은 역할이므로 기준을 일치시킵니다. 별도 필수 제출물이 아닙니다.
- CLAUDE.md: Code를 선택한 경우에만 최신 지침을 옮기는 파일명입니다. 서로 다른 기준을 병행하지 않습니다.
- expected.md: 2주차에 정한 기대 행동입니다. 3주차 첫 실행에는 넣지 않고 사람이 사후 검수에 사용합니다.
- validation.md: 3주차 실제 결과와 원문 대조 기록입니다. 미실행은 그대로 표시합니다.

## 다음 주에 넘길 최소 자료

1 → 2: 최신 지침서, 원문 ID와 출처, 확인할 질문 1개.
2 → 3: 수정 지침서, PRD와 순서도, 입력, 별도 기대표 4건.
3 → 4: 실제 결과물 초안, 검증표 4건, 수정 전후와 남은 한계 2건.

샘플은 수업용 합성 자료입니다. 실제 사용자 불편, 현업 적용이나 성과를 증명한 기록이 아닙니다. 첫 회차에 개인 주제와 확보할 자료를 확인합니다.
제출 위치, 최종 마감과 종료 시각은 운영 공지로 확인합니다. 캘린더 등록은 11/19, 11/26, 12/3, 12/10 목요일 20시이며, 12/10 완성은 제안 목표입니다.
'''


def table(head,rows,note=''):
 return '<div class="strategy-ledger"><header>'+''.join('<b>'+H(x)+'</b>' for x in head)+'</header>'+''.join('<section>'+''.join('<p>'+H(x)+'</p>' for x in row)+'</section>' for row in rows)+'</div>'+('<div class="strategy-takeaway">'+H(note)+'</div>' if note else '')


def cards(items,lead='',note=''):
 return ('<p class="clean-talent-lead">'+H(lead)+'</p>' if lead else '')+'<div class="clean-talent-roles clean-talent-role-compact">'+''.join('<section><h4>'+H(a)+'</h4><div class="clean-talent-jd"><p>'+H(b)+'</p></div><div class="clean-talent-example"><b>'+H(c)+'</b><p>'+H(d)+'</p></div></section>' for a,b,c,d in items)+'</div>'+('<p class="clean-note">'+H(note)+'</p>' if note else '')


def chain(items,note=''):
 return '<div class="strategy-chain">'+'<i aria-hidden="true">→</i>'.join('<section><span>'+H(a)+'</span><h4>'+H(b)+'</h4><p>'+H(c)+'</p></section>' for a,b,c in items)+'</div>'+('<div class="strategy-takeaway">'+H(note)+'</div>' if note else '')


def prompt(text,key,note=''):
 return '<div class="research-prompt" data-keep-layout><pre>'+H(text)+'</pre><button class="copy-prompt" data-role-copy="'+key+'">요청 복사</button></div>'+('<div class="strategy-takeaway">'+H(note)+'</div>' if note else '')


def documents(rid,k,a):
 template=f'''# [프로젝트명] AI 작업 지침서

## 1. 목표와 문제
- 작성자: [이름]
- 희망 직무: {k['name']}
- 사용자와 업무 장면: [누가 언제 어떤 자료로 무슨 결정을 하는가]
- 확인한 원문 근거와 ID: [출처, 확인 날짜, 인용]
- 실제 불편인지 확인할 가설: [미확인 내용]

## 2. 첫 범위와 입력
- 이번 결과물 하나: [직무에 맞는 작은 결과]
- 입력과 사용 범위: [원문 ID, 출처, 실제 또는 합성 구분]
- 제외할 기능과 이유: [이번에 하지 않을 일]

## 3. 역할과 선택 이유
- 규칙으로 확인할 일: [필수 값 등]
- AI가 도울 일: [의미 해석과 초안 등]
- 내가 결정할 일: [채택, 수정과 보류]
- AI를 고른 이유와 다른 방법: [수작업 또는 규칙과 비교]

## 4. 검수 계획
- 정상 1건 / ID / 기대 행동: [직접 작성]
- 예외 1건 / ID / 보류 조건: [직접 작성]
- 원문 근거가 없을 때: [질문과 중단 기준]
- AI 실제 실행 여부: 미실행 / 실행했다면 원문 응답과 날짜 별도 기록

## 5. 다음 회차로 넘길 것
- 내가 고친 문장과 이유: [수정 전후]
- 아직 확보할 자료와 질문: [다음 확인]
- 2주차에는 이 파일을 수정하고 PRD, 순서도와 기대 행동 4건으로 확장한다.

제출: 이 MD 원본과 같은 내용의 HTML 또는 PDF. 샘플을 그대로 내 경험으로 쓰지 않습니다.
'''
 example=f'''# {k['name']} / 1주차 설계 구성 예시

수업용 합성 자료를 읽고 사람이 작성한 계획입니다. 실제 AI 실행이나 현업 성과가 아닙니다.

## 사용자와 문제
사용자: {k['user']}
관심 분야: {a['field']}
관찰 또는 기준 근거: {a['fact']}
가설: {a['hypothesis']}
추가 확인: {a['evidence']}

## 첫 범위
입력: 기존 실습 키트의 input.md. ID와 원문을 유지한다.
첫 결과: {a['first']}
선택 이유: {a['reason']}.
규칙 확인: {a['rule']}
AI 초안: {k['task']}
내 판단: {k['decision']}
제외: {a['exclude']}

## 1주차 검수 계획
정상 {a['n']}: {a['normal']}.
예외 {a['x']}: {a['exception']}.
현재 실제 실행: 미실행. 기대 행동을 계획한 단계다.

## 다음 주에 발전시킬 것
2주차: 같은 지침서를 수정하고 PRD, 업무 순서도, 정상 2건과 예외 2건의 기대 행동을 정한다.
3주차: 실제 응답과 검증 기록으로 결과물 초안을 만든다.
4주차: 같은 근거와 내 판단을 최종 포트폴리오로 설명한다.
'''
 if rid=='hr':example+='\n온보딩은 제안 주제다. 첫 회차에 채용 운영, 교육 운영, 경영지원 중 관심 업무를 확인하고 대상 자료와 기준을 확정한다.\n'
 coach=f'''# 1주차 과제 코치 / {k['name']}

내 관심 분야는 {a['field']}이고 직무는 {k['name']}다.
공고 또는 내 경험에서 근거를 확인하고 문제 하나를 정하도록 도와줘.
한 번에 질문 하나씩, 최대 세 질문으로 진행하고 내 답을 기다려줘.
1. 누가 어떤 장면에서 무슨 결정을 하며, 근거 자료가 있나?
2. 첫 결과 하나와 제외할 일은 무엇이며, AI가 필요한 이유는 뭔가?
3. 정상 1건과 예외 1건에서 무엇을 확인하고 언제 보류할까?
JD의 업무 요구와 실제 사용자 불편을 구분하고, 불편이 미확인이면 가설로 표시해줘.
내 답을 week1-template.md의 항목에 맞춰 AI작업지침서.md로 정리해줘.
자료나 답이 없는 항목은 확인 필요로 남겨줘. 결과나 성과를 만들지 마.
실행, 코딩, Agent 생성과 유료 구독은 1주차 필수 조건이 아니야.
'''
 if rid=='hr':coach+='온보딩 과제를 확정하기 전에 채용 운영, 교육 운영, 경영지원 중 관심 업무를 물어봐줘.\n'
 jd=f'''# JD 읽기 연습 / {k['name']}

다음은 사람이 만든 수업용 합성 업무 문장입니다. 실제 기업의 공고나 채용 요건이 아닙니다.

{a['jd']}

## 5분 실습
1분: 위 업무에서 행동 하나에 밑줄을 긋습니다. 실제 지원 공고가 있으면 회사, 직무, URL과 확인 날짜를 함께 적어 원문으로 바꿉니다.
2분: 원문 근거 / 행동 / 결과물 / 작은 과제 후보를 정리합니다.
2분: 내 과제 한 줄과 판단 기준 한 줄을 직접 고칩니다.
주의: JD는 맡을 업무의 근거이며, 실제 사용자의 불편과 AI의 효과를 입증하지 않습니다.
'''
 start=f'''내 희망 직무는 {k['name']}이고 관심 분야는 {a['field']}야.
첨부한 1주차 코치와 원문, 내 메모를 읽어줘.
문제, 첫 결과 하나, 검수 기준을 세 질문으로 좁혀줘.
한 번에 질문 하나씩 하고 내 답을 기다려줘.
답한 내용만 지침서로 정리하고 미확인은 가설로 남겨줘.'''
 jd_request=f'''내 희망 직무는 {k['name']}야.
아래 공고 원문에서 근거 문장 / 업무 행동 / 결과물을 정리해줘.
내가 시도할 작은 과제 하나와 검수 기준을 제안해줘.
명시된 요구와 네 제안을 구분하고, 사용자 불편은 가설로 남겨줘.
[실제 공고 또는 합성 JD 원문과 출처 붙여넣기]'''
 structure=f'''목표: {a['first']}의 범위를 정한다.
자료: [ID와 원문 붙여넣기 / 실제 또는 합성 구분]
출력: 문제 근거 / 첫 처리 / 사람의 결정 / 보류 조건.
없거나 모호한 자료는 확인 필요로 남겨줘.
지금은 설계 단계이며 실제 성과를 만들지 마.'''
 draft='''내 답을 AI작업지침서.md로 정리해줘.
사용자와 문제 근거, 첫 범위, 입력과 출처를 적어줘.
규칙, AI, 사람의 역할과 선택 이유를 나눠줘.
정상 1건과 예외 1건의 기대 행동과 보류 조건을 넣어줘.
미확인은 남기고 실행하지 않은 결과는 만들지 마.
다음 주에 보완할 질문 한 개를 마지막에 적어줘.'''
 return {'week1-template.md':template,'week1-example.md':example,'week1-coach.md':coach,'week1-start.md':start,'week1-jd.md':jd,'week1-jd-request.md':jd_request,'week1-structure.md':structure,'week1-draft.md':draft,'week1-handoff.md':HANDOFF}


def lessons(rid,k,a,f):
 overview=[(R[x]['short'],DETAIL[x]['first'],'내가 남길 판단',R[x]['decision']) for x in R]
 shortplan='문제와 기준을 정하는 1주차입니다. 실제 실행은 선택이며, 실행하지 않은 결과는 미실행으로 표시합니다.'
 same=table(['회차','이번에 남길 것','다음으로 넘길 것'],[('1주차','지침서 MD와 보기용 문서','문제와 근거, 검수 계획'),('2주차','수정 지침서와 순서도','입력과 기대 행동 4건'),('3 → 4주차','실제 실행과 검수 기록','최종 포트폴리오와 발표')],'자료 ID와 내 판단을 유지하고 같은 프로젝트를 이어갑니다.')
 out={
  'slide-8':('세 직무에서 보여줄 판단은 다릅니다',cards(overview,'세 분의 희망 직무를 바탕으로 만든 수업 제안입니다.','특정 기업의 공식 채용 요건이 아닙니다. 내 공고와 확보할 자료를 확인해 주제를 정합니다.')),
  'slide-12':('같은 프로젝트를 4주 동안 발전시킵니다',same+'<p class="clean-note">직무 MD는 상품기획 직무, 문서 .md는 Markdown 확장자입니다.</p>'),
  'slide-18':('내 직무의 업무 문장에서 과제를 찾습니다',table(['합성 업무 문장','보여줄 행동','내 과제 후보'],[(a['jd'].splitlines()[0],'입력과 근거 확인',a['first']),(a['jd'].splitlines()[1],'대안과 기준 정리',k['decision']),('내 실제 지원 공고로 교체','회사, URL과 확인 날짜 기록','실제 불편은 별도 확인')],'수업용 합성 JD입니다. 기업의 실제 공고나 채용 요건으로 인용하지 않습니다.')),
  'slide-19':('직무가 내릴 결정에서 결과물을 고릅니다',table(['내 직무','받을 자료','직접 결정할 것'],[(R[x]['short'],DETAIL[x]['first'],R[x]['decision']) for x in R],'문서의 이름보다 결과를 보고 내릴 판단을 먼저 정합니다.')),
  'slide-20':('5분 실습 / 근거와 내 과제 세 줄',prompt(f['week1-jd-request.md'],'week1-jd-request.md','1분 원문 선택 → 2분 요청 → 2분 대조. 완료: 근거 한 줄 + 내 과제 한 줄 + 판단 기준 한 줄.')),
  'slide-27':('사례의 사고과정을 내 직무로 바꿔봅니다',table(['질문','내 직무의 적용','확인할 점'],[('문제의 근거',a['fact'],'수업용 합성과 실제 자료 구분'),('AI를 선택한 이유',a['reason'],'수작업과 규칙만으로 충분한가'),('사람의 판단',k['decision'],a['evidence'])],'기존 사례에서 문제, 선택, 검증의 질문을 가져온 수업용 계획입니다. 실제 AI 응답이나 현업 성과가 아닙니다.')),
  'slide-35':('내 과제에서 AI와 규칙을 어떻게 나누나요?',table(['역할','이번 과제','확인할 것'],[('규칙',a['rule'],'기준이 정해진 항목인가'),('AI 보조',k['task'],'해석을 원문과 대조할 수 있나'),('사람',k['decision'],'채택과 보류 이유가 남는가')],k['limit'])),
  'slide-36':('처음에는 대화형 AI로 기준부터 정합니다',chain([('기본','채팅으로 시작','자료와 지침을 읽히고 초안을 확인'),('반복 시','고정 흐름 검토','입력과 검수 기준이 안정된 뒤'),('선택 심화','Agent와 코드','필요성이 확인되면 확장')],'도구 설치, Agent 생성이나 유료 구독을 이번 주의 필수 조건으로 두지 않습니다.')),
  'slide-38':('정상과 예외에서 무엇을 확인할까요?',table(['입력 ID','기대 행동','왜 필요한가'],[(a['n'],a['normal'],'원문과 판단을 연결'),(a['x'],a['exception'],'자료가 없을 때 추정하지 않기'),('아직 실행 전','기대 행동만 기록','실제 응답은 3주차 검증표로')],'1주차는 정상 1건과 예외 1건의 계획. 2주차에는 정상 2건과 예외 2건으로 확장합니다.')),
  'slide-42':('목표와 자료, 출력 조건을 구분합니다',prompt(f['week1-structure.md'],'week1-structure.md','자료 ID와 출처, 실제와 합성 구분을 유지합니다.')),
  'slide-46':('확인한 근거와 아직 모르는 것을 나눕니다',table(['근거 단계','이번 과제에서 쓸 문장','다음 확인'],[('합성 자료의 사실',a['fact'],'실제 문제의 증거와 구분'),('문제 가설',a['hypothesis'],a['evidence']),('효과','아직 개선 효과를 측정하지 않음','실제 적용과 비교 기록 필요')],'JD는 업무 요구의 근거입니다. 실제 불편과 효과는 별도 확인해야 합니다.')),
  'slide-49':('이번 주는 첫 범위와 제외할 일을 정합니다',chain([('먼저','첫 결과 하나',a['first']),('내 판단','이유와 기준',k['decision']),('나중','범위 밖은 보류',a['exclude'])],'1주차 설계 → 2주차 기준 구체화 → 3주차 실행과 검증 → 4주차 포트폴리오.')),
  'slide-51':('수업에서 초안, 숙제에서 같은 내용을 보완',chain([('문제와 근거','내 과제 세 줄','JD 또는 경험, 원문 ID와 출처'),('작업 기준','지침서 MD','역할과 정상, 예외 검수 계획'),('공유할 문서','HTML 또는 PDF','같은 MD로 변환하고 직접 대조')],shortplan)),
  'slide-52':('5분 메모 / 내 직무의 문제와 첫 범위',chain([('1분 / 문제','사용자와 근거',k['user']),('2분 / 범위','결과물 하나',a['first']),('2분 / 기준','정상과 예외',a['n']+' / '+a['x'])],'확인한 근거, 가설, 내가 선택한 이유를 나눠 적고 확인할 질문 1개를 남깁니다.')),
  'slide-53':('최신 지침을 읽히고 새 대화에서 시작합니다',chain([('준비','코치와 원문','내 직무의 코치와 입력을 받기'),('전달','파일 또는 본문','사용 가능한 채팅에 넣고 읽기 확인'),('저장','최신 지침서','내 답과 선택 이유를 문서로 보관')],'Projects는 선택입니다. ChatGPT, Claude, Gemini 등 사용 가능한 도구에서 자료를 읽을 수 있는지 확인합니다.')),
  'slide-54':('코치에게 세 질문을 받고 내 말로 답합니다',prompt(f['week1-start.md'],'week1-start.md','HR 온보딩은 제안입니다. 첫 회차에 관심 업무를 확인한 뒤 주제를 확정합니다.' if rid=='hr' else 'AI의 제안은 후보입니다. 내가 고른 이유와 아직 확인할 질문을 남깁니다.')),
  'slide-55':('내 답을 지침서로 만들고 직접 고칩니다',prompt(f['week1-draft.md'],'week1-draft.md','2분: 문제, 첫 범위, 검수 기준 중 한 문장을 직접 고치고 수정 이유를 남깁니다.')),
  'slide-56':('선택 / 정상 한 건과 예외 한 건 시험',table(['단계','내 직무의 입력','남길 기록'],[('입력 준비',a['n']+'와 '+a['x']+' 원문만 선택','최신 지침서와 원문 ID'),('독립 실행','기대표와 결과 예시는 첨부하지 않기','실제로 받은 응답과 사용 도구'),('사람 검수',a['normal']+' / '+a['exception'],'미실행과 확인한 결과 구분')],'선택 실습입니다. 실행하지 않아도 1주차 숙제를 완료할 수 있습니다.')),
  'slide-57':('같은 MD를 HTML이나 PDF로 제출합니다',chain([('원본','지침서.md','문제와 근거, 선택과 검수 계획'),('변환','HTML 또는 PDF','워크북에서 저장하거나 인쇄'),('대조','내용 일치','내가 고친 문장과 출처가 유지되는가')],'워크북도 같은 직무의 양식과 코치를 사용합니다. 배포와 실제 실행은 필수가 아닙니다.')),
  'slide-58':('이번 주 완료와 다음 주 준비를 확인합니다',chain([('내용','내 판단이 보이는가','원문과 가설, 역할과 보류 기준'),('제출','MD와 보기용 문서','같은 내용과 열람 권한 확인'),('다음 주','같은 파일 이어 쓰기','최신 지침과 원문, 질문 1개')],'제출 위치와 상세 마감은 D그룹 채널 공지로 확인합니다. 2주차는 설계 보완, 3주차는 실제 실행입니다.')),
  'slide-60':('세 직무의 첫 질문을 한 문장으로 남깁니다',cards([(R[x]['short'],DETAIL[x]['first'],'추가 확인',DETAIL[x]['evidence']) for x in R],shortplan,'최종 주제는 개인별로 확인합니다. 합성 자료에서 관찰한 내용을 현업 성과로 쓰지 않습니다.')),
 }
 for num,x in [(9,'md'),(10,'product'),(11,'hr')]:
  q=R[x];v=DETAIL[x]
  out[f'slide-{num}']=(q['name']+' / 근거에서 첫 과제로',table(['시작점','수업용 예시','내가 확인할 것'],[('근거',v['fact'],'실제와 합성, 사실과 가설'),('첫 범위',v['first'],q['decision']),('검수 계획',v['n']+' / '+v['x'],v['exception'])],'기업의 공식 과제가 아닙니다. '+('온보딩은 관심 업무 확인 전 제안입니다.' if x=='hr' else '실제 공고와 자료에 맞춰 범위를 정합니다.')))
 return {'week1_deck.html':out}


def page(title,body):
 index=(D/'index.html').read_text()
 return re.sub(r'<title>.*?</title>','<title>'+title+' / YUJIN FLOW</title>',index.split('<main')[0])+'<main class="page">'+body+'</main>'+index.split('</main>')[1]


def main():
 files={x:documents(x,R[x],DETAIL[x]) for x in R}
 lesson={x:lessons(x,R[x],DETAIL[x],files[x]) for x in R}
 (D/'week1-role-data.js').write_text('window.D_WEEK1_COURSE = '+json.dumps(dict(roles=R,files=files,lessons=lesson),ensure_ascii=False)+';\n')
 (D/'course-handoff.md').write_text(HANDOFF)
 for rid,docs in files.items():
  folder=D/'role-kits'/rid
  for f,t in docs.items():(folder/f).write_text(t)
  with zipfile.ZipFile(D/'role-kits'/f'{rid}-practice-kit.zip','w',zipfile.ZIP_DEFLATED) as z:
   for f in sorted(folder.iterdir()):z.write(f,arcname=rid+'/'+f.name)
 p=D/'week1_deck.html';t=p.read_text()
 if 'week1-role-data.js' not in t:t=t.replace('</body>',f'<script src="week1-role-data.js?v={VERSION}"></script><script src="role-course.js?v={VERSION}"></script></body>')
 t=t.replace('src="d-group-links.js"',f'src="d-group-links.js?v={VERSION}"');p.write_text(t)
 # Keep the navigation's existing chapter structure and numbers, updating only labels.
 p=D/'course-navigation.json';j=json.loads(p.read_text())
 for section in j.get('week1',[]):
  for item in section.get('items',[]):
   ident=item['href'].split('#')[-1]
   if ident in lesson['md']['week1_deck.html']:item['label']=lesson['md']['week1_deck.html'][ident][0]
 p.write_text(json.dumps(j,ensure_ascii=False,indent=2)+'\n')
 body='<div class="hero"><div><div class="eyebrow">GROUP D / WEEK 01</div><h1>이번 주는 문제와<br>작업 기준을 정합니다</h1><p>실제 실행과 성과는 다음 단계입니다. 합성 예시는 계획을 설명하며, 개인의 경험이나 실제 기업의 채용 과제가 아닙니다.</p></div></div>'
 for rid,k in R.items():
  a=DETAIL[rid];body+=f'<section class="section" id="{rid}"><h2>{H(k["name"])} / {H(a["first"])}</h2><div class="card lav"><h3>시작 근거와 아직 모르는 것</h3><p>{H(a["fact"])}</p><p>가설: {H(a["hypothesis"])}</p><p>추가 확인: {H(a["evidence"])}</p></div><div class="grid">'
  for filename,label in [('week1-coach.md','내 직무의 과제 코치'),('week1-template.md','작성 양식'),('week1-example.md','설계 구성 예시'),('week1-jd.md','합성 JD 5분 실습지'),('input.md','같은 프로젝트의 입력 샘플'),('week1-handoff.md','2주차로 넘기는 방법')]:
   body+=f'<a class="card" href="role-kits/{rid}/{filename}" download><h3>{label}</h3><p>{filename} 받기 ↓</p></a>'
  body+=f'</div><p><a href="workbook.html?role={rid}#editor">내 직무 양식으로 워크북 작성 →</a> / <a href="week1_deck.html?role={rid}#slide-52">5분 메모 실습 →</a></p><p><a href="week2_deck.html?role={rid}#slide-18">2주차에 이어 쓰기 →</a> / <a href="role-kits/{rid}-practice-kit.zip" download>1주차부터 전체 실습 키트 ZIP ↓</a></p></section>'
 body+='<section class="section"><h2>이번 주 완료 기준</h2><div class="card"><p>사용자와 문제 근거, 첫 결과 하나, AI와 사람의 역할, 정상 1건과 예외 1건의 검수 계획을 적습니다. 지침서 MD와 같은 내용의 HTML 또는 PDF를 제출합니다. 미실행은 그대로 표시합니다.</p><p><a href="course-flow.html">4주 강의와 실습, 숙제의 연결 보기 →</a></p></div></section>'
 (D/'week1-lab.html').write_text(page('1주차 직무별 실습',body))
 flow='<div class="hero"><div><div class="eyebrow">ZEROBASE / GROUP D / 4 WEEK FLOW</div><h1>한 프로젝트를<br>설계에서 증거로</h1><p>MD는 상품 개선 제안, 제품디자인은 요구사항과 스케치, HR은 안내 점검을 통해 같은 근거와 판단을 발전시킵니다.</p></div></div>'
 flow+='<section class="section"><h2>회차별 연결</h2><div class="flow"><div><b>11/19 / 문제와 지침</b><span>지침서와 원문, 검수 계획 2건</span></div><div><b>11/26 / 설계 구체화</b><span>같은 지침 수정, PRD와 순서도, 기대 4건</span></div><div><b>12/3 / 실행과 검증</b><span>실제 결과와 검증 4건, 수정과 한계</span></div><div><b>12/10 / 완성 목표</b><span>포트폴리오 1건, 5분 발표와 90초 답변</span></div></div><p>캘린더 등록 기준 목요일 20시입니다. 종료 시각과 제출 마감은 운영 공지로 확인합니다.</p></section>'
 flow+='<section class="section"><h2>앞 회차 자료를 다음 회차에 가져옵니다</h2><div class="grid">'+''.join('<div class="card"><h3>'+a+'</h3><p>'+b+'</p></div>' for a,b in [('1 → 2','최신 지침서, 원문 ID와 출처, 질문 1개. 새 프로젝트를 만들지 않고 지침을 수정합니다.'),('2 → 3','수정 지침, PRD와 순서도, 입력과 별도 기대표. 기대 답안은 실행 입력에 넣지 않습니다.'),('3 → 4','직무 결과물 초안과 실제 검증표, 내 수정 전후와 한계. 확인한 범위만 포트폴리오에 씁니다.')])+'</div></section>'
 flow+='<section class="section"><h2>필수와 선택</h2><div class="grid"><div class="card"><h3>필수</h3><p>1주차 지침서 MD와 보기용 문서, 2주차 설계와 기대 4건, 3주차 실제 검증, 4주차 최종 포트폴리오.</p></div><div class="card"><h3>선택</h3><p>1주차 작은 실행, Projects, 유료 구독, 코드와 여러 Agent, 프로토타입, 배포와 MCP.</p></div><div class="card"><h3>최종 형식</h3><p>PDF, PPT 또는 HTML 중 하나. 제품디자인은 스케치와 대안 비교를 포함할 수 있습니다.</p></div></div><p><a href="course-handoff.md" download>파일 이름과 인계 기준 받기 ↓</a></p></section>'
 flow+='<section class="section"><h2>1주차 60분 진행안</h2><div class="card"><p>시작과 목표 8분 → 직무 사례와 JD 10분 → AI와 사람의 역할 10분 → 코치와 지침 초안 15분 → 개인별 4분 리뷰 12분 → 숙제와 다음 준비 5분.</p><p>60분 기준 제안이며 확정된 종료 시각을 뜻하지 않습니다. 상세 이론과 다른 기업 사례는 참고 자료로 두고 개인 문서를 완성하는 시간을 확보합니다.</p></div></section>'
 flow+='<section class="section"><h2>주차별 자료</h2><p><a href="week1-lab.html">1주차 코치와 양식</a> / <a href="role-lab.html">2주차와 3주차 실행 키트</a> / <a href="submission.html">공통 제출 안내</a></p></section>'
 (D/'course-flow.html').write_text(page('4주 강의와 실습 연결',flow))

 # Preserve the workbook and its working save/export implementation.
 p=D/'workbook.html';t=p.read_text()
 t=t.replace('Claude에 파일을 넣고<br>“1주차 과제를 시작해줘”라고 입력하세요.','사용 가능한 채팅에 코치와 원문을 넣고<br>“1주차 과제를 시작해줘”라고 입력하세요.')
 t=t.replace('원문 MD','원문 MD').replace('같은 내용을 HTML 또는 PDF','같은 내용을 HTML 또는 PDF')
 if 'week1-role-data.js' not in t:t=t.replace('<script src="instruction-workbook.js',f'<script src="week1-role-data.js?v={VERSION}"></script><script src="workbook-roles.js?v={VERSION}"></script><script src="instruction-workbook.js')
 p.write_text(t)
 print('Built week-one lessons, role drafts and four-week handoff pages.')

if __name__=='__main__':main()
