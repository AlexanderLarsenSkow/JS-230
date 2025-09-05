// Add an onclick to the element we just worked with.

let hiddenText = document.getElementById('notice');

hiddenText.onclick = function(e) {
  this.className = 'hidden';
}