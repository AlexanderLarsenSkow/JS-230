document.addEventListener('DOMContentLoaded', () => {
  let sectionElement = document.querySelector('section');

  function makeBold(el) {
    el.style.fontWeight = 'bold';
    const event = new CustomEvent('bolded');

    el.dispatchEvent(event);
  }
  
  sectionElement.addEventListener('bolded', event => {
    alert(event.target.tagName);
    event.target.classList.add('highlight');
  });

  makeBold(sectionElement);

  console.log(sectionElement.classList.contains('highlight'));
  console.log(sectionElement.style.fontWeight === 'bold');
});