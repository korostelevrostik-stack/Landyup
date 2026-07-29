// ============================================================
//  СИСТЕМА АККАУНТОВ (регистрация, вход, сохранение)
// ============================================================

const AUTH_KEY = 'devil_auth';
const PLAYERS_KEY = 'devil_players';

// --- Работа с базой игроков ---
function getPlayers() {
    const data = localStorage.getItem(PLAYERS_KEY);
    return data ? JSON.parse(data) : {};
}

function savePlayers(players) {
    localStorage.setItem(PLAYERS_KEY, JSON.stringify(players));
}

// --- Текущий пользователь ---
function getCurrentUser() {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
}

function setCurrentUser(username) {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ username }));
}

function logout() {
    localStorage.removeItem(AUTH_KEY);
}

// --- Получить данные игрока ---
function getPlayerData(username) {
    const players = getPlayers();
    return players[username] || null;
}

// --- Сохранить данные игрока ---
function savePlayerData(username, data) {
    const players = getPlayers();
    players[username] = data;
    savePlayers(players);
}

// --- Обновить монеты у текущего игрока ---
function updateCoins(amount) {
    const user = getCurrentUser();
    if (!user) return;
    const player = getPlayerData(user.username);
    if (player) {
        player.coins = (player.coins || 0) + amount;
        savePlayerData(user.username, player);
    }
}

// --- Получить монеты текущего игрока ---
function getCoins() {
    const user = getCurrentUser();
    if (!user) return 0;
    const player = getPlayerData(user.username);
    return player ? player.coins || 0 : 0;
}

// --- Проверка авторизации ---
function checkAuth() {
    const user = getCurrentUser();
    if (user) {
        const player = getPlayerData(user.username);
        if (player) {
            return user.username;
        } else {
            logout();
            return null;
        }
    }
    return null;
}

// --- Выход из аккаунта (для отладки) ---
function deleteAccount() {
    const user = getCurrentUser();
    if (!user) return;
    const players = getPlayers();
    delete players[user.username];
    savePlayers(players);
    logout();
    location.reload();
}
