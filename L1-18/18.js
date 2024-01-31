// Подсчитать максимальный объем данных, который можно записать в localStorage вашего браузера.

//ВАЖНО: очистить localStorage перед запуском
function estimateLocalStorageLimit() {
  let testData = "a".repeat(5242800); // Зная, что приблизительное ограничение 10мб, заполняем сразу чуть меньше
  let maxLocalStorageSize = 0;

  function writeTestData() {
    try {
      localStorage.setItem("", testData);
      testData += "a"; // далее добавляем по 1 символу (английский символ = 2 байтам (UTF-16))
      maxLocalStorageSize = testData.length * 2; // размер строки в байтах будет равен количеству символов в строке
      setTimeout(writeTestData, 0); // вызываем следующую итерацию асинхронно
    } catch (err) {
      if (err.code === DOMException.QUOTA_EXCEEDED_ERR) {
        // localStorage достиг своего лимита
        console.log(
          "Максимальный объем localStorage: " + maxLocalStorageSize + " байт"
        );
      } else {
        console.error("Ошибка записи в localStorage: ", err);
      }
    }
  }
  // Запуск оценки объема localStorage
  writeTestData();
}

estimateLocalStorageLimit();

// Этот код пытается записать данные в localStorage до тех пор, пока не достигнет лимита: сначала записывает 5242800 символов,
// затем добавляет по 1 символу и проверяет записался ли этот символ. Если не записался - лимит достигнут, выводит сообщение с размером данных, которые удалось записать
