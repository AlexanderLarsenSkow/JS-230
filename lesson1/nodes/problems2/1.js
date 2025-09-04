// Using polar bear wiki

// count h2 elements

// Method 1
// let h2Group = document.querySelectorAll('h2');
// console.log(h2Group.length); // 16

// Method 2

// let h2Group = document.body.getElementsByTagName('h2');
// console.log(h2Group.length); // 16

// Method 3: Manual

function walk(node, callback) {
  callback(node);

  for (let i = 0; i < node.childNodes.length; i += 1) {
    walk(node.childNodes[i], callback);
  }
}

let h2Group = [];

walk(document.body, node => {
  if (node.nodeName === 'H2') {
    h2Group.push(node);
  }
})

console.log(h2Group.length);