// Simple two-player math tug game
const state = {
  left: {score:0, answer:'', q:null, start:0, locked:false},
  right:{score:0, answer:'', q:null, start:0, locked:false},
  finished:false
}

function randInt(a,b){return Math.floor(Math.random()*(b-a+1))+a}
function genQuestion(){
  const ops=['+','-','*','/'];
  const op = ops[randInt(0,ops.length-1)];
  let a=randInt(1,10), b=randInt(1,10);
  if(op=='/'){
    b = randInt(1,5);
    a = b * randInt(1,5);
  }
  let text = `${a} ${op} ${b} = ?`;
  let ans;
  switch(op){
    case '+': ans = a+b; break;
    case '-': ans = a-b; break;
    case '*': ans = a*b; break;
    case '/': ans = a/b; break;
  }
  return {text, ans};
}

function setupPads(){
  ['left','right'].forEach(side=>{
    const pad = document.getElementById('pad-'+side);
    pad.innerHTML='';
    for(let d=1;d<=9;d++){
      const btn=document.createElement('button'); btn.textContent=d;
      btn.onclick=()=>digit(side,d);
      pad.appendChild(btn);
    }
    const zero=document.createElement('button'); zero.textContent='0'; zero.onclick=()=>digit(side,0); pad.appendChild(zero);
    const clr=document.createElement('button'); clr.textContent='C'; clr.onclick=()=>clearDisp(side); pad.appendChild(clr);
    const sub=document.createElement('button'); sub.textContent='OK'; sub.onclick=()=>submitAnswer(side); pad.appendChild(sub);
  })
}

function digit(side,d){ if(state.finished) return; const s=state[side]; s.answer = (s.answer==='')? String(d) : s.answer + String(d); updateDisp(side); }
function clearDisp(side){ if(state.finished) return; state[side].answer=''; updateDisp(side); }
function updateDisp(side){ document.getElementById('disp-'+side).textContent = state[side].answer || ' '; }

function showQuestion(side){ state[side].q = genQuestion(); state[side].start = Date.now(); state[side].answer=''; updateDisp(side); document.getElementById('q-'+side).textContent = state[side].q.text; document.getElementById('msg-'+side).textContent=''; }

function submitAnswer(side){ if(state.finished) return; const s = state[side]; if(!s.q) return; const val = Number(s.answer);
  if(s.answer==='') return;
  if(val === s.q.ans){
    const elapsed = Math.floor((Date.now()-s.start)/1000);
    const penalty = Math.floor(elapsed/5);
    let points = 5 - penalty; if(points<1) points=1;
    s.score += points;
    document.getElementById('score-'+side).textContent = s.score;
    // next question
    showQuestion(side);
    updateRope();
    checkWin();
  }else{
    document.getElementById('msg-'+side).textContent = 'Wrong answer, try again.';
  }
}

function updateRope(){ const diff = state.left.score - state.right.score; const maxLead=20; const pct = Math.max(-1, Math.min(1, diff / maxLead)); const rope = document.getElementById('rope'); // translate rope center
  rope.style.transform = `translateX(${pct*30}%)`; }

function checkWin(){ const diff = Math.abs(state.left.score - state.right.score); if(diff>=20){ state.finished = true; const winner = state.left.score>state.right.score? 'Blue Team Wins!':'Red Team Wins!'; document.getElementById('winner-text').textContent = winner; document.getElementById('overlay').classList.remove('hidden'); }}

function resetGame(){ state.left.score=0; state.right.score=0; document.getElementById('score-left').textContent='0'; document.getElementById('score-right').textContent='0'; state.finished=false; document.getElementById('overlay').classList.add('hidden'); showQuestion('left'); showQuestion('right'); updateRope(); }

window.addEventListener('load',()=>{ setupPads(); showQuestion('left'); showQuestion('right'); updateRope(); document.getElementById('reset-btn').onclick=resetGame; });
