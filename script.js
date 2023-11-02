function create_UUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0;
    var v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const inputBox = document.getElementById("input-box");
const taskList = document.getElementById("task-list");

// Initialize tasks array to store the tasks
let tasks = [];

// Load tasks from local storage when the page loads
function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (savedTasks) {
    tasks = savedTasks;
    displayTasks();
  }
}

// Save tasks to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const taskText = inputBox.value.trim();

  if (taskText !== "") {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.classList.add("hidden");
    // Create a new task object
    const task = {
      uuid: create_UUID(),
      text: taskText,
      completed: false,
      date: new Date().toLocaleString(),
    };

    // Add the task to the tasks array
    tasks.push(task);

    // Save tasks to local storage
    saveTasks();

    // Add the task to the task list
    displayTasks();

    // Clear the input field
    inputBox.value = "";
  } else {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.classList.remove("hidden");
    errorMessage.textContent = "Please enter a task";
  }
}

function toggleTask(index) {
  // Toggle the completed state of the task
  tasks[index].completed = !tasks[index].completed;

  // Save tasks to local storage
  saveTasks();

  // Update the task list to reflect the change
  displayTasks();
}

function deleteTask(index) {
  // Remove the task from the tasks array
  tasks.splice(index, 1);

  // Save tasks to local storage
  saveTasks();

  // Update the task list to reflect the change
  displayTasks();
}

function displayTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.className = "border-b border-gray-300 py-2";
    taskItem.innerHTML = `
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input type="checkbox" class="mr-2 form-checkbox" ${task.completed ? "checked" : ""} onclick="toggleTask(${index})">
          <span class="task-text ${task.completed ? "line-through" : ""}">${task.text}</span>
        </div>
        <span>${task.date}</span>
      </div>
      <div class="flex items-center justify-end">
        <button onclick="editTask(${index})" class="text-blue-500 mr-2">Edit</button>
        <button onclick="deleteTask(${index})" class="text-red-500">Delete</button>
      </div>
    `;
    taskList.appendChild(taskItem);
  });
}

// Edit task
function editTask(index) {
  const task = tasks[index];
  const updatedText = prompt("Edit the task:", task.text);
  if (updatedText !== null) {
    tasks[index].text = updatedText;

    saveTasks();
    displayTasks();
  }
}

// Load tasks when the page loads
loadTasks();
