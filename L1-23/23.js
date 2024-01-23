// Анализатор сложности пароля: создайте функцию, которая оценивает сложность введенного пользователем пароля.
// Необходимо анализировать длину пароля, использование различных символов, наличие чисел и букв в разных регистрах.
// Выведите пользователю оценку сложности пароля и предложите улучшения, если пароль слишком слабый.

function analyzePassword() {
  // Получение значения пароля из элемента с id "password" на веб-странице
  const password = document.getElementById("password").value;

  // Внутренняя функция для расчета сложности пароля
  function calculatePasswordStrength(password) {
    const minLength = 8;

    // Оценки для различных аспектов пароля (длина, наличие цифр, регистр символов)
    const lengthScore = password.length >= minLength ? 2 : 0;
    const specialCharScore = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)
      ? 2
      : 0;
    const digitScore = /\d/.test(password) ? 2 : 0;
    const lowerCaseScore = /\p{Ll}/u.test(password) ? 1 : 0;
    const upperCaseScore = /\p{Lu}/u.test(password) ? 1 : 0;

    // Общая оценка сложности пароля
    const totalScore =
      lengthScore +
      specialCharScore +
      digitScore +
      lowerCaseScore +
      upperCaseScore;

    // Уровень сложности пароля
    let complexity;

    if (totalScore <= 4) {
      complexity = "Слабый уровень защиты";
    } else if (totalScore < 7) {
      complexity = "Средний уровень защиты";
    } else {
      complexity = "Высокий уровень защиты";
    }

    // Советы по улучшению пароля (если у пароля "Слабый уровень защиты")
    const suggestions = [];

    if (totalScore <= 4) {
      if (lengthScore === 0) {
        suggestions.push("Увеличьте длину пароля (минимум 8 символов)");
      }
      if (specialCharScore === 0) {
        suggestions.push(
          "Добавьте символы в пароль (Например, ! @ # $ % ^ & * ( ) _ + { } [ ] : ; < > , . ? ~  / -)"
        );
      }
      if (digitScore === 0) {
        suggestions.push("Добавьте цифры в пароль");
      }
      if (lowerCaseScore === 0 || upperCaseScore === 0) {
        suggestions.push("Используйте буквы в разных регистрах");
      }
    }

    return {
      complexity,
      suggestions,
    };
  }

  // Вызов внутренней функции для расчета сложности пароля
  const result = calculatePasswordStrength(password);

  // Обновление содержимого элемента с id "result" на веб-странице
  document.getElementById(
    "result"
  ).innerHTML = `Уровень защиты: ${result.complexity}`;

  // Отображение советов по улучшению пароля в виде списка
  const suggestionsList = document.getElementById("suggestions");
  suggestionsList.innerHTML = "";
  result.suggestions.forEach((suggestion) => {
    const listItem = document.createElement("li");
    listItem.textContent = suggestion;
    suggestionsList.appendChild(listItem);
  });
}
