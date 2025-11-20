/*
  Rules:
    Calc has two parts:

      screen that has a lower part:
        - entry window, the number being entered OR the result
        - upper part, the operation window, shows the operation in progress.

      Calc Digits:
        - 0 - 9
        - . + - / * % NEG C CE
        - NEG converts to a negative or vica versa
        - CE clears entry window and replaces with 0
        - C button clears both entry and operation window and leaves 0 in entry window.

      Operation Logic Rules:
        - When user clicks digit button, add number to entry. If 0, replace 0 with the digit
        - When user clicks operator button, copy current entry and operator into operation window
          - set entry window to 0
        - when clicking = button, use the operation window and current entry to calculate the final result.


   Example:
    - 10 + 10 * 5 - 3
    
    => 10 + 10 => 20
      20 * 5 => 100
      100 - 3 => 97

      accumulator => 10 => 20 => 100 => 97

Data Structure:
  - create a data structure like this: ['10 + 10', ' * 5', ]

Plan:
  addToEntryWindow
  addToOperationWindow
  clearEntryWindow
  clearOperationWindow

  neg => place a - in front of the number.



  [10, 10, 5, 3]
  operators ['+', '*', '-']
*/

// console.log(determineOperation('*', 10, 10));

// let numbers = [10, 10, 5, 3];
// let operators = ['+', '*', '-'];

// let firstNumber = numbers.shift();
// console.log(firstNumber, numbers);

// console.log(numbers.reduce((acc, number, index) => {
//   let operator = operators[index];

//   return determineOperation(operator, acc, number);
// }, firstNumber));

/*
  parse it based on numbers and on operations
  '111 + 6 x 10'

  {
    numbers: [111, 6, 10],
    operators: ['+', 'x']
  }

  regex: potential for numbers to have a . -?\d+.{0,1}
*/
// let operation = '111 + -6 x 10.1 % / - ';

// const numberRegex = /-?\d+.?\d*/g;
// console.log(operation.match(numberRegex));

// const operatorRegex = /[+x/%-] /g;
// console.log(operation.match(operatorRegex));

const add = (a, b) => a + b;
const multiply = (a, b) => a * b;
const subtract = (a, b) => a - b;
const divide = (a, b) => a / b;

class Calculator {
  constructor(operation, entry) {
    this.equation = operation + ` ${entry}`;
  }

  calculate() {
    let {numbers, operators} = this.parseEquation();
    let firstNumber = numbers.shift();

    return numbers.reduce((accumulator, number, index) => {
      let operator = operators[index];
      return this.determineOperation(operator, accumulator, number);
    }, firstNumber);
  }

  parseEquation() {
    const numberRegex = /-?\d+.?\d*/g;
    const operatorRegex = /[+x/%-] /g;

    let numbers = this.equation.match(numberRegex).map(Number);
    let operators = this.equation.match(operatorRegex)
                                  .map(op => op.trim());

    return {
      numbers,
      operators,
    };
  }

  determineOperation(operatorString, a, b) {
    switch(operatorString) {
      case '+':
        return add(a, b);
      case 'x':
        return multiply(a, b);
      case '-':
        return subtract(a, b);
      case '/':
        return divide(a, b);
    }
  }
}

class CalculatorInteractions {
  constructor() {
    this.entry = '0';
    this.operation = '';
  }

  solve() {
    const calculator = new Calculator(this.operation, this.entry);
    this.entry = String(calculator.calculate());
    this.operation = '';
  }

  addToEntryWindow(digit) {
    this.entry === '0' ? this.entry = digit : this.entry += digit;
  }

  addToOperationWindow(operator) {
    let space = this.operation ? ' ' : '';

    this.operation += `${space}${this.entry} ${operator}`;
    this.entry = '0';
  }

  clearEntryWindow() {
    this.entry = '0';
  }

  clearOperationWindow() {
    this.operation = '';
  }

  reverseSign() {
    let number = Number(this.entry);
    let reverse = -number;
    this.entry = String(reverse);
  }
 }

 let calc = new CalculatorInteractions();
 calc.addToEntryWindow('1');
 console.log(calc.entry == '1');
 calc.addToEntryWindow('1');
 console.log(calc.entry === '11');
 calc.addToEntryWindow('1');
 console.log(calc.entry === '111');
 
calc.addToOperationWindow('+');
console.log(calc.operation === '111 +');
console.log(calc.entry === '0');

calc.addToEntryWindow('6');
calc.reverseSign();
console.log(calc.entry === '-6');

calc.reverseSign();
console.log(calc.entry === '6');

calc.addToOperationWindow('x');
console.log(calc.operation === '111 + 6 x');

calc.addToEntryWindow('1');
calc.addToEntryWindow('0');
console.log(calc.entry === '10');

calc.solve();
console.log(calc.entry === '1170');
console.log(calc.operation === '');

document.addEventListener('DOMContentLoaded', () => {
  console.log('hello');
});