const userNameForm = document.querySelector(".username-form");
const userNameInput = userNameForm.querySelector("input");
const greeting = document.querySelector(".greetings");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function saveName(name) {
  localStorage.setItem(USER_LS, name);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = userNameInput.value;
  showGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  userNameForm.classList.add(SHOWING_CN);
  greeting.classList.remove(SHOWING_CN);

  userNameForm.addEventListener("submit", handleSubmit);
}

function showGreeting(name) {
  userNameForm.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${name}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);

  if (currentUser === null) {
    //doesn't have a username in localStorage
    askForName();
  } else {
    //has a username in localStorage
    showGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
