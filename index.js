let array = [];
const inputDeck = document.querySelector("#inputDeck");
const tableWorkers = document.querySelector(".tableWorkers");
const btnSum = document.querySelector("#btnSum");
const btnDelete = document.querySelector("#btnDelete");

//=====================EVENTS==========================

inputDesk.addEventListener("click", (event) => {
  if (event.target.closest("#btnAddWorker")) {
    event.preventDefault();
    addWorker();
    const workersNum = workersNumber();
    const workersNumber_value = document.querySelector("#workersNumber_value");
    workersNumber_value.innerHTML = `${workersNum}`;
  }
});

tableWorkers.addEventListener("click", (event) => {
  if (event.target.closest(".checkWorker")) {
    updateCheckbox(event);
  } else if (event.target.closest(".btnSortHigh")) {
    sortHigh(event);
  } else if (event.target.closest(".btnSortLow")) {
    sortLow(event);
  }
  const workersNum = workersNumber();
  const workersNumber_value = document.querySelector("#workersNumber_value");
  workersNumber_value.innerHTML = `${workersNum}`;
});

btnSum.addEventListener("click", (event) => {
  const sum = +salarySum();
  const sumSalary_value = document.querySelector("#sumSalary_value");
  sumSalary_value.innerHTML = `${sum}`;
});

btnDelete.addEventListener("click", (event) => {
  for (let i = 0; i <= array.length - 1; i++) {
    if (array[i].check === true) {
      array.splice(i, 1);
      i = -1;
    }
  }
  drawTable(array);
  const workersNum = workersNumber();
  const workersNumber_value = document.querySelector("#workersNumber_value");
  workersNumber_value.innerHTML = `${workersNum}`;
});

//=====================FUNCTIONS==========================

function addWorker() {
  const inputName = document.querySelector("#inputName");
  const inputYear = document.querySelector("#inputYear");
  const inputDate = document.querySelector("#inputDate");
  const inputSalary = document.querySelector("#inputSalary");

  array.push({
    check: false,
    name: inputName.value,
    year: inputYear.value,
    date: inputDate.value,
    salary: inputSalary.value,
  });

  drawTable(array);
}

function drawTable(array) {
  tableWorkers_content.innerHTML = "";
  array.forEach((item) => {
    tableWorkers_content.innerHTML += `<tr class="tableWorkers_cell">
      <td class="tableWorkers_cell tableWorkers_check"><input type="checkbox" class = "checkWorker"/></td>
      <td class="tableWorkers_cell tableWorkers_name">${item.name}</td>
      <td class="tableWorkers_cell tableWorkers_year">${item.year}</td>
      <td class="tableWorkers_cell tableWorkers_date">${item.date}</td>
      <td class="tableWorkers_cell tableWorkers_salary">${item.salary}</td>
    </tr>`;
  });
}

function updateCheckbox(event) {
  const worker = event.target.closest("tr");
  const check = worker.querySelector(".checkWorker");
  const name = worker.querySelector(".tableWorkers_name").textContent;
  const year = worker.querySelector(".tableWorkers_year").textContent;
  const date = worker.querySelector(".tableWorkers_date").textContent;
  const salary = worker.querySelector(".tableWorkers_salary").textContent;

  array.forEach((item) => {
    if (
      item.name === name &&
      item.year === year &&
      item.date === date &&
      item.salary === salary
    ) {
      if (check.checked) {
        item.check = true;
      } else {
        item.check = false;
      }
    }
  });
}

function salarySum() {
  let sum = 0;
  array.forEach((item) => {
    sum += +item.salary;
  });
  return sum;
}

function workersNumber() {
  let counter = 0;
  array.forEach((item) => {
    counter++;
  });
  return counter;
}

function sortHigh(event) {
  if (event.target.closest("th").textContent.includes("Date of Birth")) {
    array.sort((prev, next) => prev.year - next.year);
  } else if (
    event.target.closest("th").textContent.includes("Employment date")
  ) {
    array.sort(function (prev, next) {
      return new Date(prev.date) - new Date(next.date);
    });
  }
  drawTable(array);
}

function sortLow(event) {
  if (event.target.closest("th").textContent.includes("Date of Birth")) {
    array.sort((prev, next) => next.year - prev.year);
  } else if (
    event.target.closest("th").textContent.includes("Employment date")
  ) {
    array.sort(function (prev, next) {
      return new Date(next.date) - new Date(prev.date);
    });
  }
  drawTable(array);
}
