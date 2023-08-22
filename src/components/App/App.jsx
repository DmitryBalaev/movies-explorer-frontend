import { Route, Routes, useNavigate, useSearchParams } from "react-router-dom";
import { LandingPage } from "../Landing/Landing.lazy";
import { RegisterPage } from "../Register/Register.lazy";
import { LoginPage } from "../Login/Login.lazy";
import NotFound from "../NotFound/NotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import "./App.css";
import { CurrentUserContext } from "../../Context/CurrentUserContext/CurrentUserContext";
import { useState, Suspense, useEffect } from "react";
import { ProfilePage } from "../Profile/Profile.lazy";
import { MoviesPage } from "../Movies/Movies.lazy";
import { SavedMoviesPage } from "../SavedMovies/SavedMovies.lazy";
import Preloader from "../Preloader/Preloader";
import api from "../../utils/MainApi";
import beatApi from "../../utils/MoviesApi";
import { MESSAGES } from "../../utils/constants";
import PopupVideo from "../PopupVideo/PopupVideo";

function App() {
  const [errorMessage, setErrorMessage] = useState({
    isError: false,
    message: "",
  });
  const [movies, setMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState({})
  const [searchError, setSearchError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState({
    isLoggedIn: localStorage.getItem("jwt") ? true : false,
  });

  const navigate = useNavigate();

  const onPopupClose = () => {
    setIsPopupOpen(false)
  }

  const handleOpenMovieTrailer = (movie) => {
    setIsLoading(true)
    try {
      setIsPopupOpen(true)
      setCurrentMovie(movie)
    } catch (e) {
      console.log(e)
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    }
  }

  useEffect(() => {
    if (currentUser.isLoggedIn) {
      beatApi
        .getMovies()
        .then(setMovies)
        .catch((err) => console.log(err));
    }
  }, [currentUser.isLoggedIn]);


  const handleLogin = async ({ email, password }) => {
    setIsLoading(true);
    try {
      if (email || password) {
        await api.login({ email, password }).then((res) => {
          if (res.token) {
            localStorage.setItem("jwt", res.token);
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

  const handleLogout = () => {
    setCurrentUser((prev) => ({ ...prev, isLoggedIn: false }));
    setErrorMessage({
      message: "",
      isError: false,
    });
    localStorage.clear();
    navigate("/", { replace: true });
  };

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
          handleLogin({ email, password })
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

  const handleEditUserInfo = async ({ name, email }) => {
    setIsLoading(true)
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
        }, 800)
      })
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

  const handleSearchMovie = (value) => {
    if (!value.search) {
      setSearchMovies([]);
      setSearchError("");
    } else {
      let filtredMovies = movies;
      let isShort = value.search_checkbox;
      console.log(isShort)
      if (isShort === true) {
        setSearchMovies(
          (filtredMovies = movies.filter((item) => item.duration <= 40))
        );
        console.log(searchMovies)

      } else if (isShort === false) {
        console.log(filtredMovies)
        setSearchMovies(
          filtredMovies.filter((item) =>
            item.nameRU.toLowerCase().includes(value.search.toLowerCase())
          )
        );
        console.log(searchMovies)
      }
      localStorage.setItem("search", value.search);
      localStorage.setItem("isShort", value.search_checkbox);
      localStorage.setItem(
        "searchMovies",
        JSON.stringify(
          movies.filter((item) =>
            item.nameRU.toLowerCase().includes(value.search.toLowerCase())
          )
        )
      );
    }
  };

  const checkToken = async () => {
    const token = localStorage.getItem("jwt");

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
                  movies={searchMovies}
                  onSubmitSearch={handleSearchMovie}
                  setMovies={setSearchMovies}
                  savedMovies={savedMovies}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  onPosterClick={handleOpenMovieTrailer}
                />
              }
            />
            <Route path="/saved-movies" element={<SavedMoviesPage />} />
          </Route>
        </Routes>
      </Suspense>
      <PopupVideo
      isOpen={isPopupOpen}
      onClose={onPopupClose}
      name={currentMovie.nameRU}
      link={currentMovie.trailerLink}
      isLoading={isLoading}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
