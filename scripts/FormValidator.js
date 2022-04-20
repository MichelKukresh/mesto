class FormValidator {
    constructor(configValidation, popup) {
        this._formSelector = configValidation.formSelector;
        this._buttonValid = configValidation.buttonValid;
        this._submitButtonSelector = configValidation.submitButtonSelector;
        this._popup = popup;
    }




    _handleFormInput = (event) => {
      const form = event.currentTarget; //получаем форму када повешено событие
      const input = event.target; //получаем поле где произошло событие
    
      //1. Найти невалидные поля и установить текст ошибок
      this._setCustomError(input);
      //2. Показать ошибки пользователям
      this._setFieldError(input);
      //3. Деактивировать кнопку
      this._setSubmitButtomState(form);
    }


    enableValidation() {

      this._setEventListeners();




    }


    _setEventListeners() {
      this._popup.querySelector(this._formSelector).addEventListener("submit", (evt) => {
            evt.preventDefault();
          });
          this._popup.querySelector(this._formSelector).addEventListener("input", (event) => {
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
      
      //работа с кнопкой
      _setSubmitButtomState = (form) => {
        const button = form.querySelector(this._submitButtonSelector);
        const isValid = form.checkValidity();
      
        if (isValid) {
          button.classList.add(this._buttonValid);
          button.removeAttribute("disabled");
        } else {    
          button.classList.remove(this._buttonValid);
          button.setAttribute("disabled", "disabled"); //должен быть 2й параметр
        }
      }



    
}






// Создайте класс FormValidator, который настраивает валидацию полей формы:
// принимает в конструктор объект настроек с селекторами и классами формы;
// принимает вторым параметром элемент той формы, которая валидируется;
// имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
// имеет публичный метод -- enableValidation --, который включает валидацию формы.
// Для каждой проверяемой формы создайте экземпляр класса FormValidator.




// function enableValidation(config) {
//     const formList = Array.from(document.querySelectorAll(config.formSelector)); // 1. делает массив из форм в документе
//     formList.forEach((formElement) => {
//       //2. в массиве присваивает всем слушатель САБМИТ и запрет перезагрузки
//       formElement.addEventListener("submit", (evt) => {
//         evt.preventDefault();
//       });
//       formElement.addEventListener("input", (event) =>
//         handleFormInput(event, config)
//       );
//     });
//   }
//   //создаем валидацию форм
//   function handleFormSubmit(event) {
//     event.preventDefault();
//     const form = event.currentTarget; //получаем форму
//     const isValid = form.checkValidity(); //проверка валидности формы
//   }
//   //создаем валидацию ИНПУТОВ
//   function handleFormInput(event, config) {
//     const form = event.currentTarget; //получаем форму када повешено событие
//     const input = event.target; //получаем поле где произошло событие
  
//     //1. Найти невалидные поля и установить текст ошибок
//     setCustomError(input);
//     //2. Показать ошибки пользователям
//     setFieldError(input);
//     //3. Деактивировать кнопку
//     setSubmitButtomState(form, config);
//   }
  
//   function setCustomError(input) {
//     //проверка поля на ошибку
//     const validity = input.validity; //validity берем из библиотеки MD
//     input.setCustomValidity(""); //убираем ошибку после каждого ввода символа  
//   }
  
//   function setFieldError(input) {
//     const span = document.querySelector(`#${input.id}-error`);
//     span.textContent = input.validationMessage; // !! validationMassege сюда записывается из !!setCustomValidity
//   }
  
//   //работа с кнопкой
//   function setSubmitButtomState(form, configValidation) {
//     const button = form.querySelector(configValidation.submitButtonSelector);
//     const isValid = form.checkValidity();
  
//     if (isValid) {
//       button.classList.add(configValidation.buttonValid);
//       button.removeAttribute("disabled");
//     } else {    
//       button.classList.remove(configValidation.buttonValid);
//       button.setAttribute("disabled", "disabled"); //должен быть 2й параметр
//     }
//   }
  
//   //эта функция все и запускает
//   // enableValidation({
//   //   formSelector: ".popup__content",
//   //   buttonValid: "popup__save_valid",
//   //   submitButtonSelector: ".popup__save",
//   // });
  
  export { FormValidator };