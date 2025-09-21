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
  const contextMenu = document.querySelector('.context-menu');

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

      toggleShow(element) {
        element.classList.toggle('show');
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
        this.toggleShow(overlay);
        this.showPrompt();
        this.promptMessage(dataId)
      },

      resetPrompt() {
        prompt.dataset.id = '0';
        this.toggleShow(overlay);
        this.hidePrompt();
      },

      handleDeleteClick(event) {
        event.stopPropagation();
        contextMenu.classList.remove('show');
        let element = event.target;

        if (element.tagName === 'BUTTON' && this.isHidden()) {
          let id = element.dataset.id;
          let dataId = id ? id : this.getDataId(element);
          
          this.setPrompt(dataId);
        }
        else if (!this.isHidden()) {
          this.resetPrompt();
        }
      },

      setDeleteButton() {        
        list.addEventListener('click', this.handleDeleteClick.bind(this)); 
      },

      setContextButtons() {
        contextMenu.addEventListener('click', event => {
          event.stopPropagation();

          let element = event.target;
          if (element.classList.contains('delete-menu')) return;
        });

        contextMenu.lastElementChild.addEventListener('click', 
          this.handleDeleteClick.bind(this)
        );
      },

      setContextMenu() {
        list.addEventListener('contextmenu', event => {
          event.preventDefault();
          let div = event.target.closest('div');
          let deleteButton = contextMenu.lastElementChild;
          
          deleteButton.dataset.id = div.dataset.id;

          if (contextMenu.classList.contains('show')) {
            this.toggleShow(contextMenu);
          }

          let [x, y] = [event.clientX, event.clientY];

          this.toggleShow(contextMenu);
          contextMenu.style.top = `${y}px`;
          contextMenu.style.left = `${x}px`;
        });

        this.setContextButtons();
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
          contextMenu.classList.remove('show');

          if (!this.isHidden()) {
            this.resetPrompt();
          }
        });
      },

      initialize() {
        this.renderList();
        this.setDeleteButton();
        this.setContextMenu();
        this.confirmDelete();
        this.setCancel();
      }
    };
  })();

  app.initialize();
});
