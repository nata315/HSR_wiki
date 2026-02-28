class PhotoCarousel {
    constructor() {
        this.carouselTrack = document.querySelector('.carousel-track');
        this.carouselNav = document.querySelector('.carousel-nav');
        this.prevBtn = document.querySelector('.carousel-btn-prev');
        this.nextBtn = document.querySelector('.carousel-btn-next');
        
        this.currentIndex = 0;
        this.cardsPerView = this.getCardsPerView();
        this.totalCards = 0;
        
        /*this.photos = [
             {
                id: 1,
                src: 'https://static.wikia.nocookie.net/honkai-star-rail/images/b/b0/Персонаж_Темень_Сплэш-арт.png/revision/latest/scale-to-width-down/1000?cb=20250912143857&path-prefix=ru',
                title: 'Темень',
                //description: 
                //ссылка на файл с комментариями 

            }];*/
        //изменить на цикл по json бд 

        this.init();
    } 
    
    getCardsPerView() {
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 768) return 2;
        return 5;
    }
    
    createPhotoCard(photo) {
        return `
            <div class="photo-card" onclick="${this}.createWindowCard(${photo.id})" data-id="${photo.id}">
                <img src="${photo.src}" alt="${photo.title}" loading="lazy">
                <div class="photo-info">
                    <h3>${photo.title}</h3>
                </div>
            </div>
        `;
    }

    //создание одной карточки-окна
    createWindowCard(card){
        //
        
        //<>фото
        return `<div class="card-character" data-id="${card.id}">
                <img src="${card.src}" alt="${card.title}">
                <div class="card-info">
                    <h3>${card.title}</h3>
                </div>
            </div>`;
        //<p class="card-description">${card.description}</p>
        // <div class="comment"> </div>
        //style
    }
    
    createIndicators() {
        const totalSlides = Math.ceil(this.totalCards / this.cardsPerView);
        let indicatorsHTML = '';
        
        for (let i = 0; i < totalSlides; i++) {
            indicatorsHTML += `
                <button class="carousel-indicator ${i === 0 ? 'active' : ''}" 
                        data-slide="${i}"></button>
            `;
        }
        
        this.carouselNav.innerHTML = indicatorsHTML;
    }
    
    updateCarousel() {
        const cardWidth = 100 / this.cardsPerView;
        const translateX = -this.currentIndex * cardWidth * this.cardsPerView;
        this.carouselTrack.style.transform = `translateX(${translateX}%)`;
        
        // Обновляем индикаторы
        document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
        
        // Обновляем состояние кнопок
        this.prevBtn.disabled = this.currentIndex === 0;
        const maxIndex = Math.ceil(this.totalCards / this.cardsPerView) - 1;
        this.nextBtn.disabled = this.currentIndex >= maxIndex;
    }
    
    nextSlide() {
        const maxIndex = Math.ceil(this.totalCards / this.cardsPerView) - 1;
        if (this.currentIndex < maxIndex) {
            this.currentIndex++;
            this.updateCarousel();
        }
    }
    
    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
        }
    }
    
    goToSlide(index) {
        const maxIndex = Math.ceil(this.totalCards / this.cardsPerView) - 1;
        if (index >= 0 && index <= maxIndex) {
            this.currentIndex = index;
            this.updateCarousel();
        }
    }
    
    handleResize() {
        const oldCardsPerView = this.cardsPerView;
        this.cardsPerView = this.getCardsPerView();
        
        if (oldCardsPerView !== this.cardsPerView) {
            this.createIndicators();
            this.updateCarousel();
        }
    }
    
    init() {
        // Добавляем карточки
        this.carouselTrack.innerHTML = this.photos.map(photo => 
            this.createPhotoCard(photo)
        ).join('');
        
        this.totalCards = this.photos.length;
        
        // Создаем индикаторы
        this.createIndicators();
        
        // Добавляем обработчики событий
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        
        // Обработчики для индикаторов
        this.carouselNav.addEventListener('click', (e) => {
            if (e.target.classList.contains('carousel-indicator')) {
                const slideIndex = parseInt(e.target.dataset.slide);
                this.goToSlide(slideIndex);
            }
        });
        
        // Обработчик изменения размера окна
        window.addEventListener('resize', () => this.handleResize());
        
        // Инициализируем карусель
        this.updateCarousel();
        
        // Добавляем поддержку клавиатуры
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        // Добавляем свайпы для мобильных устройств
        this.addSwipeSupport();
    }
    
    addSwipeSupport() {
        let startX = 0;
        let endX = 0;
        
        this.carouselTrack.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.carouselTrack.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe();
        });
        
        this.handleSwipe = () => {
            const diff = startX - endX;
            const swipeThreshold = 50;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        };
    }
}

// Инициализация карусели при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new PhotoCarousel();
});



