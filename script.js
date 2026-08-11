// State variables
let currentOperation = 'add'; // 'add', 'sub', 'mult', 'div'
let currentDigits = 2;        // 1 to 6
let num1 = 0;
let num2 = 0;
let expectedAnswer = 0;
let score = 0;
let streak = 0;

// Place Value Header Labels
const PLACE_VALUES = ['O', 'T', 'H', 'Th', 'TTh', 'HTh', 'M'];

function selectMode(op, digits) {
  currentOperation = op;
  currentDigits = digits;

  // Highlight active button in selection grid
  document.querySelectorAll('.grid-btn').forEach(btn => btn.classList.remove('active'));
  event.currentTarget.classList.add('active');

  generateProblem();
}

function getRandomNumber(digits) {
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateProblem() {
  document.getElementById('feedback').innerText = '';
  document.getElementById('feedback').className = 'feedback';

  num1 = getRandomNumber(currentDigits);
  num2 = getRandomNumber(currentDigits);

  if (currentOperation === 'sub' && num2 > num1) {
    // Keep upper number larger for non-negative subtraction
    [num1, num2] = [num2, num1];
  } else if (currentOperation === 'div') {
    // Generate clean division problems
    num2 = Math.floor(Math.random() * 9) + 1;
    let multiplier = getRandomNumber(Math.max(1, currentDigits - 1));
    num1 = num2 * multiplier;
  }

  calculateExpectedAnswer();
  renderBoard();
}

function calculateExpectedAnswer() {
  switch (currentOperation) {
    case 'add': expectedAnswer = num1 + num2; break;
    case 'sub': expectedAnswer = num1 - num2; break;
    case 'mult': expectedAnswer = num1 * num2; break;
    case 'div': expectedAnswer = Math.floor(num1 / num2); break;
  }
}

function renderBoard() {
  const board = document.getElementById('column-board');
  board.innerHTML = '';

  const str1 = num1.toString();
  const str2 = num2.toString();
  const strAns = expectedAnswer.toString();

  const totalCols = Math.max(str1.length, str2.length, strAns.length);

  // 1. Place Value Header Row
  const headerRow = document.createElement('div');
  headerRow.className = 'column-row';
  for (let i = totalCols - 1; i >= 0; i--) {
    const pvCell = document.createElement('div');
    pvCell.className = 'cell pv-header';
    pvCell.innerText = PLACE_VALUES[i] || 'PV';
    headerRow.appendChild(pvCell);
  }
  board.appendChild(headerRow);

  // 2. Carry/Regrouping Dashed Input Boxes Row
  const carryRow = document.createElement('div');
  carryRow.className = 'column-row';
  for (let i = 0; i < totalCols; i++) {
    const carryCell = document.createElement('div');
    carryCell.className = 'cell';
    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 2;
    input.className = 'carry-box';
    carryCell.appendChild(input);
    carryRow.appendChild(carryCell);
  }
  board.appendChild(carryRow);

  // 3. First Number Row
  const row1 = document.createElement('div');
  row1.className = 'column-row';
  const paddedStr1 = str1.padStart(totalCols, ' ');
  for (let char of paddedStr1) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.innerText = char === ' ' ? '' : char;
    row1.appendChild(cell);
  }
  board.appendChild(row1);

  // 4. Second Number Row with Operator Symbol
  const row2 = document.createElement('div');
  row2.className = 'column-row';
  
  const opCell = document.createElement('div');
  opCell.className = 'cell operator-cell';
  const symbols = { add: '+', sub: '-', mult: '×', div: '÷' };
  opCell.innerText = symbols[currentOperation];
  row2.appendChild(opCell);

  const paddedStr2 = str2.padStart(totalCols - 1, ' ');
  for (let char of paddedStr2) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.innerText = char === ' ' ? '' : char;
    row2.appendChild(cell);
  }
  board.appendChild(row2);

  // 5. Solid Line Divider
  const line = document.createElement('div');
  line.className = 'line-divider';
  board.appendChild(line);

  // 6. Answer Digit Input Boxes Row
  const answerRow = document.createElement('div');
  answerRow.className = 'column-row';
  for (let i = 0; i < strAns.length; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';

    const input = document.createElement('input');
    input.type = 'number';
    input.className = 'digit-input';
    input.dataset.index = i;
    input.onkeyup = (e) => handleDigitAutoTab(e, i);

    cell.appendChild(input);
    answerRow.appendChild(cell);
  }
  board.appendChild(answerRow);

  // Auto-focus first digit box
  setTimeout(() => {
    const firstInput = answerRow.querySelector('.digit-input');
    if (firstInput) firstInput.focus();
  }, 100);
}

function handleDigitAutoTab(e, index) {
  if (e.key === 'Enter') {
    checkAnswer();
    return;
  }
  // Auto-tab cursor leftward as digits are entered
  if (e.target.value.length === 1 && index > 0) {
    const inputs = document.querySelectorAll('.digit-input');
    if (inputs[index - 1]) inputs[index - 1].focus();
  }
}

function checkAnswer() {
  const inputs = document.querySelectorAll('.digit-input');
  let userAnswerStr = '';

  inputs.forEach(input => {
    userAnswerStr += input.value.trim();
  });

  const feedback = document.getElementById('feedback');

  if (userAnswerStr === expectedAnswer.toString()) {
    feedback.innerText = '🎉 Fantastic! Correct!';
    feedback.className = 'feedback correct';
    score += 10;
    streak += 1;
  } else {
    feedback.innerText = `❌ Oops! The correct answer was ${expectedAnswer.toLocaleString()}.`;
    feedback.className = 'feedback incorrect';
    streak = 0;
  }

  document.getElementById('score').innerText = score;
  document.getElementById('streak').innerText = streak;
}

// Initial initialization
window.onload = () => {
  const defaultBtn = document.querySelectorAll('.grid-btn.btn-add')[1];
  if (defaultBtn) defaultBtn.classList.add('active');
  generateProblem();
};
