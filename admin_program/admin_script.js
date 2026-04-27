// Текущая страница и данные (имитация)
let currentPage = "login";
let currentAdminName = "Admin";
let currentItemForDelete = null;

const mockComments = [
  { id: 1, date: '2024-03-10', author: 'User1', text: 'Комментарий 1' },
  { id: 2, date: '2024-03-11', author: 'User2', text: 'Комментарий 2' },
];


// ========== ШАБЛОНЫ КОНТЕНТА ДЛЯ РАЗДЕЛОВ ==========
const contentTemplates = {
  news: `
    <div class="content-header">
      <h2>Добавление новости</h2>
      <button class="btn-show-list" data-list="news">Показать список записей</button>
    </div>
    <form action="server/news_save.php" method="POST" enctype="multipart/form-data" class="admin-form" id="form-news">
      <div class="form-row">
        <label for="news-id">ID:</label>
        <input name="id_news" type="text" id="news-id" placeholder="newsName_news">
      </div>
      <div class="form-row">
        <label for="news-title">Заголовок:</label>
        <input name="title_news" type="text" id="news-title" placeholder="название на русском">
      </div>
      <div class="form-row">
        <label for="news-desc">Описание:</label>
        <textarea name="description_news" id="news-desc" rows="5"></textarea>
      </div>
      <div class="form-row">
        <label for="news-date">Дата:</label>
        <input name="date_news" type="date" id="news-date" placeholder="ГГГГ-ДД-ММ">
      </div>
      <div class="form-row">
        <label for="news-photo">Фото:</label>
        <input type="text" id="news-photo" placeholder="ссылка на изображение">
        <input name="image_news" id="news-photo" type="file" accept="image/*" placeholder="прикрепите изображение"> 
      </div>

      <div class="form-actions">
        <button type="submit" class="btn-add">Добавить</button>
        <button type="reset" class="btn-clear">Очистить</button>
      </div>
    </form>
  `,

  characters: `
    <div class="content-header">
      <h2>Добавление персонажа</h2>
      <button class="btn-show-list" data-list="characters">Показать список записей</button>
    </div>
    <form action="server/cards_save.php" method="POST" enctype="multipart/form-data" class="admin-form" id="form-character" >
      <div class="form-row">
        <label for="char-id">ID:</label>
        <input name="id_card" type="text" id="char-id" placeholder="charterName_card">
      </div>
      <div class="form-row">
        <label for="char-name">Имя:</label>
        <input name="name_card" type="text" id="char-name" placeholder="Имя на русском">
      </div>
      <div class="form-row">
        <label for="char-desc">Описание:</label>
        <textarea name="description_card" id="char-desc" rows="4"></textarea>
      </div>
      <div class="form-row">
        <label for="char-photo">Фото:</label>
        <input type="text" id="char-photo" placeholder="ссылка на изображение">
        <input name="image_card" id="char-photo" type="file" accept="image/*" required> 
 
      </div>
      <div class="form-actions">
        <button type="submit" class="btn-add">Добавить</button>
        <button type="reset" class="btn-clear">Очистить</button>
      </div>
    </form>
  `,

  teams: `
    <div class="content-header">
      <h2>Добавление отряда</h2>
      <button class="btn-show-list" data-list="teams">Показать список записей</button>
    </div>
    <form action="server/teams_save.php" method="POST" enctype="multipart/form-data" class="admin-form" id="form-team">
      <div class="form-row">
        <label for="team-id">ID:</label>
        <input name="id_team" type="text" id="team-id" placeholder="teamName_id" >
      </div>
      <div class="form-row">
        <label for="team-name">Название:</label>
        <input name="name_team" type="text" id="team-name" placeholder="название отряда">
      </div>
      <div class="photo-grid">
        <div class="form-row">
          <label for="team-photo1">Фото 1:</label>
          <input type="text" id="team-photo1" placeholder="ссылка на изображение">
          <input name="team_image1" id="char-photo" type="file" accept="image/*"> 
        </div>
        <div class="form-row">
          <label for="team-photo2">Фото 2:</label>
          <input type="text" id="team-photo2" placeholder="ссылка на изображение">
          <input name="team_image2" id="char-photo" type="file" accept="image/*"> 
        </div>
        <div class="form-row">
          <label for="team-photo3">Фото 3:</label>
          <input type="text" id="team-photo3" placeholder="ссылка на изображение">
          <input name="team_image3" id="char-photo" type="file" accept="image/*"> 
        </div>
        <div class="form-row">
          <label for="team-photo4">Фото 4:</label>
          <input type="text" id="team-photo4" placeholder="ссылка на изображение">
          <input name="team_image4" id="char-photo" type="file" accept="image/*"> 
        </div>
      </div>
      <div class="form-row">
        <label for="team-desc">Описание:</label>
        <textarea name="description_team" id="team-desc" rows="5" ></textarea>
      </div>
      <div class="form-actions">
        <button type="submit" class="btn-add">Добавить</button>
        <button type="reset" class="btn-clear">Очистить</button>
      </div>
    </form>
  `,

  planets: `
    <div class="content-header">
      <h2>Добавление планеты</h2>
      <button class="btn-show-list" data-list="planets">Показать список записей</button>
    </div>
    <form action="server/planets_save.php" method="POST" enctype="multipart/form-data" class="admin-form" id="form-planet">
      <div class="form-row">
        <label for="planet-id">ID:</label>
        <input name="planet_id" type="text" id="planet-id" placeholder="planetName_id">
      </div>
      <div class="form-row">
        <label for="planet-name">Название:</label>
        <input name="planet_name" type="text" id="planet-name" placeholder="имя на русском">
      </div>
      <div class="form-row">
        <label for="planet-photo">Фото:</label>
        <input type="text" id="planet-photo" placeholder="ссылка на изображение" >
        <input name="planet_image" id="planet-photo" type="file" accept="image/*"> 
      </div>
      <div class="form-row">
        <label for="planet-desc">Описание:</label>
        <textarea name="planet_description" id="planet-desc" rows="5"></textarea>
      </div>
      <div class="form-actions">
        <button type="submit" class="btn-add">Добавить</button>
        <button type="reset" class="btn-clear">Очистить</button>
      </div>
    </form>
  `,
};

