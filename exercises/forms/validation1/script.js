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

  focusOutHandle(event) {
    let input = event.target;
    if (input.tagName !== 'INPUT') return;
  }

  submitErrorHandle(event) {
    event.preventDefault();

    if (this.someInvalid()) {
      let html = '<span>Fix errors before submitting this form.</span>'
      this.form.insertAdjacentHTML('beforebegin', html);
    }
  }

  someInvalid() {
    return this.allInputs.some(input => !input.checkValidity());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const validator = new FormValidator();

  const form = document.querySelector('form');

  form.addEventListener('focusout', validator.focusOutHandle.bind(validator));
  form.addEventListener('submit', validator.submitErrorHandle.bind(validator));
});