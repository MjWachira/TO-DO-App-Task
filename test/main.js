let alltasks = JSON.parse(localStorage.getItem('tasks')) || [];

let form = document.querySelector('.inputform');
let newtodo = document.getElementById('new-todo-input');
let checkbox = document.querySelector('#checkBox');
let itemsleft = document.getElementById('items-left');
let allitems = document.getElementById('all-items');
let active = document.getElementById('active');
let completed = document.getElementById('completed');
let clearBtn = document.getElementById('clear-storage');

checkbox.addEventListener('click', () => {
  // console.log(checkbox.checked);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (newtodo.value !== '') {
    alltasks.push({
      task: newtodo.value,
      checked: checkbox.checked,
    });

    newtodo.value = '';
    checkbox.checked = false;

    renderTasks();
    updateItemCount();
    saveTasksToLocalStorage();
  }
});

function renderTasks(filter) {
  let filteredTasks;
  switch (filter) {
    case 'all':
      filteredTasks = alltasks;
      break;
    case 'active':
      filteredTasks = alltasks.filter((task) => !task.checked);
      break;
    case 'completed':
      filteredTasks = alltasks.filter((task) => task.checked);
      break;
    default:
      filteredTasks = alltasks;
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
      updateItemCount();
      saveTasksToLocalStorage();
    });

    let taskitem = document.createElement('div');
    taskitem.className = 'taskitem';

    taskitem.appendChild(checkbox);
    taskitem.appendChild(taskContainer);

    let alltasksContainer = document.querySelector('.lower-inner');
    alltasksContainer.appendChild(taskitem);
  });
}

function updateItemCount() {
  let uncheckedTasks = alltasks.filter((task) => !task.checked);
  let uncheckedCount = uncheckedTasks.length;
  itemsleft.innerHTML = uncheckedCount;
}

function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(alltasks));
}

function clearLocalStorage() {
  localStorage.removeItem('tasks');
  alltasks = [];
  renderTasks('all');
  updateItemCount();
}

clearBtn.addEventListener('click', clearLocalStorage);

allitems.addEventListener('click', () => {
  renderTasks('all');
  updateItemCount();
});

active.addEventListener('click', () => {
  renderTasks('active');
  updateItemCount();
});

completed.addEventListener('click', () => {
  renderTasks('completed');
  updateItemCount();
});

renderTasks('all');
updateItemCount();
