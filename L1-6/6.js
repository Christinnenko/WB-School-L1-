// Задача о сортировке объектов: у вас есть массив объектов вида { name: 'John', age: 25 }. Напишите код, который сортирует этот массив по возрастанию возраста,
//  а при равных возрастах сортирует по алфавиту по полю name.

// Пример массива объектов
const arrayExample = [
  { name: "Svetlana", age: 14 },
  { name: "Christina", age: 16 },
  { name: "Natalia", age: 17 },
  { name: "Olga", age: 10 },
  { name: "Julia", age: 5 },
  { name: "Ann", age: 16 },
  { name: "Arina", age: 16 },
];

// Сортировка по возрастанию возраста, а при равных возрастах по алфавиту по полю name
arrayExample.sort((a, b) => {
  // Сначала сравниваем возраст
  if (a.age !== b.age) {
    return a.age - b.age;
  }

  // Если возрасты равны, сравниваем по имени (по алфавиту)
  return a.name.localeCompare(b.name);
});

console.log(arrayExample);
