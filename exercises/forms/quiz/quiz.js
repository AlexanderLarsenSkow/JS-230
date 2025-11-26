const questions = [
  {
    id: 1,
    description: "Who is the author of <cite>The Hitchhiker's Guide to the Galaxy</cite>?",
    options: ['Dan Simmons', 'Douglas Adams', 'Stephen Fry', 'Robert A. Heinlein'],
  },
  {
    id: 2,
    description: 'Which of the following numbers is the answer to Life, the \
                  Universe and Everything?',
    options: ['66', '13', '111', '42'],
  },
  {
    id: 3,
    description: 'What is Pan Galactic Gargle Blaster?',
    options: ['A drink', 'A machine', 'A creature', 'None of the above'],
  },
  {
    id: 4,
    description: 'Which star system does Ford Prefect belong to?',
    options: ['Aldebaran', 'Algol', 'Betelgeuse', 'Alpha Centauri'],
  },
];

const answerKey = { '1': 'Douglas Adams', '2': '42', '3': 'A drink', '4': 'Betelgeuse' };

class QuizTemplate {
  constructor(form, questions) {
    this.form = form;
    this.submit = form.querySelector('button');
    this.questions = questions;
  }

  generateHTML() {
    this.questions.forEach(this.generateQuestion.bind(this));
  }

  generateQuestion({id, description, options}) {
    let html = `<fieldset id="question${id}" class="question-field">
    <legend>${description}</legend>
      ${this.generateOptions(options, id)}
    </fieldset>`;

    this.submit.insertAdjacentHTML('beforebegin', html);
  }

  generateOptions(options, id) {
    return options.map(option => {
      return `<div class="question">
        <input type="radio" id="${option}" value="${option}" name="question${id}">
        <label for="${option}">${option}</label>
      </div>`
    }).join('\n');
  }
}

class QuizApp {
  constructor(form, answers) {
    this.form = form;
    this.submit = form.querySelector('button[type="submit"]');
    this.answers = answers;
  }

  submitHandler(event) {
    event.preventDefault();

    const data = new FormData(this.form);
    const object = this.formatData(data);

    this.addStatusMessaging(object);
    this.disableSubmit();
  }

  resetHandler(event) {
    console.log(event.currentTarget);
  }

  disableSubmit() {
    this.submit.classList.add('disabled');
    this.submit.setAttribute('disabled', 'disabled');
  }

  addStatusMessaging(objectData) {
    const answers = Object.entries(this.answers);

    answers.forEach(([id, answer]) => {
      this.determineStatus(objectData, id, answer);

      let message = this.determineMessage(answer);
      this.createMessageHTML(message, id);
    });
  }

  determineStatus(objectData, id, answer) {
    if (answer === objectData[id]) {
      this.correct = true;
    } 
    else if (!objectData[id]) {
      this.correct = null;
    } else {
      this.correct = false;
    }
  }

  determineMessage(answer) {
    switch(this.correct) {
      case true:
        return 'Correct Answer';
      case null:
        return `You didn't answer this question. The correct answer is ${answer}.`;
      default:
        return `Wrong Answer. The correct answer is ${answer}`;
    }
  }

  createMessageHTML(message, id) {
    const statusClass = this.correct ? 'correct' : 'incorrect';
    const html = `<p class="status-message ${statusClass}">${message}</p>`

    let fieldset = this.form.querySelector(`#question${id}`);
    fieldset.insertAdjacentHTML('beforeend', html);
  }

  formatData(data) {
    const object = {};

    for (let [key, value] of data) {
      let idKey = key.replaceAll(/[^\d]/g, '');
      object[idKey] = value;
    }

    return object;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form.quiz');
  const resetButton = form.querySelector('#reset');
  const template = new QuizTemplate(form, questions);
  const app = new QuizApp(form, answerKey);

  template.generateHTML();

  form.addEventListener('submit', app.submitHandler.bind(app));
  resetButton.addEventListener('click', app.resetHandler.bind(app));
});