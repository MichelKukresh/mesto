function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector)); // 1. делает массив из форм в документе
  formList.forEach((formElement) => {
    //2. в архиме присваивает всем слушатель САБМИТ и запрет перезагрузки
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    formElement.addEventListener("input", (event) =>
      handleFormInput(event, config)
    );
  });
}
//создаем валидацию форм
function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget; //получаем форму
  const isValid = form.checkValidity(); //проверка валидности формы
}
//создаем валидацию ИНПУТОВ
function handleFormInput(event, config) {
  const form = event.currentTarget; //получаем форму када повешено событие
  const input = event.target; //получаем поле где произошло событие

  //1. Найти невалидные поля и установить текст ошибок
  setCustomError(input);
  //2. Показать ошибки пользователям
  setFieldError(input);
  //3. Деактивировать кнопку
  setSubmitButtomState(form, config);
}

function setCustomError(input) {
  //проверка поля на ошибку
  const validity = input.validity; //validity берем из библиотеки MD
  input.setCustomValidity(""); //убираем ошибку после каждого ввода символа  
}

function setFieldError(input) {
  const span = document.querySelector(`#${input.id}-error`);
  span.textContent = input.validationMessage; // !! validationMassege сюда записывается из !!setCustomValidity
}

//работа с кнопкой
function setSubmitButtomState(form, config) {
  const button = form.querySelector(config.submitButtonSelector);
  const isValid = form.checkValidity();

  if (isValid) {
    button.classList.add(config.buttonValid);
    button.removeAttribute("disabled");
  } else {    
    button.classList.remove(config.buttonValid);
    button.setAttribute("disabled", "disabled"); //должен быть 2й параметр
  }
}

//эта функция все и запускает
enableValidation({
  formSelector: ".popup__content",
  buttonValid: "popup__save_valid",
  submitButtonSelector: ".popup__save",
});
