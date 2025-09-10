document.addEventListener('DOMContentLoaded', () => {
  let textField = document.querySelector('.text-field');
  let content = document.querySelector('.content');
  let intervalId;

  textField.addEventListener('click', event => {
    event.stopPropagation();

    if (!intervalId) {
      intervalId = setInterval(() => {
        textField.classList.toggle('cursor');
      }, 500);
    }

    event.currentTarget.classList.add('focused');
  });

  function isBackspace(key) {
    return key === 'Backspace';
  }

  function isShiftOrBackspace(key) {
    return key === 'Shift' || isBackspace(key);
  }

  document.addEventListener('keydown', event => {
    let key = event.key;
    if (textField.classList.contains('focused') && !isShiftOrBackspace(key)) {
      if (key.length === 1) content.textContent += key;
    }

    if (isBackspace(key)) {
      content.textContent = content.textContent.slice(0, -1);
    }
  });

  document.addEventListener('click', () => {
    textField.classList.remove('focused');
    textField.classList.remove('cursor');

    clearInterval(intervalId);
    intervalId = null;
  });
});