// Задача: Создать и добавить стиль для элемента: Напишите функцию, которая создает новый элемент,
// добавляет его в DOM и устанавливает для него стиль с помощью CSS.

function addStyledElement(color) {
  // Создаем новый элемент
  let newElement = document.createElement("div");

  // Устанавливаем класс для нового элемента
  newElement.className = "styledElement";

  // Устанавливаем цвет фона
  newElement.style.backgroundColor = color;

  // Устанавливаем текст внутри элемента (можете изменить по своему усмотрению)
  newElement.textContent = "Новый элемент";

  // Добавляем новый элемент в DOM (в конец body)
  document.body.appendChild(newElement);
}

// Вызываем функцию три раза с интервалом в 2 секунды
setTimeout(function () {
  addStyledElement("#3498db"); // Синий цвет
}, 0);

setTimeout(function () {
  addStyledElement("#e74c3c"); // Красный цвет
}, 2000);

setTimeout(function () {
  addStyledElement("#2ecc71"); // Зеленый цвет
}, 4000);