// ========== ШАБЛОНЫ ДЛЯ РЕДАКТИРОВАНИЯ ==========
const editTemplates = {
  news: `
    <div class="content-header">
      <h2>Редактирование новости</h2>
      <button class="btn-show-list" data-list="news">Показать список записей</button>
    </div>
    <form class="admin-form" id="edit-news-form">
      <div class="form-row">
        <label for="edit-news-title">Заголовок:</label>
        <input type="text" id="edit-news-title" value="Заголовок редактируемой новости">
      </div>
      <div class="form-row">
        <label for="edit-news-desc">Описание:</label>
        <textarea id="edit-news-desc" rows="5">Текст редактируемой новости</textarea>
      </div>
      <div class="form-row">
        <label for="edit-news-date">Дата:</label>
        <input type="date" id="edit-news-date" value="2024-03-11">
      </div>
      <div class="form-row">
        <label for="edit-news-photo">Фото:</label>
        <input type="url" id="edit-news-photo" value="https://example.com/news.jpg">
      </div>
      <div class="form-actions">
        <button type="submit" class="btn-save">Сохранить</button>
        <button type="button" class="btn-delete" data-delete-item>Удалить</button>
      </div>
    </form>
  `,

  character: `
    <div class="content-header">
      <h2>Редактирование персонажа</h2>
      <button class="btn-show-list" data-list="characters">Показать список записей</button>
    </div>
    <form class="admin-form" id="edit-character-form">
      <div class="form-row">
        <label for="edit-char-id">ID:</label>
        <input type="text" id="edit-char-id" value="char_001">
      </div>
      <div class="form-row">
        <label for="edit-char-name">Имя:</label>
        <input type="text" id="edit-char-name" value="Имя персонажа">
      </div>
      <div class="form-row">
        <label for="edit-char-desc">Описание:</label>
        <textarea id="edit-char-desc" rows="4">Описание персонажа</textarea>
      </div>
      <div class="form-row">
        <label for="edit-char-weapon">Оружие/Артефакты:</label>
        <input type="text" id="edit-char-weapon" value="Световой меч">
      </div>
      <div class="form-row">
        <label for="edit-char-photo">Фото:</label>
        <input type="url" id="edit-char-photo" value="https://example.com/char.jpg">
      </div>
      <div class="form-actions">
        <button type="submit" class="btn-save">Сохранить</button>
        <button type="button" class="btn-delete" data-delete-item>Удалить</button>
      </div>
    </form>
  `,

  team: `
    <div class="content-header">
      <h2>Редактирование отряда</h2>
      <button class="btn-show-list" data-list="teams">Показать список записей</button>
    </div>
    <form class="admin-form" id="edit-team-form">
      <div class="form-row">
        <label for="edit-team-id">ID:</label>
        <input type="text" id="edit-team-id" value="team_001">
      </div>
      <div class="form-row">
        <label for="edit-team-name">Название:</label>
        <input type="text" id="edit-team-name" value="Название отряда">
      </div>
      <div class="photo-grid">
        <div class="form-row">
          <label for="edit-team-photo1">Фото 1:</label>
          <input type="url" id="edit-team-photo1" value="https://example.com/team1.jpg">
        </div>
        <div class="form-row">
          <label for="edit-team-photo2">Фото 2:</label>
          <input type="url" id="edit-team-photo2" value="https://example.com/team2.jpg">
        </div>
        <div class="form-row">
          <label for="edit-team-photo3">Фото 3:</label>
          <input type="url" id="edit-team-photo3" value="https://example.com/team3.jpg">
        </div>
        <div class="form-row">
          <label for="edit-team-photo4">Фото 4:</label>
          <input type="url" id="edit-team-photo4" value="https://example.com/team4.jpg">
        </div>
      </div>
      <div class="form-row">
        <label for="edit-team-desc">Описание:</label>
        <textarea id="edit-team-desc" rows="5">Описание отряда</textarea>
      </div>
      <div class="form-actions">
        <button type="submit" class="btn-save">Сохранить</button>
        <button type="button" class="btn-delete" data-delete-item>Удалить</button>
      </div>
    </form>
  `,

  planet: `
    <div class="content-header">
      <h2>Редактирование планеты</h2>
      <button class="btn-show-list" data-list="planets">Показать список записей</button>
    </div>
    <form class="admin-form" id="edit-planet-form">
      <div class="form-row">
        <label for="edit-planet-id">ID:</label>
        <input type="text" id="edit-planet-id" value="planet_001">
      </div>
      <div class="form-row">
        <label for="edit-planet-name">Название:</label>
        <input type="text" id="edit-planet-name" value="Название планеты">
      </div>
      <div class="form-row">
        <label for="edit-planet-photo">Фото:</label>
        <input type="url" id="edit-planet-photo" value="https://example.com/planet.jpg">
      </div>
      <div class="form-row">
        <label for="edit-planet-desc">Описание:</label>
        <textarea id="edit-planet-desc" rows="5">Описание планеты</textarea>
      </div>
      <div class="form-actions">
        <button type="submit" class="btn-save">Сохранить</button>
        <button type="button" class="btn-delete" data-delete-item>Удалить</button>
      </div>
    </form>
  `,
};

