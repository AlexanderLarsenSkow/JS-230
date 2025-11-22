class FormValidator {
  constructor() {
    this.form = document.querySelector('form');
    this.firstName = document.querySelector('#name-input');
    this.lastName = document.querySelector('#last-name-input');
    this.email = document.querySelector('#email-input');
    this.password = document.querySelector('#password-input');
    this.phone = document.querySelector('#phone-input');

    this.allInputs = [
      this.firstName, 
      this.lastName, 
      this.email, 
      this.password,
      this.phone
    ];

    console.log(this.allInputs);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new FormValidator();

  const form = document.querySelector('form');
  let formInput = document.querySelector('form input');

  form.addEventListener('focusout', event => {
    let input = event.target;
    console.log(input);
    // let target = event.target;
    if (input.tagName !== 'INPUT') return;

    console.log(event.target.checkValidity());
    console.log(event.target.id === 'name-input');

    if (!event.target.checkValidity()) {
      // event.target.style.backgroundColor = 'red';
      console.log(input.validationMessage);
      console.log(input.validationMessage);
      console.log(input.validity);
    }
  });
});