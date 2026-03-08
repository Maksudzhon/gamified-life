/* ============================================================
   GAMIFIED LIFE 1.0 — UI Rendering  (bug-fixed)
   ============================================================ */

/* ── PAGE NAVIGATION ── */
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');

  document.querySelectorAll('.nav-link').forEach(a => a.classList.remove('active'));
  document.querySelectorAll(`.nav-link[data-page="${page}"]`).forEach(a => a.classList.add('active'));

  closeMobileMenu();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderPageContent(page);
}

function renderPageContent(p) {
  const map = {
    home:    renderDashboard,
    quests:  renderQuestsPage,
    skills:  renderSkillsPage,
    games:   () => { initMemory(); initQuiz(); initWordGame(); },
    shop:    renderShop,
    profile: renderProfile,
    updates: () => applyTranslations(),
  };
  if (map[p]) map[p]();
}

/* ── MOBILE MENU ── */
let menuOpen = false;
function toggleMobileMenu() {
  menuOpen = !menuOpen;
  const nav = document.getElementById('mobile-nav');
  if (nav) nav.classList.toggle('open', menuOpen);
}
function closeMobileMenu() {
  menuOpen = false;
  const nav = document.getElementById('mobile-nav');
  if (nav) nav.classList.remove('open');
}

/* ── THEME ── */
let currentTheme = 'light';
function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  const btn = document.getElementById('theme-btn');
  if (btn) btn.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
}

/* ── TOAST ── */
function toast(msg, type) {
  type = type || 'info';
  const icons = { xp: '⭐', win: '🏆', err: '❌', info: '✅' };
  const el = document.createElement('div');
  el.className = 'toast t-' + type;
  el.innerHTML = '<span class="toast-ico">' + (icons[type] || 'ℹ️') + '</span>' + msg;
  const container = document.getElementById('toast-container');
  if (!container) return;
  container.appendChild(el);
  setTimeout(function() {
    el.style.opacity = '0';
    el.style.transform = 'translateX(110%)';
    el.style.transition = 'all .3s';
    setTimeout(function() { if (el.parentNode) el.remove(); }, 320);
  }, 3000);
}

/* ── MODAL ── */
function openModal(id)  {
  const el = document.getElementById(id);
  if (el) el.classList.add('open');
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('open');
}
window.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
});

/* ── SAFE getElementById helper ── */
function setEl(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}
function setStyle(id, prop, val) {
  const el = document.getElementById(id);
  if (el) el.style[prop] = val;
}

/* ── PLAYER UI ── */
function updatePlayerUI() {
  const p = playerState;
  const xpPct = Math.min(100, Math.round(p.xp / p.xpMax * 100));
  const goldPct = Math.min(100, Math.round(p.gold / 3000 * 100));

  setEl('hero-avatar',       p.avatar);
  setEl('hero-banner-title', t('greeting') + ', ' + p.name + '! 👋');
  setEl('hero-level-chip',   '⭐ ' + t('level') + ' ' + p.level);
  setEl('hero-xp-text',      p.xp + ' / ' + p.xpMax + ' XP');
  setEl('hero-xp-to-next',   t('xp_to_next') + ' ' + (p.xpMax - p.xp) + ' XP');
  setStyle('hero-xp-fill', 'width', xpPct + '%');

  setEl('stat-hp-val',   p.hp);
  setEl('stat-mp-val',   p.mp);
  setEl('stat-xp-val',   p.xp);
  setEl('stat-gold-val', p.gold.toLocaleString());
  setStyle('stat-hp-bar',   'width', p.hp + '%');
  setStyle('stat-mp-bar',   'width', p.mp + '%');
  setStyle('stat-xp-bar',   'width', xpPct + '%');
  setStyle('stat-gold-bar', 'width', goldPct + '%');

  setEl('pill-name',   p.name);
  setEl('pill-level',  '⭐ ' + t('level') + ' ' + p.level);
  setEl('pill-avatar', p.avatar);
  setEl('shop-gold',   p.gold.toLocaleString());

  /* Profile page elements — may not be in DOM */
  setEl('profile-big-av',      p.avatar);
  setEl('profile-name',        p.name);
  setEl('profile-title-text',  p.title);
  setEl('pms-level',           p.level);
  setEl('pms-quests',          quests.filter(function(q){ return q.done; }).length);
  setEl('pms-streak',          p.streakDays);
  setEl('pms-gold',            p.gold);
}

