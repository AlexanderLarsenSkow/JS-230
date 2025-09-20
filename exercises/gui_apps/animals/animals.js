document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');
  let timerCode;

  main.addEventListener('mouseover', event => {
    let element = event.target;

    if (element.tagName === 'IMG') {
      function showFigCap() {
        let {y} = element.getBoundingClientRect();
        let figCap = element.parentElement.querySelector('figcaption');

        figCap.style.opacity = '80%';
        figCap.style.top = `${y + 200 + window.scrollY}px`;
      }

      timerCode = setTimeout(showFigCap, 2000);      
    }
  });

  main.addEventListener('mouseout', event => {
    let element = event.target;

    if (element.tagName === 'IMG') {
      let figCap = element.parentElement.querySelector('figcaption');
      clearTimeout(timerCode);

      figCap.style.opacity = '0';
    }
  });
});