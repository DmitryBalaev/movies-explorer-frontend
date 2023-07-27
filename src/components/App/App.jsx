import { Route, Routes } from "react-router-dom";
import Landing from "../Landing/Landing";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import "./App.css";
import { CurrentUserContext } from "../../Context/CurrentUserContext/CurrentUserContext";
import { useState } from "react";
import Profile from "../Profile/Profile";

function App() {
  const [isAuth, setIsUath] = useState(true)
  return (
    <CurrentUserContext.Provider value={isAuth}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
