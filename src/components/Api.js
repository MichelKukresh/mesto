class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  //получаем данные карточеку для дальнейшей вставки
  getInitialCards() {
    return fetch(this._baseUrl, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  //получаем данные с сервера о пользователе
  getInitialUser() {
    return fetch(this._baseUrl, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  patchUserInfoNameAbout(name, profession) {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-41/users/me", {
      method: "PATCH",
      headers: {
        authorization: "06950c87-f349-452d-a6bd-e523931209ac",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: profession,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  postCard(name, link) {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-41/cards", {
      method: "POST",
      headers: {
        authorization: "06950c87-f349-452d-a6bd-e523931209ac",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteCard(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-41/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: "06950c87-f349-452d-a6bd-e523931209ac",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  putLikeCard(id) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/cohort-41/cards/${id}/likes`,
      {
        method: "PUT",
        headers: {
          authorization: "06950c87-f349-452d-a6bd-e523931209ac",
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteLikeCard(id) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/cohort-41/cards/${id}/likes`,
      {
        method: "DELETE",
        headers: {
          authorization: "06950c87-f349-452d-a6bd-e523931209ac",
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  patchAvatar(link) {
    return fetch(
      "https://mesto.nomoreparties.co/v1/cohort-41/users/me/avatar",
      {
        method: "PATCH",
        headers: {
          authorization: "06950c87-f349-452d-a6bd-e523931209ac",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          avatar: link,
        }),
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}

export { Api };
