/* Home navigation uses the published deck's chapter order and slide hashes. */
(() => {
  const nav=document.querySelector('.top .nav');
  if(!nav)return;
  const header=nav.closest('.top'),links=[...nav.querySelectorAll('a')];
  nav.classList.add('course-nav');
  const panel=document.createElement('section');
  panel.id='course-navigation';panel.className='course-menu';panel.hidden=true;
  panel.setAttribute('aria-label','전체 강의 메뉴');
  header.append(panel);
  const data=fetch('course-navigation.json?v=20261007-remove-portfolio-chapter').then(r=>{if(!r.ok)throw Error('navigation');return r.json();}).catch(()=>null);
  let current=null,revision=0;
  const node=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text)e.textContent=text;return e;};
  const anchor=(href,text,cls)=>{const a=node('a',cls,text);a.href=href;return a;};
  function close(){revision++;panel.hidden=true;current?.setAttribute('aria-expanded','false');current=null;}
  async function open(button,week,href){
    const ticket=++revision;
    current?.setAttribute('aria-expanded','false');current=button;button.setAttribute('aria-expanded','true');
    panel.replaceChildren();panel.hidden=false;
    panel.style.maxHeight=Math.max(160,innerHeight-panel.getBoundingClientRect().top-16)+'px';
    const head=node('div','course-menu-head');
    const title=node('h2','',week+'주차 / 전체 메뉴');head.append(title,anchor(href,'강의 첫 페이지 →','course-menu-start'));if(week===4)head.append(anchor('week4_practice.html','화면별 실습 가이드 →','course-menu-start'));
    const dismiss=node('button','course-menu-close','닫기');dismiss.type='button';dismiss.onclick=()=>{const target=current;close();target?.focus();};head.append(dismiss);panel.append(head);
    const body=node('div','course-menu-body');panel.append(body);
    if(week===4){
      const grid=node('div','course-menu-grid');
      const groups=[{"title": "1. 발표와 검증", "items": [{"number": "01", "label": "프로젝트 발표와 다음 단계", "href": "week4_deck.html#slide-1"}, {"number": "02", "label": "오늘 남길 것", "href": "week4_deck.html#slide-2"}, {"number": "03", "label": "제출물과 발표의 기준", "href": "week4_deck.html#slide-3"}, {"number": "04", "label": "5분 발표의 이야기 순서", "href": "week4_deck.html#slide-4"}, {"number": "05", "label": "문제를 설명하는 한 문장", "href": "week4_deck.html#slide-5"}, {"number": "06", "label": "AI의 역할과 규칙의 역할", "href": "week4_deck.html#slide-6"}, {"number": "07", "label": "내가 판단하고 책임진 부분", "href": "week4_deck.html#slide-7"}, {"number": "08", "label": "주장을 뒷받침하는 근거", "href": "week4_deck.html#slide-8"}, {"number": "09", "label": "검증한 범위와 남은 한계", "href": "week4_deck.html#slide-9"}]}, {"title": "2. 배포와 MCP", "items": [{"number": "10", "label": "배포와 실행 환경", "href": "week4_deck.html#slide-10"}, {"number": "11", "label": "안전한 미리보기와 접근 확인", "href": "week4_deck.html#slide-11"}, {"number": "12", "label": "파일과 API와 MCP의 역할", "href": "week4_deck.html#slide-12"}, {"number": "13", "label": "MCP 연결과 실제 조회의 구분", "href": "week4_deck.html#slide-13"}, {"number": "14", "label": "공개 문서로 MCP 조회 확인", "href": "week4_deck.html#slide-14"}, {"number": "15", "label": "내 프로젝트 적용 계획", "href": "week4_deck.html#slide-15"}]}, {"title": "3. 시연과 프로젝트 발표", "items": [{"number": "16", "label": "핵심 기능 시연의 한 장면", "href": "week4_deck.html#slide-16"}, {"number": "17", "label": "시연이 멈췄을 때의 대안", "href": "week4_deck.html#slide-17"}, {"number": "18", "label": "발표 직전 점검", "href": "week4_deck.html#slide-18"}, {"number": "19", "label": "도움이 되는 동료 피드백", "href": "week4_deck.html#slide-19"}, {"number": "20", "label": "프로젝트 발표", "href": "week4_deck.html#slide-20"}]}, {"title": "4. 포트폴리오와 다음 단계", "items": [{"number": "21", "label": "포트폴리오에 남길 작업의 흔적", "href": "week4_deck.html#slide-21"}, {"number": "22", "label": "면접에서 설명할 경험", "href": "week4_deck.html#slide-22"}, {"number": "23", "label": "다음 세 가지 행동", "href": "week4_deck.html#slide-23"}, {"number": "24", "label": "여기까지 만든 여러분께", "href": "week4_deck.html#slide-24"}]}];
      groups.forEach(group=>{const section=node('section','course-menu-chapter');section.append(node('h3','',group.title));const list=node('ul','');group.items.forEach(item=>{const li=node('li',''),a=anchor(item.href,'');a.append(node('span','course-menu-number',item.number),node('span','',item.label));li.append(a);list.append(li);});section.append(list);grid.append(section);});body.append(grid);
    }else if(week!==1){body.append(node('p','course-menu-notice','자료는 추후 오픈됩니다. 현재는 1주차 강의와 실습 자료를 확인해주세요.'));body.append(anchor('week1_deck.html','1주차 강의 보기 →','course-menu-start'));}
    else{
      const loading=node('p','course-menu-notice','목차를 불러오는 중입니다.');body.append(loading);
      const contents=await data;
      if(ticket!==revision)return;
      body.replaceChildren();
      if(contents){const grid=node('div','course-menu-grid');
        contents.week1.forEach(group=>{const section=node('section','course-menu-chapter');section.append(node('h3','',group.title));const list=node('ul','');group.items.forEach(item=>{const li=node('li',''),a=anchor(item.href,'');a.append(node('span','course-menu-number',item.number),node('span','',item.label));li.append(a);list.append(li);});section.append(list);grid.append(section);});body.append(grid);
      }else body.append(node('p','course-menu-notice','목차를 불러오지 못했습니다. 강의 첫 페이지에서 전체 목차를 확인해주세요.'));
    }
    const footer=node('div','course-menu-resources');
    [['index.html','전체 주차'],['syllabus.html','과정 안내'],['workbook.html','1주차 워크북'],['role-matching.html#survey','희망 직무별 참고'],['submission.html','숙제 제출 시트 ↗']].forEach(([href,label])=>{const a=anchor(href,label);if(href.startsWith('https:')){a.target='_blank';a.rel='noopener';}footer.append(a);});panel.append(footer);
  }
  links.forEach((link,i)=>{const button=node('button','course-menu-trigger',link.textContent);button.type='button';button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls',panel.id);link.replaceWith(button);
    let hoverOpened=false;
    button.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){if(i===3)hoverOpened=true;open(button,i+1,link.getAttribute('href'));}});
    button.onclick=()=>{if(i===3&&hoverOpened&&current===button&&!panel.hidden){hoverOpened=false;return;}hoverOpened=false;if(current===button&&!panel.hidden)close();else open(button,i+1,link.getAttribute('href'));};
    button.onkeydown=e=>{if(e.key==='ArrowDown'){e.preventDefault();if(current!==button)open(button,i+1,link.getAttribute('href'));panel.querySelector('a')?.focus();}};
  });
  header.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse'&&!panel.contains(document.activeElement))close();});
  header.addEventListener('focusout',e=>{if(!header.contains(e.relatedTarget))close();});
  document.addEventListener('pointerdown',e=>{if(!header.contains(e.target))close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden){const target=current;close();target?.focus();}});
})();
