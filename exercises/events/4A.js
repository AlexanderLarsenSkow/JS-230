document.addEventListener('DOMContentLoaded', () => {
  let sub = document.querySelector('#sub');
  let main = document.querySelector('main');

  main.addEventListener('contextmenu', event => {
    event.preventDefault();
    alert(event.currentTarget.tagName.toLowerCase());
  });

  sub.addEventListener('contextmenu', event => {
    event.preventDefault();
    event.stopPropagation();
    alert(event.currentTarget.id);
  });
});