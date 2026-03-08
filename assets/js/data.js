/* ============================================================
   GAMIFIED LIFE 1.0 — Application Data
   ============================================================ */

/* ── Player state (empty / fresh) ── */
const playerState = {
  name:         'Foydalanuvchi',
  avatar:       '🧙',
  title:        'Yangi Boshlovchi',
  level:        1,
  xp:           0,
  xpMax:        200,
  gold:         0,
  hp:           0,
  mp:           0,
  totalClicks:  0,
  clickPower:   1,
  clickerLevel: 1,
  questsDone:   0,
  streakDays:   0,
};

/* ── Quests ── */
let quests = [];

/* ── Habits ── */
let habits = [
  { id: 1, name: '💧 Suv iching',    streak: 0, days: [0,0,0,0,0,0,0] },
  { id: 2, name: '📚 Kitob o\'qish', streak: 0, days: [0,0,0,0,0,0,0] },
  { id: 3, name: '🏃 Yugurish',      streak: 0, days: [0,0,0,0,0,0,0] },
  { id: 4, name: '🧘 Meditatsiya',   streak: 0, days: [0,0,0,0,0,0,0] },
];

/* ── Achievements ── */
const achievements = [
  { icon: '⚔️', key: 'first_hero',  unlocked: false },
  { icon: '🔥', key: 'streak_7',    unlocked: false },
  { icon: '📚', key: 'reader',      unlocked: false },
  { icon: '💪', key: 'athlete',     unlocked: false },
  { icon: '🧙', key: 'wizard',      unlocked: false },
  { icon: '💰', key: 'rich',        unlocked: false },
  { icon: '🌟', key: 'star',        unlocked: false },
  { icon: '🏆', key: 'champion',    unlocked: false },
  { icon: '🎯', key: 'precise',     unlocked: false },
  { icon: '🤓', key: 'knowledgeable',unlocked: false },
  { icon: '⚡', key: 'fast',        unlocked: false },
  { icon: '🗺️', key: 'adventurer', unlocked: false },
];

const achieveNames = {
  uz: {
    first_hero:'İlk Qahramon', streak_7:'Streak Boss', reader:'Kitobxon',
    athlete:'Sportchi', wizard:'Sehrgar', rich:'Boylik',
    star:'Yulduz', champion:'Chempion', precise:'Aniq Nishon',
    knowledgeable:'Bilimdon', fast:'Tezkor', adventurer:'Sarguzasht',
  },
  ru: {
    first_hero:'Первый Герой', streak_7:'Streak Boss', reader:'Книгочей',
    athlete:'Спортсмен', wizard:'Волшебник', rich:'Богатство',
    star:'Звезда', champion:'Чемпион', precise:'Меткий',
    knowledgeable:'Знаток', fast:'Быстрый', adventurer:'Авантюрист',
  },
  en: {
    first_hero:'First Hero', streak_7:'Streak Boss', reader:'Bookworm',
    athlete:'Athlete', wizard:'Wizard', rich:'Wealthy',
    star:'Star', champion:'Champion', precise:'Sharpshooter',
    knowledgeable:'Knowledgeable', fast:'Fast Clicker', adventurer:'Adventurer',
  },
};

const achieveDescs = {
  uz: {
    first_hero:'1 ta vazifa bajaring', streak_7:'7 kun ketma-ket',
    reader:'10 ta kitob o\'qing', athlete:'30 kun sport',
    wizard:'Daraja 10', rich:'500 oltin yig\'ing',
    star:'100 XP ishlang', champion:'Lider bo\'ling',
    precise:'10 vazifa bajaring', knowledgeable:'Quiz 10 ta to\'g\'ri',
    fast:'500 marta bosish', adventurer:'Barcha kategoriyalar',
  },
  ru: {
    first_hero:'Выполните 1 задание', streak_7:'7 дней подряд',
    reader:'Прочитайте 10 книг', athlete:'30 дней спорта',
    wizard:'Достигните 10 уровня', rich:'Накопите 500 золота',
    star:'Заработайте 100 XP', champion:'Станьте лидером',
    precise:'Выполните 10 заданий', knowledgeable:'10 правильных ответов',
    fast:'500 нажатий', adventurer:'Все категории',
  },
  en: {
    first_hero:'Complete 1 quest', streak_7:'7-day streak',
    reader:'Read 10 books', athlete:'30 days of sport',
    wizard:'Reach level 10', rich:'Collect 500 gold',
    star:'Earn 100 XP', champion:'Top the leaderboard',
    precise:'Complete 10 quests', knowledgeable:'10 correct quiz answers',
    fast:'500 clicks', adventurer:'All categories',
  },
};

