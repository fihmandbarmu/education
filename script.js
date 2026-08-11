// --- TAB NAVIGATION ---
function switchTab(tabId) {
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
    feedback.innerText = 'Correct! Great job!';
    feedback.className = 'feedback correct';
    multState.score += 10;
    multState.streak += 1;
  } else {
    feedback.innerText = `Incorrect. The answer was ${correct}.`;
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
    feedback.innerText = 'Correct! Well calculated!';
    feedback.className = 'feedback correct';
    addState.score += 15;
    addState.streak += 1;
  } else {
    feedback.innerText = `Incorrect. The answer was ${correct.toLocaleString()}.`;
    feedback.className = 'feedback incorrect';
    addState.streak = 0;
  }

  document.getElementById('add-score').innerText = addState.score;
  document.getElementById('add-streak').innerText = addState.streak;
  startAddition();
}

// --- READING PORTAL MODULE ---
const stories = {
  'y1-6': {
    title: "Barnaby's Little Wooden Acorn",
    content: [
      "Barnaby was a small red squirrel who lived inside a tall oak tree. Every morning, Barnaby searched the forest floor for tasty nuts.",
      "One sunlit afternoon, he found a shiny wooden acorn resting under a broad green fern. Unlike real acorns, this one glowed with a faint warm light.",
      "Barnaby buried it near his nest. The next day, a small tree sprouted with leaves made of soft golden thread. Barnaby smiled, knowing his forest had gained a lovely little secret."
    ]
  },
  'y7-12': {
    title: "The Starlight Beacon of Sector 9",
    content: [
      "Leo adjusted his helmet communications gear as his small atmospheric vessel descended toward Observatory Base Alpha. High above the dust cloud of Sector 9, the old optical telescope was broadcasting an unexpected, rhythmic blue light signal.",
      "Nobody had staffed the station since the automated deep-space relays came online a decade prior. Yet, every forty-two seconds, the high-frequency beacon spiked across all regional communication channels.",
      "Inside the main dome, Leo discovered an active computer terminal displaying ancient navigational coordinates. The system was auto-calibrating to point straight toward an unidentified incoming cosmic object traveling from outside the solar boundary."
    ]
  },
  '16-35': {
    title: "Navigating the Architectural Horizon",
    content: [
      "The rapid evolution of modern urban planning reflects a fundamental shift in how human societies balance technological integration with sustainable ecological design. Cities across the globe are turning away from industrial sprawling templates toward high-density, green-injected urban centers.",
      "Architects now prioritize adaptive reuse—converting abandoned 20th-century warehouses, elevated railway systems, and decommissioned ports into vibrant public hubs. These spaces seamlessly merge native vegetation, solar arrays, and smart public transit infrastructure.",
      "However, structural transformation presents major social challenges. As gentrification drives up land valuation, city councils face mounting pressure to safeguard affordable housing while attracting tech capital. Achieving true socio-economic sustainability demands not just clean architecture, but inclusive policy frameworks that preserve cultural identity while embracing modern progress."
    ]
  },
  '36plus': {
    title: "The Epistemology of Memory and Time",
    content: [
      "As individuals move through late adulthood, the qualitative experience of memory undergoes a profound, reflective metamorphosis. Where youth prioritizes rapid acquisition and forward-looking strategic utility, maturity often recalibrates cognition toward synthesizing lived experience into coherent philosophical narrative frameworks.",
      "Historical reflection reveals that human wisdom is rarely a static accumulation of discrete facts; rather, it manifests as an evolving capacity to contextualize nuance amidst ambiguity. Historical perspectives, artistic expression, and intergenerational dialogue serve as essential mechanisms through which older adults contextualize individual mortality against the vast continuum of collective human progress.",
      "Modern neuroscientific findings mirror these long-standing sociological observations. While processing speed and fluid intelligence naturally peak during early adulthood, crystallized intelligence—the accumulated structural knowledge of language, culture, and contextual reasoning—remains stable and frequently expands across middle and advanced age.",
      "Ultimately, engaging with long-form literature, complex historical analysis, and contemplative texts reinforces cognitive resilience. It fosters a reflective distance from transient cultural trends, anchoring the mature mind in timeless inquiries concerning community stewardship, ethics, and enduring legacy."
    ]
  }
};

function loadStory(catKey) {
  // Update active category button UI
  const buttons = document.querySelectorAll('.cat-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  event.currentTarget.classList.add('active');

  const story = stories[catKey];
  document.getElementById('story-title').innerText = story.title;

  const bodyEl = document.getElementById('story-body');
  bodyEl.innerHTML = story.content.map(p => `<p>${p}</p>`).join('');

  // Calculate approximate word count
  const totalWords = story.content.join(' ').split(/\s+/).length;
  document.getElementById('story-meta').innerText = `${totalWords} Words`;
}

// --- INITIALIZATION ---
window.onload = () => {
  startMultiplication();
  startAddition();
  // Load initial story manually without event dependency
  const initialStory = stories['y1-6'];
  document.getElementById('story-title').innerText = initialStory.title;
  document.getElementById('story-body').innerHTML = initialStory.content.map(p => `<p>${p}</p>`).join('');
  document.getElementById('story-meta').innerText = `${initialStory.content.join(' ').split(/\s+/).length} Words`;
};
