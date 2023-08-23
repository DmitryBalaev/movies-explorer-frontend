import { Route, Routes, useNavigate } from "react-router-dom";
import { LandingPage } from "../Landing/Landing.lazy";
import { RegisterPage } from "../Register/Register.lazy";
import { LoginPage } from "../Login/Login.lazy";
import NotFound from "../NotFound/NotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import "./App.css";
import { CurrentUserContext } from "../../Context/CurrentUserContext/CurrentUserContext";
import { DeviceWidthContext } from "../../Context/DeviceWidthContext/DeviceWidthContext";
import { useState, Suspense, useEffect } from "react";
import { ProfilePage } from "../Profile/Profile.lazy";
import { MoviesPage } from "../Movies/Movies.lazy";
import { SavedMoviesPage } from "../SavedMovies/SavedMovies.lazy";
import Preloader from "../Preloader/Preloader";
import api from "../../utils/MainApi";
import beatApi from "../../utils/MoviesApi";
import { MESSAGES, DEVICE, JWT, BEAT_URL_SHORT } from "../../utils/constants";
import PopupVideo from "../PopupVideo/PopupVideo";
import PopupTooltip from "../PopupTooltip/PopupTooltip";

function App() {
  const [errorMessage, setErrorMessage] = useState({
    isError: false,
    message: "",
  });
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState({});
  const [deviceWidth, setDeviceWidth] = useState("desktop");
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoPopupOpen, setIsVideoPopupOpen] = useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    isLoggedIn: localStorage.getItem(JWT) ? true : false,
  });

  const navigate = useNavigate();

  // Постановка и снятие евентлистнера с window для отображения определенного кол-ва карточек

  useEffect(() => {
    function handleWidth() {
      if (window.innerWidth > DEVICE.tablet) {
        setDeviceWidth("desktop");
      } else if (window.innerWidth > DEVICE.mobile) {
        setDeviceWidth("tablet");
      } else {
        setDeviceWidth("mobile");
      }
    }

    handleWidth();

    window.addEventListener("resize", handleWidth);

    return () => window.removeEventListener("resize", handleWidth);
  }, [deviceWidth]);

  // Закрытие всех модалок

  const onPopupClose = () => {
    setIsVideoPopupOpen(false);
    setIsTooltipPopupOpen(false);
    setTimeout(() => {
      setErrorMessage({
        isError: false,
        message: "",
      });
    }, 500);
  };

  // Обработка ошибки поиска

  const handleSearchError = () => {
    setErrorMessage({
      isError: true,
      message: MESSAGES.submitError,
    });
    setIsTooltipPopupOpen(true);
  };

  // Открытие модалки просмотра трейлера

  const handleOpenMovieTrailer = (movie) => {
    setIsLoading(true);
    try {
      setIsVideoPopupOpen(true);
      setCurrentMovie(movie);
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  // Получаем все фильмы, и так же все сохраненные фильмы

  useEffect(() => {
    if (currentUser.isLoggedIn) {
      beatApi
        .getMovies()
        .then(setMovies)
        .catch((e) => console.log(e));
      api
        .getSavedMovies()
        .then((movies) => {
          setSavedMovies(movies.data);
        })
        .catch((e) => console.log(e));
    }
  }, [currentUser.isLoggedIn]);

  // Сохранение фильма в свое апи

  const handleLikeMovie = (film) => {
    const filmData = {
      country: film.country,
      duration: film.duration,
      nameRU: film.nameRU,
      nameEN: film.nameEN,
      movieId: film.id,
      director: film.director,
      year: film.year,
      description: film.description,
      image: BEAT_URL_SHORT + film.image.url,
      trailerLink: film.trailerLink,
      thumbnail: BEAT_URL_SHORT + film.image.formats.thumbnail.url,
    };

    api
      .setSavedMovie(filmData)
      .then((savedFilm) =>
        setSavedMovies((movies) => [...movies, savedFilm.data])
      );
  };

  // Авторизация пользователя

  const handleLogin = async ({ email, password }) => {
    setIsLoading(true);
    try {
      if (email || password) {
        await api.login({ email, password }).then((res) => {
          if (res.token) {
            localStorage.setItem(JWT, res.token);
            setCurrentUser((prev) => ({ ...prev, isLoggedIn: true }));
            setErrorMessage({
              isError: false,
              message: MESSAGES.successLogin,
            });
            setTimeout(() => {
              navigate("/movies", { replace: true });
            }, 800);
          }
        });
      }
    } catch (e) {
      setErrorMessage({
        isError: true,
        message: e,
      });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  // Выход из учетной записи

  const handleLogout = () => {
    setCurrentUser((prev) => ({ ...prev, isLoggedIn: false }));
    setErrorMessage({
      message: "",
      isError: false,
    });
    localStorage.clear();
    navigate("/", { replace: true });
  };

  // Запрос на регистрацию, приуспешной регистрации, сразу авторизация и редерект на фильмы

  const handleRegister = async ({ email, password, name }) => {
    setIsLoading(true);
    try {
      if (email || password || name) {
        await api.register({ email, password, name }).then((res) => {
          setTimeout(() => {
            navigate("/signin", { replace: true });
            setErrorMessage({
              message: "",
            });
          }, 800);
          setErrorMessage({
            isError: false,
            message: MESSAGES.successRegistration,
          });
          handleLogin({ email, password });
        });
      }
    } catch (e) {
      setErrorMessage({
        isError: true,
        message: e,
      });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  // Изменение данных пользователя

  const handleEditUserInfo = async ({ name, email }) => {
    setIsLoading(true);
    try {
      await api.setUserInfo({ name, email }).then((res) => {
        setCurrentUser((user) => ({
          ...user,
          name: res.data.name,
          email: res.data.email,
        }));
        setErrorMessage({
          isError: false,
          message: MESSAGES.successChangeUserData,
        });
        setTimeout(() => {
          setErrorMessage({
            message: "",
          });
        }, 800);
      });
    } catch (e) {
      setErrorMessage({
        isError: true,
        message: e,
      });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  // Проверка токена

  const checkToken = async () => {
    const token = localStorage.getItem(JWT);

    if (token) {
      const userInfo = await api.getCurrentUser(token);
      setCurrentUser((prev) => ({
        ...prev,
        isLoggedIn: true,
        name: userInfo.data.name,
        email: userInfo.data.email,
      }));
    }
  };

  useEffect(() => {
    if (currentUser.isLoggedIn) {
      checkToken();
    }
  }, [currentUser.isLoggedIn]);

  return (
    <DeviceWidthContext.Provider value={deviceWidth}>
      <CurrentUserContext.Provider value={currentUser}>
        <Suspense fallback={<Preloader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/signup"
              element={
                <RegisterPage
                  onLogin={handleLogin}
                  onRegister={handleRegister}
                  isLoading={isLoading}
                  error={errorMessage}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <LoginPage
                  onLogin={handleLogin}
                  onRegister={handleRegister}
                  isLoading={isLoading}
                  error={errorMessage}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
            <Route element={<ProtectedRoute />}>
              <Route
                path="/profile"
                element={
                  <ProfilePage
                    onLogout={handleLogout}
                    onSubmit={handleEditUserInfo}
                    isLoading={isLoading}
                    error={errorMessage}
                    setError={setErrorMessage}
                  />
                }
              />
              <Route
                path="/movies"
                element={
                  <MoviesPage
                    movies={movies}
                    onLikeClick={handleLikeMovie}
                    savedMovies={savedMovies}
                    onPosterClick={handleOpenMovieTrailer}
                    handleError={handleSearchError}
                  />
                }
              />
              <Route
                path="/saved-movies"
                element={
                  <SavedMoviesPage
                    movies={savedMovies}
                    savedMovies={savedMovies}
                    onPosterClick={handleOpenMovieTrailer}
                    handleError={handleSearchError}
                  />
                }
              />
            </Route>
          </Routes>
        </Suspense>
        <PopupVideo
          isOpen={isVideoPopupOpen}
          onClose={onPopupClose}
          name={currentMovie.nameRU}
          link={currentMovie.trailerLink}
          isLoading={isLoading}
        />
        <PopupTooltip
          isOpen={isTooltipPopupOpen}
          onClose={onPopupClose}
          text={errorMessage.message}
        />
      </CurrentUserContext.Provider>
    </DeviceWidthContext.Provider>
  );
}

export default App;
