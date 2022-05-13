import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, { handleFormSubmit }) {
    //+нужно установить колбек сабмита формы
    super(selectorPopup);
    //this._popup = selectorPopup;
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._formValues = this._popup.querySelectorAll('input');
    this.arr = [];
    this.obj = {};    
    this._formValues.forEach((items) => this.arr.push(items.value));
    this.obj = {...this.arr}
    return this.obj;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupFormSubmit = this._popup.querySelector(".popup__content");      
    this._popupFormSubmit.addEventListener("submit", (evt) => {
    //this._formValues = this._getInputValues(); 
      this._handleFormSubmit(evt, this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._popupFormSubmit.reset();
  }
}