function checkLevelUp() {
  var levelled = false;
  while (playerState.xp >= playerState.xpMax) {
    playerState.level++;
    playerState.xp    -= playerState.xpMax;
    playerState.xpMax  = Math.round(playerState.xpMax * 1.35);
    playerState.hp     = Math.min(100, playerState.hp + 10);
    playerState.mp     = Math.min(100, playerState.mp + 10);
    levelled = true;
  }
  if (levelled) {
    toast(t('level_up_msg') + '! ' + t('level') + ' ' + playerState.level + ' 🎊', 'win');
    spawnConfetti();
  }
}

/* ── CONFETTI ── */
function spawnConfetti() {
  var colors = ['#5b52f5','#ff5e7e','#3ecfa0','#f9c946','#ec4462'];
  for (var i = 0; i < 32; i++) {
    (function() {
      var d = document.createElement('div');
      d.style.cssText = [
        'position:fixed',
        'width:8px',
        'height:8px',
        'border-radius:2px',
        'z-index:9999',
        'pointer-events:none',
        'top:45%',
        'left:' + Math.random() * 100 + '%',
        'background:' + colors[Math.floor(Math.random() * colors.length)],
        'animation:confettiFall ' + (0.8 + Math.random() * 0.9) + 's ' + (Math.random() * 0.35) + 's forwards'
      ].join(';');
      document.body.appendChild(d);
      setTimeout(function(){ if (d.parentNode) d.remove(); }, 1900);
    })();
  }
}

/* ── DASHBOARD ── */
function renderDashboard() {
  renderQuests();
  renderHabits();
  renderAchievements();
  renderLeaderboardUI();
  renderDiary();
  renderFinance();
  renderWeeklyStats();
  updatePlayerUI();
}

/* ── QUESTS ── */
function renderQuests() {
  var list = document.getElementById('quest-list');
  if (!list) return;
  var visible = quests.slice(0, 5);
  if (visible.length) {
    list.innerHTML = visible.map(questHTML).join('');
  } else {
    list.innerHTML = '<p style="color:var(--text3);font-size:.85rem;padding:12px 0">' +
      (currentLang === 'ru' ? 'Нет заданий' : currentLang === 'en' ? 'No quests yet' : 'Hozircha vazifa yo\'q') +
      '</p>';
  }
}

function questHTML(q) {
  var diffClass = { easy:'diff-easy', medium:'diff-medium', hard:'diff-hard' }[q.diff] || 'diff-easy';
  var diffLabel = { easy: t('diff_easy'), medium: t('diff_med'), hard: t('diff_hard') }[q.diff] || '';
  return '<div class="quest-item ' + (q.done ? 'done' : '') + '" onclick="toggleQuest(' + q.id + ')">' +
    '<div class="quest-check">' + (q.done ? '✓' : '') + '</div>' +
    '<div class="quest-info">' +
      '<div class="quest-name">' + q.name + '</div>' +
      '<div class="quest-meta"><span class="diff-chip ' + diffClass + '">' + diffLabel + '</span></div>' +
    '</div>' +
    '<div class="quest-xp-tag">+' + q.xp + ' XP</div>' +
  '</div>';
}

function toggleQuest(id) {
  var q = null;
  for (var i = 0; i < quests.length; i++) {
    if (quests[i].id === id) { q = quests[i]; break; }
  }
  if (!q) return;
  q.done = !q.done;
  if (q.done) {
    playerState.xp   += q.xp;
    playerState.gold += Math.floor(q.xp / 2);
    playerState.questsDone++;
    checkAchievement('first_hero');
    if (playerState.questsDone >= 10) checkAchievement('precise');
    toast('+' + q.xp + ' XP — ' + t('quest_done'), 'win');
    checkLevelUp();
  } else {
    playerState.xp   = Math.max(0, playerState.xp - q.xp);
    playerState.gold = Math.max(0, playerState.gold - Math.floor(q.xp / 2));
    playerState.questsDone = Math.max(0, playerState.questsDone - 1);
  }
  updatePlayerUI();
  renderQuests();
  renderQuestsPage();
}

