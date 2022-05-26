// Masking inputs
// from: https://github.com/estelle/input-masking/
// modified by @dmkrupin

const masking = {
  // User defined Values
  maskedInputs: document.querySelectorAll('.masked'),
  maskedNumber: 'XdDmMyY9',
  maskedLetter: '_',

  init() {
    masking.setUpMasks(masking.maskedInputs);
    masking.maskedInputs = document.querySelectorAll('.masked'); // Repopulating. Needed b/c static node list was created above.
    masking.activateMasking(masking.maskedInputs);
  },

  //Каждый инпут с классом masked оборачиваем в обертку
  setUpMasks(inputs) {
    for (let i = 0; i < inputs.length; i++) {
      masking.createShell(inputs[i]);
    }
  },

  // Создаем вокруг инпута обертку со спрятанной динамической маской
  createShell(input) {
    let text = '';
    let placeholder = input.getAttribute('data-placeholder');

    input.setAttribute('maxlength', placeholder.length);
    // input.setAttribute('data-placeholder', placeholder);
    // input.removeAttribute('placeholder');

    text =
      `<span class="shell">
      <span aria-hidden="true" id="${input.id}Mask">
      <i></i>${placeholder}</span>
      ${input.outerHTML}
      </span>`;

    input.outerHTML = text;
  },

  // Вешаем на каждый из инпутов обработчик отпускания клавиши
  activateMasking(inputs) {
    for (let i = 0; i < inputs.length; i++) {
      masking.maskedInputs[i].addEventListener('keyup', function(e) {
        masking.handleValueChange(e);
      }, false);
    }
  },

  // Обновляем значение маски после ввода символа. Добавил формат +7 ...
  setValueOfMask(e) {
    let value = e.target.value;
    let placeholder = e.target.getAttribute('data-placeholder');

    return `+7 <i>${value}</i>${placeholder.substr(3 + value.length)}`;
  },

  // Обработчик нажатия клавиши в инпуте, обрабатываем значение инпута и обновляем скрытую маску
  handleValueChange(e) {
    // Получаем id инпута
    let id = e.target.getAttribute('id');

    // Пропускаем служебные клавиши
    switch (e.keyCode) { // allows navigating thru input
      case 20: // capslock
      case 17: // control
      case 18: // option
      case 16: // shift
      case 37: // arrow keys
      case 38:
      case 39:
      case 40:
      case 9: // tab (let blur handle tab)
        return;
    }

    // Записываем в значение инпута ОБРАБОТАННЫЙ ввод
    document.getElementById(id).value = masking.handleCurrentValue(e);
    // Записываем в скрытую динамическую маску
    document.getElementById(id + 'Mask').innerHTML = masking.setValueOfMask(e);
  },

  // Обработчик значения инпута
  handleCurrentValue(e) {
    let isCharsetPresent = e.target.getAttribute('data-charset');
    let placeholder = isCharsetPresent || e.target.getAttribute('data-placeholder');
    let value = e.target.value;
    let newValue = '';

    // Обрезаем спецсимволы и +7
    let strippedValueBuffer = value.replace("+7", ""); // Если 7 - первый символ, то он обрезается, надо поправить
    let strippedValue = isCharsetPresent ? strippedValueBuffer.replace(/\W/g, "") : strippedValueBuffer.replace(/\D/g, "");

    for (let i = 0, j = 0; i < placeholder.length; i++) {
      let isInt = !isNaN(parseInt(strippedValue[j]));
      let isLetter = strippedValue[j] ? strippedValue[j].match(/[A-Z]/i) : false;
      let matchesNumber = masking.maskedNumber.indexOf(placeholder[i]) >= 0;
      let matchesLetter = masking.maskedLetter.indexOf(placeholder[i]) >= 0;

        if ((matchesNumber && isInt) || (isCharsetPresent && matchesLetter && isLetter)) {

                newValue += strippedValue[j++];

          } else if ((!isCharsetPresent && !isInt && matchesNumber) || (isCharsetPresent && ((matchesLetter && !isLetter) || (matchesNumber && !isInt)))) {
                // masking.errorOnKeyEntry(); // write your own error handling function
                return newValue;

        } else {
            newValue += placeholder[i];
        }
        // break if no characters left and the pattern is non-special character
        if (strippedValue[j] == undefined) {
          break;
        }
    }
    if (e.target.getAttribute('data-valid-example')) {
      return masking.validateProgress(e, newValue);
    }
    return newValue;
  },

  validateProgress(e, value) {
    var validExample = e.target.getAttribute('data-valid-example'),
      pattern = new RegExp(e.target.getAttribute('pattern')),
      placeholder = e.target.getAttribute('data-placeholder'),
      l = value.length, testValue = '';

    //convert to months
    if (l == 1 && placeholder.toUpperCase().substr(0,2) == 'MM') {
      if(value > 1 && value < 10) {
        value = '0' + value;
      }
      return value;
    }
    // test the value, removing the last character, until what you have is a submatch
    for ( i = l; i >= 0; i--) {
      testValue = value + validExample.substr(value.length);
      if (pattern.test(testValue)) {
        return value;
      } else {
        value = value.substr(0, value.length-1);
      }
    }

    return value;
  },

  errorOnKeyEntry : function () {
    // Write your own error handling
  }
}

export {masking};
