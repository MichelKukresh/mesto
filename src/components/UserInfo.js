export default class UserInfo {
  constructor(nameSelector, professionSelector) {
    //this._nameSelector = nameSelector;
    this._professionSelector = professionSelector;
    this._namePopup = document.querySelector(nameSelector);
    this._professionPopup = document.querySelector(this._professionSelector);
  }

  getUserInfo() {
    //данные пользователя нужно будет подставить в форму при открытии.    
    return {
      nameProfile: this._namePopup.textContent,
      professionProfile: this._professionPopup.textContent,
    };
  }

  setUserInfo(namePopup, professionPopup) {
    //который принимает новые данные пользователя и добавляет их на страницу.
    this._namePopup.textContent = namePopup;
    this._professionPopup.textContent = professionPopup;
  }
}
