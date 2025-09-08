/*
input: none
output: nested array of arrays

Rules:
  - starting at the body, create a nested array structure showcasing the tree of the DOM.
  - The first element of an array should be the tagName of the parent eg BODY
  - The second element should be the children elements in an array.


  walking through the children
  - adding each tagName to an array then adding it to the main array...
  - The hard part of this is just how nested this array can get.


Examples:
  - = ["BODY",[["HEADER",[]],["MAIN",[]],["FOOTER",[]]]]


= ["BODY", [
    ["HEADER", []],
    ["MAIN", []],
    ["FOOTER", []]]]

Data Structures:
  Steps

  add the tagName of the parent into an array
  then: build a new array for the children. That's element 2 of the current array.
  
  Go through the children array. for each one, add the tagName again and children array.

Algo:
  - Create tree array
  - walk through the entire tree of children starting at the body.
  - Add the 
*/

