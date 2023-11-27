// Задача на классы и наследование: создайте базовый класс Shape (фигура),
// который имеет методы для расчета площади и периметра. Затем создайте подклассы,
// представляющие различные фигуры, такие как прямоугольник, круг и треугольник.
// Реализуйте методы расчета площади и периметра для каждой фигуры.

class Shape {
  // Приватные методы для вычисления площади и периметра
  _calculateSquare = (square) => {
    console.log(`Площадь ${this.name}а равна ${square}`);
  };

  _calculatePerimeter = (perimeter) => {
    console.log(`Периметр ${this.name}а равен ${perimeter}`);
  };
}

class Rectangle extends Shape {
  // Указание имени фигуры
  name = "прямоугольник";

  // Переопределение методов вычисления площади и периметра для прямоугольника
  calculateSquare = (sideA, sideB) => {
    this._calculateSquare(sideA * sideB);
  };

  calculatePerimeter = (sideA, sideB) => {
    this._calculatePerimeter(2 * (sideA + sideB));
  };
}

class Circle extends Shape {
  // Указание имени фигуры
  name = "круг";

  // Переопределение методов вычисления площади и периметра для круга
  calculateSquare = (radius) => {
    this._calculateSquare(Math.round(Math.PI * radius ** 2));
  };

  calculatePerimeter = (radius) => {
    this._calculatePerimeter(Math.round(2 * Math.PI * radius));
  };
}

class Triangle extends Shape {
  // Указание имени фигуры
  name = "треугольник";

  // Переопределение методов вычисления площади и периметра для треугольника
  calculateSquare = (sideA, sideB, sideC) => {
    const S = (sideA + sideB + sideC) / 2;
    this._calculateSquare(
      Math.sqrt(S * (S - sideA) * (S - sideB) * (S - sideC))
    );
  };

  calculatePerimeter = (sideA, sideB, sideC) => {
    this._calculatePerimeter(sideA + sideB + sideC);
  };
}

// Примеры использования:
const rectangle = new Rectangle();
const circle = new Circle();
const triangle = new Triangle();

// Вычисление площади и периметра для каждой фигуры
rectangle.calculateSquare(5, 6);
rectangle.calculatePerimeter(6, 9);

circle.calculateSquare(10);
circle.calculatePerimeter(15);

triangle.calculateSquare(4, 6, 8);
triangle.calculatePerimeter(10, 12, 14);
