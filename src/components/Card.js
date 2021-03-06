class Card {
  // в конструкторе будут динамические данные,
  // для каждого экземпляра свои
  constructor(
    name,
    link,
    likes,
    owner,
    _id,
    api,
    myId,
    handleCardClick,
    handleCardClickHeart,
    handleClickFormDel
  ) {
    this._handleClickFormDel = handleClickFormDel;
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._owner = owner;
    this.__id = _id;
    this._api = api;
    this._handleZoom = handleCardClick;
    this._myId = myId;
    this._handleCardClickHeart = handleCardClickHeart;
    this._likeStatus = {
      status: false,
    };
  }

  // здесь выполним все необходимые операции, чтобы вернуть разметку
  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const itemTemplate = document
      .querySelector("#card-template") //ищет сам темпл
      .content.cloneNode(true);
    // вернём DOM-элемент карточки
    return itemTemplate.querySelector(".elements__item-list");
  }

  //установить количество лайков - онлайн, информация будет отражаться без перезагрузки страници
  setTheNumberOfLikes(length) {
    this._element.querySelector(".elements__how-like").textContent = length;
  }

  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._setEventListeners(); //привязываем слушатель, а что и как описано ниже
    this._element.querySelector(".elements__cut-text").textContent = this._name;
    //11.2. Заменять в разметке текст
    this._element.querySelector(".elements__image").src = this._link;
    //11.2.1 добавить ALT
    this._element.querySelector(".elements__image").alt = this._name;
    //Добавлять корзинку удаления если я создал карточку
    if (this._owner._id != this._myId) {
      this._element
        .querySelector(".elements__dell")
        .classList.add("elements__dell_none");
    }

    //вносит данные сколько лайков
    this.setTheNumberOfLikes(this._likes.length);

    //Проверить после перезагрузки есть ли мой лайк в списке
    if (this._likes.findIndex((item) => item._id == this._myId) >= 0) {
      this.setToggleHeat();
      this._likeStatus.status = true;
    }

    // Вернём элемент наружу
    return this._element;
  }

  setToggleHeat() {
    this._element
      .querySelector(".elements__hart")
      .classList.toggle("elements__hart_activ");
  }

  //реализайия лайка
  _handleMessegeClick(evt) {
    //описываем что будем и где делать
    this._handleCardClickHeart();
  }

  deleteCsrdOnSite() {
    this._element.remove();
  }

  //Реализация открытия согласия на удаление + открыть попал подтверждения
  _elementDelete() {
    this._handleClickFormDel();
  }

  //1.1 функционал обработки событий - метод добавления события на кнопку(нужен для добавления нескольких слушателей)
  _setEventListeners() {
    //навешиваем само событие
    this._element
      .querySelector(".elements__hart")
      .addEventListener("click", (evt) => {
        this._handleMessegeClick(evt);
      });

    this._element
      .querySelector(".elements__dell")
      .addEventListener("click", () => {
        this._elementDelete();
      });

    this._element
      .querySelector(".elements__image")
      .addEventListener("click", (eve) => {
        this._handleZoom(this._name, this._link);
      });
  }

  //выше все работает
  deleteCsrdOnSite() {
    this._element.remove();
  }
}

export { Card };
