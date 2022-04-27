//0. Все импорты
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./initialCards.js";
import Section from "./Section.js";

export { openPopup };

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
const handleEsc = function (event, popup) {
  if (event.key === "Escape") {
    const popupActive = document.querySelector(".popup_is-open");
    closePopup(popupActive);
  }
};

//функция открытия
const openPopup = function (popup) {
  popup.classList.add("popup_is-open");
  document.addEventListener("keydown", handleEsc);
};
//функция закрытия
const closePopup = function (popup) {
  popup.classList.remove("popup_is-open");
  document.removeEventListener("keydown", handleEsc);
};

//7 вешаем слушатели на открытие попапов
popupEditProfileOpen.addEventListener("click", function () {
  openPopup(popupProfile);
  setFormProfile();
});

popupNewCardOpen.addEventListener("click", function () {
  openPopup(popupCard);
  buttonByCardSaveForm.reset();
});

popupEditProfileClose.addEventListener("click", function () {
  closePopup(popupProfile);
});

popupNewCardClose.addEventListener("click", function () {
  closePopup(popupCard);
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
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = namePopup.value;
  professionProfile.textContent = professionPopup.value;
  closePopup(popupProfile);
}
//8.1.4 найти кнопку сабмит и отправить на сервер
const popupSaveForm = popupProfile.querySelector(".popup__content");
popupSaveForm.addEventListener("submit", handleProfileFormSubmit);

//9 заполнить содержимое места в карточку
//9.1 найти элементы для работы:
//9.1.1 найти элементы на открытой карточки
const inputElementSiteCard = document.querySelector("#popup-card-input-site");
const inputElementSrcCard = document.querySelector("#popup-card-input-src");

//9.2 ищем ЭЛЕМЕН для сабмита
const buttonByCardSaveForm = popupCard.querySelector(".popup__content");
//9.2.1 вешаем сабмит на форму
buttonByCardSaveForm.addEventListener("submit", handleAddCardFormSubmit); //слушатель для КАРД СОХРАНИТЬ

//9.3 вносим данные в форму
function handleAddCardFormSubmit(evt) {
  const siteValue = inputElementSiteCard.value; //1.Взять строку из инпута
  const srcValue = inputElementSrcCard.value; //2. Взять ссылку из инпута
  //123 Пример - от ревьюера
  const card = renderCard(siteValue, srcValue);
  includeCard(card);
  closePopup(popupCard); //закрыть карточку
  buttonByCardSaveForm.reset();
  //реализована блокировка кнопки сохранить после закрытия
  validPopupCard.toggleButtonStateOff();
}

// 10 перебор карт из массива
function createCard() {
  initialCards.forEach((item) => {
    //123 Пример - от ревьюера
    const card = renderCard(item.name, item.link);
    includeCard(card);
  });
}

function renderCard(name, link) {
  const card = new Card(name, link);
  //123 Пример - от ревьюера
  return card.generateCard();
}

// 12 добавление только одной карточки (из массива или по кнопке нажатия)
function includeCard(cardClassElement) {
  elementsItem.prepend(cardClassElement);
}

createCard(); //в самый конец - она все и запускает автоматом.

const configValidation = {
  formSelector: ".popup__content",
  buttonValid: "popup__save_valid",
  submitButtonSelector: ".popup__save",
};

const validPopupProfile = new FormValidator(configValidation, popupProfile);
validPopupProfile.enableValidation();

const validPopupCard = new FormValidator(configValidation, popupCard);
validPopupCard.enableValidation();


//8я отрисовка карточек из массива
const selector = ".elements__item"; // --<< разберись с этим это параметр куда вставлять разметку
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item.name, item.link);
      const cardElement = card.generateCard(); //от класса Card
      cardList.setItem(cardElement); //от класса Section
    },
  },
  selector
);
// запуск отрисовки карточек из массива
cardList.renderItems();
