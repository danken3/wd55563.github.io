let tasks = [];

function addTask() {
    const taskName = document.getElementById('task_name').value;
    const taskDate = document.getElementById('task_date').value;

    if (taskName.length >= 3 && taskDate >= currentDate()) {
        tasks.push({ name: taskName, date: taskDate });
        renderTasks();
        document.getElementById('task_name').value = '';
        document.getElementById('task_date').value = '';
        addToLocalStorage()
    } else if (taskName.length >= 3 && !taskDate) {
        tasks.push({ name: taskName, date: 'No date provided' });
        renderTasks();
        document.getElementById('task_name').value = '';
        document.getElementById('task_date').value = '';
        addToLocalStorage()
    }
}

function deleteTask(button) {
    const row = button.parentElement.parentElement;
    const taskName = row.cells[0].textContent;
    tasks = tasks.filter(task => task.name !== taskName);
    renderTasks();
    addToLocalStorage()
}

function renderTasks() {
    const tbody = document.getElementById('task_list');
    tbody.innerHTML = '';

    tasks.forEach(task => {
        const row = tbody.insertRow();
        //row.insertCell(0).textContent.addTaskListener(onclick() => editCell()) = task.name;
        const cell1 = row.insertCell(0);
        cell1.textContent = task.name;
        cell1.addEventListener("click", () => editCell(task, "name", cell1));
        const cell2 = row.insertCell(1);
        cell2.textContent = task.date;
        cell2.addEventListener("click", () => editCell(task, "date", cell2));
        row.insertCell(2).innerHTML = '<button class="delete_task" onclick="deleteTask(this)">Delete</button>';
    });
}

function editCell(task, field, cell) {
  if (field === "date") {
    const newDate = prompt("New date (YYYY-MM-DD):", cell.textContent);
    if (newDate && !/^\d{4}-\d{2}-\d{2}$/.test(newDate)) {
      alert("Please enter a valid date in the format YYYY-MM-DD.");
      return;
    }
    if (newDate && newDate >= currentDate()) {
      task[field] = newDate;
      cell.textContent = newDate;
    } else if (newDate && newDate < currentDate()) {
      alert("Please enter a valid date that is today or in the future.");
    }
  }

  if (field === "name") {
    const newValue = prompt("New task name:", cell.textContent);
    if (newValue && newValue.length < 3) {
      alert("Task name must be at least 3 characters long.");
      return;
    }
    task[field] = newValue;
    cell.textContent = newValue;
  }
}

function currentDate() {
  return new Date().toISOString().split('T')[0];
}

function addToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
}

function searchTasks() {
  const searchInput = document.getElementById('task_filter').value.toLowerCase();

  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchInput)
  );

  const tbody = document.getElementById('task_list');
  tbody.innerHTML = '';

  filteredTasks.forEach(task => {
    const row = tbody.insertRow();

    const cell1 = row.insertCell(0);

    if (searchInput) {
      const escapedInput = searchInput.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${escapedInput})`, 'gi');

      cell1.innerHTML = task.name.replace(
        regex,
        '<mark>$1</mark>'
      );
    } else {
      cell1.textContent = task.name;
    }

    cell1.addEventListener("click", () => editCell(task, "name", cell1));

    const cell2 = row.insertCell(1);
    cell2.textContent = task.date;
    cell2.addEventListener("click", () => editCell(task, "date", cell2));

    row.insertCell(2).innerHTML =
      '<button class="delete_task" onclick="deleteTask(this)">Delete</button>';
  });
}

window.addEventListener('DOMContentLoaded', () => {
  loadFromLocalStorage();
  
  document
    .getElementById('task_filter')
    .addEventListener('input', searchTasks);
});
