const languages = [
  {
    name: 'Ruby',
    description: 'Ruby is a dynamic, reflective, object-oriented, ' +
                 'general-purpose programming language. It was designed and developed in the mid-1990s ' +
                 'by Yukihiro Matsumoto in Japan. According to its creator, Ruby was influenced by Perl, ' +
                 'Smalltalk, Eiffel, Ada, and Lisp. It supports multiple programming paradigms, ' +
                 'including functional, object-oriented, and imperative. It also has a dynamic type ' +
                 'system and automatic memory management.'
  },

  {
    name: 'JavaScript',
    description: 'JavaScript is a high-level, dynamic, untyped, and interpreted ' +
                 'programming language. It has been standardized in the ECMAScript language ' +
                 'specification. Alongside HTML and CSS, JavaScript is one of the three core ' +
                 'technologies of World Wide Web content production; the majority of websites employ ' +
                 'it, and all modern Web browsers support it without the need for plug-ins. JavaScript ' +
                 'is prototype-based with first-class functions, making it a multi-paradigm language, ' +
                 'supporting object-oriented, imperative, and functional programming styles.'
  },

  {
    name: 'Lisp',
    description: 'Lisp (historically, LISP) is a family of computer programming languages ' +
                 'with a long history and a distinctive, fully parenthesized prefix notation. ' +
                 'Originally specified in 1958, Lisp is the second-oldest high-level programming ' +
                 'language in widespread use today. Only Fortran is older, by one year. Lisp has changed ' +
                 'since its early days, and many dialects have existed over its history. Today, the best ' +
                 'known general-purpose Lisp dialects are Common Lisp and Scheme.'
  },
];

function reduceTo120Chars({description}) {
  const max = 120;
  return description.slice(0, max) + '...';
}

function isShowMore(element) {
  return element.innerText === 'Show More';
}

function isShowLess(element) {
  return element.innerText === 'Show Less';
}

function isButton(element) {
  return element.tagName === 'BUTTON';
}

function makeShowLess(button) {
  button.textContent = 'Show Less';
}

function makeShowMore(button) {
  button.textContent = 'Show More';
}

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');

  sections.forEach((section, index) => {
    let paragraph = section.querySelector('p');
    let language = languages[index];
    paragraph.textContent = reduceTo120Chars(language);

    function buttonClickEvent(event) {
      let element = event.target;
      if (isButton(element) && isShowMore(element)) {
        paragraph.textContent = language.description;
        makeShowLess(element);
      }
      else if (isButton(element) && isShowLess(element)) {
        paragraph.textContent = reduceTo120Chars(language);
        makeShowMore(element);
      }
    }

    section.addEventListener('click', buttonClickEvent);
  });
});