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
  console.log(document.querySelector('form'));

  let formInput = document.querySelector('form input');
  console.log(formInput);

  formInput.addEventListener('blur', event => {
    console.log(event.target.checkValidity());
    console.log(event.target.id === 'name-input');

    if (!event.target.checkValidity()) {
      event.target.style.backgroundColor = 'red';
    }
  });
});