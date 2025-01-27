const headerForm = document.getElementById("header__form");
const listTasks = document.getElementById("list__tasks");
const taskInput = document.getElementById("task__input");
const taskTextarea = document.getElementById("task__textarea");
const taskSelect = document.getElementById("task__select");

const mainSearch = document.getElementById('main__search')

const searchSelect = document.getElementById("search__select");
const searchInput = document.getElementById("search__input");
const searchButton = document.getElementById("search__button");


const notes = [
  {
    title: "Разработка функции поиска",
    subtitle:
      "Добавить поле ввода для поиска и реализовать функцию фильтрации задач по ключевым словам. Поле ввода должно быть стилизовано в соответствии с общим дизайном приложения. Функция поиска должна быть нечувствительна к регистру и обновлять список задач в реальном времени при вводе ключевых слов.",
    status: "Open",
    dateString: "27.01.2025, 10:00:00",
  },
  {
    title: "Тестирование функции поиска",
    subtitle:
      "Провести тестирование функции поиска на различных устройствах и браузерах. Убедиться, что функция поиска работает корректно при вводе различных ключевых слов и символов. Проверить производительность функции поиска и убедиться, что она не влияет на общую производительность приложения.",
    status: "Critical",
    dateString: "27.01.2025, 14:30:00",
  },
  {
    title: "Исправление багов",
    subtitle:
      "Исправить ошибки, выявленные в процессе тестирования функции поиска. Убедиться, что все баги исправлены и функция поиска работает корректно. Провести повторное тестирование после исправления багов, чтобы убедиться, что все проблемы решены.",
    status: "Close",
    dateString: "27.01.2025, 09:15:00",
  },
  {
    title: "Обновление документации",
    subtitle:
      "Обновить документацию по использованию функции поиска и добавить примеры использования. Убедиться, что документация понятна и содержит все необходимые сведения для пользователей. Провести рецензирование документации среди команды, чтобы убедиться, что она полная и точная.",
    status: "Open",
    dateString: "27.01.2025, 11:45:00",
  },
  {
    title: "Оптимизация производительности",
    subtitle:
      "Провести анализ производительности приложения и оптимизировать функцию поиска для улучшения скорости работы. Убедиться, что функция поиска работает быстро и эффективно даже при большом количестве задач. Провести тестирование производительности после оптимизации, чтобы убедиться, что все изменения положительно влияют на скорость работы приложения.",
    status: "Critical",
    dateString: "27.01.2025, 16:20:00",
  },
];



const render = (filteredNotes = notes) => {
  listTasks.innerHTML = "";
  if (filteredNotes.length === 0 && notes.length > 0) {
    listTasks.insertAdjacentHTML(
      "beforeend",
      `<p class="no-data">Таких данных нет</p>`
    );
  } else {
    for (let i = 0; i < filteredNotes.length; i++) {
      listTasks.insertAdjacentHTML(
        "beforeend",
        getNoteTemplate(filteredNotes[i], i)
      );
    }
  }
  searchVisibility();
};

const getNoteTemplate = (note, index) => {
  return `
  <div>
    <ul>
      <li><h3>${note.title}</h3></li>
      <li><p>${note.subtitle}</p></li>
      <li>${note.status}</span></li>
      <li>${note.dateString}</li>
    </ul>
    <button data-type ="remove" data-index ="${index}">❌</button>
  </div>
  `;
}

const filterNotes = () => {
  const selectedStatus = searchSelect.value;
  const searchText = searchInput.value.toLowerCase();
  return notes.filter((note) => {
    const matchesStatus =
      selectedStatus === "All" || note.status === selectedStatus;
    const matchesText = note.title.toLowerCase().includes(searchText);
    return matchesStatus && matchesText;
  });
};

const searchVisibility = () => {
  if (notes.length === 0) mainSearch.classList.add("none")
  else mainSearch.classList.remove("none")

}

render();

headerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const currentDate = new Date();
  const dateString = currentDate.toLocaleString();

  const newNote = {
    title: taskInput.value,
    subtitle: taskTextarea.value,
    status: taskSelect.value,
    dateString: dateString,
  };

  notes.push(newNote)
  render()
  taskInput.value = ''
  taskTextarea.value = ''
  
});

listTasks.addEventListener('click',event => {
  const index = +(event.target.dataset.index)
  if (event.target.dataset.type === 'remove'){
    notes.splice(index, 1)
  }
  render()
})


searchSelect.addEventListener("change", () => {
  render(filterNotes());
});

mainSearch.addEventListener("submit", (e) => {
  e.preventDefault();
  render(filterNotes());
});