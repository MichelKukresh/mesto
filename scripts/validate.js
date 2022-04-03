function enableValidation(config) {
    const form = document.querySelector(config.formSelector);//находим первый попап
    form.addEventListener('submit', handleFormSubmit); //слушатель на отправку формы
    form.addEventListener('input', (event) => handleFormInput(event, config));  // слушатель на ввод каждого символа, что бы сразу проверять

    // const form2 = document.querySelector('.popup__content[name="popup-card-content"]');
    // form2.addEventListener('submit', handleFormSubmit)
    // form2.addEventListener('input', handleFormInput)
}
//создаем валидацию форм
function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget; //получаем форму
    const isValid = form.checkValidity(); //проверка валидности формы
    console.log(isValid);

}
//создаем валидацию ИНПУТОВ
function handleFormInput(event, config) {
    const form = event.currentTarget;//получаем форму када повешено событие
    const input = event.target;//получаем поле где произошло событие

    //1. Найти невалидные поля и установить текст ошибок
    setCustomError(input);
    //2. Показать ошибки пользователям
    setFieldError(input);
    //3. Деактивировать кнопку
    setSubmitButtomState(form, config);
}

function setCustomError(input) {//проверка поля на ошибку
    const validity = input.validity; //validity берем из библиотеки MD

    input.setCustomValidity("");//убираем ошибку после каждого ввода символа
    
    if (validity.tooShort || validity.tooLong) { //конструкция определения укладывается ли данные в мин.мах
        const currentLength = input.value.length; //получаем текущую длину
        const min = input.getAttribute('minlength'); //получаем заданную длину мин 
        const max = input.getAttribute('maxlength'); //получаем заданную длину ман
        input.setCustomValidity(`Минимальное количество символов: ${min}. Длина текста сейчас: ${currentLength} символ.`); //!! setCustomValidity загугли MDN

    }

    if(validity.typeMismatch) { //определяет соответсвие типа поля ввода ссылка.урл.текст.
        input.setCustomValidity("Это не ссылка");
    }
}

function setFieldError(input) {
    const span = document.querySelector(`#${input.id}-error`);
    span.textContent = input.validationMessage;// !! validationMassege сюда записывается из !!setCustomValidity

}

//работа с кнопкой
function setSubmitButtomState(form, config) {
    const button = form.querySelector(".popup__save");
    const isValid = form.checkValidity();

    if(isValid) {
        button.classList.add(config.buttonValid);
        button.classList.remove(config.buttonInValid);
        button.removeAttribute("disabled");

    } else {        
        button.classList.add(config.buttonInValid);
        button.classList.remove(config.buttonValid);
        button.setAttribute("disabled", "disabled");//должен быть 2й параметр
        
    }

    

}

//эта функция все и запускает
enableValidation({ 
    formSelector: '.popup__content[name="popup-content"]',
    buttonValid: "popup__save_valid",
    buttonInValid: "popup__save_invalid",
}); 

enableValidation({ 
    formSelector: '.popup__content[name="popup-card-content"]',
    buttonValid: "popup__save_valid",
    buttonInValid: "popup__save_invalid",
}); 

// enableValidation({
//     --formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button_disabled',
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__error_visible'
//   }); 