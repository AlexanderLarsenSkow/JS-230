// First way with getElementsByTagName

// function pTags(document) {
//   return document.getElementsByTagName('p');
// }

// pTags(document);

// Hard Way

function pTags(document) {
  let body = document.querySelector('body');
  let nodes = body.childNodes;

  const pGroup = [];

  for (let i = 0; i < nodes.length; i += 1) {
    if (nodes[i] instanceof HTMLParagraphElement) {
      pGroup.push(nodes[i]);
    }
  }

  return pGroup;
}