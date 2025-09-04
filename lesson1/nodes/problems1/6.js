walk(document, node => {
  if (node.nodeName === 'A') {
    node.style.color = 'red';
  }
});