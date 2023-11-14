// Function to add a new task
function addTask() {
    // Get values from input fields
    var taskInput = document.getElementById("taskInput");
    var taskDueDate = document.getElementById("taskDueDate");
    var taskList = document.getElementById("taskList");
    var taskText = taskInput.value;
    var dueDate = taskDueDate.value;
    var currentDate = new Date();

    // Check if any text is entered
    if (taskText.trim() !== "") {
        // Create a new element for the task
        var taskItem = document.createElement("li");

        // Create a checkbox for marking completed tasks
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.onclick = function() {
            // Toggle class for completed tasks
            taskItem.classList.toggle("completed");

            // Move completed task to the end of the list
            taskList.appendChild(taskItem);

            // Save tasks to local storage
            saveTasksToLocalStorage();
        };

        // Create an element to display the task text
        var taskTextSpan = document.createElement("span");
        taskTextSpan.textContent = taskText;
        taskTextSpan.className = "task-text";

        // Check and create an element with the task deadline
        if (dueDate) {
            var dueDateElement = document.createElement("span");
            dueDateElement.textContent = "Due: " + dueDate;
            dueDateElement.className = "due-date";

            // Check if the deadline is past the current date
            if (new Date(dueDate) < currentDate) {
                taskItem.classList.add("overdue");
            }

            taskItem.appendChild(dueDateElement);
            taskItem.dataset.dueDate = dueDate;
        }

        // Create a button to remove the task
        var removeButton = document.createElement("button");
        removeButton.innerHTML = "Remove";
        removeButton.className = "remove-button";
        removeButton.onclick = function() {
            // Remove the task from the list
            taskList.removeChild(taskItem);

            // Save tasks to local storage
            saveTasksToLocalStorage();
        };

        // Add created elements to the task
        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskTextSpan);
        taskItem.appendChild(removeButton);

        // Add the task to the end of the list
        taskList.appendChild(taskItem);

        // Clear input fields
        taskInput.value = "";
        taskDueDate.value = "";

        // Save tasks to local storage
        saveTasksToLocalStorage();
    }
}


// Funkce pro kontrolu termínů úkolů
function checkDueDates() {
    const taskList = document.getElementById("taskList");
    const currentDate = new Date();

    for (let i = 0; i < taskList.children.length; i++) {
        const task = taskList.children[i];
        const dueDate = new Date(task.dataset.dueDate);
        const checkbox = task.querySelector("input[type='checkbox']");

        if (dueDate < currentDate) {
            task.classList.add("overdue");
            checkbox.disabled = true;
        } else {
            task.classList.remove("overdue");
            checkbox.disabled = false;
        }
    }
}

function saveTasksToLocalStorage() {
    const taskList = document.getElementById("taskList");
    const tasks = [];

    for (let i = 0; i < taskList.children.length; i++) {
        const task = taskList.children[i];
        const taskText = task.querySelector(".task-text").textContent;
        const isCompleted = task.classList.contains("completed");
        const dueDate = task.dataset.dueDate;

        tasks.push({
            text: taskText,
            completed: isCompleted,
            dueDate: dueDate,
        });
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

f// Function for loading tasks from local storage
function loadTasksFromLocalStorage() {
    const taskList = document.getElementById("taskList");
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));

    // Checks if stored tasks are available
    if (storedTasks) {
        // Iterates through stored tasks and creates a new list item for each
        for (let i = 0; i < storedTasks.length; i++) {
            const task = storedTasks[i];
            const taskItem = document.createElement("li");

            // Creates a checkbox for marking completed tasks
            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.onclick = function() {
                // Adds or removes a class for a completed task
                taskItem.classList.toggle("completed");

                // Moves a completed task to the end of the list
                taskList.appendChild(taskItem);

                // Saves tasks to local storage
                saveTasksToLocalStorage();
            };

            // Creates an element for displaying the task text
            var taskTextSpan = document.createElement("span");
            taskTextSpan.textContent = task.text;
            taskTextSpan.className = "task-text";

            // Checks and creates an element with the task due date
            if (task.dueDate) {
                var dueDateElement = document.createElement("span");
                dueDateElement.textContent = "Due Date: " + task.dueDate;
                dueDateElement.className = "due-date";

                // Checks if the due date is before the current date
                if (new Date(task.dueDate) < new Date()) {
                    taskItem.classList.add("overdue");
                }

                taskItem.appendChild(dueDateElement);
                taskItem.dataset.dueDate = task.dueDate;
            }

            // Adds tasks to the end of the list
            taskList.appendChild(taskItem);

            // Creates a button for removing the task
            var removeButton = document.createElement("button");
            removeButton.innerHTML = "Remove";
            removeButton.className = "remove-button";
            removeButton.onclick = function() {
                // Removes the task from the list
                taskList.removeChild(taskItem);

                // Saves tasks to local storage
                saveTasksToLocalStorage();
            };

            // Adds the created elements to the task
            taskItem.appendChild(checkbox);
            taskItem.appendChild(taskTextSpan);
            taskItem.appendChild(removeButton);
            taskItem.dataset.dueDate = task.dueDate;

            // Checks if the task is completed and moves it to the end of the list
            if (task.completed) {
                taskItem.classList.add("completed");
                checkbox.checked = true;
                taskList.appendChild(taskItem);
            }
        }
    }
}

loadTasksFromLocalStorage();
checkDueDates();
