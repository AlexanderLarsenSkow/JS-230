/*
Notes:
Original

Main background color is #c0f0c0;


h1 font is bold 2em Helvetica, Arial, sans-serif


header: 
  should be first child of body

figure:
  - the figure with the chink stick image should be first

  h1 should be in header
*/

let body = document.body;
let headers = document.querySelectorAll('header');
let header = headers[1];

// Moving header to top
body.insertBefore(header, body.firstChild);

// Moving h1 into header
let headerH1 = body.querySelector('main h1');
header.insertBefore(headerH1, header.firstChild);

// Moving figures into article
let section = document.getElementById('content');
let moveFigure = section.lastElementChild;
let otherFigure = section.querySelector('figure');

section.insertBefore(moveFigure, otherFigure);

let article = body.querySelector('main article');
article.appendChild(moveFigure);
article.appendChild(otherFigure);

// Replacing figCaptions

let otherCaption = moveFigure.querySelector('figcaption');
let moveCaption = otherFigure.querySelector('figcaption');

moveFigure.appendChild(moveCaption);
otherFigure.appendChild(otherCaption);