// Интеграция авторизации с админ-панелью

// Загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    initializeAuth();
});

function initializeAuth() {
    // Получение элементов из index.html
    const loginPage = document.getElementById('loginPage');
    const welcomePage = document.getElementById('welcomePage');
    const adminContainer = document.getElementById('adminContainer');
    const userBadge = document.getElementById('userBadge');
    const adminNameDisplay = document.getElementById('adminNameDisplay');
    const welcomeAdminName = document.getElementById('welcomeAdminName');
    const exitButton = document.getElementById('exitButton');
    const loginForm = document.getElementById('loginForm');
    
    // Проверка авторизации через URL параметры
    checkUrlAuthorization();
    
    // Проверка текущей сессии и отображение соответствующего интерфейса
    checkAndDisplayAuth();
    
    // Обработчик формы входа
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleLogin();
        });
    }
    
    // Обработчик кнопки "Выйти" в хедере
    if (exitButton) {
        exitButton.addEventListener('click', () => {
            handleLogout();
        });
    }
    
    // Обработчики для кнопок выхода на странице приветствия
    const exitWelcomeBtns = document.querySelectorAll('.btn-exit-welcome');
    exitWelcomeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            handleLogout();
        });
    });
    
    // Кнопка "Начать работу" - показывает админ-панель
    const startWorkBtn = document.querySelector('.btn-start');
    if (startWorkBtn) {
        startWorkBtn.addEventListener('click', () => {
            showAdminPanel();
        });
    }
    
    // Кнопка "Выход" на welcome странице
    const exitWelcomeBtn = document.querySelector('.btn-exit-welcome');
    if (exitWelcomeBtn) {
        exitWelcomeBtn.addEventListener('click', () => {
            handleLogout();
        });
    }
}

// Проверка авторизации через URL (для перехода по ссылке с параметрами)
function checkUrlAuthorization() {
    const urlParams = new URLSearchParams(window.location.search);
    const key = urlParams.get('key');
    const authToken = urlParams.get('auth_token');
    
    // Если есть параметры авторизации
    if (key === 'true' || authToken) {
        const currentUser = window.authSystem.getCurrentUser();
        
        if (!currentUser) {
            // Пользователь не авторизован, но есть параметры - считаем как попытку
            console.log('Обнаружены параметры авторизации в URL');
        }
    }
    
    // Очистка URL от параметров авторизации (без перезагрузки)
    const cleanUrl = window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);
}

// Проверка текущего состояния авторизации
function checkAndDisplayAuth() {
    const currentUser = window.authSystem.getCurrentUser();
    
    if (currentUser) {
        // Пользователь авторизован
        showAuthorizedInterface(currentUser);
    } else {
        // Пользователь не авторизован
        showUnauthorizedInterface();
    }
}

// Отображение интерфейса для авторизованного пользователя
function showAuthorizedInterface(user) {
    const loginPage = document.getElementById('loginPage');
    const welcomePage = document.getElementById('welcomePage');
    const adminContainer = document.getElementById('adminContainer');
    const userBadge = document.getElementById('userBadge');
    const adminNameDisplay = document.getElementById('adminNameDisplay');
    const welcomeAdminName = document.getElementById('welcomeAdminName');
    const exitButton = document.getElementById('exitButton');
    
    // Скрытие страницы логина
    if (loginPage) loginPage.classList.remove('active');
    loginPage.style.display = 'none';
    
    // Отображение страницы приветствия
    if (welcomePage) welcomePage.classList.add('active');
    if (welcomeAdminName) welcomeAdminName.textContent = user.name;
    
    // Отображение бейджа пользователя
    if (userBadge) userBadge.classList.remove('hidden');
    if (adminNameDisplay) adminNameDisplay.textContent = user.name;
    
    // Отображение кнопки выхода
    if (exitButton) exitButton.classList.remove('hidden');
    
    // Скрытие админ-панели (она откроется по клику "Начать работу")
    if (adminContainer) adminContainer.classList.add('hidden');
}

