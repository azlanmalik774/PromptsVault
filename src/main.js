import { PROMPTS as P } from './prompts.js';
import './style.css';

var D={All:"",New:"New",Trending:"Trending",Videos:"Videos"};
var S={tab:"All",g:"All",nav:"home",q:"",open:null,fav:[]};
try{S.fav=JSON.parse(localStorage.getItem("pv_fav")||"[]")}catch(e){}
function save(){try{localStorage.setItem("pv_fav",JSON.stringify(S.fav))}catch(e){}}
function bg(i){return "background:linear-gradient(160deg,"+P[i].g.split(",").join(",")+")"}
function toast(m){var t=document.getElementById("toast");t.textContent=m;t.className="s";setTimeout(function(){t.className=""},1800)}
function toggleFav(i,ev){if(ev)ev.stopPropagation();var k=S.fav.indexOf(i);if(k<0)S.fav.push(i);else S.fav.splice(k,1);save();render()}
function copyP(i){var tx=P[i].p;function fb(){var a=document.createElement("textarea");a.value=tx;document.body.appendChild(a);a.select();try{document.execCommand("copy")}catch(e){}a.remove()}
try{navigator.clipboard.writeText(tx).catch(fb)}catch(e){fb()}toast("Prompt copied ✓")}
function gem(i){copyP(i);setTimeout(function(){try{window.open("https://gemini.google.com/app","_blank")}catch(e){}},500)}
function card(i){var p=P[i],f=S.fav.indexOf(i)>=0;
return '<div class="card" style="'+bg(i)+'" onclick="S.open='+i+';render();scrollTo(0,0)">'+(p.n?'<span class="tag">NEW</span>':p.tr?'<span class="tag">🔥 HOT</span>':'')+'<button class="heart'+(f?' f':'')+'" onclick="toggleFav('+i+',event)">'+(f?'♥':'♡')+'</button><div class="em">'+p.e+'</div><b>'+p.t+'</b><small>'+p.c+' · '+p.d+'</small></div>'}
function list(ids){return ids.length?'<div class="grid">'+ids.map(card).join("")+'</div>':'<div class="empty">Nothing here yet.</div>'}
function G(){var a=["All"];P.forEach(function(p){if(a.indexOf(p.c)<0)a.push(p.c)});return a}
function ids(){var q=S.q.toLowerCase(),r=[];P.forEach(function(p,i){
var ok=S.tab=="All"||(S.tab=="New"&&p.n)||(S.tab=="Trending"&&p.tr)||S.tab=="Videos";
if(ok&&(S.g=="All"||p.c==S.g)&&(!q||(p.t+p.c+p.p).toLowerCase().indexOf(q)>=0))r.push(i)});return r}
function render(){var h="",a=document.getElementById("app");
if(S.open!==null){var p=P[S.open],f=S.fav.indexOf(S.open)>=0;
h='<button class="back" onclick="S.open=null;render()">← Back</button><div class="hero" style="'+bg(S.open)+'">'+p.e+'</div><h2 style="margin:14px 0 2px">'+p.t+'</h2><div class="mu">Genre: '+p.c+' · '+p.d+' video</div><div class="box"><h3>Prompt</h3><p>'+p.p+'</p></div><button class="btn" onclick="copyP('+S.open+')">📋 Copy Prompt</button><button class="btn" onclick="gem('+S.open+')">✨ Try on Gemini</button><button class="btn" style="background:var(--chip);color:var(--tx)" onclick="toggleFav('+S.open+')">'+(f?'♥ Saved to Favorites':'♡ Add to Favorites')+'</button><p class="mu">Tip: replace [BRACKETS] with your own details, and upload a reference image where the prompt mentions @image1.</p>';
}else if(S.nav=="home"){
h='<div class="top"><h1>Prompt Vault</h1></div><input id="q" placeholder="Search video prompts…" value="'+S.q.replace(/"/g,"")+'" oninput="S.q=this.value;render();var e=document.getElementById(\'q\');e.focus();e.setSelectionRange(99,99)"><div class="chips">'+Object.keys(D).map(function(k){return '<button class="chip'+(S.tab==k?' on':'')+'" onclick="S.tab=\''+k+'\';render()">'+k+'</button>'}).join("")+'</div><div class="mu" style="margin:-4px 0 6px;font-weight:600">Genre</div><div class="chips">'+G().map(function(k){return '<button class="chip g'+(S.g==k?' on':'')+'" onclick="S.g=\''+k+'\';render()">'+k+'</button>'}).join("")+'</div>'+list(ids());
}else if(S.nav=="fav"){h='<div class="top"><h1>Favorites</h1></div>'+(S.fav.length?list(S.fav):'<div class="empty">Tap ♡ on any prompt to save it here.</div>');
}else{h='<div class="top"><h1>About</h1></div><div class="box" style="text-align:center"><div style="font-size:56px">🎬</div><h2 style="margin:6px 0;color:var(--ac)">Prompt Vault AI Video Prompts</h2><div class="mu">Master prompts for AI video ideas</div></div><div class="box"><h3>How it works</h3><p class="mu">1. Pick a video idea.\n2. Copy the master prompt.\n3. Paste it into Gemini, Veo, Sora, Runway or any AI video tool.\n4. Swap the [BRACKETS] for your own subject.</p></div><button class="btn" onclick="navigator.share?navigator.share({title:\'Prompt Vault AI Video Prompts\',text:\x27Master prompts for AI video ideas\x27}).catch(function(){}):toast(\'Sharing is not available on this device\')">↗ Share App</button>'}
a.innerHTML=h;
if(S.open===null)a.innerHTML+='<nav>'+[["home","🏠","Home"],["fav","♡","Favorites"],["menu","☰","Menu"]].map(function(n){return '<button class="'+(S.nav==n[0]?'on':'')+'" onclick="S.nav=\''+n[0]+'\';render()"><span>'+n[1]+'</span>'+n[2]+'</button>'}).join("")+'</nav>'}
render();

Object.assign(window,{S,render,toggleFav,copyP,gem,toast});
