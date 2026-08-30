(function () {
  var STORAGE = "unbounded.scarlett.testing.map-math-20-g5";
  var QUESTIONS = [
    {
      stem: "Which number is ten times as much as 4.07?",
      choices: { A: "0.407", B: "40.7", C: "407", D: "4.70" },
      answer: "B"
    },
    {
      stem: "5.03 − 1.7 =",
      choices: { A: "3.33", B: "4.33", C: "3.96", D: "6.73" },
      answer: "A"
    },
    {
      stem: "4.8 × 100 =",
      choices: { A: "0.048", B: "48", C: "480", D: "4,800" },
      answer: "C"
    },
    {
      stem: "Which expression is equivalent to 7 × 48?",
      choices: { A: "7 × 50 − 2", B: "7 × 50 − 7 × 2", C: "(7 + 50) × (7 + 2)", D: "7 × 50 + 2" },
      answer: "B"
    },
    {
      stem: "A pan of brownies is 3/4 full. Scarlett eats 1/3 of what is left. How much of the whole pan did she eat?",
      choices: { A: "1/12", B: "1/4", C: "1/2", D: "2/3" },
      answer: "B"
    },
    {
      stem: "2/3 + 1/6 =",
      choices: { A: "3/9", B: "1/2", C: "5/6", D: "3/6" },
      answer: "C"
    },
    {
      stem: "2 1/4 × 3 =",
      choices: { A: "5 1/4", B: "6 3/4", C: "6 1/4", D: "8 1/4" },
      answer: "B"
    },
    {
      stem: "Half of a sandwich is shared equally among 4 people. How much of the whole sandwich does each person get?",
      choices: { A: "1/8", B: "1/6", C: "1/4", D: "2" },
      answer: "A"
    },
    {
      stem: "Maya has 18 red beads and 12 blue beads. She wants to make identical bracelets with no beads left over. What is the greatest number of bracelets she can make?",
      choices: { A: "3", B: "6", C: "12", D: "18" },
      answer: "B"
    },
    {
      stem: "A rectangular garden is 8 feet long and 5 feet wide. Which statement is true?",
      choices: {
        A: "The area is 26 square feet and the perimeter is 40 feet.",
        B: "The area is 40 square feet and the perimeter is 26 feet.",
        C: "The area is 13 square feet and the perimeter is 40 feet.",
        D: "The area is 40 square feet and the perimeter is 13 feet."
      },
      answer: "B"
    },
    {
      stem: "A box measures 4 cm by 3 cm by 5 cm. What is its volume?",
      choices: { A: "12 cubic cm", B: "20 cubic cm", C: "60 cubic cm", D: "120 cubic cm" },
      answer: "C"
    },
    {
      stem: "A triangle has a base of 10 inches and a height of 6 inches. What is its area?",
      choices: { A: "16 square inches", B: "60 square inches", C: "30 square inches", D: "32 square inches" },
      answer: "C"
    },
    {
      stem: "Angle R measures 55°. What is the measure of an angle that is supplementary to angle R?",
      choices: { A: "35°", B: "45°", C: "125°", D: "305°" },
      answer: "C"
    },
    {
      stem: "The points (2, 1) and (2, 6) are plotted on a coordinate grid. Which point is 3 units to the right of (2, 1)?",
      choices: { A: "(5, 1)", B: "(2, 4)", C: "(5, 4)", D: "(−1, 1)" },
      answer: "A"
    },
    {
      stem: "What is the value of 8 + 4 × 3?",
      choices: { A: "36", B: "20", C: "24", D: "16" },
      answer: "B"
    },
    {
      stem: "Which number is greatest?",
      choices: { A: "3.09", B: "3.9", C: "3.19", D: "3.099" },
      answer: "B"
    },
    {
      stem: "How many inches are in 3 1/2 feet?",
      choices: { A: "36", B: "38", C: "42", D: "48" },
      answer: "C"
    },
    {
      stem: "A juice mix uses 2 cups of juice for every 3 cups of soda. If Scarlett uses 8 cups of juice, how many cups of soda does she need?",
      choices: { A: "6", B: "9", C: "12", D: "16" },
      answer: "C"
    },
    {
      stem: "A car travels 180 miles in 3 hours at a constant speed. What is the speed in miles per hour?",
      choices: { A: "30", B: "60", C: "177", D: "540" },
      answer: "B"
    },
    {
      stem: "Which number is between −3 and −1?",
      choices: { A: "−4", B: "−2", C: "0", D: "2" },
      answer: "B"
    }
  ];

  var LETTERS = ["A", "B", "C", "D"];
  var quizEl = document.getElementById("quiz-app");
  if (!quizEl) return;

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE);
      if (!raw) return { answers: {}, index: 0, done: false };
      var data = JSON.parse(raw);
      if (!data || typeof data !== "object") return { answers: {}, index: 0, done: false };
      data.answers = data.answers || {};
      data.index = Math.max(0, Math.min(QUESTIONS.length - 1, data.index | 0));
      data.done = !!data.done;
      return data;
    } catch (e) {
      return { answers: {}, index: 0, done: false };
    }
  }

  function save(state) {
    try {
      localStorage.setItem(STORAGE, JSON.stringify({
        answers: state.answers,
        index: state.index,
        done: state.done
      }));
    } catch (e) {}
  }

  var state = load();

  function choiceLabel(q, letter) {
    return letter + ". " + q.choices[letter];
  }

  function renderQuiz() {
    var q = QUESTIONS[state.index];
    var picked = state.answers[state.index] || "";
    var last = state.index === QUESTIONS.length - 1;
    var html = "";
    html += '<p class="quiz-progress">Question ' + (state.index + 1) + " of " + QUESTIONS.length + "</p>";
    html += '<div class="quiz-card">';
    html += "<h2>" + q.stem + "</h2>";
    html += '<div class="quiz-choices" role="radiogroup" aria-label="Answer choices">';
    LETTERS.forEach(function (letter) {
      var on = picked === letter;
      html += '<button type="button" class="quiz-choice' + (on ? " is-picked" : "") + '" data-letter="' + letter + '" role="radio" aria-checked="' + (on ? "true" : "false") + '">';
      html += choiceLabel(q, letter);
      html += "</button>";
    });
    html += "</div></div>";
    html += '<button type="button" class="quiz-next" id="quiz-next"' + (picked ? "" : " disabled") + ">";
    html += last ? "See results" : "Next";
    html += "</button>";
    quizEl.innerHTML = html;
  }

  function renderResults() {
    var score = 0;
    var html = '<p class="quiz-progress">Results</p>';
    QUESTIONS.forEach(function (q, i) {
      var hers = state.answers[i] || "—";
      var ok = hers === q.answer;
      if (ok) score += 1;
      html += '<div class="quiz-result' + (ok ? " is-ok" : " is-miss") + '">';
      html += '<p class="quiz-result-mark" aria-hidden="true">' + (ok ? "✓" : "✗") + "</p>";
      html += '<div class="quiz-result-body">';
      html += "<h2>" + (i + 1) + ". " + q.stem + "</h2>";
      html += '<p>Your answer: <strong>' + hers + "</strong>" + (hers !== "—" ? " · " + q.choices[hers] : "") + "</p>";
      html += "<p>Correct: <strong>" + q.answer + "</strong> · " + q.choices[q.answer] + "</p>";
      html += "</div></div>";
    });
    html += '<p class="quiz-score">' + score + " / " + QUESTIONS.length + "</p>";
    html += '<button type="button" class="quiz-next" id="quiz-retry">Try again</button>';
    quizEl.innerHTML = html;
  }

  function render() {
    if (state.done) renderResults();
    else renderQuiz();
  }

  quizEl.addEventListener("click", function (e) {
    var choice = e.target.closest(".quiz-choice");
    if (choice && !state.done) {
      state.answers[state.index] = choice.getAttribute("data-letter");
      save(state);
      renderQuiz();
      return;
    }
    if (e.target.id === "quiz-next") {
      if (!state.answers[state.index]) return;
      if (state.index >= QUESTIONS.length - 1) {
        state.done = true;
        save(state);
        renderResults();
        window.scrollTo(0, 0);
        return;
      }
      state.index += 1;
      save(state);
      renderQuiz();
      window.scrollTo(0, 0);
      return;
    }
    if (e.target.id === "quiz-retry") {
      state = { answers: {}, index: 0, done: false };
      save(state);
      renderQuiz();
      window.scrollTo(0, 0);
    }
  });

  render();
})();