function quickAddQuest() {
  var inp = document.getElementById('quick-quest-input');
  if (!inp) return;
  var name = inp.value.trim();
  if (!name) return;
  quests.push({ id: Date.now(), name: name, diff: 'easy', cat: 'work', xp: 40, done: false });
  inp.value = '';
  renderQuests();
  renderQuestsPage();
  toast(t('quest_added'), 'info');
}

function submitQuest() {
  var nameEl = document.getElementById('q-name');
  if (!nameEl) return;
  var name = nameEl.value.trim();
  if (!name) return;
  var diff = (document.getElementById('q-diff') || {}).value || 'easy';
  var cat  = (document.getElementById('q-cat')  || {}).value || 'work';
  var xp   = parseInt((document.getElementById('q-xp') || {}).value) || 50;
  quests.push({ id: Date.now(), name: name, diff: diff, cat: cat, xp: xp, done: false });
  closeModal('modal-add-quest');
  nameEl.value = '';
  renderQuests();
  renderQuestsPage();
  toast(t('quest_added'), 'info');
}

function renderQuestsPage() {
  var el = document.getElementById('quests-page-list');
  if (!el) return;
  if (quests.length) {
    el.innerHTML = quests.map(function(q) {
      return '<div class="card" style="padding:0">' +
        '<div style="padding:4px 6px 6px">' + questHTML(q) + '</div>' +
        '</div>';
    }).join('');
  } else {
    el.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:28px;color:var(--text3)">' +
      (currentLang === 'ru' ? 'Заданий нет' : currentLang === 'en' ? 'No quests yet' : 'Vazifalar yo\'q') +
      '</div>';
  }
}

/* ── HABITS ── */
function renderHabits() {
  var el = document.getElementById('habit-list');
  if (!el) return;
  var days = t('days');
  if (!Array.isArray(days)) days = ['D','S','Ch','P','J','Sh','Ya'];
  el.innerHTML = habits.map(function(h, hi) {
    return '<div class="habit-row">' +
      '<div class="habit-left">' +
        '<div class="habit-name">' + h.name + '</div>' +
        '<div class="habit-streak">🔥 ' + h.streak + ' ' + t('streak') + '</div>' +
      '</div>' +
      '<div class="habit-days">' +
        h.days.map(function(d, di) {
          return '<div class="habit-day ' + (d ? 'done' : '') + '" onclick="toggleHabit(' + hi + ',' + di + ')">' +
            (days[di] || (di + 1)) + '</div>';
        }).join('') +
      '</div>' +
    '</div>';
  }).join('');
}

function toggleHabit(hi, di) {
  if (!habits[hi]) return;
  habits[hi].days[di] = habits[hi].days[di] ? 0 : 1;
  if (habits[hi].days[di]) {
    playerState.xp += 15;
    playerState.hp  = Math.min(100, playerState.hp + 2);
    checkLevelUp();
    updatePlayerUI();
    toast('+15 XP 🔥', 'xp');
  }
  habits[hi].streak = habits[hi].days.filter(Boolean).length;
  renderHabits();
}

/* ── ACHIEVEMENTS ── */
function renderAchievements() {
  var el = document.getElementById('achieve-grid');
  if (!el) return;
  var names = achieveNames[currentLang] || achieveNames.uz;
  var descs = achieveDescs[currentLang] || achieveDescs.uz;
  el.innerHTML = achievements.slice(0, 6).map(function(a) {
    return '<div class="achieve-card ' + (a.unlocked ? '' : 'locked') + '" title="' + (descs[a.key] || '') + '">' +
      '<div class="achieve-icon">' + a.icon + '</div>' +
      '<div class="achieve-name">' + (names[a.key] || a.key) + '</div>' +
      (a.unlocked ? '<div class="achieve-check">✓</div>' : '') +
    '</div>';
  }).join('');
}

