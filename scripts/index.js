//0. Все импорты
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./initialCards.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";

const popupProfile = document.querySelector(".popup_type_edit-profile");
const popupCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");

//3 все кнопки открытия
const popupEditProfileOpen = document.querySelector(".profile__button-open");
const popupNewCardOpen = document.querySelector(".profile__button-add-site");
//const popupImageOpen = document.querySelector(".elements__image");

//создаем класс редактирования профиля
const objectPopupProfil = new PopupWithForm(popupProfile, {
  handleFormSubmit: (evt) => {
    evt.preventDefault();
    //создаем возможность сохранения из попап на страницу
    includeUserInfo.setUserInfo(namePopup, professionPopup);
  },
});

objectPopupProfil.setEventListeners();
//создаем класс отображения информации
const includeUserInfo = new UserInfo(".profile__name", ".profile__profession");

//7 вешаем слушатели на открытие попапов
popupEditProfileOpen.addEventListener("click", function () {
  objectPopupProfil.open();

  //создаем функцию заполния со страници в попап
  const eserUnfo = includeUserInfo.getUserInfo();
  setFormProfile(eserUnfo);
});

//8.1.2 добавляет значение в попап Профиль
function setFormProfile(eserUnfo) {
  namePopup.value = eserUnfo.nameProfile.textContent;
  professionPopup.value = eserUnfo.professionProfile.textContent;
}

//const nameProfile = document.querySelector(".profile__name");
const namePopup = document.querySelector("#popup-input-name");
//const professionProfile = document.querySelector(".profile__profession");
const professionPopup = document.querySelector("#popup-input-profession");

//создание карточки попапа добавления карточки
const objectPopupCard = new PopupWithForm(popupCard, {
  handleFormSubmit: (evt) => {
    const siteValue = inputElementSiteCard.value; //1.Взять строку из инпута
    const srcValue = inputElementSrcCard.value; //2. Взять ссылку из инпута

    renderCard(siteValue, srcValue);

    validPopupCard.toggleButtonStateOff();
  },
});
objectPopupCard.setEventListeners();

//Слушатель попапа добавлеия картояки
popupNewCardOpen.addEventListener("click", function () {
  objectPopupCard.open();
});

//открытие большого попапа
function handleCardClick(eve) {
  const objectpopupImage = new PopupWithImage(popupImage, eve);
  objectpopupImage.open();
  objectpopupImage.setEventListeners();
}

//найти элементы на открытой карточки
const inputElementSiteCard = document.querySelector("#popup-card-input-site");
const inputElementSrcCard = document.querySelector("#popup-card-input-src");

//данные валидации
const configValidation = {
  formSelector: ".popup__content",
  buttonValid: "popup__save_valid",
  submitButtonSelector: ".popup__save",
};
//7 валидация
const validPopupProfile = new FormValidator(configValidation, popupProfile);
validPopupProfile.enableValidation();
//7 валидация
const validPopupCard = new FormValidator(configValidation, popupCard);
validPopupCard.enableValidation();

//8 отрисовка карточек из массива
const selector = ".elements__item"; // --<< это параметр куда вставлять разметку
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item.name, item.link, handleCardClick);
      const cardElement = card.generateCard(); //от класса Card
      cardList.setItem(cardElement); //от класса Section
    },
  },
  selector
);
// запуск отрисовки карточек из массива
cardList.renderItems();

//отрисовка 1й карточки
function renderCard(name, link) {
  const initialOneCards = [{ name: name, link: link }];

  const renderOneCard = new Section(
    {
      items: initialOneCards,
      renderer: (item) => {
        const oneCard = new Card(item.name, item.link, handleCardClick);
        const cardElementOne = oneCard.generateCard(); //от класса Card
        renderOneCard.setItem(cardElementOne); //от класса Section
      },
    },
    selector
  );

  renderOneCard.renderItems();
}
