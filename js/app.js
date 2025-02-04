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

let k = -1;

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

  if (tasks.length === 0) {
    listTasks.innerHTML = `
      <p class="no-data">Нет задач</p>
    `;
  } else arr.forEach((element) => createTask(element));
};
render(tasks);

const noData = (arr) => {
  if (arr.length === 0) listTasks.innerHTML = `<p class="no-data">Таких данных нет</p>`
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

  render(tasks);
  showFilter();
});

listTasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.id;
    tasks = tasks.filter((element) => element.id !== +id);
    render(tasks);
    showFilter();
  } else if (e.target.classList.contains("edit-btn")) {
    const id = +e.target.id;
    k = id;
    const edit = tasks.filter((element) => element.id === id)[0];
    editTitle.value = edit.title;
    editDescription.value = edit.subtitle;
    editStatus.value = edit.status;
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
    noData(filter)
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
  noData(filter);
});

completedCheckbox.addEventListener("change", () => {
  if (completedCheckbox.checked) {
    const filter = tasks.filter(
      (element) => element.status.toLowerCase() === "close"
    );
    render(filter);
    noData(filter);
    return;
  }
  render(tasks);
});

const closeModal = () => {
  modal.classList.remove("active");
  document.body.classList.remove('lock')
}

cancelButton.addEventListener("click", () => closeModal());

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  tasks.forEach((element) => {
    if (element.id === k) {
      element.title = editTitle.value;
      element.subtitle = editDescription.value;
      element.status = editStatus.value;
      element.date = new Date().toLocaleString();
    }
  });
  render(tasks);
  closeModal();
});

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});