function checkAchievement(key) {
  for (var i = 0; i < achievements.length; i++) {
    if (achievements[i].key === key && !achievements[i].unlocked) {
      achievements[i].unlocked = true;
      var names = achieveNames[currentLang] || achieveNames.uz;
      toast('🏆 ' + (names[key] || key) + '!', 'win');
      renderAchievements();
      break;
    }
  }
}

/* ── LEADERBOARD ── */
function renderLeaderboardUI() {
  var el = document.getElementById('leaderboard-list');
  if (!el) return;
  var all = leaderboard.concat([{ name: playerState.name, level: playerState.level, xp: playerState.xp }]);
  all.sort(function(a, b) { return b.xp - a.xp; });
  all = all.slice(0, 5);
  el.innerHTML = all.map(function(l, i) {
    var rc = i === 0 ? 'rank-1' : i === 1 ? 'rank-2' : i === 2 ? 'rank-3' : 'rank-rest';
    return '<div class="leader-row">' +
      '<div class="rank-badge ' + rc + '">' + (i + 1) + '</div>' +
      '<div class="leader-info">' +
        '<div class="leader-name">' + l.name + '</div>' +
        '<div class="leader-lv">' + t('level') + ' ' + l.level + '</div>' +
      '</div>' +
      '<div class="leader-xp">⭐ ' + l.xp.toLocaleString() + ' XP</div>' +
    '</div>';
  }).join('');
}

/* ── DIARY ── */
function renderDiary() {
  var el = document.getElementById('diary-list');
  if (!el) return;
  if (diaryEntries.length) {
    el.innerHTML = diaryEntries.slice(0, 3).map(function(e) {
      return '<div class="diary-entry">' +
        '<div class="diary-top">' +
          '<span class="diary-mood">' + e.mood + '</span>' +
          '<span class="diary-date">' + e.date + '</span>' +
        '</div>' +
        '<div class="diary-text">' + e.text + '</div>' +
      '</div>';
    }).join('');
  } else {
    el.innerHTML = '<p style="color:var(--text3);font-size:.85rem;padding:10px 0">' +
      (currentLang === 'ru' ? 'Нет записей' : currentLang === 'en' ? 'No entries yet' : 'Yozuvlar yo\'q') + '</p>';
  }
}

function openDiaryAdd() {
  var ph = currentLang === 'ru' ? 'Что произошло сегодня?' :
           currentLang === 'en' ? 'What happened today?' :
           'Bugun nima bo\'ldi?';
  var text = prompt(ph);
  if (!text || !text.trim()) return;
  var moods = ['😄','😊','😐','😔','😤','🥰'];
  diaryEntries.unshift({
    date: new Date().toLocaleDateString(),
    mood: moods[Math.floor(Math.random() * moods.length)],
    text: text.trim(),
  });
  renderDiary();
  toast(currentLang === 'ru' ? 'Запись добавлена!' :
        currentLang === 'en' ? 'Entry added!' : 'Yozuv qo\'shildi!', 'info');
}

/* ── FINANCE ── */
function renderFinance() {
  var el = document.getElementById('finance-list');
  if (!el) return;
  if (financeData.length) {
    el.innerHTML = financeData.map(function(f) {
      return '<div class="finance-row">' +
        '<div class="finance-dot ' + (f.type === 'in' ? 'fin-in' : 'fin-out') + '"></div>' +
        '<div class="finance-label">' + f.label + '</div>' +
        '<div class="finance-amount ' + (f.type === 'in' ? 'f-positive' : 'f-negative') + '">' +
          (f.type === 'in' ? '+' : '') + Math.abs(f.amount).toLocaleString() + ' so\'m' +
        '</div>' +
      '</div>';
    }).join('');
  } else {
    el.innerHTML = '<p style="color:var(--text3);font-size:.85rem;padding:10px 0">' +
      (currentLang === 'ru' ? 'Нет данных' : currentLang === 'en' ? 'No data yet' : 'Ma\'lumot yo\'q') + '</p>';
  }
}

