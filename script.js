const url = fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Dnipro,ua&appid=5477d9fdf2ec1fdf99c925f193f88c19"
);

url
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    document.querySelector(".wheather-app__temp").textContent = Math.round(
      data.main.temp - 273
    );
    document.querySelector(".wheather-app__condition").textContent =
      data.weather[0]["description"];
    document.querySelector(
      ".wheather-app__img"
    ).innerHTML = ` <img src="https://openweathermap.org/img/wn/${data.weather[0]["icon"]}@2x.png"> `;
  });

const TdButton = document.querySelector(".container-button");
const TdInput = document.getElementById("taskInput");
const TdList = document.querySelector(".content-task");

function addTdTask() {
  const task = TdInput.value.trim();
  if (task) {
    addTdTaskToList(task);
    TdInput.value = "";
    saveTdTasks();
  } else {
    alert("You should add the task");
  }
}
TdButton.addEventListener("click", addTdTask);

function addTdTaskToList(task) {
  const listitem = document.createElement("li");
  listitem.textContent = task;
  TdList.appendChild(listitem);
  const TdDeleteBytton = document.createElement("button");
  TdDeleteBytton.className = "content-task__btn";
  TdDeleteBytton.textContent = "Delete";
  listitem.appendChild(TdDeleteBytton);
  function deleteItem() {
    TdList.removeChild(listitem);
    saveTdTasks();
  }

  TdDeleteBytton.addEventListener("click", deleteItem);
}

function saveTdTasks() {
  const tasks = [];
  TdList.querySelectorAll("li").forEach((listItem) => {
    tasks.push(listItem.firstChild.textContent.trim());
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((task) => {
    addTdTaskToList(task);
  });
}

loadTasks();
