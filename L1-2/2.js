// Задача о странных числах: Напишите функцию, которая принимает число и возвращает true,
//  если это число является странным, и false в противном случае. Странным числом считается число,
//  которое равно сумме всех своих делителей, кроме самого себя.

function isStrange(userNumber) {
  let sum = 0; // Создаем переменную для подсчета суммы делителей

  for (let i = 1; i < userNumber; i++) {
    if (userNumber % i === 0) {
      //делим число на делитель, пока делитель меньше самого числа
      sum += i; // если делится без остатка, прибавляем делитель к сумме
    }
  }

  return sum === userNumber; // Сравниваем сумму делителей с самим числом, и возвращаем true или false
}

//Пример использования
console.log(isStrange(6)); //true
console.log(isStrange(28)); //true
console.log(isStrange(496)); //true
console.log(isStrange(12)); //false
console.log(isStrange(70)); //false
