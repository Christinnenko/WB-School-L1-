// Задача: Рекурсивный обход дерева DOM:: Напишите функцию, которая рекурсивно обходит дерево DOM,
// начиная с указанного элемента, и выполняет определенное действие с каждым узлом (например, выводить информацию о теге в консоль).

// Функция для рекурсивного обхода дерева DOM
function recursiveDOMTraversal(node, action) {
  action(node);

  for (let i = 0; i < node.children.length; i++) {
    recursiveDOMTraversal(node.children[i], action);
  }
}

// Функция для вывода информации о теге и его содержимом в консоль
function logTagInfo(node) {
  if (node.tagName.toLowerCase() === "script") {
    // Пропускаем теги скриптов
    return;
  }

  console.log("Тег:", node.tagName);

  if (node.nodeType === Node.ELEMENT_NODE) {
    // Если узел - элемент, выводим его содержимое
    console.log("Содержимое:", node.innerHTML);
  }
}

// Находим корневой элемент (body) и выполняем рекурсивный обход
document.getElementById("myButton").addEventListener("click", function () {
  const bodyElement = document.body;
  recursiveDOMTraversal(bodyElement, logTagInfo);
});
