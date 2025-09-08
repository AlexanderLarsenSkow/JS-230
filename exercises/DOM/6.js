/*
input: 2 element ids, integers
output: returns true if swap is successful and undefined if invalid

Rules:
  - invalid swap: if an id doesn't exist
  - invalid: one element is a child of the other
  - a swap only works if they're at the same level... This is probably easier to achieve.
  - check if they have the same parent element.

  - swap: they take each other's positions.

Data Structures:
  how do you swap them? insertAdjacentElement
  clone both, put the new one where the old one was.
  Then remove both of the originals.


Algorithm:
  - get the elements by their id
  - if the elements don't exist and don't have teh same parent element, return undefined
  - If they do exist, clone both elements.
  - insert the clone of element1 before element2 begins.
  - remove element 2.
  - insert the clone of element2 before element1 begins.
  - remove element1.
  - return true.

  HELPER to simplify logic: takes clone, targetEl, and elementToRemove
    - insert the clone before the targetEl.
    - Remove the elementToRemove
*/

function insertBefore(clone, target) {
  target.insertAdjacentElement('beforebegin', clone);
  target.remove();
}

function nodeSwap(id1, id2) {
  let el1 = document.getElementById(String(id1));
  let el2 = document.getElementById(String(id2));

  if (!el1 || !el2 || el1.parentElement !== el2.parentElement) {
    return undefined;
  }

  let [clone1, clone2] = [el1.cloneNode(true), el2.cloneNode(true)];
  insertBefore(clone1, el2);
  insertBefore(clone2, el1);

  return true;
}