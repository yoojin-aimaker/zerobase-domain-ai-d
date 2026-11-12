(() => {
  const data=window.D_WEEK1_COURSE;
  const input=document.querySelector('#markdown');
  if(!data||!input)return;
  const ids=Object.keys(data.roles);
  const selected=new URLSearchParams(location.search).get('role');
  let role=ids.includes(selected)?selected:'md';
  let lastGenerated=input.value;
  const controls=document.createElement('div');
  controls.className='template-links';
  controls.setAttribute('aria-label','작성 양식의 직무 선택');
  for(const id of ids){
    const button=document.createElement('button');button.type='button';button.className='button';
    button.textContent=data.roles[id].short+' 양식';button.dataset.workbookRole=id;
    button.onclick=()=>{role=id;apply(false);};controls.append(button);
  }
  document.querySelector('.editor-heading').append(controls);
  const files={
    '과제 코치.md':'week1-coach.md',
    'instructions-template.md':'week1-template.md',
    'instructions-example.md':'week1-example.md',
    'jd-mini-practice.md':'week1-jd.md',
    'ai-practice-reference.md':'week1-handoff.md',
  };
  document.querySelectorAll('a[href]').forEach(link=>{
    const name=decodeURIComponent(link.getAttribute('href').split('/').pop());
    if(files[name])link.dataset.roleFile=files[name];
  });
  function apply(initial){
    const untouched=input.value===lastGenerated;
    if(initial||untouched){
      input.value=data.files[role]['week1-template.md'];
      input.defaultValue=input.value;lastGenerated=input.value;
      if(!initial)document.querySelector('#refresh').click();
    }
    document.querySelectorAll('[data-role-file]').forEach(link=>{
      link.href='role-kits/'+role+'/'+link.dataset.roleFile;
      if(link.dataset.roleFile==='week1-example.md')link.textContent='설계 구성 예시 받기';
    });
    document.querySelectorAll('[data-workbook-role]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.workbookRole===role)));
    const back=document.querySelector('a[href^="week1_deck.html"]');if(back)back.href='week1_deck.html?role='+role;
    const status=document.querySelector('#status');if(status)status.textContent=data.roles[role].name+' 자료를 선택했습니다.'+(!untouched&&!initial?' 작성 중인 문서는 유지했습니다. 새 양식은 다운로드해 확인하세요.':' 이 양식에서 내 근거와 판단을 직접 작성하세요.');
    const url=new URL(location.href);url.searchParams.set('role',role);history.replaceState(null,'',url);
  }
  apply(true);
})();
