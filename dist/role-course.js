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
      document.querySelectorAll('.slide-list a').forEach(link => {
        if (link.getAttribute('href') !== '#' + id) return;
        const number = link.querySelector('span')?.textContent || id.replace('slide-', '');
        link.replaceChildren();
        const tag = document.createElement('span');
        tag.textContent = number;
        link.append(tag, document.createTextNode(' ' + title));
      });
    }
    // Keep the original copy actions in unchanged slides consistent with this role.
    if (!week1 && typeof assets !== 'undefined') {
      Object.assign(assets, {
        'PoC_Agent_파일생성.md': files['prompt.md'],
        'PoC_Agent_첫시험.md': files['prompt.md'],
        '워크플로우_첫실행.md': files['prompt.md'],
        '워크플로우_Agent추천.md': '내 업무에서 AI에 맡길 역할 하나와 입력, 출력, 보류 조건을 정리해줘. 여러 Agent는 선택이며 웹 채팅으로 충분하면 그 방법을 제안해줘.',
        'CLAUDE_지침서_생성.md': files['GUIDELINES.md'],
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
      if (counter) counter.textContent = activeNumber + ' / ' + (week1 ? '60' : nested ? '33' : '73') + ' ' + active.dataset.title;
      if (week1) document.title = '1주차 ' + activeNumber + ' / ' + active.dataset.title + ' / YUJIN FLOW';
    }
  }
  switcher.onclick = () => { role = ids[(ids.indexOf(role) + 1) % ids.length]; applyRole(); };
  applyRole();
})();