// Отображение интерфейса для неавторизованного пользователя
function showUnauthorizedInterface() {
    const loginPage = document.getElementById('loginPage');
    const welcomePage = document.getElementById('welcomePage');
    const adminContainer = document.getElementById('adminContainer');
    const userBadge = document.getElementById('userBadge');
    const exitButton = document.getElementById('exitButton');
    
    // Отображение страницы логина
    if (loginPage) {
        loginPage.style.display = 'flex';
        loginPage.classList.add('active');
    }
    
    // Скрытие приветствия и админки
    if (welcomePage) welcomePage.classList.remove('active');
    if (adminContainer) adminContainer.classList.add('hidden');
    
    // Скрытие бейджа и кнопки выхода
    if (userBadge) userBadge.classList.add('hidden');
    if (exitButton) exitButton.classList.add('hidden');
}

// Обработка входа
function handleLogin() {
    const loginInput = document.getElementById('login');
    const passwordInput = document.getElementById('password');
    
    const login = loginInput ? loginInput.value.trim() : '';
    const password = passwordInput ? passwordInput.value : '';
    
    if (!login || !password) {
        showAuthMessage('Пожалуйста, заполните все поля', 'error');
        return;
    }
    
    const result = window.authSystem.login(login, password);
    
    if (result.success) {
        showAuthMessage('Вход выполнен успешно!', 'success');
        
        // Очищение полей
        if (loginInput) loginInput.value = '';
        if (passwordInput) passwordInput.value = '';
        
        // Обновление интерфейса
        checkAndDisplayAuth();
        
        // Генерация ссылку для шаринга (опционально)
        const shareableLink = window.authSystem.generateAuthUrl(window.location.href);
        console.log('Ссылка для быстрого доступа (действует 24 часа):', shareableLink);
        
    } else {
        showAuthMessage(result.error, 'error');
    }
}

// Обработка выхода
function handleLogout() {
    window.authSystem.logout();
    
    // Скрытие админ-панели если она открыта
    const adminContainer = document.getElementById('adminContainer');
    if (adminContainer) adminContainer.classList.add('hidden');
    
    // Отображение страницы логина
    checkAndDisplayAuth();
    
    showAuthMessage('Вы вышли из системы', 'success');
}

// Показ сообщений авторизации
function showAuthMessage(message, type) {
    // Удаление существующего сообщения
    const existingMsg = document.querySelector('.auth-message');
    if (existingMsg) existingMsg.remove();
    
    // Создание нового сообщения
    const msgDiv = document.createElement('div');
    msgDiv.className = `auth-message ${type}`;
    msgDiv.textContent = message;
    
    // Поиск формы и добавление сообщения
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.insertBefore(msgDiv, loginForm.firstChild);
    }
    
    // Автоматическое исчезновение через 3 секунды
    setTimeout(() => {
        if (msgDiv) msgDiv.remove();
    }, 3000);
}

// Показать админ-панель
function showAdminPanel() {
    const welcomePage = document.getElementById('welcomePage');
    const adminContainer = document.getElementById('adminContainer');
    
    if (welcomePage) welcomePage.classList.remove('active');
    if (adminContainer) adminContainer.classList.remove('hidden');
    
    // Триггер события для основного скрипта (если нужно)
    const event = new CustomEvent('adminPanelShown');
    document.dispatchEvent(event);
}

// Функция для создания нового пользователя (только для администратора)
function createNewUser(login, password, name, role = 'viewer') {
    // Проверка прав текущего пользователя
    if (!window.authSystem.hasPermission('super_admin')) {
        return { success: false, error: 'Недостаточно прав для создания пользователей' };
    }

    if (!VALID_ROLES.includes(role)) {
        return { 
            success: false, 
            error: `Недопустимая роль "${role}". Доступные роли: ${VALID_ROLES.join(', ')}` 
        };
    }
    
    return window.authSystem.register(login, password, name, role);
}

// Функция для получения списка пользователей (только для админа)
function getUserList() {
    if (!window.authSystem.hasPermission('super_admin')) {
        return null;
    }
    return window.authSystem.getAllUsers();
}

// Экспорт функции для использования в консоли и других скриптах
window.adminAuth = {
    createUser: createNewUser,
    getUsers: getUserList,
    logout: () => handleLogout(),
    getCurrentUser: () => window.authSystem.getCurrentUser(),
    hasPermission: (role) => window.authSystem.hasPermission(role),
    generateShareableLink: () => window.authSystem.generateAuthUrl(window.location.href)
};

console.log('Система авторизации загружена');
//console.log('Пользователи по умолчанию: admin_Ivan, admin_Nataly, admin_Victory');
//console.log('Для создания пользователя: adminAuth.createUser("логин", "пароль", "Имя", "роль")');