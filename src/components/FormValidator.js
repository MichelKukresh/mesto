class FormValidator {
  constructor(configValidation, popup) {
    this._formSelector = configValidation.formSelector;
    this._buttonValid = configValidation.buttonValid;
    //this._submitButtonSelector = configValidation.submitButtonSelector;
    this._submitButton =  popup.querySelector(configValidation.submitButtonSelector); 
    this._popup = popup.querySelector(this._formSelector);
  }

  enableValidation() {
    this._setEventListeners();
  }

  _handleFormInput = (event) => {
    const form = event.currentTarget; //получаем форму када повешено событие
    const input = event.target; //получаем поле где произошло событие

    //1. Найти невалидные поля и установить текст ошибок
    this._setCustomError(input);
    //2. Показать ошибки пользователям
    this._setFieldError(input);
    //3. Деактивировать кнопку
    this._toggleButtonState(form);
  };

  _setEventListeners() {
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._popup.addEventListener("input", (event) => {
      this._handleFormInput(event);
    });
  }

  _setCustomError(input) {
    //проверка поля на ошибку
    const validity = input.validity; //validity берем из библиотеки MD
    input.setCustomValidity(""); //убираем ошибку после каждого ввода символа
  }

  _setFieldError(input) {
    const span = document.querySelector(`#${input.id}-error`);
    span.textContent = input.validationMessage; // !! validationMassege сюда записывается из !!setCustomValidity
  }

  toggleButtonStateOn = () => {
    this._submitButton.classList.add(this._buttonValid);
    this._submitButton.removeAttribute("disabled");
  };

  toggleButtonStateOff = () => {
    this._submitButton.classList.remove(this._buttonValid);
    this._submitButton.setAttribute("disabled", "disabled"); //должен быть 2й параметр
  };

  //работа с кнопкой
  _toggleButtonState = (form) => {
    //const button = form.querySelector(this._submitButtonSelector);
    const isValid = form.checkValidity();

    if (isValid) {
      this.toggleButtonStateOn();
    } else {
      this.toggleButtonStateOff();
    }
  };
}

export { FormValidator };
