// Реализовать аналог библиотеки Math (можно назвать MathX) с базовым набором функций, используя замыкания:
// вычисление N-го числа в ряду Фибоначчи
// вычисление всех чисел в ряду Фибоначчи до числа N
// вычисление N-го просто числа
// вычисление всех простых чисел до числа N
// Будет плюсом, если задумаетесь и об оптимизации.

//глобальное лексическое окружение
const MathX = (function () {
  //локальное лексическое окружение
  // проверкa, является ли число простым
  function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
  }

  // Замыкание, возвращающее функцию findNthPrime, которая находит N-е простое число.
  // Замыкание использует переменные count и num, чтобы отслеживать количество найденных простых чисел и текущее число в ряду.
  function nthPrimeClosure(n) {
    let count = 0;
    let num = 1;

    // Внутренняя функция, которая использует count и isPrime
    function findNthPrime() {
      while (count < n) {
        num++;
        if (isPrime(num)) {
          count++;
        }
      }
      return num;
    }

    return findNthPrime;
  }

  return {
    // Вычисление N-го числа в ряду Фибоначчи
    fibonacciNth: function (n) {
      if (n <= 0) return 0;
      if (n === 1) return 1;
      let a = 0;
      let b = 1;
      for (let i = 2; i <= n; i++) {
        const temp = a + b;
        a = b;
        b = temp;
      }
      return b;
    },
    //Вычисление всех чисел в ряду Фибоначчи до числа N
    fibonacciSeries: function (n) {
      const series = [0, 1];
      for (let i = 2; i <= n; i++) {
        series.push(series[i - 1] + series[i - 2]);
      }
      return series;
    },

    //Экспортируемое замыкание, возвращаемое nthPrimeClosure -  вычисление N-го простого числа
    nthPrime: nthPrimeClosure,

    //Вычисление всех простых чисел до числа N
    primesUpToN: function (n) {
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
const findThirdPrime = MathX.nthPrime(3);
console.log(findThirdPrime());
console.log(MathX.fibonacciNth(5));
console.log(MathX.fibonacciSeries(8));
console.log(MathX.primesUpToN(15));
