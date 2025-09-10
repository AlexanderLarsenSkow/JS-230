document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('button').addEventListener('click', event => {
    event.preventDefault();
    alert('Following the link was prevented!');
  });

  document.querySelector('a').addEventListener('click', event => {
    event.stopPropagation();
    alert('Click event on the anchor tag')
  }, true);
});