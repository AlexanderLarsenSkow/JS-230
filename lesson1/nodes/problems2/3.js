// Find the div for the contents section of the wiki article

// Method 1
// let divContents = document.querySelector('div .toc');
// console.log(divContents);

// Method 2
// let divArray = document.getElementsByTagName('div');
// divArray = Array.from(divArray);

// let divContents = divArray.find(divNode => divNode.className === 'toc');
// console.log(divContents);

// Method 3

let divContents = document.getElementById('toc');
console.log(divContents);