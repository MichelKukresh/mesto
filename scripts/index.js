
//0. Все импорты
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js"



export {openPopup};



//1.массив для 6ти карточек
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

//2 находим все попапы
const popupProfile = document.querySelector(".popup_type_edit-profile");
const popupCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");

//3 все кнопки открытия
const popupEditProfileOpen = document.querySelector(".profile__button-open");
const popupNewCardOpen = document.querySelector(".profile__button-add-site");
//const popupImageOpen = document.querySelector(".elements__image");

//4 все кнопки закрытия
const popupEditProfileClose = popupProfile.querySelector(".popup__close");
const popupNewCardClose = popupCard.querySelector(".popup__close");
const popupImageClose = popupImage.querySelector(".popup__close");

//5 ищем темплейт
const itemTemplate = document.querySelector("#card-template"); //ищем саму форму - шаблон для новых карточек.
const elementsItem = document.querySelector(".elements__item"); //!!!! Ищем куда вставим ТЕМПЛ!!!

/// 5.4 к проектной 6 работе закрывает любой попап
const closePopupByClickOverlay = function (event, popup) {
  if (event.target === event.currentTarget) {
    closePopup(popup);
  }
};

//присваивание всем попапам слушателя оверлей
const formListByOverlay = Array.from(document.querySelectorAll(".popup")); // 1. делает массив из форм в документе
formListByOverlay.forEach((formElement) => {
  //2. в архиме присваивает всем слушатель САБМИТ и запрет перезагрузки
  formElement.addEventListener("click", (event) =>
    closePopupByClickOverlay(event, formElement)
  );
});

//реализация снятия слушателя Эскейп
const hendleEsc = function (event, popup) {
  const popupActive = document.querySelector(".popup_is-open");
  if (event.key === "Escape") {
    closePopup(popupActive);
  }
};

// 5.5. к 6 работе вешаем слушатель на открывшийся попап, !!! прокидываем данные
const includingPopupOverlayOnForm = function (popup) {
  popup.addEventListener("click", (event) =>
    closePopupByClickOverlay(event, popup)
  );
};

//функция открытия
const openPopup = function (popup) {
  popup.classList.add("popup_is-open");
  document.addEventListener("keydown", hendleEsc);
};
//функция закрытия
const closePopup = function (popup) {
  popup.classList.remove("popup_is-open");
  document.removeEventListener("keydown", hendleEsc);
};

//7 вешаем слушатели на открытие попапов
popupEditProfileOpen.addEventListener("click", function () {
  openPopup(popupProfile);
  setFormProfile();
  setFormValid(popupProfile);

});

popupNewCardOpen.addEventListener("click", function () {
  openPopup(popupCard);
  setFormValid(popupCard);
});

popupEditProfileClose.addEventListener("click", function () {
  closePopup(popupProfile);
});

popupNewCardClose.addEventListener("click", function () {
  closePopup(popupCard);
  //очистка полей после закрытия крестиком
  buttonByCardSaveForm.reset();
});

popupImageClose.addEventListener("click", function () {
  closePopup(popupImage);
});

//8.1 заполнение карточки Профиля
//8.1.1. находим все поля из карточки профиля
const nameProfile = document.querySelector(".profile__name");
const namePopup = document.querySelector("#popup-input-name");
const professionProfile = document.querySelector(".profile__profession");
const professionPopup = document.querySelector("#popup-input-profession");
//8.1.2 добавляет значение в попап Профиль
function setFormProfile() {
  namePopup.value = nameProfile.textContent;
  professionPopup.value = professionProfile.textContent;
}
//8.1.3 сохряняет значение в форме.
function formSubmitHandlerProfile(evt) {
  evt.preventDefault();
  nameProfile.textContent = namePopup.value;
  professionProfile.textContent = professionPopup.value;
  closePopup(popupProfile);
}
//8.1.4 найти кнопку сабмит и отправить на сервер
const popupSaveForm = popupProfile.querySelector(".popup__content");
popupSaveForm.addEventListener("submit", formSubmitHandlerProfile);

//9 заполнить содержимое места в карточку
//9.1 найти элементы для работы:
//9.1.1 найти элементы на открытой карточки
const inputElementSiteCard = document.querySelector("#popup-card-input-site");
const inputElementSrcCard = document.querySelector("#popup-card-input-src");
//9.1.2 найти элементы на сайте
const siteElements = document.querySelector(".elements__cut-text");
const srcElements = document.querySelector(".elements__image");
//9.2 ищем ЭЛЕМЕН для сабмита
const buttonByCardSaveForm = popupCard.querySelector(".popup__content");
//9.2.1 вешаем сабмит на форму
buttonByCardSaveForm.addEventListener("submit", hendleSubmit); //слушатель для КАРД СОХРАНИТЬ


