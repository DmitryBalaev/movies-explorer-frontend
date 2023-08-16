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

function App() {
  const [errorMessage, setErrorMessage] = useState('');
  const [currentUser, setCurrentUser] = useState({
    isLoggedIn: localStorage.getItem("jwt") ? true : false,
  })

  const navigate = useNavigate()

  const handleError = (e) => {
    setErrorMessage(e)
    console.log(errorMessage)
  }

  const handleLogin = async ({ email, password }) => {
    try {
      if ( email || password) {
        await api
          .login({email, password})
          .then((res) => {
            if (res.token) {
              localStorage.setItem("jwt", res.token)
              setCurrentUser((prev) => ({...prev, isLoggedIn: true}))
              navigate('/movies', { replace: true })
            }
          })
      }
    } catch (e) {
      handleError(e)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("jwt")
    setCurrentUser((prev) => ({...prev, isLoggedIn: false}))
  }

  const handleRegister = async ({ email, password, name }) => {
    try {
      if (email || password || name) {
        await api
          .register({ email, password, name })
          .then((res) => {
            navigate("/signin", { replace: true })
          })
      }
    } catch (e) {
      handleError(e)
    }
  }

  const checkToken = async () => {
    const token = localStorage.getItem("jwt")

    if (token) {
      const userInfo = await api.getCurrentUser(token)
      setCurrentUser((prev) => ({
        ...prev, isLoggedIn: true,
        name: userInfo.data.name,
        email: userInfo.data.email,
      }))
    }
  }

  useEffect(() => {
    if (currentUser.isLoggedIn){
      checkToken()
    }
  }, [currentUser.isLoggedIn])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Suspense fallback={<Preloader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<RegisterPage onLogin={handleLogin} onRegister={handleRegister}/>} />
          <Route path="/signin" element={<LoginPage onLogin={handleLogin} onRegister={handleRegister} />} />
          <Route path="*" element={<NotFound />} />
          <Route element={<ProtectedRoute/>}>
            <Route
              path="/profile"
              element={<ProfilePage onLogout={handleLogout} />}
            />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/saved-movies" element={<SavedMoviesPage />} />
          </Route>
        </Routes>
      </Suspense>
    </CurrentUserContext.Provider>
  );
}

export default App;
