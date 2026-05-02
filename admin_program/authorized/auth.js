// Хранилище пользоватлей
// Хеширование с помощью использования солей

const VALID_ROLES = ['viewer', 'editor', 'super_admin'];

class AuthSystem {
    constructor() {
        this.storageKey = 'admin_users';
        this.currentUserKey = 'current_admin_user';
        this.initDefaultUsers();
    }

    // Генерация случайной соли (необходимо для хеширования)
    generateSalt() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
        let salt = '';
        for (let i = 0; i < 16; i++) {
            salt += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return salt;
    }

    // Хеширование пароля с помощью соли
    hashPassword(password, salt) {
        let combined = password + salt;
        let hash = 0;
        for (let i = 0; i < combined.length; i++) {
            const char = combined.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Преобразование в 32-разрядное целое число
        }
        // Для большего усложения дополнительное преобразование
        // в Base64 с помощью btoa (бинарные данные  в ASCII-строку)
        return btoa(hash.toString(16) + salt.slice(0, 8));
    }

    // Получение всех пользователей
    getUsers() {
        const users = localStorage.getItem(this.storageKey);
        if (!users) return {};
        return JSON.parse(users);
    }

    // Сохранение пользователей
    saveUsers(users) {
        localStorage.setItem(this.storageKey, JSON.stringify(users));
    }

    // Пользователи по умолчанию 
    initDefaultUsers() {
        const users = this.getUsers();
        
        // Если пользователи уже есть - не перезаписываем
        if (Object.keys(users).length > 0) return;
        
        const defaultUsers = {
            'admin_Ivan': {
                name: 'Иван',
                role: 'super_admin',
                created: new Date().toISOString()
            },
            'admin_Nataly': {
                name: 'Наталия',
                role: 'super_admin',
                created: new Date().toISOString()
            },
            'admin_Victory': {
                name: 'Виктория',
                role: 'super_admin',
                created: new Date().toISOString()
            }
        };
        
        // Установка паролей для пользоватлей по
        // умолчанию с хешированием с помощью соли
        for (const [login, userData] of Object.entries(defaultUsers)) {
            const salt = this.generateSalt();
            let password = '';
            
            switch(login) {
                case 'admin_Ivan':
                    password = 'Ivan123!';
                    break;
                case 'admin_Nataly':
                    password = 'Nataly456@';
                    break;
                case 'admin_Victory':
                    password = 'Victory789#';
                    break;
            }
            
            userData.salt = salt;
            userData.hash = this.hashPassword(password, salt);
            defaultUsers[login] = userData;
        }
        
        this.saveUsers(defaultUsers);
        console.log('Пользователи по умолчанию созданы:', Object.keys(defaultUsers));
    }

    // Регистрация нового пользователя
    register(login, password, name, role = 'viewer') {
        const users = this.getUsers();
        
        // Проверка существования логина
        if (users[login]) {
            return { success: false, error: 'Логин уже существует' };
        }
        
        // Валидация длины
        if (login.length < 3) {
            return { success: false, error: 'Логин должен быть не менее 3 символов' };
        }
        
        if (password.length < 6) {
            return { success: false, error: 'Пароль должен быть не менее 6 символов' };
        }
        
        if (!name || name.length < 2) {
            return { success: false, error: 'Имя должно быть не менее 2 символов' };
        }

        if (!VALID_ROLES.includes(role)) {
            return { success: false, error: `Недопустимая роль "${role}". Доступные роли: ${VALID_ROLES.join(', ')}` };
        }
        
        // Создание нового пользователя
        const salt = this.generateSalt();
        const hash = this.hashPassword(password, salt);
        
        users[login] = {
            name: name,
            role: role,
            salt: salt,
            hash: hash,
            created: new Date().toISOString()
        };
        
        this.saveUsers(users);
        return { success: true, message: 'Пользователь успешно создан' };
    }

