// Для выпадающих списков 
function toggleMenu() {
    const menu = document.getElementById('dropdownMenu');
    menu.classList.toggle('show');
}
function togglePlanet() {
    const menu = document.getElementById('dropdownPlanet');
    menu.classList.toggle('show');
}


// при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('menuButton').addEventListener('click', toggleMenu);
    document.getElementById('Planet').addEventListener('click', togglePlanet);
});



