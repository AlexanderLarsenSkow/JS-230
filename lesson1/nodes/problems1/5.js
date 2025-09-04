// Starting with HTML from this wikipedi page:

// https://d1nrfq3cstnmkv.cloudfront.net/course_content/pages/polar_bear_wiki.html

// count PNG images

let imgCount = 0;
let pngCount = 0;

function isPng(imgNode) {
  return imgNode.src.match(/\.png$/);
}

walk(body, node => {
  if (node.nodeName === 'IMG') {
    imgCount += 1;
    if (isPng(node)) pngCount += 1
  }
})

console.log(imgCount); // 48
console.log(pngCount); // 23