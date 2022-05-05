import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, { handleFormSubmit }) {
    //+нужно установить колбек сабмита формы
    super(selectorPopup);
    this._popup = selectorPopup;
    this._handleFormSubmit = handleFormSubmit;
  }

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

