// Method 1

// function addArticleTextClass(document) {
//   const pGroup = document.getElementsByTagName('p');
//   for (let i = 0; i < pGroup.length; i += 1) {
//     pGroup[i].classList.add('article-text');
//   }
// }

// addArticleTextClass(document);

// Method 2

function walk(node, callback) {
  callback(node);
  
  for (let i = 0; i < node.childNodes.length; i += 1) {
    walk(node.childNodes[i], callback);
  }
}

function addArticleTextClass(document) {
  const body = document.querySelector('body');
  walk(body, node => {
    if (node.nodeName === 'P') {
      node.classList.add('article-text');
    }
  })
}

addArticleTextClass(document);
