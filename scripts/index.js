
//1.массив для 6ти карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//2 находим все попапы
const popupProfile = document.querySelector(".popup_type_edit-profile");
const popupCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");

//3 все кнопки открытия
const popupEditProfileOpen = document.querySelector('.profile__button-open');
const popupNewCardOpen = document.querySelector('.profile__button-add-site');
const popupImageOpen = document.querySelector('.elements__image');

//4 все кнопки закрытия
const popupEditProfileClose = popupProfile.querySelector('.popup__close');
const popupNewCardClose = popupCard.querySelector('.popup__close');
const popupImageClose = popupImage.querySelector('.popup__close');

//5 ищем темплейт
const itemTemplate = document.querySelector('#card-template'); //ищем саму форму - шаблон для новых карточек.
const elementsItem = document.querySelector(".elements__item"); //!!!! Ищем куда вставим ТЕМПЛ!!!

//6 функция закрытия и закрытия
const togglePopup = function (popup) {
  popup.classList.toggle("popup_is-open");
};

//7 вешаем слушатели на открытие попапов
popupEditProfileOpen.addEventListener('click', function () {
  togglePopup(popupProfile);
  formProfile();
});

popupNewCardOpen.addEventListener('click', function () {
  togglePopup(popupCard);
});

// popupImageOpen.addEventListener('click', function () {
//   togglePopup(popupImage);
// });
popupEditProfileClose.addEventListener('click', function () {
  togglePopup(popupProfile);
});

popupNewCardClose.addEventListener('click', function () {
  togglePopup(popupCard);
});

popupImageClose.addEventListener('click', function () {
  togglePopup(popupImage);
});




//8.1 заполнение карточки Профиля
//8.1.1. находим все поля из карточки профиля
const nameProfile = document.querySelector(".profile__name");
const namePopup = document.querySelector("#popup-input-name");
const professionProfile = document.querySelector(".profile__profession");
const professionPopup = document.querySelector("#popup-input-profession");
//8.1.2 добавляет значение в попап Профиль
function formProfile () {
  namePopup.value = nameProfile.textContent;
  professionPopup.value = professionProfile.textContent;
};
//8.1.3 сохряняет значение в форме.
function formSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = namePopup.value;
  professionProfile.textContent = professionPopup.value;
  togglePopup(popupProfile);
}
//8.1.4 найти кнопку сабмит и отправить на сервер
const popupSaveForm = popupProfile.querySelector(".popup__content");
popupSaveForm.addEventListener("submit", formSubmitHandler);

//9 заполнить содержимое места в карточку
//9.1 найти элементы для работы:
//9.1.1 найти элементы на открытой карточке
const siteCard = document.querySelector("#popup-card-input-site");
const srcCard = document.querySelector("#popup-card-input-src");
//9.1.2 найти элементы на сайте
const siteElements = document.querySelector(".elements__cut-text");
const srcElements = document.querySelector(".elements__image");
//9.2 ищем ЭЛЕМЕН для сабмита
const cardSaveForm = popupCard.querySelector(".popup__content"); 
//9.2.1 вешаем сабмит на форму
cardSaveForm.addEventListener("submit", hendleSubmit); //слушатель для КАРД СОХРАНИТЬ
//9.3 вносим данные в форму
function hendleSubmit (evt)  {
  evt.preventDefault();
  const siteValue = siteCard.value; //1.Взять строку из инпута
  const srcValue = srcCard.value; //2. Взять ссылку из инпута
  renderCard(siteValue, srcValue); //3 передать значение и отрисовать                                 
  togglePopup(popupCard);//закрыть карточку
  siteCard.value = "";//очистить поле
  srcCard.value = "";//очистить поле
}

// 10 перебор карт из массива
function createCard() {                                                                         
  initialCards.forEach((item) => {
    renderCard(item.name, item.link);//.name, item.link);                                     
  });
}

// 11 создание HTML элемента
function addCard(name, link) {
  //11.1. Создавать разметку		
	const htmlElement = itemTemplate.content.cloneNode(true);
	htmlElement.querySelector('.elements__cut-text').innerText = name; 
  //11.2. Заменять в разметке текст
  htmlElement.querySelector('.elements__image').src = link;
  //11.2.1 добавить ALT
  htmlElement.querySelector('.elements__image').alt = name;
	//11.3 организация лайка
  htmlElement.querySelector(".elements__hart").addEventListener('click', function(evt) { 
  evt.target.classList.toggle("elements__hart_activ");
  });

  //11.4 ищем Удалить, вешаем слушатель => функция удаляет
  htmlElement.querySelector(".elements__dell").addEventListener('click', elementDelete);

  //11.5 организация открытия большой картинки
  htmlElement.querySelector('.elements__image').addEventListener('click', function (eve) {
    togglePopup(popupImage);
    //11.5.1 найти элементы в попапе
    const sizeElementText = popupImage.querySelector("#size-txt-element");
    const sizeElementImg = popupImage.querySelector("#size-image-element");
    //11.5.2 находим элементы на сайте    
    const sizeTextImg = eve.target.closest(".elements__item-list"); //нахожу элемент по которому кликнул
    //const sizeImg = eve.target.closest(".elements__item-list"); //нахожу элемент по которому кликнул
    //11.5.3 получаю нужные значения из полей
    const text = sizeTextImg.querySelector(".elements__cut-text").textContent; //получаю нужное значение - текст мста
    const img = sizeTextImg.querySelector(".elements__image").src;
    //11.5.4 подставляю нужные значения из полей
    sizeElementText.innerText = text; //вставляю текст в ПОПАП. 
    sizeElementImg.src = img;
  });

  return htmlElement;

	//3. Вставлять разметку в наш dom
	// elementsItem.prepend(htmlElement);//все передал на отрисовку вместе с данными
}

// 12 добавление только одной карточки (из массива или по кнопке нажатия)
function renderCard (name, link) {                                                                
  elementsItem.prepend(addCard(name, link));//все передал на отрисовку вместе с данными
}




//13 реализация удаления карточки
function elementDelete(event) {
  event.target.closest(".elements__item-list").remove();//найти элемент ближайщий и закрыть его
}
createCard();//в самый конец - она все и запускает автоматом.                                          


id="image-element" 