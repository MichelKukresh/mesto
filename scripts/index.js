const popupElement = document.querySelector(".popup");

const popupCloseButtonElement = popupElement.querySelector(".popup__close");

const profileOpenPopupButton = document.querySelector(".profile__open-popup");

let nameProfile = document.querySelector(".profile__name");

let namePopup = document.querySelector(".popup__name");

namePopup.value = nameProfile.textContent;

let professionProfile = document.querySelector(".profile__profession");

let professionPopup = document.querySelector(".popup__profession");

professionPopup.value = professionProfile.textContent;

const openPopup = function () {
  popupElement.classList.add("popup__is-open");
};

const closePopup = function () {
  popupElement.classList.remove("popup__is-open");
};

profileOpenPopupButton.addEventListener("click", openPopup);
popupCloseButtonElement.addEventListener("click", closePopup);

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = namePopup.value;
  professionProfile.textContent = professionPopup.value;
  closePopup();
}

const popupSaveBotton = popupElement.querySelector(".form__element");
console.log(popupSaveBotton);

popupSaveBotton.addEventListener("submit", formSubmitHandler);
