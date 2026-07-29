// ============================================================
//  ОСНОВНАЯ ЛОГИКА ИГРЫ
// ============================================================

// --- Элементы ---
const authScreen = document.getElementById('auth-screen');
const gameScreen = document.getElementById('game-screen');
const authName = document.getElementById('auth-name');
const authPassword = document.getElementById('auth-password');
const authGenderValue = document.getElementById('auth-gender-value');
const authBtn = document.getElementById('auth-btn');
const authError = document.getElementById('auth-error');

// --- Выбор пола ---
document.querySelectorAll('.gender-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        authGenderValue.value = btn.dataset.gender;
    });
});

// --- Регистрация / Вход ---
authBtn.addEventListener('click', () => {
    const name = authName.value.trim();
    const password = authPassword.value.trim();
    const gender = authGenderValue.value;

    if (!name || name.length < 2) {
        authError.textContent = '❌ Имя минимум 2 символа';
        return;
    }
    if (!password || password.length < 3) {
        authError.textContent = '❌ Пароль минимум 3 символа';
        return;
    }
    if (!gender) {
        authError.textContent = '❌ Выбери пол';
        return;
    }

    const players = getPlayers();

    if (players[name]) {
        if (players[name].password !== password) {
            authError.textContent = '❌ Неверный пароль!';
            return;
        }
        setCurrentUser(name);
        startGame(name);
        return;
    }

    players[name] = {
        password: password,
        gender: gender,
        coins: 0,
        totalGames: 0,
        wins: 0,
        losses: 0
    };
    savePlayers(players);
    setCurrentUser(name);
    startGame(name);
});

// --- Проверка авторизации ---
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен!');
    const username = checkAuth();
    console.log('Проверка авторизации:', username);
    if (username) {
        startGame(username);
    }
});

// ============================================================
//  СОСТОЯНИЕ ИГРЫ
// ============================================================

let state = {};
let timerInterval = null;
let timeoutId = null;

// ============================================================
//  ЗАПУСК ИГРЫ
// ============================================================

function startGame(username) {
    console.log('Запуск игры для:', username);
    
    authScreen.style.display = 'none';
    gameScreen.style.display = 'flex';

    document.getElementById('player-name').textContent = '👤 ' + username;

    const player = getPlayerData(username);
    if (player) {
        const genderEmoji = player.gender === 'male' ? '👨' :
            player.gender === 'female' ? '👩' : '🤖';
        document.getElementById('player-gender').textContent = genderEmoji;

        state = {
            coins: player.coins || 0,
            timer: 7,
            streak: 0,
            currentSoul: null,
            canAct: true,
        };
        updateUI(state);
        loadNewSoul();
    } else {
        console.error('Игрок не найден:', username);
    }
}

// ============================================================
//  ИГРОВАЯ ЛОГИКА
// ============================================================

function loadNewSoul() {
    console.log('Загрузка новой души');
    
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
    setSoulEmotion('neutral');
    setButtonsEnabled(true);
    updateUI(state);

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
                setSoulEmotion('crack');
                updateCoins(-15);

                timeoutId = setTimeout(() => {
                    loadNewSoul();
                }, 1500);
            }
        }
    }, 1000);
}

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
        setSoulEmotion('happy');
        flySoul();
        updateCoins(50);

    } else {
        state.coins = Math.max(0, state.coins - 20);
        state.streak = 0;
        setHint(`❌ ОСУЖДЁН! -20 🪙`, 'result hell');
        setSoulEmotion('angry');
        crackSoul();
        updateCoins(-20);
    }

    updateUI(state);

    timeoutId = setTimeout(() => {
        loadNewSoul();
    }, 1500);
}

// ============================================================
//  ОБРАБОТЧИКИ КНОПОК
// ============================================================

btnHeaven.addEventListener('click', function() {
    console.log('Нажата кнопка В РАЙ');
    if (state.canAct) endRound('heaven');
});

btnHell.addEventListener('click', function() {
    console.log('Нажата кнопка В АД');
    if (state.canAct) endRound('hell');
});

// ============================================================
//  СОХРАНЕНИЕ ПРИ ВЫХОДЕ
// ============================================================

window.addEventListener('beforeunload', () => {
    const user = getCurrentUser();
    if (user && state.coins !== undefined) {
        const player = getPlayerData(user.username);
        if (player) {
            player.coins = state.coins;
            savePlayerData(user.username, player);
        }
    }
});

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        const user = getCurrentUser();
        if (user && state.coins !== undefined) {
            const player = getPlayerData(user.username);
            if (player) {
                player.coins = state.coins;
                savePlayerData(user.username, player);
            }
        }
    }
});

console.log('game.js загружен!');
