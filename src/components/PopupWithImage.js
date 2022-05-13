import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    //this._popup = selectorPopup;
    //this._eve = eve;
      //11.5.1 найти элементы в попапе
      this._sizeElementText = this._popup.querySelector("#size-txt-element");
      this._sizeElementImg = this._popup.querySelector("#size-image-element");
  }

  open(name, link) {
    super.open();
  
    // //11.5.2 находим элементы на сайте
    // this._sizeTextImg = this._eve.target.closest(".elements__item-list"); //нахожу элемент по которому кликнул
    // //11.5.3 получаю нужные значения из полей
    // this._text = this._sizeTextImg.querySelector(
    //   ".elements__cut-text"
    // ).textContent; //получаю нужное значение - текст мста
    // this._getImgByForm =
    //   this._sizeTextImg.querySelector(".elements__image").src;
    //11.5.4 подставляю нужные значения из полей
    this._sizeElementText.textContent = name; //вставляю текст в ПОПАП.
    this._sizeElementImg.src = link;
    this._sizeElementImg.alt = name;
  }
}
