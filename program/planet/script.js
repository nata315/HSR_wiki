// через set? добавить обновление параметра в ссылке 



// Текущий активный раздел (без суффикса)
let currentSection = 'hertaStation';


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

// Функция выпадающего меню
function toggleMenu() {
    const menu = document.getElementById('dropdownMenu');
    menu.classList.toggle('show');
}
function openNews() { alert('Новости'); }
function openModes() { alert('Режимы'); }
function openSquads() { alert('Отряды'); }

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
    document.getElementById('menuButton').addEventListener('click', toggleMenu);

    // Добавляем обработчики для пунктов выпадающего меню
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems[0].addEventListener('click', openNews);
    menuItems[1].addEventListener('click', openModes);
    menuItems[2].addEventListener('click', openSquads);
});

function getUrlParam(paramName) {
    return new URLSearchParams(window.location.search).get(paramName);
}  
    



