window.redesignLecture = function () {
  if (!document.body.dataset.week?.startsWith('1주차') || document.body.dataset.workbook) return;
  document.body.classList.add('ppt-redesign');
  if (window.prepareTheorySlides) window.prepareTheorySlides();
  if (window.prepareFocusSlides) window.prepareFocusSlides();
  if (window.prepareMarketSlides) window.prepareMarketSlides();
  const esc = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
  const tile = (n,h,p) => `<section class="ppt-point"><span class="point-no">${n}</span><h4>${h}</h4><p>${p}</p></section>`;
  const note = s => `<div class="ppt-conclusion"><span>KEY TAKEAWAY</span><p>${s}</p></div>`;
  const panels = (items, cls='') => `<div class="ppt-points ${cls}">${items.map((x,i)=>tile(String(i+1).padStart(2,'0'),x[0],x[1])).join('')}</div>`;
  const header = (tag,h,desc='') => `<header class="ppt-heading"><div class="ppt-label">${tag}</div><h3>${h}</h3>${desc?`<p>${desc}</p>`:''}</header>`;
  const custom = {
    '오프닝': ['cover', 'AI MENTORING / GROUP D / WEEK 01', '경험에서<br>증명할 역량 찾기', `<div class="cover-editorial"><div class="cover-message"><p class="cover-deck-title">AI 시대에 합격하는<br>실무형 AI 포트폴리오 만들기</p><p class="cover-description">내 직무의 문제를 찾고,<br>AI를 활용한 판단과 증거를 남깁니다.</p><div class="cover-meta">도메인별 AI 역량 강화 프로그램 / D그룹<br>이유진 / AX 컨설턴트</div></div><div class="cover-path"><span class="path-caption">오늘의 도착점</span><strong>경험</strong><div class="path-connector">↓</div><strong>직무 문제</strong><div class="path-connector">↓</div><strong class="path-end">AI 작업 지침서.md</strong></div></div>`],
    '오늘의 60분': ['agenda','TODAY / LEARNING JOURNEY','오늘, 이 두 가지를 가져갑니다',`<div class="learning-route"><section><span class="learning-part">PART 01 / AI 리터러시</span><h4>AI를 업무에 쓰는<br>판단 기준</h4><div class="learning-questions"><p><span>01</span>어떤 일에 활용할까?</p><p><span>02</span>어떻게 요청할까?</p><p><span>03</span>어디까지 믿고 쓸까?</p></div><div class="learning-output"><span>남기는 것</span><strong>요청과 검수 기준</strong></div></section><div class="learning-arrow">→</div><section><span class="learning-part">PART 02 / 내 직무의 문제 정의</span><h4>작게 시작하는<br>내 프로젝트</h4><div class="learning-questions"><p><span>01</span>누구의 어떤 불편일까?</p><p><span>02</span>처음 무엇 하나를 만들까?</p><p><span>03</span>어떤 역량을 보여줄까?</p></div><div class="learning-output"><span>남기는 것</span><strong>프로젝트 브리프 한 장</strong></div></section></div><div class="learning-caption">강사 설명과 시연 → 개인 실습 → 대표 사례 리뷰<span>5분 영상과 휴식 뒤 내 프로젝트에 적용</span></div>`],
    '좋은 AI 프로젝트': ['compare','PORTFOLIO / WHAT TO SHOW','기능을 넘어 판단이 보이게',`<div class="ppt-comparison"><section><span class="comparison-tag">도구와 기능만 설명하면</span><h4>“Claude로 챗봇을<br>만들었습니다.”</h4><p>리뷰 요약, 웹사이트 제작, API 연결.<br>무엇을 만들었는지만 남습니다.</p></section><section><span class="comparison-tag">문제 해결 과정까지 설명하면</span><h4>“반복 문의를 분석하고<br>검수 기준을 정했습니다.”</h4><p>문제 확인 → 적용 판단 → 실행 → 수정.<br>내가 내린 결정과 근거가 보입니다.</p></section></div><div class="evidence-strip"><b>문제 <span>누구의 어떤 불편인가</span></b><b>판단 <span>왜 AI에 맡겼는가</span></b><b>증거 <span>무엇을 검수하고 고쳤는가</span></b></div>${note('오늘은 무엇을 증명할지 먼저 정합니다.')}`],
    '내 경험 진단': ['levels','START WHERE YOU ARE','지금의 경험에서 시작합니다',panels([['초안을 받아봤다면','원래 요청 → AI 초안 → 내가 고친 부분<br><br>오늘 할 일<br>초안을 직무 업무 한 장면에 연결합니다.'],['업무에 적용해봤다면','문서, 시트, 자동화, HTML 결과물<br><br>오늘 할 일<br>입력과 출력, 재현 과정과 전후 시간을 남깁니다.'],['도구를 연결해봤다면','API, 배포, 에이전트 구조<br><br>오늘 할 일<br>실행 조건, 중단 조건, 실패 처리와 로그를 정리합니다.']],'three')+note('모두 같은 질문으로 문제와 근거를 완성합니다. 경험에 맞춰 실행 범위를 고릅니다.')],
    '세 질문': ['questions','METHOD / THREE QUESTIONS','좋은 시작은 세 가지 질문',`<div class="question-stack"><div><span>01</span><b>누구를 위해 만들까요?</b><p>사용자의 직무와 업무 상황</p></div><div><span>02</span><b>지금 무엇이 불편할까요?</b><p>시간, 비용, 누락, 반복과 불확실성</p></div><div><span>03</span><b>무엇 하나만 되면 도움이 될까요?</b><p>한 번의 입력과 한 가지 결과</p></div></div>${note('아이디어가 먼저 떠올랐다면, 사용자의 업무 장면과 불편으로 다시 좁혀봅니다.')}`],
    '직무와 산업 연결': ['process','JOB POSTING → PROJECT','공고의 동사를 업무 문제로 바꿉니다',panels([['공고','분석, 운영, 개선, 제안<br>반복되는 동사를 찾습니다.'],['장면','누가, 언제, 어떤 자료로<br>어떤 행동을 하나요?'],['문제','시간 지연, 누락, 판단 어려움<br>한 가지 불편으로 좁힙니다.'],['증거','입력, 판단 근거, 결과와<br>검증 기록을 남깁니다.']],'four process-line')+`<div class="project-translation"><span>마케팅 예시</span><p>고객 데이터 분석과 캠페인 운영 <b>→</b> 리뷰의 불편 유형 분류 <b>→</b> 콘텐츠 우선순위 판단표</p></div><p class="ppt-small">영업은 제안 근거, 데이터는 누락 탐지, PM은 요청 우선순위로 연결할 수 있습니다. 산업별 규정, 보안 기준과 현장 조건도 확인합니다.</p>`],
    '지원 직무 연결': ['career','CAREER / MAKE IT VISIBLE','이 결과로 어떤 역량을 보여줄까요?',`<div class="career-statement"><span>“리뷰 요약 서비스를 만들었다”에서</span><strong>고객 불편을 분류하고<br>콘텐츠 우선순위를 정한 판단으로.</strong></div><div class="evidence-strip"><b>입력 <span>공고 3건과 리뷰 20건<br>출처와 수집 날짜</span></b><b>판단 <span>반복 빈도, 고객 영향<br>해결 가능성과 채택 이유</span></b><b>증거 <span>우선순위 판단표<br>검수와 수정 기록</span></b></div>${note('공고의 업무 동사 → 실제 업무 장면 → 내 프로젝트로 확인할 수 있는 증거')}`],
    'AI 역할 선택': ['levels','AI ROLE / CHOOSE YOUR SCOPE','업무에 필요한 수준을 고릅니다',panels([['제작 보조','자료 정리, 초안, 코드와 화면 개선<br><br>내가 최종 판단하면서 결과물을 빠르게 만듭니다.'],['제품 안의 AI 기능','요약, 분류, 검색과 추천<br><br>사용자가 결과물 안에서 반복적으로 활용합니다.'],['에이전트 확장','여러 단계와 도구를 조건에 따라 연결<br><br>자동 실행의 이득과 검증 비용을 비교합니다.']],'three')+note('반복 빈도, 판단 난이도, 오류 비용, 개인정보와 검수 가능성을 함께 봅니다.')],
    '쉬는 시간': ['break','BREAK / 5 MINUTES','잠깐, 눈과 몸을 쉬어갑니다',`<div class="break-layout"><div><div class="break-clock" id="break-clock">05:00</div><div class="timer-controls"><button id="timer-toggle">타이머 시작</button><button id="timer-reset">다시 5분</button></div></div><div class="break-note"><span>선택 챌린지</span><p>내 직무에서 반복되는 일<br><strong>하나만 떠올려보세요.</strong></p><small>휴식 뒤에는 그 일에서 문제를 찾습니다.</small></div></div>`],
    '개인 실습': ['practice','PRACTICE / 25 MINUTES','내 프로젝트 브리프를 작성합니다',`<div class="practice-heading"><strong>25<span>MIN</span></strong><p>지금까지 배운 질문을<br>내 직무의 업무 하나에 적용합니다.</p></div>`+panels([['5분 / 장면','직무와 실제 업무 장면을 적습니다.'],['7분 / 문제','사용자와 불편을 구체화합니다.'],['8분 / 범위','첫 작업과 AI, 사람의 역할을 정합니다.'],['5분 / 검증','검증 방법과 다음 행동을 적습니다.']],'four')+note('다음 장의 작성 양식을 사용합니다. 강사가 대표 사례를 함께 리뷰합니다.')],
    '1주차 숙제': ['homework','HOMEWORK / WEEK 01','프로젝트 브리프 한 장',`<div class="homework-layout"><div class="homework-summary"><span class="homework-count">01</span><h4>내 직무의 문제 하나를<br>실행 가능한 과제로.</h4><p>해본 AI 경험 또는 만들고 싶은 결과물에서 출발해 범위를 좁힙니다.</p><span class="next-week">NEXT / 다음 시간에 브리프 리뷰</span></div><div class="brief-paper"><div class="paper-top">PROJECT BRIEF <span>WEEK 01</span></div><ol><li>목표 직무와 산업</li><li>사용자와 업무 장면</li><li>문제 근거와 첫 작업</li><li>AI를 쓰는 이유와 사람의 역할</li><li>검증 방법</li><li>참고 공고 또는 자료 1~2건</li></ol><p>AI 입력과 출력, 내가 고친 부분,<br>막힌 지점도 함께 기록합니다.</p></div></div>`]
  };
  const prompts = {
    '공고 검색 요청':['리서치 요청','지원 직무와 실제 자료를 채운 뒤 요청합니다.','출처와 날짜를 확인하고, 찾지 못한 내용은 가설로 남깁니다.'],
    '프롬프트 실습 요청':['복사해서 실습','다음 장의 합성 문의 5건과 함께 전달합니다.','값이 없는 항목을 만들어내지 않는지 확인합니다.'],
    '문의 샘플 5건':['수업용 합성 자료','정상, 누락, 변경 요청을 포함한 문의입니다.','다음 장에서 정답 근거와 비교합니다.'],
    '오류 수정 요청':['다시 요청하기','어느 결과가 왜 틀렸는지 짚어줍니다.','수정 후 나머지 항목까지 망가지지 않았는지 확인합니다.'],
    '검증 기록 양식':['검증 기록','동일한 조건에서 기대 결과와 실제 결과를 비교합니다.','검수 시간과 실패도 함께 남깁니다.'],
    '문제 후보 비교 요청':['범위 좁히기','사용 가능한 자료와 경험을 먼저 채웁니다.','실행 가능성과 검증 가능성으로 하나를 고릅니다.'],
    '브리프 작성 양식':['내 문서에 작성','빈칸을 내 직무의 업무 장면으로 채웁니다.','확인하지 않은 내용은 가설로 표시합니다.']
  };
  const flowTitles=new Set(['현업 복귀 로드맵','AI 공부와 역량','30분 공부 루틴','도구 선택','검증 실습 순서','세 질문 작성 예시','내 업무의 Agent 구조']);
  const matrixTitles=new Set(['AI 역량의 증거','정확도 검증','샘플 검수 기준','도구 비교표','요청과 Workflow와 Agent']);
  const slides=[...document.querySelectorAll('.slide')];
  slides.forEach((s,i)=>{
    const title=s.dataset.title;
    const heading=s.querySelector('h3,h2')?.innerHTML || title;
    const intro=s.querySelector(':scope > .intro')?.innerHTML || '';
    let kind='editorial', label='WORK & AI / WEEK 01', body='', h=heading;
    if(window.THEORY_SCENES?.[title]){[kind,label,h,body]=window.THEORY_SCENES[title];}
    else if(custom[title]){[kind,label,h,body]=custom[title];}
    else if(s.querySelector('pre')){
      kind='prompt';label='LIVE PRACTICE / TRY IT';
      const pre=s.querySelector('pre');const guide=prompts[title]||['실습 요청','내 업무의 자료로 바꿔 사용합니다.','출력과 원문을 대조합니다.'];
      body=`<div class="prompt-layout"><div class="prompt-window"><div class="prompt-toolbar"><span>${esc(guide[0])}</span><button class="copy-prompt">요청 복사</button></div><pre>${esc(pre.textContent)}</pre></div><aside class="prompt-guide"><span>01 / 실행</span><p>${guide[1]}</p><span>02 / 확인</span><p>${guide[2]}</p></aside></div>`;
    } else if(title==='강사 소개') {
      kind='instructor'; label='YOUR INSTRUCTOR';h='현업의 문제를<br>실행하는 경험으로';
      const cards=[...s.querySelectorAll('.lecture-card')];
      body=`<div class="instructor-layout"><div class="instructor-name"><span>이유진</span><strong>YUJIN<br>FLOW</strong><p>AX 컨설턴트<br>AI 서비스 기획 강사</p></div><div class="instructor-history">${cards.map(c=>`<section><h4>${c.querySelector('h4').textContent}</h4><p>${c.querySelector('p').innerHTML}</p></section>`).join('')}</div></div>`;
    } else {
      const cards=[...s.querySelectorAll('.lecture-card,.card')];
      const take=s.querySelector('.lecture-takeaway,.quote');
      const source=s.querySelector('.source-note');
      if(cards.length){
        kind=title.startsWith('직무 프로젝트')?'case':title==='요청 비교'?'compare':flowTitles.has(title)?'process':matrixTitles.has(title)?'matrix':'editorial';
        const entries=cards.map(c=>[c.querySelector('h4')?.innerHTML||'', [...c.querySelectorAll('p')].map(p=>p.innerHTML).join('<br>')]);
        if(kind==='case'){
          label='PROJECT EXAMPLES / 직무별 학습용 재구성';
          h=({'직무 프로젝트 1':'영업과 마케팅 / 놓친 조건을 찾아내는 AI','직무 프로젝트 2':'품질과 SCM / 기록을 점검하는 AI','직무 프로젝트 3':'데이터와 HR / 근거를 정리하는 AI','직무 프로젝트 4':'PM과 개발 / 실행을 돕는 AI'})[title];
          body=`<div class="case-pair">${entries.map((x,j)=>`<section><div class="case-index">CASE ${String((Number(title.match(/\d/)[0])-1)*2+j+1).padStart(2,'0')}</div><h4>${x[0]}</h4><div class="case-details">${x[1].split('<br>').filter(Boolean).map(line=>{const a=line.indexOf(':');return a>0?`<div><b>${line.slice(0,a).replace('이번 범위에서 제외','제외 범위')}</b><p>${line.slice(a+1)}</p></div>`:`<p>${line}</p>`;}).join('')}</div></section>`).join('')}</div>`;
        }else if(kind==='compare'){
          body=`<div class="ppt-comparison">${entries.map((x,j)=>`<section><span class="comparison-tag">${j?'업무 기준을 전달한 요청':'조건이 빠진 요청'}</span><h4>${x[0]}</h4><p>${x[1]}</p></section>`).join('')}</div>`;
        }else{
          body=panels(entries,`${entries.length===2?'two':entries.length===3?'three':entries.length===4?'four':'six'} ${kind==='process'?'process-line':''}`);
        }
        if(take)body+=note(take.innerHTML);
        if(source)body+=`<div class="ppt-source">${source.innerHTML}</div>`;
      }else{
        kind='practice'; const paragraphs=[...s.querySelectorAll('.workshop-copy p')];
        body=`<div class="instruction-list">${paragraphs.map((p,j)=>`<div><span>${String(j+1).padStart(2,'0')}</span><p>${p.innerHTML}</p></div>`).join('')}</div>`;
      }
    }
    if(title==='오늘의 60분') s.dataset.title='오늘의 학습 흐름';
    const structured=window.structureLectureBody?.(title,body);
    if(structured){body=structured.body;if(structured.name)s.dataset.template=structured.name;}
    s.className=`slide ppt-slide ppt-${kind}`;
    s.innerHTML=header(label,h,kind==='editorial'?intro:'')+`<div class="ppt-body">${body}</div><div class="ppt-slide-footer"><span>ZEROBASE / AI MENTORING / GROUP D</span><span>${String(i+1).padStart(2,'0')} / ${slides.length}</span></div>`;
    s.querySelectorAll('.copy-prompt').forEach(b=>b.onclick=async()=>{try{await navigator.clipboard.writeText(b.closest('.prompt-window,.research-prompt').querySelector('pre').textContent);b.textContent='복사 완료';setTimeout(()=>b.textContent='요청 복사',1600);}catch{b.textContent='텍스트를 선택해 복사하세요';}});
  });
  const controls=document.querySelector('.top-actions');
  const toggle=document.createElement('button');toggle.className='presentation-toggle';toggle.textContent='목차 접기';toggle.setAttribute('aria-expanded','true');toggle.onclick=()=>{let hidden=document.body.classList.toggle('toc-hidden');toggle.textContent=hidden?'목차 펼치기':'목차 접기';toggle.setAttribute('aria-expanded',String(!hidden));};controls.prepend(toggle);
  const fs=document.createElement('button');fs.textContent='전체 화면';fs.onclick=async()=>{if(document.fullscreenElement){await document.exitFullscreen();}else{document.body.classList.add('toc-hidden');toggle.textContent='목차 펼치기';toggle.setAttribute('aria-expanded','false');await document.documentElement.requestFullscreen();}};controls.append(fs);
  document.addEventListener('fullscreenchange',()=>fs.textContent=document.fullscreenElement?'전체 화면 종료':'전체 화면');
};
