function setQuantity(quantityValue) {
  if (quantityValue === '') return '1';
  return String(quantityValue);
}

document.addEventListener('DOMContentLoaded', () => {
  const itemName = document.querySelector('#name');
  const quantity = document.querySelector('#quantity');
  const form = document.querySelector('form');
  
  const groceryList = document.querySelector('ul');

  form.addEventListener('submit', event => {
    event.preventDefault();
    let [nameValue, quantityValue] = [itemName.value, quantity.value];

    if (nameValue === '') {
      alert('You must enter a value for the item!');
      return;
    }

    let listItem = document.createElement('li');
    listItem.textContent = `${setQuantity(quantityValue)} ${nameValue}`;
    groceryList.appendChild(listItem);

    form.reset();
  });

  window.addEventListener('beforeprint', () => {
    form.style.display = 'none';
  });

  window.addEventListener('afterprint', () => {
    form.style.display = 'block';
  });
});