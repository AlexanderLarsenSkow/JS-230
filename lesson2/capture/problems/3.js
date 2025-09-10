document.addEventListener('DOMContentLoaded', () => {
  let elem0 = document.querySelector('#elem0');
  let elem1 = document.getElementById('elem1');
  let elem4 = document.querySelector('#elem4');

  [elem0, elem4].forEach(el => el.addEventListener('click', event => {
    alert(event.currentTarget.id);
  }))

  elem1.addEventListener('click', event => {
    alert(event.currentTarget.id);
  }, true);
});