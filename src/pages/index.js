//0. Все импорты
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
//import { initialCards } from "../util/initialCards.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { Api } from "../components/Api.js";

//все переменные
import {
  popupProfile,
  popupCard,
  popupImage,
  popupEditProfileOpen,
  popupNewCardOpen,
  popupChanglAvatarOpen,
} from "../util/initialCards.js";
import {
  namePopup,
  professionPopup,
  inputElementSiteCard,
  inputElementSrcCard,
  popupSureDel,
  popupChanglAvatar,
} from "../util/initialCards.js";
//импорт CSS --   >> для WEBPACK
import "./index.css";

//создаем класс редактирования профиля
const objectPopupProfil = new PopupWithForm(popupProfile, {
  handleFormSubmit: ({ name, profession }, buttonInfomationAboutSave) => {
    //из попапа вставляем на страницу
    includeUserInfo.setUserInfo(name, profession);
    //из попапа отправляем на сервер
    const informAboutSave = api.patchUserInfoNameAbout(name, profession);
    console.log(informAboutSave);
    console.log(buttonInfomationAboutSave);
    buttonInfomationAboutSave.textContent = "Сохранение...";
    informAboutSave
      .then(() => objectPopupProfil.close())
      .then(() => (buttonInfomationAboutSave.textContent = "Сохранить"))
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
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
  namePopup.value = eserUnfo.nameProfile;
  professionPopup.value = eserUnfo.professionProfile;
}

//создание карточки попапа добавления карточки
const objectPopupCard = new PopupWithForm(popupCard, {
  handleFormSubmit: ({ name, link }, buttonInfomationAboutSave) => {
    buttonInfomationAboutSave.textContent = "Сохранение...";
    const siteValue = name; //1.Взять строку из инпута
    const srcValue = link; //2. Взять ссылку из инпута

    //Отправляем на сервер данные с новой карточки
    const addOneCardFromApi = api.postCard(siteValue, srcValue);

    //Колбек данных с добавленной карточки вставляем на страницу
    addOneCardFromApi
      .then((data) => {
        //рендерим общей функцией
        const card = renderCard(
          data.name,
          data.link,
          data.likes,
          data.owner,
          data._id,
          api
        );
        renderOneCard.setItem(card); //от класса Section
        validPopupCard.toggleButtonStateOff();
      })
      .then(() => objectPopupCard.close())
      .then(() => (buttonInfomationAboutSave.textContent = "Сохранить"))
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });

  },
});
objectPopupCard.setEventListeners();

//Слушатель попапа добавлеия карточки
popupNewCardOpen.addEventListener("click", function () {
  objectPopupCard.open();
  validPopupCard.resetInputError();
});

//открытие большого попапа
const objectpopupImage = new PopupWithImage(popupImage);

//передаем колбек клика для открытия большой карточки
function handleCardClick(name, link) {
  objectpopupImage.open(name, link);
  objectpopupImage.setEventListeners();
}

//создаем колбек клика для открытия попапа для подстверждения удаления
let dataSubmitElementOnDell;

function handleClickDelCard(id, element) {
  objectpopupSureDel.open();
  return (dataSubmitElementOnDell = {
    id: id,
    element: element,
  });
}

//открытие попапа согласия удаления popupSureDel
const objectpopupSureDel = new PopupWithForm(popupSureDel, {
  handleFormSubmit: () => {
    api
      .deleteCard(dataSubmitElementOnDell.id)
      .then(() => dataSubmitElementOnDell.element.remove())
      .then(() => objectpopupSureDel.close())
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });

    console.log("Проверка работает?");
  },
});
objectpopupSureDel.setEventListeners();
//objectpopupSureDel.open();

//вешаем клик открытия попапа при нажатии на картинку
popupChanglAvatarOpen.addEventListener("click", function () {
  objectpopupChanglAvatar.open();
  validPopupChanglAvatar.resetInputError();
});

//открытие попапа для замены фотографии аватара
const objectpopupChanglAvatar = new PopupWithForm(popupChanglAvatar, {
  handleFormSubmit: ({ link }, buttonInfomationAboutSave) => {
    buttonInfomationAboutSave.textContent = "Сохранение...";

    const srcValue = link;
    apiUserInitial
      .patchAvatar(link)
      .then(() => (document.querySelector(".profile__image").src = link))
      .then(() => objectpopupChanglAvatar.close())
      .then(() => (buttonInfomationAboutSave.textContent = "Сохранить"))
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });

    console.log(srcValue);

    console.log("Проверка работает замена аватара?");
  },
});
objectpopupChanglAvatar.setEventListeners();

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
//9 создаем ложную валидацию для попапа
const validPopupSureDel = new FormValidator(configValidation, popupSureDel);
validPopupSureDel.enableValidation();
validPopupSureDel.toggleButtonStateOn();
//9создаем валидацию изменения аватара
const validPopupChanglAvatar = new FormValidator(
  configValidation,
  popupChanglAvatar
);
validPopupChanglAvatar.enableValidation();

//функция для отрисовки карточки
function renderCard(name, link, likes, owner, _id, api) {
  const card = new Card(
    name,
    link,
    likes,
    owner,
    _id,
    api,
    handleCardClick,
    handleClickDelCard
  );
  return card.generateCard();
}

//8 отрисовка карточек из массива
const selector = ".elements__item"; // --<< это параметр куда вставлять разметку

//отрисовка 1й карточки
const renderOneCard = new Section({}, selector);

//api для загрузки данных о пользователе
const apiUserInitial = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-41/users/me",
  headers: {
    authorization: "06950c87-f349-452d-a6bd-e523931209ac",
    "Content-Type": "application/json",
  },
});
const userInfo = apiUserInitial.getInitialUser();

//установка данных о пользователе на страницу + фото
userInfo.then((data) => {
  includeUserInfo.setUserInfo(data.name, data.about);
  document.querySelector(".profile__image").src = data.avatar;
});

//api для загрузки всех карточек
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-41/cards",
  headers: {
    authorization: "06950c87-f349-452d-a6bd-e523931209ac",
    "Content-Type": "application/json",
  },
});

// загрузка карточек с сервера
const initialCards = api.getInitialCards(); //записываем в константу результат, там промис
initialCards
  .then((data) => {
    const cardList = new Section(
      {
        items: data,
        renderer: (item) => {
          const card = renderCard(
            item.name,
            item.link,
            item.likes,
            item.owner,
            item._id,
            api
          );
          cardList.setItem(card); //от класса Section
        },
      },
      selector
    );
    // запуск отрисовки карточек из массива
    cardList.renderItems();
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  }); //так как это промис продолжаем ствавить ВЕН
