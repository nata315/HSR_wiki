class PhotoCarousel {
    constructor() {
        // Основные DOM-элементы
        this.carouselTrack = document.querySelector('.carousel-track');
        this.prevBtn = document.querySelector('.carousel-btn-prev');
        this.nextBtn = document.querySelector('.carousel-btn-next');
        
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
            const response = await fetch('/admin_program/server/images.json');
            this.photos = await response.json();
        } catch (err) {
            this.photos = []; // Пустой массив при ошибке
        }
    }

    // Создание HTML карточки
    createPhotoCard(photo) {
        return `7
            <div class="photo-card" data-id="${photo.id}">
                <img src="${photo.src}" alt="${photo.name}" loading="lazy">
                <div class="photo-info">
                    <h3>${photo.name}</h3>
                </div>
            </div>
        `;
    }

    // Обновление позиции карусели
    updateCarousel() {
        const movePercent = -this.currentIndex * 100;
        this.carouselTrack.style.transform = `translateX(${movePercent}%)`;
        
        // Блокировка кнопок по краям
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex >= Math.ceil(this.photos.length / this.cardsPerView) - 1;
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

    // Обработка клика по фото
    handleCardClick(event) {
        const card = event.target.closest('.photo-card');
        if (!card) return;
        
        const photo = this.photos.find(p => p.id === parseInt(card.dataset.id));
        if (photo) {
            alert(`Фото: ${photo.name}\n${photo.description || 'Нет описания'}`);
            // Здесь можно добавить модальное окно
        }
    }

    // Инициализация
    async init() {
        await this.loadPhotos();
        
        if (!this.photos.length) return;
        
        // Отрисовка фото
        this.carouselTrack.innerHTML = this.photos.map(p => this.createPhotoCard(p)).join('');
        
        // Обработчики событий
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        this.carouselTrack.addEventListener('click', (e) => this.handleCardClick(e));
        
        // Адаптивность
        window.addEventListener('resize', () => {
            const newCardsPerView = this.getCardsPerView();
            if (newCardsPerView !== this.cardsPerView) {
                this.cardsPerView = newCardsPerView;
                this.updateCarousel();
            }
        });
        
        // Клавиши влево/вправо
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        this.updateCarousel();
    }
}

// Запуск
document.addEventListener('DOMContentLoaded', () => {
    new PhotoCarousel();
});