// ========== ОСНОВНЫЕ ФУНКЦИИ ==========

// Переключение страниц
function showPage(pageName) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  const adminContainer = document.getElementById("adminContainer");
  const userBadge = document.getElementById("userBadge");
  const exitButton = document.getElementById("exitButton");

  if (["news", "characters", "teams", "planets"].includes(pageName)) {
    adminContainer.classList.remove("hidden");
    document.getElementById("contentArea").innerHTML = contentTemplates[pageName];
    updateActiveMenu(pageName);
    userBadge.classList.remove("hidden");
    exitButton.classList.remove("hidden");
    
    document.getElementById("adminNameDisplay").textContent = currentAdminName;
    
    attachContentHandlers(pageName);
  } else if (pageName === "login") {
    adminContainer.classList.add("hidden");
    userBadge.classList.add("hidden");
    exitButton.classList.add("hidden");
    document.getElementById("loginPage").classList.add("active");
    
    document.getElementById("login").value = "";
    document.getElementById("password").value = "";
  } else if (pageName === "welcome") {
    adminContainer.classList.add("hidden");
    userBadge.classList.add("hidden");
    exitButton.classList.add("hidden");
    document.getElementById("welcomePage").classList.add("active");
    document.getElementById("welcomeAdminName").textContent = currentAdminName;
  }

  currentPage = pageName;
  hideAllModals();
}

