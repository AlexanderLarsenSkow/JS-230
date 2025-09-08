// Writing a function that returns 

function walk(node, callback) {
  callback(node);

  for (let i = 0; i < node.childNodes.length; i += 1) {
    walk(node.childNodes[i], callback);
  }
}

// Take the length of childNodes. This is the direct count
// walk through the childNodes. Whenever the parent Node is not equivalent to the input node, add 1.

function nodeCount(node) {
  let nodeTotals = [node.childNodes.length];
  let indirectCount = 0;

  walk(node, child => {
    if (child.parentElement !== node) {
      indirectCount += 1;
    }
  })

  nodeTotals.push(indirectCount);
  return nodeTotals;
}