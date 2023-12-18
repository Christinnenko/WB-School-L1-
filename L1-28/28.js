// Задача: Создать и добавить элемент с использованием шаблонов: Напишите функцию,
// которая создает новый элемент с использованием шаблонов (например, с помощью тега <template>) и добавляет его в DOM.

function addNote() {
  // Получаем шаблон и его содержимое
  let template = document.getElementById("note-template");
  let clone = document.importNode(template.content, true);

  // Добавляем заметку в контейнер
  document.getElementById("notes-container").appendChild(clone);
}

function removeNote(button) {
  // Получаем родительский элемент кнопки (заметку) и удаляем его
  let note = button.parentNode;
  note.parentNode.removeChild(note);
}