/* ── WEEKLY CHART ── */
function renderWeeklyStats() {
  var el = document.getElementById('weekly-chart');
  if (!el) return;
  var days = t('days');
  if (!Array.isArray(days)) days = ['D','S','Ch','P','J','Sh','Ya'];
  var vals = [0,0,0,0,0,0,0];
  quests.forEach(function(q) { if (q.done) vals[4]++; });
  var max = Math.max.apply(null, vals.concat([1]));
  var html = '<div class="week-chart">';
  days.forEach(function(d, i) {
    html += '<div class="week-col">' +
      '<div class="week-bar ' + (i === 4 ? 'today' : '') + '" style="height:' + (Math.round(vals[i]/max*60)+8) + 'px" title="' + vals[i] + '"></div>' +
      '<span class="week-day">' + d + '</span>' +
    '</div>';
  });
  html += '</div><p style="font-size:.78rem;color:var(--text3);margin-top:4px">' +
    (currentLang === 'ru' ? 'Выполнено' : currentLang === 'en' ? 'Completed' : 'Bajarilgan') +
    ': <strong>' + vals.reduce(function(a,b){return a+b;},0) + '</strong></p>';
  el.innerHTML = html;
}

/* ── SKILLS PAGE ── */
function renderSkillsPage() {
  var cats = ['physical','mental','career','creative'];
  var nk = currentLang === 'ru' ? 'nameRu' : currentLang === 'en' ? 'nameEn' : 'nameUz';
  cats.forEach(function(cat) {
    var el = document.getElementById('skill-' + cat);
    if (!el) return;
    el.innerHTML = skillsData[cat].map(function(s, si) {
      return '<div class="skill-item" onclick="gainSkillXP(\'' + cat + '\',' + si + ')">' +
        '<div class="skill-ico">' + s.icon + '</div>' +
        '<div class="skill-info">' +
          '<div class="skill-name">' + s[nk] + '</div>' +
          '<div class="skill-lv">' + t('level') + ' ' + s.level + '/10</div>' +
          '<div class="prog-wrap"><div class="prog-fill prog-skill" style="width:' + s.prog + '%"></div></div>' +
        '</div>' +
        '<div class="skill-add">+XP</div>' +
      '</div>';
    }).join('');
  });
}

function gainSkillXP(cat, si) {
  var s = skillsData[cat][si];
  if (!s || s.level >= 10) return;
  s.prog += 18;
  if (s.prog >= 100) { s.level++; s.prog = 0; }
  playerState.xp += 20;
  checkLevelUp();
  updatePlayerUI();
  renderSkillsPage();
  var nk = currentLang === 'ru' ? 'nameRu' : currentLang === 'en' ? 'nameEn' : 'nameUz';
  toast(s.icon + ' ' + s[nk] + ' +20 XP', 'xp');
}

/* ── SHOP ── */
var shopFilter = 'all';
function renderShop() {
  var el = document.getElementById('shop-grid-inner');
  if (!el) return;
  var nk = currentLang === 'ru' ? 'nameRu' : currentLang === 'en' ? 'nameEn' : 'nameUz';
  var items = shopFilter === 'all' ? shopItems : shopItems.filter(function(i){ return i.type === shopFilter; });
  el.innerHTML = items.map(function(item) {
    return '<div class="shop-item ' + (item.owned ? 'owned' : '') + '" onclick="buyItem(' + item.id + ')">' +
      '<div class="shop-emoji">' + item.emoji + '</div>' +
      '<div class="shop-name">' + item[nk] + '</div>' +
      (item.owned
        ? '<div class="shop-owned">✓ ' + t('owned') + '</div>'
        : '<div class="shop-price">🪙 ' + item.price + '</div>') +
    '</div>';
  }).join('');
}

function setShopFilter(f, btn) {
  shopFilter = f;
  if (btn && btn.closest) {
    btn.closest('.tabs').querySelectorAll('.tab-btn').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
  }
  renderShop();
}

