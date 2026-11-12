(() => {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach(node => {
    node.nodeValue = node.nodeValue.replace(/AI Career Portfolio/g, '');
  });
  const week = document.body.dataset.week || '';
  const weekNumber = document.body.dataset.workbook ? 0 : Number(week.match(/([1-4])주차/)?.[1] || 0);
  if (weekNumber === 1) {
    document.querySelector('.deck-meta h1').innerHTML = '경험에서<br>증명할 역량 찾기';
    document.querySelector('.deck-meta p').textContent = '희망 산업의 문제를 고르고, AI 설계와 검증을 취업 포트폴리오로 연결합니다.';
    const workbookButton = document.createElement('button');
    workbookButton.textContent = '1주차 워크북';
    workbookButton.onclick = () => { location.href = 'workbook.html'; };
    document.querySelector('.top-actions').append(workbookButton);
  }
  const lockedWeeks = new Set([]);
  if (lockedWeeks.has(weekNumber)) {
    document.body.classList.add('is-locked');
    document.querySelector('.app').innerHTML = `<main class="locked-page"><div class="locked-mark">YF</div><div class="eyebrow">YUJIN FLOW / COMING SOON</div><h1>${weekNumber}주차 자료는<br>추후 오픈됩니다</h1><p>현재는 1주차 자료를 먼저 확인해주세요.<br>오픈 일정에 맞춰 이 페이지에서 바로 확인할 수 있습니다.</p><div class="locked-actions"><a href="index.html">전체 주차로 돌아가기</a><a href="week1_deck.html">1주차 먼저 보기</a></div><small>Copyright © 이유진 / YUJIN FLOW</small></main>`;
    return;
  }
  const extraByWeek = {
    1: {
      agenda: ['1주차 / 문제 정의와 페인포인트 발굴', '00:00–00:06 시작과 채용시장', '00:06–00:19 희망 산업과 직무 분석, JD 역추출', '00:19–00:26 AI 공부법과 케이스 스터디', '00:26–00:33 AI 이해와 요청 설계', '00:33–00:46 내 문제와 판단 기준 좁히기', '00:46–00:47 포트폴리오와 숙제 안내', '00:47–01:00 내 프로젝트에서 코치 MD와 숙제 시작'],
      challenge: ['쉬는 시간 10분 챌린지', '관심 공고에서 반복되는 동사 3개를 찾고, 내가 해결할 업무 장면 한 줄을 적습니다.', '영상 슬롯: 공고 읽는 법 또는 직무 인터뷰 영상 링크를 이 자리에 붙여 넣으세요.'],
      practice: ['개인 워크북 실습 25분', '5분: 직무와 업무 장면 / 7분: 사용자와 불편 / 8분: 첫 기능과 역할 / 5분: 검증과 다음 행동', '누구를 위해 만들까요? 무엇이 불편할까요? 처음에는 무엇 하나만 되면 도움이 될까요?', '<a href="workbook.html">워크북 예시와 복사 양식 열기</a>. 발표는 선택이며 강사가 대표 사례를 리뷰합니다.'],
      submit: ['제출물 1개: 프로젝트 브리프 PDF 또는 문서', '필수 칸: 목표 직무와 산업, 사용자, 문제 근거, 첫 기능, AI를 쓰는 이유, 검증 방법', '파일명 예시: 1주차_이름_프로젝트브리프']
    },
    2: {
      agenda: ['2주차 / 프로젝트 결과 공유와 접근 방식 비교', '00:00–00:05 지난주 문제와 판단 기준 확인', '00:05–00:20 직무 그룹 안에서 각자 결과와 질문 공유', '00:20–00:35 서로 다른 문제 해결 방식 비교', '00:35–00:50 개인 프로젝트 범위와 다음 실행 코칭', '00:50–01:00 수정할 기준과 다음 주 작업 정리'],
      challenge: ['쉬는 시간 10분 챌린지', '내 아이디어에서 꼭 필요한 기능 1개와 빼도 되는 기능 2개를 표시합니다.', '영상 슬롯: 좋은 MVP 사례 또는 요구사항 작성 영상 링크를 이 자리에 붙여 넣으세요.'],
      practice: ['개인 실습 40분', '사용자 흐름을 시작, 핵심 행동, 결과 화면 3칸으로 그립니다.', 'AI가 틀렸을 때 확인할 검수 기준을 정상 입력과 예외 입력으로 나눠 적습니다.'],
      submit: ['제출물 1개: 수정 브리프와 검수표', '필수 칸: AI 역할과 사람 역할, 핵심 기능, 정상 입력 2개, 예외 입력 2개, 기대 결과', '파일명 예시: 2주차_이름_요구사항검수표']
    },
    3: {
      agenda: ['3주차 / 바이브 코딩으로 MVP 만들기', '00:00–00:05 과제 범위와 실행 목표 확인', '00:05–00:15 Claude로 첫 화면과 기능 시연', '00:15–00:40 각자 핵심 기능 구현과 실행', '00:40–00:52 직무별 확장 아이디어 코칭', '00:52–01:00 실행 결과와 다음 수정 기록'],
      challenge: ['쉬는 시간 10분 챌린지', '완성 화면에서 사용자가 막힐 지점 1개와 꼭 확인할 예외 입력 1개를 예측합니다.', '영상 슬롯: 바이브 코딩 작업 흐름 또는 사용자 테스트 영상 링크를 이 자리에 붙여 넣으세요.'],
      practice: ['개인 실습 40분', '정상 입력 2개와 예외 입력 2개를 실행하고 결과를 캡처합니다.', '작동하지 않은 부분을 숨기지 말고 원인, 수정, 남은 한계로 기록합니다.'],
      submit: ['제출물 1개: 실행 가능한 MVP와 검증 기록', '필수 칸: 링크 또는 HTML, 실행 화면 3장, 정상과 예외 결과, 실패 2건, 수정 전후', '파일명 예시: 3주차_이름_MVP링크와검증표']
    },
    4: {
      agenda: ['4주차 / 최종 발표와 개인 피드백', '00:00–00:05 미니 해커톤 안내와 심사 기준', '00:05–00:35 프로젝트 발표와 심사', '00:35–00:50 개인별 피드백과 다음 개선점', '00:50–01:00 최종 제출물과 취업 활용 정리'],
      challenge: ['쉬는 시간 10분 챌린지', '내 프로젝트를 30초 안에 설명하는 문장을 쓰고, 기술보다 문제와 판단을 먼저 말합니다.', '영상 슬롯: PM 또는 직무 면접 답변 영상 링크를 이 자리에 붙여 넣으세요.'],
      practice: ['최종 실습 40분', '문제, AI 적용 이유, 실행 화면, 검증과 수정, 한계, 직무 연결 순서로 포트폴리오를 점검합니다.', '마지막에는 자소서 문단과 면접 90초 답변까지 연결합니다.'],
      submit: ['최종 제출물: 포트폴리오 패키지', '필수 칸: 포트폴리오 링크 또는 HTML, 자소서 1문단, 이력서 문장 2개, 면접 90초 답변', '파일명 예시: 4주차_이름_AI프로젝트포트폴리오']
    }
  };
  const extra = extraByWeek[weekNumber];
  if (extra) {
    const originalSlides = [...document.querySelectorAll('.slide')];
    const makeSlide = (title, kicker, heading, body) => {
      const article = document.createElement('article');
      article.className = 'slide workshop-slide';
      article.dataset.title = title;
      article.innerHTML = `<div class="eyebrow">${kicker}</div><h3>${heading}</h3><div class="workshop-copy">${body.map(item => `<p>${item}</p>`).join('')}</div>`;
      return article;
    };
    const agendaSlide = makeSlide('오늘의 60분', 'TODAY / 60 MINUTES', extra.agenda[0], extra.agenda.slice(1));
    originalSlides[0].after(agendaSlide);
    if (weekNumber === 1) {
      const instructorSlide = document.createElement('article');
      instructorSlide.className = 'slide lecture-slide';
      instructorSlide.dataset.title = '강사 소개';
      instructorSlide.innerHTML = `<div class="eyebrow">INSTRUCTOR / YUJIN FLOW</div><h3>이유진 / AX 컨설턴트</h3><p class="intro">직무의 실제 업무를 AI 실습으로 바꾸고, 실행과 검증을 결과물로 남기는 교육을 합니다.</p><div class="lecture-grid"><div class="lecture-card"><h4>기업 실무 교육</h4><p>삼성전자서비스<br>생성형 AI 업무 활용과 현업 프로젝트 실습, 36시간<br><br>KB국민은행<br>신입사원 AI 업무 자동화 실습, 16시간</p></div><div class="lecture-card"><h4>병원과 공공기관</h4><p>분당서울대학교병원<br>문서 프롬프트와 자료 정리<br><br>한국생산기술연구원 KITECH<br>기술 리서치와 연구행정 자동화<br><br>한국전력기술<br>AI 업무 자동화 실습</p></div><div class="lecture-card"><h4>멘토링과 심사</h4><p>2026 SK AI 해커톤<br>심사와 현장 컨설팅<br><br>카카오뱅크 FIN:NECT<br>핀테크 강연과 BM 컨설팅<br><br>광화문 라이언즈<br>직장인 AX 실무 멘토링</p></div></div><div class="lecture-takeaway">이번 수업에서는 각자의 직무 문제를 고르고, AI 결과를 검수한 판단까지 포트폴리오로 연결합니다.</div>`;
      originalSlides[0].after(instructorSlide);
      const literacy = [
        ['현업 AI 읽기','업무의 어느 부분이 바뀌었는가', '문서 검색과 초안 작성, 데이터 점검과 설명, 코드와 화면 제작처럼 업무 장면으로 나눠 봅니다. 도입 발표만으로 실제 성과를 판단하지 않습니다.', '제조 사례: Siemens와 thyssenkrupp의 Industrial Copilot은 엔지니어 지원 사례입니다. 이 사례를 공정 판정의 완전 자동화로 해석하지 않습니다.', '공백기 후 복귀 준비: 최근 공고 3개와 기업 공식 사례 2개에서 업무, 자료, 산출물, 사람 승인 지점을 기록합니다. 기존 경험 중 다시 활용할 역량을 표시합니다.', '출처: <a href="https://news.microsoft.com/source/emea/features/how-ai-is-helping-siemens-and-thyssenkrupp-bridge-skilling-gaps-in-manufacturing/" target="_blank" rel="noopener">Microsoft 공식 제조 사례</a>'],
        ['AI 공부와 역량','같은 업무를 반복하며 기준을 만듭니다','학습 순서: 업무 하나 선택 → 샘플 준비 → 요청 → 원문 대조 → 수정 → 새 자료로 재실행. 매번 도구를 바꾸기보다 무엇이 틀렸고 왜 고쳤는지 기록합니다.','하루 30분 연습: 자료 준비 5분, 요청 10분, 검수 10분, 기록 5분. 끝나면 입력과 출력 1쌍, 수정 이유, 실패 1건이 남아야 합니다.','기업 역량을 찾는 법: 지원 공고의 동사, 사용하는 자료, 담당자가 내리는 판단, 최종 산출물을 읽습니다. 해당 업무를 수행하고 검증한 증거로 연결합니다. 회사별 요구 수준은 공고로 확인합니다.','WEF 2025 보고서는 AI와 빅데이터 역량의 중요도 상승과 분석적 사고의 중요성을 함께 다룹니다. 국내 특정 회사의 채용 기준으로 일반화하지 않습니다. <a href="https://www.weforum.org/publications/the-future-of-jobs-report-2025/in-full/3-skills-outlook/" target="_blank" rel="noopener">출처 보기</a>'],
        ['프롬프트와 토큰','좋은 명령은 업무 기준을 전달합니다','요청의 여섯 칸: 목표, 입력 자료, 판단 기준, 출력 형식, 제외할 행동, 모르면 처리할 방식. 역할 이름만 붙이기보다 실제 자료와 통과 기준을 알려줍니다.','예시: 첨부 영문 문의에서 품목, 수량, 납기를 추출해 표로 보여줘. 각 항목의 원문 문장을 붙이고 없는 항목은 확인 필요로 표시해. 납기나 가격을 추정하지 마. 답변 발송은 하지 마.','토큰은 입력과 출력의 처리 단위입니다. 관련 문단만 보내고 출력 칸과 길이를 정합니다. 수정할 때는 바뀐 요구와 관련 자료를 전달합니다. 긴 대화는 목적, 결정, 자료 버전을 요약해 새 대화로 이어갑니다.','채팅 구독의 사용 제한과 API의 토큰 요금은 다릅니다. 필요한 근거를 삭제하면서까지 짧게 만들지는 않습니다. <a href="https://ai.google.dev/gemini-api/docs/tokens" target="_blank" rel="noopener">Google 토큰 설명</a> / <a href="https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/prompt-templates-and-variables" target="_blank" rel="noopener">Claude 요청 가이드</a>'],
        ['도구 선택','회사 승인과 업무 조건부터 확인합니다','Claude, Codex, Gemini라는 이름만으로 분야별 정답을 정하지 않습니다. 회사의 승인 도구, 자료 반출 기준, 필요한 문서와 코드 환경, 연동 가능성을 먼저 확인합니다.','비교 순서: 같은 샘플 5건 → 같은 요청 → 같은 정답 기준. 출처 일치, 누락, 실패, 검수 시간, 최종 수정량을 기록하고 내 업무에 맞는 도구를 고릅니다.','문서 분석이면 원문 추적, 코드 수정이면 테스트와 변경 범위, 협업 자료면 접근 권한과 연동을 확인합니다. 모델과 요금제별 기능은 사용 시점에 다시 확인합니다.','실습: 현재 사용할 수 있는 도구 하나로 시작하고, 실패 원인이 자료인지 요청인지 기능인지 구분합니다. 비교를 위한 추가 유료 구독은 과제로 요구하지 않습니다.'],
        ['정확도 검증','믿을 범위와 멈출 조건을 정합니다','정확도가 중요한 제조와 반도체 업무는 공개 문서의 근거 검색, 보고서 필수 항목 누락 점검, 설명 초안부터 시작합니다. 계산과 기준 판정은 코드나 시트로 확인하고 최종 판단은 담당자가 합니다.','강사 시연: 정상 자료, 필수 항목 누락, 서로 모순되는 수치, 원문에 없는 질문을 차례로 넣습니다. 정답뿐 아니라 답하지 말아야 할 때 멈추는지도 확인합니다.','검수표: 입력 / 기대 결과 / 실제 결과 / 원문 근거 / 통과 여부 / 사람 수정 / 걸린 시간. AI가 자신 있게 말해도 신뢰도 점수로 받아들이지 않습니다.','프로젝트는 통과 건수, 누락과 오탐, 사람 검수 시간을 함께 보여줍니다. 5건 연습을 모든 업무에서 정확하다는 증거로 쓰지 않습니다. <a href="https://www.nist.gov/itl/ai-risk-management-framework" target="_blank" rel="noopener">NIST 검증과 신뢰성 가이드</a>'],
        ['만들어볼 프로젝트','직무의 작은 판단을 결과물로 만듭니다','해외영업: 합성 영문 문의의 수량과 납기 추출 → 누락 표시 → 담당자 승인. 증거는 항목 정답표와 검수 시간입니다.','반도체와 제조: 합성 불량 기록의 필수 항목 누락 점검 또는 공개 공정 문서 근거 검색. 원인 확정과 안전 판정은 범위에서 제외합니다.','SCM: 합성 재고와 리드타임을 코드로 계산하고 결품 위험의 근거와 조치 후보를 설명. HR: 합성 답안의 루브릭 근거를 찾아 1차 의견을 제시하고 사람이 확정합니다.','마케팅: 브랜드 가이드 위반 카피 검수 또는 리뷰 이슈 분류. 데이터: 공개 CSV 품질 점검. PM: VOC 우선순위 근거 비교. 공통 결과는 입력, 기준, 결과, 사람 판단, 실패 기록입니다.']
      ];
      let anchor = agendaSlide;
      const cards = (items) => `<div class="lecture-grid">${items.map(([label, text]) => `<div class="lecture-card"><h4>${label}</h4><p>${text}</p></div>`).join('')}</div>`;
      const presentations = [
        ['현업 AI 읽기', 'AI는 업무의 어느 부분에 들어갈까요?', cards([['검색과 정리','문서 근거 찾기, 문의 항목 추출'],['초안과 제작','답변 초안, 보고서, 코드와 화면'],['점검과 판단 보조','누락 표시, 비교표, 우선순위 후보']]) + '<div class="lecture-takeaway">실제 업무에서 자료 → 결과 → 사람 승인 지점을 찾습니다.</div><p class="source-note">제조 사례 참고: <a href="https://news.microsoft.com/source/emea/features/how-ai-is-helping-siemens-and-thyssenkrupp-bridge-skilling-gaps-in-manufacturing/">Microsoft 공식 사례</a>. 엔지니어 지원 사례를 공정 판정 자동화로 해석하지 않습니다.</p>'],
        ['AI 공부와 역량','30분 연습을 직무 증거로 남깁니다',cards([['5분 / 준비','내 업무 하나와 샘플 자료 선택'],['10분 / 실행','목표와 기준을 전달해 결과 생성'],['10분 / 검수','원문 대조와 오류 수정'],['5분 / 기록','입력, 결과, 고친 이유 보관']]) + '<div class="lecture-takeaway">완료 기준: 결과 하나 + 내가 고친 이유 + 실패 한 건</div>'],
        ['프롬프트 설계','좋은 요청에는 여섯 가지가 있습니다',cards([['목표','누구의 어떤 일을 도울까?'],['입력','어떤 자료를 읽어야 할까?'],['판단 기준','무엇이 맞는 결과일까?'],['출력 형식','어떤 칸과 순서로 보여줄까?'],['제외할 행동','추정하거나 실행하면 안 되는 일은?'],['모를 때','확인 필요 표시 또는 질문']]) + '<div class="lecture-takeaway">연습: “분석해줘”에 빠진 조건 세 가지를 찾아봅니다.</div>'],
        ['요청 비교','같은 문의, 다른 요청', '<div class="compare-grid"><div class="lecture-card"><span class="example-label">모호한 요청</span><h4>이 메일 분석하고 답장 써줘</h4><p>항목, 근거, 누락 처리 기준이 없습니다.</p></div><div class="lecture-card good"><span class="example-label">업무 기준이 있는 요청</span><h4>품목, 수량, 납기를 표로 추출</h4><p>원문 문장 첨부<br>없는 항목은 확인 필요<br>가격과 납기는 추정 금지<br>발송 전 담당자 검토</p></div></div><div class="lecture-takeaway">좋은 요청을 쓴 뒤에도 원문 검수는 필요합니다.</div>'],
        ['토큰과 효율','필요한 맥락을 골라 전달합니다',cards([['토큰','입력과 출력의 처리 단위'],['입력 줄이기','관련 문단, 자료 버전, 바뀐 요구 전달'],['출력 정하기','표의 칸과 필요한 분량 지정'],['대화 이어가기','목적, 결정, 남은 일을 요약해 새 대화']]) + '<div class="lecture-takeaway">근거를 삭제해 짧게 만들기보다 불필요한 반복을 줄입니다.</div><p class="source-note">채팅 구독의 제한과 API 토큰 요금은 다릅니다. <a href="https://ai.google.dev/gemini-api/docs/tokens">Google 공식 토큰 설명</a></p>'],
        ['도구 선택','회사 승인 → 업무 조건 → 같은 샘플 비교',cards([['사용 가능한가?','승인 도구와 데이터 반출 정책'],['업무에 맞는가?','문서, 코드, 연동과 권한'],['검수 비용은?','출처 일치, 누락, 수정량, 시간']]) + '<div class="lecture-takeaway">Claude, Codex, Gemini의 선호는 해당 회사의 공고와 정책으로 확인합니다.</div>'],
        ['정확도 검증','맞힌 답과 멈춘 답을 함께 봅니다',cards([['정상 자료','기대 결과와 원문 근거 비교'],['누락 자료','없는 값을 만들어내는지 확인'],['모순 자료','충돌을 표시하고 사람에게 전달'],['근거 없는 질문','답하지 않고 확인 필요로 처리']]) + '<div class="lecture-takeaway">계산은 코드와 시트로 검증하고 최종 판단은 사람이 합니다.</div><p class="source-note">학습용 5건을 전체 정확도로 일반화하지 않습니다. <a href="https://www.nist.gov/itl/ai-risk-management-framework">NIST 참고</a></p>'],
        ['만들어볼 프로젝트','직무의 작은 문제 하나부터',cards([['해외영업','영문 문의의 조건 추출과 누락 표시'],['반도체와 제조','기록 필수 항목 점검과 문서 근거 검색'],['SCM','재고 계산과 결품 위험 설명'],['HR','합성 답안의 루브릭 근거와 1차 의견'],['마케팅','브랜드 가이드 위반 카피 점검'],['데이터와 PM','CSV 품질 점검 또는 VOC 우선순위']]) + '<div class="lecture-takeaway">공개 또는 합성 자료로 시작하고 사람의 판단과 검증을 남깁니다.</div>']
      ];
      presentations.forEach(([title, heading, content]) => { const slide = document.createElement('article'); slide.className = 'slide lecture-slide'; slide.dataset.title = title; slide.innerHTML = `<div class="eyebrow">AI LITERACY / FIRST HOUR</div><h3>${heading}</h3>${content}`; anchor.after(slide); anchor = slide; });
      const rest = makeSlide('쉬는 시간', 'BREAK / 5 MINUTES', '영상과 함께 잠깐 쉽니다', ['25분부터 30분까지 짧은 AI 영상을 보고 화면에서 눈을 뗍니다.', '이후 내 직무의 문제를 좁히고 프로젝트 안에서 코치 MD를 실행합니다.']);
      anchor.after(rest);
    }
    const homework = originalSlides[originalSlides.length - 1];
    homework.before(makeSlide('개인 실습', 'PRACTICE / GUIDED ACTIVITY', extra.practice[0], extra.practice.slice(1)));
    homework.before(makeSlide('중간 실습과 제출', 'SUBMIT / BEFORE NEXT WEEK', extra.submit[0], extra.submit.slice(1)));
  }
  if (weekNumber === 1) {
    const tails = new Map();
    (window.WEEK1_EXPLANATIONS || []).forEach(item => {
      const anchor = tails.get(item.after) || [...document.querySelectorAll('.slide')].find(slide => slide.dataset.title === item.after);
      if (!anchor) return;
      const slide = document.createElement('article');
      slide.className = 'slide lecture-slide expanded-slide';
      slide.dataset.title = item.title;
      slide.innerHTML = `<div class="eyebrow">YUJIN FLOW / WORK & AI</div><h3>${item.heading}</h3>${item.content}`;
      anchor.after(slide);
      tails.set(item.after, slide);
    });
  }
  if (window.redesignLecture) window.redesignLecture();
  const slides = [...document.querySelectorAll('.slide')];
  const stage = document.querySelector('.stage');
  slides.forEach((slide, i) => { slide.dataset.slide = `${i + 1} / ${slides.length}`; slide.dataset.scroll = String(Boolean(document.body.dataset.workbook)); });
  const list = document.querySelector('.slide-list');
  const prev = document.querySelector('#prev');
  const next = document.querySelector('#next');
  const counter = document.querySelector('#counter');
  const chapters = new Map(weekNumber === 1 && window.WEEK1_CHAPTERS || [
    ['오프닝', '시작과 채용시장'],
    ['프로젝트에서 지원서까지', '희망 산업과 직무 분석'],
    ['AI로 해결한 현업 사례', '현업 문제 발견과 범위 선정'],
    ['문제를 데이터 열로 바꾸기', '데이터 준비와 AI 설계'],
    ['강사 시연 시작', '실행과 검증의 증거'],
    ['최종 산출물 묶음', '취업 포트폴리오로 정리'],
    ['Claude 웹 실습 경로', '이번 주 숙제']
  ]);
  let chapter = 0, chapterItem = 0, chapterItems = list;
  const homeworkNames={'Claude 웹 실습 경로':'숙제 진행 순서','Projects로 맥락 관리':'프로젝트에 기준 넣기','과제 코치로 시작':'코치와 주제 정하기','지침서 작성 양식':'내 지침서 MD 작성','Claude 웹에 파일 첨부':'첨부 자료 읽기 확인','MD를 HTML로 변환':'HTML 파일 저장','HTML 제출 전 점검':'두 파일 확인과 제출','처음 시작하는 사람의 Q&A':'막히는 지점 Q&A'};
  const links = slides.map((slide, i) => {
    const chapterTitle = weekNumber === 1 && chapters.get(slide.dataset.title);
    const subsectionTitle = weekNumber === 1 && window.WEEK1_NAV_SUBSECTIONS?.[slide.dataset.title];
    if (chapterTitle || subsectionTitle) {
      if (chapterTitle) { chapter++; chapterItem = 0; }
      const group = document.createElement('details');
      group.className = 'toc-chapter';
      const heading = document.createElement('summary');
      heading.className = 'toc-section';
      heading.textContent = `${chapter}. ${chapterTitle || subsectionTitle}`;
      chapterItems = document.createElement('div');
      chapterItems.className = 'toc-items';
      group.append(heading, chapterItems);
      list.append(group);
    }
    if (!slide.dataset.outline) chapterItem++;
    const outline = slide.dataset.outline || (weekNumber === 1 ? `${chapter}-${chapterItem}` : String(i + 1).padStart(2, '0'));
    const button = document.createElement('button');
    button.className = 'slide-link';
    button.innerHTML = `<span class="slide-number">${outline}</span><span class="slide-name">${(weekNumber===1 && (window.WEEK1_NAV_LABELS?.[slide.dataset.title] || homeworkNames[slide.dataset.title])) || slide.dataset.title || slide.querySelector('h3,h2')?.textContent || ''}</span>`;
    button.onclick = () => show(i);
    chapterItems.append(button);
    return button;
  });
  let current = Math.max(0, Math.min(slides.length - 1, Number(location.hash.match(/slide-(\d+)/)?.[1] || 1) - 1));
  function show(index) {
    current = Math.max(0, Math.min(slides.length - 1, index));
    slides.forEach((slide, i) => slide.classList.toggle('active', i === current));
    links.forEach((link, i) => { link.classList.toggle('active', i === current); link.setAttribute('aria-current', i === current ? 'page' : 'false'); });
    const activeChapter = links[current].closest('.toc-chapter');
    if (activeChapter) activeChapter.open = true;
    list.querySelectorAll('.toc-chapter').forEach(group => group.classList.toggle('has-current', group === activeChapter));
    counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    prev.disabled = current === 0; next.disabled = current === slides.length - 1;
    history.replaceState(null, '', `#slide-${current + 1}`);
    document.title = `${document.body.dataset.week || '강의'} ${current + 1} / ${slides[current].dataset.title || ''}`;
    stage.scrollTop = 0;
    fitSlide();
    links[current].scrollIntoView({block: 'nearest'});
    window.dispatchEvent(new CustomEvent('lecture-slide-change', {detail:{title:slides[current].dataset.title}}));
  }
  function fitSlide() {
    const slide = slides[current];
    const detail = slide.dataset.scroll === 'true';
    stage.classList.toggle('detail-mode', detail);
    slide.style.width = detail ? '' : '1280px';
    slide.style.transform = '';
    if (!detail) {
      const scale = Math.min(1, (stage.clientWidth - 32) / slide.offsetWidth, (stage.clientHeight - 32) / slide.offsetHeight);
      slide.style.transform = `translate(-50%, -50%) scale(${Math.max(.1, scale)})`;
    }
  }
  new ResizeObserver(fitSlide).observe(stage);
  document.fonts.ready.then(fitSlide);
  function move(direction) {
    let index=current+direction;
    if(slides[current].dataset.reference!=='true'){
      while(slides[index]?.dataset.reference==='true')index+=direction;
    }
    show(index);
  }
  prev.onclick = () => move(-1); next.onclick = () => move(1);
  document.addEventListener('keydown', e => { if (document.querySelector('dialog[open]') || e.target.closest('input,textarea,[contenteditable="true"]')) return; if (e.key === 'ArrowRight' || e.key === 'PageDown') move(1); if (e.key === 'ArrowLeft' || e.key === 'PageUp') move(-1); if (e.key === 'Home') show(0); if (e.key === 'End') show(slides.length - 1); });
  window.addEventListener('hashchange', () => show(Number(location.hash.match(/slide-(\d+)/)?.[1] || 1) - 1));
  show(current);
})();
