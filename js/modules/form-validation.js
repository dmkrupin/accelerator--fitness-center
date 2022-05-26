let form = document.querySelector('form');
let name = form.querySelector('[name="name"]');
let tel = form.querySelector('[name="tel"]');

let isStorageSupport = true;
let storage = {};

export const initFormValidation = () => {
  try {
    storage = JSON.parse(localStorage.getItem('storage'));
  } catch (err) {
    isStorageSupport = false;
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (storage) {
      name.value = storage.name;
      tel.value = storage.tel;
    }
  });

  form.addEventListener('submit', function () {
    if (isStorageSupport) {
      storage = {
        name: name.value,
        tel: tel.value,
      };
      localStorage.setItem('storage', JSON.stringify(storage));
    }
  });

  tel.addEventListener('click', (evt) => {
    if (tel.selectionStart < 4) {
      tel.selectionStart = tel.value.length;
    }
    if (evt.key === 'Backspace' && tel.value.length <= 4) {
      evt.preventDefault();
    }
  });

  tel.addEventListener('keydown', (evt) => {
    if (evt.key === 'Backspace' && tel.value.length <= 4) {
      evt.preventDefault();
    }
    if (evt.key === 'ArrowLeft' && tel.value.length <= 4) {
      evt.preventDefault();
    }
  });

  tel.addEventListener('keypress', (evt) => {
    if (evt.keyCode < 47 || evt.keyCode > 57 || tel.value.length === 16) {
      evt.preventDefault();
    }
    if (tel.value.length === 0) {
      tel.value = '+7 (';
      tel.selectionStart = tel.value.length;
    }
    if (tel.value.length === 7) {
      tel.value += ') ';
    }
  });

  tel.addEventListener('blur', () => {
    if (tel.value === '+7(') {
      tel.value = '';
    }
  });
};
