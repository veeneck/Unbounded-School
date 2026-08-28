/* MAP RIT growth chart — 2020 NWEA student achievement norms */
(function () {
  var Z95 = 1.64485;
  var Z75 = 0.67449;

  var NORMS = {
    math: {
      0: [[139.56,12.45],[150.13,11.94],[157.11,12.03]],
      1: [[160.05,12.43],[170.18,12.59],[176.40,13.18]],
      2: [[175.04,12.98],[184.07,13.01],[189.42,13.44]],
      3: [[188.48,13.45],[196.23,13.64],[201.08,14.11]],
      4: [[199.55,14.40],[206.05,14.90],[210.51,15.56]],
      5: [[209.13,15.19],[214.70,15.88],[218.75,16.70]],
      6: [[214.75,16.12],[219.56,16.74],[222.88,17.47]],
      7: [[220.21,17.41],[224.04,17.96],[226.73,18.60]],
      8: [[224.92,18.94],[228.12,19.33],[230.30,19.95]],
      9: [[226.43,19.83],[228.67,20.06],[230.03,20.63]],
      10:[[229.07,20.23],[231.21,20.61],[232.42,21.25]],
      11:[[231.72,20.61],[233.49,20.91],[234.25,21.65]],
      12:[[233.02,21.60],[233.31,23.07],[234.19,24.63]]
    },
    reading: {
      0: [[136.65,12.22],[146.28,11.78],[153.09,12.06]],
      1: [[155.93,12.66],[165.85,13.21],[171.40,14.19]],
      2: [[172.35,15.19],[181.20,15.05],[185.57,15.49]],
      3: [[186.62,16.65],[193.90,16.14],[197.12,16.27]],
      4: [[196.67,16.78],[202.50,16.25],[204.83,16.31]],
      5: [[204.48,16.38],[209.12,15.88],[210.98,15.97]],
      6: [[210.17,16.46],[213.81,15.98],[215.36,16.03]],
      7: [[214.20,16.51],[217.09,16.21],[218.36,16.38]],
      8: [[218.01,17.04],[220.52,16.69],[221.66,16.87]],
      9: [[218.90,19.02],[220.52,18.73],[221.40,19.03]],
      10:[[221.47,17.92],[222.91,17.81],[223.51,18.20]],
      11:[[223.53,17.73],[224.64,17.80],[224.71,18.50]],
      12:[[223.80,19.32],[223.85,21.21],[224.33,23.08]]
    },
    language: {
      2: [[173.98,16.06],[183.83,15.40],[188.40,15.89]],
      3: [[187.71,15.33],[195.14,14.64],[198.32,14.65]],
      4: [[197.33,15.10],[202.87,14.44],[205.00,14.33]],
      5: [[204.17,14.55],[208.45,13.98],[210.19,13.90]],
      6: [[209.43,14.35],[212.81,13.92],[214.19,13.94]],
      7: [[212.65,14.72],[215.28,14.39],[216.47,14.42]],
      8: [[215.54,14.74],[217.73,14.45],[218.74,14.56]],
      9: [[216.68,15.52],[218.18,15.30],[219.00,15.51]],
      10:[[218.82,15.10],[220.19,15.11],[220.86,15.45]],
      11:[[220.66,14.94],[221.86,14.98],[222.33,15.53]]
    },
    science: {
      2: [[177.70,13.43],[184.59,12.35],[187.87,12.46]],
      3: [[187.84,12.25],[193.29,11.63],[195.88,11.76]],
      4: [[194.65,11.68],[199.15,11.50],[201.22,11.75]],
      5: [[200.23,11.77],[204.30,11.72],[206.17,12.12]],
      6: [[203.86,12.04],[207.26,12.02],[208.47,12.41]],
      7: [[206.56,12.65],[209.50,12.73],[210.61,13.17]],
      8: [[209.64,13.25],[212.41,13.17],[213.44,13.64]],
      9: [[211.40,14.10],[213.42,14.17],[213.99,14.72]],
      10:[[213.24,14.26],[214.95,14.42],[215.29,15.07]]
    }
  };

  var SCORES = {
    math: [
      { g: 4, t: 0, rit: 239, pct: '99th', label: 'Fall 2025' },
      { g: 4, t: 1, rit: 243, pct: '99th', label: 'Winter 2025' },
      { g: 4, t: 2, rit: 242, pct: '96th', label: 'Spring 2026', goals: [
        { name: 'Operations & Algebraic Thinking', rit: 236 },
        { name: 'Number & Operations', rit: 234 },
        { name: 'Measurement & Data', rit: 252 },
        { name: 'Geometry', rit: 252 }
      ]}
    ],
    reading: [
      { g: 4, t: 0, rit: 224, pct: '94th', label: 'Fall 2025' },
      { g: 4, t: 1, rit: 227, pct: '94th', label: 'Winter 2025' },
      { g: 4, t: 2, rit: 226, pct: '91st', label: 'Spring 2026', goals: [
        { name: 'Literary Text', rit: 226 },
        { name: 'Informational Text', rit: 224 },
        { name: 'Vocabulary', rit: 229 }
      ]}
    ],
    language: [
      { g: 4, t: 1, rit: 226, pct: '95th', label: 'Winter 2025' },
      { g: 4, t: 2, rit: 231, pct: '97th', label: 'Spring 2026', goals: [
        { name: 'Writing', rit: 234 },
        { name: 'Grammar', rit: 227 },
        { name: 'Mechanics', rit: 232 }
      ]}
    ],
    science: [
      { g: 4, t: 1, rit: 219, pct: '95th', label: 'Winter 2025' },
      { g: 4, t: 2, rit: 224, pct: '96th', label: 'Spring 2026', goals: [
        { name: 'Life Science', rit: 225 },
        { name: 'Physical Science', rit: 223 },
        { name: 'Earth & Space', rit: 224 }
      ]}
    ]
  };

  var TITLES = { math: 'Math', reading: 'Reading', language: 'Language', science: 'Science' };

  var BANDS = [
    { lo: -99, hi: -Z95, fill: '#8ae6c6', hot: '#74d4b4', label: 'Below 5th %ile' },
    { lo: -Z95, hi: -Z75, fill: '#a3eed6', hot: '#88ddc4', label: '5th–25th %ile' },
    { lo: -Z75, hi: 0, fill: '#c5f4e6', hot: '#a8e6d2', label: '25th %ile–mean' },
    { lo: 0, hi: Z75, fill: '#ddf9f1', hot: '#c3eee2', label: 'Mean–75th %ile' },
    { lo: Z75, hi: Z95, fill: '#eefcf8', hot: '#d4f3ea', label: '75th–95th %ile' },
    { lo: Z95, hi: 99, fill: '#ffffff', hot: '#e7f8f2', label: 'Above 95th %ile' }
  ];

  function mixDark(hex, t) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    var k = 1 - t;
    function h(v) { return ('0' + Math.round(v * k).toString(16)).slice(-2); }
    return '#' + h(r) + h(g) + h(b);
  }
  var EDGES = BANDS.filter(function (band) { return band.hi < 10; }).map(function (band, i, arr) {
    var top = i === arr.length - 1;
    return { z: band.hi, stroke: mixDark(band.fill, top ? 0.07 : 0.11), w: top ? 1.15 : 0.9 };
  });
  var W = 860, H = 360;
  var L = 58, R = 24, T = 16, B = 54;
  var X0 = L, X1 = W - R, Y0 = T, Y1 = H - B;
  var XMIN = 0, XMAX = 13, YMIN = 120, YMAX = 300;

  function ns(name, attrs) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', name);
    if (attrs) Object.keys(attrs).forEach(function (k) { el.setAttribute(k, attrs[k]); });
    return el;
  }
  function xOf(g) { return X0 + ((g - XMIN) / (XMAX - XMIN)) * (X1 - X0); }
  function yOf(v) {
    var c = Math.max(YMIN, Math.min(YMAX, v));
    return Y1 - ((c - YMIN) / (YMAX - YMIN)) * (Y1 - Y0);
  }
  function xTerm(g, t) { return xOf(g + t / 3); }
  function ritAt(mean, sd, z) { return mean + z * sd; }

  function series(norms, z) {
    var val = {};
    Object.keys(norms).forEach(function (g) {
      norms[g].forEach(function (pair, t) {
        val[+g + '-' + t] = yOf(ritAt(pair[0], pair[1], z));
      });
    });
    var firstY = null;
    var g, t;
    for (g = 0; g <= 12 && firstY == null; g++) {
      for (t = 0; t < 3 && firstY == null; t++) {
        if (val[g + '-' + t] != null) firstY = val[g + '-' + t];
      }
    }
    var lastY = firstY;
    var pts = [];
    for (g = 0; g <= 12; g++) {
      for (t = 0; t < 3; t++) {
        if (val[g + '-' + t] != null) lastY = val[g + '-' + t];
        pts.push([xTerm(g, t), lastY]);
      }
    }
    pts.push([xOf(13), lastY]);
    return pts;
  }

  function fmt(p) { return p[0].toFixed(1) + ' ' + p[1].toFixed(1); }

  function catmull(pts, startAt) {
    if (!pts.length) return '';
    var d = startAt ? '' : ('M' + fmt(pts[0]));
    for (var i = 0; i < pts.length - 1; i++) {
      var p0 = pts[Math.max(0, i - 1)];
      var p1 = pts[i];
      var p2 = pts[i + 1];
      var p3 = pts[Math.min(pts.length - 1, i + 2)];
      var c1x = p1[0] + (p2[0] - p0[0]) / 6;
      var c1y = p1[1] + (p2[1] - p0[1]) / 6;
      var c2x = p2[0] - (p3[0] - p1[0]) / 6;
      var c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += ' C' + fmt([c1x, c1y]) + ' ' + fmt([c2x, c2y]) + ' ' + fmt(p2);
    }
    return d;
  }

  function areaPath(top, bot) {
    var rev = bot.slice().reverse();
    return catmull(top, false) + ' L' + fmt(rev[0]) + catmull(rev, true) + ' Z';
  }

  function bandGeom(norms, band) {
    var top = band.hi > 10
      ? series(norms, band.lo).map(function (pt) { return [pt[0], Y0]; })
      : series(norms, band.hi);
    var bot = band.lo === -99
      ? series(norms, band.lo).map(function (pt) { return [pt[0], yOf(YMIN)]; })
      : series(norms, band.lo);
    return { top: top, bot: bot };
  }

  function motionOk() {
    return document.documentElement.classList.contains('js-motion') &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function lerpPts(a, b, t) {
    var n = Math.min(a.length, b.length);
    var out = [];
    for (var i = 0; i < n; i++) out.push([lerp(a[i][0], b[i][0], t), lerp(a[i][1], b[i][1], t)]);
    return out;
  }
  function scoreKey(s) { return s.g + ':' + s.t; }
  function scorePt(s) { return [xTerm(s.g, s.t), yOf(s.rit)]; }
  function scoreMap(list) {
    var m = {};
    list.forEach(function (s) { m[scoreKey(s)] = scorePt(s); });
    return m;
  }
  function nearestPt(map, x) {
    var best = null, bestD = Infinity;
    Object.keys(map).forEach(function (k) {
      var p = map[k];
      var d = Math.abs(p[0] - x);
      if (d < bestD) { bestD = d; best = p; }
    });
    return best;
  }
  function lineDFromPts(pts) {
    return pts.map(function (p, i) {
      return (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1);
    }).join(' ');
  }
  function lineDFromScores(list) {
    return lineDFromPts(list.map(scorePt));
  }

  function mount(el, initialSubject) {
    var subject = initialSubject || el.getAttribute('data-subject') || 'math';
    if (!NORMS[subject] || !SCORES[subject]) return null;
    el.innerHTML = '';
    el.setAttribute('data-subject', subject);

    var head = document.createElement('div');
    head.className = 'map-rit-head';
    var titleP = document.createElement('p');
    titleP.className = 'map-rit-head-title';
    var titleStrong = document.createElement('strong');
    titleStrong.textContent = TITLES[subject];
    titleP.appendChild(titleStrong);
    titleP.appendChild(document.createTextNode(' RIT Growth Over Time'));
    var meta = document.createElement('p');
    meta.className = 'map-rit-head-meta';
    head.appendChild(titleP);
    head.appendChild(meta);
    el.appendChild(head);

    var svg = ns('svg', {
      class: 'map-rit-svg',
      viewBox: '0 0 ' + W + ' ' + H,
      role: 'img',
      'aria-label': TITLES[subject] + ' MAP RIT growth'
    });
    svg.appendChild(ns('rect', { x: 0, y: 0, width: W, height: H, fill: '#fff' }));

    var gGrid = ns('g', { class: 'map-rit-grid' });
    for (var rit = YMIN; rit <= YMAX; rit += 20) {
      var yy = yOf(rit);
      gGrid.appendChild(ns('line', { x1: X0, y1: yy, x2: X1, y2: yy }));
      var yl = ns('text', { x: X0 - 8, y: yy + 4, class: 'map-rit-axis', 'text-anchor': 'end' });
      yl.textContent = String(rit);
      gGrid.appendChild(yl);
    }
    for (var g = 0; g < 13; g++) {
      for (var q = 1; q < 4; q++) {
        var xq = xOf(g + q / 4);
        gGrid.appendChild(ns('line', { x1: xq, y1: Y0, x2: xq, y2: Y1, class: 'map-rit-minor' }));
      }
    }
    for (g = 0; g <= 13; g++) {
      var xx = xOf(g);
      gGrid.appendChild(ns('line', { x1: xx, y1: Y0, x2: xx, y2: Y1, class: 'map-rit-major' }));
      var xl = ns('text', { x: xx, y: Y1 + 16, class: 'map-rit-axis', 'text-anchor': 'middle' });
      xl.textContent = g === 0 ? 'K' : String(g);
      gGrid.appendChild(xl);
    }
    svg.appendChild(gGrid);

    var clipId = 'map-rit-clip';
    var defs = ns('defs');
    var clip = ns('clipPath', { id: clipId });
    clip.appendChild(ns('rect', { x: X0, y: Y0, width: X1 - X0, height: Y1 - Y0 }));
    defs.appendChild(clip);
    svg.appendChild(defs);

    var norms = NORMS[subject];
    var scores = SCORES[subject].slice();
    var gBands = ns('g', { class: 'map-rit-bands', 'clip-path': 'url(#' + clipId + ')' });
    var gWave = ns('g', { class: 'map-rit-wave' });
    gWave.style.setProperty('--rise', (Y1 - Y0) + 'px');
    var bandPaths = [];
    BANDS.forEach(function (band, i) {
      var geom = bandGeom(norms, band);
      var path = ns('path', {
        class: 'map-rit-band' + (band.hi > 10 ? ' is-top' : ''),
        d: areaPath(geom.top, geom.bot),
        fill: band.fill,
        opacity: band.hi > 10 ? '0.01' : '0.9'
      });
      path.style.setProperty('--wave-i', String(i));
      gWave.appendChild(path);
      bandPaths.push({ band: band, path: path, geom: geom });
    });
    var edgePaths = [];
    EDGES.forEach(function (edge, i) {
      var pts = series(norms, edge.z);
      var path = ns('path', {
        class: 'map-rit-edge',
        d: catmull(pts, false),
        fill: 'none',
        stroke: edge.stroke,
        'stroke-width': String(edge.w),
        'stroke-linejoin': 'round',
        'stroke-linecap': 'round'
      });
      path.style.setProperty('--wave-i', String(i + 0.45));
      gWave.appendChild(path);
      edgePaths.push({ edge: edge, path: path, pts: pts });
    });
    gBands.appendChild(gWave);
    svg.appendChild(gBands);

    var yLab = ns('text', { class: 'map-rit-ylab', transform: 'translate(16 ' + ((Y0 + Y1) / 2) + ') rotate(-90)' });
    yLab.textContent = 'RIT Score';
    svg.appendChild(yLab);
    var xLab = ns('text', { x: (X0 + X1) / 2, y: H - 18, class: 'map-rit-xlab' });
    xLab.textContent = 'Grade';
    svg.appendChild(xLab);

    var gLine = ns('g', { 'clip-path': 'url(#' + clipId + ')' });
    var linePath = ns('path', {
      class: 'map-rit-line',
      d: lineDFromScores(scores),
      fill: 'none',
      stroke: '#1c1917',
      'stroke-width': '2.2',
      'stroke-linejoin': 'round',
      pathLength: '1'
    });
    gLine.appendChild(linePath);
    var gHits = ns('g', { class: 'map-rit-hits' });

    function cool() {
      el.querySelectorAll('.map-rit-dot.is-hot').forEach(function (d) {
        d.classList.remove('is-hot');
        d.setAttribute('r', d.classList.contains('is-latest') ? '6' : '5');
      });
    }
    function coolBands() {
      bandPaths.forEach(function (item) {
        item.path.classList.remove('is-hot');
        item.path.setAttribute('fill', item.band.fill);
        item.path.setAttribute('opacity', item.band.hi > 10 ? '0.01' : '0.9');
      });
    }
    function heat(dot) {
      cool();
      coolBands();
      dot.classList.add('is-hot');
      dot.setAttribute('r', '7.5');
    }
    function hideCard() {
      meta.classList.remove('is-on');
      meta.dataset.kind = '';
      meta.textContent = '';
      cool();
      coolBands();
    }
    function showMeta(kind, text) {
      meta.dataset.kind = kind;
      meta.textContent = text;
      meta.classList.add('is-on');
    }
    el.addEventListener('mouseleave', hideCard);

    function styleDot(c, last) {
      c.classList.toggle('is-latest', !!last);
      if (!c.classList.contains('is-hot')) {
        c.setAttribute('r', last ? '6' : '5');
        c.setAttribute('fill', last ? '#e67a2e' : '#1c1917');
        c.setAttribute('stroke', last ? '#1c1917' : 'none');
        c.setAttribute('stroke-width', last ? '1.25' : '0');
      }
    }
    function bindHit(node) {
      node.hit.onmouseenter = function () { heat(node.c); showMeta('point', node.s.label + ' · ' + node.s.rit + ' RIT · ' + node.s.pct); };
      node.hit.onfocus = node.hit.onmouseenter;
      node.hit.onblur = hideCard;
    }
    function makeDot(s, last, i) {
      var pt = scorePt(s);
      var c = ns('circle', {
        class: 'map-rit-dot' + (last ? ' is-latest' : ''),
        cx: pt[0].toFixed(1),
        cy: pt[1].toFixed(1),
        r: last ? 6 : 5,
        fill: last ? '#e67a2e' : '#1c1917',
        stroke: last ? '#1c1917' : 'none',
        'stroke-width': last ? '1.25' : '0'
      });
      if (typeof i === 'number') {
        var n = scores.length;
        var t = n < 2 ? 0 : (1 - Math.cos((i / (n - 1)) * Math.PI)) / 2;
        c.style.animationDelay = (0.42 + t * 0.28) + 's';
      }
      gLine.appendChild(c);
      var hit = ns('circle', {
        cx: pt[0].toFixed(1),
        cy: pt[1].toFixed(1),
        r: 14,
        fill: 'transparent',
        class: 'map-rit-hit',
        tabindex: '0',
        role: 'button'
      });
      var node = { s: s, c: c, hit: hit, last: last };
      hit.setAttribute('aria-label', s.label + ' ' + TITLES[subject] + ', ' + s.rit + ' RIT, ' + s.pct + ' percentile');
      bindHit(node);
      gHits.appendChild(hit);
      return node;
    }

    var dots = {};
    scores.forEach(function (s, i) {
      dots[scoreKey(s)] = makeDot(s, i === scores.length - 1, i);
    });

    svg.appendChild(gLine);
    svg.appendChild(gHits);
    el.appendChild(svg);

    bandPaths.forEach(function (item) {
      var path = item.path;
      var band = item.band;
      path.addEventListener('mouseenter', function () {
        cool();
        coolBands();
        path.classList.add('is-hot');
        path.setAttribute('fill', band.hot);
        path.setAttribute('opacity', '0.95');
        showMeta('band', band.label);
      });
      path.addEventListener('mouseleave', function (evt) {
        var next = evt.relatedTarget;
        var nextClass = next && next.getAttribute && (next.getAttribute('class') || '');
        if (nextClass.indexOf('map-rit-band') !== -1 || nextClass.indexOf('map-rit-hit') !== -1) return;
        if (meta.dataset.kind === 'band') hideCard();
      });
    });

    if (motionOk()) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          el.classList.add('is-anim');
          io.disconnect();
          window.setTimeout(function () {
            el.classList.remove('is-anim');
            el.classList.add('has-anim-done');
          }, 1800);
        });
      }, { threshold: 0.2 });
      io.observe(el);
    }

    var morphToken = 0;
    var morphRaf = 0;

    function applyGeom(bandGeoms, edgePts, scoreList) {
      bandPaths.forEach(function (item, i) {
        item.geom = bandGeoms[i];
        item.path.setAttribute('d', areaPath(item.geom.top, item.geom.bot));
      });
      edgePaths.forEach(function (item, i) {
        item.pts = edgePts[i];
        item.path.setAttribute('d', catmull(item.pts, false));
      });
      scores = scoreList.slice();
      linePath.setAttribute('d', lineDFromScores(scores));
    }

    function setSubject(nextSubject, opts) {
      if (!NORMS[nextSubject] || !SCORES[nextSubject]) return;
      if (nextSubject === subject && !(opts && opts.force)) return;
      var animate = opts && opts.animate && motionOk();
      var nextNorms = NORMS[nextSubject];
      var nextScores = SCORES[nextSubject].slice();
      var fromBands = bandPaths.map(function (item) { return item.geom; });
      var toBands = BANDS.map(function (band) { return bandGeom(nextNorms, band); });
      var fromEdges = edgePaths.map(function (item) { return item.pts; });
      var toEdges = EDGES.map(function (edge) { return series(nextNorms, edge.z); });
      var fromMap = scoreMap(scores);
      var toMap = scoreMap(nextScores);
      var fromKeys = Object.keys(dots);
      var toKeys = nextScores.map(scoreKey);
      var union = [];
      var seen = {};
      fromKeys.concat(toKeys).forEach(function (k) {
        if (seen[k]) return;
        seen[k] = true;
        union.push(k);
      });
      union.sort();
      var fromLine = [];
      var toLine = [];
      union.forEach(function (k) {
        var fx = fromMap[k];
        var tx = toMap[k];
        var xHint = (fx || tx)[0];
        fromLine.push(fx || nearestPt(fromMap, xHint) || tx);
        toLine.push(tx || nearestPt(toMap, xHint) || fx);
      });
      var fromDot = {};
      var toDot = {};
      union.forEach(function (k) {
        var node = dots[k];
        var liveTo = !!toMap[k];
        var liveFrom = !!fromMap[k];
        var start = fromMap[k] || nearestPt(fromMap, toMap[k][0]);
        var end = toMap[k] || nearestPt(toMap, fromMap[k][0]);
        fromDot[k] = {
          x: start[0],
          y: start[1],
          r: liveFrom ? (node && node.last ? 6 : 5) : 0
        };
        toDot[k] = {
          x: end[0],
          y: end[1],
          r: liveTo ? (toKeys.indexOf(k) === toKeys.length - 1 ? 6 : 5) : 0
        };
        if (!node && liveTo) {
          var sNew = nextScores.filter(function (s) { return scoreKey(s) === k; })[0];
          node = makeDot(sNew, toKeys.indexOf(k) === toKeys.length - 1);
          node.c.style.animationDelay = '0s';
          node.c.classList.remove('is-anim');
          node.c.setAttribute('r', '0');
          node.c.setAttribute('cx', start[0].toFixed(1));
          node.c.setAttribute('cy', start[1].toFixed(1));
          node.hit.setAttribute('cx', start[0].toFixed(1));
          node.hit.setAttribute('cy', start[1].toFixed(1));
          dots[k] = node;
        }
        if (node && liveTo) {
          node.s = nextScores.filter(function (s) { return scoreKey(s) === k; })[0];
          node.last = toKeys.indexOf(k) === toKeys.length - 1;
          node.hit.setAttribute('aria-label', node.s.label + ' ' + TITLES[nextSubject] + ', ' + node.s.rit + ' RIT, ' + node.s.pct + ' percentile');
          bindHit(node);
        }
      });

      subject = nextSubject;
      el.setAttribute('data-subject', subject);
      titleStrong.textContent = TITLES[subject];
      svg.setAttribute('aria-label', TITLES[subject] + ' MAP RIT growth');
      hideCard();
      el.classList.remove('is-anim');

      function finish() {
        applyGeom(toBands, toEdges, nextScores);
        union.forEach(function (k) {
          var node = dots[k];
          if (!node) return;
          if (!toMap[k]) {
            node.c.remove();
            node.hit.remove();
            delete dots[k];
            return;
          }
          var p = toMap[k];
          node.c.setAttribute('cx', p[0].toFixed(1));
          node.c.setAttribute('cy', p[1].toFixed(1));
          node.hit.setAttribute('cx', p[0].toFixed(1));
          node.hit.setAttribute('cy', p[1].toFixed(1));
          styleDot(node.c, node.last);
        });
      }

      if (!animate) {
        finish();
        return;
      }

      var token = ++morphToken;
      if (morphRaf) cancelAnimationFrame(morphRaf);
      var t0 = performance.now();
      var dur = 720;
      function tick(now) {
        if (token !== morphToken) return;
        var t = Math.min(1, (now - t0) / dur);
        var e = easeOut(t);
        bandPaths.forEach(function (item, i) {
          var geom = { top: lerpPts(fromBands[i].top, toBands[i].top, e), bot: lerpPts(fromBands[i].bot, toBands[i].bot, e) };
          item.path.setAttribute('d', areaPath(geom.top, geom.bot));
        });
        edgePaths.forEach(function (item, i) {
          item.path.setAttribute('d', catmull(lerpPts(fromEdges[i], toEdges[i], e), false));
        });
        linePath.setAttribute('d', lineDFromPts(lerpPts(fromLine, toLine, e)));
        union.forEach(function (k) {
          var node = dots[k];
          if (!node) return;
          var a = fromDot[k];
          var b = toDot[k];
          var x = lerp(a.x, b.x, e);
          var y = lerp(a.y, b.y, e);
          var r = lerp(a.r, b.r, e);
          node.c.setAttribute('cx', x.toFixed(1));
          node.c.setAttribute('cy', y.toFixed(1));
          if (!node.c.classList.contains('is-hot')) node.c.setAttribute('r', Math.max(0.01, r).toFixed(2));
          node.hit.setAttribute('cx', x.toFixed(1));
          node.hit.setAttribute('cy', y.toFixed(1));
        });
        if (t < 1) {
          morphRaf = requestAnimationFrame(tick);
        } else {
          morphRaf = 0;
          finish();
        }
      }
      morphRaf = requestAnimationFrame(tick);
    }

    return { setSubject: setSubject, subject: function () { return subject; } };
  }

  var chart = null;
  function init() {
    var el = document.querySelector('.map-rit[data-subject]');
    if (!el) return;
    chart = mount(el, el.getAttribute('data-subject') || 'math');
    window.UnboundedMap = {
      setSubject: function (subject, opts) {
        if (chart) chart.setSubject(subject, opts || {});
      }
    };
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
