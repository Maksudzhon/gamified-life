/* ============================================================
   GAMIFIED LIFE 1.0 — Internationalization (UZ / RU / EN)
   ============================================================ */

const TRANSLATIONS = {
  uz: {
    /* NAV */
    nav_home:     '🏠 Bosh Sahifa',
    nav_quests:   '⚔️ Vazifalar',
    nav_skills:   '🌟 Ko\'nikmalar',
    nav_games:    '🕹️ O\'yinlar',
    nav_shop:     '🛒 Do\'kon',
    nav_profile:  '👤 Profil',
    nav_updates:  '🔔 Yangilanishlar',

    /* HEADER */
    greeting:     'Salom',
    level:        'Daraja',
    level_up_msg: 'DARAJA OSHDI',

    /* HERO */
    hero_sub:     'Hayotingizni o\'yinga aylantiring. Har kun yangi yutuq!',
    xp_to_next:   'Keyingi darajaga:',

    /* STAT LABELS */
    stat_hp:   'Sog\'liq',
    stat_mp:   'Energiya',
    stat_xp:   'XP',
    stat_gold: 'Oltin',

    /* DASHBOARD SECTIONS */
    today_quests:  'Bugungi Vazifalar',
    add:           'Qo\'sh',
    habits:        'Odatlar',
    streak:        'ketma-ket',
    achievements:  'Yutuqlar',
    leaderboard:   'Liderlar Jadvali',
    diary:         'Kundalik',
    write:         'Yoz',
    finance:       'Moliyaviy Tracker',
    weekly_stats:  'Haftalik Statistika',
    pomodoro:      'Pomodoro Timer',

    /* POMODORO */
    focus_mode:    'Fokus',
    focus_label:   'Fokus vaqti',
    short_break:   'Qisqa Dam',
    long_break:    'Uzoq Dam',
    pomo_start:    'Boshlash',
    pomo_pause:    'To\'xtatish',
    pomo_reset:    'Qayta',
    pomo_cycle:    'Tsikl',

    /* QUESTS PAGE */
    quests_title:  'Barcha Vazifalar',
    tab_all:       'Barchasi',
    tab_active:    'Faol',
    tab_done:      'Bajarilgan',
    tab_daily:     'Kundalik',
    add_quest:     'Yangi Vazifa',
    add_quest_btn: '+ Vazifa Qo\'sh',
    quest_name_lbl:'Vazifa nomi',
    quest_ph:      'Masalan: Kitob o\'qi...',
    quick_ph:      'Tez qo\'shish...',
    diff_lbl:      'Qiyinlik',
    diff_easy:     'Oson',
    diff_med:      'O\'rta',
    diff_hard:     'Qiyin',
    cat_lbl:       'Kategoriya',
    xp_lbl:        'XP Mukofot',
    quest_added:   'Vazifa qo\'shildi!',
    quest_done:    'Vazifa bajarildi! 🎉',

    /* SKILLS */
    skills_title:  'Ko\'nikmalar Daraxti',
    physical:      'Jismoniy',
    mental:        'Aqliy',
    career:        'Kasbiy',
    creative:      'Ijodiy',

    /* GAMES */
    games_title:   'O\'yinlar',
    runner_title:  'Yuguruvchi Qahramon',
    runner_sub:    'Spacebar yoki bosib sakrash',
    runner_score:  'Hisob',
    runner_record: 'Rekord',
    start_game:    'O\'yinni Boshlash',
    play_again:    'Qayta O\'ynash',
    game_over:     'O\'yin Tugadi!',

    memory_title:  'Xotira O\'yini',
    moves:         'Harakatlar',
    pairs:         'Juftlar',
    new_game:      'Yangi O\'yin',

    clicker_title: 'Kuchli Bosuvchi',
    total_clicks:  'Jami bosilmalar',
    per_click:     'Har bosish',
    upgrade:       'Yangilash',
    upgrade_cost:  'XP',

    quiz_title:    'Bilim Testi',
    quiz_correct:  'To\'g\'ri! +30 XP',
    quiz_wrong:    'Noto\'g\'ri!',
    next_q:        'Keyingi Savol',

    word_title:    'So\'z Topish',
    word_label:    'Harflarni qayta joylashtiring:',
    word_check:    'Tekshir',
    word_next:     'Keyingi',
    word_skip:     'O\'tkaz',
    word_hint_btn: 'Maslahat',
    word_correct:  'Barakalla! +15 pt',
    word_wrong:    'Noto\'g\'ri, qayta urinib ko\'ring!',

    /* SHOP */
    shop_title:    'Do\'kon',
    your_gold:     'Sizning oltiningiz:',
    tab_avatars:   'Avatarlar',
    tab_boosters:  'Kuchaytirgichlar',
    tab_themes:    'Mavzular',
    buy:           'Sotib ol',
    owned:         'Sotib Olingan',
    not_enough:    'Oltin yetmaydi!',
    bought:        'Sotib olindi!',

    /* PROFILE */
    profile_title: 'Mening Profilim',
    quests_done:   'Vazifalar',
    days_active:   'Kunlar',
    edit:          'Tahrirlash',
    save:          'Saqlash',
    stats:         'Statistika',
    my_achieve:    'Mening Yutuqlarim',
    attributes:    'Atributlar',
    act_calendar:  'Faollik Kalendaridagi',
    edit_profile:  'Profil Tahrirlash',
    name_lbl:      'Ism',
    avatar_lbl:    'Avatar Emoji',
    title_lbl:     'Unvon',
    saved:         'Saqlandi ✓',

    /* UPDATES */
    updates_title: 'Kutilayotgan Yangilanishlar',
    live_now:      '🟢 Hozir Mavjud',
    coming_soon:   '⏳ Kutilmoqda',

    /* DAYS (habit) */
    days: ['Du','Se','Ch','Pa','Ju','Sh','Ya'],

    /* MISC */
    xp_earned: 'XP qo\'shildi!',
    cycle:     'Tsikl',
    score_lbl: 'Hisob',
    activity_label: 'So\'nggi 5 haftadagi faollik',

    /* UPDATES CONTENT */
    v10_title: 'Birinchi Versiya — Hayotni O\'yinga Aylantiring!',
    v10_desc:  'Gamified Life 1.0 bilan tanishing! Vazifalar, odatlar, yutuqlar, ko\'nikmalar daraxti, do\'kon, mini o\'yinlar, Pomodoro timer, moliyaviy tracker va kundalik — barchasi bir joyda. Hayotingizning har bir jihatini RPG o\'yiniga aylantiring.',
    v11_title: 'Ijtimoiy Dunyo — Do\'stlar va Klanlar',
    v11_desc:  'Do\'stlaringizni platformaga taklif qiling, birgalikda guruh vazifalarini bajaring va global liderlar jadvalida raqobat qiling. Guild (klan) tizimi orqali jamoaviy yutuqlarga erishing, do\'stlarga XP sovg\'a qiling va challenge tizimidan foydalaning. Real vaqt sinxronizatsiyasi va push-bildirishnomalar ham qo\'shiladi.',
    v12_title: 'AI Murabbiy — Shaxsiy Rivojlanish Yordamchisi',
    v12_desc:  'Sun\'iy intellekt asosida ishluvchi shaxsiy murabbiy siz uchun kun rejasini tavsiya qiladi, zaif tomonlaringizni aniqlaydi va ularni kuchaytirishga yordam beradi. Haftalik hisobotlar, maqsad belgilash vositasi va motivatsion xabarlar ham mavjud bo\'ladi.',
    v13_title: 'Mobil Ilova va Oflayn Rejim',
    v13_desc:  'Android va iOS uchun to\'liq funksional mobil ilovalar chiqariladi. Internet bo\'lmasa ham ishlashni davom ettirish uchun oflayn rejim, streak yo\'qolish ogohlantirishlari, Apple Health va Google Fit integratsiyasi ham qo\'shiladi.',

    v11_tags: ['👥 Do\'stlar','⚔️ PvP','🏰 Klanlar','📩 Bildirishnomalar','🌍 Global Lider'],
    v12_tags: ['🤖 AI Murabbiy','📊 Tahlil','🎯 Maqsad','📝 Hisobot','💡 Smart Maslahat'],
    v13_tags: ['📱 iOS App','🤖 Android','📵 Oflayn','🔔 Push','💪 Health Sync'],
  },

  ru: {
    nav_home:     '🏠 Главная',
    nav_quests:   '⚔️ Задания',
    nav_skills:   '🌟 Навыки',
    nav_games:    '🕹️ Игры',
    nav_shop:     '🛒 Магазин',
    nav_profile:  '👤 Профиль',
    nav_updates:  '🔔 Обновления',

    greeting:     'Привет',
    level:        'Уровень',
    level_up_msg: 'УРОВЕНЬ ПОВЫШЕН',

    hero_sub:    'Превратите свою жизнь в игру. Каждый день — новое достижение!',
    xp_to_next:  'До следующего уровня:',

    stat_hp:   'Здоровье',
    stat_mp:   'Энергия',
    stat_xp:   'XP',
    stat_gold: 'Золото',

    today_quests: 'Задания на сегодня',
    add:          'Добавить',
    habits:       'Привычки',
    streak:       'дней подряд',
    achievements: 'Достижения',
    leaderboard:  'Таблица лидеров',
    diary:        'Дневник',
    write:        'Написать',
    finance:      'Финансы',
    weekly_stats: 'Статистика недели',
    pomodoro:     'Таймер Помодоро',

    focus_mode:   'Фокус',
    focus_label:  'Время фокуса',
    short_break:  'Короткий перерыв',
    long_break:   'Длинный перерыв',
    pomo_start:   'Старт',
    pomo_pause:   'Пауза',
    pomo_reset:   'Сброс',
    pomo_cycle:   'Цикл',

    quests_title:   'Все задания',
    tab_all:        'Все',
    tab_active:     'Активные',
    tab_done:       'Выполненные',
    tab_daily:      'Ежедневные',
    add_quest:      'Новое задание',
    add_quest_btn:  '+ Добавить задание',
    quest_name_lbl: 'Название задания',
    quest_ph:       'Например: Читать книгу...',
    quick_ph:       'Быстро добавить...',
    diff_lbl:       'Сложность',
    diff_easy:      'Лёгкий',
    diff_med:       'Средний',
    diff_hard:      'Сложный',
    cat_lbl:        'Категория',
    xp_lbl:         'Награда XP',
    quest_added:    'Задание добавлено!',
    quest_done:     'Задание выполнено! 🎉',

    skills_title: 'Дерево навыков',
    physical:     'Физические',
    mental:       'Умственные',
    career:       'Карьерные',
    creative:     'Творческие',

    games_title:   'Игры',
    runner_title:  'Бегущий Герой',
    runner_sub:    'Пробел или тап для прыжка',
    runner_score:  'Счёт',
    runner_record: 'Рекорд',
    start_game:    'Начать игру',
    play_again:    'Играть снова',
    game_over:     'Конец игры!',

    memory_title:  'Игра на память',
    moves:         'Ходы',
    pairs:         'Пары',
    new_game:      'Новая игра',

    clicker_title: 'Кликер',
    total_clicks:  'Всего нажатий',
    per_click:     'За нажатие',
    upgrade:       'Улучшить',
    upgrade_cost:  'XP',

    quiz_title:    'Тест знаний',
    quiz_correct:  'Правильно! +30 XP',
    quiz_wrong:    'Неправильно!',
    next_q:        'Следующий вопрос',

    word_title:    'Угадай слово',
    word_label:    'Переставьте буквы:',
    word_check:    'Проверить',
    word_next:     'Следующее',
    word_skip:     'Пропустить',
    word_hint_btn: 'Подсказка',
    word_correct:  'Молодец! +15 pt',
    word_wrong:    'Неверно, попробуйте снова!',

    shop_title:    'Магазин',
    your_gold:     'Ваше золото:',
    tab_avatars:   'Аватары',
    tab_boosters:  'Бустеры',
    tab_themes:    'Темы',
    buy:           'Купить',
    owned:         'Куплено',
    not_enough:    'Недостаточно золота!',
    bought:        'Куплено!',

    profile_title: 'Мой профиль',
    quests_done:   'Задания',
    days_active:   'Дни',
    edit:          'Редактировать',
    save:          'Сохранить',
    stats:         'Статистика',
    my_achieve:    'Мои достижения',
    attributes:    'Атрибуты',
    act_calendar:  'Календарь активности',
    edit_profile:  'Редактировать профиль',
    name_lbl:      'Имя',
    avatar_lbl:    'Аватар Emoji',
    title_lbl:     'Звание',
    saved:         'Сохранено ✓',

    updates_title: 'Ожидаемые обновления',
    live_now:      '🟢 Доступно',
    coming_soon:   '⏳ Ожидается',

    days: ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],

    xp_earned: 'XP добавлено!',
    cycle:     'Цикл',
    score_lbl: 'Счёт',
    activity_label: 'Активность за последние 5 недель',

    v10_title: 'Первая версия — Превратите жизнь в игру!',
    v10_desc:  'Добро пожаловать в Gamified Life 1.0! Задания, привычки, достижения, дерево навыков, магазин, мини-игры, таймер Помодоро, финансы и дневник — всё в одном месте. Превратите каждый аспект своей жизни в RPG-приключение.',
    v11_title: 'Социальный мир — Друзья и Кланы',
    v11_desc:  'Приглашайте друзей, выполняйте командные задания и соревнуйтесь в глобальной таблице лидеров. Система гильдий для совместных достижений, подарки XP друзьям и система вызовов. Синхронизация в реальном времени и push-уведомления.',
    v12_title: 'AI-тренер — Персональный помощник',
    v12_desc:  'Персональный тренер на основе ИИ будет рекомендовать задания, анализировать слабые стороны и помогать их укреплять. Еженедельные отчёты, планировщик целей и мотивационные сообщения.',
    v13_title: 'Мобильное приложение и офлайн-режим',
    v13_desc:  'Полнофункциональные приложения для Android и iOS. Офлайн-режим, предупреждения о потере серии, интеграция с Apple Health и Google Fit.',

    v11_tags: ['👥 Друзья','⚔️ PvP','🏰 Кланы','📩 Уведомления','🌍 Лидеры'],
    v12_tags: ['🤖 AI-тренер','📊 Анализ','🎯 Цели','📝 Отчёт','💡 Советы'],
    v13_tags: ['📱 iOS','🤖 Android','📵 Офлайн','🔔 Push','💪 Health'],
  },

  en: {
    nav_home:     '🏠 Dashboard',
    nav_quests:   '⚔️ Quests',
    nav_skills:   '🌟 Skills',
    nav_games:    '🕹️ Games',
    nav_shop:     '🛒 Shop',
    nav_profile:  '👤 Profile',
    nav_updates:  '🔔 Updates',

    greeting:     'Hello',
    level:        'Level',
    level_up_msg: 'LEVEL UP',

    hero_sub:    'Turn your life into a game. A new achievement every day!',
    xp_to_next:  'Next level in:',

    stat_hp:   'Health',
    stat_mp:   'Energy',
    stat_xp:   'XP',
    stat_gold: 'Gold',

    today_quests: 'Today\'s Quests',
    add:          'Add',
    habits:       'Habits',
    streak:       'streak',
    achievements: 'Achievements',
    leaderboard:  'Leaderboard',
    diary:        'Diary',
    write:        'Write',
    finance:      'Finance Tracker',
    weekly_stats: 'Weekly Stats',
    pomodoro:     'Pomodoro Timer',

    focus_mode:   'Focus',
    focus_label:  'Focus time',
    short_break:  'Short Break',
    long_break:   'Long Break',
    pomo_start:   'Start',
    pomo_pause:   'Pause',
    pomo_reset:   'Reset',
    pomo_cycle:   'Cycle',

    quests_title:   'All Quests',
    tab_all:        'All',
    tab_active:     'Active',
    tab_done:       'Completed',
    tab_daily:      'Daily',
    add_quest:      'New Quest',
    add_quest_btn:  '+ Add Quest',
    quest_name_lbl: 'Quest name',
    quest_ph:       'E.g. Read a book...',
    quick_ph:       'Quick add...',
    diff_lbl:       'Difficulty',
    diff_easy:      'Easy',
    diff_med:       'Medium',
    diff_hard:      'Hard',
    cat_lbl:        'Category',
    xp_lbl:         'XP Reward',
    quest_added:    'Quest added!',
    quest_done:     'Quest done! 🎉',

    skills_title: 'Skill Tree',
    physical:     'Physical',
    mental:       'Mental',
    career:       'Career',
    creative:     'Creative',

    games_title:   'Games',
    runner_title:  'Running Hero',
    runner_sub:    'Space or tap to jump',
    runner_score:  'Score',
    runner_record: 'Record',
    start_game:    'Start Game',
    play_again:    'Play Again',
    game_over:     'Game Over!',

    memory_title:  'Memory Game',
    moves:         'Moves',
    pairs:         'Pairs',
    new_game:      'New Game',

    clicker_title: 'Power Clicker',
    total_clicks:  'Total clicks',
    per_click:     'Per click',
    upgrade:       'Upgrade',
    upgrade_cost:  'XP',

    quiz_title:    'Knowledge Quiz',
    quiz_correct:  'Correct! +30 XP',
    quiz_wrong:    'Wrong!',
    next_q:        'Next Question',

    word_title:    'Word Puzzle',
    word_label:    'Rearrange the letters:',
    word_check:    'Check',
    word_next:     'Next',
    word_skip:     'Skip',
    word_hint_btn: 'Hint',
    word_correct:  'Great! +15 pt',
    word_wrong:    'Wrong, try again!',

    shop_title:    'Shop',
    your_gold:     'Your gold:',
    tab_avatars:   'Avatars',
    tab_boosters:  'Boosters',
    tab_themes:    'Themes',
    buy:           'Buy',
    owned:         'Owned',
    not_enough:    'Not enough gold!',
    bought:        'Purchased!',

    profile_title: 'My Profile',
    quests_done:   'Quests',
    days_active:   'Days',
    edit:          'Edit',
    save:          'Save',
    stats:         'Stats',
    my_achieve:    'My Achievements',
    attributes:    'Attributes',
    act_calendar:  'Activity Calendar',
    edit_profile:  'Edit Profile',
    name_lbl:      'Name',
    avatar_lbl:    'Avatar Emoji',
    title_lbl:     'Title',
    saved:         'Saved ✓',

    updates_title: 'Upcoming Updates',
    live_now:      '🟢 Live Now',
    coming_soon:   '⏳ Coming Soon',

    days: ['Mo','Tu','We','Th','Fr','Sa','Su'],

    xp_earned: 'XP earned!',
    cycle:     'Cycle',
    score_lbl: 'Score',
    activity_label: 'Activity for the past 5 weeks',

    v10_title: 'First Release — Gamify Your Life!',
    v10_desc:  'Welcome to Gamified Life 1.0! Quests, habits, achievements, skill tree, shop, mini-games, Pomodoro timer, finance tracker, and diary — all in one place. Turn every aspect of your life into an RPG adventure.',
    v11_title: 'Social World — Friends & Guilds',
    v11_desc:  'Invite friends, complete team quests, and compete on the global leaderboard. Guild system for cooperative achievements, gift XP to friends, and a challenge system. Real-time sync and push notifications included.',
    v12_title: 'AI Coach — Personal Development Assistant',
    v12_desc:  'An AI-powered personal coach will recommend daily tasks, identify your weak areas, and help you strengthen them. Weekly reports, goal planning tools, and motivational messages.',
    v13_title: 'Mobile App & Offline Mode',
    v13_desc:  'Full-featured apps for Android and iOS. Offline mode, streak-loss warnings, Apple Health and Google Fit integration.',

    v11_tags: ['👥 Friends','⚔️ PvP','🏰 Guilds','📩 Notifications','🌍 Global Rank'],
    v12_tags: ['🤖 AI Coach','📊 Analysis','🎯 Goals','📝 Reports','💡 Smart Tips'],
    v13_tags: ['📱 iOS App','🤖 Android','📵 Offline','🔔 Push','💪 Health Sync'],
  }
};

/* Active language */
let currentLang = 'uz';

function t(key) {
  return (TRANSLATIONS[currentLang] || TRANSLATIONS.uz)[key]
    || TRANSLATIONS.uz[key]
    || key;
}

function setLang(lang) {
  if (!TRANSLATIONS[lang]) return;
  currentLang = lang;
  document.documentElement.setAttribute('data-lang', lang);
  ['uz','ru','en'].forEach(l => {
    document.getElementById('lang-' + l)?.classList.toggle('active', l === lang);
  });
  applyTranslations();
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    if (val) el.textContent = val;
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    const val = t(key);
    if (val) el.placeholder = val;
  });
}
