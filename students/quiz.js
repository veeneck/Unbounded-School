(function () {
  var cfg = window.UNBOUNDED_QUIZ;
  if (!cfg || !cfg.questions || !cfg.questions.length) return;
  var STORAGE = cfg.storage || "unbounded.quiz";
  var QUESTIONS = cfg.questions;

  var LETTERS = ["A", "B", "C", "D"];
  var quizEl = document.getElementById("quiz-app");
  if (!quizEl) return;

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

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
    if (q.passage) html += '<p class="quiz-passage">' + esc(q.passage) + "</p>";
    html += "<h2>" + esc(q.stem) + "</h2>";
    html += '<div class="quiz-choices" role="radiogroup" aria-label="Answer choices">';
    LETTERS.forEach(function (letter) {
      var on = picked === letter;
      html += '<button type="button" class="quiz-choice' + (on ? " is-picked" : "") + '" data-letter="' + letter + '" role="radio" aria-checked="' + (on ? "true" : "false") + '">';
      html += esc(choiceLabel(q, letter));
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
      html += "<h2>" + (i + 1) + ". " + esc(q.stem) + "</h2>";
      if (q.passage) html += "<p>" + esc(q.passage) + "</p>";
      html += "<p>Your answer: <strong>" + esc(hers) + "</strong>" + (hers !== "—" && q.choices[hers] ? " · " + esc(q.choices[hers]) : "") + "</p>";
      html += "<p>Correct: <strong>" + esc(q.answer) + "</strong> · " + esc(q.choices[q.answer]) + "</p>";
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
