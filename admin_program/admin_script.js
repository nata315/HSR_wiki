// текущая страница
let currentPage = "login";

// шаблоны контента
const contentTemplates = {
    news: `
<div class="content-header">
<h2>Добавление новости</h2>
</div>

<div class="card-form">
<div class="form-row">
<label>Заголовок</label>
<input type="text">
</div>

<div class="form-row">
<label>Описание</label>
<textarea rows="5"></textarea>
</div>

<div class="form-row">
<label>Дата</label>
<input type="date">
</div>

<div class="form-row">
<label>Фото</label>
<input type="url">
</div>

<button class="btn-save-add">Сохранить</button>
</div>
`,

    characters: `
<div class="content-header">
<h2>Добавление персонажа</h2>
</div>

<form id="myForm" action="server/cards_save.php" method="post">
            <div>
                <p>Введите id:</p>
                <input type="text" name="id_card"/>
            </div>
            <div>
                <p>Введите имя персонажа:</p>
                <input type="text" name="name_card"/>
            </div>
            <div>
                <p>Введите описание:</p>
                <input type="text" name="description_card"/>
            </div>
            <div>
                <p>Введите ссылку на изображение:</p>
                <input type="text" name="image_card"/>
                <p></p>
            </div>
            <button type="submit" class="submit-btn">готово</button>
            <button type="reset" class="submit-btn">очистить поля</button>
        </form>
</div>
`,

    teams: `
<div class="content-header">
<h2>Добавление отряда</h2>
</div>

<div class="card-form">

<div class="form-row">
<label>Изображение 1</label>
<input type="url">
</div>

<div class="form-row">
<label>Изображение 2</label>
<input type="url">
</div>

<div class="form-row">
<label>Изображение 3</label>
<input type="url">
</div>

<div class="form-row">
<label>Описание</label>
<textarea rows="4"></textarea>
</div>

<button class="btn-save-add">Добавить</button>

</div>
`,

    planets: `
<div class="content-header">
<h2>Добавление планеты</h2>
</div>

<div class="card-form">

<div class="form-row">
<label>Название</label>
<input type="text">
</div>

<div class="form-row">
<label>Фото</label>
<input type="url">
</div>

<div class="form-row">
<label>Описание</label>
<textarea rows="4"></textarea>
</div>

<button class="btn-save-add">Добавить</button>

</div>
`,
};

// переключение страниц
function showPage(pageName) {
    document.querySelectorAll(".page").forEach((page) => {
        page.classList.remove("active");
    });

    const adminContainer = document.getElementById("adminContainer");
    const contentArea = document.getElementById("contentArea");
    const userBadge = document.getElementById("userBadge");
    const exitButton = document.getElementById("exitButton");

    if (["news", "characters", "teams", "planets"].includes(pageName)) {
        adminContainer.classList.remove("hidden");

        contentArea.innerHTML = contentTemplates[pageName];

        updateActiveMenu(pageName);

        userBadge.classList.remove("hidden");
        exitButton.classList.remove("hidden");
    } else if (pageName === "login") {
        adminContainer.classList.add("hidden");

        userBadge.classList.add("hidden");
        exitButton.classList.add("hidden");

        document.getElementById("loginPage").classList.add("active");
    } else if (pageName === "welcome") {
        adminContainer.classList.add("hidden");

        document.getElementById("welcomePage").classList.add("active");
    } else {
        document.getElementById(pageName + "Page").classList.add("active");
    }

    currentPage = pageName;

    hideAllModals();
}

// активная кнопка меню
function updateActiveMenu(pageName) {
    document.querySelectorAll(".sidebar-btn").forEach((btn) => {
        btn.classList.remove("active");

        if (btn.dataset.page === pageName) {
            btn.classList.add("active");
        }
    });
}

// показать / скрыть пароль
function togglePassword() {
    const input = document.getElementById("password");

    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}

// модалки
function toggleModal(id) {
    const modal = document.getElementById(id);

    if (modal) {
        modal.classList.toggle("hidden");
    }
}

function hideAllModals() {
    document.querySelectorAll(".modal-overlay").forEach((modal) => {
        modal.classList.add("hidden");
    });
}

// удаление
function showDeleteConfirm() {
    document.getElementById("deleteConfirmModal").classList.remove("hidden");
}

function hideDeleteConfirm() {
    document.getElementById("deleteConfirmModal").classList.add("hidden");
}

function confirmDelete() {
    alert("Удалено");
    hideDeleteConfirm();
}

// запуск
document.addEventListener("DOMContentLoaded", () => {
    showPage("login");

    // кнопки переходов
    document.querySelectorAll("[data-page]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const page = btn.dataset.page;

            showPage(page);
        });
    });

    // кнопка выхода
    document.getElementById("exitButton").addEventListener("click", () => {
        showPage("login");
    });

    // показать пароль
    const toggleBtn = document.querySelector(".toggle-password");

    if (toggleBtn) {
        toggleBtn.addEventListener("click", togglePassword);
    }

    // закрытие модалок кликом по фону
    document.querySelectorAll(".modal-overlay").forEach((overlay) => {
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                overlay.classList.add("hidden");
            }
        });
    });
});
