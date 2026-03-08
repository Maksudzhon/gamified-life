/* ============================================================
   GAMIFIED LIFE 1.0 — Mini Games (bug-fixed)
   Memory · Clicker · Quiz · Word Puzzle
   ============================================================ */

/* ══════════════════════════════════════════════════════════
   MEMORY GAME
   ══════════════════════════════════════════════════════════ */
var Memory = (function() {
  var EMOJIS = ['🎮','🏆','⭐','💎','🔥','❤️','🧙','🎯'];
  var cards = [], flipped = [], matched = 0, moves = 0, locked = false;

  function init() {
    flipped = []; matched = 0; moves = 0; locked = false;
    var pairs = EMOJIS.concat(EMOJIS).sort(function(){ return Math.random() - 0.5; });
    cards = pairs.map(function(emoji, i) {
      return { id: i, emoji: emoji, flipped: false, matched: false };
    });
    render();
    setEl('mem-moves', '0');
    setEl('mem-pairs', '0/8');
  }

  function render() {
    var grid = document.getElementById('memory-grid');
    if (!grid) return;
    grid.innerHTML = cards.map(function(c) {
      return '<button class="mem-card ' +
        (c.flipped || c.matched ? 'flipped ' : '') +
        (c.matched ? 'matched' : '') +
        '" onclick="Memory.flip(' + c.id + ')"' +
        (c.matched ? ' disabled' : '') + '>' +
        (c.flipped || c.matched ? c.emoji : '') +
      '</button>';
    }).join('');
  }

  function flip(id) {
    if (locked || flipped.length >= 2) return;
    var card = cards[id];
    if (!card || card.matched || card.flipped) return;
    card.flipped = true;
    flipped.push(id);
    render();
    if (flipped.length === 2) {
      moves++;
      setEl('mem-moves', moves);
      locked = true;
      var a = cards[flipped[0]], b = cards[flipped[1]];
      if (a.emoji === b.emoji) {
        a.matched = b.matched = true;
        flipped = []; matched++;
        locked = false;
        setEl('mem-pairs', matched + '/8');
        render();
        if (matched === 8) {
          playerState.xp   += 100;
          playerState.gold += 30;
          checkLevelUp(); updatePlayerUI();
          toast('🧠 +100 XP — Memory!', 'win');
        }
      } else {
        setTimeout(function() {
          a.flipped = b.flipped = false;
          flipped = []; locked = false;
          render();
        }, 850);
      }
    }
  }

  return { init: init, flip: flip };
})();

function initMemory() { Memory.init(); }


/* ══════════════════════════════════════════════════════════
   CLICKER GAME
   ══════════════════════════════════════════════════════════ */
var Clicker = (function() {
  function click(event) {
    playerState.totalClicks++;
    playerState.xp += playerState.clickPower;
    checkAchievement('star');
    if (playerState.totalClicks >= 500) checkAchievement('fast');
    checkLevelUp();
    updatePlayerUI();
    setEl('clicker-count', playerState.totalClicks);

    /* Float point */
    try {
      var btn  = document.getElementById('clicker-btn');
      var rect = btn ? btn.getBoundingClientRect() : null;
      if (rect) {
        var el = document.createElement('div');
        el.className = 'float-pt';
        el.textContent = '+' + playerState.clickPower;
        el.style.left = (rect.left + rect.width / 2 - 10) + 'px';
        el.style.top  = (rect.top - 8) + 'px';
        document.body.appendChild(el);
        setTimeout(function(){ if (el.parentNode) el.remove(); }, 900);
      }
    } catch(e) {}

    if (playerState.totalClicks % 100 === 0) {
      var suffix = currentLang === 'ru' ? 'нажатий' : currentLang === 'en' ? 'clicks' : 'marta bosildi';
      toast('👆 ' + playerState.totalClicks + ' ' + suffix + '!', 'xp');
    }
  }

  function upgrade() {
    var cost = 100 * playerState.clickPower;
    if (playerState.xp < cost) {
      toast(currentLang === 'ru' ? 'Недостаточно XP!' : currentLang === 'en' ? 'Not enough XP!' : 'XP yetmaydi!', 'err');
      return;
    }
    playerState.xp -= cost;
    playerState.clickPower++;
    updateUI();
    updatePlayerUI();
    toast('⚡ ' + t('level') + ' ' + playerState.clickPower + '!', 'win');
  }

  function updateUI() {
    setEl('clicker-level', t('level') + ' ' + playerState.clickPower);
    setEl('clicker-per',   '+' + playerState.clickPower);
    var ub = document.getElementById('upgrade-btn');
    if (ub) ub.textContent = t('upgrade') + ' (' + (100 * playerState.clickPower) + ' XP)';
  }

  return { click: click, upgrade: upgrade, updateUI: updateUI };
})();


