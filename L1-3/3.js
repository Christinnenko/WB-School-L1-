// Реализовать аналог библиотеки Math (можно назвать MathX) с базовым набором функций, используя замыкания:
// вычисление N-го числа в ряду Фибоначчи
// вычисление всех чисел в ряду Фибоначчи до числа N
// вычисление N-го просто числа
// вычисление всех простых чисел до числа N
// Будет плюсом, если задумаетесь и об оптимизации.

const MathX = (function () {
  // Внутренняя функция isPrime, определяющая, является ли число простым
  function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
  }

  return {
    // 1. Вычисление N-го числа в ряду Фибоначчи
    fibonacciNth: function (n) {
      if (n <= 0) {
        console.log("Некорректное значение n. n должно быть больше 0.");
        return null;
      }
      if (n === 1) return 0;

      let a = 0;
      let b = 1;

      for (let i = 2; i < n; i++) {
        const temp = a + b;
        a = b;
        b = temp;
      }

      return b;
    },

    // 2. Вычисление всех чисел в ряду Фибоначчи до числа N
    fibonacciSeries: function (n) {
      if (n <= 0) {
        console.log("Некорректное значение n. n должно быть больше 0.");
        return [];
      }

      const series = [0, 1];
      let i = 2;
      while (series[i - 1] + series[i - 2] <= n) {
        series.push(series[i - 1] + series[i - 2]);
        i++;
      }
      return series;
    },

    // 3. Вычисление N-го простого числа
    primesNth: function (n) {
      if (n <= 0) {
        console.log("Некорректное значение n. n должно быть больше 0.");
        return null;
      }

      let count = 0;
      let num = 1;

      // Внутренняя функция findNthPrime, использующая замыкание для доступа к count и isPrime
      function findNthPrime() {
        while (count < n) {
          num++;
          if (isPrime(num)) {
            count++;
          }
        }
        return num;
      }

      return findNthPrime();
    },

    // 4. Вычисление всех простых чисел до числа N
    primesSeries: function (n) {
      if (n <= 0) {
        console.log("Некорректное значение n. n должно быть больше 0.");
        return [];
      }

      const primes = [];
      for (let i = 2; i <= n; i++) {
        if (isPrime(i)) {
          primes.push(i);
        }
      }
      return primes;
    },
  };
})();

// Пример использования
console.log(MathX.fibonacciNth(10)); // 34
console.log(MathX.fibonacciSeries(8)); // [0, 1, 1, 2, 3, 5, 8]
console.log(MathX.primesNth(17)); // 59
console.log(MathX.primesSeries(15)); // [2, 3, 5, 7, 11, 13]