function buyItem(id) {
  var item = null;
  for (var i = 0; i < shopItems.length; i++) {
    if (shopItems[i].id === id) { item = shopItems[i]; break; }
  }
  if (!item || item.owned) return;
  if (playerState.gold < item.price) { toast(t('not_enough'), 'err'); return; }
  playerState.gold -= item.price;
  item.owned = true;
  renderShop();
  updatePlayerUI();
  var nk = currentLang === 'ru' ? 'nameRu' : currentLang === 'en' ? 'nameEn' : 'nameUz';
  toast(item.emoji + ' ' + item[nk] + ' — ' + t('bought'), 'win');
  checkAchievement('rich');
}

/* ── PROFILE ── */
function renderProfile() {
  updatePlayerUI();
  renderProfileStats();
  renderProfileAchieve();
  renderAttributes();
  renderActivityCalendar();
}

function renderProfileStats() {
  var el = document.getElementById('profile-stats');
  if (!el) return;
  var p = playerState;
  var bars = [
    ['⭐', 'XP', p.xp, p.xpMax, 'var(--xpb)'],
    ['❤️', t('stat_hp'), p.hp, 100, 'var(--hp)'],
    ['💎', t('stat_mp'), p.mp, 100, 'var(--mp)'],
  ];
  el.innerHTML = bars.map(function(b) {
    var pct = Math.min(100, Math.round(b[2] / b[3] * 100));
    return '<div style="margin-bottom:12px">' +
      '<div style="display:flex;justify-content:space-between;font-size:.8rem;font-weight:700;margin-bottom:4px">' +
        '<span>' + b[0] + ' ' + b[1] + '</span><span>' + b[2] + '/' + b[3] + '</span>' +
      '</div>' +
      '<div class="prog-wrap"><div class="prog-fill" style="width:' + pct + '%;background:' + b[4] + '"></div></div>' +
    '</div>';
  }).join('');
}

function renderProfileAchieve() {
  var el = document.getElementById('profile-achieve');
  if (!el) return;
  var names = achieveNames[currentLang] || achieveNames.uz;
  el.innerHTML = achievements.map(function(a) {
    return '<div class="achieve-card ' + (a.unlocked ? '' : 'locked') + '">' +
      '<div class="achieve-icon">' + a.icon + '</div>' +
      '<div class="achieve-name">' + (names[a.key] || a.key) + '</div>' +
      (a.unlocked ? '<div class="achieve-check">✓</div>' : '') +
    '</div>';
  }).join('');
}

function renderAttributes() {
  var el = document.getElementById('profile-attrs');
  if (!el) return;
  var cats = [
    { label: t('physical'), color: 'var(--hp)',     key: 'physical' },
    { label: t('mental'),   color: 'var(--xpb)',    key: 'mental'   },
    { label: t('career'),   color: 'var(--accent3)',key: 'career'   },
    { label: t('creative'), color: 'var(--accent4)',key: 'creative' },
  ];
  el.innerHTML = cats.map(function(c) {
    var data = skillsData[c.key] || [];
    var total = data.reduce(function(s, sk){ return s + sk.level; }, 0);
    var maxP = data.length * 10 || 1;
    var val = Math.min(100, Math.round(total / maxP * 100));
    return '<div style="margin-bottom:12px">' +
      '<div style="display:flex;justify-content:space-between;font-size:.8rem;font-weight:700;margin-bottom:4px">' +
        '<span>' + c.label + '</span><span>' + val + '%</span>' +
      '</div>' +
      '<div class="prog-wrap"><div class="prog-fill" style="width:' + val + '%;background:' + c.color + '"></div></div>' +
    '</div>';
  }).join('');
}

function renderActivityCalendar() {
  var el = document.getElementById('activity-cal');
  if (!el) return;
  var html = '<div class="activity-grid">';
  for (var i = 0; i < 35; i++) html += '<div class="act-cell act-0"></div>';
  html += '</div>';
  html += '<p style="font-size:.72rem;color:var(--text3);margin-top:8px">' + t('activity_label') + '</p>';
  el.innerHTML = html;
}

