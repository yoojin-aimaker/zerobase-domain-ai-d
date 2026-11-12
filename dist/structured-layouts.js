/* Map teaching relationships to presentation layouts without dropping source text. */
(() => {
  const el = (tag, cls, content='') => `<${tag} class="${cls}">${content}</${tag}>`;
  const label = s => el('span','structure-label',s);
  const arrow = () => '<span class="structure-arrow" aria-hidden="true">→</span>';
  const tableModes = {
    '공고를 역량으로 읽는 법':'derive', '산업 조사에서 볼 자료':'sources',
    '산업별 주제 바꾸기':'lanes', '주제 후보 비교':'decision',
    '사실과 가설 구분':'evidence', 'AI와 규칙의 역할':'roles',
    '검증 지표 고르는 법':'metrics', '왜 AI를 선택했나':'causal',
    'AI 적용 방식 선택':'methods', '시연 분류 기준':'classification',
    '시연 AI 초안':'review', '시연 수정 결과':'revision',
    '자료 확보 판단':'access', '기존 방식과 비교':'comparison',
    '문제 정의 메모':'filled-brief', '브리프 완성 예시':'filled-brief', '브리프 작성 양식':'worksheet'
  };
  const diagram = (mode) => {
    if(mode===0) return '<div class="method-mini"><span>자료</span><i>→</i><b>AI</b><i>→</i><span>검토</span></div>';
    if(mode===1) return '<div class="method-mini"><span>입력</span><i>→</i><b>분류</b><i>→</i><span>검수</span></div>';
    return '<div class="method-mini method-branch"><span>도구 A</span><i>↔</i><b>AI 판단</b><i>↔</i><span>도구 B</span></div>';
  };
  function renderTable(mode,heads,rows) {
    if(mode==='derive') return `<div class="structure-derive"><div class="derive-inputs">${rows.slice(0,2).map(r=>`<section>${label(r[0])}<h4>${r[2]}</h4><p>${r[1]}</p></section>`).join('')}</div>${arrow()}<section class="derive-output">${label(rows[2][0])}<h4>${rows[2][2]}</h4><p>${rows[2][1]}</p></section></div>`;
    if(mode==='sources') return `<div class="structure-sources">${rows.map((r,i)=>`<section><div class="source-tab">SOURCE 0${i+1}</div><h4>${r[0]}</h4><div class="source-lines"><p>${label(heads[1])}${r[1]}</p><p>${label(heads[2])}<strong>${r[2]}</strong></p></div></section>`).join('')}</div>`;
    if(mode==='decision'||mode==='access') return `<div class="structure-decisions">${rows.map((r,i)=>`<section class="decision-row ${i===0?'decision-selected':''}"><div><span class="decision-marker">${mode==='decision'?(i===0?'✓':i===1?'Ⅱ':'—'):String(i+1).padStart(2,'0')}</span><h4>${r[0]}</h4></div><p>${r[1]}</p><p class="decision-result">${r[2]}</p></section>`).join('')}</div>`;
    if(mode==='evidence') return `<div class="structure-evidence">${rows.map((r,i)=>`<section><div class="evidence-level"><span>0${i+1}</span><h4>${r[0]}</h4></div><div class="evidence-claim"><p>${r[1]}</p><div>${label(heads[2])}<strong>${r[2]}</strong></div></div></section>`).join('')}</div>`;
    if(mode==='metrics') return `<div class="structure-metrics">${rows.map((r,i)=>`<section><span class="metric-index">0${i+1}</span><div><h4>${r[0]}</h4><p class="metric-formula">${r[1]}</p></div><aside>${label('측정 조건')}<p>${r[2]}</p></aside></section>`).join('')}</div>`;
    if(mode==='causal') return `<div class="structure-causal"><div class="causal-head">${heads.map(h=>label(h)).join('')}</div>${rows.map(r=>`<section><p>${r[0]}</p>${arrow()}<strong>${r[1]}</strong>${arrow()}<p>${r[2]}</p></section>`).join('')}</div>`;
    if(mode==='methods') return `<div class="structure-methods">${rows.map((r,i)=>`<section><div>${label('선택 조건')}<h4>${r[0]}</h4><p>${r[1]}</p></div><div>${diagram(i)}<p>${r[2]}</p></div></section>`).join('')}</div>`;
    if(mode==='classification') return `<div class="structure-categories">${rows.map((r,i)=>`<section><span class="category-no">0${i+1}</span><div><h4>${r[0]}</h4><p>${r[1]}</p></div><div class="category-example">${label('적용 예시')}${r[2]}</div></section>`).join('')}</div>`;
    if(mode==='review'||mode==='revision') return `<div class="structure-review ${mode}"><div class="review-head">${heads.map(h=>label(h)).join('')}</div>${rows.map(r=>`<section><b>${r[0]}</b><p class="review-value">${r[1]}</p><p class="review-reason">${label(mode==='review'?heads[2]:'수정 판단')}${r[2]}</p></section>`).join('')}</div>`;
    if(mode==='comparison') return `<div class="structure-comparison"><div class="comparison-condition">${label(heads[0]+': '+rows[0][0])}<strong>${rows[0][1]} / ${rows[0][2]}</strong></div><div class="comparison-columns">${[1,2].map(col=>`<section>${label(heads[col])}${rows.slice(1).map(r=>`<div><h4>${r[0]}</h4><p>${r[col]}</p></div>`).join('')}</section>`).join('')}</div></div>`;
    if(mode==='filled-brief'||mode==='worksheet') return `<div class="structure-brief ${mode}"><div class="brief-document-bar"><b>PROJECT BRIEF</b><span>${mode==='worksheet'?'내 프로젝트에 적용':'작성 예시 / 합성 자료'}</span></div><div class="brief-document-columns">${heads.map((h,i)=>`<section>${label('0'+(i+1))}<h4>${h}</h4>${rows.map(r=>`<p>${r[i]}</p>${mode==='worksheet'?'<div class="writing-line"></div>':''}`).join('')}</section>`).join('')}</div></div>`;
    return `<div class="structure-lanes ${mode}"><div class="lane-head">${heads.map(h=>label(h)).join('')}</div>${rows.map((r,i)=>`<section><h4>${r[0]}</h4><p>${r[1]}</p><p class="lane-outcome">${r[2]}</p></section>`).join('')}</div>`;
  }
  window.structureLectureBody=(title,body)=>{
    const root=document.createElement('div');root.innerHTML=body;
    const table=root.querySelector('.evidence-table'),mode=tableModes[title];
    let name='';
    if(table&&mode){
      const heads=[...table.querySelectorAll('th')].map(e=>e.innerHTML);
      const rows=[...table.querySelectorAll('tbody tr')].map(tr=>[...tr.children].map(e=>e.innerHTML));
      table.outerHTML=renderTable(mode,heads,rows);name=mode;
    }
    const pair=root.querySelector('.research-pair');
    if(pair){pair.className='structure-pair';pair.insertAdjacentHTML('beforeend','<span class="pair-transition" aria-hidden="true">→</span>');name='contrast';}
    const prompt=root.querySelector('.research-prompt');
    if(prompt&&!prompt.hasAttribute('data-keep-layout')&&!['CSV를 AI에 전달하기','Code에 폴더 연결'].includes(title)){
      const notes=title==='지침서 작성 양식'?[['입력','정한 문제와 확보할 자료'],['규칙','AI가 따를 처리 기준'],['검수','완료와 보류 조건']]:title==='MD를 HTML로 변환'?[['원본','완성한 지침서 MD'],['변환','내용을 유지한 HTML'],['확인','원본과 결과 문서 대조']]:title==='내 업무를 인터뷰하는 요청'?[['입력','내 산업, 직무와 실제 업무'],['진행','한 번에 하나씩 질문'],['확인','사실과 추정을 분리']]:title==='시연 수정 요청'?[['입력','실제 응답과 원문'],['수정','틀린 행과 근거를 지목'],['확인','수정하지 않은 행도 재검수']]:title==='JD 역추출 요청'?[['입력','회사와 직무, JD 원문'],['구분','명시된 요구와 AI의 해석'],['출력','과제 후보와 확인할 증거']]:[['입력','리뷰 원문과 분류 기준'],['처리','근거 인용과 모호한 항목 보류'],['출력','사람이 검수할 분류표']];
      prompt.classList.add('structured-prompt');
      prompt.insertAdjacentHTML('afterbegin','<div class="structured-prompt-bar">'+label(title==='내 업무를 인터뷰하는 요청'?'업무 인터뷰 → 현재 흐름':title==='시연 수정 요청'?'원문 대조 → 수정 요청':title==='JD 역추출 요청'?'JD → 업무와 역량':'설계 → 첫 실행 요청')+'</div>');
      prompt.outerHTML=`<div class="structure-prompt-layout">${prompt.outerHTML}<aside>${notes.map((n,i)=>`<section><span>0${i+1} / ${n[0]}</span><p>${n[1]}</p></section>`).join('')}</aside></div>`;name='annotated-prompt';
    }
    const steps=root.querySelector('.research-steps');
    if(steps){
      if(title==='포트폴리오 서술 완성 예시')steps.className='structure-narrative';
      else if(title==='1주차 숙제'||title==='프로젝트 선택 기준')steps.className='structure-checklist';
      else steps.className='structure-principles';
      name=steps.className;
    }
    const reviews=root.querySelector('.review-lines');
    if(reviews){reviews.className='structure-quotes';name='source-excerpts';}
    if(name)root.querySelector(':scope > div')?.setAttribute('data-template',name);
    return {body:root.innerHTML,name};
  };
})();
