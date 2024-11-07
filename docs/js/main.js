const slides = document.querySelectorAll(".slider__slides .slider__slide"); // Все слайды
let slideIndex = 0; // Индекс текущего слайда
let intervalId = null; // Идентификатор интервала
let isPaused = false; // Флаг для отслеживания паузы
const dotsContainer = document.querySelector(".slider__dots"); // Контейнер для индикаторов
document.addEventListener("DOMContentLoaded", initializeSlider); // Инициализация слайдера

function initializeSlider() {
  if (slides.length > 0) {
    // Инициализация точек
    createDots();

    // Инициализация первого слайда
    showSlide(slideIndex);
    intervalId = setInterval(nextSlide, 5000); // Авто-переключение слайдов

    // Привязка обработчиков событий к кнопкам
    const prevButton = document.querySelector(".slider__btn--prev");
    const nextButton = document.querySelector(".slider__btn--next");
    const pauseButton = document.querySelector(".slider__btn--pause");

    prevButton.addEventListener("click", prevSlide);
    nextButton.addEventListener("click", nextSlide);
    pauseButton.addEventListener("click", togglePause);

    // Привязка обработчиков событий для клавиатуры
    document.addEventListener("keydown", handleKeyboardNavigation);
  }
}

function createDots() {
  // Создание индикаторов в зависимости от количества слайдов
  slides.forEach((slide, index) => {
    const dot = document.createElement("div");
    dot.classList.add("slider__dot");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
}

function updateDots() {
  // Обновление активного индикатора
  const dots = document.querySelectorAll(".slider__dot");
  dots.forEach((dot, index) => {
    if (index === slideIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

function showSlide(index) {
  if (index >= slides.length) {
    slideIndex = 0; // Если индекс выходит за пределы, вернуться к первому слайду
  } else if (index < 0) {
    slideIndex = slides.length - 1; // Если индекс меньше 0, вернуться к последнему слайду
  }

  slides.forEach((slide) => {
    slide.classList.remove("displaySlide"); // Убираем отображение у всех слайдов
  });
  slides[slideIndex].classList.add("displaySlide"); // Добавляем отображение для текущего слайда
  updateDots(); // Обновляем индикаторы
}

function prevSlide() {
  clearInterval(intervalId); // Останавливаем интервал при смене слайда вручную
  if (!isPaused) {
    intervalId = setInterval(nextSlide, 5000); // Перезапускаем интервал, если не в паузе
  }
  slideIndex--;
  showSlide(slideIndex); // Переход на предыдущий слайд
}

function nextSlide() {
  if (!isPaused) {
    slideIndex++;
    showSlide(slideIndex); // Переход на следующий слайд
  }
}

function goToSlide(index) {
  slideIndex = index;
  showSlide(slideIndex); // Переход к выбранному слайду через индикатор
}

function togglePause() {
  if (isPaused) {
    intervalId = setInterval(nextSlide, 5000); // Возобновляем авто-переключение
    isPaused = false;
  } else {
    clearInterval(intervalId); // Ставим на паузу
    isPaused = true;
  }

  // Изменяем текст на кнопке паузы
  const pauseButton = document.querySelector(".slider__btn--pause");
  if (isPaused) {
    pauseButton.textContent = "Возобновить";
  } else {
    pauseButton.textContent = "Пауза";
  }
}

function handleKeyboardNavigation(event) {
  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    nextSlide(); // Стрелка вправо или вниз — следующий слайд
  } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    prevSlide(); // Стрелка влево или вверх — предыдущий слайд
  } else if (event.key === " ") {
    togglePause(); // Пробел — ставит на паузу или возобновляет
  }
}
