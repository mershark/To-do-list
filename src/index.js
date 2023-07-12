/* eslint-disable linebreak-style */
import './style.css';
import {
  clearCompleted,
  addTask,
  deleteTask,
} from './crud.js';
import { updateTaskStatus } from './interactive.js';

let tasks = [];

const updateLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const renderTasks = (tasks) => {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'task-item';

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      listItem.className = task.completed ? 'task-item completed' : 'task-item';
      updateLocalStorage();
      updateTaskStatus(tasks, task.id, task.completed); // Call the updateTaskStatus function
    });

    const label = document.createElement('label');
    const descriptionSpan = document.createElement('span');
    descriptionSpan.innerText = task.description;

    const editInput = document.createElement('input');
    editInput.setAttribute('type', 'text');
    editInput.className = 'edit-input';
    editInput.style.display = 'none';
    editInput.value = task.description;
    editInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        descriptionSpan.innerText = editInput.value.trim();
        task.description = editInput.value.trim();
        editInput.style.display = 'none';
        descriptionSpan.style.display = 'inline';
        updateLocalStorage();
      }
    });

    label.appendChild(descriptionSpan);
    label.appendChild(editInput);

    label.addEventListener('click', () => {
      descriptionSpan.style.display = 'none';
      editInput.style.display = 'inline';
      editInput.focus();
    });

    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'fas fa-trash delete-icon';
    deleteIcon.style.display = 'none'; // Hide the delete icon initially

    deleteIcon.addEventListener('click', () => {
      const taskIndex = tasks.findIndex((t) => t.id === task.id);
      if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        updateLocalStorage();
        renderTasks(tasks);
      }
    });

    const ellipsisIcon = document.createElement('i');
    ellipsisIcon.className = 'fas fa-ellipsis-v ellipsis-icon';
    ellipsisIcon.addEventListener('click', () => {
      deleteIcon.style.display = 'inline'; // Show the delete icon
      ellipsisIcon.style.display = 'none'; // Hide the ellipsis icon
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(ellipsisIcon);
    listItem.appendChild(deleteIcon);
    todoList.appendChild(listItem);
  });
};

const refreshTasks = () => {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks(tasks);
  }
};

const refreshIcon = document.getElementById('refresh-icon');
refreshIcon.addEventListener('click', () => {
  renderTasks(tasks);
});

const addIcon = document.getElementById('add-icon');
addIcon.addEventListener('click', () => {
  const taskInput = document.getElementById('task-input');
  const description = taskInput.value.trim();
  if (description) {
    tasks = addTask(tasks, description);
    taskInput.value = '';
    updateLocalStorage();
    renderTasks(tasks);
  }
});

const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', () => {
  tasks = clearCompleted(tasks);
  updateLocalStorage();
  renderTasks(tasks);
});

// Call refreshTasks on page load
window.addEventListener('load', refreshTasks);

renderTasks(tasks);
