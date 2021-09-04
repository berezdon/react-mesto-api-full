class Api {
  constructor(options) {
    this.options = options;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserData(){
    return fetch(`${this.options.baseUrl}/users/me`, {
      headers: this.options.headers,
      credentials: 'include',
    })
      .then(this._checkResponse);
  }

  patchUserData(name, about){
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.options.headers,
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this.options.baseUrl}/cards`, {
      headers: this.options.headers,
      credentials: 'include'
    })
      .then(this._checkResponse);
  }

  postNewCard(initialCard) {
    return fetch(`${this.options.baseUrl}/cards`, {
      method: 'POST',
      headers: this.options.headers,
      credentials: 'include',
      body: JSON.stringify({
        name: initialCard.name,
        link: initialCard.link,
      })
    })
      .then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this.options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.options.headers,
      credentials: 'include'
    })
      .then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) return fetch(`${this.options.baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this.options.headers,
      credentials: 'include'
    })
      .then(this._checkResponse);
    else return fetch(`${this.options.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this.options.headers,
      credentials: 'include'
    })
      .then(this._checkResponse);
  }

  patchUserAvatar(avatar){
    return fetch(`${this.options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.options.headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar: avatar,
      })
    })
      .then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: 'https://api.berezdon.nomoredomain.nomoredomains.club',
  //baseUrl: 'http://localhost:3000',
  headers: {
    authorization: 'e9a64586-81ff-4bf4-b9f5-eace2b033059',
    'Content-Type': 'application/json'
  },
  credentials: 'include'
});

export default api
