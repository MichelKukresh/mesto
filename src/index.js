//0. Все импорты
import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { initialCards } from "./util/initialCards.js";
import Section from "./components/Section.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import UserInfo from "./components/UserInfo.js";
//все переменные 
import {popupProfile, popupCard, popupImage, popupEditProfileOpen, popupNewCardOpen } from "./util/initialCards.js";
import {namePopup, professionPopup, inputElementSiteCard, inputElementSrcCard} from "./util/initialCards.js";


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
