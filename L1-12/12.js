// Задача на работу с объектами: создайте объект, представляющий собой книгу.
// Объект должен иметь свойства, такие как: название книги, автор и год издания.
// Напишите методы для получения и изменения значений свойств книги.

const book = {
  title: "Harry Potter and the Sorcerer's Stone",
  author: "Joanne Rowling",
  year: 1997,

  // Метод для получения названия книги
  getTitle: function () {
    return this.title;
  },

  // Метод для получения автора книги
  getAuthor: function () {
    return this.author;
  },

  // Метод для изменения года издания книги
  setYear: function (newYear) {
    this.year = newYear;
  },

  // Метод для изменения названия книги
  setTitle: function (newTitle) {
    this.title = newTitle;
  },

  // Метод для изменения автора книги
  setAuthor: function (newAuthor) {
    this.author = newAuthor;
  },

  // Метод для получения года издания книги
  getYear: function () {
    return this.year;
  },
};

// Пример использования методов
console.log("Title:", book.getTitle());
console.log("Author:", book.getAuthor());
console.log("Year:", book.getYear());

// Изменяем значения свойств
book.setTitle("A Study in Scarlet");
book.setAuthor("Conan Doyle");
book.setYear(1887);

console.log(book.getTitle());
console.log(book.getAuthor());
console.log(book.getYear());
