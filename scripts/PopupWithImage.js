import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(selectorPopup, eve) {
        super(selectorPopup);
        this._popup = selectorPopup;
        this._eve = eve; 
        
    }

    open() {
        super.open();
        //11.5.1 найти элементы в попапе
        this._sizeElementText = this._popup.querySelector("#size-txt-element");
        this._sizeElementImg = this._popup.querySelector("#size-image-element"); 
        //11.5.2 находим элементы на сайте
        this._sizeTextImg = this._eve.target.closest(".elements__item-list"); //нахожу элемент по которому кликнул
        //11.5.3 получаю нужные значения из полей
        this._text = this._sizeTextImg.querySelector(".elements__cut-text").textContent; //получаю нужное значение - текст мста
        this._getImgByForm = this._sizeTextImg.querySelector(".elements__image").src;
        //11.5.4 подставляю нужные значения из полей
        this._sizeElementText.textContent = this._text; //вставляю текст в ПОПАП.
        this._sizeElementImg.src = this._getImgByForm;
        this._sizeElementImg.alt = this._text;
      }
}

// Создайте класс PopupWithImage, который наследует от Popup. 
//Этот класс должен перезаписывать родительский метод open. 
//В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.







