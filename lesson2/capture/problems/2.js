document.addEventListener('DOMContentLoaded', () => {
  let divs = document.querySelectorAll('.pick');

  document.querySelector('.d3').addEventListener('click', highlightThis, false);

  for (let index = 0; index < divs.length; index += 1) {
    divs[index].addEventListener('click', highlightThis, true);
  }

  function highlightThis(e) {
    alert(`${this.className} ${e.currentTarget.tagName}`);
  }
});