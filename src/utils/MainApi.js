class MainApi {
  constructor() {
    this._baseUrl = "https://api.diplom.dmitrybalaev.nomoredomains.xyz";
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    };
    return res.text().then((text) => {
      console.log(text)
      throw JSON.parse(text).message || JSON.parse(text).error;
    });
  }

  register({ email, password, name }) {
    return fetch(`${this._baseUrl}/signup`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    }).then((res) => this._checkResponse(res));
  }

  login({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => this._checkResponse(res));
  }

  getCurrentUser(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResponse(res));
  }

  setUserInfo({ name, email }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        name,
        email,
      })
    }).then((res) => this._checkResponse(res));
  }
}

const api = new MainApi();

export default api;
