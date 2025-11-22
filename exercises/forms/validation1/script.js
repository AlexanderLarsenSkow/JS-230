class ErrorMessager {
  static required(input) {
    let upperName = input.name.split(' ')
                              .map(part => part.slice(0, 1).toUpperCase() + part.slice(1))
                              .join(' ');

    return `${upperName} is a required field.`
  }

  static email() {
    return 'Please enter a valid email.';
  }

  static phone() {
    return 'Phone number must use the format 111-222-3333.';
  }

  static passwordLength() {
    return 'Password must be 10 characters long.';
  }
}

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
  }

  focusOutHandle(event) {
    let input = event.target;
    if (input.tagName !== 'INPUT') return;

    if (!input.checkValidity() && this.noErrorMessage(input)) {
      let message = this.determineErrorMessage(input);
      this.createErrorHTML(input, message);
      input.style.border = '2px solid red';
    }

  }

  submitErrorHandle(event) {
    event.preventDefault();

    if (this.someInvalid()) {
      let html = '<span>Fix errors before submitting this form.</span>'
      this.form.insertAdjacentHTML('beforebegin', html);
    }
  }

  createErrorHTML(input, message) {
    let html = `<span class="error-message">${message}</span>`;
    input.insertAdjacentHTML('afterend', html);
  }

  determineErrorMessage(input) {
    let message;

    if (this.hasRequireError(input)) {
      message = ErrorMessager.required(input);
    }
    else if (this.hasPhoneError(input)) {
      message = ErrorMessager.phone()
    }
    else if (this.hasEmailError(input)) {
      message = ErrorMessager.email();
    }
    else if (this.hasPasswordError(input)) {
      message = ErrorMessager.passwordLength();
    }

    return message;
  }

  someInvalid() {
    return this.allInputs.some(input => !input.checkValidity());
  }

  noErrorMessage(input) {
    let sibling = input.nextElementSibling;
    if (sibling) return sibling.tagName !== 'SPAN';

    return input.nextElementSibling === undefined;
  }

  hasRequireError(input) {
    return input.hasAttribute('required') && input.validity.valueMissing;
  }

  hasPhoneError(input) {
    return input === this.phone && this.phone.validity.patternMismatch;
  }

  hasEmailError(input) {
    return input === this.email && this.email.validity.patternMismatch;
  }

  hasPasswordError(input) {
    return input === this.password && 
    (this.password.validity.tooLong || this.password.validity.tooShort);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const validator = new FormValidator();

  const form = document.querySelector('form');

  form.addEventListener('focusout', validator.focusOutHandle.bind(validator));
  form.addEventListener('submit', validator.submitErrorHandle.bind(validator));
});