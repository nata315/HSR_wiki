// Текущий активный раздел (без суффикса)
let currentSection = 'hertaStation';

// Переменные для таймера
let menuTimer = null;

// Функция для закрытия основного бокового меню
function closeMenu() {
    const menu = document.getElementById('dropdownMenu');
    menu.classList.remove('show');
    if (menuTimer) {
        clearTimeout(menuTimer);
        menuTimer = null;
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

// Функция переключения разделов
function switchSection(direction) {
    // Скрываем текущий раздел
    document.getElementById(currentSection + 'Section').style.display = 'none';

    // Определяем новый раздел
    if (direction === 'prev') {
        if (currentSection === 'yariloVI') currentSection = 'hertaStation';
        else if (currentSection === 'luofu') currentSection = 'yariloVI';
        else if (currentSection === 'penacony') currentSection = 'luofu';
        else if (currentSection === 'amphoreus') currentSection = 'penacony';
    } else if (direction === 'next') {
        if (currentSection === 'hertaStation') currentSection = 'yariloVI';
        else if (currentSection === 'yariloVI') currentSection = 'luofu';
        else if (currentSection === 'luofu') currentSection = 'penacony';
        else if (currentSection === 'penacony') currentSection = 'amphoreus';
    }

    // Показываем новый раздел
    document.getElementById(currentSection + 'Section').style.display = 'block';

    // Обновляем заголовок
    const titleMap = {
        'hertaStation': 'Космическая станция "Герта"',
        'yariloVI': 'Ярило-VI',
        'luofu': 'Лофу Сяньчжоу',
        'penacony': 'Пенакония',
        'amphoreus': 'Амфореус'
    };
    document.getElementById('sectionTitle').textContent = titleMap[currentSection];
    // добавить функцию , которая читает заголовки на русском и айди( но из айди надо убирать что это айди только нахвание на анг )
    // и эта функция добавляет в этом список новый раздел 
    // скорее всего надо вынести список в глобал 
////// и изменить чтобы данные считывали описание из json 
    // и всю инфу брали оттуда 
    // грубо говоря нужно изменить на то , чтобы тут был шаблон который бегает по списку из json и переключает стр 
    // плюс не забываем что у нас внизу функция отпрделения параметров в ссылке и нужно попадать по конкретной планете 

    // отсюда вылезает пробема синхронизации с главной , там тоже в менюшке должен быть корректный список планет 
    // при заполнении списка можно опираться на названия как тут исопльзуется с Section или без , 
    // крч разберись где какие имена и что будет проще приписать или убрать слово . 


    // Обновляем видимость стрелок
    updateArrowsVisibility();
}

// Функция обновления видимости стрелок
function updateArrowsVisibility() {
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');

    if (currentSection === 'hertaStation') {
        prevButton.style.visibility = 'hidden';
    } else {
        prevButton.style.visibility = 'visible';
    }

    if (currentSection === 'amphoreus') {
        nextButton.style.visibility = 'hidden';
    } else {
        nextButton.style.visibility = 'visible';
    }
}


// Функция открытия контактов
function openContacts() {
    alert('Контакты: example@email.com');
}



// Инициализация
document.addEventListener('DOMContentLoaded', function () {
    // Показываем первую секцию
    const blockToShow = getUrlParam('currentSection');
    console.log(blockToShow);
    if (blockToShow!=""){
        document.getElementById(blockToShow+'Section').style.display = 'block';
        currentSection = blockToShow;
        const titleMap = {
            'hertaStation': 'Космическая станция "Герта"',
            'yariloVI': 'Ярило-VI',
            'luofu': 'Лофу Сяньчжоу',
            'penacony': 'Пенакония',
            'amphoreus': 'Амфореус'
        };
        document.getElementById('sectionTitle').textContent = titleMap[currentSection];
    }
    else{
        document.getElementById('hertaStationSection').style.display = 'block';
        currentSection = 'hertaStation';
    }
    
    updateArrowsVisibility();

    // Кнопка - Вернуться на предыдущую
    document.getElementById('prevButton').addEventListener('click', function () {
        switchSection('prev');
    });

    // Кнопка - Перейти на следующую
    document.getElementById('nextButton').addEventListener('click', function () {
        switchSection('next');
    });

    // Кнопка - Выпадающего меню
    const menuButton = document.getElementById('menuButton');
    const dropdownMenu = document.getElementById('dropdownMenu');
    
    menuButton.addEventListener('click', toggleMenu);
    
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

    // Закрытие меню при клике на пункт меню
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            closeMenu();
        });
    });
    
    // Закрытие меню при клике вне его области
    document.addEventListener('click', (event) => {
        const menuButtonEl = document.getElementById('menuButton');
        
        if (!dropdownMenu.contains(event.target) && !menuButtonEl.contains(event.target)) {
            closeMenu();
        }
    });
});

function getUrlParam(paramName) {
    return new URLSearchParams(window.location.search).get(paramName);
}