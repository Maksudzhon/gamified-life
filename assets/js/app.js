/* ============================================================
   GAMIFIED LIFE 1.0 — App Entry Point (bug-fixed)
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {

  /* 1. Language */
  setLang('uz');

  /* 2. Particles */
  initParticles();

  /* 3. Pomodoro display */
  renderPomoDisplay();

  /* 4. Runner game init */
  Runner.init();

  /* 5. Render dashboard */
  renderDashboard();

  /* 6. Canvas initial size */
  resizeCanvas();

  /* 7. Theme */
  document.documentElement.setAttribute('data-theme', 'light');
  var tb = document.getElementById('theme-btn');
  if (tb) tb.textContent = '🌙';

  /* 8. Resize handler */
  window.addEventListener('resize', function() {
    if (window.innerWidth > 767) closeMobileMenu();
    resizeCanvas();
  });

  /* 9. Achievements / streak ticker */
  setInterval(function() {
    var count = achievements.filter(function(a){ return a.unlocked; }).length;
    var el = document.getElementById('achieve-count');
    if (el) el.textContent = count + '/12';
    var streak = habits.reduce(function(mx, h){ return Math.max(mx, h.streak); }, 0);
    var sb = document.getElementById('streak-badge');
    if (sb) sb.textContent = streak + ' 🔥';
    playerState.streakDays = streak;
  }, 2000);

});

function resizeCanvas() {
  var c = document.getElementById('runner-canvas');
  if (c) {
    c.width  = c.offsetWidth  || 600;
    c.height = c.offsetHeight || 200;
  }
}

/* ── Quest tab filter (global) ── */
function switchQuestTab(filter, btn) {
  if (btn && btn.closest) {
    btn.closest('.tabs').querySelectorAll('.tab-btn').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
  }
  var el = document.getElementById('quests-page-list');
  if (!el) return;
  var list = quests;
  if (filter === 'active') list = quests.filter(function(q){ return !q.done; });
  if (filter === 'done')   list = quests.filter(function(q){ return  q.done; });
  if (list.length) {
    el.innerHTML = list.map(function(q){
      return '<div class="card" style="padding:4px 6px 8px">' + questHTML(q) + '</div>';
    }).join('');
  } else {
    el.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:28px;color:var(--text3)">' +
      (currentLang === 'ru' ? 'Ничего нет' : currentLang === 'en' ? 'Nothing here' : 'Hozircha bo\'sh') + '</div>';
  }
}

/* ── Finance add (global) ── */
function openFinanceAdd() {
  var lp = currentLang === 'ru' ? 'Категория:' : currentLang === 'en' ? 'Category:' : 'Kategoriya:';
  var ap = currentLang === 'ru' ? 'Сумма (+ приход, - расход):' : currentLang === 'en' ? 'Amount (+ income, - expense):' : 'Miqdor (+ kirim, - chiqim):';
  var label  = prompt(lp);
  if (!label || !label.trim()) return;
  var amount = parseFloat(prompt(ap));
  if (isNaN(amount)) return;
  financeData.unshift({ label: label.trim(), amount: Math.abs(amount), type: amount >= 0 ? 'in' : 'out' });
  renderFinance();
  toast(currentLang === 'ru' ? 'Запись добавлена!' : currentLang === 'en' ? 'Entry added!' : 'Yozuv qo\'shildi!', 'info');
}

/* ── Pomodoro mode buttons (need `this` from HTML) ── */
function setPomoModeBtn(mins, mode, btn) {
  setPomoMode(mins, mode, btn);
}
