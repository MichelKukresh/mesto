console.log("Привет мир");
const popupElement = document.querySelector(".popup");
console.log(popupElement);
const popupCloseButtonElement = popupElement.querySelector(".popup__close");
console.log(popupCloseButtonElement);
const profileOpenPopupButton = document.querySelector(".profile__open-popup");
console.log(profileOpenPopupButton);


const toglPopupVisiboliti = function() {
   popupElement.classList.toggle('popup__is-open'); 

} 

toglPopupVisiboliti();
