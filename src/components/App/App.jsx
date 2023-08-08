import { Route, Routes } from "react-router-dom";
import { LandingPage } from "../Landing/Landing.lazy";
import { RegisterPage } from "../Register/Register.lazy";
import { LoginPage } from "../Login/Login.lazy";
import NotFound from "../NotFound/NotFound";
import "./App.css";
import { CurrentUserContext } from "../../Context/CurrentUserContext/CurrentUserContext";
import { useState, Suspense } from "react";
import { ProfilePage } from "../Profile/Profile.lazy";
import { MoviesPage } from "../Movies/Movies.lazy";
import { SavedMoviesPage } from "../SavedMovies/SavedMovies.lazy";
import Preloader from "../Preloader/Preloader";

function App() {
  const [isAuth, setIsUath] = useState(false);
  return (
    <CurrentUserContext.Provider value={isAuth}>
      <Suspense fallback={<Preloader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route
            path="/profile"
            element={<ProfilePage handleLogout={() => setIsUath(false)} />}
          />
          <Route path="*" element={<NotFound />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/saved-movies" element={<SavedMoviesPage />} />
        </Routes>
      </Suspense>
    </CurrentUserContext.Provider>
  );
}

export default App;
