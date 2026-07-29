// ============================================================
//  УПРАВЛЕНИЕ ИНТЕРФЕЙСОМ + 2D ДУША
// ============================================================

const timerEl = document.getElementById('timer');
const coinsEl = document.getElementById('coins');
const hintEl = document.getElementById('hint');
const soulEl = document.getElementById('soul');
const soulFaceEl = document.getElementById('soul-face');
const soulHaloEl = document.getElementById('soul-halo');
const btnHeaven = document.getElementById('btn-heaven');
const btnHell = document.getElementById('btn-hell');

function updateUI(state) {
    timerEl.textContent = `⏳ ${state.timer}`;
    coinsEl.textContent = `🪙 ${state.coins}`;
}

function setHint(text, className = '') {
    hintEl.textContent = text;
    hintEl.className = className;
}

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

function setButtonsEnabled(enabled) {
    btnHeaven.disabled = !enabled;
    btnHell.disabled = !enabled;
    btnHeaven.style.pointerEvents = enabled ? 'auto' : 'none';
    btnHell.style.pointerEvents = enabled ? 'auto' : 'none';
}
