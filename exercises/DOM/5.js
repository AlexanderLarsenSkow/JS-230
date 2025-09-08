// take a count of parent Elements up to the body
// if it matches the input number, change the class to generation-color

let script = document.querySelector('script');
document.body.removeChild(script);

function matchesIndent(element, indentCount) {
  let count = 0;
  let node = element;

  while (node !== document.body) {
    count += 1;
    node = node.parentElement;
  }

  return count === indentCount;
}

function walk(el, callback) {
  callback(el)

  for (let i = 0; i < el.children.length; i += 1) {
    walk(el.children[i], callback);
  }
}

function colorGeneration(indentCount) {
  walk(document.body, el => {
    if (matchesIndent(el, indentCount)) {
      el.classList.add('generation-color');
    }
  })
}