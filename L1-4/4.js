// Разработать функцию, изменяющую окончание слов в зависимости от падежа. Например:
// 112 сообщения
// 12 сообщений
// 1 сообщение
// 1024 пользователя
// 1026 пользователей
// 121 пользователь
// Функцию надо упаковать в модуль.

// Задаем формы для слов "сообщение" и "пользователь"
const messageForms = ["сообщение", "сообщения", "сообщений"];
const userForms = ["пользователь", "пользователя", "пользователей"];

// Модуль для изменения окончания слов
const wordEndingChanger = (function () {
  // Вспомогательная функция для определения окончания в зависимости от числа
  function getEnding(number, endings) {
    // Приводим число к положительному значению
    number = Math.abs(number);

    // Исключаем числа от 11 до 19, так как для них окончание всегда будет "-ий"
    number %= 100;
    if (number >= 11 && number <= 19) {
      return endings[2];
    }

    // Определяем последнюю цифру числа
    const lastDigit = number % 10;

    // В зависимости от последней цифры определяем окончание
    switch (lastDigit) {
      case 1:
        return endings[0];
      case 2:
      case 3:
      case 4:
        return endings[1];
      default:
        return endings[2];
    }
  }

  // Основная функция для изменения окончания слова
  function changeEnding(number, wordForms) {
    // Получаем окончание с использованием вспомогательной функции
    const ending = getEnding(number, wordForms);
    // Формируем строку с числом и окончанием
    return `${number} ${ending}`;
  }

  // Экспортируемая часть модуля
  return {
    changeEnding: changeEnding,
  };
})();

// Пример использования модуля
console.log(wordEndingChanger.changeEnding(112, messageForms)); // 112 сообщений
console.log(wordEndingChanger.changeEnding(12, messageForms)); // 12 сообщений
console.log(wordEndingChanger.changeEnding(1, messageForms)); // 1 сообщение
console.log(wordEndingChanger.changeEnding(1024, userForms)); // 1024 пользователя
console.log(wordEndingChanger.changeEnding(1026, userForms)); // 1026 пользователей
console.log(wordEndingChanger.changeEnding(121, userForms)); // 121 пользователь
