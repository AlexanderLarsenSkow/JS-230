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
    console.log(id);
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

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form.quiz');
  const template = new QuizTemplate(form, questions);

  template.generateHTML();

  // form.addEventListener('click', event => {
  //   let target = event.target;

  //   if (target.tagName !== 'INPUT' && target.tagName !== 'FIELDSET') {
  //     return;
  //   }

  //   console.log(target.value);
  // });

  // form.addEventListener('submit', event => {
  //   event.preventDefault();
  //   console.log('a');

  //   let data = new FormData(form);
  //   console.log(data);
  //   for (let piece of data) {
  //     console.log(piece);
  //   }
  // });
});