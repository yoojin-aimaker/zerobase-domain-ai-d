/* D group: preserve original slide hashes and keep shared presentation styles. */
window.prepareDWeek1 = () => {
 const slides=[...document.querySelectorAll('article.slide')];
 const merged=slides[20]; if(!merged)return;
 const refs={"md": [["컬리 / 뷰티 MD 운영지원", "https://recruit.wanted.co.kr/wd/395150", "경력 2년 이상 / 상시채용 표기", "상품 정보와 행사 조건을 정확히 대조하는 관점"], ["컬리 / 뷰티 MD", "https://www.wanted.co.kr/wd/238311", "마감 / 경력 4년 이상", "리뷰 근거를 상품 개선 후보에 연결하는 관점"], ["토스 / Category MD 패션", "https://toss.im/career/job-detail?job_id=6659882003", "경력 5년 이상 / 모집 상태는 원문 확인", "상품과 판매 데이터를 비교해 제안을 고르는 관점"]], "product": [["코웨이 / 제품 디자이너", "https://cowayhr.recruiter.co.kr/career/jobs/134173", "경력 3년 이상 / 11월 25일 마감 표기", "사용성과 양산 조건을 함께 검토하는 관점"], ["쿠쿠전자 / 제품디자인", "https://www.bzpp.co.kr/biz/businessDetailView/BR250902A00254", "2025년 마감 / 경력 3년 이상 / 보존 공고", "사용 장면에서 요구사항과 디자인 방향을 정하는 관점"], ["앳홈 / 제품 디자이너", "https://www.wanted.co.kr/wd/327669", "마감 / 경력 7년 이상", "사용자 관찰에서 대안과 검증 이유를 설명하는 관점"]], "hr": [["컬리 / HRM People Analytics", "https://kurly.career.greetinghr.com/ko/o/189466", "신입 가능 / 11월 30일 마감 표기", "가상 인사 데이터에서 확인할 질문을 정하는 관점"], ["샤넬코리아 / HR 인턴", "https://support.khu.ac.kr/support/cmmn/file/fileDown.do?atchFileId=d2687850866343bab5248afcf64f9ed7&bbsId=BMSR00040&fileSn=1&menuNo=7100020", "2025년 마감 / 대학 게시 공고 PDF", "온보딩 준비와 교육 일정의 누락을 점검하는 관점"], ["토스 / Culture Coordinator", "https://portfoliojobs.partechpartners.com/companies/toss/jobs/89474850-culture-coorditator", "마감 / 계약직 / 보존 공고", "신규 입사자 안내와 온보딩 흐름을 점검하는 관점"]]};
 const rows=[['md','MD / 상품기획','리뷰 → 개선 후보 1개','원문 근거를 남기고, 효능은 추정하지 않습니다.'],['product','제품디자인','사용 불편 → 요구사항 후보 1개','관찰과 추측을 나누고, 양산 가능성은 추가 검토합니다.'],['hr','HR / 경영지원','안내문 → 누락 대조표','가상 기준표와 대조하고, 실제 회사 제도는 추정하지 않습니다.']];
 merged.dataset.title='MD, 제품디자인, HR의 문제와 참고 JD';
 merged.querySelector('h3').textContent='내 직무의 문제와 판단 기준을 고릅니다';
 merged.querySelector('.ppt-label').textContent='GROUP D / JD TO PROJECT';
 merged.querySelector('.ppt-body').innerHTML=`<div class="d-jd-grid">${rows.map(([id,name,task,check])=>`<section class="d-jd-role"><h4>${name}</h4><p><b>${task}</b></p><p>${check}</p><div class="d-jd-links">${refs[id].map(([name,url,status])=>`<a href="${url}" target="_blank" rel="noopener">${name} ↗<small>${status}</small></a>`).join('')}</div><a href="week1-lab.html#${id}">내 직무 MD 받기 →</a></section>`).join('')}</div><p class="role-match-note">업무 참고용 JD / 2026.11.19 확인. 경력 공고도 포함합니다. 지원 전 모집 상태와 요건은 원문을 확인하세요.</p><div class="role-match-end"><b>2-6 실습 참고</b><span>JD 하나 선택 → 근거 한 줄 → 내 과제 한 줄 → 검수 기준 한 줄</span></div>`;
 slides[21].dataset.mergedInto='21';
};
document.addEventListener('DOMContentLoaded',()=>{
 if(!location.pathname.endsWith('week1_deck.html'))return;
 const bar=document.querySelector('.top-actions');if(!bar)return;
 const existing=[...bar.querySelectorAll('button')];
 const pick=t=>existing.find(b=>b.textContent.includes(t));
 const toc=pick('목차'),fs=pick('전체 화면'),role=pick('직무 예시');
 const download=document.createElement('button');download.textContent='MD 다운로드';download.onclick=()=>{const id=new URLSearchParams(location.search).get('role')||'md';location.href='week1-lab.html?role='+id+'#'+id;};
 const more=document.createElement('details');more.className='d-toolbar-more';
 const summary=document.createElement('summary');summary.textContent='더보기';more.append(summary);
 const menu=document.createElement('div');menu.className='d-toolbar-menu';
 existing.filter(b=>![toc,fs,role].includes(b)).forEach(b=>menu.append(b));more.append(menu);
 bar.replaceChildren(...[toc,role,download,fs,more].filter(Boolean));
 document.addEventListener('click',e=>{if(!more.contains(e.target))more.open=false;});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){more.open=false;summary.focus();}});
});
