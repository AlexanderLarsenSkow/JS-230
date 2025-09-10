function randomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

document.addEventListener('DOMContentLoaded', () => {
  let input = document.querySelector('#guess');
  let form = document.querySelector('form');
  let p = document.querySelector('p');
  let link = document.querySelector('a');
  let button = document.querySelector("input[type='submit']");
  let answer;
  let guessCount;

  function newGame() {
    answer = randomNumber();
    guessCount = 0;

    p.textContent = 'Guess a number between 1 and 100!';    
    enableButton(button);
  }

  function invalidGuess(value) {
    if (!/^\d{1,3}$/.test(value)) return true;
    let int = parseInt(value, 10);

    return int < 1 || int > 100
  }

  function invalidResult(input) {
    p.style.color = 'red';
    p.textContent = `${input} is invalid. Please enter a number between 1 and 100.`;
  }

  function enableButton(button) {
    button.disabled = false;
    button.style.background = 'linear-gradient(to bottom, #CC183E 0%, #780E24 100%)';
    button.style.boxShadow = '0 0 1px 1px #780e24';
  }

  function disableButton(button) {
    button.disabled = true;
    button.style.background = '#eb7088ff';
    button.style.boxShadow = 'black .05em .1em';
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    let guess = input.value;
    let message;

    if (invalidGuess(guess)) {
      invalidResult(guess);
    } else {
      p.style.color = '#16997c';
      guess = parseInt(guess, 10);
      guessCount += 1;

      if (guess === answer) {
        message = `Nice! ${guess} is the right answer! It took ${guessCount} guess${guessCount > 1 ? 'es' : ''}.`
        disableButton(button);
      } else if (guess < answer) {
        message = `My number is higher than ${guess}.`;
      } else {
        message = `My number is lower than ${guess}.`;
      }

      p.textContent = message;
    }
  });

  link.addEventListener('click', event => {
    event.preventDefault();
    newGame();
  });

  newGame();
});