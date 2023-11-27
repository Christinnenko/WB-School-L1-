// Разработайте страницу, отображающую таблицу с данными. Данные необходимо подгружать из этого источника.

// Требования:
// данные должны загружаться при загрузке страницы
// необходимо реализовать сортировку по убыванию и по возрастания для всех колонок
// необходимо реализовать клиентскую пагинацию (50 элементов на странице)

document.addEventListener("DOMContentLoaded", function () {
  // Инициализация переменных для управления данными и пагинацией
  var dataPerPage = 50;
  var currentPage = 1;
  var totalData;
  var data;
  var sortColumn;
  var sortDirection = "asc";

  // Загрузка данных при загрузке страницы
  loadData();

  // Функция для загрузки данных с сервера
  function loadData() {
    var xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      "http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D",
      true
    );
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        data = JSON.parse(xhr.responseText);
        totalData = data.length;
        renderTable();
        renderPagination();
      }
    };
    xhr.send();
  }

  // Функция для отображения таблицы
  function renderTable() {
    var table = document.getElementById("data-table");
    table.innerHTML = "";

    // Рассчитываем начало и конец текущей страницы
    var startIndex = (currentPage - 1) * dataPerPage;
    var endIndex = Math.min(startIndex + dataPerPage, totalData);

    // Заголовок таблицы
    var headerRow = "<tr>";
    for (var key in data[0]) {
      headerRow += '<th data-key="' + key + '">' + key + "</th>";
    }
    headerRow += "</tr>";
    table.innerHTML += headerRow;

    // Данные таблицы
    for (var i = startIndex; i < endIndex; i++) {
      var row = "<tr>";
      for (var key in data[i]) {
        row += "<td>" + data[i][key] + "</td>";
      }
      row += "</tr>";
      table.innerHTML += row;
    }

    // Добавляем обработчики для сортировки
    var thElements = document.getElementsByTagName("th");
    for (var i = 0; i < thElements.length; i++) {
      thElements[i].addEventListener("click", function () {
        var clickedColumn = this.getAttribute("data-key");

        if (sortColumn === clickedColumn) {
          // Меняем направление сортировки, если кликнута та же колонка
          sortDirection = sortDirection === "asc" ? "desc" : "asc";
        } else {
          // Если кликнута новая колонка, сбрасываем направление
          sortDirection = "asc";
        }

        sortColumn = clickedColumn;
        sortData();
        renderTable();
      });
    }
  }

  // Функция для сортировки данных
  function sortData() {
    data.sort(function (a, b) {
      var x = a[sortColumn];
      var y = b[sortColumn];

      if (typeof x === "string" && typeof y === "string") {
        return sortDirection === "asc"
          ? x.localeCompare(y)
          : y.localeCompare(x);
      } else if (typeof x === "number" && typeof y === "number") {
        return sortDirection === "asc" ? x - y : y - x;
      }

      // Дополнительные проверки для других типов данных
      // ...

      return 0; // По умолчанию
    });
  }

  // Функция для отображения пагинации
  function renderPagination() {
    var totalPages = Math.ceil(totalData / dataPerPage);
    var paginationElement = document.getElementById("pagination");
    paginationElement.innerHTML = "";

    // Создаем кнопки для каждой страницы
    for (var i = 1; i <= totalPages; i++) {
      var pageBtn = document.createElement("span");
      pageBtn.innerText = i;
      pageBtn.classList.add("page-btn");

      // Добавляем обработчик для кнопки страницы
      pageBtn.addEventListener("click", function () {
        currentPage = parseInt(this.innerText);
        renderTable();
      });

      paginationElement.appendChild(pageBtn);
    }
  }
});