const X_CHARACTER_CODE = '&#x2715';

let todoItems = [
  {id: 1, title: 'Homework'},
  {id: 2, title: 'Shopping'},
  {id: 3, title: 'Calling Mom'},
  {id: 4, title: 'Coffee with Elphaba'},
];

document.addEventListener('DOMContentLoaded', () => {
  const list = document.querySelector('main ul');
  const prompt = document.querySelector('#prompt');
  const confirm = prompt.querySelector('.delete');
  const overlay = document.querySelector('.overlay');

  const app = (function() {
    return {
      renderList() {
        todoItems.forEach(todo => {
          let html = `<div data-id="${todo.id}">
            <li>${todo.title}</li>
            <button>${X_CHARACTER_CODE}</button>
            </div>`

          list.insertAdjacentHTML('beforeend', html);
        });
      },

      clearList() {
        while(list.firstChild) {
          list.removeChild(list.firstChild);
        }
      },

      isHidden() {
        let display = prompt.style.display;
        return display === 'none' || display === '';
      },

      showPrompt() {
        prompt.style.display = 'block';
      },

      hidePrompt() {
        prompt.style.display = 'none';
      },

      toggleOverlay() {
        overlay.classList.toggle('show');
      },

      getDataId(button) {
        return button.parentElement.dataset.id;
      },

      getListDiv(dataId) {
        return list.querySelector(`div[data-id ="${dataId}"]`);
      },

      promptMessage(dataId) {
        let div = this.getListDiv(dataId);
        let todoName = div.firstElementChild.innerText;
        
        prompt.querySelector('p').textContent = `Are you sure you want to delete "${todoName}?"`
      },

      removeTodo(dataId) {
        let idx = todoItems.findIndex(todo => todo.id === Number(dataId));
        todoItems.splice(idx, 1);
      },

      setPrompt(dataId) {
        prompt.dataset.id = dataId;
        this.toggleOverlay();
        this.showPrompt();
        this.promptMessage(dataId)
      },

      resetPrompt() {
        prompt.dataset.id = '0';
        this.toggleOverlay();
        this.hidePrompt();
      },

      setDeleteButton() {        
        list.addEventListener('click', event => {
          event.stopPropagation();
          let element = event.target;

          if (element.tagName === 'BUTTON' && this.isHidden()) {
            let dataId = this.getDataId(element);
            this.setPrompt(dataId);
          }
          else if (!this.isHidden()) {
            this.resetPrompt();
          }
        });
      },

      confirmDelete() {
        confirm.addEventListener('click', () => {
          this.hidePrompt();

          let dataId = prompt.dataset.id;

          this.removeTodo(dataId);
          this.clearList();
          this.renderList();
          this.resetPrompt();
        });
      },

      setCancel() {
        document.addEventListener('click', () => {
          if (!this.isHidden()) {
            this.resetPrompt();
          }
        });
      },

      initialize() {
        this.renderList();
        this.setDeleteButton();
        this.confirmDelete();
        this.setCancel();
      }
    };
  })();

  app.initialize();
});
