const pages=Array.from({length:8},(_,i)=>`images/page${String(i+1).padStart(2,"0")}.png`);
const closed=document.querySelector("#closedBook"),open=document.querySelector("#openBook");
const left=document.querySelector("#leftPage"),right=document.querySelector("#rightPage");
const prev=document.querySelector("#prev"),next=document.querySelector("#next"),counter=document.querySelector("#counter");
const turn=document.querySelector("#turnPage"),front=document.querySelector("#turnFront"),back=document.querySelector("#turnBack");
let isCover=true,spread=0,busy=false;
const pageSrc=i=>(i>=0&&i<pages.length)?pages[i]:"";
function render(){
  if(isCover){
    closed.classList.remove("hide");open.classList.remove("show");
    counter.textContent="1 / 9";prev.disabled=true;next.disabled=false;return;
  }
  closed.classList.add("hide");open.classList.add("show");
  const li=spread*2,ri=li+1;
  left.src=pageSrc(li);right.src=pageSrc(ri);
  left.style.visibility=pageSrc(li)?"visible":"hidden";
  right.style.visibility=pageSrc(ri)?"visible":"hidden";
  counter.textContent=`${Math.min(9,li+2)} / 9`;
  prev.disabled=busy;next.disabled=busy||ri>=pages.length-1;
}
function nextPage(){
  if(busy)return;
  if(isCover){isCover=false;spread=0;render();return}
  const ni=(spread+1)*2;if(ni>=pages.length)return;
  busy=true;render();
  front.src=pageSrc(spread*2+1)||pageSrc(spread*2);back.src=pageSrc(ni);
  turn.className="turn-page active";void turn.offsetWidth;turn.classList.add("forward");
  turn.addEventListener("animationend",function done(){spread++;turn.className="turn-page";turn.removeEventListener("animationend",done);busy=false;render()})
}
function prevPage(){
  if(busy||isCover)return;
  if(spread===0){isCover=true;render();return}
  busy=true;render();
  front.src=pageSrc((spread-1)*2+1);back.src=pageSrc(spread*2);
  turn.className="turn-page active backward";
  turn.addEventListener("animationend",function done(){spread--;turn.className="turn-page";turn.removeEventListener("animationend",done);busy=false;render()})
}
next.onclick=nextPage;prev.onclick=prevPage;
document.addEventListener("keydown",e=>{if(e.key==="ArrowRight")nextPage();if(e.key==="ArrowLeft")prevPage()});
render();
