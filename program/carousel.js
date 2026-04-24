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
            const response = await fetch('../admin_program/server/images.json');
            this.photos = await response.json();
            console.log("Данные в файле : "+ response);
        } catch (err) {
            this.photos = []; // Пустой массив при ошибке
            console.log("Ошибка чтения из файла");
        }
    }

    // Создание HTML карточки
    createPhotoCard(photo) {
        return `
            <div class="photo-card" data-id="${photo.id}">
                <img src="${photo.image}" alt="${photo.name}" loading="lazy" id="${photo.id}"+"-img">
                <div class="photo-info">
                    <h3>${photo.name}</h3>
                </div>
            </div>
            
        `;
    }
    /*
    <div class="photo-card-window data-id="${photo.id}">
                <div class="high-card">
                    <div class="photo-info">
                        <img src="${photo.image}" alt="${photo.name}" loading="lazy">
                        <h3>${photo.name}</h3>
                    </div>
                    <div class="photo-description">
                        <p id="photo-description">${photo.description}</p> 
                    </div>
                </div>
                
            </div> 
    <!-- блок с комментариями >
                //нужно добавить скрытие блока 
                <div class="com-block">
                    <form method="POST" action="">
                        <div>
                            <p>Введите никнейм: </p>
                            <input type="text" name="autor" id="${photo.id}"+"-commentAutor">
                        </div>
                        <div>
                            <p>Комментарий: </p>
                            <textarea type="text" name="comment" id="${photo.id}"+"-commentText">
                        </div>
                        <button type="submit">Отправить</button>
                    </form>
                    <div class="comments-generateBlock" id="${photo.id}"+"-comments">
                        <!-- здесь генерируются ком из сохраненного списка-->
                    </div>
                </div>*/

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
    /*
    handleCardClick(event) {
        const card = event.target.closest('.photo-card');
        if (!card) return;
        
        const photo = this.photos.find(p => p.id === parseInt(card.dataset.id));
        if (photo) {
            alert(`Фото: ${photo.name}\n${photo.description || 'Нет описания'}`);
            // Здесь можно добавить модальное окно
        }

    }*/
    /*cardImageClick(card){
        let card = document.getElementById(card.id+"-img");
        let comBlock = document.getElementsByClassName("com-block");
        card.addEventListener('click',function(){
            //сделать функцию чтения комментариев 
            //добавить к ком сво-во открытого окна 

        })

    }*/


    // Инициализация
    async init() {
        await this.loadPhotos();
        
        if (!this.photos.length) return;
        
        // Отрисовка фото
        this.carouselTrack.innerHTML = this.photos.map(p => this.createPhotoCard(p)).join('');
        
        // Обработчики событий
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        //this.photos.map(p => this.cardImageClick(p));
        //this.carouselTrack.addEventListener('click', (e) => this.handleCardClick(e));
        
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