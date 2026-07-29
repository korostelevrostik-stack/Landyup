// ============================================================
//  ОСНОВНАЯ ЛОГИКА ИГРЫ
// ============================================================

// Состояние игры
const state = {
    coins: 0,
    timer: 7,
    streak: 0,
    currentSoul: null,
    canAct: true,
};

let timerInterval = null;
let timeoutId = null;

// Загрузка новой души
function loadNewSoul() {
    // Очистка старых таймеров
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
    }

    const soul = getRandomSoul();
    state.currentSoul = soul;
    state.timer = 7;
    state.canAct = true;

    setHint(`"${soul.text}"`);
    setSoulEmoji('👤');
    setButtonsEnabled(true);
    updateUI(state);

    // Запуск таймера
    timerInterval = setInterval(() => {
        state.timer -= 1;
        updateUI(state);

        if (state.timer <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            
            if (state.canAct) {
                state.canAct = false;
                state.coins = Math.max(0, state.coins - 15);
                setButtonsEnabled(false);
                updateUI(state);
                setHint('⏳ ЧИСТИЛИЩЕ... -15 🪙', 'result hell');
                setSoulEmoji('💀', 'crack');
                
                timeoutId = setTimeout(() => {
                    loadNewSoul();
                }, 1500);
            }
        }
    }, 1000);
}

// Завершение раунда
function endRound(playerChoice) {
    if (!state.canAct || !state.currentSoul) return;
    state.canAct = false;

    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    setButtonsEnabled(false);

    const correct = state.currentSoul.verdict;
    const isWin = (playerChoice === correct);

    if (isWin) {
        state.coins += 50;
        state.streak += 1;
        
        let bonusText = '';
        if (state.streak >= 5) {
            state.coins += 50;
            bonusText = ' 🔥 БОНУС ЗА СЕРИЮ! +50';
            state.streak = 0;
        }
        
        setHint(`✅ ОПРАВДАН! +50 🪙${bonusText}`, 'result heaven');
        setSoulEmoji('😇', 'fly');
        
    } else {
        state.coins = Math.max(0, state.coins - 20);
        state.streak = 0;
        setHint(`❌ ОСУЖДЁН! -20 🪙`, 'result hell');
        setSoulEmoji('👿', 'crack');
    }

    updateUI(state);

    timeoutId = setTimeout(() => {
        loadNewSoul();
    }, 1500);
}

// Обработчики кнопок
btnHeaven.addEventListener('click', () => {
    if (state.canAct) endRound('heaven');
});

btnHell.addEventListener('click', () => {
    if (state.canAct) endRound('hell');
});

// Инициализация
function initGame() {
    loadNewSoul();
    updateUI(state);
    console.log('🔥 Адвокат Дьявола запущен!');
}

// Запуск после загрузки DOM
document.addEventListener('DOMContentLoaded', initGame);
