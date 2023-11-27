// Разработайте функцию преобразования JSON в связный список. На входе функция должна получать JSON,
// содержащий список объектов, на выходе объект, представляющий из себя односвязный список.

// Пример списка объектов, где каждый элемент массива - это отдельный объект
const arrayExample = [
  { name: "Svetlana", age: 14 },
  { name: "Christina", age: 16 },
  { name: "Natalia", age: 17 },
  { name: "Olga", age: 10 },
  { name: "Julia", age: 5 },
];

// Преобразовываем переменную arrayExample в строку в формате JSON, представляющую список объектов:
const jsonArrayExample = JSON.stringify(arrayExample);

/* функция преобразования JSON в объект, представляющий из себя односвязный список
односвязный список — базовая структура данных, представляющая собой соединённые узлы с однотипными данными.
Каждый узел состоит из элемента и ссылки на следующий элемент. Первый элемент списка - голова (head), последний — хвост (tail).
Последний элемент односвязного списка в качестве ссылки содержит null-значение. */

function jsonToList(jsonString) {
  try {
    const jsonArray = JSON.parse(jsonString);

    if (!Array.isArray(jsonArray) || jsonArray.length === 0) {
      return null;
    }

    // Создаем первый узел связанного списка (голову)
    const head = {
      data: jsonArray[0],
      next: null,
    };

    // Используем текущий узел для последующего добавления
    let current = head;

    // Проходим по оставшимся элементам массива
    for (let i = 1; i < jsonArray.length; i++) {
      // Создаем новый узел
      const newNode = {
        data: jsonArray[i],
        next: null,
      };

      // Устанавливаем ссылку на новый узел в текущем узле
      current.next = newNode;

      // Перемещаем текущий узел на новый узел для последующего добавления
      current = newNode;
    }

    return head;
  } catch (error) {
    console.error("Ошибка при преобразовании JSON в связанный список:", error);
    return null;
  }
}

// Пример использования
console.log(jsonToList(jsonArrayExample));
