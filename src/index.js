document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("create-task-form");
  const tasksList = document.getElementById("tasks");
  const sortAscButton = document.getElementById("sort-asc");
  const sortDescButton = document.getElementById("sort-desc");
  let tasks = [];

  form.addEventListener("submit", function (event) {
    event.preventDefault();
   console.log("form submitted");

    const newTaskDescription = document.getElementById("new-task-description").value;
    const priority = document.getElementById("priority").value;
    const user = document.getElementById("user").value;
    const dueDateElement = document.getElementById("due-date");
    const dueDate = dueDateElement && dueDateElement.value ? dueDateElement.value : new Date().toISOString().split('T')[0];

    const newTask = {
      description: newTaskDescription,
      priority: priority,
      user: user,
      dueDate: dueDate
    };

    tasks.push(newTask);
    renderTasks();
    form.reset();
  });

  sortAscButton.addEventListener("click", function () {
    tasks.sort((a, b) => a.priority.localeCompare(b.priority));
    renderTasks();
  });

  
  function renderTasks() {
    tasksList.innerHTML = "";
    tasks.forEach((task, index) => {
      const taskItem = document.createElement("li");
      taskItem.innerHTML = `${task.description} - ${task.priority} - ${task.user} - ${task.dueDate}`;
      taskItem.style.color = getColorByPriority(task.priority);

      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
      deleteButton.addEventListener("click", function () {
        tasks.splice(index, 1);
        renderTasks();
      });

      const editButton = document.createElement("button");
      editButton.innerText = "Edit";
      editButton.addEventListener("click", function () {
        form.elements["new-task-description"].value = task.description;
        form.elements["priority"].value = task.priority;
        form.elements["user"].value = task.user;
        form.elements["due-date"].value = task.dueDate;
        tasks.splice(index, 1);
      });

      taskItem.appendChild(deleteButton);
      taskItem.appendChild(editButton);
      tasksList.appendChild(taskItem);
    });
  }

  function getColorByPriority(priority) {
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "yellow";
      case "low":
        return "green";
      default:
        return "black";
    }
  }
});