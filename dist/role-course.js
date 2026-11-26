(() => {
  const week1 = location.pathname.endsWith('week1_deck.html');
  const data = week1 ? window.D_WEEK1_COURSE : window.D_ROLE_COURSE;
  if (!data) return;
  const nested = location.pathname.includes('/week3/');
  const prefix = nested ? '../' : '';
  const lesson = week1 ? 'week1_deck.html' : nested ? 'week3/index.html' : 'week2_deck.html';
  const ids = Object.keys(data.roles);
  const requested = new URLSearchParams(location.search).get('role');
  let role = ids.includes(requested) ? requested : 'md';
  const bar = document.querySelector('.top-actions') || document.querySelector('header');
  const switcher = document.createElement('button');
  switcher.type = 'button';
  switcher.setAttribute('aria-label', '직무 예시 전환');
  const resources = document.createElement('button');
  resources.type = 'button';
  resources.textContent = week1 ? '1주차 실습 자료' : '입력과 검수 자료';
  resources.onclick = () => { location.href = prefix + (week1 ? 'week1-lab.html' : 'role-lab.html') + '?role=' + role + '#' + role; };
  bar?.append(switcher, resources);

  async function copyText(text, button) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const field = document.createElement('textarea');
      field.value = text;
      document.body.append(field);
      field.select();
      const ok = document.execCommand('copy');
      field.remove();
      if (!ok) { button.textContent = '본문을 선택해 복사해주세요'; return; }
    }
    const previous = button.textContent;
    button.textContent = '복사 완료';
    setTimeout(() => { button.textContent = previous; }, 1200);
  }

  function applyRole() {
    const kit = data.roles[role];
    const files = data.files[role];
    for (const [id, [title, body]] of Object.entries(data.lessons[role][lesson])) {
      const slide = document.getElementById(id) || (week1 ? document.querySelectorAll('article.slide')[Number(id.replace('slide-', '')) - 1] : null);
      if (!slide) continue;
      if (!slide.id) slide.id = id;
      slide.dataset.title = title;
      const heading = slide.querySelector('h3');
      if (heading) heading.textContent = title;
      slide.querySelector('.ppt-body').innerHTML = body;
      const label = slide.querySelector('.ppt-label');
      const fixedRole = week1 ? {'slide-9':'md','slide-10':'product','slide-11':'hr'}[id] : null;
      const labelRole = fixedRole ? data.roles[fixedRole].name : week1 && ['slide-8','slide-12','slide-19','slide-60'].includes(id) ? 'D그룹 공통' : kit.name;
      if (label) label.textContent = (week1 ? 'WEEK 01' : nested ? 'WEEK 03' : 'WEEK 02') + ' / ' + labelRole + ' / 수업용 합성 자료';
      if (week1) {
        const index = Number(id.replace('slide-', '')) - 1;
        const name = document.querySelectorAll('.slide-list .slide-link')[index]?.querySelector('.slide-name');
        if (name) name.textContent = title;
      }
      document.querySelectorAll('.slide-list a').forEach(link => {
        if (link.getAttribute('href') !== '#' + id) return;
        const number = link.querySelector('span')?.textContent || id.replace('slide-', '');
        link.replaceChildren();
        const tag = document.createElement('span');
        tag.className = 'slide-number';
        tag.textContent = number;
        const name = document.createElement('span');
        name.className = 'slide-name';
        name.textContent = title;
        link.append(tag, name);
      });
    }
    // Keep the original copy actions in unchanged slides consistent with this role.
    if (!week1 && typeof assets !== 'undefined') {
      Object.assign(assets, {
        'PoC_Agent_파일생성.md': files['prompt.md'],
        'PoC_Agent_첫시험.md': files['prompt.md'],
        '워크플로우_Agent추천.md': '내 지침서와 PRD, WORKFLOW, 실제 응답과 내 검수 기록을 읽고 필요한 역할 후보를 제안해줘. 실행 기록이 없으면 확인 질문부터 남겨줘. 실제 근거, 입력, 역할 하나, 결과, 다음 담당과 보류 조건을 적고 내가 고르기 전 파일은 만들지 마. 여러 Agent는 선택이며 사람이나 메인 AI의 조율로 충분하면 그 방법을 제안해줘.',
      });
    }
    if (!week1 && typeof prompts !== 'undefined') prompts.delegate = files['prompt.md'];
    if (week1) {
      document.querySelectorAll('a[href^="workbook.html"]').forEach(link => { link.href = 'workbook.html?role=' + role; });
      document.querySelectorAll('.top-actions button').forEach(button => {
        if (button.textContent.includes('1주차 워크북')) button.onclick = () => { location.href = 'workbook.html?role=' + role; };
      });
    }
    document.querySelectorAll('[data-role-copy]').forEach(button => {
      button.onclick = () => copyText(files[button.dataset.roleCopy], button);
    });
    switcher.textContent = '직무 예시: ' + kit.short;
    switcher.title = '누르면 MD → 제품디자인 → HR 순서로 예시가 바뀝니다.';
    const url = new URL(location.href);
    url.searchParams.set('role', role);
    history.replaceState(null, '', url);
    const active = document.querySelector('.slide.active');
    if (active) {
      const counter = document.querySelector('#counter');
      const activeNumber = active.dataset.pageNumber || active.id.replace('slide-', '') || String([...document.querySelectorAll('article.slide')].indexOf(active) + 1);
      if (counter) counter.textContent = (week1 ? active.dataset.slide : activeNumber + ' / ' + (nested ? '33' : String(document.querySelectorAll('article.slide').length))) + ' ' + active.dataset.title;
      if (week1) document.title = '1주차 ' + activeNumber + ' / ' + active.dataset.title + ' / YUJIN FLOW';
    }
  }
  switcher.onclick = () => { role = ids[(ids.indexOf(role) + 1) % ids.length]; applyRole(); };
  applyRole();
})();
