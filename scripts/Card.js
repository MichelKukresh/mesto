
import { openPopup } from "./index.js";

class Card {
    // в конструкторе будут динамические данные,
    // для каждого экземпляра свои
    constructor(name, link) {
        this._name = name;
        this._link = link;
        
    }

    // здесь выполним все необходимые операции, чтобы вернуть разметку
    _getTemplate() {
        // забираем разметку из HTML и клонируем элемент
        const itemTemplate = document
        .querySelector("#card-template") //ищет сам темпл
        .content
        .cloneNode(true);
        
        // вернём DOM-элемент карточки
        return itemTemplate;
    }
    
    generateCard() {
        // Запишем разметку в приватное поле _element. 
        // Так у других элементов появится доступ к ней.
        this._element = this._getTemplate();

        this._setEventListeners();//привязываем слушатель, а что и как описано ниже

        this._element.querySelector(".elements__cut-text").textContent = this._name;
        //11.2. Заменять в разметке текст
        this._element.querySelector(".elements__image").src = this._link;
        //11.2.1 добавить ALT
        this._element.querySelector(".elements__image").alt = this._name;

        // Вернём элемент наружу
        return this._element;
    }

    //реализайия лайка
    _handleMessegeClick(evt) { //описываем что будем и где делать        
        evt.target.classList.toggle("elements__hart_activ");
    }

    //Реализация удаления
    _elementDelete(event) {
        event.target.closest(".elements__item-list").remove(); //найти элемент ближайщий и закрыть его
    }

    //Раелизация открытия большой картинки - Зума
    _handleZoom(eve) {
        const popupImage = document.querySelector(".popup_type_image");
        openPopup(popupImage);
        //11.5.1 найти элементы в попапе
        const sizeElementText = popupImage.querySelector("#size-txt-element");
        const sizeElementImg = popupImage.querySelector("#size-image-element");
        //11.5.2 находим элементы на сайте
        const sizeTextImg = eve.target.closest(".elements__item-list"); //нахожу элемент по которому кликнул
        //11.5.3 получаю нужные значения из полей
        const text = sizeTextImg.querySelector(".elements__cut-text").textContent; //получаю нужное значение - текст мста
        const getImgByForm = sizeTextImg.querySelector(".elements__image").src;
        //11.5.4 подставляю нужные значения из полей
        sizeElementText.textContent = text; //вставляю текст в ПОПАП.
        sizeElementImg.src = getImgByForm;
        sizeElementImg.alt = text;
    }

    //1.1 функционал обработки событий - метод добавления события на кнопку(нужен для добавления нескольких слушателей)
    _setEventListeners() { //навешиваем само событие
        this._element.querySelector(".elements__hart").addEventListener('click', (evt) => {
            this._handleMessegeClick(evt);
        });

        this._element.querySelector(".elements__dell").addEventListener('click', (event) => {
            this._elementDelete(event);
        });

        this._element.querySelector(".elements__image").addEventListener("click", (eve) => {
            this._handleZoom(eve);
        })



    }


}


export {Card};



