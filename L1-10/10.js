// Реализовать функцию конвертации строки в JSON со всеми необходимыми проверками и валидациями.

function analogueParse(jsonString) {
  // Проверка на переданную строку
  if (typeof jsonString !== "string") {
    throw new Error("Input is not a valid JSON string.");
  }

  // Убираем начальные и конечные пробелы
  jsonString = jsonString.trim();

  // Проверка на пустую строку
  if (jsonString === "") {
    throw new Error("Input is an empty string.");
  }

  // Проверка на открытую и закрытую фигурные скобки
  if (jsonString[0] !== "{" || jsonString[jsonString.length - 1] !== "}") {
    throw new Error("Input should start and end with curly braces.");
  }

  // Убираем внешние скобки
  jsonString = jsonString.slice(1, -1);

  // Разбиваем строку на пары ключ-значение
  const keyValuePairs = jsonString.split(",");

  // Создаем объект для хранения результатов
  const resultObject = {};

  // Обходим каждую пару ключ-значение
  for (const pair of keyValuePairs) {
    const [key, value] = pair.split(":");

    // Убираем начальные и конечные пробелы у ключа
    const cleanedKey = key.trim();

    // Убираем начальные и конечные пробелы у значения
    const cleanedValue = value.trim();

    // Проверка на кавычки вокруг строки и их удаление
    if (
      (cleanedValue.startsWith('"') && cleanedValue.endsWith('"')) ||
      (cleanedValue.startsWith("'") && cleanedValue.endsWith("'"))
    ) {
      resultObject[cleanedKey] = cleanedValue.slice(1, -1);
    } else {
      // Преобразование значения в число или булево
      const numValue = Number(cleanedValue);
      resultObject[cleanedKey] = isNaN(numValue)
        ? cleanedValue === "true"
          ? true
          : cleanedValue === "false"
          ? false
          : cleanedValue
        : numValue;
    }
  }

  return resultObject;
}

// Пример использования
const jsonString = '{"name": "Chris", "age": 29}';
const result = analogueParse(jsonString);
console.log(result);
