// Change every odd-indexed link in table of contents to green

let tableContents = document.querySelector('div .toc');
let links = tableContents.querySelectorAll('a');
links = Array.from(links);

let oddLinks = links.filter((_, index) => index % 2 === 1);
oddLinks.forEach(link => link.style.color = 'green');