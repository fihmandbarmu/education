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

// --- READING & QUIZ MODULE ---
const stories = {
  'y1-6': {
    title: "Barnaby and the Golden Tree Quest",
    content: [
      "Deep inside the Whispering Forest lived a fluffy red squirrel named Barnaby. Barnaby was known throughout the forest for his bright green coat and his enormous curiosity. While other squirrels spent their days hiding acorns in underground roots, Barnaby loved hunting for old treasure maps hidden inside hollow maple leaves.",
      "One sunlit Tuesday morning, Barnaby stumbled upon a brilliant glowing oak leaf resting near the Crystal Creek. Written in shiny golden letters was a simple riddle: 'Where the river meets the tallest pine, dig three paws deep for a gift divine.' Barnaby packed his small blue backpack with pinecone snacks and set off on his greatest adventure.",
      "He leaped from bendy branches and scurried across mossy stepping stones. Along the way, he helped Oliver the Owl find his lost spectacles in a flowerbed. Grateful for Barnaby’s kindness, Oliver flew ahead to scout the forest path. With Oliver’s help, Barnaby reached the Giant Whispering Pine just as the golden sun began to set.",
      "Barnaby dug three paws into the soft earth. Right there, nestled in velvet moss, was a magical wooden acorn that sparkled like stars. When Barnaby touched it, the acorn sprouted into a little tree with leaves made of pure, warm sunshine. From that day on, Barnaby shared the magical tree's light with all his forest friends."
    ],
    questions: [
      {
        question: "1. What item did Barnaby find near the Crystal Creek?",
        options: ["A gold coin", "A glowing oak leaf with a riddle", "A map drawn on stone"],
        answer: 1
      },
      {
        question: "2. How did Barnaby help Oliver the Owl?",
        options: ["Found his lost spectacles", "Shared pinecone snacks", "Built a birdhouse"],
        answer: 0
      },
      {
        question: "3. What sprouted from the magical wooden acorn?",
        options: ["A silver flower", "A tree with leaves made of sunshine", "A giant pinecone"],
        answer: 1
      }
    ]
  },
  'y7-12': {
    title: "The Starlight Beacon of Sector 9",
    content: [
      "Cadet Leo adjusted the oxygen intake on his flight helmet as his orbital shuttle broke through the dense methane clouds surrounding Sector 9's outpost station. For twelve decades, Observatory Base Alpha had sat completely silent, suspended in dark space as a decommissioned relic from the early intergalactic frontier wars. Yet two hours ago, every sensor at Fleet Headquarters picked up a steady, rhythmic quantum transmission originating directly from the station’s main dish.",
      "Leo docked his ship in Bay 4 and unlatched the airlock. Dust floating in zero gravity shimmered like diamonds under his shoulder lights. Armed with a portable multi-scanner, he navigated the narrow metallic corridors toward the primary control deck. The air was surprisingly breathable, smelling faintly of ozone and old circuitry. Every forty-two seconds, a brilliant azure light pulse flashed across the overhead control monitors, accompanying the mysterious audio signal.",
      "Upon reaching the master console, Leo discovered that the station's primary AI core had not malfunctioned as engineers had suspected. Instead, an automated deep-space relay array had intercepted an uncharted navigational distress burst sent from outside our known galaxy. The emergency signal contained precise spatial coordinates pointing toward a rogue planet drifting through an interstellar void.",
      "Realizing the magnitude of the discovery, Leo uploaded the coordinates to his navigation drive and initiated a wide-spectrum Fleet broadcast. The long-abandoned station was not a forgotten ghost site; it was a cosmic lighthouse warning future explorers of an ancient stellar secret waiting in the dark universe beyond."
    ],
    questions: [
      {
        question: "1. How long had Observatory Base Alpha sat completely silent?",
        options: ["Twelve years", "Twelve decades", "Five centuries"],
        answer: 1
      },
      {
        question: "2. How often did the azure light pulse flash across the control monitors?",
        options: ["Every 10 seconds", "Every 42 seconds", "Every 5 minutes"],
        answer: 1
      },
      {
        question: "3. What caused the mysterious transmission?",
        options: ["An AI system error", "An ancient distress burst from outside the galaxy", "A radio glitch from Earth"],
        answer: 1
      }
    ]
  },
  '16-35': {
    title: "Architectural Evolution: The Sustainable Urban Matrix",
    content: [
      "The rapid modernization of 21st-century metropolitan hubs has triggered a fundamental paradigm shift in urban planning and civil engineering. As global populations concentrate in urban centers, city councils and architects are abandoning the resource-intensive, sprawling sprawl templates of the twentieth century. Instead, they are pioneering high-density, ecologically integrated urban matrices that treat cities as dynamic biological organisms.",
      "At the core of this movement is adaptive reuse—the practice of retrofitting obsolete industrial infrastructure into multi-purpose public assets. Abandoned elevated railway lines are transformed into continuous urban parks; former maritime shipping docks are engineered into floating solar arrays and community wetlands. These interventions do more than beautify concrete landscapes; they directly mitigate the urban heat island effect, improve stormwater management, and foster localized biodiversity.",
      "However, structural architectural innovation cannot exist in a vacuum separated from socioeconomic realities. The deployment of high-tech green infrastructure frequently inflates localized land values, accelerating gentrification and threatening to displace working-class communities. Consequently, contemporary urban policy must balance ecological ambition with structural social equity.",
      "Progressive cities are now implementing land trust models and mandatory inclusionary zoning alongside green building codes. By aligning private capital incentives with public welfare guarantees, urban planners aim to ensure that the cities of tomorrow are not merely technologically resilient, but socially inclusive sanctuaries capable of adapting to climate volatility."
    ],
    questions: [
      {
        question: "1. What concept forms the core of modern sustainable urban planning?",
        options: ["Industrial expansion", "Adaptive reuse of old infrastructure", "Suburban land clearing"],
        answer: 1
      },
      {
        question: "2. What negative socioeconomic side effect can green infrastructure cause?",
        options: ["Higher urban temperatures", "Gentrification and displacement", "Reduced solar energy production"],
        answer: 1
      },
      {
        question: "3. How are progressive cities attempting to preserve social equity?",
        options: ["By banning new construction", "By using land trusts & inclusionary zoning", "By lowering building safety codes"],
        answer: 1
      }
    ]
  },
  '36plus': {
    title: "Epistemology, Cognitive Synthesis, and the Wisdom Horizon",
    content: [
      "As human beings navigate the passage into mature adulthood and later age, the qualitative nature of human cognition undergoes an intricate, profound evolution. In youth, cognitive processing is predominantly characterized by fluid intelligence—the rapid acquisition of novel information, pattern recognition, and speed-oriented problem solving. However, as decades accumulate, the human brain systematically reorganizes its processing priorities toward crystallized intelligence: the synthesis of complex conceptual frameworks, contextual reasoning, and experiential wisdom.",
      "Philosophically, this cognitive shift alters how individuals perceive time, identity, and historical narrative. Where early life often requires forward-looking tactical decision-making focused on career accumulation and social positioning, middle and mature age encourages an epistemological recalibration. Life experiences cease to exist as isolated historical events; rather, they merge into an interconnected web of meaning. This permits mature thinkers to navigate ambiguity, exercise emotional regulation, and evaluate societal dilemmas through a multi-generational lens.",
      "Neurological research confirms that while raw computational processing speed naturally declines over time, structural connectivity across hemispheric neural networks often increases in intellectually active adults. This enhanced cross-talk enables mature minds to cross-reference past outcomes with present dilemmas, offering nuanced perspectives that purely algorithm-driven or high-speed fluid analysis might overlook.",
      "Ultimately, engaging with demanding literary prose, historical narrative, and philosophical inquiry acts as a vital neuro-protective catalyst. It reinforces cognitive reserve and fosters reflective detachment from ephemeral cultural anxieties. By cultivating wisdom as an active intellectual practice, mature individuals anchor society, acting as vital stewards of cultural memory, ethics, and long-term human progress."
    ],
    questions: [
      {
        question: "1. What type of intelligence becomes dominant in mature adulthood?",
        options: ["Fluid intelligence", "Crystallized intelligence", "Spatial intelligence"],
        answer: 1
      },
      {
        question: "2. How does structural brain connectivity change in active mature adults?",
        options: ["Cross-talk between neural networks increases", "Brain networks completely shut down", "Fluid speed quadruples"],
        answer: 0
      },
      {
        question: "3. What societal role do mature individuals fulfill according to the passage?",
        options: ["Tactical corporate pioneers", "Stewards of cultural memory, ethics, and progress", "Purely algorithmic decision makers"],
        answer: 1
      }
    ]
  }
};

