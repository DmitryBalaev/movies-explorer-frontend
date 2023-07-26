import React from "react";
import "./Landing.css";
import LandingHeader from "./LandingHeader/LandingHeader";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs"
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";
import Footer from "../Footer/Footer";

function Landing() {
  return (
    <>
      <LandingHeader/>
      <AboutProject/>
      <Techs/>
      <AboutMe/>
      <Portfolio/>
      <Footer/>
    </>
  );
}

export default Landing;