    // Авторизация пользователя
    login(login, password) {
        const users = this.getUsers();
        const user = users[login];
        
        if (!user) {
            return { success: false, error: 'Неверный логин или пароль' };
        }
        
        const hash = this.hashPassword(password, user.salt);
        
        if (hash !== user.hash) {
            return { success: false, error: 'Неверный логин или пароль' };
        }
        
        // Сохранение данных сессии (без хеша и соли)
        const sessionData = {
            login: login,
            name: user.name,
            role: user.role,
            createdAt: Date.now(),
            expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 часа
        };
        
        localStorage.setItem(this.currentUserKey, JSON.stringify(sessionData));
        
        return { 
            success: true, 
            user: { login, name: user.name, role: user.role },
            sessionKey: this.generateSessionKey(login)
        };
    }

    // Генерация ключа сессии (для URL параметров)
    generateSessionKey(login) {
        const data = `${login}_${Date.now()}_${Math.random()}`;
        let hash = 0;
        for (let i = 0; i < data.length; i++) {
            hash = ((hash << 5) - hash) + data.charCodeAt(i);
            hash = hash & hash;
        }
        return Math.abs(hash).toString(16);
    }

    // Проверка авторизации через URL параметр
    checkUrlAuth() {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('auth');
        const key = urlParams.get('key');
        
        // Если есть параметр key=true или auth_token
        if (key === 'true' || token) {
            const currentUser = this.getCurrentUser();
            if (currentUser) {
                return true;
            }
        }
        
        return false;
    }

    // Получение текущего пользователя
    getCurrentUser() {
        const userData = localStorage.getItem(this.currentUserKey);
        if (!userData) return null;
        
        const session = JSON.parse(userData);
        
        // Проверка срока действия сессии
        if (session.expiresAt < Date.now()) {
            this.logout();
            return null;
        }
        
        return session;
    }

    // Проверка прав доступа
    hasPermission(requiredRole) {
        const user = this.getCurrentUser();
        if (!user) return false;
        
        const roleLevel = {
            'viewer': 1,
            'editor': 2,
            'super_admin': 3
        };
        
        return roleLevel[user.role] >= roleLevel[requiredRole];
    }

    // Выход из системы
    logout() {
        localStorage.removeItem(this.currentUserKey);
        // Очистка URL от параметров
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Получение списка всех пользователей (для админа)
    getAllUsers() {
        const users = this.getUsers();
        // Возвращение списка без хешей и солей
        const safeUsers = {};
        for (const [login, userData] of Object.entries(users)) {
            safeUsers[login] = {
                name: userData.name,
                role: userData.role,
                created: userData.created
            };
        }
        return safeUsers;
    }

    // Удаление пользователя (только для админа)
    deleteUser(login) {
        if (login === 'admin_Victory' | login === 'admin_Ivan' | login === 'admin_Nataly') {
            return { success: false, error: 'Нельзя удалить главного администратора' };
        }
        
        const users = this.getUsers();
        if (!users[login]) {
            return { success: false, error: 'Пользователь не найден' };
        }
        
        delete users[login];
        this.saveUsers(users);
        return { success: true, message: 'Пользователь удален' };
    }

    // Обновление пароля пользователя
    updatePassword(login, oldPassword, newPassword) {
        const users = this.getUsers();
        const user = users[login];
        
        if (!user) {
            return { success: false, error: 'Пользователь не найден' };
        }
        
        // Проверка старого пароля
        const oldHash = this.hashPassword(oldPassword, user.salt);
        if (oldHash !== user.hash) {
            return { success: false, error: 'Неверный текущий пароль' };
        }
        
        // Установка нового пароля
        const newSalt = this.generateSalt();
        const newHash = this.hashPassword(newPassword, newSalt);
        
        user.salt = newSalt;
        user.hash = newHash;
        
        this.saveUsers(users);
        return { success: true, message: 'Пароль успешно изменен' };
    }

    // Генерация ссылки с ключом авторизации
    generateAuthUrl(baseUrl) {
        const user = this.getCurrentUser();
        if (!user) return baseUrl;
        
        const separator = baseUrl.includes('?') ? '&' : '?';
        const sessionKey = this.generateSessionKey(user.login);
        
        return `${baseUrl}${separator}key=true&auth_token=${sessionKey}`;
    }
}

// Создание глобальный экземпляр
window.authSystem = new AuthSystem();