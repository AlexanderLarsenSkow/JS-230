document.addEventListener('DOMContentLoaded', () => {
  let elem1 = document.querySelector('#elem1');

  elem1.addEventListener('click', event => {
    alert(event.target.tagName);
  });

  elem1.addEventListener('click', event => {
    alert(event.currentTarget.tagName);
  });
});

// When clicking on the box 4, the listener on elem1 that shows the target's tagName (the clicked
  // element) will show first.
// Then the elem1 alert message will show (currentTarget is always where the listener is added to.)

// They occur at the end of the bubble phase.