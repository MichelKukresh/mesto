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

const popupProfile = ".popup_type_edit-profile";
const popupCard = ".popup_type_new-card";
const popupImage = ".popup_type_image";
const popupSureDel = ".popup_type_sure-del";
const popupChanglAvatar = ".popup_type_changl-avatar";


//3 все кнопки открытия, для большой картинки событие вешается отдельно при создании класса
const popupEditProfileOpen = document.querySelector(".profile__button-open");
const popupNewCardOpen = document.querySelector(".profile__button-add-site");
const popupChanglAvatarOpen = document.querySelector(".profile__image");

//находим поля попапов для вставки/считывания данных
const namePopup = document.querySelector("#popup-input-name");
const professionPopup = document.querySelector("#popup-input-profession");

//найти элементы на открытой карточке
const inputElementSiteCard = document.querySelector("#popup-card-input-site");
const inputElementSrcCard = document.querySelector("#popup-card-input-src");

export { initialCards };
export { popupProfile, popupCard, popupImage, popupEditProfileOpen, popupNewCardOpen, popupChanglAvatarOpen, popupSureDel, popupChanglAvatar };
export {namePopup, professionPopup, inputElementSiteCard, inputElementSrcCard};