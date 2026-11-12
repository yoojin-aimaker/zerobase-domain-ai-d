(() => {
  const note=t=>`<div class="research-note">${t}</div>`;
  const sc=(tag,title,body)=>['research',tag,title,body];
  const trio=items=>`<div class="applied-trio">${items.map((a,i)=>`<section><span>0${i+1} / ${a[0]}</span><h4>${a[1]}</h4><p>${a[2]}</p></section>`).join('')}</div>`;
  const prompt=t=>`<div class="research-prompt"><pre>${t}</pre><button class="copy-prompt">요청 복사</button></div>`;
  const scenes={
    '최종 산출물 묶음':sc('OUTPUT / INSTRUCTIONS.MD','오늘의 최종 원본은 내 AI 작업 지침서입니다',trio([['문제와 자료','왜, 무엇을 다룰까','희망 직무, 사용자, 문제 근거와 입력 자료를 적습니다.'],['작업 지침','어떻게 처리할까','처리 순서, AI와 규칙 및 사람의 역할, 출력 형식을 정합니다.'],['검수와 완료','언제 쓸 수 있을까','근거 대조, 예외 처리, 보류 조건과 완료 기준을 적습니다.']])+note('이 내용을 .md 원본으로 저장하고, 같은 내용을 HTML 문서로 변환해 제출합니다. 시연 결과표는 지침을 구체화하는 참고 자료입니다.')),
    '과제 코치로 시작':sc('PRACTICE / START WITH A MARKDOWN FILE','과제 코치.md를 처음 첨부하고 대화를 시작합니다',trio([['파일 받기','과제 코치.md','아래 파일을 내려받아 Claude의 새 대화에 첨부합니다.'],['시작하기','“1주차 과제를 시작해줘”','희망 산업과 직무 또는 현재 업무를 알려주고, 한 번에 하나씩 질문에 답합니다.'],['내 판단 남기기','문제와 범위를 선택','코치의 후보를 검토하고 선택 이유를 적습니다. 경험이 없어도 공개 자료에서 시작합니다.']])+`<p class="research-links"><a href="assets/demo/과제 코치.md" download>과제 코치.md 내려받기 ↗</a></p>`+note('코치 MD는 대화를 이끄는 지침입니다. 이 파일 자체를 제출하는 것이 아니라 내 프로젝트 지침서를 따로 만듭니다.')),
    'MD 기준 직접 고치기':sc('PRACTICE / CHANGE ONE INSTRUCTION','한 문장을 바꾸면 코칭의 진행 기준도 달라집니다',`<div class="timing-paths"><section><span>원래 지침</span><h4>첫 결과물은 하나로 좁힌다</h4><p>내 업무에서 작은 작업 하나를 선택하도록 돕습니다.</p></section><section><span>수정 실험</span><h4>후보 두 개를 비교한 뒤 하나를 선택하게 한다</h4><p>수정본을 새 대화에 넣고 같은 입력으로 시작합니다.<br>바꾼 기준과 응답의 차이를 짧게 기록합니다.</p></section></div>`+note('MD는 제목과 목록으로 구조를 표현하는 텍스트 파일입니다. 첨부만으로 프로그램이 실행되는 것은 아니며 응답은 실행마다 달라질 수 있습니다.')),
    '지침서 작성 양식':sc('WORKBOOK / WRITE MY INSTRUCTIONS','정리한 과제를 AI가 따를 지침으로 씁니다',prompt(`# [프로젝트명] AI 작업 지침서
## 목적과 입력
- 사용자의 문제, 근거와 사용할 자료
## 작업과 결과
- 처리 순서, 판단 기준, 출력의 필수 항목
- 규칙 / AI / 사람이 맡을 일
## 검수와 예외
- 정상 사례, 보류 조건과 하지 않을 일
- 완료 기준, 출처와 내가 수정한 이유`)+`<p class="research-links"><a href="assets/demo/instructions-template.md" download>전체 MD 양식 ↗</a><a href="assets/demo/instructions-example.md" download>완성 예시 MD ↗</a></p>`+note('“잘 분석해줘” 대신 따를 규칙을 적습니다. 모르는 사실과 아직 실행하지 않은 검증은 확인 필요 또는 계획으로 남깁니다.')),
    'MD를 HTML로 변환':sc('SUBMISSION / SAME CONTENT, READABLE FORMAT','지침서 MD를 읽기 좋은 HTML 문서로 바꿉니다',prompt(`첨부한 AI 작업 지침서 MD를 단일 HTML 문서로 만들어줘.
모든 내용과 출처, 가설, 확인 필요 표시를 그대로 유지해.
밝은 배경, 적절한 글자 크기와 여백으로 읽기 쉽게 구성해.
제목과 작업 순서, 검수 조건을 분명하게 구분해.
외부 폰트, 서버와 API 없이 브라우저에서 열리게 해.
가짜 AI 실행 버튼이나 원문에 없는 성과는 넣지 마.
1주차_이름_AI작업지침서.html 파일로 제공해줘.`)+note('Claude에서 변환하거나 워크북의 HTML 내려받기를 사용합니다. HTML은 같은 지침서를 보여주는 제출 문서입니다.')),
    'HTML 제출 전 점검':sc('CHECK / OPEN THE FILE','파일을 직접 열어 내용과 접근 권한을 확인합니다',trio([['내용','MD와 같은가','문제, 자료, 규칙, 검수 기준과 출처가 빠지지 않았는지 대조합니다.'],['화면','읽을 수 있는가','HTML을 브라우저에서 열어 글자, 잘림과 빈칸을 확인합니다.'],['제출','강사가 열 수 있는가','HTML과 MD를 제출 폴더에 올리고 안내된 강사 계정을 편집자로 초대합니다.']])+note('제출 관리 시트의 1주차 본인 행에 폴더 링크와 제출일을 적습니다. 파일명: 1주차_이름_AI작업지침서.html / 같은 이름의 .md 원본.')),
    '1주차 숙제':sc('HOMEWORK / WEEK 01','내 지침서 MD를 만들고 HTML로 제출합니다',trio([['시작','과제 코치.md 사용','내 산업과 직무에서 문제 하나를 고릅니다. 코치 지침을 한 문장 수정해봅니다.'],['작성','내 AI 작업 지침서.md','입력, 처리 순서, 역할, 결과와 검수 기준을 정리합니다.'],['제출','같은 내용의 .html','HTML을 열어 확인하고 제출합니다. 수정 가능한 MD 원본을 함께 보관합니다.']])+note('다음 주에는 이 지침을 바탕으로 작은 실행과 연결 구현을 진행합니다. 1주차에는 사이트 배포가 필요하지 않습니다.'))
  };
  const base=window.prepareMarketSlides;
  window.prepareMarketSlides=()=>{
    base();Object.assign(window.THEORY_SCENES,scenes);
    const stage=document.querySelector('.stage');
    const rename={'브리프 완성 예시':'문제 정의 메모','브리프 작성 양식':'지침서 작성 양식','중간 실습과 제출':'MD를 HTML로 변환','제출 전 점검':'HTML 제출 전 점검'};
    for(const s of stage.querySelectorAll('.slide')){const title=rename[s.dataset.title];if(title){if(!scenes[title])window.THEORY_SCENES[title]=window.THEORY_SCENES[s.dataset.title];s.dataset.title=title;}}
    const before=[...stage.children].find(s=>s.dataset.title==='프로젝트 선택 기준');
    for(const title of ['과제 코치로 시작','MD 기준 직접 고치기']){const s=document.createElement('article');s.className='slide';s.dataset.title=title;stage.insertBefore(s,before);}
    const memo=window.THEORY_SCENES['문제 정의 메모'];memo[2]='정한 문제와 첫 작업을 지침서 작성 전 메모합니다';
  };
})();
