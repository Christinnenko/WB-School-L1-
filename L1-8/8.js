// Задача о замыканиях: напишите функцию, которая будет принимать массив функций
//и возвращать новую функцию, которая вызывает каждую функцию в этом массиве и возвращает массив результатов,
//полученных после вызова каждой функции.

//Пример массива функций
const arrayFunctions = [
  (functionA = () => {
    return "Hello,";
  }),
  (functionB = () => {
    return "world!";
  }),
  (functionC = () => {
    return "Good morning!";
  }),
];

// Функция, принимающая массив функций и возвращающая новую функцию
function createCombinedFunction(arrayFunctions) {
  // Массив для хранения результатов вызова каждой функции
  const results = [];

  // Возвращаемая функция: использует замыкание для сохранения значения массива results, объявленного во внешней функции
  return function () {
    // Перебираем каждую функцию и вызываем её
    for (const arrayFunction of arrayFunctions) {
      const result = arrayFunction();
      results.push(result);
    }

    // Возвращаем массив результатов
    return results;
  };
}

// Создаем новую функцию, объединяющую вызовы функций
const combinedFunction = createCombinedFunction(arrayFunctions);

// Вызываем объединенную функцию: перебирает массив функций из замыкания и вызывает каждую из них, сохраняя результаты в массиве results
const combinedResults = combinedFunction();

console.log(combinedResults);
