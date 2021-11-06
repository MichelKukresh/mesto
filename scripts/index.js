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