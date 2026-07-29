// ============================================================
//  УПРАВЛЕНИЕ ИНТЕРФЕЙСОМ
// ============================================================

// DOM-элементы
const timerEl = document.getElementById('timer');
const coinsEl = document.getElementById('coins');
const hintEl = document.getElementById('hint');
const soulEmoji = document.getElementById('soul-emoji');
const btnHeaven = document.getElementById('btn-heaven');
const btnHell = document.getElementById('btn-hell');

// Обновление таймера и монет
function updateUI(state) {
    timerEl.textContent = `⏳ ${state.timer}`;
    coinsEl.textContent = `🪙 ${state.coins}`;
}

// Установка подсказки
function setHint(text, className = '') {
    hintEl.textContent = text;
    hintEl.className = className;
}

// Установка эмодзи души
function setSoulEmoji(emoji, className = '') {
    soulEmoji.textContent = emoji;
    soulEmoji.className = className;
}

// Анимация души (сброс)
function resetSoulEmoji() {
    soulEmoji.className = '';
}

// Блокировка/разблокировка кнопок
function setButtonsEnabled(enabled) {
    btnHeaven.style.pointerEvents = enabled ? 'auto' : 'none';
    btnHell.style.pointerEvents = enabled ? 'auto' : 'none';
    btnHeaven.style.opacity = enabled ? 1 : 0.5;
    btnHell.style.opacity = enabled ? 1 : 0.5;
}
