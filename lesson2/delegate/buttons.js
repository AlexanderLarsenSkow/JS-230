document.addEventListener('DOMContentLoaded', () => {
  function clickHandler(event) {
    let message = document.getElementById('message');
    message.textContent = `${event.target.textContent} was clicked!`;
  }

  let buttons = document.querySelectorAll('button');
  for (let i = 0; i < buttons.length; i += 1) {
    buttons[i].addEventListener('click', clickHandler); 
  }
});