let currentStoryKey = 'y1-6';

function loadStory(catKey, event) {
  currentStoryKey = catKey;

  // UI button update
  if (event) {
    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');
  }

  const story = stories[catKey];
  document.getElementById('story-title').innerText = story.title;

  const bodyEl = document.getElementById('story-body');
  bodyEl.innerHTML = story.content.map(p => `<p>${p}</p>`).join('');

  // Count words
  const totalWords = story.content.join(' ').split(/\s+/).length;
  document.getElementById('story-meta').innerText = `${totalWords} Words`;

  // Render Quiz Questions
  renderQuiz(story.questions);
}

function renderQuiz(questions) {
  const container = document.getElementById('quiz-container');
  container.innerHTML = '';
  document.getElementById('quiz-result').innerText = '';

  questions.forEach((q, qIndex) => {
    const qBox = document.createElement('div');
    qBox.className = 'quiz-q-box';

    let optionsHTML = q.options.map((opt, oIndex) => `
      <label class="quiz-opt-label">
        <input type="radio" name="q_${qIndex}" value="${oIndex}">
        ${opt}
      </label>
    `).join('');

    qBox.innerHTML = `
      <div class="quiz-q-title">${q.question}</div>
      <div class="quiz-options">${optionsHTML}</div>
    `;
    container.appendChild(qBox);
  });
}

function checkQuiz() {
  const story = stories[currentStoryKey];
  let score = 0;
  let total = story.questions.length;

  story.questions.forEach((q, qIndex) => {
    const selected = document.querySelector(`input[name="q_${qIndex}"]:checked`);
    if (selected && parseInt(selected.value) === q.answer) {
      score++;
    }
  });

  const resultEl = document.getElementById('quiz-result');
  if (score === total) {
    resultEl.innerHTML = `🎉 Perfect Score! ${score}/${total} Correct! Excellent comprehension!`;
    resultEl.style.color = 'var(--green)';
  } else {
    resultEl.innerHTML = `⭐ You scored ${score}/${total}. Review the story and try again!`;
    resultEl.style.color = 'var(--orange)';
  }
}

// --- INITIALIZATION ---
window.onload = () => {
  startMultiplication();
  startAddition();
  loadStory('y1-6', null);
};
