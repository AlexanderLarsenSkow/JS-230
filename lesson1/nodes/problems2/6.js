// Create an array of animalKeys
// Create an array of the values for polar bear.
// Essentially, we need to find those values and place them in an array.

const classKeys = ['Kingdom', 'Phylum', 'Class', 'Order', 'Family', 'Genus', 'Species']

let tableCells = document.querySelectorAll('.infobox tr td');
tableCells = Array.from(tableCells);

tableCells = tableCells.filter(node => {
  let sibling = node.previousElementSibling;
  if(!sibling) return false;

  return classKeys.includes(sibling.textContent.replace(':', ''));
});

let polarValues = tableCells.map(node => node.firstElementChild.textContent);

let polarBearClass = classKeys.reduce((info, classKey, index) => {
  info[classKey] = polarValues[index];
  return info;
}, {})

console.log(polarBearClass);