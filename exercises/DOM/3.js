/*
input: element id
output: 2d Array

Rules:
  - given id of element, return 2d array of DOM tree for element
  - first subarr contains element and any siblings
  - second subarr contains parent and its siblings
  - Continue all the way up to the top grandparent
  - subarr

  - if parent element is the body, then stop.

Examples:
  > domTreeTracer(1);
= [["ARTICLE"]]
> domTreeTracer(2);
= [["HEADER", "MAIN", "FOOTER"], ["ARTICLE"]]
> domTreeTracer(22);
= [["A"], ["STRONG"], ["SPAN", "SPAN"], ["P", "P"], ["SECTION", "SECTION"], ["HEADER", "MAIN", "FOOTER"], ["ARTICLE"]]

Data Structures:
  start at the element with input id and work up.
  getElementById

  if the current node is ever equal to document.body, then we exit and return the array.
  if not, then take the parentElement and all the children. 
  transform into an array, then transform into an array of nodeNames.
  add to the main array.

  repeat until the body.
*/

function domTreeTracer(id) {
  let bottomElement = document.getElementById(id);
  let node = bottomElement;
  let tree = [];

  while (node !== document.body) {
    let siblings = node.parentElement.children;
    siblings = Array.from(siblings).map(node => node.nodeName);
    siblings = siblings.filter(name => name !== 'SCRIPT');
    tree.push(siblings);

    node = node.parentElement;
  }

  return tree;
}

domTreeTracer('1');
// domTreeTracer('2');
// domTreeTracer('22');