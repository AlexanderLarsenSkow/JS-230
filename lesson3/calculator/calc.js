const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

document.addEventListener('DOMContentLoaded', () => {
  const numbers = document.querySelectorAll('input[type="number"]');
  
  const [numInput1, numInput2] = numbers;
  const answer = document.querySelector('main h1');
  const operatorInput = document.querySelector('select');
  const form = document.querySelector('form');

  form.addEventListener('submit', event => {
    event.preventDefault();
    let result;
    let [num1, num2] = [parseInt(numInput1.value), parseInt(numInput2.value)];

    switch (operatorInput.value) {
      case 'plus':
        result = add(num1, num2);
        break;
      case 'minus':
        result = subtract(num1, num2);
        break;
      case 'multiply':
        result = multiply(num1, num2);
        break;
      case 'divide':
        result = divide(num1, num2);
    }

    answer.textContent = result;
  });
});