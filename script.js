'use strict';
/* ===== DADOS (do documento de pesquisa) ===== */
const Q=[
{q:"Qual cientista descobriu o nêutron em 1932?",o:["Albert Einstein","James Chadwick","Robert Oppenheimer","Enrico Fermi","Edward Teller"],a:1,e:"James Chadwick descobriu o nêutron em 1932, uma descoberta fundamental para o desenvolvimento da física nuclear."},
{q:"O que é a fissão nuclear?",o:["A união de dois átomos leves para formar um maior.","A transformação de energia elétrica em energia nuclear.","A divisão do núcleo de um átomo pesado, liberando energia e nêutrons.","Uma reação química que não envolve o núcleo do átomo.","A transformação de energia térmica em energia elétrica."],a:2,e:"Na fissão, o núcleo de um átomo pesado se divide em núcleos menores, liberando energia e nêutrons."},
{q:"Qual era o principal objetivo do Projeto Manhattan durante a Segunda Guerra Mundial?",o:["Desenvolver a primeira bomba atômica dos Estados Unidos.","Construir o primeiro satélite artificial.","Criar a primeira usina hidrelétrica americana.","Desenvolver tratamentos contra o câncer.","Criar o primeiro computador pessoal."],a:0,e:"O Projeto Manhattan foi o programa dos Estados Unidos que desenvolveu as primeiras armas atômicas durante a Segunda Guerra Mundial."},
{q:"Qual foi a principal função de J. Robert Oppenheimer no Projeto Manhattan?",o:["Descobrir o nêutron.","Criar a primeira reação nuclear em cadeia controlada.","Coordenar o trabalho científico para desenvolver a bomba atômica.","Descobrir a fissão nuclear com Otto Hahn.","Liderar os estudos sobre a produção de energia solar."],a:2,e:"Oppenheimer dirigiu o laboratório de Los Alamos e coordenou o trabalho científico de desenvolvimento da bomba."},
{q:"Qual foi a contribuição de Enrico Fermi para a história da física nuclear?",o:["Descobrir o nêutron em 1932.","Explicar teoricamente a fissão nuclear.","Enviar uma carta ao presidente Franklin Roosevelt.","Realizar a primeira reação nuclear em cadeia controlada.","Liderar o desenvolvimento da bomba de hidrogênio."],a:3,e:"Em 1942, Enrico Fermi liderou a equipe que realizou a primeira reação nuclear em cadeia controlada."},
{q:"Qual foi a contribuição de Lise Meitner e Otto Frisch para a ciência nuclear?",o:["Construíram a primeira bomba atômica americana.","Descobriram o nêutron.","Lideraram o Projeto Manhattan.","Explicaram teoricamente o processo de fissão nuclear.","Criaram o primeiro reator nuclear artificial."],a:3,e:"Lise Meitner e Otto Frisch explicaram teoricamente a fissão nuclear e ajudaram a interpretar os resultados experimentais."},
{q:"Quais materiais nucleares foram utilizados nas bombas lançadas sobre Hiroshima e Nagasaki, respectivamente?",o:["Plutônio-239 e urânio-235.","Urânio-235 e plutônio-239.","Urânio-238 e hidrogênio.","Carbono e urânio-235.","Plutônio-239 e urânio-238."],a:1,e:"A bomba de Hiroshima, Little Boy, usava urânio-235; a bomba de Nagasaki, Fat Man, usava plutônio-239."},
{q:"Qual alternativa explica corretamente a reação em cadeia nuclear?",o:["Uma reação em que os átomos deixam de liberar energia.","Um processo em que apenas reações químicas se repetem.","Uma reação em que nêutrons liberados atingem outros núcleos, provocando novas fissões.","Um processo que impede a divisão dos núcleos atômicos.","Uma reação que acontece somente em usinas hidrelétricas."],a:2,e:"Na reação em cadeia, nêutrons liberados por uma fissão atingem outros núcleos e podem provocar novas fissões."},
{q:"Qual é uma das principais consequências da radiação ionizante para a saúde humana?",o:["Aumento permanente da imunidade.","Eliminação de todas as alterações celulares.","Proteção contra todos os tipos de câncer.","Ausência de efeitos sobre o organismo.","Danos às células e ao DNA, aumentando o risco de câncer."],a:4,e:"A radiação ionizante pode danificar células e DNA. O risco depende de fatores como a dose e o tipo de exposição."},
{q:"O que a história do desenvolvimento das armas nucleares nos ensina sobre a ciência?",o:["Toda descoberta científica produz apenas benefícios.","A ciência não influencia os conflitos entre países.","As descobertas científicas não precisam de fiscalização.","O conhecimento científico deve ser acompanhado de responsabilidade ética, considerando suas consequências para a humanidade.","O desenvolvimento de armas nucleares acabou com todos os conflitos mundiais."],a:3,e:"A história mostra que o conhecimento científico deve ser acompanhado de responsabilidade ética e consideração por suas consequências para a humanidade."}];
const SETS=[
{name:"Conjunto 1: bombas e organizações",p:[["Little Boy","Urânio-235, Hiroshima"],["Fat Man","Plutônio-239, Nagasaki"],["RERF","Estuda os efeitos da radiação nos sobreviventes"],["Nihon Hidankyo","Organização de sobreviventes, Nobel da Paz de 2024"]]},
{name:"Conjunto 2: alvos e decisões",p:[["Henry Stimson","Removeu Kyoto da lista de alvos"],["Kokura","Alvo principal de 09/08, coberto por nuvens"],["Comitê de Alvos","Grupo que escolheu as cidades, a partir de 27/04/1945"],["Trinity","Primeiro teste nuclear, em 16/07/1945"]]}];
/*END DATA*/
const $=(s,r=document)=>r.querySelector(s);
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const esc=s=>s.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
function explode(target){
if(RM)return;
const burst=document.createElement('span');burst.className='blast';burst.setAttribute('aria-hidden','true');target.append(burst);target.classList.add('boom');
const panel=target.closest('.panel'),screenBlast=$('#screenBlast');panel?.classList.add('impact');document.body.classList.add('impact');screenBlast.classList.add('active');
setTimeout(()=>{burst.remove();target.classList.remove('boom');panel?.classList.remove('impact');document.body.classList.remove('impact');screenBlast.classList.remove('active')},950)}

