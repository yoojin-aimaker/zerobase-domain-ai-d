"""Align companion pages with the current D-group handoff contract."""
from pathlib import Path
import re
ROOT=Path(__file__).resolve().parents[1]
D=ROOT/'dist'
VERSION='20261112-week1'

def main():
 p=D/'syllabus.html';t=p.read_text();start=t.index('<main class="syllabus">');end=t.index('</main>',start)
 body='''<main class="syllabus"><div class="label">제로베이스 도메인별 AI 역량 강화 프로그램 / D그룹</div><h1>내 직무의 문제를<br>AI 포트폴리오 한 건으로</h1><p>패션과 뷰티 MD, 생활가전 제품디자인, HR과 경영지원의 개인 과제를 4주 동안 발전시킵니다. 합성 예시는 수업용이며 실제 업무의 불편과 효과는 따로 확인합니다.</p><div class="summary"><p><strong>4주 뒤 남기는 것</strong><br>직무 프로젝트 포트폴리오 1건, 실제 실행과 검증 기록, 내 판단과 수정 전후, 5분 발표와 면접 90초 답변.</p></div>
<section><h2>일정과 도구</h2><p>캘린더 등록: 2026년 11월 19일, 26일, 12월 3일, 10일 목요일 오후 8시. 종료 시각과 제출 마감은 운영 공지로 확인합니다. 12월 10일은 포트폴리오 완성 제안 목표일입니다.</p><p>ChatGPT, Claude, Gemini 등 사용 가능한 채팅 도구에서 파일이나 본문을 읽힐 수 있는지 확인합니다. 특정 유료 구독, Projects와 Code는 필수 조건이 아닙니다.</p><p>공통 설명 뒤 세 사람의 개별 과제와 판단을 리뷰합니다. 비슷한 직무끼리 묶인 집단 과제를 전제로 하지 않습니다.</p></section>
<section><div class="label">WEEK 01 / 문제와 작업 기준</div><h2>내 직무에서 어떤 결정을 도울까요?</h2><p>JD나 경험에서 업무 장면을 고르고, 원문 근거와 사용자 불편 가설을 구분합니다. AI와 규칙, 사람이 할 일을 나누고 정상 1건과 예외 1건의 기대 행동을 계획합니다.</p><p><strong>실습:</strong> JD에서 근거와 과제 세 줄 → 코치의 세 질문 → 지침 초안에서 한 문장 직접 수정.</p><p><strong>숙제:</strong> AI작업지침서 MD와 같은 내용의 HTML 또는 PDF. 실제 실행은 선택입니다.</p><p><strong>다음 준비:</strong> 최신 지침서, 원문 ID와 출처, 확인할 질문 1개.</p><p><a href="week1_deck.html">1주차 강의</a> / <a href="week1-lab.html">직무별 코치와 예시</a> / <a href="workbook.html">워크북</a></p></section>
<section><div class="label">WEEK 02 / 설계와 기대 기준</div><h2>같은 지침서를 실행 가능한 설계로</h2><p>지난주 문서를 수정하고 PRD로 첫 처리와 완료 범위를 정합니다. 입력 → AI 초안 → 사람 검수와 보류의 업무 순서를 그립니다.</p><p><strong>숙제:</strong> 수정 지침서, PRD와 업무 순서도, 정상 2건과 예외 2건의 기대 행동. 순서도는 Markdown, PDF 또는 HTML 중 선택합니다. 작은 PoC는 선택 실험입니다.</p><p><strong>다음 준비:</strong> 위 설계와 실제 입력, 기대표를 분리해 보관. 결과 예시와 기대표는 첫 실행에 첨부하지 않습니다.</p><p><a href="week2_deck.html">2주차 강의</a> / <a href="role-lab.html">입력과 검수 자료</a></p></section>
<section><div class="label">WEEK 03 / 실행과 검증</div><h2>실제 응답을 원문과 대조합니다</h2><p>같은 지침과 입력으로 직무 결과물 초안을 만듭니다. 사람이 채택, 수정과 보류를 정하고 정상 2건과 예외 2건을 검증합니다.</p><p><strong>숙제:</strong> 직무 결과물 초안, 실제 실행 기록과 검증표 4건, 실패 또는 한계 2건, 수정 전후와 발표 구성 초안. 코딩과 여러 Agent는 선택입니다.</p><p><strong>다음 준비:</strong> 원문 근거와 실제 결과, 내가 수정한 이유와 아직 남은 한계.</p><p><a href="week3/index.html">3주차 강의</a></p></section>
<section><div class="label">WEEK 04 / 설명과 완성</div><h2>내 판단을 포트폴리오로 설명합니다</h2><p>문제 → 선택 이유 → AI 역할 → 내 판단 → 실제 결과 → 검증과 한계 → 직무 연결로 정리합니다. 동료와 멘토의 질문을 반영합니다.</p><p><strong>최종 제출:</strong> 포트폴리오 1건을 PDF, PPT 또는 HTML 중 선택. 5분 발표와 면접 90초 답변을 준비합니다. 라이브 데모, 웹사이트 배포와 MCP는 선택 심화입니다.</p><p><a href="week4_deck.html">4주차 강의</a></p></section>
<section><h2>직무별 결과물</h2><ul><li><strong>MD:</strong> 리뷰 근거표와 상품 개선 제안. 개선 우선순위를 고른 이유.</li><li><strong>제품디자인:</strong> 사용 관찰 근거, 요구사항, 대안 스케치 2개와 선택과 기각 이유.</li><li><strong>HR:</strong> 가상 온보딩 안내의 누락 근거표, 확인 질문과 안내 초안. 첫 회차 관심 업무 확인 후 주제 확정.</li></ul><p>도구를 쓴 사실보다 원문 근거와 내가 한 판단을 보여줍니다. 가상 과제의 결과를 현업 성과로 쓰지 않습니다.</p></section>
<section><h2>제출과 인계</h2><p>제출 위치와 상세 마감은 D그룹 채널 공지로 확인합니다. 확인되지 않은 관리 시트나 폴더를 전제로 안내하지 않습니다.</p><p><a href="submission.html">공통 제출 안내</a> / <a href="course-flow.html">4주 흐름과 파일 연결</a> / <a href="course-handoff.md" download>인계 기준 받기</a></p></section><p class="copyright">Copyright © 이유진 / YUJIN FLOW</p>'''
 p.write_text(t[:start]+body+t[end:])
 p=D/'index.html';t=p.read_text()
 if 'course-flow.html' not in t:t=t.replace('<section class="section"><h2>4주 흐름</h2>','<section class="section"><h2>4주 흐름</h2><p><a href="course-flow.html">각 회차의 실습, 숙제와 다음 준비물 연결 보기 →</a></p>')
 t=t.replace('<h3>1주차 워크북</h3>','<h3>1주차 직무별 워크북</h3>')
 if 'week1-lab.html' not in t:t=t.replace('<section class="section"><h2>직무별 입력과 검수 자료</h2><div class="grid">','<section class="section"><h2>직무별 입력과 검수 자료</h2><div class="grid"><a class="card" href="week1-lab.html"><h3>1주차 코치와 지침 양식</h3><p>MD, 제품디자인, HR의 근거와 검수 계획부터 시작</p></a>')
 p.write_text(t)
 p=D/'d-group-links.js';t=p.read_text().replace("b.textContent='D그룹 맞춤 실습'","b.textContent='4주 흐름'").replace("prefix+'role-lab.html#homework'","prefix+'course-flow.html'");p.write_text(t)
 p=D/'submission.html';t=p.read_text();t=t.replace('수정 지침서 + 업무 순서도 + 정상 2건과 예외 2건의 기대 결과','수정 지침서 + PRD + 업무 순서도 + 정상 2건과 예외 2건의 기대 결과')
 if 'course-flow.html' not in t:t=t.replace('</section>','<p><a href="course-flow.html">같은 프로젝트를 다음 회차로 이어가는 방법 →</a></p></section>')
 p.write_text(t)
 p=D/'workbook.html';t=p.read_text()
 t=t.replace('<b>폴더 공유</b><p>내 드라이브에 두 파일을 올리고 <strong>lee.yoojin.work@gmail.com</strong>을 편집자로 초대하세요.</p>','<b>열람 권한 확인</b><p>안내된 제출 위치에 파일이나 링크를 준비하고 멘토가 읽을 수 있는 권한을 확인합니다.</p>')
 t=t.replace('<b>관리 시트에 기록</b><p><a href="submission.html" target="_blank" rel="noopener">제출 관리 시트 ↗</a>의 1주차 본인 행에 폴더 링크와 제출일을 적습니다.</p>','<b>D그룹 공지 확인</b><p>제출 위치와 상세 마감은 운영 공지로 확인합니다. <a href="submission.html">공통 제출 안내 →</a></p>')
 p.write_text(t)
 p=D/'d-group.html';t=p.read_text().replace('PRD, 워크플로우','PRD, 워크플로우').replace('1주차 준비물','1주차 준비물').replace('희망 직무와 목표를 바탕으로 만든 수업 제안입니다.','희망 직무와 목표를 바탕으로 만든 수업 제안입니다.')
 if 'week1-lab.html' not in t:t=t.replace('<section class="section" id="homework">','<section class="section"><h2>회차별 실습 연결</h2><p><a href="week1-lab.html">1주차 코치와 작성 양식</a> / <a href="role-lab.html">2주차와 3주차 실행 자료</a> / <a href="course-flow.html">4주 전체 인계 기준</a></p></section><section class="section" id="homework">')
 t=t.replace('정상 입력 2개, 예외 입력 2개','정상 입력 2개, 예외 입력 2개')
 p.write_text(t)
 # Align unchanged requests in week two with the basic document path.
 p=D/'week2_deck.html';t=p.read_text().replace('4. CLAUDE.md 지침서 만들기','4. 내 작업 지침서 보완').replace('WORKFLOW.html','WORKFLOW.md')
 t=t.replace('담당, 인계와 CLAUDE.md','담당, 인계와 최신 작업 지침서')
 for ident in [45,46,47,48,49,50]:
  pattern=r'(<article\b[^>]*id="slide-'+str(ident)+r'".*?</article>)'
  t=re.sub(pattern,lambda m:m.group(1).replace('WEEK 2 / 5.', 'WEEK 2 / 선택 PoC / 5.'),t,flags=re.S)
 p.write_text(t)
 # Make the canonical design deliverable explicit throughout the public kit.
 for rid in ['md','product','hr']:
  p=D/'role-kits'/rid/'README.md';t=p.read_text()
  if 'week1-handoff.md' not in t:t+='\n## 1주차에서 이어 오기\n\nweek1-coach.md와 week1-template.md로 같은 프로젝트를 시작합니다. week1-handoff.md에 회차별 인계와 파일명 기준이 있습니다. 2주차 설계에는 PRD를 포함합니다.\n'
  p.write_text(t)
  folder=p.parent
  with __import__('zipfile').ZipFile(D/'role-kits'/f'{rid}-practice-kit.zip','w',__import__('zipfile').ZIP_DEFLATED) as z:
   for f in sorted(folder.iterdir()):z.write(f,arcname=rid+'/'+f.name)
 # Shared supplementary pages use the same role path.
 p=D/'week1-details.html';t=p.read_text()
 start=t.index('<section id="projects">');end=t.index('</section>',start)+10
 section='''<section id="projects"><div class="eyebrow">06 / GROUP D PROJECT IDEAS</div><h2>세 직무의 작은 프로젝트</h2><p>아래는 수업용 합성 과제 제안입니다. 실제 기업의 공식 과제나 도입 사례가 아닙니다.</p><div class="grid"><div class="card"><h3>MD / 상품기획</h3><p>리뷰 근거에서 상품 개선 후보를 고르고 선택 이유를 남깁니다.</p><a href="week1-lab.html#md">1주차 자료 →</a></div><div class="card"><h3>제품디자인</h3><p>사용 관찰과 해석을 구분하고 요구사항에서 설계 대안을 비교합니다.</p><a href="week1-lab.html#product">1주차 자료 →</a></div><div class="card"><h3>HR / 경영지원</h3><p>가상 기준과 안내의 누락을 점검합니다. 관심 업무 확인 후 범위를 정합니다.</p><a href="week1-lab.html#hr">1주차 자료 →</a></div></div><p><a href="course-flow.html">4주 흐름과 공통 제출 기준 →</a></p></section>'''
 p.write_text(t[:start]+section+t[end:])
 t=p.read_text().replace('과제 코치.md를 내 Claude 프로젝트 지식에 넣습니다.','내 직무의 코치와 원문을 사용 가능한 채팅에 전달합니다. Projects는 선택입니다.').replace('제출 폴더 링크를 시트의 본인 행에 기록합니다.','제출 위치는 D그룹 운영 공지로 확인합니다.').replace('href="assets/demo/과제 코치.md" download','href="week1-lab.html"').replace('과제 코치.md 받기</a>','직무별 코치와 양식 보기</a>')
 p.write_text(t)
 p=D/'role-lab.html';t=p.read_text()
 if 'course-flow.html' not in t:t=t.replace('<section class="section" id="homework">','<section class="section"><h2>지난주 자료에서 이어가기</h2><p><a href="week1-lab.html">1주차 코치와 지침 양식</a> / <a href="course-flow.html">같은 지침을 4주 동안 발전시키는 방법</a></p></section><section class="section" id="homework">')
 t=t.replace('수정 지침서, 업무 순서도, 정상 2건','수정 지침서, PRD와 업무 순서도, 정상 2건');p.write_text(t)
 p=D/'course-homework.md';p.write_text(p.read_text().replace('수정 지침서, 업무 순서도, 정상 2건','수정 지침서, PRD와 업무 순서도, 정상 2건'))
 for name in ['week2_deck.html','week3/index.html']:
  p=D/name;t=p.read_text();t=re.sub(r'(src="(?:\.\./)?(?:role-course|role-course-data|d-group-links)\.js)(?:\?[^\"]*)?"',r'\1?v='+VERSION+'"',t);p.write_text(t)
 # A final-format description must not make a live prototype mandatory.
 p=D/'week4_deck.html';p.write_text(p.read_text().replace('발표는 프로젝트 설명 약 5분과 핵심 기능 시연을 중심으로 진행','발표는 약 5분의 프로젝트 설명과 실제 결과 중심 / 라이브 시연은 선택'))
 print('Aligned syllabus, submissions, companion resources and week-two preparation.')

if __name__=='__main__':main()
