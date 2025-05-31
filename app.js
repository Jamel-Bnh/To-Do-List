let tasks = [];

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim(); 

    if (text) {
        tasks.push({ text: text, completed: false });
        updateTasksList();
        updateStats();

        taskInput.value = "";
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
};

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text;
    deleteTask(index);
};

const updateStats = () => {
    let completed = 0;
    const total = tasks.length;

    for (let i = 0; i < total; i++) completed += tasks[i].completed ? 1 : 0;

    const progress = total ? (completed / total) * 100 : 0;

    document.getElementById("progress")?.style.setProperty("width", `${progress}%`);
    document.getElementById("numbers")?.textContent = `${completed} / ${total}`;

    if (total && completed === total) blastConfetti();
};


const updateTasksList = () => {
    const taskList = document.getElementById("task-list");
    if (!taskList) return;

    taskList.innerHTML = ""; 

    tasks.forEach((task, index) => {
        const listItem = document.createElement("div");
        listItem.className = "taskItem";
        listItem.innerHTML = `
            <div class="task ${task.completed ? "completed" : ""}">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
                <p class="taskText">${task.text}</p>
            </div>
            <div class="icons">
                <img src="./img/edit.png" onclick="editTask(${index})"/>
                <img src="./img/bin.png" onclick="deleteTask(${index})"/>
            </div>
        `;

        listItem.querySelector(".checkbox").addEventListener("change", () => toggleTaskComplete(index));
        taskList.appendChild(listItem);
    });
};

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
