/*
  input: parentElement, selector, eventType, callback
  output: true if eventListener added / undefined if not

  Rules:
    - Find the element with the parentElement and selector
    - if it exists, add an eventListener with eventType as its event type,
    - the callback is the function passed in.
    - return true.
    - else, return undefined

  Examples:
    - parentEl: section
    - selector: p
    then delegates eventType on p in section to function callback
*/

document.addEventListener('DOMContentLoaded', () => {
  const element1 = document.querySelector('table');
  const element2 = document.querySelector('main h1');
  const element3 = document.querySelector('main');

  const callback = ({target, currentTarget}) => {
    alert(`Target: ${target.tagName}\nCurrent Target: ${currentTarget.tagName}`);
  };

  function isSelector(selector, {target}) {
    return target.matches(selector)
  }

  function delegateEvent(element, selector, eventType, callback) {
    if (!element) return undefined;

    element.addEventListener(eventType, e => {
      if (isSelector(selector, e)) {
        callback(e);
      }
    });

    return true;
  }

  // let func = delegateEvent(element1, 'p', 'click', callback);
  // let func = delegateEvent(element2, 'p', 'click', callback);
  // let func = delegateEvent(element2, 'h1', 'click', callback);
  // let func = delegateEvent(element3, 'h1', 'click', callback);
  // let func = delegateEvent(element3, 'aside p', 'click', callback);
  let func = delegateEvent(element2, 'p', 'click', callback);
  console.log(`The function returned ${func}`);

  const newP = document.createElement('P');
  const newContent = document.createTextNode('New Paragraph');
  newP.appendChild(newContent);

  element2.appendChild(newP);
});