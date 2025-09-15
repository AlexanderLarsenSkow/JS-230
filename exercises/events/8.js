/*
input: callback function
output: return new function

Rules:
  - adding events to a tracker object before invoking a callback for the event.
  - return a function that records the event if it hasn't been recorded (add to tracker)
  - executes the callback
  - user clicks in blue, red, orange, green
  - click event

  tracker object:
    - list() returns array of events
    - elements() returns array of targets
    - clear: sets length of list of 0 and elements to 0
*/

let tracker = (function() {
  let list = [];
  let elements = [];

  return {
    add(event) {
      list.push(event);
      elements.push(event.target);
    },
    
    list() {
      return list.slice();
    },

    elements() {
      return elements.slice();
    },

    clear() {
      list.length = 0;
      elements.length = 0;
      return list.length;
    }
  };
})()

document.addEventListener('DOMContentLoaded', () => {
  const divRed = document.querySelector('#red');
  const divBlue = document.querySelector('#blue');
  const divOrange = document.querySelector('#orange');
  const divGreen = document.querySelector('#green');

  function track(callback) {
    return function(event) {
      if (!tracker.list().includes(event)) {
        tracker.add(event);
      }

      callback();
    }
  }

  divRed.addEventListener('click', track(event => {
    document.body.style.background = 'red';
  }));

  divBlue.addEventListener('click', track(event => {
    console.log(event);
    event.stopPropagation();
    document.body.style.background = 'blue';
  }));

  divOrange.addEventListener('click', track(event => {
    document.body.style.background = 'orange';
  }));

  divGreen.addEventListener('click', track(event => {
    document.body.style.background = 'green';
  }));
});