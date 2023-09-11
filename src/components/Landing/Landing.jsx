import React from "react";
import "./Landing.css";
import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Content from "../Content/Content";

function Landing() {
  return (
    <>
      <Header />
      <Content>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </Content>
      <Footer />
    </>
  );
}

export default Landing;
