// Задача на промисы: напишите функцию, которая принимает URL изображения и возвращает промис,
// который разрешается с данными об изображении, когда оно загружено. Когда говорится "промис разрешается с данными об изображении",
// это означает, что промис должен быть успешно выполнен (resolved) с данными об изображении после того, как изображение будет загружено.

function loadImage(url) {
  // Создание и возвращение нового Promise
  return new Promise((resolve, reject) => {
    // Создание нового объекта изображения
    const image = new Image();

    // Обработчик успешной загрузки изображения
    image.onload = () => {
      // Вызов функции resolve при успешной загрузке
      resolve({
        width: image.width,
        height: image.height,
        src: image.src,
      });
    };

    // Обработчик ошибки загрузки изображения
    image.onerror = () => {
      // Вызов функции reject при ошибке загрузки
      reject(new Error(`Не удалось загрузить изображение по адресу: ${url}`));
    };

    // Устанавливаем URL изображения для загрузки
    image.src = url;
  });
}

// Пример использования
const imageUrl =
  "https://www.iphones.ru/wp-content/uploads/2018/07/55BA2802-3DA6-417F-9604-EC147507B547.jpeg";

// Вызов функции loadImage с передачей URL изображения
loadImage(imageUrl)
  .then((imageData) => {
    // Обработка успешного выполнения Promise
    console.log("Данные об изображении:", imageData);
  })
  .catch((error) => {
    // Обработка ошибки, если Promise был отклонен
    console.error("Ошибка:", error.message);
  });
