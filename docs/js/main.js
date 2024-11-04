// Получил элемент слайдера
const slider = document.querySelector('.slider'); 

// Получил все слайды
const slides = document.querySelectorAll('.slide'); 

// Индекс активного слайда
let current = 0; 

// Возвращение к первому слайду после последнего РАЗРЕШЕНО
let cycle = true;

// Кнопки Предыдущая/Следующая
const prevButton = document.querySelector('.btn-prev'); 
const nextButton = document.querySelector('.btn-next'); 

// Точки пагинации (метод разбивки контента)
const dots = document.querySelectorAll('.dot'); 
