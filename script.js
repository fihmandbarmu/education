// --- TAB NAVIGATION ---
function switchTab(tabId, event) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));

  document.getElementById(tabId).classList.add('active');
  event.currentTarget.classList.add('active');
}

function checkEnter(event, callback) {
  if (event.key === 'Enter') callback();
}

// --- MULTIPLICATION MODULE ---
let multState = { num1: 0, num2: 0, score: 0, streak: 0 };

function startMultiplication() {
  const tableVal = document.getElementById('table-select').value;
  multState.num1 = tableVal === 'all' ? Math.floor(Math.random() * 12) + 1 : parseInt(tableVal);
  multState.num2 = Math.floor(Math.random() * 12) + 1;

  document.getElementById('mult-question').innerText = `${multState.num1} × ${multState.num2} = ?`;
  document.getElementById('mult-answer').value = '';
  document.getElementById('mult-answer').focus();
}

function checkMultiplication() {
  const input = parseInt(document.getElementById('mult-answer').value);
  const correct = multState.num1 * multState.num2;
  const feedback = document.getElementById('mult-feedback');

  if (input === correct) {
    feedback.innerText = '🎉 AWESOME! CORRECT!';
    feedback.className = 'feedback correct';
    multState.score += 10;
    multState.streak += 1;
  } else {
    feedback.innerText = `❌ Oops! The correct answer was ${correct}.`;
    feedback.className = 'feedback incorrect';
    multState.streak = 0;
  }

  document.getElementById('mult-score').innerText = multState.score;
  document.getElementById('mult-streak').innerText = multState.streak;
  startMultiplication();
}

// --- ADDITION MODULE ---
let addState = { num1: 0, num2: 0, score: 0, streak: 0 };

function generateRandomNumber(digits) {
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startAddition() {
  const digits = parseInt(document.getElementById('digit-select').value);
  addState.num1 = generateRandomNumber(digits);
  addState.num2 = generateRandomNumber(digits);

  document.getElementById('num1').innerText = addState.num1.toLocaleString();
  document.getElementById('num2').innerText = '+ ' + addState.num2.toLocaleString();
  document.getElementById('add-answer').value = '';
  document.getElementById('add-answer').focus();
}

function checkAddition() {
  const input = parseInt(document.getElementById('add-answer').value);
  const correct = addState.num1 + addState.num2;
  const feedback = document.getElementById('add-feedback');

  if (input === correct) {
    feedback.innerText = '🌟 BRILLIANT CALCULATION!';
    feedback.className = 'feedback correct';
    addState.score += 15;
    addState.streak += 1;
  } else {
    feedback.innerText = `❌ Not quite! The correct total was ${correct.toLocaleString()}.`;
    feedback.className = 'feedback incorrect';
    addState.streak = 0;
  }

  document.getElementById('add-score').innerText = addState.score;
  document.getElementById('add-streak').innerText = addState.streak;
  startAddition();
}

// --- INITIALIZATION ---
window.onload = () => {
  startMultiplication();
  startAddition();
};
