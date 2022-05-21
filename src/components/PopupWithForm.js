import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, { handleFormSubmit }) {
    //+нужно установить колбек сабмита формы
    super(selectorPopup);
    //this._popup = selectorPopup;
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._formList = this._popup.querySelectorAll("input");
    this._formValues = {};
    this._formList.forEach((input) => this._formValues[input.name] = input.value);    
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupFormSubmit = this._popup.querySelector(".popup__content");
    //для отображения данных об сохранении передаю попал в хендл
    this._buttonInfomationAboutSave = this._popup.querySelector(".popup__save");
    this._popupFormSubmit.addEventListener("submit", (evt) => {
      evt.preventDefault();
      
      this._handleFormSubmit( this._getInputValues(), this._buttonInfomationAboutSave);
      
      //this.close();
    });
  }

  close() {
    super.close();
    this._popupFormSubmit.reset();
  }
}
