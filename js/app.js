console.log(localStorage);
const headerForm = document.getElementById("header__form");
const taskInput = document.getElementById("task__input");
const taskTextarea = document.getElementById("task__textarea");
const taskSelect = document.getElementById("task__select");
const listTasks = document.getElementById("list__tasks");
const mainSearch = document.getElementById("main__search");
const searchInput = document.getElementById("search__input");
const searchSelect = document.getElementById("search__select");
const completedCheckbox = document.getElementById("completedCheckbox");
const editForm = document.getElementById("editForm");
const editTitle = document.getElementById("editTitle");
const editDescription = document.getElementById("editDescription");
const editStatus = document.getElementById("editStatus");
const cancelButton = document.querySelector(".modal__close");
const modal = document.querySelector(".modal-overlay");
let tasks = [];

const showFilter = () => {
  if (tasks.length === 0) mainSearch.classList.add("none");
  else mainSearch.classList.remove("none");
};

const createTask = (element) => {
  const div = document.createElement("div");
  div.classList.add("list__tasks-item");
  div.innerHTML = `
  <ul>
    <li><h3>${element.title}</h3></li>
    <li><p>${element.subtitle}</p></li>
    <li>${element.status}</li>
    <li>${element.date}</li>
  </ul>
  <div>
    <button id="${element.id}" class="edit-btn">✏️</button>
    <button id="${element.id}" class="delete-btn">❌</button>
  </div>
  `;
  listTasks.appendChild(div);
};

const render = (arr) => {
  listTasks.innerHTML = "";
  if (arr.length === 0) {
    if (arr === tasks) {
      listTasks.innerHTML = `<p class="no-data">Нет задач</p>`;
    } else {
      listTasks.innerHTML = `<p class="no-data">Таких данных нет</p>`;
    }
  } else arr.forEach((element) => createTask(element));
};

if (localStorage.tasks) {
  tasks = JSON.parse(localStorage.tasks);
  render(tasks);
}

headerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const date = new Date();
  tasks.push({
    title: taskInput.value,
    subtitle: taskTextarea.value,
    status: taskSelect.value,
    date: date.toLocaleString(),
    id: tasks.length,
  });
  headerForm.reset();
  localStorage.tasks = JSON.stringify(tasks);
  render(tasks);
  showFilter();
});

listTasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.id;
    tasks = tasks.filter((element) => element.id !== +id);
    localStorage.tasks = JSON.stringify(tasks);
    render(tasks);
    showFilter();
  } else if (e.target.classList.contains("edit-btn")) {
    const id = +e.target.id;
    const editTask = tasks.find((element) => element.id === id);
    if (!editTask) return;
    editForm.currentTaskId = id;
    editTitle.value = editTask.title;
    editDescription.value = editTask.subtitle;
    editStatus.value = editTask.status;
    modal.classList.add("active");
    document.body.classList.add("lock");
  }
});
showFilter();

searchInput.addEventListener("input", (e) => {
  const { value } = e.target;
  if (value.length > 2) {
    const filter = tasks.filter((element) =>
      element.title.toLowerCase().includes(value.toLowerCase())
    );
    render(filter);
    return;
  }
  render(tasks);
});

searchSelect.addEventListener("change", (e) => {
  const { value } = e.target;
  if (value.toLowerCase() === "all") {
    render(tasks);
    return;
  }
  const filter = tasks.filter((element) => element.status === value);
  render(filter);
});

completedCheckbox.addEventListener("change", () => {
  if (completedCheckbox.checked) {
    const filter = tasks.filter(
      (element) => element.status.toLowerCase() === "close"
    );
    render(filter);
    return;
  }
  render(tasks);
});

const closeModal = () => {
  modal.classList.remove("active");
  document.body.classList.remove("lock");
  editForm.currentTaskId = null;
};

cancelButton.addEventListener("click", () => closeModal());

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = editForm.currentTaskId;
  tasks.forEach((element) => {
    if (element.id === id) {
      element.title = editTitle.value;
      element.subtitle = editDescription.value;
      element.status = editStatus.value;
      element.date = new Date().toLocaleString();
    }
  });
  localStorage.tasks = JSON.stringify(tasks);
  render(tasks);
  closeModal();
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});
