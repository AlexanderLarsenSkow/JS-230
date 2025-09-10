document.addEventListener('DOMContentLoaded', () => {
  let elem1 = document.querySelector('#elem1');

  elem1.addEventListener('click', event => {
    alert('bubbling');
  });

  elem1.addEventListener('click', event => {
    alert('capturing');
  }, true);
});