// using 2.html as the template

function walk(node, callback) {
  callback(node);

  for (let index = 0; index < node.childNodes.length; index += 1) {
    walk(node.childNodes[index], callback);
  }
}

function getElementsByTagName(tagName) {
  const matches = [];
  const body = document.body;

  walk(body, node => {
    if (tagName === node.nodeName.toLowerCase()) {
      matches.push(node);
    }
  })

  return matches;
}

function addArticleClass() {
 const pGroup = getElementsByTagName('p');
 for (let i = 0; i < pGroup.length; i += 1) {
  pGroup[i].classList.add('article-text');
 }
}

addArticleClass();