const slides = document.querySelectorAll(".slider__slides .slider__slide"); // Выбрал все слайды
let slideIndex = 0;  // Первый слайд
let intervalId = null; // Остановка авто-переключения ручным способом, привязан к setInterval

document.addEventListener("DOMContentLoaded", initializeSlider); // Событие + функция

function initializeSlider() {
  if (slides.length > 0) { // Условие на присутствие слайдов
    slides[slideIndex].classList.add("displaySlide"); // Инициализация первого слайда
    intervalId = setInterval(nextSlide, 5000); // Авто-переключение слайдов

    // Привязываем обработчики событий к кнопкам
    const prevButton = document.querySelector(".slider__btn--prev"); // Предыдущая кнопка
    const nextButton = document.querySelector(".slider__btn--next"); // Следующая кнопка

    prevButton.addEventListener("click", prevSlide); // Событие на клик
    nextButton.addEventListener("click", nextSlide); // Событие на клик
  }
}

function showSlide(index) {
  if (index >= slides.length) {
    slideIndex = 0; // Если индекс выходит за пределы, вернуться к первому слайду
  } else if (index < 0) {
    slideIndex = slides.length - 1; // Если индекс меньше 0, вернуться к последнему слайду
  }

  slides.forEach((slide) => {
    slide.classList.remove("displaySlide"); // Убрал отображение у всех слайдов
  });
  slides[slideIndex].classList.add("displaySlide"); // Добавил отображение для текущего слайда
}

function prevSlide() {
  clearInterval(intervalId); // Остановка интервала при смене слайда вручную
  slideIndex--;
  showSlide(slideIndex); // Предыдущий слайд
}

function nextSlide() {
  slideIndex++;
  showSlide(slideIndex); // Следующий слайд
}
