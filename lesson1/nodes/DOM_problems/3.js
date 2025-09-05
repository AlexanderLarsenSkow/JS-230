// toggling for the hidden element

let link = document.getElementById('toggle');
let hiddenText = document.getElementById('notice');

link.onclick = function(e) {
  e.preventDefault();
  if (hiddenText.className === 'hidden') {
    hiddenText.className = 'visible';
  } else {
    hiddenText.className = 'hidden';
  }
};
