document.addEventListener('DOMContentLoaded', () => {
  let elem1 = document.querySelector('#elem1');
  let elem4 = document.getElementById('elem4');

  function alertMessage(event) {
    alert(event.currentTarget.id);
  }

  elem1.addEventListener('click', alertMessage, true);
  elem4.addEventListener('click', alertMessage);
});