function updateActiveMenu(pageName) {
  document.querySelectorAll(".sidebar-btn").forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.page === pageName) {
      btn.classList.add("active");
    }
  });
}

function showRecordsModal(type) {
  const modal = document.getElementById("recordsModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("recordsModalBody");
  console.log('[MODAL] Открытие модального окна списка', { type });
  
  if (type === "news") {
    console.log('[MODAL] Загрузка список новостей');
    modalTitle.textContent = "Список старых новостей";
    generateNewsList(modalBody);
    modal.classList.remove("hidden");
    attachModalHandlers();
    console.log('[MODAL] Модальное окно новостей показано');
    return;

  } else if (type === "characters") {
    console.log('[MODAL] Загрузка список персонажей');
    modalTitle.textContent = "Список персонажей";
    generateCharactersList(modalBody);
    modal.classList.remove("hidden");
    attachModalHandlers();
    console.log('[MODAL] Модальное окно персонажей показано');
    return;

  } else if (type === "teams") {
    console.log('[MODAL] Загрузка список отрядов');
    modalTitle.textContent = "Список отрядов";
    generateTeamsList(modalBody);
    modal.classList.remove("hidden");
    attachModalHandlers();
    console.log('[MODAL] Модальное окно отрядов показано');
    return;

  } else if (type === "planets") {
    console.log('[MODAL] Загрузка список планет');
    modalTitle.textContent = "Список планет";
    generatePlanetsList(modalBody);
    modal.classList.remove("hidden");
    attachModalHandlers();
    console.log('[MODAL] Модальное окно планет показано');
    return;
  }
}

//список новостей
async function generateNewsList(modalBody) {
  const outputDiv = modalBody;
  console.log('[GENERATE] Загрузка списка новостей...');
  try {
      // Загружаем файл (предполагается, что data.json лежит рядом с index.html)
      const response = await fetch('server/resources/news.json');
      
      if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      
      // Парсим JSON
      const data = await response.json();
      console.log('[GENERATE] Новости загружены', { count: data.length, data });

      let html = '<div class="records-list">';

      data.forEach(item => {
        html += `
          <div class="record-item" data-id="${item.id}">
            <div class="record-info">
              <span class="record-date">${item.date}</span>
              <span class="record-title">${item.id}</span>
            </div>
            <div class="record-actions">
              <button class="icon-btn" data-action="edit-news" data-id="${item.id}" title="Редактировать">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
              </button>
              <button class="icon-btn" data-action="delete" data-id="${item.id}" data-type="news" title="Удалить">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
              </button>
            </div>
          </div>
        `;
      });
      
      html += '</div>';
      outputDiv.innerHTML = html;
      console.log('[GENERATE] Список новостей отрисован успешно', { itemsCount: data.length });
      
  } catch (error) {
      // Показываем ошибку, если файл не найден или JSON битый
      console.error('[GENERATE] Ошибка загрузки новостей', error);
      outputDiv.innerHTML = `<p class="error">Не удалось загрузить data.json: ${error.message}</p>`;
  }
}
//ответь смогу ли я через live server загрузить данные в json через php ?


/// генерация списка персонажей
//открытие и отображение списка персонажей в меню
async function generateCharactersList(modalBody) {
  const outputDiv = modalBody;
  
  try {
      // Загружаем файл (предполагается, что data.json лежит рядом с index.html)
      const response = await fetch('server/images.json');
      //проверка загрузки файла 
      //E:\учеба(5 сем)\Технология разработки веб-приложений\курсовая\HSR_wiki\admin_program\server\images.json
      console.log("Ответ сервера:", response);
      
      if (!response.ok) {
        console.error("Ошибка при загрузке данных:", response.status, response.statusText);
        throw new Error(`Ошибка HTTP: ${response.status}`);

      }
      
      // Парсим JSON
      const data = await response.json();
      console.log("Данные из JSON:", data);

      let html = '<div class="records-list">';

      data.forEach(char => {
        html += `
          <div class="record-item" data-id="${char.id}">
            <div class="record-info">
              <span class="record-title">${char.id}</span>
            </div>
            <div class="record-actions">
              <button class="icon-btn" data-action="comments" data-id="${char.id}" data-name="${char.name}" title="Комментарии">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M21 15h-7.5l-2.5 3-2.5-3h-5.5c-1.1 0-2-.9-2-2v-10c0-1.1.9-2 2-2h18c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2z"/>
                </svg>
              </button>
              <button class="icon-btn" data-action="edit-character" data-id="${char.id}" title="Редактировать">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
              </button>
              <button class="icon-btn" data-action="delete" data-id="${char.id}" data-type="character" title="Удалить">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
              </button>
            </div>
          </div>
        `;

      });
      
      html += '</div>';
      outputDiv.innerHTML = html;
      console.log("данные успешно загружены и отображены");
      
  } catch (error) {
      // Показываем ошибку, если файл не найден или JSON битый
      console.log("Ответ сервера:", error);
      console.error("Ошибка при загрузке данных:", error);
      outputDiv.innerHTML = `<p class="error">Не удалось загрузить data.json: ${error.message}</p>`;
  }
}

async function generateTeamsList(modalBody) {
  const outputDiv = modalBody;
  
  try {
      // Загружаем файл (предполагается, что data.json лежит рядом с index.html)
      const response = await fetch('server/resources/teams.json');
      
      if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      
      // Парсим JSON
      const data = await response.json();

      let html = '<div class="records-list">';

      data.forEach(item => {
        html += `
          <div class="record-item" data-id="${item.id}">
            <div class="record-info">
              <span class="record-title">${item.id}</span>
            </div>
            <div class="record-actions">
              <button class="icon-btn" data-action="edit-news" data-id="${item.id}" title="Редактировать">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
              </button>
              <button class="icon-btn" data-action="delete" data-id="${item.id}" data-type="team" title="Удалить">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
              </button>
            </div>
          </div>
        `;
      });
      
      html += '</div>';
      outputDiv.innerHTML = html;
      
  } catch (error) {
      // Показываем ошибку, если файл не найден или JSON битый
      outputDiv.innerHTML = `<p class="error">Не удалось загрузить data.json: ${error.message}</p>`;
  }
}

async function generatePlanetsList(modalBody) {
  const outputDiv = modalBody;
  
  try {
      // Загружаем файл (предполагается, что data.json лежит рядом с index.html)
      const response = await fetch('server/resources/planets.json');
      
      if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      // Парсим JSON
      const data = await response.json();

      let html = '<div class="records-list">';

      data.forEach(item => {
        html += `
          <div class="record-item" data-id="${item.id}">
            <div class="record-info">
              <span class="record-title">${item.id}</span>
            </div>
            <div class="record-actions">
              <button class="icon-btn" data-action="edit-news" data-id="${item.id}" title="Редактировать">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
              </button>
              <button class="icon-btn" data-action="delete" data-id="${item.id}" data-type="planet" title="Удалить">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
              </button>
            </div>
          </div>
        `;
      });
      
      html += '</div>';
      outputDiv.innerHTML = html;
      
  } catch (error) {
      // Показываем ошибку, если файл не найден или JSON битый
      outputDiv.innerHTML = `<p class="error">Не удалось загрузить data.json: ${error.message}</p>`;
  }
}

function showCommentsModal(characterId, characterName) {
  const modal = document.getElementById("commentsModal");
  const modalTitle = document.getElementById("commentsModalTitle");
  const modalBody = document.getElementById("commentsModalBody");
  
  modalTitle.textContent = `Комментарии к персонажу: ${characterName}`;
  
  let commentsHtml = '<div class="comments-list">';
  
  mockComments.forEach(comment => {
    commentsHtml += `
      <div class="comment-item" data-id="${comment.id}">
        <div class="comment-header">
          <span class="comment-date">${comment.date}</span>
          <span class="comment-author">${comment.author}</span>
        </div>
        <div class="comment-text">${comment.text}</div>
        <div class="comment-delete">
          <button class="icon-btn" data-action="delete-comment" data-id="${comment.id}" title="Удалить комментарий">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>
          </button>
        </div>
      </div>
    `;
  });
  
  commentsHtml += '</div>';
  modalBody.innerHTML = commentsHtml;
  modal.classList.remove("hidden");
  
  attachCommentHandlers();
}

function showEditForm(type, id) {
  const contentArea = document.getElementById("contentArea");
  
  if (type === "news") {
    contentArea.innerHTML = editTemplates.news;
  } else if (type === "character") {
    contentArea.innerHTML = editTemplates.character;
  } else if (type === "team") {
    contentArea.innerHTML = editTemplates.team;
  } else if (type === "planet") {
    contentArea.innerHTML = editTemplates.planet;
  }
  
  attachEditFormHandlers(type);
}

function showDeleteConfirm(item) {
  currentItemForDelete = item;
  console.log('[DELETE] Модальное окно подтверждения открыто', item);
  document.getElementById("deleteConfirmModal").classList.remove("hidden");
}

function hideAllModals() {
  document.querySelectorAll(".modal-overlay").forEach((modal) => {
    modal.classList.add("hidden");
  });
  if (currentItemForDelete) {
    console.log('[DELETE] Модальные окна закрыты, данные очищены', currentItemForDelete);
  }
  currentItemForDelete = null;
}

// ========== ОБРАБОТЧИКИ ==========

function attachContentHandlers(pageName) {
  console.log('[CONTENT] Добавление обработчиков для страницы', pageName);
  const showListBtn = document.querySelector(".btn-show-list");
  if (showListBtn) {
    console.log('[CONTENT] Кнопка показа список найдена', pageName);
    showListBtn.addEventListener("click", () => {
      console.log('[CONTENT] Кнопка показа список нажата', pageName);
      showRecordsModal(pageName);
    });
  } else {
    console.warn('[CONTENT] Кнопка показа список НЕ найдена', pageName);
  }
  
  const form = document.querySelector(".admin-form");
  if (form) {
    console.log('[CONTENT] Форма найдена', pageName);
    form.addEventListener("submit", (e) => {
      // Не блокируем стандартную отправку - позволяем форме отправиться на сервер
      console.log('[CONTENT] Форма отправляется на сервер', pageName);
      // Форма отправится с методом POST и action, указанными в HTML
    });
  } else {
    console.warn('[CONTENT] Форма НЕ найдена', pageName);
  }
}

function attachModalHandlers() {//обработчики для кнопок внутри модального окна со списком записей
  const recordsModalBody = document.getElementById("recordsModalBody");
  
  // Используем event delegation для работы с динамическими элементами
  recordsModalBody.addEventListener("click", (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    
    e.stopPropagation();
    const action = btn.dataset.action;
    const id = btn.dataset.id;
    
    console.log('[MODAL] Кнопка нажата', { action, id });
    
    if (action === "edit-news") {
      hideAllModals();
      showEditForm("news", id);
    } else if (action === "edit-character") {
      hideAllModals();
      showEditForm("character", id);
    } else if (action === "comments") {
      const name = btn.dataset.name;
      hideAllModals();
      showCommentsModal(id, name);
    } else if (action === "delete") {
      const type = btn.dataset.type;
      console.log('[DELETE] Кнопка удаления нажата', { id, type, time: new Date().toLocaleTimeString() });
      showDeleteConfirm({ id, type });
    }
  });

  document.getElementById("closeRecordsModal").addEventListener("click", () => {
    console.log('[MODAL] Закрытие модального окна записей');
    hideAllModals();
  });
}

function attachCommentHandlers() {
  document.querySelectorAll('[data-action="delete-comment"]').forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      showDeleteConfirm({ id, type: "comment" });
    });
  });
  
  document.getElementById("closeCommentsModal").addEventListener("click", () => {
    hideAllModals();
  });
}

