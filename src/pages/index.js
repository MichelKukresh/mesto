//0. Все импорты
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
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
  popupSureDel,
  popupChanglAvatar,
  myId,
} from "../util/initialCards.js";

//данные валидации
import { configValidation } from "../util/initialCards.js";

//импорт CSS --   >> для WEBPACK
import "./index.css";

//создаем класс редактирования профиля
const objectPopupProfil = new PopupWithForm(popupProfile, {
  handleFormSubmit: ({ name, profession }, buttonInfomationAboutSave) => {
    //из попапа отправляем на сервер
    const informAboutSave = api.patchUserInfoNameAbout(name, profession);
    buttonInfomationAboutSave.textContent = "Сохранение...";
    informAboutSave
      .then(() => {
        //из попапа вставляем на страницу
        includeUserInfo.setUserInfo(name, profession);
      })
      .then(() => objectPopupProfil.close())
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => (buttonInfomationAboutSave.textContent = "Сохранить"));
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
const objectPopupCard = new PopupWithForm(
  popupCard,

  {
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
          cardList.setItem(card); //от класса Section
          validPopupCard.toggleButtonStateOff();
        })
        .then(() => objectPopupCard.close())
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        })
        .finally(() => (buttonInfomationAboutSave.textContent = "Сохранить"));
    },
  }
);
objectPopupCard.setEventListeners();

//Слушатель попапа добавлеия карточки
popupNewCardOpen.addEventListener("click", function () {
  objectPopupCard.open();
  validPopupCard.resetInputError();
});

//открытие большого попапа
const objectpopupImage = new PopupWithImage(popupImage);
objectpopupImage.setEventListeners();

//передаем колбек клика для открытия большой карточки
function handleCardClick(name, link) {
  objectpopupImage.open(name, link);
}

//функция работы с лайками (данные при загрузке тут не отрабатываются)
function handleCardClickHeart() {
  if (this._likeStatus.status == false) {
    api
      .putLikeCard(this.__id)
      .then((res) => {
        return res.likes.length;
      })
      .then((res) => {
        this.setTheNumberOfLikes(res);
        this.setToggleHeat();
        this._likeStatus.status = true;
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  } else {
    api
      .deleteLikeCard(this.__id)
      .then((res) => {
        return res.likes.length;
      })
      .then((res) => {
        this.setTheNumberOfLikes(res);
        this.setToggleHeat();
        this._likeStatus.status = false;
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }
}

//открытие попапа согласия удаления popupSureDel
const objectpopupSureDel = new PopupWithForm(popupSureDel, {
  handleFormSubmit: (a, b, handleSubmitCallBack) => {
    handleSubmitCallBack();
  },
});
objectpopupSureDel.setEventListeners();

//вешаем клик открытия попапа при нажатии на картинку
popupChanglAvatarOpen.addEventListener("click", function () {
  objectpopupChanglAvatar.open();
  validPopupChanglAvatar.resetInputError();
});

//открытие попапа для замены фотографии аватара
const objectpopupChanglAvatar = new PopupWithForm(
  popupChanglAvatar,

  {
    handleFormSubmit: ({ link }, buttonInfomationAboutSave) => {
      buttonInfomationAboutSave.textContent = "Сохранение...";

      //const srcValue = link;
      api
        .patchAvatar(link)
        .then(() => includeUserInfo.setUserAvatar(link))
        .then(() => {
          validPopupChanglAvatar.toggleButtonStateOff();

          objectpopupChanglAvatar.close();
        })

        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        })
        .finally(() => (buttonInfomationAboutSave.textContent = "Сохранить"));
    },
  }
);
objectpopupChanglAvatar.setEventListeners();

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

function handleClickFormDel() {
  objectpopupSureDel.open();
  objectpopupSureDel.setSubmitAtion((_) => { 
    api
      .deleteCard(this.__id)
      .then(() => this.deleteCsrdOnSite())
      .then(() => objectpopupSureDel.close())
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  });
}

//функция для отрисовки карточки
function renderCard(name, link, likes, owner, _id, api) {
  const card = new Card(
    name,
    link,
    likes,
    owner,
    _id,
    api,
    myId,
    handleCardClick,
    handleCardClickHeart, //определяет есть ли мой лайк и убирает его или добавляет
    handleClickFormDel
  );

  return card.generateCard();
}

//8 отрисовка карточек из массива
const selector = ".elements__item"; // --<< это параметр куда вставлять разметку

//api для загрузки данных о пользователе
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-41/",
  headers: {
    authorization: "06950c87-f349-452d-a6bd-e523931209ac",
    "Content-Type": "application/json",
  },
});

//собираем с сервера готовые карточки
const cardList = new Section(
  {
    renderer: (item) => {
      const card = renderCard(
        //подготавливаю элемен из данных, устанавливаю слушатель
        item.name,
        item.link,
        item.likes,
        item.owner,
        item._id,
        api
      );
      cardList.setItem(card); //вставляю обработанные элементы карточек на сайт
    },
  },
  selector
);

Promise.all([api.getInitialUser(), api.getInitialCards()])
  .then(([userInfo, initialCards]) => {
    //установка данных о пользователе на страницу + фото
    includeUserInfo.setUserInfo(userInfo.name, userInfo.about);
    includeUserInfo.setUserAvatar(userInfo.avatar);
    // запуск отрисовки карточек из массива
    cardList.renderItems(initialCards); //передаю напрямую массив с данными карточек
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  }); //так как это промис продолжаем ствавить ВЕН;
