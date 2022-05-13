//0. Все импорты
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { initialCards } from "../util/initialCards.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
//все переменные
import {
  popupProfile,
  popupCard,
  popupImage,
  popupEditProfileOpen,
  popupNewCardOpen,
} from "../util/initialCards.js";
import {
  namePopup,
  professionPopup,
  inputElementSiteCard,
  inputElementSrcCard,
} from "../util/initialCards.js";
//импорт CSS --   >> для WEBPACK
import "./index.css";

//создаем класс редактирования профиля
const objectPopupProfil = new PopupWithForm(popupProfile, {
  handleFormSubmit: (evt, formValues) => {
    evt.preventDefault();
    includeUserInfo.setUserInfo(formValues[0], formValues[1]);
  },
});

objectPopupProfil.setEventListeners();
//создаем класс отображения информации
const includeUserInfo = new UserInfo(".profile__name", ".profile__profession");

//7 вешаем слушатели на открытие попапов
popupEditProfileOpen.addEventListener("click", function () {
  objectPopupProfil.open();
  validPopupProfile.resetInputError();
  //создаем функцию заполния со страници в попап
  const eserUnfo = includeUserInfo.getUserInfo();
  setFormProfile(eserUnfo);
});

//8.1.2 добавляет значение в попап Профиль
function setFormProfile(eserUnfo) {
  namePopup.value = eserUnfo.nameProfile.textContent;
  professionPopup.value = eserUnfo.professionProfile.textContent;
}

//создание карточки попапа добавления карточки
const objectPopupCard = new PopupWithForm(popupCard, {
  handleFormSubmit: (evt, formValues) => {
    const siteValue = formValues[0]; //1.Взять строку из инпута
    const srcValue = formValues[1]; //2. Взять ссылку из инпута
    const card = renderCard(siteValue, srcValue);
    renderOneCard.setItem(card); //от класса Section
    validPopupCard.toggleButtonStateOff();
  },
});
objectPopupCard.setEventListeners();

//Слушатель попапа добавлеия картояки
popupNewCardOpen.addEventListener("click", function () {
  objectPopupCard.open();
  validPopupCard.resetInputError();
});

//открытие большого попапа
const objectpopupImage = new PopupWithImage(popupImage);

function handleCardClick(name, link) {
  objectpopupImage.open(name, link);
  objectpopupImage.setEventListeners();
}

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

//функция для отрисовки карточки
function renderCard(name, link) {
  const card = new Card(name, link, handleCardClick);
  return card.generateCard();
}

//8 отрисовка карточек из массива
const selector = ".elements__item"; // --<< это параметр куда вставлять разметку
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = renderCard(item.name, item.link);
      cardList.setItem(card); //от класса Section
    },
  },
  selector
);
// запуск отрисовки карточек из массива
cardList.renderItems();

//отрисовка 1й карточки
const renderOneCard = new Section({}, selector);
