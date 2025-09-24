function colorIt(element, color) {
  element.style.color = color;
}

document.addEventListener('DOMContentLoaded', () => {
  const redButton = document.querySelector('button[data-color="red"]');
  const blueButton = document.querySelector('button[data-color="blue"]');
  const paragraphs = document.querySelector('.text').children;

  console.log(redButton, blueButton); 
  // <button data-color="red"...> <button data-color ="blue"...>

// redButton.dataset.color = 'green';
// console.log(redButton.dataset.color); // 'green'

// delete redButton.dataset.color;
// console.log(redButton.dataset.color); // undefined

  document.querySelector('.buttons').addEventListener('click', event => {
    let color = event.target.dataset.color;

    for (let i = 0; i < paragraphs.length; i += 1) {
      let pElement = paragraphs[i];
      let paraColor = pElement.dataset.color;

      if (color === paraColor) {
        colorIt(pElement, color)
      }
    }
  });
});