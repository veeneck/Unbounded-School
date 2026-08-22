(function () {
  var DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
  var TYPE_LABELS = {
    rebus: "Rebus",
    pictogram: "Pictogram",
    math: "Math",
    riddle: "Riddle"
  };

  var app = document.getElementById("riddle-app");
  if (!app) return;

  var prevBtn = document.getElementById("riddle-prev");
  var nextBtn = document.getElementById("riddle-next");
  var dateEl = document.getElementById("riddle-date");
  var cardEl = document.getElementById("riddle-card");
  var emptyEl = document.getElementById("riddle-empty");

  var data = { timezone: "America/Chicago", dayStartsAt: "06:30", entries: [] };
  var byDate = {};
  var available = [];
  var today = "";
  var viewed = "";
  var answerOpen = false;

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function isoFromYmd(y, m, d) {
    return y + "-" + pad(m) + "-" + pad(d);
  }

  function partValue(parts, type) {
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].type === type) return parts[i].value;
    }
    return "";
  }

  function schoolToday(cfg) {
    var tz = (cfg && cfg.timezone) || "America/Chicago";
    var start = ((cfg && cfg.dayStartsAt) || "06:30").split(":");
    var startH = parseInt(start[0], 10);
    var startM = parseInt(start[1], 10) || 0;
    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23"
    }).formatToParts(new Date());
    var y = parseInt(partValue(parts, "year"), 10);
    var mo = parseInt(partValue(parts, "month"), 10);
    var d = parseInt(partValue(parts, "day"), 10);
    var h = parseInt(partValue(parts, "hour"), 10);
    var mi = parseInt(partValue(parts, "minute"), 10);
    if (h === 24) h = 0;
    if (h < startH || (h === startH && mi < startM)) {
      var yest = new Date(Date.UTC(y, mo - 1, d) - 86400000);
      y = yest.getUTCFullYear();
      mo = yest.getUTCMonth() + 1;
      d = yest.getUTCDate();
    }
    return isoFromYmd(y, mo, d);
  }

  function formatDate(iso) {
    var bits = iso.split("-");
    var dt = new Date(Date.UTC(parseInt(bits[0], 10), parseInt(bits[1], 10) - 1, parseInt(bits[2], 10), 12));
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC"
    }).format(dt);
  }

  function requestedDate() {
    var hash = (location.hash || "").replace(/^#/, "");
    if (DATE_RE.test(hash)) return hash;
    try {
      var q = new URLSearchParams(location.search).get("date");
      if (q && DATE_RE.test(q)) return q;
    } catch (e) {}
    return "";
  }

  function clampDate(iso) {
    if (!iso || !DATE_RE.test(iso) || iso > today) return today;
    return iso;
  }

  function neighbor(iso, dir) {
    var i = available.indexOf(iso);
    if (i === -1) {
      var next = null;
      var prev = null;
      for (var n = 0; n < available.length; n++) {
        if (available[n] < iso) prev = available[n];
        if (available[n] > iso && next === null) next = available[n];
      }
      return dir < 0 ? prev : next;
    }
    var j = i + dir;
    if (j < 0 || j >= available.length) return null;
    return available[j];
  }

  function setUrl(iso, push) {
    var path = location.pathname + location.search;
    var next = iso === today ? path : path + "#" + iso;
    var current = location.pathname + location.search + (location.hash || "");
    if (next === current || (iso === today && !location.hash && !/[?&]date=/.test(location.search))) {
      return;
    }
    if (push) history.pushState({ date: iso }, "", next);
    else history.replaceState({ date: iso }, "", next);
  }

  function dataUrls() {
    var urls = [];
    var script = document.querySelector('script[src*="riddle.js"]');
    if (script && script.src) {
      try { urls.push(new URL("riddles.json", script.src).href); } catch (e) {}
    }
    urls.push("riddles.json");
    urls.push("/riddle/riddles.json");
    var seen = {};
    var unique = [];
    for (var i = 0; i < urls.length; i++) {
      if (urls[i] && !seen[urls[i]]) {
        seen[urls[i]] = true;
        unique.push(urls[i]);
      }
    }
    return unique;
  }

  function loadData() {
    if (window.UNBOUNDED_RIDDLES && typeof window.UNBOUNDED_RIDDLES === "object") {
      return Promise.resolve(window.UNBOUNDED_RIDDLES);
    }
    var urls = dataUrls();
    var i = 0;
    function tryNext() {
      if (i >= urls.length) {
        return Promise.reject(new Error("missing"));
      }
      var url = urls[i++];
      return fetch(url, { cache: "no-cache" }).then(function (res) {
        if (!res.ok) return tryNext();
        return res.json();
      }).catch(function () {
        return tryNext();
      });
    }
    return tryNext();
  }

  function setDisabled(btn, on) {
    btn.disabled = on;
    btn.setAttribute("aria-disabled", on ? "true" : "false");
    if (on) btn.setAttribute("tabindex", "-1");
    else btn.removeAttribute("tabindex");
  }

  function escapeText(s) {
    var el = document.createElement("div");
    el.textContent = s == null ? "" : String(s);
    return el.innerHTML;
  }

  function showEmpty() {
    cardEl.hidden = true;
    emptyEl.hidden = false;
    dateEl.textContent = viewed ? formatDate(viewed) : "";
  }

  function render() {
    answerOpen = false;
    dateEl.textContent = viewed ? formatDate(viewed) : "";

    var prev = neighbor(viewed, -1);
    var next = neighbor(viewed, 1);
    if (next && next > today) next = null;
    setDisabled(prevBtn, !prev);
    setDisabled(nextBtn, viewed >= today || !next);

    var entry = byDate[viewed];
    if (!entry) {
      showEmpty();
      return;
    }

    emptyEl.hidden = true;
    cardEl.hidden = false;

    var promptHtml = entry.promptHtml;
    var prompt = entry.prompt || "";
    var body;
    if (promptHtml) {
      body = '<div class="riddle-prompt riddle-prompt-visual">' + promptHtml + "</div>";
    } else {
      body = '<p class="riddle-prompt">' + escapeText(prompt) + "</p>";
    }

    cardEl.innerHTML =
      '<p class="riddle-kicker">' + escapeText("Riddle") + "</p>" +
      body +
      '<div class="riddle-reveal-wrap">' +
        '<button type="button" class="riddle-reveal" id="riddle-reveal" aria-expanded="false" aria-controls="riddle-answer">Show answer</button>' +
        '<p class="riddle-answer" id="riddle-answer" hidden></p>' +
      "</div>" +
      '<div class="riddle-joke-block">' +
        '<p class="riddle-section-label">Joke</p>' +
        '<p class="riddle-joke">' + escapeText(entry.joke || "") + "</p>" +
      "</div>";
    if (entry.discuss) {
      cardEl.innerHTML +=
        '<div class="riddle-discuss">' +
          '<p class="riddle-section-label">Talk it over</p>' +
          '<p class="riddle-discuss-q">' + escapeText(entry.discuss) + "</p>" +
        "</div>";
    }

    var answerEl = document.getElementById("riddle-answer");
    answerEl.textContent = entry.answer || "";

    var reveal = document.getElementById("riddle-reveal");
    reveal.addEventListener("click", function () {
      answerOpen = !answerOpen;
      answerEl.hidden = !answerOpen;
      reveal.setAttribute("aria-expanded", answerOpen ? "true" : "false");
      reveal.textContent = answerOpen ? "Hide answer" : "Show answer";
    });
  }

  function go(iso, push) {
    viewed = clampDate(iso);
    setUrl(viewed, push);
    render();
  }

  function onPop() {
    viewed = clampDate(requestedDate() || today);
    render();
  }

  prevBtn.addEventListener("click", function () {
    var prev = neighbor(viewed, -1);
    if (prev) go(prev, true);
  });
  nextBtn.addEventListener("click", function () {
    if (viewed >= today) return;
    var next = neighbor(viewed, 1);
    if (next && next <= today) go(next, true);
  });
  window.addEventListener("hashchange", onPop);
  window.addEventListener("popstate", onPop);

  loadData().then(function (json) {
    if (!json || typeof json !== "object") json = {};
    data.timezone = json.timezone || data.timezone;
    data.dayStartsAt = json.dayStartsAt || data.dayStartsAt;
    data.entries = Array.isArray(json.entries) ? json.entries : [];
    today = schoolToday(data);
    byDate = {};
    available = [];
    for (var i = 0; i < data.entries.length; i++) {
      var e = data.entries[i];
      if (!e || !DATE_RE.test(e.date) || e.date > today) continue;
      byDate[e.date] = e;
      available.push(e.date);
    }
    available.sort();
    viewed = clampDate(requestedDate() || today);
    if (requestedDate() && requestedDate() > today) {
      setUrl(today, false);
    }
    render();
  }).catch(function () {
    today = schoolToday(data);
    viewed = clampDate(requestedDate() || today);
    render();
    var note = emptyEl.querySelector("p");
    if (note) note.textContent = "The puzzle list could not be loaded. Try again in a moment.";
  });
})();
