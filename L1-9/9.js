// Реализовать функцию конвертации JSON в строку

function analogueStringify(obj) {
  // Проверка, является ли obj объектом и не является ли null
  if (typeof obj === "object" && obj !== null) {
    // Если obj - массив
    if (Array.isArray(obj)) {
      // Обработка массива: рекурсивный вызов analogueStringify для каждого элемента
      const arrayResult = obj.map((element) => analogueStringify(element));
      return `[${arrayResult.join(",")}]`;
    } else {
      // Обработка объекта: рекурсивный вызов analogueStringify для каждой пары ключ-значение
      const objectResult = [];
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];
          const valueString = analogueStringify(value);
          objectResult.push(`"${key}":${valueString}`);
        }
      }
      return `{${objectResult.join(",")}}`;
    }
  } else if (typeof obj === "string") {
    // Обработка строк: заключаем строку в двойные кавычки
    return `"${obj}"`;
  } else {
    // Обработка прочих примитивов: возвращает строковое представление
    return String(obj);
  }
}

// Пример использования
const objectExample = {
  name: "Chris",
  age: 29,
  pet: ["Tima", "Maya"],
  adult: true,
  greet: function () {
    return "Hi";
  },
};

// Преобразование объекта в строку с использованием analogueStringify
const string = analogueStringify(objectExample);
console.log(string);
