// Задача: Взаимодействие с формами: Напишите функцию, которая получает данные из формы на веб-странице
// и выполняет определенные действия с этими данными, например, отправляет их на сервер или отображает всплывающее окно с результатами.

document
  .getElementById("orderForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Предотвращаем стандартное поведение формы (отправку на сервер)

    // Собираем данные из формы
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      product: document.getElementById("product").value,
      quantity: document.getElementById("quantity").value,
    };

    // Отправляем данные на определенный URL с использованием AJAX
    const xhr = new XMLHttpRequest();
    const url = "https://site.ru/new-order/webhook.php"; // URL, куда отправляем запрос
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    // Преобразуем данные в формат JSON
    const jsonData = JSON.stringify(formData);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // Действия после успешной отправки данных
        console.log("Данные успешно отправлены.");
      } else {
        // Обработка ошибок
        console.error("Произошла ошибка при отправке данных.");
      }
    };

    // Отправляем данные
    xhr.send(jsonData);

    document.getElementById("orderForm").reset();
  });