/* Título palavra por palavra */
const tt=$('#tt');tt.setAttribute('aria-label',tt.textContent);
tt.innerHTML=tt.textContent.split(' ').map((w,k)=>`<span aria-hidden="true" style="--d:${k*110}ms">${w}</span>`).join(' ');

/* Fundo: animação limitada a dispositivos com ponteiro fino */
(function(){const c=$('#bg'),x=c.getContext('2d'),finePointer=matchMedia('(hover: hover) and (pointer: fine)').matches,animated=!RM&&finePointer;let W,H,P=[],mx=-999,my=-999,frame=0,last=0;
function render(t=0){frame=0;if(document.hidden)return;if(animated&&t-last<1000/30){frame=requestAnimationFrame(render);return}last=t;x.clearRect(0,0,W,H);for(const p of P){p.y-=p.v;if(p.y<0){p.y=H;p.x=Math.random()*W}
if(finePointer){const dx=p.x-mx,dy=p.y-my,d2=dx*dx+dy*dy;if(d2>0&&d2<12100){const push=1.3/Math.sqrt(d2);p.x+=dx*push;p.y+=dy*push}}
x.fillStyle=`rgba(255,212,0,${p.a})`;x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fill()}if(animated)frame=requestAnimationFrame(render)}
function schedule(){if(animated){if(!frame&&!document.hidden)frame=requestAnimationFrame(render)}else render(performance.now())}
function size(){W=c.width=innerWidth;H=c.height=innerHeight;P=Array.from({length:Math.min(80,W/16|0)},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.8+.4,v:Math.random()*.3+.06,a:Math.random()*.45+.1}));last=0;schedule()}
if(finePointer)addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY},{passive:true});
document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0}else schedule()});
size();addEventListener('resize',size,{passive:true})})();

/* Navegação direcional para controles remotos de TV */
document.addEventListener('keydown',e=>{const direction={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0]}[e.key];if(!direction)return;
const current=document.activeElement;if(!current||!current.matches('a[href],button,[tabindex]:not([tabindex="-1"])'))return;
const from=current.getBoundingClientRect(),cx=from.left+from.width/2,cy=from.top+from.height/2,dx=direction[0],dy=direction[1];let nearest=null,best=Infinity;
document.querySelectorAll('a[href],button:not(:disabled),[tabindex]:not([tabindex="-1"])').forEach(el=>{if(el===current||!el.getClientRects().length)return;const r=el.getBoundingClientRect(),x=r.left+r.width/2-cx,y=r.top+r.height/2-cy,forward=x*dx+y*dy;if(forward<=0)return;const distance=forward+Math.abs(x*dy-y*dx)*2;if(distance<best){best=distance;nearest=el}});
if(nearest){e.preventDefault();nearest.focus()}});

/* Barra de progresso de rolagem e revelação */
addEventListener('scroll',()=>{$('#sp').style.width=scrollY/(document.documentElement.scrollHeight-innerHeight)*100+'%'},{passive:true});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll('.rv').forEach(s=>io.observe(s));

