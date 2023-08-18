import { Route, Routes, useNavigate } from "react-router-dom";
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

function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const [movies, setMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchError, setSearchError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState({
    isLoggedIn: localStorage.getItem("jwt") ? true : false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser.isLoggedIn) {
      beatApi
        .getMovies()
        .then(setMovies)
        .catch((err) => console.log(err));
    }
  }, [currentUser.isLoggedIn]);

  const handleError = (e) => {
    setErrorMessage(e);
  };

  const handleLogin = async ({ email, password }) => {
    try {
      if (email || password) {
        await api.login({ email, password }).then((res) => {
          if (res.token) {
            localStorage.setItem("jwt", res.token);
            setCurrentUser((prev) => ({ ...prev, isLoggedIn: true }));
            navigate("/movies", { replace: true });
          }
        });
      }
    } catch (e) {
      handleError(e);
    }
  };

  const handleLogout = () => {
    setCurrentUser((prev) => ({ ...prev, isLoggedIn: false }));
    localStorage.clear();
    navigate("/", { replace: true });
  };

  const handleRegister = async ({ email, password, name }) => {
    try {
      if (email || password || name) {
        await api.register({ email, password, name }).then((res) => {
          navigate("/signin", { replace: true });
        });
      }
    } catch (e) {
      handleError(e);
    }
  };

  const handleEditUserInfo = ({ name, email }) => {
    api.setUserInfo({ name, email }).then((res) => {
      setCurrentUser((user) => ({
        ...user,
        name: res.data.name,
        email: res.data.email,
      }));
    });
  };

  const handleSearchMovie = (value) => {
    console.log(value.search_checkbox)
    if(!value.search) {
      setSearchMovies([])
      setSearchError('')
    } else {
      let filtredMovies = movies;
      let isShort = value.search_checkbox
      if (isShort === true) {
        setSearchMovies(
          filtredMovies = movies.filter((item) => item.duration <= 40)
        );
      } else {
        setSearchMovies(
          filtredMovies.filter((item) => item.nameRU.toLowerCase().includes(value.search.toLowerCase()))
        );
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
              <RegisterPage onLogin={handleLogin} onRegister={handleRegister} />
            }
          />
          <Route
            path="/signin"
            element={
              <LoginPage onLogin={handleLogin} onRegister={handleRegister} />
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
                />
              }
            />
            <Route path="/saved-movies" element={<SavedMoviesPage />} />
          </Route>
        </Routes>
      </Suspense>
    </CurrentUserContext.Provider>
  );
}

export default App;
