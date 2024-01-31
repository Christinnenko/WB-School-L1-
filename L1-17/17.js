// Необходимо реализовать простое поле ввода адреса с функцией геокодинга: пользователь вводит данные в поле
// с помощью одного из геоинформационных сервисов (Яндекс.Карты, ДаДата, GraphHopper), подбирается адрес.
// Найденные данные должны отображаться в выпадающем списке, из которого можно выбрать подходящее значение.
// Реализовать дебоунсинг и защиту от троттлинга с помощью замыканий

function debounceAndThrottle(func, debounceDelay, throttleDelay) {
  let timeoutId;
  let throttling = false;

  return function () {
    const context = this;
    const args = arguments;

    // Защита от троттлинга
    if (!throttling) {
      throttling = true;

      func.apply(context, args);

      setTimeout(() => {
        throttling = false;
      }, throttleDelay);
    }

    // Дебаунсинг
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(context, args), debounceDelay);
  };
}

const API_KEY = "xxxxxxx"; // Токен для доступа к Yandex API, полученный на https://developer.tech.yandex.ru/
const BASE_URL = "https://geocode-maps.yandex.ru/1.x/";

// Функция для выполнения геокодирования через Yandex API
function geocodeYandex(address, callback) {
  const url = `${BASE_URL}?lang=ru_RU&apikey=${API_KEY}&geocode=${encodeURIComponent(
    address
  )}&format=json`;

  // Выполнение запроса с использованием fetch
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Обработка полученных данных и вызов переданной callback-функции
      const results = data.response.GeoObjectCollection.featureMember.map(
        (item) => {
          const coordinates = item.GeoObject.Point.pos.split(" ").reverse();
          return {
            address: item.GeoObject.metaDataProperty.GeocoderMetaData.text,
            coordinates: coordinates,
          };
        }
      );
      callback(results);
    })
    .catch((error) => console.error("Error:", error));
}

document.addEventListener("DOMContentLoaded", function () {
  // Обработчик события, срабатывающий после полной загрузки DOM
  const addressInput = document.getElementById("address-input");
  const addressList = document.getElementById("address-list");

  const geocode = debounceAndThrottle(
    function () {
      // Задержка выполнения функции geocode по времени delay, используя debounce
      const inputValue = addressInput.value.trim();
      if (inputValue.length === 0) {
        addressList.innerHTML = "";
        return;
      }

      // Выполнение геокодирования при вводе адреса и обновление списка результатов
      geocodeYandex(inputValue, (results) => {
        console.log("Обновление списка");
        addressList.innerHTML = "";
        results.forEach((result) => {
          const resultItem = document.createElement("li");
          resultItem.textContent = result.address;
          resultItem.addEventListener("click", function () {
            addressInput.value = result.address;
            addressList.innerHTML = ""; // Очищаем список после выбора
          });
          addressList.appendChild(resultItem);
        });
      });
    },
    7000,
    7000
  );

  addressInput.addEventListener("input", geocode);
});
