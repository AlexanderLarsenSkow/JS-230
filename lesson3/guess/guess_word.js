class Game {
  static MAX_GUESSES = 6;
  static words = ['banana', 'apple', 'pear', 'pizza'];

  constructor() {
    this.#checkforMoreGames();
    this.word = this.getRandomWord();
    this.letters = this.word.split('');
    this.guessLetters = this.getGuessLetters();
    this.guesses = [];

    this.guessCount = 0;
    this.correctGuesses = 0;
    this.incorrectGuesses = 0;
  }

  getRandomWord() {
    let words = Game.words;
    if (words.length === 0) return undefined;
    
    let randomIndex = Math.floor(Math.random() * words.length);
    return words.splice(randomIndex, 1)[0];
  }

  getGuessLetters() {
    let letters = this.letters;
    return letters.map(() => '');
  }

  static notALetter(letter) {
    return letter < 'a' && letter > 'z';
  }

  makeGuess(guess) {
    guess = guess.toLowerCase();

    let [letters, guessLetters] = [this.letters, this.guessLetters];
    let oldGuesses = this.guesses;
    if (oldGuesses.includes(guess)) return null;
    
    this.#checkLetters(letters, guessLetters, guess);
    this.#increaseCounts(letters, guess);

    oldGuesses.push(guess);
  }

  playerWon() {
    return this.letters.join('') === this.guessLetters.join('');
  }

  playerLost() {
    return this.incorrectGuesses === Game.MAX_GUESSES;
  }

  isGameOver() {
    return this.playerWon() || this.playerLost();
  }

  noMoreWords() {
    return Game.words.length === 0;
  }

  showState() {
    let word = this.letters.join(', ');
    let guessLetters = this.guessLetters.join(', ');
    let oldGuesses = this.guesses.join(', ');

    let incorrect = this.incorrectGuesses;
    let hasWon = this.playerWon();
    let hasLost = this.playerLost();

    return {
      word,
      guessLetters,
      oldGuesses,
      incorrect,
      hasWon,
      hasLost,
    }
  }

  #checkforMoreGames() {
    if (this.noMoreWords()) {
      throw new Error('There are no more words to play the game!');
    }
  }

  #checkLetters(letters, guessLetters, guess) {
    letters.forEach((letter, index) => {
      if (guess === letter) {
        guessLetters[index] = guess;
      }
    });
  } 

  #increaseCounts(letters, guess) {
    if (letters.includes(guess)) {
      this.correctGuesses += 1;
    } else {
      this.incorrectGuesses += 1;
    }

    this.guessCount += 1;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const correctLetters = document.querySelector('#spaces');
  const guessedLetters = document.querySelector('#guesses');
  const message = document.querySelector('#message');
  const replay = document.querySelector('#replay a');
  const appleImg = document.querySelector('#apples');

  let newGame;
  let word;
  let incorrectCount;

  function createSpan(key) {
    let span = document.createElement('span');
    span.textContent = key ? key : '';

    return span;
  }

  function removeSpans(parent) {
    let children = Array.from(parent.children);

    children.forEach(element => {
      if (element.tagName === 'SPAN') {
        element.remove();
      }
    });
  }

  function initialize() {
    removeSpans(correctLetters);
    removeSpans(guessedLetters);

    newGame = new Game();
    word = newGame.guessLetters;
    incorrectCount = newGame.incorrectGuesses;

    for (let count = 0; count < word.length; count += 1) {
      let span = createSpan();
      correctLetters.appendChild(span);
    }

    replay.className = 'hidden';
    message.textContent = '';
    appleImg.className = '';

    document.addEventListener('keyup', keyEventHandler);
  }

  function addToGuesses(key) {
    guessedLetters.appendChild(createSpan(key));
  }

  function addToWord(key) {
    let guessesChildren = Array.from(correctLetters.children);
    let wordSpaces = guessesChildren.filter(el => el.tagName === 'SPAN');

    word.forEach((letter, index) => {
      if (letter === key) {
        wordSpaces[index].textContent = key;
      }
    });
  }

  function removeApple() {
    if (incorrectCount < newGame.incorrectGuesses) {
      incorrectCount += 1;

      appleImg.className = `guess_${incorrectCount}`;
    }
  }

  function gameIsOver() {
    return newGame.isGameOver();
  }

  function endGame() {
    if (newGame.playerWon()) {
      message.textContent = 'Congratulations! You won the game!';
    } else {
      message.textContent = 'Oh no! You ran out of guesses!';
    }

    replay.className = 'visible';
    document.removeEventListener('keyup', keyEventHandler);
  }

  function keyEventHandler(event) {
    let key = event.key;
    if (key >= 'a' && key <= 'z') {
      if (newGame.makeGuess(key) === null) return;

      addToGuesses(key);
      addToWord(key);
      removeApple();
    }
  }

  initialize();

  const config = { attributes: true, childList: true, subtree: true };
  let observer = new MutationObserver(() => {
    if (gameIsOver()) {
      endGame();
    }
  });

  observer.observe(guessedLetters, config);

  document.querySelector('a').addEventListener('click', () => {
    try {
      initialize();
    } catch(e) {
      alert('There are no more words available. Thanks for playing!');
    }
  });
});
