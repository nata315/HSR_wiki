// Текущая активная страница
let currentPage = 'login';
let currentCommentSection = null;

// Шаблоны контента для каждой страницы
const contentTemplates = {
    news: `
        <div class="content-header">
            <h2>Добавление новости</h2>
            <button class="btn-show-list" onclick="toggleModal('newsModal')">Показать список записей</button>
        </div>
        <!-- Форма для добавления новости -->
        <div class="card-form">
            <div class="form-row">
                <label>Заголовок:</label><input type="text">
            </div>
            <div class="form-row">
                <label>Описание:</label>
                <textarea rows="5"></textarea>
            </div>
            <div class="form-row">
                <label>Дата:</label><input type="date">
            </div>
            <div class="form-row">
                <label>Ссылка изображения:</label><input type="url">
            </div>
            <button class="btn-save-add">Сохранить</button>
        </div>
    `,
    characters: `
        <div class="content-header">
            <h2>Добавление персонажа</h2>
            <button class="btn-show-list" onclick="toggleModal('charactersModal')">Показать список записей</button>
        </div>
        <div class="card-form">
            <div class="form-row">
                <label>Имя:</label><input type="text">
            </div>
            <div class="form-row">
                <label>Описание:</label>
                <textarea rows="4"></textarea>
            </div>
            <div class="form-row">
                <label>Оружие:</label><input type="text">
            </div>
            <div class="form-row">
                <label>Ссылка изображения:</label><input type="url">
            </div>
            <button class="btn-save-add">Добавить</button>
        </div>
    `,
    teams: `
        <div class="content-header">
            <h2>Добавление отряда</h2>
            <button class="btn-show-list" onclick="toggleModal('teamsModal')">Показать список записей</button>
        </div>
        <div class="card-form">
            <div class="form-row">
                <label>Изображение 1:</label>
                <input type="url">
            </div>
            <div class="form-row">
                <label>Изображение 2:</label>
                <input type="url">
            </div>
            <div class="form-row">
                <label>Изображение 3:</label>
                <input type="url">
            </div>
            <div class="form-row">
                <label>Описание:</label>
                <textarea rows="4"></textarea>
            </div>
            <button class="btn-save-add">Добавить</button>
        </div>
    `,
    planets: `
        <div class="content-header">
            <h2>Добавление планеты</h2>
            <button class="btn-show-list" onclick="toggleModal('planetsModal')">Показать список записей</button>
        </div>
        <div class="card-form">
            <div class="form-row">
                <label>Название:</label>
                <input type="text">
            </div>
            <div class="form-row">
                <label>Фото:</label>
                <input type="url">
            </div>
            <div class="form-row">
                <label>Описание:</label>
                <textarea rows="4"></textarea>
            </div>
            <button class="btn-save-add">Добавить</button>
        </div>
    `
};

// Функция переключения страниц
function showPage(pageName) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    const adminContainer = document.getElementById('adminContainer');
    const contentArea = document.getElementById('contentArea');
    
    if (['news', 'characters', 'teams', 'planets'].includes(pageName)) {
        // Показываем основной контейнер с меню
        adminContainer.style.display = 'flex';
        
        // Загружаем соответствующий контент
        if (contentTemplates[pageName]) {
            contentArea.innerHTML = contentTemplates[pageName];
        }
        
        // Обновляем активную кнопку меню
        updateActiveMenu(pageName);
        
        // Показываем шапку пользователя
        const userBadge = document.getElementById('userBadge');
        const exitButton = document.getElementById('exitButton');
        userBadge.style.display = 'flex';
        exitButton.style.display = 'block';
    } else if (pageName === 'login') {
        // Скрываем основной контейнер
        adminContainer.style.display = 'none';
        
        // Скрываем шапку пользователя
        const userBadge = document.getElementById('userBadge');
        const exitButton = document.getElementById('exitButton');
        userBadge.style.display = 'none';
        exitButton.style.display = 'none';
        
        // Показываем страницу логина
        document.getElementById('loginPage').classList.add('active');
    } else if (pageName === 'welcome') {
        // Скрываем основной контейнер
        adminContainer.style.display = 'none';
        
        // Показываем страницу приветствия
        document.getElementById('welcomePage').classList.add('active');
    } else {
        // Для страниц редактирования
        document.getElementById(pageName + 'Page').classList.add('active');
    }
    
    currentPage = pageName;
    hideAllModals();
}

// Обновление активного пункта меню
function updateActiveMenu(pageName) {
    document.querySelectorAll('.sidebar-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelectorAll('.sidebar-btn').forEach(btn => {
        if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(pageName)) {
            btn.classList.add('active');
        }
    });
}

// Переключение видимости пароля
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeOpen = document.querySelector('.eye-open');
    const eyeClosed = document.querySelector('.eye-closed');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeOpen.style.display = 'none';
        eyeClosed.style.display = 'block';
    } else {
        passwordInput.type = 'password';
        eyeOpen.style.display = 'block';
        eyeClosed.style.display = 'none';
    }
}

// Показать/скрыть модальное окно
function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.toggle('hidden');
}

// Показать комментарии
function toggleComments(commentId) {
    const comments = document.getElementById(commentId);
    if (currentCommentSection && currentCommentSection !== commentId) {
        const prevComments = document.getElementById(currentCommentSection);
        if (prevComments) prevComments.classList.add('hidden');
    }
    comments.classList.toggle('hidden');
    currentCommentSection = comments.classList.contains('hidden') ? null : commentId;
}

// Подтверждение удаления
function showDeleteConfirm() {
    document.getElementById('deleteConfirmModal').classList.remove('hidden');
}

function hideDeleteConfirm() {
    document.getElementById('deleteConfirmModal').classList.add('hidden');
}

function confirmDelete() {
    alert('Удалено!');
    hideDeleteConfirm();
}

// Скрыть все модальные окна
function hideAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.classList.add('hidden');
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    showPage('login');
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                overlay.classList.add('hidden');
            }
        });
    });
});
