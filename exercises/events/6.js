/*
Notes:
  - user clicks navigation linke (Article 1 - 4),
    - browser scrolls to that article in main => getBoundingClientRect()
    - adds highlight class to it
    - if any other element has highlight class, removes it

    - user clicks on article element or any children
      - add highlight class to it
      - remove highlight from other locations

    - user clicks anywhere else, browser adds highlight to main element
      - remove highlight from other locations

    Use walk to create an array of every html element from the body down.
    filter by highlight => then toggle it off.

    add highlight to required location
*/

const highlight = 'highlight';

function removeHighlight() {
  let highlightEl = document.querySelector(`.${highlight}`);
  return highlightEl ? highlightEl.classList.remove(highlight) : null;
}

document.addEventListener('DOMContentLoaded', () => {
  let navList = document.querySelector('ul');
  let main = document.querySelector('main');

  navList.addEventListener('click', event => {
    event.stopPropagation();

    let link = event.target;
    if (link.tagName !== 'A') return;
    
    let id = link.hash;

    removeHighlight();
    let article = document.querySelector(id);
    article.classList.add(highlight);
  });

  main.addEventListener('click', event => {
    event.stopPropagation();
    removeHighlight();

    if (event.target === main || event.target.tagName === 'H1') {
      main.classList.add(highlight);
    } else {
      let element = event.target.closest('article');
      element.classList.add(highlight);
    }
  });

  document.addEventListener('click', () => {
    removeHighlight();
    main.classList.add(highlight);
  });
});