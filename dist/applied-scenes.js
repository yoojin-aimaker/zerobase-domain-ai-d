/* Work discovery, data preparation and AI background. Sources reviewed 2026-10-06. */
(() => {
  const sources={uipath:'https://docs.uipath.com/automation-hub/automation-suite/2023.10/user-guide/information-about-the-detailed-assessment-algorithm',ms:'https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/business-strategy-plan',context:'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents',models:'https://www.anthropic.com/claude-sonnet-5-5',work:'https://openai.com/index/codex-for-knowledge-work/',retrieval:'https://www.anthropic.com/engineering/contextual-retrieval'};
  const source=(key,text)=>`<p class="theory-source"><a href="${sources[key]}" target="_blank" rel="noopener">${text} ↗</a></p>`;
  const note=t=>`<div class="research-note">${t}</div>`;
  const sc=(tag,title,body)=>['research',tag,title,body];
  const rows=(heads,data)=>`<div class="applied-ledger"><header>${heads.map(h=>`<span>${h}</span>`).join('')}</header>${data.map(r=>`<section>${r.map((v,i)=>`<${i?'p':'h4'}>${v}</${i?'p':'h4'}>`).join('')}</section>`).join('')}</div>`;
  const trio=data=>`<div class="applied-trio">${data.map((r,i)=>`<section><span>0${i+1} / ${r[0]}</span><h4>${r[1]}</h4><p>${r[2]}</p></section>`).join('')}</div>`;
  const flow=data=>`<div class="applied-flow">${data.map((r,i)=>`${i?'<i aria-hidden="true">→</i>':''}<section><span>0${i+1}</span><h4>${r[0]}</h4><p>${r[1]}</p></section>`).join('')}</div>`;
  const prompt=(text)=>`<div class="research-prompt"><pre>${text}</pre><button class="copy-prompt">요청 복사</button></div>`;
  const sample=`R01: 처음 켰는데 세척 순서를 몰라 설명서를 다시 찾았어요.
R02: 맛은 괜찮은데 쓰고 난 필터를 어떻게 버리는지 모르겠어요.
R03: 선물로 샀어요. 포장은 예뻤는데 배송 예정일 안내가 없었어요.`;
  const demoPrompt=`아래는 학습용 합성 리뷰다. 사용 안내 주제를 정하려고 한다.
분류: 사용 안내 / 배송 안내 / 기타 또는 판단 보류.
사용 안내는 사용 순서와 관리 방법, 배송 안내는 일정과 배송 정보다.
출력: ID | 불편 | 분류 | 원문 그대로의 근거.
긍정 평가를 불편으로 바꾸거나 이탈, 배송 지연을 추정하지 마.
${sample}
마지막에 안내 콘텐츠 후보 1개와 추가로 확인할 자료를 적어줘.
실제 제품 사용법은 자료가 없으므로 작성하지 마.`;
  const scenes={
    '내 업무를 인터뷰하는 요청':sc('DISCOVERY / MAKE TACIT RULES VISIBLE','익숙해서 생략한 판단을 AI와의 인터뷰로 꺼냅니다',prompt(`나는 [산업]의 [직무]에서 [업무]를 한다.
이 일을 시작하게 되는 계기, 쓰는 자료, 작업 순서,
시간이 드는 이유와 완료 기준을 정리하고 싶다.
내가 답할 수 있도록 한 번에 하나씩 질문해줘.
5개 정도 답한 뒤 현재 업무를 3~5단계로 정리해줘.
각 단계에 입력 / 하는 일 / 결과 / 사람이 판단할 것을 표시해.
내가 말한 사실과 네가 추정한 내용은 분리해줘.`)+note('실제 업무 기록과 대조해 틀린 단계를 고칩니다. AI가 그럴듯하게 만든 절차를 현업 사실로 채택하지 않습니다.')),
    '자료 확보 경로 고르기':sc('DATA / GET THE SOURCE','자료 형태에 맞는 확보 방법부터 고릅니다',rows(['자료가 있는 곳','처음 가져올 방법','함께 남길 것'],[['공개 웹 문서와 후기','사용 가능한 범위에서 필요한 원문만 발췌','문서 URL, 확인 날짜, 원문 위치'],['사용 권한이 있는 업무 시트','필요 열만 CSV로 내보내고 식별 정보 제거','열의 의미, 단위, 사용 허용 범위'],['현장 자료를 구할 수 없음','정상, 누락, 애매한 사례를 합성해 작성','합성 표시, 생성 조건, 사람이 정한 기대 결과']])+note('대량 수집 자동화는 첫 실행의 전제조건이 아닙니다. 문제를 확인할 자료와 기능을 연습할 합성 자료의 역할을 구분합니다.')),
    '원문을 보존하며 정리하기':sc('DATA / RAW TO READY','원문을 고쳐 쓰지 않고 가공 열을 따로 붙입니다',`<div class="data-contract"><div><span>정리 전 / 합성 자료</span><h4>맛은 괜찮은데 쓰고 난 필터를<br>어떻게 버리는지 모르겠어요.</h4><p>불편과 긍정 평가가 섞여 있어도<br>전체 문장은 그대로 보관합니다.</p></div><div class="data-fields"><section><b>원문 행</b><p>R02 / 원문 그대로 / synthetic</p></section><section><b>가공 열</b><p>사용 안내 / 필터 처리 방법을 모름</p></section><section><b>검수 열</b><p>맛 불만으로 바꾸지 않았는지 확인</p></section></div></div>`+note('중복 제거 기준을 기록하고, 빈 값을 0이나 임의 문장으로 채우지 않습니다. 검증용 새 2건은 기준 작성 후 따로 실행합니다.')),
    '문제를 찾는 세 출발점':sc('DISCOVERY / THREE ROUTES','출발점은 달라도, 바꿀 업무 하나로 좁힙니다',`<svg class="discovery-route-diagram" viewBox="0 0 1152 420" role="img" aria-labelledby="discovery-title discovery-desc" xmlns="http://www.w3.org/2000/svg">
<title id="discovery-title">문제를 발견하는 세 경로가 하나의 문제 정의로 모이는 흐름</title>
<desc id="discovery-desc">채용공고에서 담당 업무와 요구 역량을 연결하거나, 내 경험에서 반복 작업의 막히는 단계를 찾거나, 산업 공개 자료에서 문제 가설을 세우고 담당자에게 확인한다. 확보한 자료가 있는 경로부터 시작해 누구의 어떤 작업을 바꿀지 정의한다.</desc>
<defs>
<marker id="discovery-arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#606873"/></marker>
<marker id="discovery-arrow-accent" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#7048b5"/></marker>
<marker id="discovery-arrow-link" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#606873"/></marker>
</defs>
<path d="M8 8H332L360 36V88H8Z" fill="#f7f8fa" stroke="#dce0e5" stroke-width="1.2"/>
<path d="M332 8V36H360" fill="none" stroke="#dce0e5" stroke-width="1.2"/>
<text x="184" y="40" text-anchor="middle" font-size="24" font-weight="700" fill="#171b21">채용공고</text>
<text x="184" y="68" text-anchor="middle" font-size="16" fill="#606873">담당 업무 + 자격요건</text>
<path d="M184 88V156" stroke="#606873" stroke-width="1.2" marker-end="url(#discovery-arrow)"/>
<rect x="124" y="108" width="120" height="24" fill="#fff"/>
<text x="184" y="128" text-anchor="middle" font-size="16" fill="#606873">요구를 연결</text>
<rect x="8" y="160" width="352" height="88" rx="4" fill="#fff" stroke="#b8c0ca" stroke-width="1.2"/>
<text x="184" y="196" text-anchor="middle" font-size="24" font-weight="650" fill="#171b21">입사 후 해야 할 행동</text>
<text x="184" y="228" text-anchor="middle" font-size="16" fill="#606873">작은 업무 과제로 바꾸기</text>
<path d="M400 8H724L752 36V88H400Z" fill="#f7f8fa" stroke="#dce0e5" stroke-width="1.2"/>
<path d="M724 8V36H752" fill="none" stroke="#dce0e5" stroke-width="1.2"/>
<text x="576" y="40" text-anchor="middle" font-size="24" font-weight="700" fill="#171b21">내 경험</text>
<text x="576" y="68" text-anchor="middle" font-size="16" fill="#606873">직장, 인턴, 학교와 팀 활동</text>
<path d="M576 88V156" stroke="#606873" stroke-width="1.2" marker-end="url(#discovery-arrow)"/>
<rect x="516" y="108" width="120" height="24" fill="#fff"/>
<text x="576" y="128" text-anchor="middle" font-size="16" fill="#606873">과정을 복기</text>
<rect x="400" y="160" width="352" height="88" rx="4" fill="#fff" stroke="#b8c0ca" stroke-width="1.2"/>
<text x="576" y="196" text-anchor="middle" font-size="24" font-weight="650" fill="#171b21">반복 작업의 막히는 단계</text>
<text x="576" y="228" text-anchor="middle" font-size="16" fill="#606873">자료를 다시 읽고 옮기는 순간</text>
<path d="M792 8H1116L1144 36V88H792Z" fill="#f7f8fa" stroke="#dce0e5" stroke-width="1.2"/>
<path d="M1116 8V36H1144" fill="none" stroke="#dce0e5" stroke-width="1.2"/>
<text x="968" y="40" text-anchor="middle" font-size="24" font-weight="700" fill="#171b21">산업 현장</text>
<text x="968" y="68" text-anchor="middle" font-size="16" fill="#606873">고객 후기, 보고서, 업무 지침</text>
<path d="M968 88V156" stroke="#606873" stroke-width="1.2" marker-end="url(#discovery-arrow)"/>
<rect x="908" y="108" width="120" height="24" fill="#fff"/>
<text x="968" y="128" text-anchor="middle" font-size="16" fill="#606873">자료를 대조</text>
<rect x="792" y="160" width="352" height="88" rx="4" fill="#fff" stroke="#b8c0ca" stroke-width="1.2"/>
<text x="968" y="196" text-anchor="middle" font-size="24" font-weight="650" fill="#171b21">현업 문제의 가설</text>
<text x="968" y="228" text-anchor="middle" font-size="16" fill="#606873">실제 담당자에게 확인하기</text>
<path d="M184 248V280H576M968 248V280H576M576 248V280" fill="none" stroke="#606873" stroke-width="1.2"/>
<circle cx="576" cy="280" r="4" fill="#7048b5"/>
<path d="M576 284V320" stroke="#7048b5" stroke-width="1.2" marker-end="url(#discovery-arrow-accent)"/>
<rect x="248" y="324" width="656" height="88" rx="8" fill="#f1eaf9" stroke="#7048b5" stroke-width="1.2"/>
<text x="576" y="360" text-anchor="middle" font-size="28" font-weight="750" fill="#512790">누구의 어떤 작업을 바꿀까?</text>
<text x="576" y="392" text-anchor="middle" font-size="20" fill="#63526e">대상 + 업무 장면 + 줄이고 싶은 손실</text>
</svg>`+note('자료가 있는 경로부터 시작합니다. JD는 내 경험이나 산업에서 찾은 문제를 지원 직무와 연결하는 근거로도 씁니다.')),
    '많이 만들기보다 직무에 맞게':sc('PORTFOLIO / RELEVANCE FIRST','아무 프로젝트나 많이 만든다고 취업에 도움이 되지는 않습니다',`<div class="project-fit-diagram"><section class="fit-missing"><span class="fit-label">기능만 나열하면</span><div class="fit-demos"><span>챗봇</span><span>이미지 생성기</span><span>할 일 앱</span></div><span class="fit-break" aria-label="직무 연결이 빠짐">?</span><div><h4>지원 직무에서 무엇을 할 수 있나요?</h4><p>대상 업무와 내가 판단한 내용이 보이지 않습니다.</p></div></section><section class="fit-connected"><span class="fit-label">직무에 연결하면</span><div><h4>고객지원의 반복 문의</h4><p>왜 이 문제를 골랐는가</p></div><i aria-hidden="true">→</i><div><h4>근거를 찾는 답변 초안</h4><p>AI와 사람이 맡을 범위</p></div><i aria-hidden="true">→</i><div><h4>검수 결과와 수정 기록</h4><p>무엇을 확인하고 고쳤는가</p></div></section></div>`+note('연습용 프로젝트에도 학습 가치는 있습니다. 취업 포트폴리오에는 <b>희망 산업의 문제, 선택 이유, 검증 증거</b>가 이어지는 과제를 고릅니다.')+`<p class="theory-source">수업의 프로젝트 선정 원칙 / 특정 결과물이나 프로젝트 개수가 합격을 보장한다는 뜻은 아닙니다.</p>`),
    '테크블로그에서 업무 찾기':sc('DISCOVERY / READ COMPANY STORIES','테크블로그에서 반복 업무와 막히는 지점을 찾습니다',`<div class="techblog-reading"><p class="blog-search">검색 예시 <code>site:techblog.woowahan.com 검수</code><span>회사명 + 업무 동사 + 자동화 / 개선 / 실패</span></p><div class="blog-reading-list"><section><span>운영 / 품질</span><div><a href="https://techblog.woowahan.com/20408/" target="_blank" rel="noopener">우아한형제들 / 메뉴 이미지 품질 검수 ↗</a><p>수동 검수가 지연될 때, 기준을 어떻게 정리하고 예외를 사람에게 넘겼을까?</p></div></section><section><span>다양한 직무</span><div><a href="https://techblog.woowahan.com/27640/" target="_blank" rel="noopener">우아한형제들 / AI 전환과 현업 코칭 ↗</a><p>데이터 취합, 보고서와 정책 확인 중 내 희망 직무에도 반복되는 일은 무엇일까?</p></div></section><section><span>조직 / 협업</span><div><a href="https://toss.tech/article/ai-surf-day" target="_blank" rel="noopener">토스 / AI Surf Day ↗</a><p>개인의 도구 사용을 팀의 업무 흐름 개선으로 어떻게 연결했을까?</p></div></section></div><div class="blog-reading-rule"><span>① 원래 하던 일</span><i>→</i><span>② 막히던 단계</span><i>→</i><strong>③ 내 과제 후보</strong></div></div>`+note('글 한 편에서 원문 근거와 링크를 남깁니다. 기업의 해결 방식과 내가 제안한 과제는 구분합니다.')),
    '테크블로그를 내 과제로':sc('DISCOVERY / CASE TO MY PROJECT','기업 사례에서 검수 업무 하나만 가져옵니다',`<svg class="techblog-case-diagram" viewBox="0 0 1152 360" role="img" aria-labelledby="blog-case-title blog-case-desc"><title id="blog-case-title">배민 검수 사례를 개인 AI 과제로 좁히는 과정</title><desc id="blog-case-desc">기업 원문의 수동 검수 지연에서 기준별 판단과 예외 처리를 추출한다. 이를 사용 권한이 있는 이미지 다섯 장과 검수 기준 두 개를 다루는 학습 과제로 축소한다. 기업 구현과 개인 과제 제안은 구분한다.</desc><defs><marker id="blog-case-arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#606873"/></marker></defs><path d="M320 152H408M736 152H824" stroke="#606873" stroke-width="1.2" fill="none" marker-end="url(#blog-case-arrow)"/><rect x="0" y="32" width="320" height="248" rx="4" fill="#f7f8fa" stroke="#dce0e5"/><text x="24" y="68" font-size="16" fill="#606873">01 / 원문에서 확인</text><text x="24" y="120" font-size="28" font-weight="700" fill="#171b21">운영자의 수동 검수</text><text x="24" y="164" font-size="20" fill="#63596d">요청이 많아 처리 지연</text><text x="24" y="204" font-size="20" fill="#63596d">기준 변경에도 대응 필요</text><text x="24" y="252" font-size="16" fill="#606873">기업 사례 / 2024.12.19</text><rect x="416" y="32" width="320" height="248" rx="4" fill="#fff" stroke="#b8c0ca"/><text x="440" y="68" font-size="16" fill="#606873">02 / 가져올 업무 구조</text><text x="440" y="120" font-size="28" font-weight="700" fill="#171b21">기준별 판단과 예외</text><text x="440" y="164" font-size="20" fill="#63596d">이미지 + 검수 기준</text><text x="440" y="204" font-size="20" fill="#63596d">판단 후보 + 이유</text><text x="440" y="252" font-size="16" fill="#606873">어려운 항목은 운영자 확인</text><rect x="832" y="32" width="320" height="248" rx="4" fill="#f1eaf9" stroke="#7048b5"/><text x="856" y="68" font-size="16" fill="#7048b5">03 / 수업용 과제 제안</text><text x="856" y="120" font-size="28" font-weight="700" fill="#512790">작은 검수 지침서</text><text x="856" y="164" font-size="20" fill="#63596d">허용된 이미지 5장, 기준 2개</text><text x="856" y="204" font-size="20" fill="#63596d">불명확하면 판단 보류</text><text x="856" y="252" font-size="16" fill="#606873">이번 주: 입력과 검수 기준을 MD로</text><text x="576" y="332" text-anchor="middle" font-size="20" fill="#63526e">내 산업에 적용: 메뉴 이미지 → 상품 사진 / 홍보 소재 등으로 바꿔 가설을 세웁니다.</text></svg>`+note('원문의 기업 성과를 내 성과로 쓰지 않습니다. 내 자료와 기준으로 실행하고, 틀린 판단과 수정 내용을 기록합니다.')+`<p class="theory-source"><a href="https://techblog.woowahan.com/20408/" target="_blank" rel="noopener">우아한형제들 기술블로그 / 메뉴 이미지 품질 검수 ↗</a><br>왼쪽은 원문 요약, 오른쪽은 개인 학습용으로 축소한 과제 제안입니다.</p>`),
    '현업 업무 펼치기':sc('DISCOVERY / WORK INVENTORY','이번 주 반복한 일을 동사와 숫자로 적습니다',rows(['업무 후보','언제, 얼마나','확인할 흔적'],[['리뷰를 분류한다','주 1회 / 30건 / 40분','리뷰 파일과 분류표'],['문의 조건을 옮긴다','주 3회 / 10건 / 회당 15분','문의 원문과 입력 양식'],['공지 초안을 쓴다','월 1회 / 1건 / 30분','지난 공지와 수정 기록']])+note('숫자는 작성법을 보여주는 가정입니다. 빈도 × 1회 시간을 같은 기간으로 맞춰 비교하고, 실제 시간은 기록으로 확인합니다.')),
    '산업에서 문제 가설 찾기':sc('DISCOVERY / INDUSTRY EVIDENCE','경험이 없다면 공개 자료 세 종류를 교차 확인합니다',trio([['문제 신호','리뷰와 공개 문의','소형가전 리뷰의 “세척 순서를 찾기 어렵다”는 표현을 모읍니다. 반복 수와 출처를 남깁니다.'],['업무 맥락','설명서와 업무 지침','설명서에 해당 안내가 있는지 봅니다. 내용 부재인지, 찾기 어려움인지 구분합니다.'],['현장 확인','담당자에게 가설 확인','“리뷰를 누가 분류하고 안내 주제를 어떻게 고르나요?”를 묻습니다. 확인 전에는 가설로 표시합니다.']])+note('기사의 산업 성장률만으로 현업 문제를 단정하지 않습니다. 특정 업무의 입력, 작업, 결과가 보여야 합니다.')),
    '자동화 후보 평가 프레임':sc('FRAMEWORK / UIPATH × MICROSOFT','업무 효과와 실행 가능성을 따로 평가합니다',`<div class="priority-map"><div class="priority-y">업무 효과 ↑</div><div class="priority-quadrants"><section><span>효과 높음 / 실행 어려움</span><h4>범위를 줄여 검증</h4><p>계정, 자료와 승인 의존성 줄이기</p></section><section class="priority-start"><span>효과 높음 / 실행 쉬움</span><h4>먼저 시도</h4><p>검수 가능한 작은 작업 선택</p></section><section><span>효과 낮음 / 실행 어려움</span><h4>보류</h4><p>다른 문제 후보와 비교</p></section><section><span>효과 낮음 / 실행 쉬움</span><h4>학습용으로 한정</h4><p>기술 연습과 업무 가치를 구분</p></section></div><div class="priority-x">실행 가능성 →</div><aside><b>효과</b><p>반복 시간, 누락, 재작업</p><b>실행 가능성</b><p>자료 접근, 기준, 연결 난이도</p><b>최종 확인</b><p>실제 사용자가 필요로 하는가</p></aside></div>`+source('uipath','UiPath / 기업용 업무 자동화 플랫폼의 과제 평가 기준')+source('ms','Microsoft 사용 사례 평가 / 두 프레임을 개인 프로젝트용 2축으로 재구성')),
    '현재 업무 단계 나누기':sc('AS-IS / FIND THE BOTTLENECK','업무 전체를 세 단계로 나누면 맡길 부분이 보입니다',flow([['자료 모으기','리뷰 ID와 원문 확보<br>중복과 빠진 항목 확인'],['의미 정리하기','불편을 읽고 분류<br>근거 문장을 함께 표시'],['다음 행동 정하기','안내 주제 선정<br>제작 전 확인 사항 결정']])+note('각 단계에 소요 시간, 다시 한 작업, 오류 사례를 적습니다. “리뷰 분석 자동화”를 통째로 목표로 잡지 않습니다.')),
    '단계별 역할 배분':sc('DESIGN / RULES, AI, HUMAN','규칙, AI, 사람을 단계마다 다르게 배치합니다',rows(['맡길 대상','판단 기준','이번 예시'],[['규칙','조건을 명확하게 적을 수 있다','ID 중복 제거, 빈칸 표시, 분류별 건수 집계'],['AI','다양한 표현의 의미를 읽어야 한다','세척 순서와 필터 처리를 사용 안내로 분류'],['사람','목표와 영향에 대한 책임이 따른다','분류 검수, 안내 주제 채택, 실제 사용 승인']])+note('AI만 할 수 있는 일이라는 뜻은 아닙니다. AI 활용 가치가 있는 단계를 찾고, 규칙으로 충분한 계산은 분리합니다.')),
    '바뀐 업무 정의하기':sc('TO-BE / CHANGE ONE STEP','“편해진다”를 입력과 동작, 완료 기준으로 바꿉니다',rows(['현재의 문제','바꿀 동작','완료 기준'],[['같은 리뷰를 반복해서 읽음','AI가 분류 초안과 인용을 반환','모든 행에 ID와 근거가 있음'],['없는 원인을 추정함','근거가 부족하면 보류 표시','원문에 없는 원인과 효과가 없음'],['결과가 다음 작업으로 연결 안 됨','사람이 콘텐츠 후보와 확인 자료 선택','선정 이유와 보류 항목이 남음']])+note('시간 절감은 목표입니다. 실행 전에는 “40분에서 10분으로 단축했다”처럼 이미 달성한 성과로 쓰지 않습니다.')),
    '문제를 데이터 열로 바꾸기':sc('DATA / DEFINE THE MINIMUM','풀 문제를 정하면 필요한 데이터 열이 정해집니다',`<div class="data-contract"><div><span>결정할 것</span><h4>어떤 안내 콘텐츠를<br>먼저 만들까?</h4><p>이 결정에 쓰이지 않는 열은<br>첫 실행에서 제외합니다.</p></div><div class="data-fields"><section><b>입력 자료</b><p>review_id / 원문 / 출처 / 자료 유형</p></section><section><b>AI가 추가할 열</b><p>분류 / 불편 / 원문 근거 / 보류 이유</p></section><section><b>사람이 확정할 열</b><p>수정 분류 / 수정 이유 / 콘텐츠 후보</p></section></div></div>`+note('이름, 연락처와 구매자 식별자는 이 과제에 필요하지 않습니다. 원문은 보관하고 가공 열을 별도로 붙입니다.')),
    '작은 데이터셋 만들기':sc('DATA / COLLECT, CLEAN, SEPARATE','자료를 모은 뒤 출처와 예외가 보이는 샘플을 만듭니다',flow([['확보','사용 가능한 공개 자료<br>또는 명시한 합성 자료'],['정리','ID 부여, 중복 점검<br>빈칸과 원문은 유지'],['나누기','기준 만드는 연습용<br>처음 보는 검증용']])+note('이번 수업은 3건으로 시연하고 새 2건으로 확인합니다. 작은 연습 규모이며 전체 업무 성능을 추정하는 표본은 아닙니다.')+`<p class="research-links"><a href="assets/demo/reviews.csv" download>합성 리뷰 5건 CSV 내려받기 ↗</a></p>`),
    '컨텍스트의 한계':sc('AI NOTE / CONTEXT WINDOW','AI가 한 번에 참고하는 자료에는 한계가 있습니다',`<div class="context-scene"><section><span>한 번의 응답에 쓰는 맥락</span><div class="context-stack"><b>지시와 기준</b><p>관련 자료와 검색 결과</p><p>대화 기록</p><div class="context-space">모델이 함께 참고할 수 있는 범위</div></div></section><aside><h4>길이와 관련성을<br>함께 관리합니다</h4><p>토큰은 텍스트 등을 처리하는 단위입니다. 같은 글자 수라도 토큰 수는 다를 수 있습니다.</p><p>대화가 길어지면 서비스에 따라 요약하거나 일부 기록을 제외합니다. 창이 크다고 모든 조건을 정확히 쓰는 것은 아닙니다.</p></aside></div>`+source('context','Anthropic / Effective context engineering / 2025.09.29')),
    '자료를 AI에 전달하는 법':sc('AI NOTE / GROUND THE ANSWER','문제에 필요한 자료와 최신 기준을 묶어 전달합니다',trio([['작은 자료','원문과 기준을 함께','리뷰 3건과 분류 기준을 한 번에 줍니다. ID를 유지해 답과 원문을 대조합니다.'],['큰 자료','관련 부분을 찾아 전달','질문에 필요한 문서를 검색해서 넣는 방식이 RAG입니다. 검색 누락과 오래된 자료도 점검합니다.'],['긴 작업','결정 사항을 갱신','목표, 확정 기준, 자료 버전, 남은 문제를 정리합니다. 새 대화에도 이 묶음을 전달합니다.']])+note('파일을 첨부하는 것과 모델을 다시 학습시키는 것은 다릅니다. 제공된 근거를 이번 작업에서 참고하게 만드는 설계입니다.')+source('retrieval','Anthropic / Contextual Retrieval')),
    'AI를 쓰는 시점':sc('AI NOTE / BEFORE OR DURING USE','AI로 만든 도구와 AI가 들어 있는 도구는 다릅니다',`<div class="timing-paths"><section><span>미리 처리</span><h4>AI → 정리한 파일 → 검색과 필터</h4><p>지난 리뷰를 AI로 분류한 뒤 CSV를 화면에 넣습니다.<br>화면의 필터와 집계는 규칙대로 작동합니다.</p></section><section><span>사용 중 처리</span><h4>새 입력 → AI 호출 → 새로운 판단</h4><p>새 리뷰마다 의미를 읽으려면 그때마다 AI가 작동해야 합니다.<br>이 연결을 필요한 연결은 3주차 MVP 제작에서 검토합니다.</p></section></div>`+note('오늘은 AI가 일하는 시점만 정합니다. API, 호출 비용과 연결 구현은 2주차에 다룹니다.')),
    '최근 AI 도구의 변화':sc('AI NOTE / 2026 UPDATE','AI 도구는 답변에서 업무 파일과 실행으로 확장되고 있습니다',`<div class="trend-editorial"><div><span>2026.06 / OpenAI 공식 발표</span><h4>보고서<br>스프레드시트<br>발표 자료</h4></div><section><h4>무엇이 달라졌나</h4><p>Codex의 비개발 업무 활용 사례에는 조사, 분석, 문서 제작과 반복 작업 자동화가 포함됩니다.</p><h4>내 프로젝트에 적용하면</h4><p>질문에 답을 받는 데서 이어서 파일을 만들고 실행 결과를 확인할 수 있습니다. 사용할 수 있는 기능은 서비스와 계정에 따라 확인합니다.</p></section></div>`+source('work','OpenAI / Codex for knowledge work / 기업 자체 발표')),
    '모델을 고르는 기준':sc('AI NOTE / MODEL CHOICE','모델 이름보다 내 작업의 품질과 시간을 비교합니다',trio([['최신 모델 예시','Sonnet 5.5와 Opus 5.5','Anthropic은 Sonnet을 범위가 뚜렷한 일상 작업, Opus를 복잡한 판단 작업에 맞춘다고 설명합니다.'],['비교 방법','같은 입력과 완료 기준','같은 리뷰와 기준으로 실행하고 누락, 근거 오류, 검수까지 걸린 시간을 적습니다.'],['남길 기록','모델, 날짜와 조건','서비스명과 모델명은 구분합니다. 검색 여부, 첨부 자료와 설정이 다르면 결과도 달라질 수 있습니다.']])+source('models','Anthropic / Sonnet 5.5 발표 2026.09.28 / 용도는 공급사 설명, 우열은 내 과제로 검증')),
    '말로 만들고 검수하기':sc('AI NOTE / BUILD AND VERIFY','말로 만들더라도 완료 기준은 사람이 확인합니다',flow([['설명한다','CSV의 분류별 건수와<br>원문 필터를 보여줘'],['실행한다','정상 입력과 빈 파일을 넣고<br>기대 결과와 대조'],['고친다','잘못된 한 동작을 설명하고<br>다른 기능도 다시 확인']])+note('바이브 코딩으로 초안을 만들 수 있지만 “고쳐줘” 한마디가 정확한 수정을 보장하지 않습니다. 공개 서비스는 보안과 운영 검토도 필요합니다.')),
    '강사 시연 시작':sc('LIVE DEMO / 12 MINUTES','리뷰 원문에서 검수한 업무 결과물까지 보여드립니다',flow([['준비 / 3분','원문 3건과 분류 기준<br>완성할 표 먼저 확인'],['실행 / 5분','Claude에 요청<br>출력과 원문 대조'],['완성 / 4분','오류 수정과 주제 선택<br>결과표와 판단 기록 저장']])+note('시연 중 나온 실제 출력을 화면으로 확인합니다. 뒤의 오류 예시는 결과가 모두 맞았을 때도 검수 기준을 설명하기 위한 보조 자료입니다.')),
    '시연 실행 요청':sc('LIVE DEMO / RUN IN CLAUDE','자료와 기준을 넣고 첫 결과를 함께 확인합니다',prompt(demoPrompt)+note('실행한 모델명과 날짜를 기록합니다. 다음 장의 예시와 실제 출력이 다르면 실제 응답을 기준으로 검수합니다.')),
    '시연 수정 요청':sc('LIVE DEMO / REPAIR WITH EVIDENCE','틀린 항목과 근거를 짚어 수정하고 다시 확인합니다',prompt(`방금 표를 원문과 대조해서 다시 확인해줘.
R02는 맛에 대한 긍정 평가와 필터 처리의 불편을 분리해.
R03은 배송 예정일 안내가 없다는 뜻이며 지연 근거는 없어.
각 행에 원문 그대로의 근거를 붙이고 근거 없는 추정은 삭제해.
수정한 행과 수정 이유를 별도 표로 보여줘.
해당 오류가 원래 출력에 없었다면 없다고 밝혀줘.`)+note('오류가 없는 행까지 임의로 바꾸지 않습니다. 사람이 원문을 다시 읽고 최종 분류를 확정합니다.')),
    '시연 완성 결과물':sc('LIVE DEMO / SAVE THE WORK PRODUCT','최종 결과는 다음 행동을 정할 수 있는 검수표입니다',`<div class="demo-document"><header><b>안내 콘텐츠 후보 검토표</b><span>합성 자료 / 작성 예시</span></header><div class="demo-result"><section><span>선정 후보</span><h4>첫 사용자를 위한<br>관리 안내</h4><p>R01 세척 순서<br>R02 필터 처리 방법</p></section><section><span>만들기 전 확인</span><h4>제품 설명서의<br>정확한 관리 방법</h4><p>지금 자료에는 사용법이 없습니다.<br>확인 후 안내 초안을 작성합니다.</p></section><section><span>별도 후속 작업</span><h4>배송 예정일<br>안내 방식 확인</h4><p>R03의 안내 부재를 운영 확인으로 넘깁니다. 배송 지연으로 단정하지 않습니다.</p></section></div></div>`+note('저장: 원문 CSV + AI 초안 + 검수한 표 + 이 판단 기록. 실제 고객 조사나 매출 성과로 표현하지 않습니다.')),
    '1주차 숙제':sc('HOMEWORK / WEEK 01','문제 근거와 실행 계획을 한 장으로 제출합니다',trio([['문제 근거','세 경로 중 하나','JD 원문, 내 업무 기록, 산업의 공개 자료 중 출발점을 밝힙니다. 사실과 가설을 구분합니다.'],['프로젝트 브리프','맡길 단계 하나','현재 흐름과 문제, 바꿀 동작, AI와 규칙, 사람의 역할을 적습니다.'],['실행 준비','샘플 5건과 검수 기준','자료의 출처와 유형, 예상 결과와 보류 기준을 준비합니다.']])+note('제출 관리 시트의 내 행에 문서 링크와 제출일을 적습니다. 다음 주에는 이 브리프로 첫 실행을 준비합니다.'))
  };
  const base=window.prepareMarketSlides;
  window.prepareMarketSlides=()=>{
    base();Object.assign(window.THEORY_SCENES,scenes);
    const stage=document.querySelector('.stage');
    let order=[...stage.querySelectorAll('.slide')].map(s=>s.dataset.title);
    const after=(t,items)=>order.splice(order.indexOf(t)+1,0,...items);
    after('프로젝트에서 지원서까지',['많이 만들기보다 직무에 맞게','문제를 찾는 세 출발점']);
    after('산업별 주제 바꾸기',['테크블로그에서 업무 찾기','테크블로그를 내 과제로','현업 업무 펼치기','산업에서 문제 가설 찾기','자동화 후보 평가 프레임','현재 업무 단계 나누기','단계별 역할 배분','바뀐 업무 정의하기']);
    after('현재 업무 단계 나누기',['내 업무를 인터뷰하는 요청']);
    after('자료 확보 판단',['문제를 데이터 열로 바꾸기','작은 데이터셋 만들기','컨텍스트의 한계','자료를 AI에 전달하는 법']);
    after('문제를 데이터 열로 바꾸기',['자료 확보 경로 고르기','원문을 보존하며 정리하기']);
    after('AI 적용 방식 선택',['AI를 쓰는 시점']);
    after('검수와 중단 조건',['최근 AI 도구의 변화','모델을 고르는 기준','말로 만들고 검수하기','강사 시연 시작']);
    after('시연 분류 기준',['시연 실행 요청']);
    after('시연 AI 초안',['시연 수정 요청']);
    after('시연 우선순위 판단',['시연 완성 결과물']);
    const omit=new Set(['내 경험의 시작점','경험에서 판단 찾기','세 질문','AI와 규칙의 역할','설계를 실행 요청으로','에이전트 구조 예시','시연 남기는 결과물']);
    order=order.filter(t=>!omit.has(t));
    [...stage.querySelectorAll('.slide')].forEach(s=>{if(omit.has(s.dataset.title))s.remove();});
    order.forEach(t=>{let s=[...stage.children].find(s=>s.dataset.title===t);if(!s){s=document.createElement('article');s.className='slide';s.dataset.title=t;}stage.append(s);});
  };
})();