/* ══════════════════════════════════════════════════════════
   QUIZ GAME
   ══════════════════════════════════════════════════════════ */
var Quiz = (function() {
  var idx = 0, correct = 0, total = 0, answered = false;

  function init() {
    idx = 0; correct = 0; total = 0; answered = false;
    render();
  }

  function render() {
    var el = document.getElementById('quiz-content');
    if (!el) return;
    var qs = quizData[currentLang] || quizData.uz;
    setEl('quiz-score', correct + '/' + total);

    if (idx >= qs.length) {
      var pct = qs.length > 0 ? correct / qs.length : 0;
      el.innerHTML = '<div style="text-align:center;padding:12px 0">' +
        '<div style="font-size:2rem;margin-bottom:8px">' + (pct >= 0.8 ? '🏆' : '📚') + '</div>' +
        '<div style="font-weight:800;font-size:1.05rem;color:var(--accent)">' + correct + '/' + qs.length + '</div>' +
        '<div style="font-size:.82rem;color:var(--text3);margin:6px 0 14px">' +
          (correct === qs.length ? '🎉 Perfect!' : pct >= 0.7 ? '👍 Good!' : '💪 Keep going!') +
        '</div>' +
        '<button class="btn btn-primary btn-full" onclick="Quiz.init()">' + t('new_game') + '</button>' +
      '</div>';
      if (pct >= 0.8) checkAchievement('knowledgeable');
      return;
    }

    var q = qs[idx];
    var html = '<div class="quiz-q">' + (idx + 1) + '/' + qs.length + '. ' + q.q + '</div>' +
      '<div class="quiz-opts">' +
      q.opts.map(function(o, i) {
        return '<button class="quiz-opt" onclick="Quiz.answer(' + i + ')"' +
          (answered ? ' disabled' : '') + '>' + o + '</button>';
      }).join('') +
      '</div>';
    if (answered) {
      html += '<button class="btn btn-primary btn-full" style="margin-top:10px" onclick="Quiz.next()">' + t('next_q') + '</button>';
    }
    el.innerHTML = html;
  }

  function answer(i) {
    if (answered) return;
    answered = true; total++;
    var q = (quizData[currentLang] || quizData.uz)[idx];
    var opts = document.querySelectorAll('.quiz-opt');
    opts.forEach(function(btn, oi) {
      btn.disabled = true;
      if (oi === q.ans) btn.classList.add('correct');
      else if (oi === i) btn.classList.add('wrong');
    });
    if (i === q.ans) {
      correct++;
      playerState.xp += 30;
      checkLevelUp(); updatePlayerUI();
      toast(t('quiz_correct'), 'xp');
    } else {
      toast(t('quiz_wrong'), 'err');
    }
    setEl('quiz-score', correct + '/' + total);
    render();
  }

  function next() { idx++; answered = false; render(); }

  return { init: init, answer: answer, next: next };
})();

function initQuiz() { Quiz.init(); }


/* ══════════════════════════════════════════════════════════
   WORD PUZZLE
   ══════════════════════════════════════════════════════════ */
