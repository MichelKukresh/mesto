class FormValidator {
  constructor(configValidation, popup) {
    this._formSelector = configValidation.formSelector;
    this._buttonValid = configValidation.buttonValid;
    //this._submitButtonSelector = configValidation.submitButtonSelector;
    this._popup = document.querySelector(popup);
    this._submitButton =  this._popup.querySelector(configValidation.submitButtonSelector); 
    this._popupContent = this._popup.querySelector(this._formSelector);
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
    this._popupContent.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._popupContent.addEventListener("input", (event) => {
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
  
  //сброс ошибок при открытии формы
  resetInputError() {
    this._spanOnPopup = this._popup.querySelectorAll("span");
    this._spanOnPopup.forEach((items) => items.textContent = "" );
  }

}

export { FormValidator };

// _getInputValues() {
//   this._formValues = this._popup.querySelectorAll('input');
//   this.arr = [];
//   this.obj = {};    
//   this._formValues.forEach((items) => this.arr.push(items.value));
//   this.obj = {...this.arr}
//   return this.obj;
// }