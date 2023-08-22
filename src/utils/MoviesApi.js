import { BEAT_API_URL } from "./constants";

class MoviesApi {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.text().then((text) => {
      throw JSON.parse(text).message || JSON.parse(text).error;
    });
  }

  getMovies() {
    return fetch(this._baseUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkResponse(res));
  }
}

const beatApi = new MoviesApi(BEAT_API_URL);

export default beatApi;
