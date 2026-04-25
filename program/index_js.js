// Переменные для таймера
let menuTimer = null;
let planetTimer = null;

// Функция для закрытия основного бокового меню
function closeMenu() {
    const menu = document.getElementById('dropdownMenu');
    menu.classList.remove('show');
    if (menuTimer) {
        clearTimeout(menuTimer);
        menuTimer = null;
    }
}

// Аналогичная функция закрытия для меню с планетами
function closePlanet() {
    const menu = document.getElementById('dropdownPlanet');
    menu.classList.remove('show');
    if (planetTimer) {
        clearTimeout(planetTimer);
        planetTimer = null;
    }
}

// Функция для запуска таймера, что отвечает за закрытие основного бокового меню (таймер на три секунды)
function startMenuCloseTimer() {
    if (menuTimer) {
        clearTimeout(menuTimer);
    }
    menuTimer = setTimeout(() => {
        closeMenu();
    }, 3000);
}

// Аналогичная функция с запуском таймера для меню с планетами
function startPlanetCloseTimer() {
    if (planetTimer) {
        clearTimeout(planetTimer);
    }
    planetTimer = setTimeout(() => {
        closePlanet();
    }, 3000);
}

// Функция для открытия/закрытия главного меню
function toggleMenu() {
    const menu = document.getElementById('dropdownMenu');
    const isOpen = menu.classList.contains('show');
    
    if (isOpen) {
        // Если меню открыто, то оно закрывается
        closeMenu();
    } else {
        // Иначе если меню закрыто - открываем
        menu.classList.add('show');
        // Запуск таймера на закрытие
        startMenuCloseTimer();
    }
}

// Аналогичная функция открытия/закрытия для меню с планетами
function togglePlanet() {
    const menu = document.getElementById('dropdownPlanet');
    const isOpen = menu.classList.contains('show');
    
    if (isOpen) {
        closePlanet();
    } else {
        menu.classList.add('show');
        startPlanetCloseTimer();
    }
}

// При загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('menuButton').addEventListener('click', toggleMenu);
    document.getElementById('Planet').addEventListener('click', togglePlanet);
});

    const menuButton = document.getElementById('menuButton');
    const planetButton = document.getElementById('Planet');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const dropdownPlanet = document.getElementById('dropdownPlanet');
    
    // Обработчики событий для кнопок
    menuButton.addEventListener('click', toggleMenu);
    planetButton.addEventListener('click', togglePlanet);
    
    // При наведении на меню и его элементы - меню не закроется
    dropdownMenu.addEventListener('mouseenter', () => {
        if (menuTimer) {
            clearTimeout(menuTimer);
            menuTimer = null;
        }
    });
    
    // Когда мышь уходит с меню или ее элементов - таймер запускается вновь, но при условии, что меню открыто
    dropdownMenu.addEventListener('mouseleave', () => {
        if (dropdownMenu.classList.contains('show')) {
            startMenuCloseTimer();
        }
    });
    
    // Аналогично для меню с планетами
    dropdownPlanet.addEventListener('mouseenter', () => {
        if (planetTimer) {
            clearTimeout(planetTimer);
            planetTimer = null;
        }
    });
    
    dropdownPlanet.addEventListener('mouseleave', () => {
        if (dropdownPlanet.classList.contains('show')) {
            startPlanetCloseTimer();
        }
    });
    
    // Закрытие меню при клике на пункт меню
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            closeMenu();
            closePlanet();
        });
    });
    
    // Закрытие меню при клике вне его области
    document.addEventListener('click', (event) => {
        const menuButtonEl = document.getElementById('menuButton');
        const planetButtonEl = document.getElementById('Planet');
        
        if (!dropdownMenu.contains(event.target) && !menuButtonEl.contains(event.target)) {
            closeMenu();
        }
        
        if (!dropdownPlanet.contains(event.target) && !planetButtonEl.contains(event.target)) {
            closePlanet();
        }
    });



