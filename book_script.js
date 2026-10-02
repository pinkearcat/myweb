const pages = Array.from({
  length: 8
}, (_, i) => `images/page${String(i+1).padStart(2,"0")}.png`);

// 각 페이지의 동화 문구를 여기에 입력하면 됩니다.
const pageTexts = [
  "따뜻한 여름날, 알들이 하나둘 깨어났어요. \n 그런데 커다란 알 하나만 꿈쩍도 하지 않았지요.", // 1페이지
  "마침내 마지막 알이 깨졌어요. \n 그 속에서 크고 회색빛인 아기 오리가 나왔답니다.", // 2페이지
  "“자, 모두 물로 들어가 보렴!” \n 아기 오리는 누구보다 멋지게 헤엄쳤어요.", // 3페이지
  "“쟤 좀 봐. 정말 이상하게 생겼어!” \n 농장의 동물들은 아기 오리를 놀렸어요.", // 4페이지
  "날이 갈수록 아기 오리는 더 외로워졌어요. \n 아무도 자기와 함께 있으려 하지 않았거든요.", // 5페이지
  "“여기서는 아무도 날 좋아하지 않아.” \n 아기 오리는 홀로 농장을 떠났어요.", // 6페이지
  "탕! 탕! \n 총소리에 놀란 아기 오리는 몸을 꼭 숨겼어요.", // 7페이지
  "노파의 오두막폭풍을 피해 작은 오두막을 발견했어요. \n “여기라면 편히 지낼 수 있을까?”" // 8페이지
];

const closed = document.querySelector("#closedBook"),
  open = document.querySelector("#openBook");
const left = document.querySelector("#leftPage"),
  right = document.querySelector("#rightPage");
const leftText = document.querySelector("#leftText"),
  rightText = document.querySelector("#rightText");
const prev = document.querySelector("#prev"),
  next = document.querySelector("#next"),
  counter = document.querySelector("#counter");
const turn = document.querySelector("#turnPage"),
  front = document.querySelector("#turnFront"),
  back = document.querySelector("#turnBack");
let isCover = true,
  spread = 0,
  busy = false;
const pageSrc = i => (i >= 0 && i < pages.length) ? pages[i] : "";

function render() {
  if (isCover) {
    closed.classList.remove("hide");
    open.classList.remove("show");
    counter.textContent = "1 / 9";
    prev.disabled = true;
    next.disabled = false;
    return;
  }
  closed.classList.add("hide");
  open.classList.add("show");
  const li = spread * 2,
    ri = li + 1;
  left.src = pageSrc(li);
  right.src = pageSrc(ri);
  leftText.textContent = pageTexts[li] || "";
  rightText.textContent = pageTexts[ri] || "";

  // 현재 표시 중인 페이지 번호를 data-page에 자동으로 기록
  leftText.dataset.page = li + 1;
  rightText.dataset.page = ri + 1;
  left.style.visibility = pageSrc(li) ? "visible" : "hidden";
  right.style.visibility = pageSrc(ri) ? "visible" : "hidden";
  counter.textContent = `${Math.min(9,li+2)} / 9`;
  prev.disabled = busy;
  next.disabled = busy || ri >= pages.length - 1;
}

function nextPage() {
  if (busy) return;
  if (isCover) {
    isCover = false;
    spread = 0;
    render();
    return
  }
  const ni = (spread + 1) * 2;
  if (ni >= pages.length) return;
  busy = true;
  render();
  front.src = pageSrc(spread * 2 + 1) || pageSrc(spread * 2);
  back.src = pageSrc(ni);
  turn.className = "turn-page active";
  void turn.offsetWidth;
  turn.classList.add("forward");
  turn.addEventListener("animationend", function done() {
    spread++;
    turn.className = "turn-page";
    turn.removeEventListener("animationend", done);
    busy = false;
    render()
  })
}

function prevPage() {
  if (busy || isCover) return;
  if (spread === 0) {
    isCover = true;
    render();
    return
  }
  busy = true;
  render();
  front.src = pageSrc((spread - 1) * 2 + 1);
  back.src = pageSrc(spread * 2);
  turn.className = "turn-page active backward";
  turn.addEventListener("animationend", function done() {
    spread--;
    turn.className = "turn-page";
    turn.removeEventListener("animationend", done);
    busy = false;
    render()
  })
}
next.onclick = nextPage;
prev.onclick = prevPage;
document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") nextPage();
  if (e.key === "ArrowLeft") prevPage()
});
render();
