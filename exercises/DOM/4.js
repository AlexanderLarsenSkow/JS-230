/*
  input: startIndex (parent Node id), endIndex (innermost child's id)
  output: array of tagNames (strings)

  Rules:
    - sliceTree
    - this is inclusive of the last element.
    - the end index doesn't have to be the id of the innermost child ...?
    - element nodes are the only ones that matter
    - only element under body are sliceable
    - if id at start or end is not in DOM, return undefined.
    - if there's no path connecting element at start index to end index, return undefined

  Examples:
    > sliceTree(1, 4);
    = ["ARTICLE", "HEADER", "SPAN", "A"]
    > sliceTree(1, 76); 76 doesn't exist in the tree
    = undefined
    > sliceTree(2, 5);
    = undefined
    > sliceTree(5, 4);
    = undefined
    > sliceTree(1, 23);
    = ["ARTICLE", "FOOTER"]
    > sliceTree(1, 22);
    = ["ARTICLE", "MAIN", "SECTION", "P", "SPAN", "STRONG", "A"]
    > sliceTree(11, 19);
    = ["SECTION", "P", "SPAN", "STRONG", "A"]

  data structures:
    areConnected function
      takes top element and bottom element
        - start at bottom.
        - while the node is not equal to the body, continue up the chain.
        - if the element is ever equal to the top element, return true.
        - else return false if the while loop concludes.

  Algorithm:
    - get top and bottom elements from startIndex and endIndex
    - convert to strings
    - if either the top element or bottom element are falsey values, return undefined.
    - if the top and bottom elements are not connected (HELPER), return undefined

    - create an array
    - start at the top element, continually go down the chain and add each name to
      - going down the chain is tricky
        - because which one do we go down?
        - we only wanna go down IF it is connected to the element we want.

        taking chidlren array, turn into array, then filter based on if the current element is 
          connected to the bottom. Then just take the one, add the name to the array, then
          make it the next node.

      the array until we reach the bottom element.
    - At this point, stop the loop and return the array (should include bottom)
*/

function notConnected(topEl, bottomEl) {
  let currentNode = bottomEl;
  
  while(currentNode !== document.body) {
    if (currentNode === topEl) return false;
      currentNode =  currentNode.parentElement;
  }

  return true;
}

function buildTree(topEl, bottomEl) {
  let tree = [topEl.nodeName];
  let currentNode = topEl;

  while (currentNode !== bottomEl) {
    let children = currentNode.children;
    children = Array.from(children).filter(node => {
      return !notConnected(node, bottomEl);
    });

    currentNode = children[0];
    tree.push(currentNode.nodeName);
  }

  return tree;
}

function sliceTree(startIndex, endIndex) {
  [startIndex, endIndex] = [String(startIndex), String(endIndex)];
  let topEl = document.getElementById(startIndex);
  let bottomEl = document.getElementById(endIndex);

  if (!topEl || !bottomEl || notConnected(topEl, bottomEl)) return undefined;

  return buildTree(topEl, bottomEl);
}