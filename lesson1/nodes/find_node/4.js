// Using 2.html still

// add article-text to only paragraphs with div class='intro'

/*
  Get all the intro class elements together.
  Iterate through each of them, iterating through their childNodes.
  take the firstChild and add the class to it.
*/

function addArticleClass() {
  const introDivs = document.getElementsByClassName('intro');
  for (let i = 0; i < introDivs.length; i += 1) {
    let currentDiv = introDivs[i];

    for (let j = 0; j < currentDiv.childNodes.length; j += 1) {
      let currentNode = currentDiv.childNodes[j];
      
      if (currentNode instanceof HTMLParagraphElement) {
        currentNode.classList.add('article-text');
      }
    }
  }
}

addArticleClass();