const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const completedCount = document.getElementById("completedCount");

// Load tasks from localStorage
window.onload = () => {
  let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => renderTask(task.text, task.completed));
  updateStats();
};

addBtn.addEventListener("click", () => {
  let text = taskInput.value.trim();
  if (text === "") return;
  renderTask(text, false);
  saveTasks();
  taskInput.value = "";
  updateStats();
});

function renderTask(text, completed) {
  let li = document.createElement("li");
  if (completed) li.classList.add("completed");

  let span = document.createElement("span");
  span.innerText = text;

  let btnDiv = document.createElement("div");
  btnDiv.classList.add("task-buttons");

  let completeBtn = document.createElement("button");
  completeBtn.innerText = "✔";
  completeBtn.classList.add("complete-btn");
  completeBtn.onclick = () => {
    li.classList.toggle("completed");
    saveTasks();
    updateStats();
  };

  let deleteBtn = document.createElement("button");
  deleteBtn.innerText = "✖";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.onclick = () => {
    li.remove();
    saveTasks();
    updateStats();
  };

  btnDiv.appendChild(completeBtn);
  btnDiv.appendChild(deleteBtn);
  li.appendChild(span);
  li.appendChild(btnDiv);
  taskList.appendChild(li);
}

function saveTasks() {
  let tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").innerText,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateStats() {
  let total = document.querySelectorAll("#taskList li").length;
  let completed = document.querySelectorAll("#taskList li.completed").length;
  taskCount.innerText = `${total} tasks`;
  completedCount.innerText = `${completed} completed`;
}
