// Rewriting Previous problem with querySelectorAll

let paragraphs = document.querySelectorAll('.intro p');
for (let i = 0; i < paragraphs.length; i += 1) {
  paragraphs[i].classList.add('article-text');
}