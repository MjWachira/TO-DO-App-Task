class TodoApp {
  constructor() {
    this.alltasks = [];
    this.form = document.querySelector('.inputform');
    this.newtodo = document.getElementById('new-todo-input');
    this.checkbox = document.querySelector('#checkBox');
    this.itemsleft = document.getElementById('items-left');
    this.allitems = document.getElementById('all-items');
    this.active = document.getElementById('active');
    this.completed = document.getElementById('completed');

    this.checkbox.addEventListener('click', () => {
      // console.log(this.checkbox.checked);
    });

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (this.newtodo.value !== '') {
        this.alltasks.push({
          task: this.newtodo.value,
          checked: this.checkbox.checked,
        });

        this.newtodo.value = '';
        this.checkbox.checked = false;

        this.renderTasks();
        this.updateItemCount();
      }
    });

    this.allitems.addEventListener('click', () => {
      this.renderTasks('all');
      this.updateItemCount();
    });

    this.active.addEventListener('click', () => {
      this.renderTasks('active');
      this.updateItemCount();
    });

    this.completed.addEventListener('click', () => {
      this.renderTasks('completed');
      this.updateItemCount();
    });

    // Initial rendering of tasks
    this.renderTasks('all');
    this.updateItemCount();
  }

  renderTasks(filter) {
    let filteredTasks;
    switch (filter) {
      case 'all':
        filteredTasks = this.alltasks;
        break;
      case 'active':
        filteredTasks = this.alltasks.filter((task) => !task.checked);
        break;
      case 'completed':
        filteredTasks = this.alltasks.filter((task) => task.checked);
        break;
      default:
        filteredTasks = this.alltasks;
        break;
    }

    let taskItems = document.querySelectorAll('.lower-inner .taskitem');

    taskItems.forEach((el) => el.remove());

    filteredTasks.forEach(({ task, checked }, index) => {
      let checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'itemcheckbox';
      checkbox.checked = checked;

      let taskContainer = document.createElement('div');
      taskContainer.className = 'singletask';
      taskContainer.textContent = task;
      taskContainer.style.textDecoration = 'none';
      if (checkbox.checked) {
        taskContainer.style.textDecoration = 'line-through';
      }
      checkbox.addEventListener('click', () => {
        if (taskContainer.style.textDecoration == 'none') {
          taskContainer.style.textDecoration = 'line-through';
        } else {
          taskContainer.style.textDecoration = 'none';
        }
        this.updateItemCount();
      });

      let taskitem = document.createElement('div');
      taskitem.className = 'taskitem';

      taskitem.appendChild(checkbox);
      taskitem.appendChild(taskContainer);

      let alltasksContainer = document.querySelector('.lower-inner');
      alltasksContainer.appendChild(taskitem);
    });
  }

  updateItemCount() {
    let uncheckedTasks = this.alltasks.filter((task) => !task.checked);
    let uncheckedCount = uncheckedTasks.length;
    this.itemsleft.innerHTML = uncheckedCount;
  }
}

const todoApp = new TodoApp();
