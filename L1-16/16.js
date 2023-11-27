// Задача на модули и использование внешних библиотек: напишите модуль,
// который экспортирует функцию для работы с датами. Внутри модуля используйте внешнюю библиотеку Moment.js для удобной работы с датами.

// Импортируем функции из dateModule.js в 16.js
import { getCurrentDateFormatted, addDaysToDate } from "./dateModule.js";

// Используем функции из модуля
const currentFormattedDate = getCurrentDateFormatted();
console.log("Current formatted date:", currentFormattedDate);

const inputDate = "2023-11-27";
const newDateAfterAddingDays = addDaysToDate(inputDate, 5);
console.log("New date after adding 5 days:", newDateAfterAddingDays);