//9.3 вносим данные в форму
function hendleSubmit(evt) {  
  const siteValue = inputElementSiteCard.value; //1.Взять строку из инпута
  const srcValue = inputElementSrcCard.value; //2. Взять ссылку из инпута
  renderCard(siteValue, srcValue); //3 передать значение и отрисовать
  closePopup(popupCard); //закрыть карточку  
  buttonByCardSaveForm.reset();
  //реализована блокировка кнопки сохранить после закрытия
  const button = evt.target.querySelector(".popup__save");
  button.classList.remove("popup__save_valid");
  button.setAttribute("disabled", "disabled"); //должен быть 2й параметр
}

// 10 перебор карт из массива
function createCard() {
  initialCards.forEach((item) => {
    renderCard(item.name, item.link);
  });
}

// 11 создание HTML элемента
// function addCard(name, link) {
//   //11.1. Создавать разметку
//   const htmlElement = itemTemplate.content.cloneNode(true);
//   htmlElement.querySelector(".elements__cut-text").textContent = name;
//   //11.2. Заменять в разметке текст
//   htmlElement.querySelector(".elements__image").src = link;
//   //11.2.1 добавить ALT
//   htmlElement.querySelector(".elements__image").alt = name;
//   //11.3 организация лайка
//   htmlElement
//     .querySelector(".elements__hart")
//     .addEventListener("click", function (evt) {
//       evt.target.classList.toggle("elements__hart_activ");
//     });

//   //11.4 ищем Удалить, вешаем слушатель => функция удаляет
//   htmlElement
//     .querySelector(".elements__dell")
//     .addEventListener("click", elementDelete);

//   //11.5 организация открытия большой картинки
//   // htmlElement
//   //   .querySelector(".elements__image")
//   //   .addEventListener("click", function (eve) {
//   //     openPopup(popupImage);
//   //     //11.5.1 найти элементы в попапе
//   //     const sizeElementText = popupImage.querySelector("#size-txt-element");
//   //     const sizeElementImg = popupImage.querySelector("#size-image-element");
//   //     //11.5.2 находим элементы на сайте
//   //     const sizeTextImg = eve.target.closest(".elements__item-list"); //нахожу элемент по которому кликнул
//   //     //11.5.3 получаю нужные значения из полей
//   //     const text = sizeTextImg.querySelector(".elements__cut-text").textContent; //получаю нужное значение - текст мста
//   //     const getImgByForm = sizeTextImg.querySelector(".elements__image").src;
//   //     //11.5.4 подставляю нужные значения из полей
//   //     sizeElementText.textContent = text; //вставляю текст в ПОПАП.
//   //     sizeElementImg.src = getImgByForm;
//   //     sizeElementImg.alt = text;
//   //   });
//   return htmlElement;
// }

// 12 добавление только одной карточки (из массива или по кнопке нажатия)
function renderCard(name, link) {
  const card = new Card(name, link, openPopup);
// Создаём карточку и возвращаем наружу
const cardClassElement = card.generateCard();
// Добавляем в DOM и определяем куда вставить
elementsItem.prepend(cardClassElement);


  //elementsItem.prepend(addCard(name, link)); //все передал на отрисовку вместе с данными
}

// //13 реализация удаления карточки
// function elementDelete(event) {
//    event.target.closest(".elements__item-list").remove(); //найти элемент ближайщий и закрыть его
//  }


createCard(); //в самый конец - она все и запускает автоматом.


// initialCards.forEach((item) => {
//    // Создадим экземпляр карточки
// const card = new Card(item.name, item.link, openPopup);
// // Создаём карточку и возвращаем наружу
// const cardClassElement = card.generateCard();
// // Добавляем в DOM и определяем куда вставить
// elementsItem.prepend(cardClassElement);

// // ПРОБА БОЛЬШОЙ КАРТИНКИ


// //ПРОБА
// });

function setFormValid(popup) {
  const configValidation = {
    formSelector: ".popup__content",
    buttonValid: "popup__save_valid",
    submitButtonSelector: ".popup__save",
  };

  const valid = new FormValidator(configValidation, popup);
  valid.enableValidation();

};






