import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = 'feedback-form-state';

const user = {
  email: '',
  message: '',
};

const form = document.querySelector('form');
const input = document.querySelector('input');
const area = document.querySelector('textarea');

form.addEventListener('input', throttle(curValue, 500));

function curValue(user) {
  user.email = input.value.trim();
  user.message = area.value.trim();
  save(LOCALSTORAGE_KEY, user);
}

window.addEventListener('load', event => {
  const data = load(LOCALSTORAGE_KEY);
  if (data != undefined) {
    input.value = data.email;
    area.value = data.message;
  }
});

// --------------------//-----------------

// button.addEventListener('click', onButtonClick);

// function onButtonClick(event) {
//   event.preventDefault();
//   user.email = load(LOCALSTORAGE_KEY).email;
//   user.message = load(LOCALSTORAGE_KEY).message;
//   console.log(user);
//   form.reset();
//   localStorage.removeItem(LOCALSTORAGE_KEY);
// }

// --------------------//-----------------

form.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();  
  const {elements : {email, message}} = event.currentTarget;
  if (email.value === "" || message.value === ""){
      alert("Warning, all fields must be filled")
  } else {
  user.email = load(LOCALSTORAGE_KEY).email;
  user.message = load(LOCALSTORAGE_KEY).message;
  console.log(user);
  localStorage.removeItem(LOCALSTORAGE_KEY);
  form.reset();
  }
}

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};
