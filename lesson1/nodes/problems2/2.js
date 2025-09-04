// Get a word count of all the h2 headings.

// This a total Word Count:

let h2Group = document.querySelectorAll('h2');
h2Group = Array.from(h2Group);

// let totalWords = h2Group.reduce((acc, node) => {
//   return acc += node.textContent.split(' ').length;
// }, 0);

// console.log(totalWords);

// This is an array that has word counts:

console.log(h2Group.map(node => node.textContent.split(' ').length));