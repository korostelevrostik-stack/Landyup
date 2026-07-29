// ============================================================
//  УПРАВЛЕНИЕ ИНТЕРФЕЙСОМ + 2D ДУША
// ============================================================

// DOM-элементы
const timerEl = document.getElementById('timer');
const coinsEl = document.getElementById('coins');
const hintEl = document.getElementById('hint');
const soulEl = document.getElementById('soul');
const soulFaceEl = document.getElementById('soul-face');
const soulHaloEl = document.getElementById('soul-halo');
const btnHeaven = document.getElementById('btn-heaven');
const btnHell = document.getElementById('btn-hell');

// --- Обновление UI ---
function updateUI(state) {
    timerEl.textContent = `⏳ ${state.timer}`;
    coinsEl.textContent = `🪙 ${state.coins}`;
}

// --- Подсказка ---
function setHint(text, className = '') {
    hintEl.textContent = text;
    hintEl.className = className;
}

// --- Эмоции души ---
function setSoulEmotion(emotion) {
    const emojis = {
        neutral: '👻',
        happy: '😇',
        sad: '😢',
        angry: '👿',
        fly: '👻',
        crack: '💀'
    };
    const faces = {
        neutral: '◕‿◕',
        happy: '✧‿✧',
        sad: '◕︵◕',
        angry: '｀皿´',
        fly: '◕‿◕',
        crack: '×_×'
    };
    const halos = {
        neutral: '✨',
        happy: '💫',
        sad: '🌙',
        angry: '🔥',
        fly: '⭐',
        crack: '💥'
    };

    soulEl.textContent = emojis[emotion] || '👻';
    soulEl.className = emotion;
    soulFaceEl.textContent = faces[emotion] || '◕‿◕';
    soulHaloEl.textContent = halos[emotion] || '✨';
}

// --- Анимации ---
function flySoul() {
    setSoulEmotion('fly');
    setTimeout(() => {
        setSoulEmotion('neutral');
    }, 1200);
}

function crackSoul() {
    setSoulEmotion('crack');
    setTimeout(() => {
        setSoulEmotion('neutral');
    }, 1200);
}

function resetSoul() {
    setSoulEmotion('neutral');
}

// --- Кнопки ---
function setButtonsEnabled(enabled) {
    btnHeaven.disabled = !enabled;
    btnHell.disabled = !enabled;
    btnHeaven.style.pointerEvents = enabled ? 'auto' : 'none';
    btnHell.style.pointerEvents = enabled ? 'auto' : 'none';
}