/* Painéis com brilho e inclinação leve ao passar o mouse */
if(!RM)document.querySelectorAll('.tilt').forEach(p=>{
p.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;const r=p.getBoundingClientRect(),u=(e.clientX-r.left)/r.width,v=(e.clientY-r.top)/r.height;
p.style.setProperty('--mx',u*100+'%');p.style.setProperty('--my',v*100+'%');p.style.setProperty('--ry',(u-.5)*2+'deg');p.style.setProperty('--rx',(.5-v)*2+'deg')});
p.addEventListener('pointerleave',()=>{p.style.setProperty('--rx','0deg');p.style.setProperty('--ry','0deg')})});

/* ===== Quiz ===== */
(function(){const box=$('#quizBox');let i,score,sel,done;
function start(){i=0;score=0;draw()}
function draw(){sel=null;done=false;const q=Q[i];
box.innerHTML=`<div class="prog"><i style="width:${i/Q.length*100}%"></i></div><p class="small">Questão ${i+1} de ${Q.length} · Pontuação: ${score}</p><div class="qa"><h3 id="qq">${esc(q.q)}</h3><div role="group" aria-labelledby="qq">${q.o.map((t,k)=>`<button class="opt" data-k="${k}" aria-pressed="false">${String.fromCharCode(65+k)}) ${esc(t)}</button>`).join('')}</div><div id="fb"></div><div class="row"><button id="chk" disabled>Verificar resposta</button></div></div>`;
box.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{if(done)return;sel=+b.dataset.k;box.querySelectorAll('.opt').forEach(x=>x.setAttribute('aria-pressed',x===b));$('#chk').disabled=false});
$('#chk').onclick=check;requestAnimationFrame(()=>{const p=$('.prog i',box);p.style.width=(i+.0)/Q.length*100+'%'})}
function check(){const q=Q[i],ok=sel===q.a;done=true;if(ok)score++;else explode($('.opt[aria-pressed="true"]',box));
box.querySelectorAll('.opt').forEach((b,k)=>{b.disabled=true;if(k===q.a){b.classList.add('ok');b.append(' ✓ correta')}else if(k===sel){b.classList.add('bad');b.append(' ✗ sua resposta')}});
$('#fb').innerHTML=`<div class="expl"><strong>${ok?'Correto!':'Não foi dessa vez.'}</strong> ${esc(q.e)}</div>`;
$('.prog i',box).style.width=(i+1)/Q.length*100+'%';
const c=$('#chk');c.disabled=false;c.textContent=i<Q.length-1?'Próxima questão':'Ver resultado';c.onclick=()=>{i++;i<Q.length?draw():end()};c.focus()}
function end(){const m=score>=9?'Excelente domínio do tema.':score>=6?'Bom resultado. Reveja os pontos que errou.':'Vale tentar de novo com mais atenção às explicações.';
box.innerHTML=`<div class="prog"><i style="width:100%"></i></div><div class="qa ring"><svg viewBox="0 0 120 120" role="img" aria-label="${score} de ${Q.length} acertos"><circle class="bgc" cx="60" cy="60" r="52"/><circle class="fg" cx="60" cy="60" r="52" stroke-dasharray="326.7" stroke-dashoffset="326.7"/><text x="60" y="70" id="num">0</text></svg><div><h3>Resultado final</h3><p>${score} de ${Q.length} acertos. ${m}</p><button id="rs">Reiniciar quiz</button></div></div>`;
const fg=$('.fg',box),num=$('#num',box),t0=performance.now(),dur=RM?1:1200;
(function a(t){const k=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-k,3);fg.style.strokeDashoffset=326.7*(1-e*score/Q.length);num.textContent=Math.round(e*score);if(k<1)requestAnimationFrame(a)})(t0);
$('#rs').onclick=start;$('#rs').focus()}
start()})();

