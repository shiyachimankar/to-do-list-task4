document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    if (taskInput.value.trim() !== "") {
        const task = taskInput.value.trim();

        const li = document.createElement("li");
        li.innerHTML = `
            <span onclick="toggleTask(this)">${task}</span>
            <button onclick="editTask(this)">Edit</button>
            <button onclick="deleteTask(this)">Delete</button>
        `;

        taskList.appendChild(li);
        saveTask(task);

        taskInput.value = "";
    }
}

function toggleTask(span) {
    span.classList.toggle("completed");
}

function editTask(button) {
    const newTask = prompt("Edit task:", button.parentNode.firstChild.innerText);

    if (newTask !== null) {
        button.parentNode.firstChild.innerText = newTask;
        updateLocalStorage();
    }
}

function deleteTask(button) {
    if (confirm("Are you sure you want to delete this task?")) {
        button.parentNode.remove();
        updateLocalStorage();
    }
}

function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = getTasks();

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `<span onclick="toggleTask(this)">${task}</span>
                        <button onclick="editTask(this)">Edit</button>
                        <button onclick="deleteTask(this)">Delete</button>`;
        document.getElementById("taskList").appendChild(li);
    });
}

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function updateLocalStorage() {
    const tasks = [];
    document.querySelectorAll("#taskList li span").forEach(task => {
        tasks.push(task.innerText);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}