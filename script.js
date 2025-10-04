document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  let tasks = [];

  function generateId() {
    return Date.now().toString(36) + '-' + Math.floor(Math.random() * 10000).toString(36);
  }

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function createTaskElement(task) {
    const li = document.createElement('li');
    li.dataset.id = task.id;
    li.style.whiteSpace = 'nowrap';

    const textSpan = document.createElement('span');
    textSpan.textContent = task.text;
    textSpan.style.flex = '1';
    textSpan.style.marginRight = '10px';

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    removeBtn.addEventListener('click', () => {
      if (li.parentNode) li.parentNode.removeChild(li);
      const index = tasks.findIndex(t => t.id === task.id);
      if (index !== -1) {
        tasks.splice(index, 1);
        saveTasks();
      }
    });

    li.appendChild(textSpan);
    li.appendChild(removeBtn);
    return li;
  }

  function addTask(taskTextParam, save = true) {
    let taskText;
    if (typeof taskTextParam === 'string') {
      taskText = taskTextParam.trim();
    } else {
      taskText = taskInput.value.trim();
    }

    if (taskText === '') {
      if (taskTextParam === undefined) {
        alert('Please enter a task.');
      }
      return;
    }

    const task = {
      id: generateId(),
      text: taskText
    };

    const li = createTaskElement(task);
    taskList.appendChild(li);

    if (save) {
      tasks.push(task);
      saveTasks();
    }

    if (taskTextParam === undefined) {
      taskInput.value = '';
      taskInput.focus();
    }
  }

  function loadTasks() {
    const raw = localStorage.getItem('tasks') || '[]';
    let stored = [];
    try {
      stored = JSON.parse(raw);
    } catch (err) {
      stored = [];
    }

    if (Array.isArray(stored) && stored.length > 0 && typeof stored[0] === 'string') {
      tasks = stored.map(text => ({ id: generateId(), text }));
    } else if (Array.isArray(stored)) {
      tasks = stored;
    } else {
      tasks = [];
    }

    tasks.forEach(task => {
      const li = createTaskElement(task);
      taskList.appendChild(li);
    });
  }

  addButton.addEventListener('click', () => addTask());
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  loadTasks();
});
