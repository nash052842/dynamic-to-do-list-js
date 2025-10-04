document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  let tasks = [];

  // Save tasks to local storage
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Create <li> element with remove button
  function createTaskElement(taskText, save = true) {
    const li = document.createElement('li');
    li.textContent = taskText;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    removeBtn.onclick = () => {
      taskList.removeChild(li);
      tasks = tasks.filter(t => t !== taskText);
      saveTasks();
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    if (save) {
      tasks.push(taskText);
      saveTasks();
    }
  }

  // Add new task
  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
      alert('Please enter a task.');
      return;
    }

    createTaskElement(taskText);
    taskInput.value = '';
    taskInput.focus();
  }

  // Load saved tasks
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks = storedTasks;
    tasks.forEach(taskText => createTaskElement(taskText, false));
  }

  // Event listeners
  addButton.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  loadTasks();
});


function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    alert('Please enter a task.');
    return;
  }

  const li = document.createElement('li');
  li.textContent = taskText;

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.className = 'remove-btn';

  removeBtn.onclick = () => {
    taskList.removeChild(li);
  };

  li.appendChild(removeBtn);
  taskList.appendChild(li);

  taskInput.value = '';
}
