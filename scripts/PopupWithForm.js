import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(selectorPopup, {handleFormSubmit}) { //+нужно установить колбек сабмита формы
        super(selectorPopup);
        this._popup = selectorPopup; 
        this._handleFormSubmit = handleFormSubmit;
    }

    // _getInputValues() { //собирать данные, выполню позже




    //  }

    setEventListeners() {
        super.setEventListeners();
        this._popupSubmit = this._popup.querySelector(".popup__content");
        this._popupSubmit.addEventListener("submit", (evt) => {
            this._handleFormSubmit(evt);
            this.close();
        });
        

    }

    close() {
        super.close();
        this._popupSubmit.reset();
        
    }





}

// Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
// Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
// Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
// Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
// Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
// Для каждого попапа создавайте свой экземпляр класса PopupWithForm.
