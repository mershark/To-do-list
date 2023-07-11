import './style.css';

const tasks = [
  { description: 'wash the dishes', completed: false, index: 1 },
  { description: 'complete To Do list project', completed: true, index: 2 },
];

const renderTasks = () => {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.className = 'task-item';

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      listItem.className = task.completed ? 'task-item completed' : 'task-item';
    });

    const label = document.createElement('label');
    label.innerHTML = `<span>${task.description}</span><i class="fas fa-ellipsis-v"></i>`;

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    todoList.appendChild(listItem);
  });
};

const clearCompleted = () => {
};

renderTasks();

const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', clearCompleted);
