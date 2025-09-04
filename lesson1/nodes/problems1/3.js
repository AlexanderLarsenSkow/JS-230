function firstWord (sentence) {
  sentence = sentence.trim();
  let words = sentence.split(' ');
  return words[0];
}

let firstWords = [];

walk(body, node => {
  if (node.nodeName === 'P') {
    let first = firstWord(node.textContent);
    firstWords.push(first);
  }
})

console.log(firstWords); // ['A', 'The', 'The', 'Where', 'And']