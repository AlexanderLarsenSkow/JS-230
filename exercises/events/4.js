document.addEventListener('DOMContentLoaded', () => {
  let sub = document.querySelector('#sub');

  document.addEventListener('contextmenu', event => {
    event.preventDefault();
    let name;

    if (event.target === sub) {
      name = sub.id;
    } else {
      name = event.target.tagName;
    }

    alert(name.toLowerCase());
  });
});