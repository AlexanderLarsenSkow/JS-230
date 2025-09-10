document.addEventListener('DOMContentLoaded', () => {
  let elem1 = document.querySelector('#elem1');
  let elem4 = document.querySelector('#elem4');

  elem1.addEventListener('click', event => {
    alert('Elem1 listener triggered!');
  });

  elem4.addEventListener('click', event => {
    alert('Elem4 Listener Triggered!');
  });
});