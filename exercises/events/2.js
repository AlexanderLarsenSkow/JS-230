document.addEventListener('DOMContentLoaded', () => {
  let sectionElement = document.querySelector('section');

  function makeBold(element, callback) {
    element.style.fontWeight = 'bold';
    callback(element);
  }

  makeBold(sectionElement, function(elem) {
    elem.classList.add('highlight');
  });

  console.log(sectionElement.classList.contains('highlight'));
  console.log(sectionElement.style.fontWeight === 'bold');
});
