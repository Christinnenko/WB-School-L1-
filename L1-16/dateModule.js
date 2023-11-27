// Подключаем Moment.js через CDN в dateModule.js
import moment from "https://cdn.skypack.dev/moment";

// Функция для форматирования текущей даты
export function getCurrentDateFormatted() {
  return moment().format("YYYY-MM-DD HH:mm:ss");
}

// Функция для добавления дней к указанной дате
export function addDaysToDate(date, days) {
  return moment(date).add(days, "days").format("YYYY-MM-DD");
}
