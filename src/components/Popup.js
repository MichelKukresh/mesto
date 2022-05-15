export default class Popup {
  //отвечает за открытие и закрытие попапа
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);    
  }

  open() {
    //которые отвечают за открытие попапа.
    this._popup.classList.add("popup_is-open");
    document.addEventListener("keydown", this._handleEscClose);
    
  }

  close() {
    //которые отвечают за закрытие попапа.
    this._popup.classList.remove("popup_is-open"); 
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (event) => {
    //который содержит логику закрытия попапа клавишей Esc.
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    //который добавляет слушатель клика иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую область вокруг формы.
    //реализация закрытия
    this._popupClose = this._popup.querySelector(".popup__close");
    this._popupClose.addEventListener("click", () => {
      this.close();
    });

    //реализация ОВерлей
    this._popup.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("popup") ||
        evt.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }
}