/* ── PROFILE EDIT ── */
function openEditProfile() {
  var pn = document.getElementById('pe-name');
  var pa = document.getElementById('pe-avatar');
  var pt = document.getElementById('pe-title');
  if (pn) pn.value = playerState.name;
  if (pa) pa.value = playerState.avatar;
  if (pt) pt.value = playerState.title;
  openModal('modal-edit-profile');
}

function saveProfile() {
  var pn = document.getElementById('pe-name');
  var pa = document.getElementById('pe-avatar');
  var pt = document.getElementById('pe-title');
  if (pn && pn.value.trim()) playerState.name   = pn.value.trim();
  if (pa && pa.value.trim()) playerState.avatar  = pa.value.trim();
  if (pt && pt.value)        playerState.title   = pt.value;
  closeModal('modal-edit-profile');
  updatePlayerUI();
  toast(t('saved'), 'info');
}

/* ── POMODORO ── */
var pomoInterval  = null;
var pomoSeconds   = 25 * 60;
var pomoMode      = 'focus';
var pomoCycleCount= 1;

function renderPomoDisplay() {
  var m = String(Math.floor(pomoSeconds / 60)).padStart(2, '0');
  var s = String(pomoSeconds % 60).padStart(2, '0');
  setEl('pomo-time', m + ':' + s);
}

function pomoAction(action) {
  if (action === 'start') {
    if (pomoInterval) return;
    pomoInterval = setInterval(function() {
      pomoSeconds--;
      renderPomoDisplay();
      if (pomoSeconds <= 0) {
        clearInterval(pomoInterval); pomoInterval = null;
        var reward = pomoMode === 'focus' ? 80 : 15;
        playerState.xp += reward;
        playerState.mp  = Math.min(100, playerState.mp + 5);
        checkLevelUp(); updatePlayerUI();
        pomoCycleCount++;
        setEl('pomo-cycle', t('cycle') + ' ' + pomoCycleCount);
        toast('⏱️ +' + reward + ' XP ✓', 'xp');
      }
    }, 1000);
  } else if (action === 'pause') {
    clearInterval(pomoInterval); pomoInterval = null;
  } else if (action === 'reset') {
    clearInterval(pomoInterval); pomoInterval = null;
    var mins = pomoMode === 'focus' ? 25 : pomoMode === 'short' ? 5 : 15;
    pomoSeconds = mins * 60;
    renderPomoDisplay();
  }
}

function setPomoMode(mins, mode, btn) {
  clearInterval(pomoInterval); pomoInterval = null;
  pomoMode = mode; pomoSeconds = mins * 60;
  renderPomoDisplay();
  var labels = { focus: t('focus_label'), short: t('short_break'), long: t('long_break') };
  setEl('pomo-mode-label', labels[mode] || '');
  /* update button active state safely */
  if (btn && btn.closest) {
    var parent = btn.closest('.pomo-mode-btns') || btn.closest('.pomo-controls');
    if (parent) {
      parent.querySelectorAll('.btn').forEach(function(b) {
        b.classList.remove('btn-primary'); b.classList.add('btn-ghost');
      });
      btn.classList.remove('btn-ghost'); btn.classList.add('btn-primary');
    }
  }
}

/* ── PARTICLES ── */
function initParticles() {
  var el = document.getElementById('particles');
  if (!el) return;
  var colors = ['#5b52f5','#ff5e7e','#3ecfa0','#f9c946'];
  for (var i = 0; i < 12; i++) {
    var p = document.createElement('div');
    p.className = 'particle';
    var size = 4 + Math.random() * 5;
    p.style.cssText = [
      'left:' + Math.random() * 100 + '%',
      'width:' + size + 'px',
      'height:' + size + 'px',
      'background:' + colors[Math.floor(Math.random() * colors.length)],
      'animation-duration:' + (9 + Math.random() * 10) + 's',
      'animation-delay:' + Math.random() * 8 + 's'
    ].join(';');
    el.appendChild(p);
  }
}
