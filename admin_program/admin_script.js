// Текущая страница и данные (имитация)
let currentPage = "login";
let currentAdminName = "Admin";
let currentItemForDelete = null;

// Данные для списков
const mockNews = [
  { id: 1, date: "2024-01-15", author: "Иван Петров", title: "Новая эра" },
  { id: 2, date: "2024-02-20", author: "Анна Смирнова", title: "Обновление вселенной" },
  { id: 3, date: "2024-03-10", author: "Петр Иванов", title: "Встреча с фанатами" },
];

const mockCharacters = [
  { id: 1, name: "Мандалорец" },
  { id: 2, name: "Грогу" },
  { id: 3, name: "Боба Фетт" },
  { id: 4, name: "Асока Тано" },
  { id: 5, name: "Дарт Вейдер" },
];

const mockComments = [
  { id: 1, date: "2024-03-11", author: "Фан_1", text: "Отличный персонаж! Очень харизматичный." },
  { id: 2, date: "2024-03-10", author: "Зритель_42", text: "А какое у него оружие? В описании не указано." },
  { id: 3, date: "2024-03-09", author: "Критик", text: "Слишком простоват для такого фильма. Ожидал большего. Очень длинный комментарий, который должен показать, что текст не обрезается и админ может его прочитать целиком. Вот такой вот длинный комментарий." },
];

// ========== ШАБЛОНЫ КОНТЕНТА ДЛЯ РАЗДЕЛОВ ==========
const contentTemplates = {
  news: `
    <div class="content-header">
      <h2>Добавление новости</h2>
      <button class="btn-show-list" data-list="news">Показать список записей</button>
    </div>
    <form class="admin-form" id="form-news">
      <div class="form-row">
        <label for="news-id">ID:</label>
        <input type="text" id="news-id">
      </div>
      <div class="form-row">
        <label for="news-title">Заголовок:</label>
        <input type="text" id="news-title">
      </div>
      <div class="form-row">
        <label for="news-desc">Описание:</label>
        <textarea id="news-desc" rows="5"></textarea>
      </div>
      <div class="form-row">
        <label for="news-date">Дата:</label>
        <input type="date" id="news-date">
      </div>
      <div class="form-row">
        <label for="news-photo">Фото:</label>
        <input type="url" id="news-photo">
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
    <form action="server/cards_save.php" method="POST" class="admin-form" id="form-character" >
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
        <input name="image_card" type="url" id="char-photo" placeholder="ссылка на изображение">
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
    <form class="admin-form" id="form-team">
      <div class="form-row">
        <label for="team-id">ID:</label>
        <input type="text" id="team-id">
      </div>
      <div class="photo-grid">
        <div class="form-row">
          <label for="team-photo1">Фото 1:</label>
          <input type="url" id="team-photo1">
        </div>
        <div class="form-row">
          <label for="team-photo2">Фото 2:</label>
          <input type="url" id="team-photo2">
        </div>
        <div class="form-row">
          <label for="team-photo3">Фото 3:</label>
          <input type="url" id="team-photo3">
        </div>
        <div class="form-row">
          <label for="team-photo4">Фото 4:</label>
          <input type="url" id="team-photo4">
        </div>
      </div>
      <div class="form-row">
        <label for="team-desc">Описание:</label>
        <textarea id="team-desc" rows="5"></textarea>
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
    <form class="admin-form" id="form-planet">
      <div class="form-row">
        <label for="planet-id">ID:</label>
        <input type="text" id="planet-id">
      </div>
      <div class="form-row">
        <label for="planet-name">Название:</label>
        <input type="text" id="planet-name">
      </div>
      <div class="form-row">
        <label for="planet-photo">Фото:</label>
        <input type="url" id="planet-photo">
      </div>
      <div class="form-row">
        <label for="planet-desc">Описание:</label>
        <textarea id="planet-desc" rows="5"></textarea>
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
  
  let title = "";
  let content = "";
  
  if (type === "news") {
    title = "Список старых новостей";
    content = generateNewsList();
  } else if (type === "characters") {
    title = "Список персонажей";
    content = generateCharactersList();
  } else if (type === "teams") {
    title = "Список отрядов";
    content = generateTeamsList();
  } else if (type === "planets") {
    title = "Список планет";
    content = generatePlanetsList();
  }
  
  modalTitle.textContent = title;
  modalBody.innerHTML = content;
  modal.classList.remove("hidden");
  
  attachModalHandlers();
}

function generateNewsList() {
  let html = '<div class="records-list">';
  
  mockNews.forEach(item => {
    html += `
      <div class="record-item" data-id="${item.id}">
        <div class="record-info">
          <span class="record-date">${item.date}</span>
          <span class="record-author">${item.author}</span>
          <span class="record-title">${item.title}</span>
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
  return html;
}

function generateCharactersList() {
  let html = '<div class="records-list">';
  
  mockCharacters.forEach(char => {
    html += `
      <div class="record-item" data-id="${char.id}">
        <div class="record-info">
          <span class="record-title">${char.name}</span>
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
  return html;
}

function generateTeamsList() {
  return '<div class="records-list"><p>Список отрядов</p></div>';
}

function generatePlanetsList() {
  return '<div class="records-list"><p>Список планет</p></div>';
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
  document.getElementById("deleteConfirmModal").classList.remove("hidden");
}

function hideAllModals() {
  document.querySelectorAll(".modal-overlay").forEach((modal) => {
    modal.classList.add("hidden");
  });
  currentItemForDelete = null;
}

// ========== ОБРАБОТЧИКИ ==========

function attachContentHandlers(pageName) {
  const showListBtn = document.querySelector(".btn-show-list");
  if (showListBtn) {
    showListBtn.addEventListener("click", () => {
      showRecordsModal(pageName);
    });
  }
  
  const form = document.querySelector(".admin-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      alert("Данные сохранены");
    });
  }
}

function attachModalHandlers() {
  document.querySelectorAll('[data-action="edit-news"]').forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      hideAllModals();
      showEditForm("news", id);
    });
  });
  
  document.querySelectorAll('[data-action="edit-character"]').forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      hideAllModals();
      showEditForm("character", id);
    });
  });
  
  document.querySelectorAll('[data-action="comments"]').forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const name = btn.dataset.name;
      hideAllModals();
      showCommentsModal(id, name);
    });
  });
  
  document.querySelectorAll('[data-action="delete"]').forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const type = btn.dataset.type;
      showDeleteConfirm({ id, type });
    });
  });
  
  document.getElementById("closeRecordsModal").addEventListener("click", () => {
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
  showPage("login");
  
  document.querySelectorAll(".sidebar-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const page = btn.dataset.page;
      showPage(page);
    });
  });
  
  document.querySelectorAll("[data-page]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const page = btn.dataset.page;
      showPage(page);
    });
  });
  
  document.getElementById("exitButton").addEventListener("click", () => {
    showPage("login");
  });
  
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;
    
    if (login && password.length >= 5) {
      currentAdminName = login;
      showPage("welcome");
    } else {
      alert("Пароль должен быть не менее 5 символов");
    }
  });
  
  document.getElementById("togglePassword").addEventListener("click", () => {
    const passwordInput = document.getElementById("password");
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;
  });
  
  document.getElementById("confirmDeleteBtn").addEventListener("click", () => {
    alert("Элемент удален (имитация)");
    hideAllModals();
  });
  
  document.getElementById("cancelDeleteBtn").addEventListener("click", () => {
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