var WordGame = (function() {
  var idx = 0, score = 0, showHint = false, scrambled = '';

  function scramble(w) {
    var arr = w.split(''), out = w;
    var tries = 0;
    while (out === w && tries < 30) {
      out = arr.sort(function(){ return Math.random() - 0.5; }).join('');
      tries++;
    }
    return out;
  }

  function init() {
    idx = 0; score = 0; showHint = false; scrambled = '';
    render();
  }

  function render() {
    var el = document.getElementById('word-content');
    if (!el) return;
    setEl('word-score', score + ' pt');
    var words = wordLists[currentLang] || wordLists.uz;

    if (idx >= words.length) {
      el.innerHTML = '<div style="text-align:center;padding:12px 0">' +
        '<div style="font-size:2rem;margin-bottom:8px">🔤</div>' +
        '<div style="font-weight:800;font-size:1.1rem;color:var(--accent)">' + score + ' pt</div>' +
        '<div style="font-size:.8rem;color:var(--text3);margin:6px 0 14px">' +
          (score >= words.length * 12 ? '🏆 Champion!' : '💪 Try again!') +
        '</div>' +
        '<button class="btn btn-primary btn-full" onclick="WordGame.init()">' + t('new_game') + '</button>' +
      '</div>';
      return;
    }

    var cur = words[idx];
    if (!scrambled || scrambled === cur.w) scrambled = scramble(cur.w);
    var lenLabel = currentLang === 'ru' ? 'букв' : currentLang === 'en' ? 'letters' : 'harf';

    el.innerHTML =
      '<div style="font-size:.83rem;color:var(--text3);margin-bottom:8px">' + t('word_label') + '</div>' +
      '<div class="scramble-word">' + scrambled + '</div>' +
      (showHint ? '<div style="font-size:.78rem;color:var(--accent4);margin-bottom:10px">💡 ' + cur.h + '</div>' : '') +
      '<div style="display:flex;gap:7px;margin-bottom:8px">' +
        '<input class="quick-input" id="word-input" placeholder="' + cur.w.length + ' ' + lenLabel + '"' +
          ' style="text-transform:uppercase" onkeydown="if(event.key===\'Enter\')WordGame.check()">' +
        '<button class="btn btn-primary btn-sm" onclick="WordGame.check()">' + t('word_check') + '</button>' +
      '</div>' +
      '<div style="display:flex;gap:6px;flex-wrap:wrap">' +
        '<button class="btn btn-ghost btn-sm" onclick="WordGame.hint()">' + t('word_hint_btn') + '</button>' +
        '<button class="btn btn-ghost btn-sm" onclick="WordGame.skip()">' + t('word_skip') + '</button>' +
      '</div>' +
      '<div id="word-feedback" style="margin-top:8px;font-size:.82rem;font-weight:700;min-height:18px"></div>' +
      '<div style="color:var(--text3);font-size:.74rem;margin-top:6px">' + (idx + 1) + '/' + words.length + '</div>';
  }

  function check() {
    var inp = document.getElementById('word-input');
    if (!inp) return;
    var val   = inp.value.toUpperCase().trim();
    var words = wordLists[currentLang] || wordLists.uz;
    if (idx >= words.length) return;
    var cur = words[idx];
    if (val === cur.w) {
      score += 15;
      playerState.xp   += 15;
      playerState.gold += 5;
      checkLevelUp(); updatePlayerUI();
      toast(t('word_correct'), 'xp');
      var fb = document.getElementById('word-feedback');
      if (fb) fb.innerHTML = '<span style="color:var(--accent3)">' + t('word_correct') + '</span>';
      setTimeout(function(){ idx++; showHint = false; scrambled = ''; render(); }, 700);
    } else {
      var fb = document.getElementById('word-feedback');
      if (fb) fb.innerHTML = '<span style="color:var(--accent5)">' + t('word_wrong') + '</span>';
      inp.classList.add('shake');
      setTimeout(function(){ inp.classList.remove('shake'); }, 400);
    }
  }

  function hint()  { showHint = true; render(); }
  function skip()  { idx++; showHint = false; scrambled = ''; render(); }

  return { init: init, check: check, hint: hint, skip: skip };
})();

function initWordGame() { WordGame.init(); }
