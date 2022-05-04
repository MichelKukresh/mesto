export default class UserInfo {
    constructor(nameSelector, professionSelector) {
        this._nameSelector = nameSelector;
        this._professionSelector = professionSelector;

    }

    getUserInfo() {//данные пользователя нужно будет подставить в форму при открытии.
        this._namePopup = document.querySelector(this._nameSelector);
        this._professionPopup = document.querySelector(this._professionSelector);
        return {nameProfile: this._namePopup, professionProfile: this._professionPopup};
    }

    setUserInfo(namePopup, professionPopup) {//который принимает новые данные пользователя и добавляет их на страницу.
        this._namePopup = document.querySelector(this._nameSelector);
        this._professionPopup = document.querySelector(this._professionSelector);
        this._namePopup.textContent = namePopup.value ;
        this._professionPopup.textContent = professionPopup.value;
        

    }

}








// Создайте класс UserInfo
// Класс UserInfo отвечает за управление отображением информации о пользователе на странице. Этот класс:
// Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
// Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
// Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.