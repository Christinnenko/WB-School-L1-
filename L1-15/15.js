// Задача на асинхронность: напишите асинхронную функцию, которая использует ключевое слово await
// для ожидания выполнения других асинхронных операций, и возвращает результат выполнения.

// Пример асинхронной функции
async function asyncExample() {
  try {
    // Ожидание выполнения асинхронной операции
    const result1 = await asyncOperation1();

    // Ожидание выполнения другой асинхронной операции
    const result2 = await asyncOperation2(result1);

    // Возврат результата после выполнения всех асинхронных операций
    return result2;
  } catch (error) {
    // Обработка ошибок, если они возникнут в ходе выполнения асинхронных операций
    console.error("An error occurred:", error);
    throw error;
  }
}

// Примеры асинхронных операций
function asyncOperation1() {
  return new Promise((resolve) => {
    // Пример асинхронной операции (задержка)
    setTimeout(() => {
      resolve("Result of asyncOperation1");
    }, 1000);
  });
}

function asyncOperation2(input) {
  return new Promise((resolve) => {
    // Еще один пример асинхронной операции
    setTimeout(() => {
      resolve(`Result of asyncOperation2 with input: ${input}`);
    }, 1000);
  });
}

// Использование асинхронной функции
asyncExample()
  .then((result) => {
    console.log("Final result:", result);
  })
  .catch((error) => {
    console.error("Unhandled error in asyncExample:", error);
  });