function attachEditFormHandlers(type) {
  const deleteBtn = document.querySelector('[data-delete-item]');
  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      showDeleteConfirm({ type, action: "delete" });
    });
  }
  
  const showListBtn = document.querySelector(".btn-show-list");
  if (showListBtn) {
    showListBtn.addEventListener("click", () => {
      let listType = "news";
      if (type === "character") listType = "characters";
      else if (type === "team") listType = "teams";
      else if (type === "planet") listType = "planets";
      showRecordsModal(listType);
    });
  }
  
  const form = document.querySelector(".admin-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Изменения сохранены");
    });
  }
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener("DOMContentLoaded", () => {
  console.log('[INIT] Приложение инициализируется');
  showPage("login");
  console.log('[INIT] Добавление обработчиков событий');
  
  document.querySelectorAll(".sidebar-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const page = btn.dataset.page;
      console.log('[SIDEBAR] Нажата кнопка', page);
      showPage(page);
    });
  });
  
  document.querySelectorAll("[data-page]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const page = btn.dataset.page;
      console.log('[NAVIGATION] Переход на', page);
      showPage(page);
    });
  });
  
  document.getElementById("exitButton").addEventListener("click", () => {
    console.log('[EXIT] Выход из системы');
    showPage("login");
  });
  
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;
    console.log('[LOGIN] Попытка входа', { login, passwordLength: password.length });
    
    if (login && password.length >= 5) {
      currentAdminName = login;
      console.log('[LOGIN] Успешный вход', { admin: login });
      showPage("welcome");
    } else {
      console.warn('[LOGIN] Ошибка: пароль короче 5 символов');
      alert("Пароль должен быть не менее 5 символов");
    }
  });
  
  document.getElementById("togglePassword").addEventListener("click", () => {
    const passwordInput = document.getElementById("password");
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;
  });
  
  console.log('[INIT] Инициализация завершена успешно');
  
  document.getElementById("confirmDeleteBtn").addEventListener("click", async () => {
    if (!currentItemForDelete) return;
    const { id, type } = currentItemForDelete;
    console.log('[DELETE] Подтверждение удаления нажато', { id, type, time: new Date().toLocaleTimeString() });
    let url = '';
    if (type === 'news') url = 'server/news_save.php';
    else if (type === 'character') url = 'server/cards_save.php';
    else if (type === 'team') url = 'server/teams_save.php';
    else if (type === 'planet') url = 'server/planets_save.php';
    console.log('[DELETE] Отправка запроса на удаление', { url, id, type });
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `action=delete&id=${encodeURIComponent(id)}`
      });
      console.log('[DELETE] Ответ от сервера получен', { status: response.status });
      const result = await response.json();
      console.log('[DELETE] JSON ответ разобран', result);
      if (result.success) {
        console.log('[DELETE] Элемент успешно удален', { id, type });
        alert('Элемент удален');
      } else {
        console.warn('[DELETE] Ошибка при удалении', { id, type, message: result.message });
        alert('Ошибка удаления: ' + (result.message || 'Неизвестная ошибка'));
      }
    } catch (error) {
      console.error('[DELETE] Ошибка выполнения запроса', { id, type, error: error.message });
      alert('Ошибка: ' + error.message);
    }
    hideAllModals();
  });
  
  document.getElementById("cancelDeleteBtn").addEventListener("click", () => {
    console.log('[DELETE] Удаление отменено', currentItemForDelete);
    hideAllModals();
  });
  
  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.classList.add("hidden");
      }
    });
  });
  
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hideAllModals();
    }
  });
});