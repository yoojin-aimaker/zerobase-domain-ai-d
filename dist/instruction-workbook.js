(() => {
  const input=document.querySelector('#markdown'),preview=document.querySelector('#preview'),status=document.querySelector('#status');
  const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
  const inline=s=>escape(s).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/`([^`]+)`/g,'<code>$1</code>');
  function render(md){
    let out='',list='',inCode=false,code=[];
    const close=()=>{if(list){out+=`</${list}>`;list='';}};
    for(const line of md.replace(/\r\n/g,'\n').split('\n')){
      if(line.startsWith('```')){close();if(inCode){out+='<pre><code>'+escape(code.join('\n'))+'</code></pre>';code=[];}inCode=!inCode;continue;}
      if(inCode){code.push(line);continue;}
      const heading=line.match(/^(#{1,6})\s+(.*)$/),item=line.match(/^\s*(?:([-*])|\d+\.)\s+(.*)$/);
      if(heading){close();out+=`<h${heading[1].length}>${inline(heading[2])}</h${heading[1].length}>`;}
      else if(item){const type=item[1]?'ul':'ol';if(list!==type){close();list=type;out+=`<${list}>`;}out+=`<li>${inline(item[2])}</li>`;}
      else {close();if(line.trim())out+='<p>'+inline(line)+'</p>';}
    }
    close();if(inCode)out+='<pre><code>'+escape(code.join('\n'))+'</code></pre>';return out;
  }
  function content(){if(!input.value.trim()){status.textContent='지침서 내용을 먼저 작성해주세요.';input.focus();return null;}return input.value;}
  function download(name,text,type){const url=URL.createObjectURL(new Blob([text],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status.textContent=name+' 파일을 내려받았습니다. 파일을 열어 내용을 확인해주세요.';}
  const stem=()=>('1주차_'+(document.querySelector('#author').value.trim()||'이름')+'_AI작업지침서').replace(/[\\/:*?"<>|]/g,'_');
  document.querySelector('#refresh').onclick=()=>{const md=content();if(md!==null){preview.innerHTML=render(md);status.textContent='현재 MD 내용으로 미리보기를 갱신했습니다.';}};
  document.querySelector('#download-md').onclick=()=>{const md=content();if(md!==null)download(stem()+'.md',md,'text/markdown;charset=utf-8');};
  document.querySelector('#download-html').onclick=()=>{const md=content();if(md===null)return;const title=md.match(/^#\s+(.+)$/m)?.[1]||'AI 작업 지침서';const html='<!doctype html>\n<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+escape(title)+'</title><style>body{margin:0;background:#f2f3f5;color:#171b21;font-family:system-ui,sans-serif;line-height:1.8}main{max-width:860px;margin:40px auto;padding:48px;background:white}h1{font-size:30px;line-height:1.4}h2{font-size:23px;color:#171b21;margin-top:36px;border-top:1px solid #dce0e5;padding-top:24px}li{margin:10px 0}pre{white-space:pre-wrap;background:#f7f8fa;padding:20px;overflow-wrap:anywhere}p,li{overflow-wrap:anywhere}code{font-family:monospace}footer{font-size:13px;color:#606873;margin-top:40px}@media(max-width:600px){main{margin:0;padding:24px}h1{font-size:26px}}button{font:inherit;padding:8px 16px;border:1px solid #bea3d5;background:#ede5f8;color:#7048b5;cursor:pointer}.pdf-control{text-align:right}@media print{.pdf-control{display:none}body{background:white}main{margin:0;padding:0}h2{break-after:avoid}}</style></head><body><main><div class="pdf-control"><button type="button" onclick="window.print()">PDF로 저장</button></div>'+render(md)+'<footer>AI 작업 지침서 / 제출용 HTML</footer></main></body></html>';download(stem()+'.html',html,'text/html;charset=utf-8');};
  document.querySelector('#md-file').onchange=async e=>{const file=e.target.files[0];if(!file)return;if(file.size>524288){status.textContent='512KB 이하의 MD 파일을 선택해주세요.';return;}if(input.value!==input.defaultValue&&!confirm('작성 중인 내용을 선택한 MD 파일로 바꿀까요?'))return;input.value=await file.text();preview.innerHTML=render(input.value);status.textContent='MD 파일을 불러왔습니다. 내용과 미리보기를 확인해주세요.';};
  preview.innerHTML=render(input.value);
})();
