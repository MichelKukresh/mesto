function enableValidation() {
    const form = document.querySelector('.popup__content[name="popup-content"]');//находим первый попап
    form.addEventListener('submit', handleFormSubmit); //слушатель на отправку формы
    form.addEventListener('input', handleFormInput);  // слушатель на ввод каждого символа, что бы сразу проверять

    const form2 = document.querySelector('.popup__content[name="popup-card-content"]');
    form2.addEventListener('submit', handleFormSubmit)
    form2.addEventListener('input', handleFormInput)
}
//создаем валидацию форм
function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget; //получаем форму
    const isValid = form.checkValidity(); //проверка валидности формы
    console.log(isValid);

    // if (isValid) { //сама проверка на валидность
    //     alert("valid");
    // } else {
    //     alert("no valid");
    // }
}
//создаем валидацию ИНПУТОВ
function handleFormInput(event) {
    const form = event.currentTarget;//получаем форму када повешено событие
    const input = event.target;//получаем поле где произошло событие

    //1. Найти невалидные поля и установить текст ошибок
    setCustomError(input);
    //2. Показать ошибки пользователям
    setFieldError(input);
    //3. Деактивировать кнопку
    setSubmitButtomState(form);
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

    if(input.typeMismatch) { //определяет соответсвие типа поля ввода ссылка.урл.текст.
        input.setCustomValidity("Это не ссылка");
    }
}

function setFieldError(input) {
    const span = document.querySelector(`#${input.id}-error`);
    span.textContent = input.validationMessage;// !! validationMassege сюда записывается из !!setCustomValidity

}

function setSubmitButtomState(form) {
    const button = form.querySelector(".popup__save");
    const isValid = form.checkValidity();

    console.log("Посмотрим состояние" + isValid);

    if(isValid) {
        button.classList.add("popup__save_valid");
        button.classList.remove("popup__save_invalid");
        button.removeAttribute("disabled");
        console.log("Добавил" + button);

    } else {        
        button.classList.add("popup__save_invalid");
        button.classList.remove("popup__save_valid");
        button.setAttribute("disabled", "disabled");//должен быть 2й параметр
        console.log("Удалил" + button);

    }

    

}

enableValidation(); //эта функция все и запускает