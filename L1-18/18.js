// Подсчитать максимальный объем данных, который можно записать в localStorage вашего браузера.

function getLocalStorageSize() {
  let testKey = "testKey";
  let testData = "";
  // Создаем строку данных, которую будем записывать
  while (testData.length < 1024 * 1024 && !localStorage.getItem(testKey)) {
    testData += "a";
    try {
      localStorage.setItem(testKey, testData);
    } catch (e) {
      // Если не удается установить значение, значит достигли лимита
      break;
    }
  }

  // Удаляем тестовый ключ
  localStorage.removeItem(testKey);

  // Возвращаем размер данных, который удалось записать
  return testData.length;
}

let localStorageSize = getLocalStorageSize();
console.log(`Максимальный объем localStorage: ${localStorageSize} байт`);

// Этот код пытается записать данные в localStorage до тех пор, пока не достигнет лимита.
// Затем он возвращает размер данных, которые удалось записать.
// Метод не является абсолютно точным, так как браузер может использовать
// различные стратегии управления хранилищем.
