const toDoForm = document.querySelector(".todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".todo-list");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);

  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); //object->string
}

function drawToDo(toDoText) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const newId = toDos.length + 1;

  span.innerText = toDoText;
  delBtn.innerText = "x";
  delBtn.addEventListener("click", deleteToDo);

  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);

  const toDoOjb = {
    text: toDoText,
    id: newId
  };
  toDos.push(toDoOjb);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();

  const currentValue = toDoInput.value;
  drawToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadToDos = localStorage.getItem(TODOS_LS);

  if (loadToDos !== null) {
    //has toDos in localStorage
    const parsedToDos = JSON.parse(loadToDos); //string->object

    parsedToDos.forEach(function (toDo) {
      drawToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
