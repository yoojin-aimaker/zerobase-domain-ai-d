(() => {
 const nested=location.pathname.includes('/week3/');const prefix=nested?'../':'';
 let bar=document.querySelector('.top-actions');if(!bar){const header=document.querySelector('.topbar');if(header){bar=document.createElement('div');bar.className='top-actions';header.append(bar);}}
 if(bar){const b=document.createElement('button');b.textContent='4주 흐름';b.onclick=()=>location.href=prefix+'course-flow.html';bar.append(b);}
 document.querySelectorAll('a').forEach(a=>{if((a.getAttribute('aria-label')||'').includes('출석 체크')||a.textContent.includes('출석 체크 구글폼')){a.replaceChildren(document.createTextNode('D그룹 제출 안내'));a.href=prefix+'submission.html';a.setAttribute('aria-label','D그룹 제출 안내');} });

})();
