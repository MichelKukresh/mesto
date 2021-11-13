const popupElement = document.querySelector(".popup");

const popupCloseButtonElement = popupElement.querySelector(".popup__close");

const profileOpenPopupButton = document.querySelector(".profile__button-open");

let nameProfile = document.querySelector(".profile__name");

let namePopup = document.querySelector("#popup-input-name");



let professionProfile = document.querySelector(".profile__profession");

let professionPopup = document.querySelector("#popup-input-profession");



const openPopup = function () {
  popupElement.classList.add("popup_is-open");
  namePopup.value = nameProfile.textContent;
  professionPopup.value = professionProfile.textContent;
};

const closePopup = function () {
  popupElement.classList.remove("popup_is-open");
};



function formSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = namePopup.value;
  professionProfile.textContent = professionPopup.value;
  closePopup();
}

const popupSaveBotton = popupElement.querySelector(".popup__content");

popupSaveBotton.addEventListener("submit", formSubmitHandler);
profileOpenPopupButton.addEventListener("click", openPopup);
popupCloseButtonElement.addEventListener("click", closePopup);







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

const itemTemplate = document.querySelector('.item_template'); //ищем саму форму - шаблон для новых карточек.

const elementsItem = document.querySelector(".elements__item"); //!!!! Ищем куда вставим ТЕМПЛ!!!

let editing = null;//Разобраться зачем????

function renderCard() {
  initialCards.forEach((item) => {
    addCard(item.name, item.link);//.name, item.link);
  });

  //позже добавить слушатели корзина
  //позже слушатель сердецко
}

function addCard(name, link) {
	//1. Создавать разметку

	const htmlElement = itemTemplate.content.cloneNode(true);

	//2. Заменять в разметке текст
	htmlElement.querySelector('.elements__cut-text').innerText = name;
  htmlElement.querySelector('#image-element').src = link;


	
//организация лайка
  htmlElement.querySelector(".elements__hart").addEventListener('click', function(evt) { 
  evt.target.classList.toggle("elements__hart_activ");
  });

//2.5 Навесить события
  setListener(htmlElement);


  //организация открытия большой картинки
  htmlElement.querySelector('#image-element').addEventListener('click', openSize);


	//3. Вставлять разметку в наш dom
	elementsItem.prepend(htmlElement);//все передал на отрисовку вместе с данными

}

//2/5 продолжение удаления
function setListener (htmlElement) {
  htmlElement.querySelector(".elements__dell").addEventListener('click', elementDelete);
}
//само удаление
function elementDelete(event) {
  event.target.closest(".elements__item-list").remove();//найти элемент ближайщий и закрыть его
}


const cardElement = document.querySelector('.card');
const cardCloseButtonElement = cardElement.querySelector(".card__close");
const profileOpenCardButton = document.querySelector(".profile__button-add-site");
let siteCard = document.querySelector("#card-input-site");
let siteElements = document.querySelector(".elements__cut-text");
let srcCard = document.querySelector("#card-input-src");
let srcElements = document.querySelector(".elements__image");

const openCard = function () {
  cardElement.classList.add("card_is-open");
};

const closeCard = function () {
  cardElement.classList.remove("card_is-open");
};

const cardSaveBotton = cardElement.querySelector(".card__content"); //сохранить и отправить форму позже
// const cardSaveBotton = cardElement.querySelector(".card__save");


profileOpenCardButton.addEventListener("click", openCard);
cardCloseButtonElement.addEventListener("click", closeCard);


//Вставить КАРД



cardSaveBotton.addEventListener("submit", hendleSubmit); //слушатель для КАРД СОХРАНИТЬ
// cardSaveBotton.addEventListener("click", hendleSubmit); 






function hendleSubmit (evt)  {
  evt.preventDefault();

  const siteValue = siteCard.value;
  const srcValue = srcCard.value;

  //1. Взять строку из инпута
  //2. Взять ссылку из инпута
  //. Отрисовать

  addCard(siteValue, srcValue); //(siteValue, 
  closeCard();
}

const sizeElement  = document.querySelector(".size");
const sizeCloseButtonElement = sizeElement.querySelector(".size__close");
// const sizeOpenCardButton = document.querySelector("#image-element");




let sizeText = null;//создаю переменную для перезаписи текста карточка - большая карточка
const sizeElementText = sizeElement.querySelector("#size-txt-element");//ищу расположение текста в большом ПОПАПе.
let sizeImg = null;
const sizeElementImg = sizeElement.querySelector("#size-image-element");



const openSize = function (eve) { //передаю эвент и открываю большую карточку
  sizeElement.classList.add("size__open"); //делаю видимой большую карточку
  sizeText = eve.target.closest(".elements__item-list"); //нахожу элемент по которому кликнул
  sizeImg = eve.target.closest(".elements__item-list"); //нахожу элемент по которому кликнул
  const text = sizeText.querySelector(".elements__cut-text").textContent; //получаю нужное значение - текст мста
  const img = sizeImg.querySelector("#image-element").src;
  sizeElementText.innerText = text; //вставляю текст в ПОПАП. 
  sizeElementImg.src = img; 
};



const sizeClose = function () {
  sizeElement.classList.remove('size__open');
}

sizeCloseButtonElement.addEventListener('click', sizeClose);


renderCard();//в самый конец - она все и запускает автоматом.









// let textElement = document.querySelector(".elements__cut-text"); 



///////////////////////////////////////////////////////
// let WWWWWWWsizeText = sizeElement.querySelector("#size-txt-element");

// function openSize(eve) {
  
//   sizeText = eve.target.closest(".elements__item-list");
//   const text = sizeText.querySelector(".elements__cut-text").textContent;
//   WWWWWWWsizeText.value = text;
//   openSize2();

// };

// const openSize2 = function () {
//   sizeElement.classList.add("size__open");
  
// };
