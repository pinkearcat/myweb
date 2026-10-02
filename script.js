const screens = document.querySelectorAll('.screen');
const intro = document.getElementById('intro');
const introQuestion = document.getElementById('introQuestion');
const goWrite = document.getElementById('goWrite');
const form = document.getElementById('messageForm');
const messageBox = document.getElementById('messageBox');
const message = document.getElementById('message');
const resultCard = document.getElementById('resultCard');
const resultMessage = document.getElementById('resultMessage');
const introTime = document.getElementById('introTime');
const writeTime = document.getElementById('writeTime');
const sendTime = document.getElementById('sendTime');

let remaining = 10 * 60;

function formatTime(sec) {
  const h = String(Math.floor(sec / 3600)).padStart(2, '0');
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');
  return `${h} : ${m} : ${s}`;
}

function updateVitals() {
  const elapsed = 600 - remaining;
  let hr, spo2;

  // 남은 시간이 줄수록 심박은 상승하고 산소포화도는 하락
  if (remaining > 300) {
    hr = 145 + Math.floor(elapsed / 35) + Math.floor(Math.random() * 9);
    spo2 = 88 - Math.floor(elapsed / 120) - Math.floor(Math.random() * 3);
  } else if (remaining > 60) {
    hr = 158 + Math.floor((300 - remaining) / 20) + Math.floor(Math.random() * 12);
    spo2 = 84 - Math.floor((300 - remaining) / 55) - Math.floor(Math.random() * 3);
  } else if (remaining > 10) {
    hr = 174 + Math.floor(Math.random() * 20);
    spo2 = 76 - Math.floor(Math.random() * 7);
  } else if (remaining > 0) {
    // 마지막 10초: 수치가 크게 흔들림
    hr = 105 + Math.floor(Math.random() * 75);
    spo2 = 62 - Math.floor(Math.random() * 10);
  } else {
    hr = 0;
    spo2 = 0;
  }

  document.querySelectorAll('.hrValue').forEach(el => el.textContent = hr);
  document.querySelectorAll('.spo2Value').forEach(el => el.textContent = spo2);

  document.querySelectorAll('.monitor').forEach(monitor => {
    monitor.classList.toggle('critical', remaining <= 60);
  });

  if (remaining === 0) {
    document.querySelectorAll('.ecg polyline').forEach(line => {
      line.setAttribute('points', '0,55 600,55');
    });
  }
}

function updateTimer() {
  const time = formatTime(remaining);
  introTime.textContent = time;
  writeTime.textContent = time;
  sendTime.textContent = time;
  updateVitals();
}

function showScreen(id) {
  screens.forEach(screen => screen.classList.toggle('active', screen.id === id));
}

function applyChoice(target) {
  const font = document.querySelector('input[name="font"]:checked').value;
  const card = document.querySelector('input[name="card"]:checked').value;
  target.classList.remove('dokdo-font','nanum-font','pink-card','blue-card','green-card');
  target.classList.add(`${font}-font`, `${card}-card`);
}

updateTimer();

setInterval(() => {
  if (remaining > 0) {
    remaining--;
    updateTimer();
  }
}, 1000);

setTimeout(() => {
  introQuestion.textContent = '당신의 남은 수명입니다.';
  intro.classList.add('revealed', 'er-on');
}, 3000);

goWrite.addEventListener('click', () => showScreen('write'));

document.querySelectorAll('input[name="font"], input[name="card"]').forEach(input => {
  input.addEventListener('change', () => applyChoice(messageBox));
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!message.value.trim()) {
    alert('메시지를 입력해주세요.');
    message.focus();
    return;
  }
  applyChoice(resultCard);
  resultMessage.textContent = message.value;
  showScreen('complete');
});
