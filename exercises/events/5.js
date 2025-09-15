// What is the event?
// clicking on the class page should change the animals
// clicking on the animal should change the classifications

/*
  Change the value of the form.
  the form should change

  take the children of the select element
  remove any option that doesn't match any of the options in the constants
*/

const vert = 'Vertebrate';
const warm = 'Warm-blooded';
const cold = 'Cold-blooded';
const mammal = 'Mammal';
const bird = 'Bird';

const classKeys = {
  Vertebrate: ['Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich'],
  'Warm-blooded': ['Bear', 'Whale', 'Ostrich'],
  'Cold-blooded': ['Salmon', 'Turtle'],
  Mammal: ['Bear', 'Whale'],
  Bird: ['Ostrich'],
};

const animalKeys = {
  Bear: [vert, warm, mammal],
  Turtle: [vert, cold],
  Whale: [vert, warm, mammal],
  Salmon: [vert, cold],
  Ostrich: [vert, warm, bird],
};

function makeArray(arrayLike) {
  return Array.from(arrayLike);
}

document.addEventListener('DOMContentLoaded', () => {
  let animalClass = document.querySelector('#animal-classifications');
  let animals = document.querySelector('#animals');
  let clear = document.querySelector('#clear');

  let classChildren = makeArray(animalClass.children);
  let animalChildren = makeArray(animals.children);
  

  animalClass.addEventListener('change', event => {
    let newValue = animalClass.value;

    animalChildren.forEach(option => {
      let validOptions = classKeys[newValue];
      let value = option.value;

      if (!validOptions.includes(value) && value !== 'Animals') {
        option.style.display = 'none';
      } else {
        option.style.display = 'block';
      }
    });
  });

  animals.addEventListener('change', event => {
    let newValue = animals.value;

    classChildren.forEach(option => {
      let validOptions = animalKeys[newValue];
      let value = option.value;

      if (!validOptions.includes(value) && value !== 'Classifications') {
        option.style.display = 'none';
      } else {
        option.style.display = 'block';
      }
    });
  });

  clear.addEventListener('click', event => {
    event.preventDefault();

    animalChildren.forEach(option => option.style.display = 'block');
    classChildren.forEach(option => option.style.display = 'block');
  });
});