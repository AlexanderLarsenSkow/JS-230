let thumbs = document.querySelectorAll('.thumbcaption');
thumbs = Array.from(thumbs);

let captions = thumbs.map(node => node.textContent);
console.log(captions);