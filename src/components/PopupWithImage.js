import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._sizeElementText = this._popup.querySelector("#size-txt-element");
    this._sizeElementImg = this._popup.querySelector("#size-image-element");
  }

  open(name, link) {
    super.open();
    this._sizeElementText.textContent = name; //вставляю текст в ПОПАП.
    this._sizeElementImg.src = link;
    this._sizeElementImg.alt = name;
  }
}
