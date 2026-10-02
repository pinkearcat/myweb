const pages = Array.from({
  length: 15
}, (_, i) => `images/page${String(i+1).padStart(2,"0")}.png`);

// 각 페이지의 동화 문구를 여기에 입력하면 됩니다.
const pageTexts = [
  // 1페이지
  "따뜻한 여름날, 엄마 오리가 품고 있던 알들이 \n 하나둘 깨어났어요.\n노란 아기 오리들이 세상 밖으로 나왔지만,\n커다란 알 하나만은 꿈쩍도 하지 않았지요.",

  // 2페이지
  "엄마 오리는 커다란 알을 조금 더 기다려 보기로 했어요.\n마침내 알에 금이 가더니, 크고 회색빛인 아기 오리가 모습을 드러냈답니다.",

  // 3페이지
  "엄마 오리는 아기 오리들을 데리고 \n 연못으로 향했어요.\n“자, 모두 물로 들어가 보렴!”\n회색 아기 오리도 물에 뛰어들어\n 누구보다 멋지게 헤엄쳤어요.",

  // 4페이지
  "하지만 농장으로 돌아오자 동물들은\n 회색 아기 오리를 이상하게 바라보았어요.\n“쟤 좀 봐. 우리랑 정말 다르게 생겼어!”",

  // 5페이지
  "날이 갈수록 놀림은 계속되었어요.\n친구들은 아기 오리를 피했고, \n아기 오리는 점점 외로워졌어요.",

  // 6페이지
  "결국 아기 오리는 더 이상 견딜 수 없었어요.\n“여기서는 아무도 날 좋아하지 않아.”\n아기 오리는 쓸쓸히 농장을 떠나 혼자 길을 나섰답니다.",

  // 7페이지
  "한참을 걷던 아기 오리는 넓은 늪지에 도착했어요.\n그런데 갑자기 어디선가 “탕! 탕!” 총소리가 울려 퍼졌어요.\n깜짝 놀란 아기 오리는 풀숲 깊숙이 몸을 숨겼지요.",

  // 8페이지
  "간신히 늪지를 빠져나왔지만, \n 이번에는 거센 비바람이 몰아쳤어요.\n비에 흠뻑 젖은 아기 오리는\n 작은 오두막 하나를 발견했어요.\n“여기라면 편히 지낼 수 있을까?”",

  // 9페이지
  "아기 오리는 잠시 오두막에서 지냈지만 \n마음은 편하지 않았어요.\n“나는 좁은 곳보다 넓은 물에서 마음껏 헤엄치고 싶어.”\n결국 아기 오리는 다시 세상 밖으로 나갔답니다.",

  // 10페이지
  "다시 길을 떠난 어느 날, \n아기 오리는 하늘을 올려다보다 눈을 떼지 못했어요.\n눈부시게 하얀 새들이\n 커다란 날개를 펼치고 날아가고 있었거든요.\n“정말 아름답다…….”",

  // 11페이지
  "아름다운 새들이 떠나고, \n어느새 계절은 겨울이 되었어요.\n매서운 추위에 호수까지 꽁꽁 얼어붙었지요.\n아기 오리는 차가운 얼음 속에서 \n힘겹게 겨울을 버텼어요.",

  // 12페이지
  "그렇게 길고 추운 겨울이 지나갔어요.\n얼음이 녹고 따뜻한 햇살이 비치자,\n들판에는 다시 꽃이 피기 시작했어요.\n마침내 봄이 찾아온 거예요.",

  // 13페이지
  "따뜻한 봄날, 아기 오리는 다시 호숫가로 향했어요.\n그때 아름다운 백조들이 나타났어요.\n“나도…… 저들에게 가 볼까?”",

  // 14페이지
  "아기 오리는 용기를 내어 천천히 물가로 다가갔어요.\n그러다 문득 고개를 숙였는데,\n물 위에 낯선 모습이 비쳤어요.\n“어? 이게…… 나라고?”",

  // 15페이지
  "물 위에 비친 것은\n더 이상 못생긴 회색 아기 오리가 아니었어요.\n어느새 아기 오리는\n눈부시게 아름다운 백조가 되어 있었답니다.\n“이렇게 행복한 날이 내게도 찾아왔구나.”"
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
    counter.textContent = "1 / 15";
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
  counter.textContent = `${Math.min(15,li+2)} / 15`;
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
