/*
Add class stanza to each p except first one.

Add each p to an array

then use an index to add a class with forEach.
*/

let paras = [];

walk(body, node => {
  if (node.nodeName === 'P') {
    paras.push(node);
  }
});

paras.forEach((pNode, index) => {
  if (index !== 0) {
    pNode.classList.add('stanza');
  }
})

paras.forEach(pNode => console.log(pNode.className)); // nothing, stanza, stanza, stanza, stanza 