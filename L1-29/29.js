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

    // Отправляем данные на определенный URL с использованием Fetch API
    const url = "https://site.ru/new-order/webhook.php"; // URL, куда отправляем запрос

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // Действия после успешной отправки данных
          console.log("Данные успешно отправлены.");
        } else {
          // Обработка ошибок
          console.error("Произошла ошибка при отправке данных.");
        }
      })
      .catch((error) => {
        // Обработка ошибок при выполнении запроса
        console.error("Произошла ошибка при выполнении запроса:", error);
      })
      .finally(() => {
        document.getElementById("orderForm").reset();
      });
  });
