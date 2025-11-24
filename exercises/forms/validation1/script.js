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

  static creditCard() {
    return 'Credit card must be 16 digits in groups of 4.';
  }
}

class FormValidator {  
  constructor() {
    this.form = document.querySelector('form');
    this.firstName = document.querySelector('#name-input');
    this.lastName = document.querySelector('#last-name-input');
    this.email = document.querySelector('#email-input');
    this.password = document.querySelector('#password-input');
    this.lastCreditCard = document.querySelector('#credit-card-4');
    this.phone = document.querySelector('#phone-input');

    this.allInputs = [
      this.firstName,
      this.lastName,
      this.email, 
      this.password,
      this.lastCreditCard,
      this.phone,
    ];

    this.patterns = {
      'first name': /^[a-zA-Z\'\s]$/,
      'last name': /^[a-zA-Z\'\s]$/,
      'credit card': /\d/,
      'phone': /[\d-]/
    }
  }

  focusInHandle(event) {
    let input = event.target;
    if (input.tagName !== 'INPUT') return;

    input.style.border = '2px solid green';

    if (this.isCreditCard(input)) input = this.lastCreditCard;

    if (!this.noErrorMessage(input)) {
      input.nextElementSibling.remove();
    }
  }

  focusOutHandle(event) {
    let input = event.target;
    if (input.tagName !== 'INPUT') return;

    input.style.border = '2px solid black';

    if (!this.someInvalid() && this.hasSubmitErrorMessage()) {
      document.querySelector('main span').remove();
    }
    
    this.addErrorMessaging(input);
  }

  addErrorMessaging(input) {
    if (!input.checkValidity() && this.noErrorMessage(input)) {
      if (this.isCreditCard(input)) input = this.lastCreditCard;

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

      this.allInputs.forEach(this.addErrorMessaging.bind(this));
    }
  }

  keydownHandle(event) {
    const key = event.key;
    let input = event.target;

    if (input.tagName !== 'INPUT' || !this.isKeyControlled(input)) return;

    const pattern = this.patterns[input.name];
    
    if (!this.isAcceptedKey(key) && !pattern.test(key)) {
      event.preventDefault();
    }
  }

  isAcceptedKey(key) {
    const goodKeys = ['Backspace', 'Tab', 'Delete', 'Home', 'End', 
      'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

    return goodKeys.includes(key);
  }

  createErrorHTML(input, message) {
    let html = `<span class="error-message">${message}</span>`;
    input.insertAdjacentHTML('afterend', html);
  }

  determineErrorMessage(input) {
    let message;

    if (this.hasRequireError(input) && !this.isCreditCard(input)) {
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
    else if (this.hasCreditCardError(input)) {
      message = ErrorMessager.creditCard();
    }

    return message;
  }

  someInvalid() {
    return this.allInputs.some(input => !input.checkValidity());
  }

  noErrorMessage(input) {
    let sibling = input.nextElementSibling;
    if (sibling && sibling.tagName === 'DIV') sibling.remove();

    sibling = input.nextElementSibling;
    if (sibling) return sibling.tagName !== 'SPAN';

    return input.nextElementSibling === null;
  }

  hasSubmitErrorMessage() {
    return !!document.body.querySelector('main span');
  }

  hasRequireError(input) {
    return input.hasAttribute('required') && input.validity.valueMissing;
  }

  hasPhoneError(input) {
    return input === this.phone && this.phone.validity.patternMismatch;
  }

  hasCreditCardError(input) {
    return input.classList.contains('credit-card') && 
      (input.validity.patternMismatch || input.validity.valueMissing);
  }

  hasEmailError(input) {
    return input === this.email && this.email.validity.patternMismatch;
  }

  hasPasswordError(input) {
    return input === this.password && 
    (this.password.validity.tooLong || this.password.validity.tooShort);
  }

  isCreditCard(input) {
    return input.classList.contains('credit-card');
  }

  isKeyControlled(input) {
    return !!this.patterns[input.name];
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const validator = new FormValidator();
  const form = document.querySelector('form');

  form.addEventListener('focusout', validator.focusOutHandle.bind(validator));
  form.addEventListener('focusin', validator.focusInHandle.bind(validator));
  form.addEventListener('submit', validator.submitErrorHandle.bind(validator));
  form.addEventListener('keydown', validator.keydownHandle.bind(validator));
});