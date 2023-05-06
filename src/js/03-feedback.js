import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = 'feedback-form-state';

const user = {
  email: '',
  message: '',
};

const form = document.querySelector('form');
const input = document.querySelector('input');
const area = document.querySelector('textarea');
const button = document.querySelector('button');

form.addEventListener('input', throttle(curValue, 500));

function curValue(user) {
  user.email = input.value.trim();
  user.message = area.value.trim();
  save(LOCALSTORAGE_KEY, user);
}

window.addEventListener('load', event => {
  const a = load(LOCALSTORAGE_KEY);
  if (a != undefined) {
    // console.log("not empty - ", a);
    input.value = a.email;
    area.value = a.message;
  } else {
    // console.log("it's empty")
  }
});

button.addEventListener('click', onButtonClick);

function onButtonClick(event) {
  event.preventDefault();
  user.email = load(LOCALSTORAGE_KEY).email;
  user.message = load(LOCALSTORAGE_KEY).message;
  console.log(user);
  form.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
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
