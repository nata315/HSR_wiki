// Текущий активный раздел
let currentSection = 'news';

// Функция переключения разделов
function switchSection(direction) {
    // Скрываем текущий раздел
    document.getElementById(currentSection + 'Section').style.display = 'none';
    
    // Определяем новый раздел
    if (direction === 'prev') {
        if (currentSection === 'modes') currentSection = 'news';
        else if (currentSection === 'squads') currentSection = 'modes';
    } else if (direction === 'next') {
        if (currentSection === 'news') currentSection = 'modes';
        else if (currentSection === 'modes') currentSection = 'squads';
    }
    
    // Показываем новый раздел
    document.getElementById(currentSection + 'Section').style.display = 'block';
    
    // Обновляем заголовок
    document.getElementById('sectionTitle').textContent = 
        currentSection === 'news' ? 'Новости' :
        currentSection === 'modes' ? 'Режимы' : 'Отряды';
    
    // Обновляем видимость стрелок
    updateArrowsVisibility();
}

// Функция обновления видимости стрелок
function updateArrowsVisibility() {
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    
    // Левая стрелка скрыта на первом разделе
    if (currentSection === 'news') {
        prevButton.style.visibility = 'hidden';
    } else {
        prevButton.style.visibility = 'visible';
    }
    
    // Правая стрелка скрыта на последнем разделе (Отряды)
    if (currentSection === 'squads') {
        nextButton.style.visibility = 'hidden';
    } else {
        nextButton.style.visibility = 'visible';
    }
}


// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {

    const blockToShow = getUrlParam('type');
    console.log(blockToShow);
    if (blockToShow!="" || !blockToShow){
        document.getElementById(blockToShow+'Section').style.display = 'block';
        currentSection = blockToShow;
        document.getElementById('sectionTitle').textContent = 
        currentSection === 'news' ? 'Новости' :
        currentSection === 'modes' ? 'Режимы' : 'Отряды';
    }
    else{
        document.getElementById('newsSection').style.display = 'block';
        currentSection = 'news';
    }

    // Назначаем обработчики событий
    document.getElementById('prevButton').onclick = function() { switchSection('prev'); };
    document.getElementById('nextButton').onclick = function() { switchSection('next'); };
    
    // Инициализируем видимость стрелок
    updateArrowsVisibility();
});

function getUrlParam(paramName) {
    return new URLSearchParams(window.location.search).get(paramName);
}  
  