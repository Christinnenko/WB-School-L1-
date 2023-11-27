// Задача: Добавить анимацию для элемента: Напишите функцию, которая добавляет анимацию для
// элемента на веб-странице, например, плавное изменение его положения или размера.

// Функция для обновления цифрового часов на странице
function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const timeString = `${hours}:${minutes}:${seconds}`;

  // Обновление текста в элементе с идентификатором "clock"
  document.getElementById("clock").innerText = timeString;
}

// Функция для анимации перемещения элемента с идентификатором "clock"
function animateElement() {
  // Получение элемента по его идентификатору
  const element = document.getElementById("clock");

  // Генерация новых координат для перемещения элемента
  const newPositionX = Math.random() * 200;
  const newPositionY = Math.random() * 200;

  // Применение новых координат в стиле элемента для создания анимации
  element.style.transform = `translate(${newPositionX}px, ${newPositionY}px)`;
}

// Обновление времени каждую секунду с использованием функции updateClock
setInterval(updateClock, 1000);

// Добавление анимации перемещения каждые 1.5 секунды с использованием функции animateElement
setInterval(animateElement, 1500);

// Инициализация времени и начального положения элемента при загрузке страницы
updateClock();
animateElement();
