/* ============================================================
   GAMIFIED LIFE 1.0 — Running Hero Game
   ============================================================ */

const Runner = (() => {
  let rafId = null;
  let running = false;
  let score = 0;
  let record = 0;
  let speed = 5;

  const player = {
    x: 80, y: 0, vy: 0,
    jumping: false,
    frame: 0, frameTimer: 0,
    groundY: 0,
  };

  const GRAVITY     = 0.62;
  const JUMP_FORCE  = -13;
  const CANVAS_H    = 200;
  const GROUND_Y_OFFSET = 40; // px above canvas bottom

  let obstacles = [];
  let bgStars   = [];

  /* ── Bootstrap ── */
  function init() {
    // Keyboard & touch
    document.addEventListener('keydown', e => {
      if (e.code === 'Space' && running) { e.preventDefault(); jump(); }
    });
    document.addEventListener('touchstart', () => { if (running) jump(); }, { passive: true });
    document.getElementById('runner-canvas')?.addEventListener('click', () => { if (running) jump(); });
  }

  function jump() {
    if (!player.jumping) {
      player.vy      = JUMP_FORCE;
      player.jumping = true;
    }
  }

  /* ── Start ── */
  function start() {
    const ov = document.getElementById('runner-overlay');
    if (ov) ov.style.display = 'none';

    running    = true;
    score      = 0;
    speed      = 5;
    obstacles  = [];
    bgStars    = [];

    const canvas   = document.getElementById('runner-canvas');
    player.groundY = canvas.offsetHeight - GROUND_Y_OFFSET;
    player.y       = player.groundY;
    player.vy      = 0;
    player.jumping = false;
    player.frame   = 0;

    cancelAnimationFrame(rafId);
    loop();
  }

  /* ── Game loop ── */
  function loop() {
    const canvas = document.getElementById('runner-canvas');
    if (!canvas || !running) return;

    const W   = canvas.offsetWidth;
    const H   = canvas.offsetHeight;
    canvas.width  = W;
    canvas.height = H;
    player.groundY = H - GROUND_Y_OFFSET;

    const ctx    = canvas.getContext('2d');
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    /* ── Sky ── */
    ctx.fillStyle = isDark ? '#0b0d1a' : '#dde3fd';
    ctx.fillRect(0, 0, W, H);

    /* ── Background stars / dots ── */
    while (bgStars.length < 18) bgStars.push({ x: Math.random() * W, y: Math.random() * (H - 60) });
    bgStars.forEach(s => {
      ctx.fillStyle = isDark ? 'rgba(255,255,255,.5)' : 'rgba(91,82,245,.18)';
      ctx.fillRect(s.x, s.y, 3, 3);
      s.x -= speed * 0.2;
      if (s.x < 0) s.x = W;
    });

    /* ── Ground ── */
    const groundTop = H - GROUND_Y_OFFSET + 5;
    ctx.fillStyle = isDark ? '#1c1f36' : '#c5cef5';
    ctx.fillRect(0, groundTop, W, H - groundTop);
    ctx.strokeStyle = isDark ? '#2a2f50' : '#a0adec';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, groundTop); ctx.lineTo(W, groundTop); ctx.stroke();

    /* ── Score ── */
    score++;
    speed = 5 + score / 280;
    document.getElementById('runner-score-val').textContent = score;
    if (score > record) {
      record = score;
      document.getElementById('runner-record-val').textContent = record;
    }

    /* ── Obstacles ── */
    const lastX = obstacles.length ? obstacles[obstacles.length - 1].x : -Infinity;
    const minGap = 180 + Math.random() * 120;
    if (obstacles.length === 0 || W - lastX > minGap) {
      if (Math.random() < 0.016) {
        const h   = 22 + Math.floor(Math.random() * 28);
        const emojis = ['🌵','🧱','🪨','🌊','💣'];
        obstacles.push({ x: W + 10, w: 26, h, emoji: emojis[Math.floor(Math.random() * emojis.length)] });
      }
    }
    obstacles = obstacles.filter(o => o.x > -60);
    obstacles.forEach(o => {
      const oy = groundTop - o.h;
      ctx.font      = `${o.h}px serif`;
      ctx.textAlign = 'center';
      ctx.fillText(o.emoji, o.x + 13, oy + o.h);
      o.x -= speed;
    });

    /* ── Player physics ── */
    player.vy += GRAVITY;
    player.y  += player.vy;
    if (player.y >= player.groundY) {
      player.y       = player.groundY;
      player.vy      = 0;
      player.jumping = false;
    }

    /* ── Player animation frame ── */
    player.frameTimer++;
    if (player.frameTimer > 7) { player.frame = (player.frame + 1) % 4; player.frameTimer = 0; }

    /* ── Draw player (animated person) ── */
    drawPerson(ctx, player.x, player.y, player.frame, player.jumping);

    /* ── Collision detection ── */
    for (const o of obstacles) {
      const oy = groundTop - o.h;
      if (player.x + 10 > o.x - 2 && player.x - 10 < o.x + o.w + 2 && player.y > oy) {
        endGame();
        return;
      }
    }

    rafId = requestAnimationFrame(loop);
  }

  /* ── Draw animated person ── */
  function drawPerson(ctx, px, py, frame, inAir) {
    const lv = Math.sin((frame / 4) * Math.PI * 2) * 0.72;

    ctx.save();

    /* Shadow */
    ctx.fillStyle = 'rgba(0,0,0,.12)';
    ctx.beginPath(); ctx.ellipse(px, py + 2, 12, 4, 0, 0, Math.PI * 2); ctx.fill();

    /* Shoes */
    ctx.fillStyle = '#222244';
    ctx.beginPath(); ctx.ellipse(px - 5 + Math.sin(lv) * 13, py + 13, 8, 4, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(px + 5 + Math.sin(-lv) * 13, py + 13, 8, 4, 0, 0, Math.PI * 2); ctx.fill();

    /* Legs */
    ctx.strokeStyle = '#2e3155'; ctx.lineWidth = 6; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(px - 5, py - 5); ctx.lineTo(px - 5 + Math.sin(lv) * 13, py + 10); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(px + 5, py - 5); ctx.lineTo(px + 5 + Math.sin(-lv) * 13, py + 10); ctx.stroke();

    /* Body */
    ctx.fillStyle = '#5b52f5';
    ctx.beginPath(); ctx.roundRect(px - 9, py - 28, 18, 24, 5); ctx.fill();

    /* Shirt number */
    ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.font = 'bold 7px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('GL', px, py - 18);

    /* Arms */
    const armA = Math.sin((frame / 4) * Math.PI * 2) * 0.65;
    ctx.strokeStyle = '#FFCC99'; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(px - 9, py - 22); ctx.lineTo(px - 19 + Math.cos(armA) * 4, py - 11 + Math.sin(armA) * 5); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(px + 9, py - 22); ctx.lineTo(px + 19 + Math.cos(-armA) * 4, py - 11 + Math.sin(-armA) * 5); ctx.stroke();

    /* Neck */
    ctx.fillStyle = '#FFCC99';
    ctx.beginPath(); ctx.roundRect(px - 4, py - 32, 8, 6, 2); ctx.fill();

    /* Head */
    ctx.fillStyle = '#FFCC99'; ctx.beginPath(); ctx.arc(px, py - 38, 10, 0, Math.PI * 2); ctx.fill();

    /* Hair */
    ctx.fillStyle = '#3a2810';
    ctx.beginPath();
    ctx.arc(px, py - 44, 9.5, 0, Math.PI, true);
    ctx.fill();
    if (inAir) {
      ctx.fillStyle = '#3a2810';
      ctx.beginPath(); ctx.ellipse(px + 8, py - 42, 4, 3, Math.PI / 4, 0, Math.PI * 2); ctx.fill();
    }

    /* Eyes */
    ctx.fillStyle = '#1a1a2e';
    ctx.beginPath(); ctx.arc(px - 3.5, py - 38, 1.8, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(px + 3.5, py - 38, 1.8, 0, Math.PI * 2); ctx.fill();

    /* Eye shine */
    ctx.fillStyle = 'rgba(255,255,255,.7)';
    ctx.beginPath(); ctx.arc(px - 2.5, py - 39, 0.6, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(px + 4.5, py - 39, 0.6, 0, Math.PI * 2); ctx.fill();

    /* Smile */
    ctx.strokeStyle = '#8b5e3c'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.arc(px, py - 35, 3.5, 0.1, Math.PI - 0.1); ctx.stroke();

    ctx.restore();
  }

  /* ── Game over ── */
  function endGame() {
    running = false;
    cancelAnimationFrame(rafId);

    // XP reward
    const xpGain = Math.floor(score / 8);
    if (xpGain > 0) {
      playerState.xp += xpGain;
      checkLevelUp();
      updatePlayerUI();
    }

    const ov = document.getElementById('runner-overlay');
    if (ov) {
      ov.style.display = 'flex';
      const labels = {
        gameOver:  currentLang === 'ru' ? 'Конец игры!' : currentLang === 'en' ? 'Game Over!' : 'O\'yin Tugadi!',
        scoreLbl:  currentLang === 'ru' ? 'Счёт' : currentLang === 'en' ? 'Score' : 'Hisob',
        recLbl:    currentLang === 'ru' ? 'Рекорд' : currentLang === 'en' ? 'Record' : 'Rekord',
        again:     currentLang === 'ru' ? 'Играть снова' : currentLang === 'en' ? 'Play Again' : 'Qayta O\'ynash',
        xpLbl:     currentLang === 'ru' ? 'XP получено' : currentLang === 'en' ? 'XP earned' : 'XP qo\'shildi',
      };
      ov.innerHTML = `
        <h2>💀 ${labels.gameOver}</h2>
        <p>${labels.scoreLbl}: <strong>${score}</strong> &nbsp;|&nbsp; ${labels.recLbl}: <strong>${record}</strong></p>
        ${xpGain > 0 ? `<p style="color:#f9c946;font-weight:800">+${xpGain} ${labels.xpLbl}</p>` : ''}
        <button class="start-game-btn" onclick="Runner.start()">${labels.again}</button>`;
    }
  }

  /* ── Public API ── */
  return { init, start, jump };
})();
