/* Final Week 1 composition. Stable keys preserve tips and instructor notes. */
(() => {
  const scene=(tag,title,body)=>['research',tag,title,body];
  const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
  const note=t=>`<div class="strategy-takeaway">${t}</div>`;
  const chain=items=>`<div class="strategy-chain">${items.map((a,i)=>`${i?'<i aria-hidden="true">→</i>':''}<section><span>${a[0]}</span><h4>${a[1]}</h4><p>${a[2]}</p></section>`).join('')}</div>`;
  const prompt=t=>`<div class="research-prompt" data-keep-layout><pre>${esc(t)}</pre><button class="copy-prompt">요청 복사</button></div>`;
  const link=(url,label)=>`<a href="${url}" target="_blank" rel="noopener">${label} ↗</a>`;
  const jd=(role,name,url,level,quote,read,candidate,evidence)=>`<section class="journey-jd"><div class="journey-jd-title"><span>${role}</span><h4>${link(url,name)}</h4><small>${level}</small></div><blockquote>“${quote}”</blockquote><dl><div><dt>원문에서 읽을 것</dt><dd>${read}</dd></div><div><dt>작게 해볼 과제</dt><dd>${candidate}</dd></div><div><dt>남길 증거</dt><dd>${evidence}</dd></div></dl></section>`;
  const scenes={
    'AI 정의와 발전 지도':scene('AI OVERVIEW / BEFORE THE LLM','AI는 무엇이고, 어떻게 여기까지 왔나요?',`<div class="journey-ai-definition"><b>AI = Artificial Intelligence / 인공지능</b><p>컴퓨터가 학습, 인식, 예측과 생성 같은 지적 과제를 수행하게 하는 기술.</p></div><svg class="journey-ai-history" viewBox="0 0 1120 304" role="img" aria-labelledby="ai-history-title ai-history-desc" data-keep-layout><title id="ai-history-title">AI 발전의 대표 전환점 지도</title><desc id="ai-history-desc">1956년 다트머스 연구회의, 2012년 AlexNet의 이미지 분류 성과, 2017년 Transformer, 2022년 ChatGPT 공개, 2024년 GPT-4o의 멀티모달. 1956년과 2012년 사이의 구간은 생략했고, 이후 위치는 연도 간격을 반영한다.</desc><g fill="none" stroke="var(--ds-line-strong)" stroke-width="2"><path d="M100 152H232M280 152H1000"/><path d="M240 160L248 144M256 160L264 144"/><path d="M100 152V112M400 152V196M600 152V112M800 152V196M880 152V112"/></g><g fill="var(--ds-line-strong)"><circle cx="100" cy="152" r="6"/><circle cx="400" cy="152" r="6"/><circle cx="600" cy="152" r="6"/></g><g fill="var(--ds-accent)"><circle cx="800" cy="152" r="8"/><circle cx="880" cy="152" r="8"/></g><g class="journey-ai-event" text-anchor="middle"><g transform="translate(100 0)"><text y="32" class="journey-ai-year">1956</text><text y="64" class="journey-ai-name">연구 분야 정립</text><text y="92">다트머스 연구회의</text></g><g transform="translate(400 0)"><text y="224" class="journey-ai-year">2012</text><text y="256" class="journey-ai-name">딥러닝의 도약</text><text y="284">AlexNet / 이미지 분류</text></g><g transform="translate(600 0)"><text y="32" class="journey-ai-year">2017</text><text y="64" class="journey-ai-name">Transformer</text><text y="92">Attention 기반 구조</text></g><g transform="translate(800 0)"><text y="224" class="journey-ai-year">2022</text><text y="256" class="journey-ai-name">대화형 생성 AI</text><text y="284">ChatGPT 공개</text></g><g transform="translate(880 0)"><text y="32" class="journey-ai-year">2024</text><text y="64" class="journey-ai-name">멀티모달</text><text y="92">GPT-4o / 글, 이미지, 음성</text></g></g><text x="256" y="184" text-anchor="middle" class="journey-ai-axis-note">구간 생략</text></svg><div class="journey-ai-history-takeaway"><span>발전을 뒷받침한 것</span><b>데이터 + GPU 연산 + 모델 구조의 발전</b><p>이 수업은 생성형 AI, 특히 대규모 언어 모델(LLM)을 다룹니다. 다음은 답변을 만드는 원리입니다.</p></div><p class="journey-ai-history-sources">${link('https://www.ibm.com/think/topics/artificial-intelligence','AI 정의 / IBM')}${link('https://home.dartmouth.edu/about/artificial-intelligence-ai-coined-dartmouth','1956 / Dartmouth')}${link('https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks','2012 / AlexNet')}${link('https://research.google/pubs/attention-is-all-you-need/','2017 / Transformer')}${link('https://openai.com/index/chatgpt/','2022 / ChatGPT')}${link('https://openai.com/index/hello-gpt-4o/','2024 / GPT-4o')}</p>`),
    'AI 커뮤니티와 오프라인 스터디':scene('LEARN / 03 / COMMUNITY','세 번째 공부법: AI 커뮤니티에 참여하기',`<p class="journey-community-lead">가입에서 한 걸음 더. <b>직접 이야기할수록 관심사가 넓어집니다.</b></p><div class="journey-community-flow" data-keep-layout><section><svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="20" r="9"/><path d="M16 53V46a16 16 0 0 1 32 0V53M48 16H60M54 10V22"/></svg><span>01 / JOIN</span><h4>커뮤니티 가입</h4><p>내 직무와 가까운 모임 한 곳.<br>다른 사람의 사례를 읽고<br><b>궁금한 질문 하나</b> 올리기.</p></section><i aria-hidden="true">→</i><section><svg viewBox="0 0 64 64" aria-hidden="true"><path d="M7 9H43V35H23L13 44V35H7ZM31 43H45L54 52V43H59V23H50M15 18H34M15 25H29"/></svg><span>02 / TALK</span><h4>스터디와 오프라인</h4><p>글 하나나 작은 결과물을 가져가<br>“왜 이 방식을 썼나요?” 묻고<br><b>내가 막힌 지점</b> 이야기하기.</p></section><i aria-hidden="true">→</i><section><svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="9"/><circle cx="11" cy="13" r="5"/><circle cx="53" cy="13" r="5"/><circle cx="11" cy="51" r="5"/><circle cx="53" cy="51" r="5"/><path d="M18 19L25 26M46 19L39 26M18 45L25 38M46 45L39 38"/></svg><span>03 / EXPAND</span><h4>관심사 넓히기</h4><p>내 직무 밖의 문제와 관점도 듣기.<br>새로 알게 된 주제를 읽고<br><b>내 과제에 작게 적용</b>하기.</p></section></div><div class="journey-community-result"><span>대화 후 남길 것</span><b>새로 알게 된 주제 1개 → 내 과제에서 해볼 실험 1개</b></div><p class="journey-community-bridge">함께 공부하며 생긴 질문을 이어서 풀어봅니다: AI는 무엇이고, 어떻게 발전했으며, 어떻게 답할까요?</p>`),
    '서비스 기획 PO 적용 응답':scene('CASE APPLY / SERVICE PLANNING + PO','서비스 기획 / PO라면 이렇게 물어봅니다',`<div class="journey-po-cli" data-keep-layout><aside><span>내 업무로 바꿔 질문</span><h4>VOC → 개선 후보<br>→ 우선순위 회의</h4><p>“서비스 기획 / PO인 내가<br>이 사례에서 가져갈<br>판단 기준은 무엇일까?”</p><div><b>제약 → 기준부터 정리</b><b>오류 → 원문과 중복 확인</b><b>사람 → 우선순위 결정</b></div><nav>${link('assets/research/po-codex-prompt.txt','질문 전체')}${link('assets/research/po-codex-response.txt','응답 원문')}</nav></aside><a class="journey-po-capture" href="po-cli-log.html" target="_blank" rel="noopener"><img src="assets/research/po-codex-cli-log-20261007.jpg" alt="서비스 기획 PO 업무에 배민 사례의 세 질문을 적용한 실제 Codex CLI 응답 원문. 사례 사실과 설계 가설을 구분한다."><span>클릭해서 크게 보기 ↗</span></a></div><p class="journey-po-caption">Codex CLI 실제 실행 / gpt-6-sol / 2026.10.07. 출력 원문을 웹 로그로 표시한 캡처입니다.<br>VOC 우선순위 회의는 수업용 가상 장면이며, 내 서비스의 데이터와 성과를 제공한 사례가 아닙니다.</p>`),
    '추천 테크블로그 리스트':scene('TECH BLOG / READING LIST','좋은 테크블로그, 여기서 찾아보세요',`<div class="journey-tech-gallery" data-keep-layout>${[
      ['woowahan','https://techblog.woowahan.com/','우아한형제들','검수와 현업 AI 전환','바뀌는 정책과 예외를 어떻게 다뤘을까?'],
      ['toss','https://toss.tech/','토스테크','모델 평가와 제품 실험','우리 업무에 맞는 모델은 어떻게 확인했을까?'],
      ['naver-d2','https://d2.naver.com/home','NAVER D2','검색과 추천, AI 엔지니어링','검색 품질과 실제 운영을 어떻게 연결했을까?'],
      ['kakao','https://tech.kakao.com/','카카오테크','컨텍스트 설계와 데이터 분석','에이전트가 쓸 자료와 맥락을 어떻게 준비했을까?']
    ].map(([id,url,name,topic,question])=>`<a class="journey-tech-card" href="${url}" target="_blank" rel="noopener"><img src="assets/techblogs/${id}-home-20261007.jpg" alt="${name} 실제 홈페이지 화면"><div><h4>${name} <span aria-hidden="true">↗</span></h4><b>${topic}</b><p>${question}</p></div></a>`).join('')}</div><div class="journey-tech-task"><span>한 편만 골라 읽기</span><b>문제 → 선택 이유 → 검증 기준</b><p>다음 배민 사례에서도 이 세 가지를 표시해봅니다.</p></div><p class="journey-tech-source">각 카드에서 공식 블로그로 이동합니다. 이미지: 실제 홈페이지 일부 / 2026.10.07 확인</p>`),
    'MD 파일의 뜻과 쓰는 이유':scene('GLOSSARY / MARKDOWN','MD 파일은 무엇이고, 왜 쓰나요?',`<p class="journey-md-definition"><b>.md = Markdown / 마크다운</b><span>기호로 제목, 목록과 강조를 표시하는 텍스트 문서의 확장자입니다.</span></p><div class="journey-md-example"><section><span>저장할 원본 / 내 지침서.md</span><pre># 내 AI 작업 지침서\n- 원문 근거를 확인한다.\n- 근거가 없으면 **보류**한다.</pre></section><i aria-hidden="true">→</i><section class="journey-md-preview"><span>기호를 해석해서 보여주면</span><h4>내 AI 작업 지침서</h4><ul><li>원문 근거를 확인한다.</li><li>근거가 없으면 <b>보류</b>한다.</li></ul></section></div><div class="journey-md-reasons"><span><b>읽기</b> 사람과 AI가 같은 기준 확인</span><span><b>고치기</b> 판단 기준을 문장으로 수정</span><span><b>다시 쓰기</b> 다음 대화에 최신 파일 첨부</span></div><div class="journey-md-role"><b>MD = 수정할 원본</b><i aria-hidden="true">→</i><b>HTML / PDF = 공유할 제출본</b></div><div class="journey-md-viewers"><nav aria-label="마크다운 미리 보기 도구"><b>보기 좋게 미리 보기</b>${link('https://markdownlivepreview.com/','Markdown Live Preview')}${link('https://dillinger.io/','Dillinger')}${link('https://stackedit.io/','StackEdit')}</nav><p class="journey-md-note">MD 본문을 붙여넣어 제목, 목록과 강조를 확인하세요. ${link('https://commonmark.org/help/','Markdown 기호 안내')}</p></div>`),
    'JD 실습 예시 영업과 데이터':scene('JD PRACTICE / SALES + DATA','어떤 공고로 시작하면 좋을까요?',`<div class="journey-jd-pair">${jd('영업','토스 / Sales Development Representative','https://toss.im/career/job-detail?job_id=7853432003','계약직 / 관련 경험 1년 미만 우대','광고주 컨텍스트와 다음 단계를 정리해요.','리드 분류 → 니즈 확인 → 담당자에게 전달','합성 문의 5건을 읽고 상담 준비표 만들기','분류 기준 + 누락한 정보 + 사람이 확인할 항목')}${jd('데이터','토스뱅크 / Data Analytics Specialist','https://toss.im/career/job-detail?job_id=7782783003','2년 이하 / 계약직 / SQL 활용 요구','분석 결과를 시각화하거나 대시보드를 운영해요.','요청 파악 → 데이터 정합성 검증 → 분석 제공','공개 표의 누락과 중복을 점검할 지침 만들기','필수 값 기준 + 오류 근거 + 재검수 기록')}</div><p class="journey-jd-note">2026.10.07 원문 확인 / 과제는 수업용 제안입니다. AI 필수 요건으로 읽지 않습니다.<br>해당 직무의 계약 형태, 경력과 필수 기술은 원문에서 확인합니다.</p>`),
    'JD 실습 예시 콘텐츠와 PO':scene('JD PRACTICE / CONTENT + PRODUCT','콘텐츠나 기획 직무라면 무엇을 뽑을까요?',`<div class="journey-jd-pair">${jd('콘텐츠','토스 / Brand Manager (Content)','https://toss.im/career/job-detail?job_id=7847465003','제작과 편집 5년 이상 / 업무 방향 참고','브랜드 콘텐츠를 기획하고 제작해요.','소재 발굴 → 콘텐츠 제작 → 직접 쓴 글과 기여 제시','공개 인터뷰에서 소재 후보와 근거를 정리','소재 선택 이유 + 초안에서 내가 고친 부분')}${jd('PO / 서비스 기획','토스 / Product Owner','https://toss.im/career/job-detail?company=%ED%86%A0%EC%8A%A4&job_id=4071413003','경력 직무 / 목표와 검증 과정 참고','제품의 핵심 지표를 정의하고 비즈니스 모델을 설계하며','고객 문제 정의 → 가설 → 실험과 검증','공개 VOC에서 한 문제와 확인할 지표 정리','문제 근거 + 가설 + 검증 계획')}</div><p class="journey-jd-note">2026.10.07 원문 확인 / 경력 공고는 직무가 하는 일을 읽는 자료입니다.<br>모든 요구를 이번 주에 구현하지 않습니다. 원문, 내 해석, 과제 후보를 구분해 적습니다.</p>`),
    'AI 공부를 시작하는 법':scene('LEARN / HOW I STUDIED','AI 공부는 어떻게 해야 하나요?<br>멘토님은 어떻게 늘리셨나요?',`<p class="journey-lead">제 공부법은 <b>읽기 → 따라 배우기 → 함께 이야기하기</b>입니다.</p>${chain([['01 / 사례','테크블로그 읽기','현업의 문제와 제약,<br>선택한 이유를 읽습니다.'],['02 / 습관','잘 쓰는 사람에게 배우기','되묻고 직접 확인하며<br>수정한 기준을 기록합니다.'],['03 / 대화','커뮤니티와 스터디','온라인에서 질문하고<br>오프라인에서 이야기를 나눕니다.']])}${note('<b>사례의 사고과정 + 직접 확인하는 습관 + 관심사를 넓히는 대화</b><br>먼저 테크블로그에서 문제, 선택 이유와 검증 기준을 가져옵니다.')}`),
    '테크블로그 학습 지도':scene('TECH BLOG / FIND A GOOD CASE','현업 사례는 어디서, 어떻게 읽으면 좋을까요?',`<div class="journey-blog-list"><section><span>검수 기준과 예외</span><div>${link('https://techblog.woowahan.com/20408/','우아한형제들 / 메뉴 이미지 품질 검수')}<p>정책이 바뀌고 데이터가 부족할 때 왜 이 방식을 골랐을까?</p></div></section><section><span>현업의 AI 전환</span><div>${link('https://techblog.woowahan.com/27640/','우아한형제들 / AI 전환과 현업 코칭')}<p>반복 업무를 어떤 단위로 나누고, 담당자와 기준을 맞췄을까?</p></div></section><section><span>팀의 학습과 실험</span><div>${link('https://toss.tech/article/ai-surf-day','토스 / AI Surf Day')}<p>개인의 도구 사용을 어떻게 팀의 업무 개선과 연결했을까?</p></div></section></div>${note('좋은 케이스: <b>문제의 근거 + 선택을 바꾼 제약 + 평가와 실패 기록</b>이 보이는 글.<br>글에 없는 성과나 판단은 추정하지 않습니다. 다음 사례에서 세 가지를 표시해봅니다.')}`),
    '프롬프트 기법 선택':scene('PROMPT BASICS / CHOOSE A TECHNIQUE','어떤 프롬프트 기법부터 쓰면 될까요?',`<p class="journey-technique-lead"><b>프롬프트 = AI에게 주는 요청과 조건.</b> 막힌 지점에 맞춰 기법을 고릅니다.</p><div class="journey-technique-grid" data-keep-layout><section><svg viewBox="0 0 64 64" aria-hidden="true"><path d="M12 8H44L52 16V56H12ZM44 8V16H52M20 28H44M20 36H44M20 44H36"/></svg><span>ZERO-SHOT</span><h4>직접 요청</h4><p>예시 없이 목표와 조건을 설명.<br><b>작업이 명확할 때</b> 시작합니다.</p><div class="journey-technique-example">“이 리뷰를 배송 / 사용 안내 /<br>기타로 분류하고 근거를 인용해줘.”</div></section><section><svg viewBox="0 0 64 64" aria-hidden="true"><path d="M8 12H28V32H8ZM36 12H56V32H36M8 44H48M42 38L48 44L42 50"/></svg><span>FEW-SHOT</span><h4>예시로 전달</h4><p>입력과 원하는 답의 짝을 제시.<br><b>분류 기준이 헷갈릴 때</b> 씁니다.</p><div class="journey-technique-example">“늦게 도착” → 배송<br>“조립이 어려움” → 사용 안내<br><small>새 입력: “연결 순서를 모르겠음”</small></div></section><section><svg viewBox="0 0 64 64" aria-hidden="true"><path d="M8 8H28V24H8ZM36 40H56V56H36M18 24V32H46V40M40 34L46 40L52 34"/></svg><span>PROMPT CHAINING</span><h4>단계로 나누기</h4><p>앞 결과를 확인하고 다음에 전달.<br><b>중간 검수가 필요할 때</b> 씁니다.</p><div class="journey-technique-example">분류 요청 → 원문 대조<br>→ 수정 요청 → 결과 확인<br><small>웹에서는 요청을 나눠 이어갑니다.</small></div></section></div><div class="journey-technique-bridge"><b>먼저 명확하게 → 필요하면 예시 → 확인하며 다음 단계</b><span>예시는 실제 규칙에 맞춰 고르고, 결과는 새 사례와 원문으로 확인합니다.</span></div><p class="journey-technique-source">${link('https://arxiv.org/abs/2005.14165','Zero-shot / Few-shot 원 논문')}${link('https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices#chain-complex-prompts','Claude 공식 / 예시와 Prompt chaining')}<span>리뷰 문장은 교육용 예시입니다. 다음은 요청문을 구조화하는 방법입니다.</span></p>`),
    '프롬프트 구조화':scene('PROMPT BASICS / STRUCTURED PROMPTING','목표, 자료와 출력 조건을 어떻게 구분하나요?',`<div class="journey-structured-prompt" data-keep-layout><aside><span>STRUCTURED PROMPTING</span><h4>구조화하기</h4><p>지시와 원문이 섞이지 않게<br><b>구역을 나눠 적는 방법.</b></p><dl><div><dt>목표</dt><dd>누구의 어떤 결정을 도울까?</dd></div><div><dt>자료</dt><dd>무엇을 근거로 읽을까?</dd></div><div><dt>출력과 검수</dt><dd>어떤 형식이면 쓸 수 있을까?</dd></div></dl><small>제목으로 나눠도 되고,<br>XML 태그로 경계를 표시해도 됩니다.</small></aside><section><span>CLAUDE 웹 / 그대로 바꿔 쓰기</span>${prompt('<목표>사용 안내가 필요한 VOC를 찾는다.</목표>\n<자료>[ID와 VOC 원문 붙여넣기]</자료>\n<출력조건>\nID / 분류 / 원문 인용 / 보류 이유를 표로 반환한다.\n없는 근거는 만들지 말고, 자료가 없으면 질문한다.\n</출력조건>')}</section></div><div class="journey-technique-bridge"><b>태그는 내용의 경계. 품질은 목표와 기준에서 나옵니다.</b><span>이제 모르는 조건을 질문하게 하고, 받은 답의 오류를 기준으로 고쳐봅니다.</span></div><p class="journey-technique-source">${link('https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices#structure-prompts-with-xml-tags','Claude 공식 / XML 구조화')}<span>공식 기법을 수업의 VOC 사례로 재구성했습니다. 같은 대화창에서 사용할 수 있습니다.</span></p>`),
    '꿀팁 필요한 정보부터 묻기':scene('PROMPT TIP / ASK BEFORE GUESSING','어떻게 요청해야 답이 내 업무에 맞아질까요?',`<div class="journey-prompt-pair"><section><span>01 / 모르면 질문하게</span><h4>막막할 때</h4>${prompt('내 희망 산업은 [산업], 직무는 [직무]야.\nJD 원문을 바탕으로 작은 AI 과제를 정하고 싶어.\n아직 결정하지 않은 조건은 추측하지 말고\n한 번에 질문 하나씩 해줘.\n내 답을 받기 전에는 과제를 확정하지 마.')}</section><section><span>02 / 결정 하나로 좁히기</span><h4>답이 너무 넓을 때</h4>${prompt('[사용자]가 [업무 장면]에서\n[결정 하나]를 할 수 있게 도와줘.\n자료는 [첨부 원문]만 사용해.\n결과는 [필수 열]의 표로 보여줘.\n자료에 없는 항목은 확인 필요로 남겨줘.')}</section></div>${note('역할 이름보다 <b>사용자, 실제 자료, 결정과 출력 조건</b>을 구체적으로 씁니다.<br>다음에는 받은 결과를 검수하고 재사용할 기준으로 바꿉니다.')}`),
    '꿀팁 결과에서 기준 뽑기':scene('PROMPT TIP / FROM OUTPUT TO RULE','받은 답이 마음에 안 들면 어떻게 고치나요?',`<div class="journey-prompt-pair"><section><span>03 / 오류를 짚기</span><h4>틀린 근거부터</h4>${prompt('[ID]의 [판단]이 원문 [인용]과 달라.\n[기준]에 따라 수정해줘.\n수정 전후와 이유를 남겨줘.\n다른 정상 항목도 같은 기준으로 대조해줘.\n내 선호와 사실 오류는 구분해줘.')}</section><section><span>04 / 기준을 재사용하기</span><h4>다음 답에도 적용</h4>${prompt('이번에 확정한 규칙을 지침서로 정리해줘.\n목적, 입력, 처리 순서, 출력 형식,\n검수와 보류 조건, 출처를 포함해줘.\n확인하지 않은 내용은 가설로 남겨줘.\n새 사례에 적용할 점검 항목도 적어줘.')}</section></div>${note('원하는 결과 B와 현재 결과 A의 차이를 보고 <b>근거 → 수정 → 규칙</b>을 남깁니다.<br>이제 내 과제의 문제와 판단 기준을 실제로 좁혀봅니다.')}`),
    '내 문제 좁히기 실습':scene('PRACTICE / 5 MINUTES','내 과제는 어디까지 하면 될까요?',`<div class="journey-practice-strip"><b>5분 메모</b><span>JD에서 고른 업무 하나를 가져오세요.</span></div>${chain([['1분 / 문제','누구의 어떤 불편?','[사용자]가 [장면]에서<br>[문제]를 겪는다.<br>근거 / 확인 필요를 구분.'],['2분 / 범위','입력과 결과 하나','받을 자료 → 처리 단계<br>→ 넘길 결과 하나.<br>AI와 사람의 역할 표시.'],['2분 / 기준','무엇으로 확인?','정상 1건 / 예외 1건<br>통과와 보류 조건.<br>내가 선택한 이유 한 줄.']])}${note('완료하면 옆 사람에게 설명: <b>“__를 개선하려고 __를 선택했고, __로 확인하겠습니다.”</b><br>아직 실행하지 않았다면 결과 수치 대신 검증 계획을 적습니다. 다음 코치 대화에서 이 메모를 전달하고 질문으로 보완합니다.')}`),
    'MD를 HTML로 변환':scene('SUBMIT / MARKDOWN → HTML OR PDF','MD를 PDF나 HTML로 어떻게 제출하나요?',`<div class="journey-export"><section><span>01 / 원본 저장</span><h4>내 지침서.md</h4><p>문제, 선택 이유, 입력과 작업 순서,<br>판단 기준, 검증 계획과 출처를 확정.</p>${prompt('확정한 내용을 AI 작업 지침서 MD로 정리해줘.\n가설과 확인 필요 표시는 유지해줘.\n1주차_이름_AI작업지침서.md 파일로 제공해줘.')}</section><section><span>02 / 제출 형식 선택</span><h4>HTML 또는 PDF</h4><p>HTML: Claude에서 생성하거나 워크북 저장.<br>PDF: 저장한 HTML 열기 → 인쇄 → PDF로 저장.</p>${prompt('첨부한 MD의 내용과 출처를 유지해\n외부 서버 없이 열리는 단일 HTML로 만들어줘.\n인쇄해도 글자가 잘리지 않게 구성해줘.\n1주차_이름_AI작업지침서.html 파일로 제공해줘.')}</section></div>${note('<b>MD 원본 + 같은 내용의 HTML 또는 PDF 중 하나</b>를 제출합니다.<br>파일 생성이 어렵다면 '+link('workbook.html','워크북')+'에 MD 본문을 붙여넣고 저장합니다.')}`),
    'HTML 제출 전 점검':scene('CHECK / EXPLAIN MY DECISIONS','무엇을 확인하면 숙제가 끝난 건가요?',chain([['01 / 내용','내 판단이 보이는가','문제 근거 / 선택 이유 / 판단 기준<br>검증 계획 / 출처가 들어 있는가?<br>가설을 성과처럼 쓰지 않았는가?'],['02 / 파일','두 문서가 같은가','MD와 HTML 또는 PDF 대조.<br>파일을 직접 열어<br>누락, 잘림과 빈칸 확인.'],['03 / 제출','강사가 열 수 있는가','두 파일을 제출 폴더에 올리고<br>안내된 강사 계정에 공유.<br>관리 시트에 링크와 제출일 기록.']])+note('제출: <b>1주차_이름_AI작업지침서.md + 같은 이름의 .html 또는 .pdf</b><br>사이트 배포 없이 Claude 웹에서 완료합니다. 다음 주에는 과제를 공유하고 보완합니다. 3주차에 MVP를 구현합니다.'))
  };
  scenes['MD 코치 실습 시작']=scene('CLASS PRACTICE / 01 / ATTACH','내 프로젝트에서 코치에게 시작을 요청합니다',`
<div class="clean-coach"><section><span>30초 / 시작</span><h4>프로젝트 안의 대화</h4><p>코치 파일과 지침을 넣은<br>내 프로젝트에서 시작합니다.</p><p class="clean-note">첫 답은 내 산업과 직무.<br>다음 질문에 하나씩 답합니다.</p></section><section><span>시작 요청 / 내 정보로 바꾸기</span>${prompt('프로젝트 지식의 과제 코치.md를 읽고 수업 모드로 시작해줘.\n내 희망 산업은 [산업], 직무는 [직무]야.\n[2-6 JD 근거와 6-2 내 메모 붙여넣기]\n한 번에 질문 하나씩 하고 내 답을 기다려줘.\n문제, 첫 범위, 검수 기준을 질문 최대 3개로 좁혀줘.\n이미 적은 내용은 반복해서 묻지 마.\n모르는 것은 확인 필요로 남겨줘.')}</section></div>
${note('<b>프로젝트 준비 2분 → 시작 30초 → 대화 5분 → 확인 1분</b><br>자료가 없다면 희망 직무와 업무 장면부터 말합니다. 코치 MD는 제출물과 구분합니다.')}`);
  scenes['MD 코치와 질문하기']=scene('CLASS PRACTICE / 02 / QUESTION + ANSWER','질문에 답하면서 내 문제를 좁힙니다',`
<div class="journey-practice-strip"><b>5분 대화</b><span>AI 질문 → 내 답 → 부족한 조건 확인. 세 질문은 예시입니다.</span></div>
<div class="coach-class-dialogue">${[
['01 / 문제','누가 언제 무엇 때문에 막히나요?','JD의 업무 하나와 불편을 답하기.','경험이나 원문 근거를 붙이고,<br>모르면 확인 필요로 남깁니다.'],
['02 / 첫 범위','처음에는 결과 하나만 만든다면?','입력 자료와 첫 결과 하나 고르기.','대안의 이유를 비교하고,<br>AI와 사람의 역할을 나눕니다.'],
['03 / 검수 기준','무엇이면 쓰고, 언제 보류하나요?','정상 조건과 예외 조건 답하기.','맞는 결과와 보류할 결과를<br>내 업무 언어로 설명합니다.']
].map(([n,q,a,b])=>`<section><span>${n}</span><small>AI가 묻기</small><h4>${q}</h4><div><small>내가 답하기</small><b>${a}</b><p>${b}</p></div></section>`).join('')}</div>
${note('<b>AI가 제안한 과제는 후보입니다. 내 답으로 선택하고, 선택 이유를 남깁니다.</b><br>막히면 “내 직무에 맞는 예시 두 개를 보여줘. 그중 내가 고를게”라고 요청하세요.')}`);
  scenes['내 문제 정의 확인']=scene('CLASS PRACTICE / 03 / MY PROBLEM DEFINITION','AI가 정리한 문제, 내 말로 설명할 수 있나요?',`
<div class="coach-class-summary"><section><span>마지막 요청</span>${prompt('지금까지 내 답을 문제 / 첫 범위 / 검수 기준으로 정리해줘.\n내가 답한 사실과 네가 제안한 가설을 구분해줘.\n선택 이유와 확인할 질문도 남겨줘.\n새 사실이나 성과는 추가하지 마.\n문제정의_초안.md로 저장할 본문을 제공해줘.')}</section><section><span>내가 읽고 고칠 세 줄</span><h4>문제</h4><p>[사용자]가 [장면]에서 [불편]을 겪는다.<br>근거: [원문 / 내 경험 / 확인 필요]</p><h4>첫 범위</h4><p>[입력]으로 [결과 하나]를 만든다.<br>이 방식을 고른 이유: [내 판단]</p><h4>검수 기준</h4><p>[통과 조건]이면 쓰고, [예외]면 보류한다.</p></section></div>
${note('<b>1분 / 한 문장을 직접 고친 뒤 옆 사람에게 설명하세요.</b><br>초안은 내 프로젝트에 추가하고 대화를 저장합니다. 숙제는 같은 대화에서 AI 작업 지침서 MD로 보완합니다.')}`);
  Object.assign(scenes,window.CONTEXT_SCENES||{});
  const groups=[
    ['시작과 채용시장',['오프닝','강사 소개','국내 AI 공고 변화','AI 비즈니스 가치의 세 방향','조직의 AX 접근','현업의 AI 활용상황','기업이 AI 인재를 찾는 이유','AI 인재의 직무별 역량','AI 인재의 일하는 관점']],
    ['희망 산업과 직무 분석',['많이 만들기보다 직무에 맞게','프로젝트에서 지원서까지','문제 선정 세부 질문','문제를 찾는 세 출발점','마케팅 JD 원문','희망 산업과 직무 좁히기','JD 역추출 요청','JD 실습 예시 영업과 데이터','JD 실습 예시 콘텐츠와 PO']],
    ['AI 공부와 케이스 스터디',['AI 공부를 시작하는 법','테크블로그 학습 지도','추천 테크블로그 리스트','AI로 해결한 현업 사례','케이스 스터디 사고 흐름','서비스 기획 PO 적용 응답','AI를 잘 쓰는 사람들','AI 커뮤니티와 오프라인 스터디']],
    ['AI 이해와 요청 설계',['AI 정의와 발전 지도','AI는 어떻게 답변을 만드는가','컨텍스트의 한계','대화 압축과 조건 누락','새 대화와 지침서로 맥락 관리','왜 AI를 선택했나','AI 적용 방식 선택','프로젝트 처리 흐름','검수와 중단 조건','모델을 고르는 기준','도구를 역할로 나누기','프롬프트 기법 선택','프롬프트 구조화','꿀팁 필요한 정보부터 묻기','꿀팁 결과에서 기준 뽑기']],
    ['내 문제와 판단 기준 좁히기 (심화)',['문제와 해결책의 차이','사실과 가설 구분','현재 업무 단계 나누기','자동화 후보 평가 프레임','문제 범위 줄이기','단계별 역할 배분']],
    ['이번 주 숙제',['Claude 웹 실습 경로','내 문제 좁히기 실습','Projects로 맥락 관리','과제 코치로 시작','지침서 작성 양식','Claude 웹에 파일 첨부','MD를 HTML로 변환','HTML 제출 전 점검','MD 파일의 뜻과 쓰는 이유','처음 시작하는 사람의 Q&A']]
  ];
  window.WEEK1_CHAPTERS=groups.map(([name,keys])=>[keys[0],name]);
  window.WEEK1_NAV_SUBSECTIONS={'검수와 중단 조건':'AI 이해와 요청 설계 (심화)'};
  window.WEEK1_NAV_LABELS={
    '오프닝':'프로그램 표지','국내 AI 공고 변화':'국내 AI 공고는 어떤가요?',
    'AI 비즈니스 가치의 세 방향':'AI로 늘리고 줄이는 것',
    '조직의 AX 접근':'조직은 AI를 어떻게 도입하나요?',
    '현업의 AI 활용상황':'기업 시스템에 연결된 AI','기업이 AI 인재를 찾는 이유':'어떤 AI 인재를 원하나요?',
    'AI 인재의 직무별 역량':'어떤 역량을 준비해야 하나요?',
    'AI 인재의 일하는 관점':'어떤 관점으로 일해야 하나요?',
    '문제 선정 세부 질문':'문제 선정 / 사용자, 장면, 불편',
    '프로젝트에서 지원서까지':'무엇을 할지 막막해요','많이 만들기보다 직무에 맞게':'많이 만들면 유리한가요?',
    '문제를 찾는 세 출발점':'어디서 시작하나요?','희망 산업과 직무 좁히기':'내 직무의 결정 찾기',
    '마케팅 JD 원문':'JD 원문에서 무엇을 읽죠?','JD 역추출 요청':'5분 실습 / JD 역추출',
    'JD 실습 예시 영업과 데이터':'JD 링크 / 영업과 데이터','JD 실습 예시 콘텐츠와 PO':'JD 링크 / 콘텐츠와 PO',
    'AI 공부를 시작하는 법':'멘토님은 어떻게 공부했나요?','테크블로그 학습 지도':'좋은 사례는 어디에 있나요?',
    '추천 테크블로그 리스트':'추천 테크블로그 리스트',
    '서비스 기획 PO 적용 응답':'서비스 기획 / PO로 질문하기',
    'AI를 잘 쓰는 사람들':'이들의 학습 습관 따라하기',
    'AI 커뮤니티와 오프라인 스터디':'커뮤니티와 오프라인 스터디',
    'AI 정의와 발전 지도':'AI란? 발전 지도',
    '컨텍스트의 한계':'Context / 책상과 펼친 책',
    '대화 압축과 조건 누락':'Compaction / 요약에서 빠진 조건',
    '새 대화와 지침서로 맥락 관리':'새 대화 / 최신 지침서 펼치기',
    '프롬프트 기법 선택':'프롬프트 기법 / 선택하기','프롬프트 구조화':'프롬프트 기법 / 구조화하기',
    '꿀팁 필요한 정보부터 묻기':'꿀팁 / 질문과 요청 좁히기','꿀팁 결과에서 기준 뽑기':'꿀팁 / 오류에서 기준 뽑기',
    '문제와 해결책의 차이':'내 문제에 어떻게 적용하죠?','내 문제 좁히기 실습':'5분 메모 / 코치에게 가져갈 것',
    'MD 코치 실습 시작':'프로젝트에서 코치 시작','MD 코치와 질문하기':'AI 질문에 하나씩 답하기','내 문제 정의 확인':'내 문제 정의 고치고 저장',
    'Claude 웹 실습 경로':'이번 주 숙제 한눈에','MD를 HTML로 변환':'MD → PDF 또는 HTML',
    'HTML 제출 전 점검':'두 파일 확인과 제출','MD 파일의 뜻과 쓰는 이유':'MD란? 왜 MD로 남기나요?'
  };
  const base=window.prepareMarketSlides;
  window.prepareMarketSlides=()=>{
    base();
    const all=window.THEORY_SCENES;
    Object.assign(all,scenes);
    all['오프닝'][1]='1주차 / 포트폴리오의 출발점';
    const headings={
      '오프닝':'도메인별 AI 역량 강화<br>프로그램 / D그룹',
      '국내 AI 공고 변화':'현재 국내 AI 채용공고는 어떤가요?',
      '현업의 AI 활용상황':'기업 시스템 안에서 AI는 어떻게 작동하나요?',
      '기업이 AI 인재를 찾는 이유':'기업은 어떤 AI 인재를 원하나요?',
      '프로젝트에서 지원서까지':'무엇을 해야 할지 모르겠어요. 막막해요.',
      '많이 만들기보다 직무에 맞게':'프로젝트를 많이 만들면 취업에 도움이 되나요?',
      '문제를 찾는 세 출발점':'AI 포트폴리오, 어디서부터 시작하나요?',
      '희망 산업과 직무 좁히기':'내 산업과 직무에서는 무엇을 개선하면 좋을까요?',
      '마케팅 JD 원문':'만들 과제의 힌트를 JD에서 어떻게 찾나요?',
      'AI는 어떻게 답변을 만드는가':'AI는 어떻게 답변을 만드나요?',
      '컨텍스트의 한계':'AI의 작업 공간을 책상으로 생각해볼까요?',
      '왜 AI를 선택했나':'이 업무에 AI를 써야 하는 이유는 뭔가요?',
      'AI 적용 방식 선택':'AI는 어느 수준까지 맡기면 되나요?',
      '프로젝트 처리 흐름':'AI를 넣으면 업무 흐름은 어떻게 바뀌나요?',
      '검수와 중단 조건':'어떤 답을 믿고, 언제 멈춰야 하나요?',
      '모델을 고르는 기준':'Claude, Gemini, GPT 중 무엇을 고를까요?',
      '도구를 역할로 나누기':'ChatGPT와 Codex는 어떻게 나눠 쓰나요?',
      '문제와 해결책의 차이':'배운 내용을 내 문제에 어떻게 적용하나요?',
      '강사 시연 시작':'실제로 AI 답을 보고 무엇을 고치나요?',
      '최종 산출물 묶음':'이 과정을 포트폴리오에 어떻게 남기나요?',
      'Claude 웹 실습 경로':'이번 주에는 무엇을 제출하나요?'
    };
    for(const [key,h] of Object.entries(headings)){if(all[key])all[key][2]=h;}
    all['오프닝'][3]=all['오프닝'][3].replace('희망 직무의 일을 이해하고,<br>쓸모 있는 서비스를 설계하는 경험.','지원 직무의 문제를 해결하는<br>내 판단을 증거로 보여주기 위해.').replace('같은 내용의 HTML로 제출합니다.','같은 내용의 HTML 또는 PDF로 제출합니다.');
    all['프로젝트에서 지원서까지'][3]=all['프로젝트에서 지원서까지'][3].replace('이번 주: 판단 기준을 MD에 정리','이번 주: 세 질문의 판단 기준을 MD에 정리');
    all['JD 역추출 요청']=scene('MINI PRACTICE / 5 MINUTES','JD 원문에서 내 과제 후보 하나를 뽑아볼까요?',`<div class="journey-practice-strip"><b>2-6 / 5분 실습</b><span>1분 원문 선택 → 2분 요청 → 2분 근거 대조</span></div>${prompt('아래 JD 원문에서 담당 업무와 요구 역량을 찾아줘.\n원문 근거 / 업무 행동 / 결과물 / 작은 과제 후보로 정리해줘.\n명시된 요구와 너의 해석을 구분하고, 없는 요구는 추가하지 마.\n공개 또는 합성 자료로 가능한 과제 하나와 검수 기준을 제안해줘.\n[회사 / 직무 / URL / 확인 날짜]\n[담당 업무와 자격요건 원문 붙여넣기]')}${note('완료 기준: <b>원문 근거 한 줄 + 내 과제 한 줄 + 판단 기준 한 줄</b><br>JD에 AI가 없어도 업무부터 읽습니다. 제안한 과제가 공식 채용 과제인지 구분합니다.<br>다음 두 페이지의 JD 중 하나를 골라도 됩니다. 링크만 주기보다 원문을 붙여넣으세요.')}`);
    all['AI를 잘 쓰는 사람들'][1]='LEARN / FOLLOW THE LEARNING HABITS';
    all['AI를 잘 쓰는 사람들'][2]='AI를 잘 쓰는 사람들은 어떻게 배우나요?';
    all['AI를 잘 쓰는 사람들'][3]=all['AI를 잘 쓰는 사람들'][3].replace(/<div class="people-demo-bridge">[\s\S]*?<\/div>/,'<div class="people-demo-bridge">우리도 <b>되묻기 → 직접 확인 → 수정 기록</b>으로 배웁니다. 다음은 함께 이야기하며 관심사를 넓히는 공부법입니다.</div>');
    all['최종 산출물 묶음'][3]=all['최종 산출물 묶음'][3].replaceAll('HTML 문서','HTML 또는 PDF 문서');
    all['Claude 웹 실습 경로'][3]=chain([['01 / 문제와 기준','JD → 내 과제','다음 페이지에서 5분 메모.<br>JD 근거와 내 과제를 가져와<br>문제, 범위, 검수 기준을 정리.'],['02 / 원본 작성','AI 작업 지침서.md','과제 코치와 대화해 보완.<br>가설과 확인 필요를 표시.<br>읽고 수정한 뒤 저장.'],['03 / 보기 좋게 제출','HTML 또는 PDF','같은 내용으로 변환하고<br>파일을 직접 열어 대조.<br>MD 원본과 함께 제출.']])+note('이번 주의 도착점은 <b>실행할 문제와 판단 기준이 담긴 문서</b>입니다.<br>Claude 웹의 새 대화에서 끝낼 수 있습니다. 다음 주에는 이 지침을 바탕으로 실행을 확장합니다.');
    all['강사 시연 시작'][1]='LIVE DEMO / 9 MINUTES';
    all['강사 시연 시작'][3]=all['강사 시연 시작'][3].replace('준비 / 3분','준비 / 2분').replace('실행 / 5분','실행 / 4분').replace('완성 / 4분','완성 / 3분');
    const stage=document.querySelector('.stage');
    const existing=new Map([...stage.querySelectorAll('.slide')].map(s=>[s.dataset.title,s]));
    const ordered=[];
    groups.forEach(([chapter,keys])=>keys.forEach(key=>{
      let s=existing.get(key);
      if(!s){s=document.createElement('article');s.className='slide';s.dataset.title=key;}
      s.dataset.chapter=chapter;
      if(key==='문제 선정 세부 질문')s.dataset.outline='2-2a';
      if(key==='AI 정의와 발전 지도')s.dataset.outline='4-0';
      ordered.push(s);
    }));
    stage.replaceChildren(...ordered);
  };
})();
