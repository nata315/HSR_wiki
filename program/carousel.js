class PhotoCarousel {
  constructor() {
    // Основные DOM-элементы
    this.carouselTrack = document.querySelector(".carousel-track");
    this.prevBtn = document.querySelector(".carousel-btn-prev");
    this.nextBtn = document.querySelector(".carousel-btn-next");

    // Состояние карусели
    this.currentIndex = 0;
    this.cardsPerView = this.getCardsPerView();
    this.photos = [];

    this.init();
  }

  // Определение количества карточек по ширине экрана
  getCardsPerView() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    return 5;
  }

  // Загрузка фотографий
  async loadPhotos() {
    try {
      const response = await fetch("../admin_program/server/images.json");
      this.photos = await response.json();
      console.log("Данные в файле : " + response);
    } catch (err) {
      this.photos = []; // Пустой массив при ошибке
      console.log("Ошибка чтения из файла");
    }
  }

  // Создание HTML карточки
  createPhotoCard(photo) {
    return `
            <div class="photo-card" data-id="${photo.id}">
                <img src="${photo.image}" alt="${photo.name}" loading="lazy" id="${photo.id}-img" class="clickable-image">
                <div class="photo-info">
                    <h3>${photo.name}</h3>
                </div>
            </div>
        `;
  }

  // Обработчик клика по изображению
  handleImageClick(event) {
    this.logEvent("Клик по элементу:", event.target);
    this.logEvent("Тег элемента:", event.target.tagName);
    this.logEvent("Класс элемента:", event.target.className);

    const image = event.target.closest("img");
    this.logEvent("Найденное изображение:", image);

    if (!image) {
      this.logEvent("Клик не по изображению");
      return;
    }

    const card = image.closest(".photo-card");
    this.logEvent("Родительская карточка:", card);

    if (!card) {
      this.logEvent("Карточка не найдена");
      return;
    }

    const photoId = card.dataset.id;
    this.logEvent("ID фото:", photoId);

    const photo = this.photos.find((p) => String(p.id) === photoId);
    this.logEvent("Найденное фото:", photo);

    if (photo) {
      this.logEvent("Открытие модального окна для:", photo.name);
      this.openModal(photo);
    } else {
      this.logEvent("Фото не найдено в массиве");
    }
  }

  // Централизованный логгер
  logEvent(...args) {
    console.log(...args);
  }

  // Создание модального окна
  createModalWindow(photo) {
    //let comBlock = this.openCommentModal(photo);
    return `
            <div class="modal-overlay" id="photo-modal">
                <div class="modal-content">
                    <button class="modal-close">&times;</button>
                    <div class="modal-image">
                        <img src="${photo.image}" alt="${photo.name}">
                    </div>
                    <div class="modal-info">
                        <h2>${photo.name}</h2>
                        <p class="modal-description">${photo.description || "Нет описания"}</p>
                    </div>
                    <div class="com-block">
                        <form method="POST" action="">
                        <div class="com-title">
                            <div>
                                <p>Напишите никнейм: </p>
                                <input type="text" name="autor" id="${photo.id}-commentAutor">
                            </div>
                            <div>
                                <p>Комментарий: </p>
                                <textarea type="text" name="comment" id="${photo.id}-commentText"></textarea>
                            </div>
                            <button type="submit">Отправить</button>
                        </form>
                    </div>
                    <div class="comments-generateBlock" id="${photo.id}-comments"></div>
                </div>
            </div>
        `;
  }

  // Открытие модального окна
  openModal(photo) {
    // Удаляем старое окно, если есть
    const existingModal = document.getElementById("photo-modal");
    if (existingModal) existingModal.remove();

    // Создаём новое окно
    const modalHTML = this.createModalWindow(photo);
    // Вставляем его в DOM
    document.body.insertAdjacentHTML("beforeend", modalHTML);
    // Загружаем комментарии
    this.openCommentModal(
      photo,
      document.getElementById(`${photo.id}-comments`),
    );

    // Обработчик закрытия
    const modal = document.getElementById("photo-modal");
    const closeBtn = modal.querySelector(".modal-close");

    closeBtn.addEventListener("click", () => this.closeModal(modal));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) this.closeModal(modal);
    });

    // Закрытие по Escape
    document.addEventListener(
      "keydown",
      (this.handleEscape = (e) => {
        if (e.key === "Escape") {
          this.closeModal(modal);
        }
      }),
    );
  }
  //генерация комметнриев
  async openCommentModal(photo, container) {
    let html = ``;
    const com = await this.loadComments(photo.id);

    if (!com || com.length === 0) {
      html += `<p>Комментариев нет</p>`;
      console.log("Комментариев нет");
    } else {
      com.forEach((comment) => {
        html += `<div class="one-com-block">
          <span class="date-com">${comment.date}</span>
          <span class="autor-com">${comment.username}</span>
          <span class="text-com">${comment.text}</span>
        </div>`;
      });
    }
    container.innerHTML = html;
    //return html;
  }
  //чтение com.json
  async loadComments(photoId) {
    try {
      const response = await fetch("../admin_program/server/comments.json");
      const allComments = await response.json();

      console.log("Данные комментариев:", allComments);

      // Найти объект с нужным id персонажа
      const personComments = allComments.find((item) => item.id === photoId);

      // Вернуть именно массив data этого персонажа
      return personComments ? personComments.data : [];
    } catch (err) {
      console.log("Ошибка чтения комментариев из файла");
      return [];
    }
  }

  // Закрытие модального окна
  closeModal(modal) {
    if (modal) {
      modal.remove();
      document.removeEventListener("keydown", this.handleEscape);
    }
  }

  // Обновление позиции карусели
  updateCarousel() {
    const movePercent = -this.currentIndex * 100;
    this.carouselTrack.style.transform = `translateX(${movePercent}%)`;

    // Блокировка кнопок по краям
    this.prevBtn.disabled = this.currentIndex === 0;
    this.nextBtn.disabled =
      this.currentIndex >=
      Math.ceil(this.photos.length / this.cardsPerView) - 1;
  }

  // Следующий слайд
  nextSlide() {
    const maxIndex = Math.ceil(this.photos.length / this.cardsPerView) - 1;
    if (this.currentIndex < maxIndex) {
      this.currentIndex++;
      this.updateCarousel();
    }
  }

  // Предыдущий слайд
  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateCarousel();
    }
  }
  // Инициализация
  async init() {
    await this.loadPhotos();

    if (!this.photos.length) return;

    // Отрисовка фото
    this.carouselTrack.innerHTML = this.photos
      .map((p) => this.createPhotoCard(p))
      .join("");

    // Обработчики событий
    this.prevBtn.addEventListener("click", () => this.prevSlide());
    this.nextBtn.addEventListener("click", () => this.nextSlide());

    // Клик по изображению - используем делегирование на carouselTrack
    this.carouselTrack.addEventListener("click", (e) => {
      console.log("=== КЛИК В КАРУСЕЛИ ===");
      console.log("event.target:", e.target);
      this.handleImageClick(e);
    });

    // Адаптивность
    window.addEventListener("resize", () => {
      const newCardsPerView = this.getCardsPerView();
      if (newCardsPerView !== this.cardsPerView) {
        this.cardsPerView = newCardsPerView;
        this.updateCarousel();
      }
    });

    // Клавиши влево/вправо
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.prevSlide();
      if (e.key === "ArrowRight") this.nextSlide();
    });

    this.updateCarousel();
  }
}

// Запуск
document.addEventListener("DOMContentLoaded", () => {
  new PhotoCarousel();
});
