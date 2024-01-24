//19.
// Реализовать виджет, отображающий список постов из любого паблика в VK (подойдет любой паблик, где постов очень много).
// Например, с помощью этой функции API VK. Виджет должен иметь фиксированные размеры и возможность прокрутки.
// При прокрутке содержимого виджета до конца должны подгружаться новые посты. Необходимо реализовать возможность кэширования уже загруженных данных:
// если пользователь закрыл страницу, а потом снова открыл ее, виджет должен отображать все загруженные ранее данные (новые данные должны подгружаться из
// учетом уже загруженных ранее).
// При переполнении localStorage, данные, загруженные последними должны вытеснять данные загруженные первыми.

20;
// Реализовать функцию подсчета объема памяти занимаемого данными в LocalStorage для предыдущей задачи.
// При изменении данных в localStorage в консоль должен выводиться объем занятой памяти / максимальный размер 	хранилища.

// Ссылка для проверки: https://oauth.vk.com/authorize?client_id=51803074&display=page&redirect_uri=http://127.0.0.1:5500/L1-19-20/19_20.html&scope=offline&response_type=token
// При переходе по ссылке открывается авторизация(пользователю выдается токен (см.в URL)), после авторизации происходит редирект на http://127.0.0.1:5500/L1-19-20/19_20.html

const container = document.querySelector(".container");
// Переменная для хранения максимального объема локального хранилища
let maxSpaceLocalStorage = 0;

// Извлечение токена пользователя из адресной строки после авторизации
const token = window.location.hash.split("=")[1].split("&")[0]; // функция fetchPosts сделает запрос на получение данных со стены указанного сообщества
// Количество загружаемых постов
let count = 5;
// Номер поста, с которого начинать загрузку
let offset = 0;

// создание объекта IntersectionObserver (следит за тем, когда элементы становятся видимыми на странице)
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // Проверка, что элемент появился в области видимости
    if (entry.isIntersecting) {
      // Убираем элемент из списка наблюдаемых и запускаем загрузку постов
      observer.unobserve(entry.target);
      fetchPosts();
    }
  });
});

// Функция подсчета объема локального хранилища
const calculateSpaceLocalStorage = () => {
  let value = "a";
  localStorage.clear();

  // Заполняем локальное хранилище данными до его полного заполнения
  while (true) {
    try {
      localStorage.setItem("", value);
      value += value;
    } catch {
      break;
    }
  }

  localStorage.clear();
  // Округленное значение объема локального хранилища
  return Math.floor((value.length / 2) * 2);
};

// Установка максимального объема локального хранилища
maxSpaceLocalStorage = calculateSpaceLocalStorage();

// Установка данных в локальное хранилище
const setItemsInLocalStorage = (array) => {
  try {
    // Если элементы в localstorage уже есть
    if (localStorage.getItem("data")) {
      // Получаем массив из localstorage
      const data = JSON.parse(localStorage.getItem("data"));

      // Перезаписываем старый массив на развернутый старый и развернутый новый, объединенный массив
      localStorage.setItem("data", JSON.stringify([...data, ...array]));

      // Подсчет размера данных в локальном хранилище
      calculateSizeItemsInLocalStorage();
    } else {
      // Если localstorage пуст, устанавливаем новый массив данных
      localStorage.setItem("data", JSON.stringify(array));

      // Подсчет размера данных в локальном хранилище
      calculateSizeItemsInLocalStorage();
    }
  } catch {
    // Если возникает ошибка при установке новых данных
    const data = JSON.parse(localStorage.getItem("data"));

    // Перезаписываем имеющийся массив, отрезав от него первые 10% длины
    localStorage.setItem(
      "data",
      JSON.stringify(data.slice(Math.floor(data.length / 10), data.length))
    );

    // Подсчет размера данных в локальном хранилище
    calculateSizeItemsInLocalStorage();
  }
};

// Подсчет размера данных в локальном хранилище
const calculateSizeItemsInLocalStorage = () => {
  let total = 0;

  // Перебираем все ключи в локальном хранилище и считаем длину
  for (let i in localStorage) {
    if (!localStorage.hasOwnProperty(i)) continue;
    total += localStorage[i].length * 2;
  }

  // Вывод информации о размере в консоль
  console.log(`Объем занятой памяти в localStorage: ${total} КБ`);
  console.log(`Максимальный размер localStorage: ${maxSpaceLocalStorage} КБ`);
};

// Создание нового элемента поста
const createItem = (data) => {
  const item = document.createElement("li");
  item.classList.add("item");

  // Элемент с датой поста
  const date = document.createElement("span");
  date.classList.add("date");
  dateData = new Date(data.date * 1000);
  date.textContent = `${dateData.toLocaleDateString()} ${dateData.toLocaleTimeString(
    [],
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  )}`;

  // В li элемент добавляем span с датой
  item.append(date);

  // Если есть изображение в посте, добавляем его

  if (data.attachments && data.attachments[0] && data.attachments[0].photo) {
    const img = document.createElement("img");
    img.classList.add("img");
    img.src = data.attachments[0].photo.sizes[3].url;

    item.append(img);
  }

  // Элемент с текстом поста
  const text = document.createElement("p");
  text.classList.add("text");
  text.textContent = data.text;

  item.append(text);

  return item;
};

// Добавление элемента на страницу
const addItem = (item) => {
  container.append(createItem(item));
};

// Функция для запроса постов из VK
const fetchPosts = () =>
  VK.Api.call(
    "wall.get",
    {
      owner_id: -29573241, // id сообщества VK
      domain: "nrmusicru",
      count: count, // Количество записей
      offset: offset,
      access_token: token,
      v: 5.131,
    },
    (res) => {
      // Устанавливаем полученные посты в локальное хранилище
      setItemsInLocalStorage(res.response.items);

      // Увеличиваем отступ для следующей загрузки
      offset += count;

      // Добавляем новые элементы на страницу
      res.response.items.forEach((item) => addItem(item));

      // Запускаем наблюдателя за новым (последним) элементом
      observer.observe(document.querySelector(".item:last-child"));
    }
  );

// Начальная функция, проверяющая наличие данных в localStorage
const setItems = () => {
  setTimeout(fetchPosts, 300);
  if (localStorage.getItem("data")) {
    const data = JSON.parse(localStorage.getItem("data"));

    // Добавляем существующие элементы на страницу
    data.forEach((item) => addItem(item));

    // Запускаем наблюдателя за новым (последним) элементом
    observer.observe(document.querySelector(".item:last-child"));
  } else {
    // Если localstorage пуст, делаем запрос на получение данных
    fetchPosts();
  }
  console.log("Функция setItems вызвана");
};

document.addEventListener("DOMContentLoaded", setItems);
