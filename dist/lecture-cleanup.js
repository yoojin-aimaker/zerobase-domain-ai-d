/* Week 1 content consolidation. Shared design and the learning sequence stay intact. */
(() => {
  const sourceHTML=body=>{
    const root=document.createElement('div');root.innerHTML=body;
    return [...root.querySelectorAll('.case-sources')].map(e=>e.outerHTML).join('');
  };
  const sources=(url,label,note)=>`<p class="case-sources"><a href="${url}" target="_blank" rel="noopener">${label} ↗</a><span>${note}</span></p>`;
  const takeaway=text=>`<div class="clean-takeaway">${text}</div>`;
  const modal=(id,title,body)=>`<dialog class="clean-detail-dialog" id="${id}" aria-labelledby="${id}-title"><header><h4 id="${id}-title">${title}</h4><button type="button" data-close-detail aria-label="닫기">닫기</button></header>${body}</dialog>`;
  const base=window.prepareMarketSlides;
  window.prepareMarketSlides=()=>{
    base();
    const all=window.THEORY_SCENES;
    all['오프닝'][3]=`<div class="visual-opening purple-opening"><div class="opening-focus"><span>1주차 / 오늘의 질문</span><h4>AI 포트폴리오,<br>내 직무에서 시작하기</h4><p>채용공고와 내 경험을 살펴보며<br>나에게 맞는 프로젝트의 출발점을 찾습니다.</p><small>이유진 / AX 컨설턴트</small></div><figure class="opening-art"><img src="assets/cover/ai-side-program-03-cover-art.png" alt="채용공고에서 문제를 찾고, 사람의 판단을 거쳐 AI 프로젝트 포트폴리오로 연결하는 그림"></figure><a class="cover-attendance" href="submission.html" target="_blank" rel="noopener noreferrer" aria-label="출석 체크 구글폼 열기"><img src="assets/attendance/attendance-qr.png?v=20261007-fixed" width="224" height="224" alt="주차별 출석 체크 구글폼 QR 코드"><strong>출석 체크</strong><span>QR 스캔 또는 클릭</span></a></div>`;

    all['강사 소개']=['instructor','YOUR INSTRUCTOR / PROFILE 2026','현업의 문제를 실행하는 경험으로',`
<div class="clean-instructor-profile">
<figure><img src="assets/instructor/yujin-profile-2026.jpg" alt="이유진 강사의 프로필 사진"><figcaption><h4>이유진</h4><span>YUJIN FLOW</span><p>AX 컨설턴트<br>AI 서비스 기획 강사</p></figcaption></figure>
<div class="clean-profile-detail-list" aria-label="강사의 상세 경력" title="강사 제공 프로필 2026 / 주요 경력 발췌">
<section><h4>기업과 기관 AI 교육</h4><ul><li><b>현대자동차 브랜드마케팅팀</b> AI Agent 기초 과정 <strong>강사</strong></li><li><b>신세계DF</b> PPT와 Excel 보고서 자동화 교육 <strong>강사</strong></li></ul><p class="clean-profile-other-companies"><b>그 외 참여 기업들</b>: 분당서울대학교병원, 한국전력기술, 바인그룹, 한국생산기술연구원(KITECH), 제일기획, 삼성전자(보직장 / DS), 포스코, KB국민은행, SK에코플랜트, 골프존, LG생활건강, 넥센타이어</p></section>
<section><h4>AI 해커톤 심사와 멘토링</h4><ul><li><b>SK AI 해커톤</b> <strong>심사위원</strong>과 AI 기획 멘토</li><li><b>카카오뱅크 × FIN:NECT</b> AI 강연과 <strong>심사위원</strong></li><li><b>멋쟁이사자처럼</b> AI 서비스 기획 프로젝트 <strong>컨설팅, 심사와 멘토</strong></li></ul></section>
<section><h4>AI 서비스 기획과 PM</h4><ul><li><b>HR과 커리어 AI 서비스</b>, LLM 기반 AI 서비스</li><li><b>공공기관 AI센터</b> 결제와 정산 플랫폼</li><li><b>뉴스 빅데이터</b> 개인화 추천 / <b>관광 데이터</b> 코스 추천</li></ul></section>
</div></div>
<p class="clean-profile-bridge">오늘 함께 볼 것 <b>문제의 선택 → 설계 이유 → 검증 기준</b></p>
`];

    all['국내 AI 공고 변화'][2]='대기업의 AI 채용이 달라지고 있습니다';
    all['국내 AI 공고 변화'][3]=`
<div class="clean-hiring-news" aria-label="SK하이닉스, 포스코, SK텔레콤의 실제 AI 채용 변화">
<section><header><b>SK하이닉스</b><span>공식 뉴스룸 / 2026.08.20</span></header><a class="clean-hiring-image" href="https://news.skhynix.co.kr/talent-hy-way-recruiting-2026/" target="_blank" rel="noopener"><img src="https://skhynix-prd-data.s3.ap-northeast-2.amazonaws.com/wp-content/uploads/2026/08/AGI-%EC%8B%9C%EB%8C%80-%EC%83%9D%EA%B0%81%ED%95%98%EB%8A%94-%ED%9E%98%EC%9D%B4-%EB%B0%98%EB%8F%84%EC%B2%B4-%EC%98%81%ED%86%A0-%EB%84%93%ED%9E%8C%EB%8B%A4-%EC%A0%84%EA%B5%AD-4000%EC%97%AC-%EA%B5%AC%EC%A7%81%EC%9E%90-%EB%AA%B0%EB%A6%B0-SK%ED%95%98%EC%9D%B4%EB%8B%89%EC%8A%A4-%E2%80%98Talent-HY-way-%ED%98%84%EC%9E%A5-%EC%8A%A4%EC%BC%80%EC%B9%98_%EA%B8%B0%ED%83%80_%EC%9D%B4%EB%AF%B8%EC%A7%80_story_2026_01.jpg" alt="SK하이닉스 공식 뉴스룸의 2026년 하반기 채용설명회 현장"></a><h4>면접에서 AI로<br>직무 과제를 푼다</h4><p>학력 제한 폐지<br>LLM 활용 문제해결 PT 도입</p><a href="https://news.skhynix.co.kr/talent-hy-way-recruiting-2026/" target="_blank" rel="noopener">채용 변화 공식 기사 ↗</a></section>
<section><header><b>포스코</b><span>공식 채용공고 / 2026.06.19</span></header><a class="clean-hiring-image clean-hiring-poster" href="https://recruit.posco.com/h22a01-front/H22A1001.html?id=648003" target="_blank" rel="noopener"><img src="https://recruit.posco.com/h22a01-front/images/dext5editordata/2026/06/20260618_165839478_32781.jpeg" alt="포스코 2026년 AI 전문인력 채용 공식 공고문 상단"></a><h4>AI 활용평가와<br>포트폴리오 제출</h4><p>사무 DX / 제조 AI 전문인력<br>내 역할과 문제 해결 경험을 제출</p><a href="https://recruit.posco.com/h22a01-front/H22A1001.html?id=648003" target="_blank" rel="noopener">기업 공식 채용공고 ↗</a></section>
<section><header><b>SK텔레콤</b><span>공식 뉴스룸 / 2026.02.11</span></header><a class="clean-hiring-image" href="https://news.sktelecom.com/221757" target="_blank" rel="noopener"><img src="https://news-static.sktelecom.com/wp-content/uploads/2026/02/%EC%82%AC%EC%A7%84-SKT-%EC%A0%95%EC%98%88%ED%8C%80-%EC%9B%8C%ED%81%AC%EC%88%8D-%EC%B0%B8%EC%84%9D%EC%9E%90-%EB%8B%A8%EC%B2%B4%EC%82%AC%EC%A7%84F.jpg" alt="SK텔레콤 공식 뉴스룸의 AI 파운데이션 모델 개발 워크숍 사진"></a><h4>AI 모델 R&amp;D<br>인턴 직접 모집</h4><p>SKT와 크래프톤 각각 10명 내외<br>LLM 학습, 데이터 처리와 최적화</p><a href="https://news.sktelecom.com/221757" target="_blank" rel="noopener">AI 개발자 모집 공식 기사 ↗</a></section>
</div>
<a class="clean-hiring-scale" href="https://news.samsung.com/kr/%EC%82%BC%EC%84%B1-%ED%96%A5%ED%9B%84-5%EB%85%84%EA%B0%84-6%EB%A7%8C%EB%AA%85-%EC%8B%A0%EA%B7%9C-%EC%B1%84%EC%9A%A9" target="_blank" rel="noopener"><b>삼성 / 5년간 6만명 신규 채용 계획 ↗</b><span>반도체, 바이오, AI 중심 / 전체 채용 규모</span></a>
<p class="clean-hiring-note">발표 당시의 채용 사례입니다. 접수 종료 공고를 포함하며, 삼성 수치는 AI 직군만의 채용 인원이 아닙니다. 원문에서 직무별 조건을 확인하세요.</p>`;

    all['AI 비즈니스 가치의 세 방향']=['research','AI VALUE / CONSULTING PERSPECTIVES','기업은 AI로 무엇을 늘리고, 줄이려 하나요?',`
<div class="clean-value-onepage">
<div class="clean-value-three" aria-label="AI 프로젝트의 세 가지 비즈니스 목표">
<section><svg viewBox="0 0 64 64" aria-hidden="true"><path d="M10 52H54M12 44L28 28L38 36L54 14M40 14H54V28"/></svg><h4>매출 ↑</h4><p>고객에게 더 맞는 제안으로<br>구매와 이용을 돕기</p></section>
<section><svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="23"/><path d="M32 18V33L42 39M8 8L14 14M50 14L56 8"/></svg><h4>시간과 비용 ↓</h4><p>반복 작업을 줄여<br>중요한 일에 시간 쓰기</p></section>
<section><svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 7L52 15V31C52 44 42 53 32 58C22 53 12 44 12 31V15Z M22 31L29 38L42 24"/></svg><h4>오류와 리스크 ↓</h4><p>빠진 조건과 이상 신호를 찾아<br>사람의 확인을 돕기</p></section>
</div>
<div class="clean-value-takeaway"><span>내 프로젝트에 가져올 질문</span><b>무엇을 늘리거나 줄이면, 이 일이 나아질까?</b></div>
<div class="clean-value-reference"><span>공식 자료를 수업용 세 가지 목표로 재구성했습니다.</span><button type="button" class="clean-detail-button" data-open-detail="business-value-detail">예시와 공식 출처 보기 ↗</button></div>
</div>
${modal('business-value-detail','AI의 비즈니스 가치 / 예시와 공식 출처',`<div class="clean-value-detail"><section><h4>매출 늘리기</h4><p><b>예시</b> 개인화 추천 / 구매 상담<br><b>확인할 지표</b> 구매 전환율</p></section><section><h4>시간과 비용 줄이기</h4><p><b>예시</b> 문서 초안 / 데이터 정리<br><b>확인할 지표</b> 검수 포함 총 작업 시간</p></section><section><h4>오류와 리스크 줄이기</h4><p><b>예시</b> 누락 점검 / 이상 거래 탐지<br><b>확인할 지표</b> 누락률과 오탐률</p></section></div>${sources('https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/the-economic-potential-of-generative-ai-the-next-productivity-frontier','McKinsey / AI의 경제적 가치','생성형 AI가 만드는 비즈니스 가치에 관한 공식 자료입니다.')}${sources('https://www.bcg.com/capabilities/artificial-intelligence','BCG / AI 전환 전략','조직의 AI 전환 접근에 관한 공식 자료입니다.')}${sources('https://www.deloitte.com/global/en/insights/industry/technology/measuring-cyber-ai-and-cloud-kpis.html','Deloitte / AI 성과 지표','성과 지표에 관한 공식 자료입니다.')}<p class="clean-note">세 목표는 수업용 재구성입니다. 예시와 지표는 프로젝트 설계용이며, 실제 효과는 검증해야 합니다.</p>`)}
`];

    all['조직의 AX 접근']=['research','AX / ORGANIZATION AND WORK','조직은 AI로 일하는 방식을 어떻게 바꾸나요?',`
<div class="clean-ax-onepage" aria-label="조직의 AI 전환 세 가지 접근">
<div class="clean-ax-three">
<section><svg viewBox="0 0 64 64" aria-hidden="true"><rect x="10" y="8" width="44" height="34" rx="4"/><path d="M20 54H44M32 42V54M20 20H44M20 29H34"/></svg><span>DEPLOY</span><h4>도구 도입</h4><p>공통 AI 도구로<br>일상 업무를 돕기</p></section>
<section><svg viewBox="0 0 64 64" aria-hidden="true"><rect x="5" y="10" width="18" height="14" rx="2"/><rect x="41" y="10" width="18" height="14" rx="2"/><rect x="23" y="43" width="18" height="14" rx="2"/><path d="M23 17H41M14 24V33H32V43M50 24V33H32"/></svg><span>RESHAPE</span><h4>업무 재설계</h4><p>일의 순서와<br>AI와 사람의 역할 바꾸기</p></section>
<section><svg viewBox="0 0 64 64" aria-hidden="true"><path d="M25 46C25 39 13 34 13 23C13 12 22 5 32 5C42 5 51 12 51 23C51 34 39 39 39 46Z M25 52H39M28 58H36M26 23L32 29L38 23M32 29V46"/></svg><span>INVENT</span><h4>새 서비스</h4><p>AI로 새로운 고객 경험과<br>사업 기회를 만들기</p></section>
</div>
<div class="clean-ax-focus"><span>AX / AI Transformation</span><b>AI에 맞춰 일의 흐름과 역할, 운영 방식을 바꾸는 전환</b></div>
<div class="clean-ax-reference"><span>BCG의 세 접근을 수업용으로 요약 / 세 접근은 병행할 수 있습니다.</span><button type="button" class="clean-detail-button" data-open-detail="org-ax-detail">공식 출처와 세부 설명 ↗</button></div>
</div>
${modal('org-ax-detail','조직의 AI 전환 / 공식 출처와 세부 설명',`<div class="clean-ax-detail"><section><h4>도구 도입 / Deploy</h4><p>승인된 AI 도구를 함께 쓰며 초안, 요약과 자료 조사를 돕습니다. 조직은 공통 도구와 사용 교육을 준비합니다.</p></section><section><h4>업무 재설계 / Reshape</h4><p>기존 업무 단계와 순서를 바꾸고 AI와 사람의 역할을 재배치합니다. 현업과 IT가 함께 설계합니다.</p></section><section><h4>새 서비스 / Invent</h4><p>새로운 고객 경험과 제품, 서비스, 사업 모델을 탐색합니다. 작은 실험으로 사업성을 확인합니다.</p></section><section><h4>세 접근을 받치는 공통 기반</h4><p>목표와 책임자 / 데이터와 보안 / 교육과 운영 / 성과와 검수 기준</p></section></div>${sources('https://www.bcg.com/capabilities/artificial-intelligence','BCG / Deploy, Reshape, Invent','세 접근은 순서대로 거쳐야 하는 단계가 아니며 병행할 수 있습니다.')}${sources('https://connect.lgcns.com/kr/moa/insight/detail.agenticai-ax-master-plan-2603-4','LG CNS / AX 마스터플랜','공식 자료의 조직 기반을 수업용으로 요약했습니다.')}`)}
`];

    all['현업의 AI 활용상황']=['research','ENTERPRISE AI / CONNECTED SYSTEMS','기업 시스템 안에서 AI는 어떻게 작동하나요?',`
<div class="clean-enterprise-onepage" aria-label="기업 데이터, AI 분석과 설비 제어가 연결된 두 실제 사례">
<div class="clean-enterprise-case">
<header><b>SK하이닉스</b><span>반도체 품질 관리</span></header>
<div class="clean-enterprise-flow"><section><small>공정 데이터</small><h4>장비 센서</h4><p>온도, 압력 등</p></section><span class="clean-enterprise-arrow" aria-hidden="true">→</span><section class="clean-enterprise-ai"><small>Panoptes VM / 가상 계측</small><h4>AI 품질 예측</h4><p>박막의 두께와 굴절률</p></section><span class="clean-enterprise-arrow" aria-hidden="true">→</span><section><small>APC / 공정 제어 시스템</small><h4>공정 조건 제어</h4><p>예측 값을 생산에 반영</p></section></div>
</div>
<div class="clean-enterprise-case">
<header><b>포스코</b><span>광양제철소 안전 관리</span></header>
<div class="clean-enterprise-flow"><section><small>현장 영상</small><h4>공장 CCTV</h4><p>작업자와 이동 설비</p></section><span class="clean-enterprise-arrow" aria-hidden="true">→</span><section class="clean-enterprise-ai"><small>Smart Fool Proof / 영상 인식</small><h4>AI 위험 감지</h4><p>작업자의 설비 접근</p></section><span class="clean-enterprise-arrow" aria-hidden="true">→</span><section><small>이동기기 제어</small><h4>비상정지 명령</h4><p>위험한 설비 이동을 멈춤</p></section></div>
</div>
<div class="clean-enterprise-takeaway"><span>기업의 AI 시스템</span><b>데이터 → AI 분석 → 기존 시스템의 실행</b></div>
<div class="clean-enterprise-reference"><span>공식 운영 사례의 연결 구조를 수업용으로 요약했습니다.</span><button type="button" class="clean-detail-button" data-open-detail="enterprise-system-detail">공식 사례와 운영 개념 보기 ↗</button></div>
</div>
${modal('enterprise-system-detail','기업 AI 시스템 / 공식 사례와 운영 개념',`
<section><h4>SK하이닉스 / AI 예측을 공정 제어에 연결</h4><p>2022년 12월부터 양산 공장의 박막 증착 공정에 Panoptes VM을 적용했습니다. 장비 센서로 공정 결과를 예측하고, 그 결과를 최적 공정 조건을 찾는 APC에 연동합니다. 2024년 공식 발표의 공정 산포 약 29% 개선은 품질 변동의 개선을 뜻하며 수율 29% 증가를 뜻하지 않습니다.</p></section>
${sources('https://news.skhynix.co.kr/panoptes_vm/','SK하이닉스 / 양산 적용 / 2023.01.10','센서 데이터, 품질 예측과 APC 연결을 설명하는 공식 기사입니다.')}
${sources('https://news.skhynix.co.kr/panoptes-vm-2-0-release/','SK하이닉스 / Panoptes VM 2.0 / 2024.08.13','공정 산포 개선에 관한 후속 공식 발표입니다.')}
<section><h4>포스코 / AI 감지를 설비 정지에 연결</h4><p>광양제철소 2제강공장에 처음 적용한 Smart Fool Proof는 CCTV에서 작업자의 이동을 감지합니다. 작업자가 이동기기에 접근하면 위험 상황으로 판단해 비상정지 명령을 보냅니다. 추가 52개소 확대는 기사 발행 당시 계획이며, 모두 완료됐다고 설명하지 않습니다.</p><figure class="clean-enterprise-source-image"><img src="https://newsroom.posco.com/kr/wp-content/uploads/2024/06/20240604_news_d02.jpg" alt="포스코 공식 기사 이미지. AI가 작업자를 감지한 후 정지 명령을 보내 멈춘 이동기기"><figcaption>포스코 공식 뉴스룸 / 작업자 감지와 이동기기 정지 화면</figcaption></figure></section>
${sources('https://newsroom.posco.com/kr/광양제철소-ai-영상인식-시스템-활용한-안전기술-고도/','포스코 / AI 안전 시스템 / 2024.06.04','AI 영상 인식과 이동기기 자동 제어를 설명하는 공식 기사입니다.')}
<section><h4>사람이 참여하는 지점 / Human-in-the-loop (HITL)</h4><p>사람이 AI 작업 흐름에 참여해 결과를 검토, 판단하거나 수정하는 방식입니다. 실제 운영에서는 검토와 승인이 필요한 지점을 설계합니다. 위 두 사례의 모든 자동 제어에 사람이 매번 승인한다고 해석하지 않습니다. SK하이닉스 기사에서는 엔지니어의 전문 지식을 모델에 반영하는 과정도 설명합니다.</p></section>
${sources('https://cloud.google.com/discover/human-in-the-loop','Google Cloud / HITL 개념','사람의 참여와 검토에 관한 공식 설명입니다.')}
`)}
`];

    const set=(key,body,title)=>{all[key][3]=body;if(title)all[key][2]=title;};

    const talentKey='기업이 AI 인재를 찾는 이유';
    const talentRoot=document.createElement('div');talentRoot.innerHTML=all[talentKey][3];
    const talentSkills=talentRoot.querySelector('.intro-demand-skills');
    const talentLinks=[...talentRoot.querySelectorAll('.evidence-source-row a')];
    const talentEvidence=[...talentSkills.querySelectorAll('section')].map((section,i)=>{
      const evidence=section.querySelector('.intro-skill-evidence');
      const detail=`<section><h4>${section.querySelector('h4').textContent}</h4>${evidence.innerHTML}<p>${talentLinks[i].outerHTML}</p></section>`;
      evidence.remove();
      return detail;
    }).join('');
    talentSkills.classList.add('clean-talent-flow');
    all[talentKey][1]='AI TALENT / THREE SKILLS';
    set(talentKey,`
<div class="clean-talent-onepage">
<div class="clean-talent-process">
${talentSkills.outerHTML}
<svg class="clean-talent-forward" viewBox="0 0 1152 48" aria-hidden="true"><path d="M316 24H448 M434 12L448 24L434 36 M704 24H836 M822 12L836 24L822 36"/></svg>
<svg class="clean-talent-feedback" viewBox="0 0 1152 64" role="img" aria-label="검증과 판단으로 확인한 기준을 다음 적용에 반영"><path d="M960 2V24H192V2 M184 10L192 2L200 10"/><text x="576" y="54" text-anchor="middle">확인한 기준을 다음 적용에 반영</text></svg>
</div>
<div class="clean-talent-takeaway"><span>내 포트폴리오에 남길 것</span><b>선택한 문제 + 확인한 결과 + 내 판단</b></div>
</div>
<div class="clean-talent-reference"><span>공개 자료를 바탕으로 정리한 수업의 관점입니다.</span><button type="button" class="clean-detail-button" data-open-detail="talent-evidence-detail">근거와 출처 보기 ↗</button></div>
${modal('talent-evidence-detail','세 역량을 설명하는 참고 근거',`<div class="clean-talent-evidence">${talentEvidence}</div><p class="clean-note">${talentRoot.querySelector('.intro-visual-limit').textContent}</p>`)}
`);

    all['AI 인재의 직무별 역량']=['research','AI TALENT / ROLE-SPECIFIC SKILLS','어떤 역량과 경험을 준비하면 좋을까요?',`
<p class="clean-talent-lead">직무별 <b>요구 역량</b>을 <b>보여줄 경험</b>으로 연결해보세요.</p>
<div class="clean-talent-roles clean-talent-role-compact">
<section aria-label="서비스 기획과 PM의 요구 역량과 경험 제안"><h4>서비스 기획 / PM</h4><div class="clean-talent-jd" aria-label="공식 JD 요구 역량"><p>문제 정의와 기술적 실현 가능성<br>성과 지표와 실험 / 개발자 협업</p></div><div class="clean-talent-example" aria-label="수업용 프로젝트 제안"><b>왜 이 문제와 기능을 골랐나?</b><p>사용자 문제와 기능의 우선순위<br>성공 기준을 담은 기획</p></div></section>
<section aria-label="데이터와 분석의 요구 역량과 경험 제안"><h4>데이터 / 분석</h4><div class="clean-talent-jd" aria-label="공식 JD 요구 역량"><p>SQL 분석과 데이터 정합성 검증<br>시각화와 대시보드 / 결과 전달</p></div><div class="clean-talent-example" aria-label="수업용 프로젝트 제안"><b>분석 결과를 믿을 수 있나?</b><p>AI 분석과 원자료 대조<br>의사결정을 돕는 결과</p></div></section>
<section aria-label="ML과 개발의 요구 역량과 경험 제안"><h4>ML / 개발</h4><div class="clean-talent-jd" aria-label="공식 JD 요구 역량"><p>모델 설계와 실제 서비스 운영<br>A/B 실험 / 비즈니스 지표 검증</p></div><div class="clean-talent-example" aria-label="수업용 프로젝트 제안"><b>실제로 동작하고 개선됐나?</b><p>작동하는 작은 MVP<br>품질과 실패 사례 검증</p></div></section>
</div>
<div class="clean-talent-role-bridge"><span>내가 준비할 것</span><b>JD의 요구 하나 → 보여줄 경험 하나</b></div>
<div class="clean-talent-role-actions"><button type="button" class="clean-detail-button" data-open-detail="role-skills-source-detail">공식 JD와 안내 보기 ↗</button></div>
${modal('role-skills-source-detail','직무별 역량 / 공식 JD와 수업 제안',`<p class="clean-note">위쪽은 공식 JD에서 요약한 요구 역량입니다. 아래 질문과 프로젝트 흐름은 그 역량을 보여주기 위한 수업용 제안이며, 기업의 공식 채용 과제가 아닙니다.</p>${sources('https://toss.im/career/job-detail?job_id=7611090003','토스뱅크 / PM (LLM)','문제 정의, 기술적 실현 가능성, 성과 지표와 실험, 개발자 협업에 관한 요구를 요약했습니다.')}${sources('https://toss.im/career/job-detail?job_id=7782783003','토스뱅크 / 데이터 분석','SQL 분석과 데이터 정합성, 시각화와 대시보드, 결과 전달에 관한 요구를 요약했습니다. 이 공고는 AI 필수를 명시하지 않습니다.')}${sources('https://toss.im/career/job-detail?job_id=7992223003&sub_position_id=7827378003','토스 / ML Engineer','모델 설계와 실제 서비스 운영, A/B 실험과 비즈니스 지표 검증에 관한 요구를 요약했습니다.')}<p class="clean-note">2026.10.07 확인 / 일부 요구를 요약한 사례입니다. 경력 조건과 전체 요구는 원문에서 확인하세요.</p>`)}
`];

    all['AI 인재의 일하는 관점']=['research','AI TALENT / HOW TO THINK','AI 인재는 어떤 관점으로 일하나요?',`
<p class="clean-talent-lead">기술을 쓰는 과정에서 <b>무엇을 묻고, 어떤 선택을 했는지</b>가 보여야 합니다.</p>
<div class="clean-talent-mindset">
<section><span>01 / PROBLEM</span><svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="27" cy="27" r="17"/><path d="M39 39L56 56 M21 22C21 14 35 14 35 23C35 29 27 28 27 34 M27 41V42"/></svg><h4>문제부터 묻기</h4><p>누구의 어떤 일이 막혔나?<br>무엇이 나아지면 성공일까?</p><b>도구 선택 전에<br>사용자와 목표를 확인</b></section>
<section><span>02 / TRADE-OFF</span><svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 10V54 M10 20H54 M18 20L8 39H28L18 20 M46 20L36 39H56L46 20 M18 54H46"/></svg><h4>제약도 함께 보기</h4><p>품질, 비용, 속도는 어떤가?<br>사람이 확인할 일은 뭘까?</p><b>대안을 비교하고<br>선택한 이유를 설명</b></section>
<section><span>03 / LEARN</span><svg viewBox="0 0 64 64" aria-hidden="true"><path d="M13 24A22 22 0 0 1 51 17 M51 7V18H40 M51 40A22 22 0 0 1 13 47 M13 57V46H24 M23 33L29 39L42 24"/></svg><h4>작게 실험하고 배우기</h4><p>실제 결과는 어땠나?<br>틀린 가정은 무엇이었나?</p><b>결과와 한계를 기록하고<br>다음 선택에 반영</b></section>
</div>
<div class="clean-talent-role-bridge"><span>다음으로 가져갈 질문</span><b>내 직무에서 이 판단을 보여줄 작은 프로젝트는?</b></div>
<p class="clean-talent-role-sources"><a href="https://toss.im/career/job-detail?job_id=7827198003" target="_blank" rel="noopener">토스 / AI Manager 공식 JD ↗</a><span>공고에 나타난 문제 구체화, 기술과 운영의 제약, 실행과 학습을 수업 질문으로 재구성했습니다. 관리직의 경력 요건을 수강생에게 그대로 요구하는 뜻은 아닙니다.</span></p>
`];

    const problemRoot=document.createElement('div');problemRoot.innerHTML=all['프로젝트에서 지원서까지'][3];
    const problemMap=problemRoot.querySelector('.career-judgment-map');
    problemMap.classList.add('problem-selection-map');
    problemMap.setAttribute('aria-labelledby','problem-selection-map-title problem-selection-map-desc');
    problemMap.querySelector('title').id='problem-selection-map-title';
    problemMap.querySelector('title').textContent='문제 선정의 세부 질문: 사용자, 업무 장면, 불편과 근거';
    problemMap.querySelector('desc').id='problem-selection-map-desc';
    problemMap.querySelector('desc').textContent='상위 단계인 문제 선정을 더 작게 나눈다. 01-1 누구의 문제인지 사용자를 정하고, 01-2 언제 어떤 자료로 무슨 일을 하는지 업무 장면을 정하고, 01-3 무엇이 막히는지 근거와 함께 확인한다.';
    const problemTexts={'01':'01-1','02':'01-2','03':'01-3','문제 선정':'사용자','전략 설계':'업무 장면','성과 검증':'불편과 근거','무엇을 개선할까?':'누구의 문제인가?','어떤 방식을 쓸까?':'언제, 어떤 일을 하나?','무엇으로 확인할까?':'무엇이 막히고 있나?','남길 것: 문제의 근거':'남길 것: 구체적인 대상','남길 것: 선택한 이유':'남길 것: 자료와 할 일','남길 것: 결과와 수정 기록':'남길 것: 불편과 근거'};
    problemMap.querySelectorAll('text').forEach(t=>{t.textContent=problemTexts[t.textContent]||t.textContent;});
    const problemIcons=problemMap.querySelectorAll('g[transform]');
    problemIcons[0].innerHTML='<circle cx="32" cy="18" r="13"/><path d="M8 60V51C8 35 56 35 56 51V60"/>';
    problemIcons[1].innerHTML='<rect x="3" y="7" width="58" height="43" rx="4"/><path d="M3 18H61 M23 60H41 M32 50V60 M13 28H34 M13 37H46"/>';
    problemIcons[2].innerHTML='<path d="M5 7H59V43H34L20 57V43H5Z M32 17V29"/><circle cx="32" cy="36" r="1"/>';
    const marker=problemMap.querySelector('marker');marker.id='problem-selection-arrow';
    problemMap.querySelector('[marker-end]').setAttribute('marker-end','url(#problem-selection-arrow)');
    all['문제 선정 세부 질문']=['research','01 / PROBLEM SELECTION / 문제 선정의 세부 질문','문제 선정부터, 세 가지로 좁혀볼까요?',`
${problemMap.outerHTML}
<div class="strategy-takeaway problem-selection-summary"><b>문제 정의 한 문장</b><p>[사용자]가 [업무 장면]에서 [불편]을 겪는다.</p><small>JD와 내 경험, 공개 자료에서 근거를 찾고, 확인하지 못한 불편과 원인은 가설로 표시합니다.</small></div>
`];

    set('문제를 찾는 세 출발점',`
<div class="clean-origin"><section><span>01 / JD</span><h4>채용공고</h4><p>담당 업무와 자격요건에서<br><b>입사 후 할 행동</b>을 찾습니다.</p></section><section><span>02 / EXPERIENCE</span><h4>내 경험</h4><p>직장, 인턴, 학교와 팀 활동에서<br><b>반복 작업의 막힌 단계</b>를 찾습니다.</p></section><section><span>03 / FIELD</span><h4>산업 현장</h4><p>고객 후기, 보고서와 업무 지침에서<br><b>문제의 가설</b>을 세우고 확인합니다.</p></section></div>
<svg class="clean-origin-join" viewBox="0 0 1152 64" aria-hidden="true"><path d="M192 0V24H960V0 M576 24V56 M568 48L576 56L584 48" fill="none" stroke="#bea3d5" stroke-width="2"/></svg>
${takeaway('<span>하나의 문제로 좁히기</span><b>누구의 어떤 작업을 바꿀까?</b><small>대상 + 업무 장면 + 줄이고 싶은 손실</small>')}
<p class="clean-note">자료가 있는 경로부터 시작합니다. JD로 지원 직무와 연결하고, 산업에서 찾은 가설은 담당자에게 확인합니다.</p>`);

    const caseKey='케이스 스터디 사고 흐름';
    const caseBody=all[caseKey][3];
    set(caseKey,caseBody.replace(/(<p class="case-sources">)/,'<button type="button" class="clean-detail-button" data-open-detail="case-output-detail">실제 AI 응답 보기 ↗</button>$1')+modal('case-output-detail','배민 사례 / 실제 AI 검수 응답',`<figure class="clean-case-output"><img src="assets/research/baemin-ai-output.png" alt="우아한형제들 기술블로그의 실제 GPT 응답. 정책 번호와 검수 이유를 반환한다."><figcaption>정책 번호와 판단 이유를 구조화해 반환합니다. 사진과 반려 기준이 입력입니다.</figcaption></figure>${sources('https://techblog.woowahan.com/20408/','우아한형제들 / 메뉴 이미지 품질 검수 / 2024.12.19','기업이 공개한 응답 예시입니다. 사고 흐름 도식은 수업용 재구성입니다.')}`),'배민 사례에서 문제, 선택, 검증을 읽습니다');
    const caseRoot=document.createElement('div');caseRoot.innerHTML=all[caseKey][3];
    const caseStrip=caseRoot.querySelector('.case-question-strip');
    const caseButton=caseRoot.querySelector('[data-open-detail]');
    caseStrip.querySelector('span').textContent='서비스 기획 / PO에 가져갈 질문';
    caseButton.textContent='기업 검수 응답 보기 ↗';
    const caseBottom=document.createElement('div');caseBottom.className='clean-case-bottom';
    caseStrip.before(caseBottom);caseBottom.append(caseStrip,caseButton);all[caseKey][3]=caseRoot.innerHTML;

    const modelKey='모델을 고르는 기준';
    const modelOld=all[modelKey][3];
    const root=document.createElement('div');root.innerHTML=modelOld;
    const map=root.querySelector('.model-map').outerHTML;
    const modelSources=sourceHTML(modelOld);
    set(modelKey,`
<div class="clean-compare-input"><span>먼저 고정</span><b>같은 원문 + 같은 지침 + 같은 완료 기준</b><small>모델마다 새 대화에서 실행하고 검색, 첨부와 설정 조건을 기록합니다.</small></div>
<div class="clean-compare"><section><span>01 / QUALITY</span><h4>오류와 누락</h4><p>원문에 없는 판단이 있나?<br>필수 항목이 빠졌나?</p><b>근거와 보류 기준으로 대조</b></section><section><span>02 / TIME</span><h4>끝까지 걸린 시간</h4><p>생성 + 검수 + 수정<br>같은 완료 기준까지 비교</p><b>답변 속도만 비교하지 않기</b></section><section><span>03 / CHOICE</span><h4>내 작업의 적합성</h4><p>모델과 날짜, 사용 조건을 적고<br>선택한 이유 한 줄 남기기</p><b>내 과제에서 확인한 범위</b></section></div>
<div class="clean-detail-line"><button type="button" class="clean-detail-button" data-open-detail="model-map-detail">Claude, Gemini, GPT, Codex 지도 보기 ↗</button><span>발표와 접근 조건 / 2026.10.06 정리 자료</span></div>
${modal('model-map-detail','서비스와 모델 지도 / 2026.10.06',map+modelSources)}
<p class="clean-note">이번 주 숙제는 사용 가능한 Claude 웹 모델 하나로 진행합니다. 서비스 기능과 모델의 이름을 구분합니다.</p>`,'AI 모델은 같은 과제로 비교합니다');

    const toolKey='도구를 역할로 나누기';
    const toolSource=sourceHTML(all[toolKey][3]);
    set(toolKey,`
<div class="clean-tool-roles"><section><span>기준과 초안</span><h4 class="clean-tool-brand"><img class="clean-tool-logo" src="assets/brands/claude.svg" alt="" width="36" height="36" aria-hidden="true">Claude</h4><p>원문과 지침을 함께 다듬기</p><b>지침서 MD</b></section><section><span>자료와 분석</span><h4 class="clean-tool-brand"><img class="clean-tool-logo" src="assets/brands/chatgpt.png" alt="" width="36" height="36" aria-hidden="true">ChatGPT</h4><p>첨부 자료의 항목과 결과 비교</p><b>근거표 + 검수 기록</b></section><section><span>참고 자료</span><h4 class="clean-tool-brand"><img class="clean-tool-logo" src="assets/brands/gemini.png" alt="" width="36" height="36" aria-hidden="true">Gemini</h4><p>파일을 읽으며 자료 정리</p><b>원문 + 출처</b></section><section><span>구현과 실행</span><h4 class="clean-tool-brand"><img class="clean-tool-logo" src="assets/brands/codex.png" alt="" width="36" height="36" aria-hidden="true">Codex</h4><p>코드와 파일 수정, 실행 확인</p><b>변경 내용 + 실행 결과</b></section></div>
${takeaway('<span>다른 도구에 넘길 때</span><b>목표 → 입력 → 완료 기준 → 출력 파일</b>')}
<p class="clean-note">역할 배분 예시이며 성능 순위가 아닙니다. 대화가 자동으로 이어진다고 가정하지 않습니다. 미확인 항목도 함께 전달합니다.</p>${toolSource}`);

    set('문제 범위 줄이기',`
<p class="clean-lead">첫 사용자가 <b>후보 하나의 채택 또는 보류 이유</b>를 남기면 첫 버전의 끝입니다.</p>
<div class="clean-scope"><section><span>먼저 / 결정에 필요한 기능</span><ol><li><b>근거 대조</b><p>ID와 원문 인용을 함께 보고 오판을 찾기</p></li><li><b>분류 수정</b><p>AI 초안과 내 판단을 구분하고 수정 이유 기록</p></li><li><b>후보 판단</b><p>주제, 채택 또는 보류 이유, 추가 자료 남기기</p></li></ol></section><aside><span>나중 / 근거 확보 후 확장</span><h4>사용법 작성</h4><p>제품 설명서를 확보한 뒤.</p><h4>게시와 성과 추적</h4><p>첫 주제 판단을 확인한 뒤.</p></aside></div>
<p class="clean-note">1주차: 문제와 기준을 MD로 설계 / 2주차: 공유와 보완 / 3주차: MVP 구현</p>`,'첫 버전은 결정 하나를 돕는 데 집중합니다');

    const metricsKey='검증 지표 고르는 법';
    const metricsSource=sourceHTML(all[metricsKey][3]);
    set(metricsKey,`
<div class="clean-metrics"><section><svg viewBox="0 0 64 64" aria-hidden="true"><path d="M8 32L24 48L56 12"/></svg><h4>품질</h4><p>인용 불일치 / 오분류 / 누락</p><div><b>기록</b><span>평가한 건수와 오류 건수</span><b>조건</b><span>원문과 대조 / 빈 원문은 보류</span></div></section><section><svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="24"/><path d="M32 16V32H48"/></svg><h4>시간</h4><p>준비 + 생성 + 검수 + 수정</p><div><b>기록</b><span>완료까지 걸린 전체 시간</span><b>조건</b><span>같은 수량과 난이도 / 수작업 비교</span></div></section><section><svg viewBox="0 0 64 64" aria-hidden="true"><path d="M4 32H56 M40 16L56 32L40 48"/></svg><h4>사용</h4><p>결과가 다음 결정으로 이어지는가</p><div><b>기록</b><span>후보 + 판단 이유 + 추가 확인 자료</span><b>조건</b><span>담당자가 채택 또는 보류를 기록</span></div></section></div>
${takeaway('<b>세 기록을 보고 기능을 유지하거나, 기준과 범위를 고칩니다.</b>')}
<p class="clean-note">샘플 2건은 확인한 범위로만 설명합니다. 고객 문의 감소는 실제 콘텐츠 적용 후 따로 측정합니다.</p>${metricsSource}`,'검증은 품질, 시간, 사용으로 나눕니다');

    all['AI와 일하는 멘탈모델'][1]='MENTAL MODEL / FORMALIZE → COMPARE → VALIDATE';
    set('AI와 일하는 멘탈모델',`
<div class="clean-mental"><section><span>01 / FORMALIZE</span><h4>형식화</h4><p>내가 아는 기준을<br>AI가 적용할 문장으로.</p><div><small>암묵지 → 명시한 규칙</small><b>근거를 인용하고,<br>없으면 보류해.</b></div></section><i aria-hidden="true">→</i><section><span>02 / COMPARE</span><h4>비교와 판단</h4><p>대안과 근거를 비교하고<br>내가 쓸 결과를 선택.</p><div><small>첫 답 → 근거 있는 선택</small><b>다른 해석은?<br>왜 이 방식을 골랐지?</b></div></section><i aria-hidden="true">→</i><section><span>03 / VALIDATE</span><h4>검증과 갱신</h4><p>새 자료에 적용하고<br>틀린 규칙을 고치기.</p><div><small>생성 → 확인한 결과</small><b>정상과 예외 기준 정하기.<br>확인 후 지침을 수정.</b></div></section></div>
${takeaway('<span>포트폴리오에 남길 것</span><b>내 선택의 이유 + 내가 고친 기준 + 확인한 증거</b>')}
<p class="clean-note">먼저 원하는 결과의 조건을 정하고 사실 오류와 내 선호를 구분합니다. 최종 선택과 판단은 내가 합니다.<br>이제 코치와 함께 문제와 기준을 보완해 지침서 MD로 남기고, 이후 실행과 수정 기록을 붙입니다. 이 수업의 학습 모델입니다.</p>`);

    set('과제 코치로 시작',`
<div class="clean-coach"><section><span>5분 30초 / 함께 시작</span><h4>내 프로젝트의 코치</h4><p>AI가 질문하면<br>내 말로 하나씩 답합니다.</p><div class="coach-start-questions"><span>문제 / 누가 무엇 때문에 막히나?</span><span>범위 / 첫 결과 하나는 무엇인가?</span><span>검수 / 언제 쓰고, 언제 보류하나?</span></div></section><section><span>시작 요청 / 내 정보로 바꾸기</span><div class="research-prompt" data-keep-layout><pre>프로젝트 지식의 과제 코치.md를 읽고 수업 모드로 시작해줘.
내 희망 산업은 [산업], 직무는 [직무]야.
[2-6 JD 근거와 6-2 내 메모 붙여넣기]
질문 최대 3개로 문제, 첫 범위, 검수 기준을 좁혀줘.
한 번에 질문 하나씩 하고 내 답을 기다려줘.
이미 답한 것은 다시 묻지 말고 미확인은 남겨줘.</pre><button type="button" class="copy-prompt">요청 복사</button></div></section></div>
${takeaway('<b>시작 30초 → 질문에 답하기 5분</b><small>AI의 제안은 후보입니다. 내가 고른 이유와 확인할 질문을 남깁니다.</small>')}
<p class="clean-note">막히면 “내 직무에 맞는 예시 두 개를 보여줘. 그중 내가 고를게”라고 요청합니다.</p>`,'코치에게 질문받고, 내 문제를 좁혀봅니다');

    set('지침서 작성 양식',`
<div class="coach-class-summary"><section><span>MD 초안 요청</span><div class="research-prompt" data-keep-layout><pre>내 답을 AI 작업 지침서 MD로 정리해줘.
목적과 문제, 입력, 작업 순서, 역할과 판단 기준,
출력 형식, 검수 조건, 출처와 수정 기록을 포함해줘.
답하지 않은 것은 확인 필요로 남겨줘.
선택 이유를 유지하고 새 사실과 성과는 추가하지 마.
1주차_이름_AI작업지침서.md 파일로 제공해줘.</pre><button type="button" class="copy-prompt">요청 복사</button></div></section><section><span>내가 읽고 고칠 세 줄</span><h4>문제</h4><p>[사용자]가 [장면]에서 [불편]을 겪는다.<br>근거: [원문 / 내 경험 / 확인 필요]</p><h4>첫 범위</h4><p>[입력]으로 [결과 하나]를 만든다.<br>이 방식을 고른 이유: [내 판단]</p><h4>검수 기준</h4><p>[통과 조건]이면 쓰고, [예외]면 보류한다.</p></section></div>
${takeaway('<b>2분 / 한 문장을 직접 고치고 MD 초안을 저장합니다.</b><small>내 프로젝트에 초안을 추가합니다. 숙제에서는 같은 대화로 빈 항목을 보완합니다.</small>')}
`,'내 답을 지침서 MD로 만들고 직접 고칩니다');

    const axKey='프로젝트 처리 흐름';
    const axPriorExample=all[axKey][3].replace('1주차 제출 HTML은','1주차 제출 HTML 또는 PDF는');
    all[axKey][1]='AX / AI TRANSFORMATION / WORK REDESIGN';
    set(axKey,`
<p class="ax-definition"><b>AX / AI Transformation</b><span>AI를 활용해 업무와 일하는 방식을 재설계하는 변화.<br>여기서는 <strong>순서, 역할, 다음 단계로 넘길 조건</strong>을 함께 바꿔 봅니다.</span></p>
<div class="ax-work-comparison" role="group" aria-label="리뷰 기반 보고 업무의 기존 흐름과 AX 재설계 예시">
<div class="ax-work-row ax-work-before"><div class="ax-row-label"><b>기존 흐름</b><span>완성 후 검토</span></div><ol><li><span>사람</span><b>자료 읽기</b></li><li><span>사람</span><b>분류와 정리</b></li><li><span>사람</span><b>보고서 작성</b></li><li><span>사람</span><b>완성본 검토</b></li></ol></div>
<div class="ax-work-row ax-work-after"><div class="ax-row-label"><b>AX 재설계</b><span>기준부터 합의</span></div><ol><li><span>사람</span><b>목적과 기준<br>먼저 확정</b></li><li><span>규칙 + AI</span><b>입력 확인<br>근거와 초안</b></li><li><span>사람</span><b>근거와 예외<br>중간 검토</b></li><li><span>AI + 사람 승인</span><b>확정 내용 반영<br>최종 보고서</b></li></ol></div>
</div>
<div class="ax-work-insight"><b>검토를 앞당기고, 초안과 판단의 역할을 나눕니다.</b><span>근거 부족 → 보류와 자료 보완. 다음 단계는 정한 검수 조건을 통과한 뒤 진행합니다.</span></div>
<div class="ax-work-detail"><span>리뷰 기반 보고 업무의 수업용 재설계 예시 / 효과는 실행 후 검증</span><button type="button" class="clean-detail-button" data-open-detail="ax-review-flow-detail">리뷰 과제 처리 흐름 보기 ↗</button></div>
${sources('https://learn.microsoft.com/en-us/agents/adoption-maturity-model/maturity-model-business-process','Microsoft Learn / 업무 재설계와 사람-AI 협업','공식 문서의 업무 재설계 관점을 요약. 위 전후 도식은 수업용 적용 예시입니다.')}
${modal('ax-review-flow-detail','리뷰 과제 / 입력, 근거 검수, 주제 결정',axPriorExample)}
`,'AX는 일의 순서와 역할을 어떻게 바꾸나요?');

    const diamondKey='문제와 해결책의 차이';
    all[diamondKey][2]='AX로 바꿀 업무, 어떤 문제부터 고를까요?';
    all[diamondKey][3]=all[diamondKey][3]
      .replace('지금 할 일 / 첫 다이아몬드','먼저 / 어떤 문제를 바꿀까?')
      .replace('그다음 / 두 번째 다이아몬드','그다음 / 어떻게 바꿀까?')
      .replace('콘텐츠 담당자가 주제를 정할 때 리뷰를 다시 읽는다는 가설부터 확인합니다.','다음: 확인한 사실과 문제 가설을 나누고, 현재 업무의 시작과 끝을 그립니다.')
      .replace('문제 문장과 리뷰 예시는 수업용 적용입니다.','문제 정의 양식과 AX 연결 설명은 수업용 적용입니다.');
    window.WEEK1_NAV_LABELS[axKey]='AX / 일의 순서와 역할';
    window.WEEK1_NAV_LABELS[diamondKey]='어떤 문제부터 바꿀까요?';

    // Sequence review: evidence and current work precede evaluation and execution design.
    all['사실과 가설 구분'][2]='내 문제는 확인한 사실인가요, 아직 가설인가요?';
    all['자동화 후보 평가 프레임'][3]=all['자동화 후보 평가 프레임'][3].replace(
      '공식 원본 도식과 해당 문서의 평가 항목 요약 / 확인 2026.10.07',
      'AI 에이전트 후보 평가의 공식 자료. 수업에서는 세 평가 영역으로 내 과제 후보를 비교합니다.');

    const exerciseRoot=document.createElement('div');
    exerciseRoot.innerHTML=all['내 문제 좁히기 실습'][3];
    exerciseRoot.querySelector('.journey-practice-strip span').textContent='2-6 기록을 가져와 문제, 범위, 검수 기준으로 보완하세요.';
    exerciseRoot.querySelector('.journey-practice-strip').insertAdjacentHTML('beforeend','<button type="button" class="clean-detail-button" data-open-detail="problem-worked-example">완성 예시 보기 ↗</button>');
    all['내 문제 좁히기 실습'][3]=exerciseRoot.innerHTML+modal('problem-worked-example','완성 예시 / 내 과제로 바꾸기',`
<div class="sequence-worked-example"><section><span>01 / 무엇을 개선?</span><p>콘텐츠 담당자의 사용 안내 주제 선택을 돕습니다. 합성 R01에는 “세척 순서를 몰라”가 있으며, 실제 업무의 불편은 담당자 확인이 필요합니다.</p></section><section><span>02 / 어떤 방식?</span><p>리뷰 3건을 AI로 분류하고 원문 인용을 붙입니다. 사람이 대조한 뒤 주제 후보 1개를 채택하거나 보류합니다.</p></section><section><span>03 / 무엇으로 확인?</span><p>정상 R01은 사용 안내로 분류하고 원문을 인용합니다. 빈 원문은 보류하며, 설명서 없이는 실제 세척법을 작성하지 않습니다.</p></section></div><p class="clean-note">수업용 설계 예시입니다. 먼저 사용자나 입력 한 가지를 바꿔 말한 뒤, 내 JD에 맞는 세 문장으로 고칩니다.</p>`);

    const draftRoot=document.createElement('div');
    draftRoot.innerHTML=all['시연 AI 초안'][3];
    const draftTable=draftRoot.querySelector('table');
    const draftRows=[...draftTable.querySelectorAll('tbody tr')];
    const evidence=['처음 켰는데 세척 순서를 몰라 설명서를 다시 찾았어요.','맛은 괜찮은데 쓰고 난 필터를 어떻게 버리는지 모르겠어요.','선물로 샀어요. 포장은 예뻤는데 배송 예정일 안내가 없었어요.'];
    draftTable.querySelectorAll('thead th')[2].textContent='리뷰 원문';
    draftRows.forEach((row,i)=>row.querySelectorAll('td')[2].textContent=evidence[i]);
    draftRoot.querySelector('.strategy-takeaway,.research-note').outerHTML='<div class="clean-detail-line"><span><b>20초 판단 / 오판 한 군데 + 고칠 기준 한 줄</b><br>교육용 오류 예시입니다. 실제 모델 실행 로그가 아닙니다.</span><button type="button" class="clean-detail-button" data-open-detail="demo-review-answer">판단 후 해설 보기 ↗</button></div>';
    all['시연 AI 초안'][3]=draftRoot.innerHTML+modal('demo-review-answer','원문 대조 / 판단 후 확인',`<div class="sequence-worked-example"><section><span>R01</span><p>고객이 이탈했다는 근거는 없습니다. 세척 순서를 모른다는 불편만 남깁니다.</p></section><section><span>R02</span><p>“맛은 괜찮은데”라고 씁니다. 불편은 필터 처리 방법입니다.</p></section><section><span>R03</span><p>배송 지연이 아니라 예정일 안내가 없다는 뜻입니다.</p></section></div>`);

    all['시연 수정 결과'][3]=all['시연 수정 결과'][3].replace(/<div class="(?:strategy-takeaway|research-note)">[\s\S]*?<\/div>/,'<div class="research-note">교육용 판단: <b>세척 순서 안내 후보 → 설명서 확인 전 보류</b><br>리뷰는 불편의 근거. 실제 세척법은 제품 설명서에서 확인합니다.</div>');
    all['강사 시연 시작'][3]=all['강사 시연 시작'][3]
      .replace('준비 / 2분','준비 / 1분').replace('실행 / 4분','실행과 대조 / 3분').replace('수정 / 3분','수정과 판단 / 2분')
      .replace('시연 중 나온 실제 출력을 화면으로 확인합니다. 뒤의 오류 예시는 결과가 모두 맞았을 때도 검수 기준을 설명하기 위한 보조 자료입니다.','시연 6분 → 새 자료 개인 판단 2분 → 검증과 회고 1분.<br>실제 출력이 맞으면 오류를 꾸미지 않습니다. 뒤의 오류 표는 교육용 보조 자료입니다.');

    all['Claude 웹 실습 경로'][2]='숙제를 여기서 함께 시작해볼까요?';
    all['Claude 웹 실습 경로'][3]=all['Claude 웹 실습 경로'][3].replace(
      'Claude 웹의 새 대화에서 끝낼 수 있습니다. 다음 주에는 이 지침을 바탕으로 실행을 확장합니다.',
      '수업에서 MD 초안까지 만들고, 숙제에서 보완해 HTML 또는 PDF와 함께 제출합니다.<br>작은 CSV 실행은 선택. 다음 주에는 이 지침으로 실행을 확장합니다.');
    all['Claude 웹에 파일 첨부'][1]='OPTIONAL / AFTER YOUR INSTRUCTION DRAFT';
    all['Claude 웹에 파일 첨부'][2]='선택: 지침을 저장했다면 작은 입력으로 시험합니다';
    all['Claude 웹에 파일 첨부'][3]=all['Claude 웹에 파일 첨부'][3].replace(
      'AI 작업 지침서.md + reviews.csv<br>웹에서는 필요한 파일을 직접 첨부합니다.',
      'AI 작업 지침서.md + <a href="assets/demo/reviews.csv" download>reviews.csv 내려받기 ↗</a><br>시험용 사본에 R06 빈 원문을 추가합니다.').replace(
      '“지침에 따라 정상 1건과 예외 1건을<br>처리해줘.” 인용과 보류 이유를 대조합니다.',
      '정상 R01과 빈 원문 R06을 처리 요청.<br>인용과 보류 이유를 대조합니다.<br>R04와 R05는 새 자료 확인용으로 남깁니다.').replace(
      '읽기 확인 → 실행','선택 실행').replace('못 읽은 파일은 텍스트로 전달하는 등 입력을 보완합니다. 읽었다고 가정해서 다음 단계로 넘어가지 않습니다.','필수 제출 조건은 아닙니다. 파일을 못 읽으면 텍스트로 보완합니다.').replace('<span>화면의 차트는 공급사의 예시입니다. 우리 실습에서는 MD와 CSV를 첨부합니다.</span>','');
    const projectKey='Projects로 맥락 관리';
    const projectRoot=document.createElement('div');projectRoot.innerHTML=all[projectKey][3];
    projectRoot.querySelector('ol').innerHTML=`<li><b>내 프로젝트 열기</b><p><a href="https://claude.ai/projects" target="_blank" rel="noopener">Claude Projects 열기 ↗</a><br>없다면 + New Project로 생성.</p></li><li><b>첫 MD 내려받아 넣기</b><p><a href="assets/demo/과제 코치.md" download="과제 코치.md">과제 코치.md 내려받기 ↓</a><br>프로젝트 지식의 + 버튼으로 추가.</p></li><li><b>프로젝트 지침 저장</b><div class="research-prompt" data-keep-layout><pre>과제 코치.md를 따라 진행해줘.
질문 하나씩 하고 내 답을 기다려줘.
미확인은 확인 필요로 남겨줘.</pre><button type="button" class="copy-prompt">지침 복사</button></div></li>`;
    projectRoot.querySelector('.ui-task-strip').innerHTML='<b>04 / 프로젝트 안에서 새 대화</b><span>다음 페이지의 시작 요청을 보내고, 코치의 첫 질문에 답합니다.</span>';
    projectRoot.querySelector('.case-sources span').remove();
    all[projectKey][1]='FIRST MD / DOWNLOAD → PROJECT → RUN';
    set(projectKey,projectRoot.innerHTML,'첫 MD를 내 Claude 프로젝트에 넣어볼까요?');
    all['처음 시작하는 사람의 Q&A'][3]=all['처음 시작하는 사람의 Q&A'][3]
      .replace('제공된 자료로 한 번 실행하고, 내가 고친 기준 한 줄부터 남깁니다.','이번 주에는 내 문제와 기준을 문서로 정합니다. 작은 실행은 선택이며, 실행했다면 수정 기록도 남깁니다.')
      .replace('원문 한 건 대조','문제의 근거 확인').replace('리뷰 예시의 분류와 인용을<br>직접 읽고 맞는지 확인','JD에서 고른 업무와<br>내 과제의 연결을 확인');
    Object.assign(window.WEEK1_NAV_LABELS,{
      '사실과 가설 구분':'사실과 가설 구분',
      '단계별 역할 배분':'AI 작업 연결과 검수',
      'Claude 웹에 파일 첨부':'선택 / 작은 입력 시험',
      'Projects로 맥락 관리':'첫 MD / 내 프로젝트에 넣기'
    });

    all['현재 업무 단계 나누기'][3]=all['현재 업무 단계 나누기'][3].replace('ASQ는 상세 흐름도에 앞서, 현재 업무의 시작과 끝을 정하도록 설명합니다.','예: 리뷰 → 담당자가 읽고 분류 → 다음 콘텐츠 주제 선택').replace('업무 경계 정하기 → 7개 구성 요소 채우기 → 관계자와 빠진 내용 검토하기','30초 / 입력 → 현재 작업 → 결과를 내 업무로 채우기.');
    all['자동화 후보 평가 프레임'][3]=all['자동화 후보 평가 프레임'][3].replace('AI 에이전트 후보 평가의 공식 자료. 수업에서는 세 평가 영역으로 내 과제 후보를 비교합니다.','30초 / 내 후보의 가장 불확실한 영역 하나 고르기. 리뷰 분류라면: 사용자 필요는 확인했나? 원문을 구할 수 있나? 실제 효과는 아직 가설.');
    all['사실과 가설 구분'][3]=all['사실과 가설 구분'][3].replace('합성 R01에 세척 순서를 모른다는 표현이 있다','합성 R01: “세척 순서를 몰라 설명서를 다시 찾았어요.”');
    all['프로젝트에서 지원서까지'][3]=all['프로젝트에서 지원서까지'][3].replace('채용공고(JD)','채용공고(JD: Job Description)');
    all['마케팅 JD 원문'][3]=all['마케팅 JD 원문'][3].replace('JD 원문','채용공고(JD) 원문');
    all['처음 시작하는 사람의 Q&A'][3]=all['처음 시작하는 사람의 Q&A'][3].replace('내 질문을 남길 때: 현재 단계 / 첨부 자료 / 기대 결과 / 실제 막힌 곳','마지막 20초 / 시작할 때의 막막함 → 지금 고른 문제와 확인 기준 한 줄');
    const redundant=['AI로 해결한 현업 사례','최종 산출물 묶음'];
    for(const slide of document.querySelectorAll('.stage > .slide'))if(redundant.includes(slide.dataset.title))slide.remove();
    Object.assign(window.WEEK1_NAV_LABELS,{
      '케이스 스터디 사고 흐름':'케이스 / 문제, 선택, 검증',
      '모델을 고르는 기준':'같은 과제로 모델 비교',
      'AI와 일하는 멘탈모델':'AI는 딸깍이 아니다',
      '과제 코치로 시작':'코치와 함께 질문하고 답하기'
    });
  };

  document.addEventListener('click',event=>{
    const opener=event.target.closest('[data-open-detail]');
    if(opener){document.getElementById(opener.dataset.openDetail)?.showModal();return;}
    const close=event.target.closest('[data-close-detail]');
    if(close)close.closest('dialog').close();
  });
  document.addEventListener('DOMContentLoaded',()=>{
    for(const dialog of document.querySelectorAll('.clean-detail-dialog'))dialog.addEventListener('keydown',event=>event.stopPropagation());
  });
})();
