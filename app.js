document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = storedTasks; // Load tasks from localStorage only once on page load
    updateTasksList();
    updateStats();
});

let tasks = [];

const saveTasks = () => {
    // Disabled saving to localStorage
    // localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        updateTasksList();
        updateStats();
        // saveTasks(); // Disabled saving
        taskInput.value = ""; // Clear the input field
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats();
    // saveTasks(); // Disabled saving
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    // saveTasks(); // Disabled saving
};

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text;
    deleteTask(index);
    // saveTasks(); // No need, already commented in deleteTask
};

const updateStats = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.completed).length;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    document.getElementById("progress").style.width = `${progress}%`;
    document.getElementById("numbers").innerHTML = `${completedTasks} / ${totalTasks}`;

    if (totalTasks > 0 && completedTasks === totalTasks) {
        blastConfetti();
    }
};

const updateTasksList = () => {
    const taskList = document.getElementById("taskList");
    if (!taskList) return;

    taskList.innerHTML = ""; // Clear the task list

    tasks.forEach((task, index) => {
        const listItem = document.createElement("div");

        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? "completed" : ""}">
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="./img/edit.png" onclick="editTask(${index})"/>
                    <img src="./img/bin.png" onclick="deleteTask(${index})"/>
                </div>
            </div>
        `;

        listItem.querySelector(".checkbox").addEventListener("change", () => toggleTaskComplete(index));
        taskList.appendChild(listItem);
    });
};

// Prevent form refresh and add task
document.getElementById("taskForm").addEventListener("submit", function (e) {
    e.preventDefault();
    addTask();
});

const blastConfetti = () => {
    const count = 200, defaults = { origin: { y: 0.7 } };

    function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, { particleCount: Math.floor(count * particleRatio) }));
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
};
