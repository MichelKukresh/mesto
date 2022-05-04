export default class Popup { //отвечает за открытие и закрытие попапа
    constructor(selectorPopup) {
        this._popup = selectorPopup;         
    }

    open() { //которые отвечают за открытие попапа.

        this._popup.classList.add("popup_is-open");
        document.addEventListener("keydown", (event) => {
            this._handleEscClose(event);
        });

    } 
    
    close() {//которые отвечают за закрытие попапа.
        this._popup.classList.remove("popup_is-open");
        document.removeEventListener("keydown", (event) => {
            this._handleEscClose(event);
        });
    }

    _handleEscClose(event) {//который содержит логику закрытия попапа клавишей Esc.
        if (event.key === "Escape") {
            //const popupActive = document.querySelector(".popup_is-open");
            this.close();
          }
    }

    setEventListeners() {//который добавляет слушатель клика иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую область вокруг формы.
        //реализация закрытия
        this._popupClose = this._popup.querySelector(".popup__close");
        this._popupClose.addEventListener("click", () => {
            this.close();
          });

        //реализация ОВерлей
        this._popup.addEventListener("click", (event) => {
            if (event.target === event.currentTarget) {
                this.close();
            }
        }  
        );

        

    }
}















// Создайте класс Popup
// Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:
// Принимает в конструктор единственный параметр — селектор попапа.
// Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
// Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
// Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую область вокруг формы.