/* ── Skills ── */
const skillsData = {
  physical: [
    { icon:'🏃', nameUz:'Yugurish',       nameRu:'Бег',          nameEn:'Running',      level:0, prog:0 },
    { icon:'💪', nameUz:'Kuch mashqlari', nameRu:'Силовые',       nameEn:'Strength',     level:0, prog:0 },
    { icon:'🧘', nameUz:'Yoga',           nameRu:'Йога',          nameEn:'Yoga',         level:0, prog:0 },
  ],
  mental: [
    { icon:'📚', nameUz:'O\'qish',        nameRu:'Чтение',        nameEn:'Reading',      level:0, prog:0 },
    { icon:'🧮', nameUz:'Mantiq',         nameRu:'Логика',        nameEn:'Logic',        level:0, prog:0 },
    { icon:'🎯', nameUz:'Fokus',          nameRu:'Фокус',         nameEn:'Focus',        level:0, prog:0 },
  ],
  career: [
    { icon:'💻', nameUz:'Dasturlash',     nameRu:'Программирование',nameEn:'Coding',     level:0, prog:0 },
    { icon:'🎨', nameUz:'Dizayn',         nameRu:'Дизайн',        nameEn:'Design',       level:0, prog:0 },
    { icon:'📊', nameUz:'Tahlil',         nameRu:'Анализ',        nameEn:'Analysis',     level:0, prog:0 },
  ],
  creative: [
    { icon:'🎵', nameUz:'Musiqa',         nameRu:'Музыка',        nameEn:'Music',        level:0, prog:0 },
    { icon:'✍️', nameUz:'Yozish',         nameRu:'Письмо',        nameEn:'Writing',      level:0, prog:0 },
    { icon:'📸', nameUz:'Fotografiya',    nameRu:'Фотография',    nameEn:'Photography',  level:0, prog:0 },
  ],
};

/* ── Shop items ── */
const shopItems = [
  { id:1, emoji:'🧙', nameUz:'Sehrgar Avatar',    nameRu:'Аватар Волшебник', nameEn:'Wizard Avatar',   price:200, type:'avatars',   owned:false },
  { id:2, emoji:'⚔️', nameUz:'Jangchi Avatar',    nameRu:'Аватар Воин',      nameEn:'Warrior Avatar',  price:300, type:'avatars',   owned:false },
  { id:3, emoji:'🦸', nameUz:'Qahramon Avatar',   nameRu:'Аватар Герой',     nameEn:'Hero Avatar',     price:500, type:'avatars',   owned:false },
  { id:4, emoji:'👩‍💻',nameUz:'Hacker Avatar',    nameRu:'Аватар Хакер',     nameEn:'Hacker Avatar',   price:350, type:'avatars',   owned:false },
  { id:5, emoji:'⚡', nameUz:'XP x2 Kuchaytirgich',nameRu:'XP x2 Бустер',   nameEn:'XP x2 Booster',  price:400, type:'boosters',  owned:false },
  { id:6, emoji:'🛡️', nameUz:'HP To\'ldirish',   nameRu:'Восстановление HP', nameEn:'HP Restore',     price:150, type:'boosters',  owned:false },
  { id:7, emoji:'🍀', nameUz:'Omad Booteri',      nameRu:'Бустер удачи',     nameEn:'Luck Booster',    price:250, type:'boosters',  owned:false },
  { id:8, emoji:'🌙', nameUz:'Qorong\'u Mavzu',   nameRu:'Тёмная тема',      nameEn:'Dark Theme',      price:100, type:'themes',    owned:false },
  { id:9, emoji:'🌊', nameUz:'Okean Mavzu',       nameRu:'Океан тема',       nameEn:'Ocean Theme',     price:180, type:'themes',    owned:false },
  { id:10,emoji:'🌺', nameUz:'Gul Mavzu',         nameRu:'Цветок тема',      nameEn:'Flower Theme',    price:220, type:'themes',    owned:false },
  { id:11,emoji:'🎃', nameUz:'Shaytoncha',        nameRu:'Хэллоуин',         nameEn:'Halloween',       price:280, type:'themes',    owned:false },
  { id:12,emoji:'💎', nameUz:'Premium paket',     nameRu:'Премиум пакет',    nameEn:'Premium Pack',    price:800, type:'boosters',  owned:false },
];

