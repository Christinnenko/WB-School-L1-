// Вычислить размер коллстэка в основных браузерах: Chrome, Firefox, Opera и Safari (если есть возможность)

function printCallStack() {
  console.trace("Call Stack:");
}

// Вызываем функцию для получения информации о стеке вызовов
printCallStack();

/*
Коллстек представляет собой структуру данных, в которой функции добавляются в стек при их вызове
и удаляются из стека при завершении выполнения.

Приведенный выше код подходит для использованя в консоли разработчика, в браузере.

Когда эта функция будет вызвана, она выведет текущий стек вызовов в консоль разработчика браузера.
Это наглядно отобразит, какие функции были вызваны и в каком порядке.
*/