/* ===== Jogo de ligar (com linhas e arrastar) ===== */
(function(){const tabs=$('.tabs'),box=$('#matchBox');let cur=0;const COL=['#ffd400','#ff9f1c','#f4f4f4','#7df9ff'];
tabs.innerHTML=SETS.map((s,k)=>`<button role="tab" aria-selected="${k==0}" data-k="${k}">${s.name}</button>`).join('');
tabs.onclick=e=>{const b=e.target.closest('button');if(!b)return;cur=+b.dataset.k;tabs.querySelectorAll('button').forEach(x=>x.setAttribute('aria-selected',x===b));G[cur].draw()};
function Game(set){let R,pr,sl,sr,chk,msg,drag=null;
function init(){R=shuffle(set.p.map((p,k)=>({t:p[1],k})));pr={};sl=sr=null;chk=false;msg=''}
const rev=r=>Object.keys(pr).find(l=>pr[l]===r);
const side=()=>$('.stage',box);
function link(l,r){const o=rev(r);if(o!==undefined)delete pr[o];delete pr[l];pr[l]=r;sl=sr=null;chk=false;msg=''}
function draw(){const st=l=>chk&&l!==undefined&&pr[l]!==undefined?(R[pr[l]].k==+l?' ok':' bad'):'';
const mk=l=>chk&&l!==undefined&&pr[l]!==undefined?(R[pr[l]].k==+l?' ✓':' ✗'):'';
const bd=l=>l===undefined?'':`<span class="bd" aria-hidden="true">${+l+1}</span>`;const n=Object.keys(pr).length;
box.innerHTML=`<div class="prog"><i style="width:${n/4*100}%"></i></div><div class="stage"><svg class="lines" aria-hidden="true"></svg><div class="cols"><div><h4>Coluna A</h4>${set.p.map((p,l)=>`<button class="opt it${sl===l?' sel':''}${st(String(l))}" data-s="L" data-i="${l}">${l+1}. ${esc(p[0])}${pr[l]!==undefined?bd(l)+mk(String(l)):''}</button>`).join('')}</div>
<div><h4>Coluna B</h4>${R.map((r,j)=>{const l=rev(j);return`<button class="opt it${sr===j?' sel':''}${st(l)}" data-s="R" data-i="${j}">${esc(r.t)}${bd(l)}${mk(l)}</button>`}).join('')}</div></div></div>
<div class="row"><button id="vf">Verificar</button><button class="ghost" id="rs">Reiniciar</button><span class="score" id="sc" role="status">${msg}</span></div>`;
box.querySelectorAll('.it').forEach(b=>{b.onclick=()=>click(b.dataset.s,+b.dataset.i);
b.onpointerdown=e=>{if(e.pointerType==='mouse'&&e.button===0)drag={s:b.dataset.s,i:+b.dataset.i,el:b}}});
$('#vf').onclick=verify;$('#rs').onclick=()=>{init();draw()};lines()}
function pt(el,right){const s=side().getBoundingClientRect(),r=el.getBoundingClientRect();return[(right?r.right:r.left)-s.left,r.top+r.height/2-s.top]}
function path(a,b){const m=(a[0]+b[0])/2;return`M${a[0]} ${a[1]}C${m} ${a[1]} ${m} ${b[1]} ${b[0]} ${b[1]}`}
function lines(){const sv=$('.lines',box);if(!sv)return;let h='';
for(const l in pr){const A=$(`[data-s=L][data-i="${l}"]`,box),B=$(`[data-s=R][data-i="${pr[l]}"]`,box);
const c=chk?(R[pr[l]].k==+l?'ok':'bad'):'';h+=`<path pathLength="1" class="${c}" style="${chk?'':'stroke:'+COL[l]}" d="${path(pt(A,1),pt(B,0))}"/>`}sv.innerHTML=h}
function click(s,i){chk=false;msg='';
if(s==='L'){if(pr[i]!==undefined){delete pr[i];sl=null}else sl=sl===i?null:i}
else{const l=rev(i);if(l!==undefined){delete pr[l];sr=null}else sr=sr===i?null:i}
if(sl!==null&&sr!==null)link(sl,sr);draw()}
function verify(){if(Object.keys(pr).length<4){msg='Ligue os quatro pares antes de verificar.';draw();return}
chk=true;const n=Object.keys(pr).filter(l=>R[pr[l]].k==+l).length;
msg=n===4?'Pontuação: 4/4. Perfeito!':`Pontuação: ${n}/4. Clique nos itens com ✗ para desfazer e corrigir.`;draw();
if(n<4)box.querySelectorAll('.it.bad').forEach(explode)}
addEventListener('pointermove',e=>{if(!drag||!box.contains(drag.el))return;const sv=$('.lines',box);let t=$('.tmp',sv);
if(!t){t=document.createElementNS('http://www.w3.org/2000/svg','path');t.setAttribute('class','tmp');t.setAttribute('pathLength','1');sv.appendChild(t)}
const s=side().getBoundingClientRect(),a=pt(drag.el,drag.s==='L'),b=[e.clientX-s.left,e.clientY-s.top];t.setAttribute('d',drag.s==='L'?path(a,b):path(b,a))});
addEventListener('pointerup',e=>{if(!drag)return;const d=drag;drag=null;if(!box.contains(d.el))return;$('.tmp',box)?.remove();
const t=document.elementFromPoint(e.clientX,e.clientY)?.closest('.it');if(!t||t.dataset.s===d.s)return;
const l=d.s==='L'?d.i:+t.dataset.i,r=d.s==='R'?d.i:+t.dataset.i;link(l,r);draw()});
init();return{draw}}
const G=SETS.map(Game);G[0].draw();addEventListener('resize',()=>G[cur].draw())})();