"""Publish only reviewed, de-identified excerpts. Never copy source documents."""
from pathlib import Path
import html
import json
import zipfile

ROOT=Path(__file__).resolve().parents[1]
D=ROOT/'dist'
H=html.escape


def page(title,body):
    source=(D/'index.html').read_text()
    head=source.split('<main')[0]
    start=head.index('<title>');end=head.index('</title>',start)+8
    head=head[:start]+'<title>'+H(title)+' / YUJIN FLOW</title>'+head[end:]
    return head+'<main class="page">'+body+'</main>'+source.split('</main>')[1]


def main():
    cases=json.loads((ROOT/'content/cohort-cases.json').read_text())
    folder=D/'cohort-excerpts';folder.mkdir(exist_ok=True)
    body='''<div class="hero"><div><div class="eyebrow">PREVIOUS COHORT / 익명 발췌</div><h1>이전 차수는<br>어떻게 생각을 정리했을까요?</h1><p>실제 제출 문서 4건에서 세 사례를 골랐습니다. 초안과 후속 보완본의 일부를 보며 내 지침서에 가져올 판단 하나를 찾습니다.</p></div></div>
<section class="section"><div class="card lav"><h3>발췌를 읽는 방법</h3><p>이름, 회사와 기관, 서비스와 상품명, 개인 링크와 식별 가능한 경험과 수치는 제외했습니다. 아래 인용은 원문과 대조한 부분 발췌입니다. 해설과 적용 실습은 교수자가 새로 작성했습니다.</p><p>완성 답안이나 우수 과제 순위가 아닙니다. 문서에 적힌 설계, 실제 실행과 검증한 성과를 구분해 읽습니다. 세 직무와 완전히 같은 과거 사례로 소개하지 않습니다.</p></div></section>
<section class="section"><h2>한 사례만 골라보세요</h2><div class="grid">'''
    for c in cases:
        body+=f'<a class="card" href="#case-{c["id"]}"><h3>사례 {c["id"].upper()} / {H(c["title"])}</h3><p>{H(c["origin"])}</p></a>'
    body+='</div></section>'
    for c in cases:
        cid=c['id'];label=cid.upper();p=c['practice']
        body+=f'<section class="section" id="case-{cid}"><div class="eyebrow">CASE {label} / 실제 제출물 발췌</div><h2>{H(c["title"])}</h2><p>{H(c["origin"])}</p><p>{H(c["summary"])}</p><div class="card lav"><h3>확인한 문서 상태</h3><p>{H(c["status"])}</p></div><div class="grid">'
        for g in c['groups']:
            body+='<div class="card"><h3>'+H(g['heading'])+'</h3>'+''.join('<blockquote><p>“'+H(q)+'”</p></blockquote>' for q in g['quotes'])+'</div>'
        body+='</div><div class="card"><h3>여기서 볼 것 / 교수자 해설</h3><ol>'+''.join('<li>'+H(x)+'</li>' for x in c['read'])+'</ol><p>'+H(c['transfer'])+'</p></div>'
        body+=f'<details class="card"><summary>3분 적용 실습 / {H(p["label"])}</summary><p><strong>교수자가 만든 연습 문장</strong></p><blockquote><p>{H(p["draft"])}</p></blockquote><p>{H(p["question"])}</p><p>메모: 원문 근거 한 줄 / AI가 도울 일 한 줄 / 내가 결정하거나 보류할 일 한 줄.</p><details><summary>내 문장을 쓴 뒤 풀이 예시 보기</summary><p><strong>교수자 풀이 예시</strong></p><p>{H(p["answer"])}</p><p>이 풀이는 이전 수강생의 수정 결과가 아닙니다. 내 자료와 판단에 맞춰 다르게 써도 됩니다.</p></details></details>'
        body+=f'<p><a href="cohort-excerpts/case-{cid}.md" download>익명 발췌와 메모 양식 받기 ↓</a> / <a href="workbook.html?role={c["role"]}#editor">내 직무 지침서로 돌아가기 →</a></p></section>'
        text=f'# 익명 사례 {label} / {c["title"]}\n\n자료: {c["origin"]}\n\n{c["status"]}\n\n이름과 회사, 서비스명, 개인 링크와 구체적인 개인 경험은 제외했습니다. 원본 전체가 아닌 부분 발췌이며 교수자 해설을 구분합니다.\n'
        for g in c['groups']:text+='\n## '+g['heading']+'\n\n'+''.join('> '+q+'\n\n' for q in g['quotes'])
        text+='\n## 교수자 해설\n\n'+'\n'.join('- '+x for x in c['read'])+'\n\n'+c['transfer']
        text+='\n\n## 내 지침서로 가져오기\n\n이 사례에서 확인한 것:\n\n아직 확인되지 않은 것:\n\n내 원문 ID와 근거:\n\nAI가 도울 일:\n\n내가 결정하거나 보류할 일:\n\n고쳐 쓴 문장과 이유:\n'
        (folder/f'case-{cid}.md').write_text(text+'\n')
    body+='''<section class="section" id="practice"><h2>5분만 적용하기</h2><div class="flow"><div><b>2분 / 사례 한 개</b><span>원문 문장과 미확인 상태 찾기</span></div><div><b>3분 / 내 문장</b><span>내 근거와 AI 역할, 사람의 판단 세 줄</span></div></div><p>1주차 52번의 5분 메모를 사례 비교 방식으로 진행할 때 사용합니다. 추가 필수 숙제는 없습니다. 2주차에는 고친 기준을 PRD와 순서도에 반영하고, 3주차에는 실제 실행으로 검증합니다.</p><p><a href="cohort-excerpts/practice-note.md" download>공통 메모 양식 받기 ↓</a> / <a href="cohort-excerpts/masked-cases.zip" download>익명 발췌와 양식 ZIP 받기 ↓</a></p><p><a href="week1_deck.html#slide-52">1주차 메모로 돌아가기</a> / <a href="course-flow.html">4주 흐름 확인</a></p></section>'''
    (D/'cohort-cases.html').write_text(page('이전 차수 익명 사례와 5분 실습',body))
    (folder/'practice-note.md').write_text('''# 익명 사례를 내 지침서로 가져오기 / 선택 실습 5분

2분: 사례 A, B, C 중 하나만 읽습니다.
3분: 아래 문장을 내 자료에 맞게 고칩니다. 추가 필수 숙제는 없습니다.

선택한 사례:
원문에서 확인한 문장:
아직 확인되지 않은 점:
내 과제의 원문 ID와 근거:
AI가 도울 일:
내가 결정하거나 보류할 일:
내 지침서에서 고친 문장과 이유:

읽은 사례와 내 작업을 혼동하지 않습니다. 이전 수강생이 실제로 수행한 경험을 내 경험으로 쓰지 않습니다.
1주차: 문제와 검수 계획 / 2주차: 같은 기준으로 설계 보완 / 3주차: 실제 실행과 검증 / 4주차: 내 기여와 근거 설명.
''')
    with zipfile.ZipFile(folder/'masked-cases.zip','w',zipfile.ZIP_DEFLATED) as z:
        for p in sorted(folder.glob('*.md')):z.write(p,arcname=p.name)
    # Put entry links in the existing layouts, without editing shared styles.
    for name,marker in [('index.html','<section class="section"><h2>직무별 입력과 검수 자료</h2>'),('week1-lab.html','<section class="section"><h2>이번 주 완료 기준</h2>'),('role-lab.html','<section class="section" id="homework">'),('course-flow.html','<section class="section"><h2>주차별 자료</h2>')]:
        p=D/name;t=p.read_text()
        if 'cohort-cases.html' not in t:
            block='<section class="section"><h2>이전 차수의 생각 정리 보기</h2><a class="card lav" href="cohort-cases.html"><h3>익명 발췌 세 사례와 5분 메모</h3><p>실제 제출 문장에서 근거, 미확인과 사람의 판단 찾기</p></a></section>'
            if marker not in t:raise ValueError('Missing insertion slot: '+name)
            t=t.replace(marker,block+marker,1);p.write_text(t)
    # Distinguish the older teaching scenarios from the newly sourced real cases.
    p=D/'cases.html';t=p.read_text()
    t=t.replace('회사와 개인정보는 익명 처리했습니다. 프로젝트 이름과 포트폴리오에 남길 증거를 중심으로 봅니다.','직무별 업무를 설명하는 수업용 시나리오입니다. 이전 차수 실제 제출물은 별도의 익명 발췌 사례에서 봅니다.')
    if 'cohort-cases.html' not in t:t=t.replace('<div class="top-actions">','<div class="top-actions"><button onclick="location.href=\'cohort-cases.html\'">이전 차수 익명 사례</button>',1)
    p.write_text(t)
    print('Published three de-identified cases, four Markdown resources and one archive.')


if __name__=='__main__':main()