/* ── Leaderboard (static) ── */
const leaderboard = [
  { name:'Alibek T.',  level:1, xp:0 },
  { name:'Zulfiya R.', level:1, xp:0 },
  { name:'Jamshid B.', level:1, xp:0 },
  { name:'Malika S.',  level:1, xp:0 },
];

/* ── Diary ── */
let diaryEntries = [];

/* ── Finance ── */
let financeData = [];

/* ── Quiz questions ── */
const quizData = {
  uz: [
    { q: 'O\'zbekistonning poytaxti qaysi shahar?',   opts: ['Samarqand','Toshkent','Buxoro','Namangan'],  ans: 1 },
    { q: '15 × 4 = ?',                                opts: ['50','55','60','65'],                          ans: 2 },
    { q: 'Qaysi planet Quyoshga eng yaqin?',          opts: ['Venera','Merkuriy','Mars','Yer'],             ans: 1 },
    { q: 'Python qanday til?',                        opts: ['Markup','Dasturlash','Tarmoq','Ma\'lumotlar'],ans: 1 },
    { q: 'Inson tanasida nechta suyak bor?',          opts: ['196','206','216','226'],                      ans: 1 },
    { q: 'HTML nima uchun ishlatiladi?',              opts: ['Dizayn','Dasturlash','Sahifa tuzilmasi','Tarmoq'],ans: 2 },
    { q: 'Qaysi hayvon eng tez yuguradi?',            opts: ['Sher','Gepard','Ot','It'],                    ans: 1 },
  ],
  ru: [
    { q: 'Столица Франции?',                          opts: ['Лион','Марсель','Париж','Ницца'],             ans: 2 },
    { q: '12 × 8 = ?',                               opts: ['86','96','106','116'],                         ans: 1 },
    { q: 'Ближайшая к Солнцу планета?',               opts: ['Венера','Меркурий','Марс','Земля'],           ans: 1 },
    { q: 'Что такое Python?',                         opts: ['Разметка','Программирование','Сеть','БД'],    ans: 1 },
    { q: 'Сколько костей у человека?',                opts: ['196','206','216','226'],                      ans: 1 },
    { q: 'Для чего HTML?',                            opts: ['Дизайн','Код','Структура','Сеть'],            ans: 2 },
    { q: 'Самое быстрое животное?',                   opts: ['Лев','Гепард','Лошадь','Собака'],             ans: 1 },
  ],
  en: [
    { q: 'Capital of Japan?',                         opts: ['Osaka','Kyoto','Tokyo','Hiroshima'],          ans: 2 },
    { q: '17 × 6 = ?',                               opts: ['92','102','112','122'],                        ans: 1 },
    { q: 'Closest planet to the Sun?',                opts: ['Venus','Mercury','Mars','Earth'],             ans: 1 },
    { q: 'Python is a?',                              opts: ['Markup','Programming language','Network','DB'],ans: 1 },
    { q: 'How many bones in a human body?',           opts: ['196','206','216','226'],                      ans: 1 },
    { q: 'What is HTML used for?',                    opts: ['Design','Code','Page structure','Network'],   ans: 2 },
    { q: 'Fastest animal on land?',                   opts: ['Lion','Cheetah','Horse','Dog'],               ans: 1 },
  ],
};

/* ── Word lists ── */
const wordLists = {
  uz: [
    { w:'HAYOT',    h:'Yashash' },
    { w:'KUCH',     h:'Quvvat' },
    { w:'OLTIN',    h:'Qimmatli metal' },
    { w:'DOSTON',   h:'She\'r turi' },
    { w:'MAQSAD',   h:'Nishon' },
    { w:'DARAJA',   h:'Bosqich' },
    { w:'YUTUQ',    h:'Natija' },
  ],
  ru: [
    { w:'ЖИЗНЬ',   h:'Существование' },
    { w:'СИЛА',    h:'Мощь' },
    { w:'ЗОЛОТО',  h:'Драгметалл' },
    { w:'ПОБЕДА',  h:'Триумф' },
    { w:'МЕЧТА',   h:'Желание' },
    { w:'УРОВЕНЬ', h:'Ступень' },
    { w:'НАВЫК',   h:'Умение' },
  ],
  en: [
    { w:'LIFE',    h:'Existence' },
    { w:'POWER',   h:'Strength' },
    { w:'QUEST',   h:'Mission' },
    { w:'LEVEL',   h:'Stage' },
    { w:'SKILL',   h:'Ability' },
    { w:'BRAVE',   h:'Fearless' },
    { w:'GOAL',    h:'Objective' },
  ],
};
