import React from "react";
import "../../App.css";
import Data from "./Data";

const Home = () => {
  return (
    <section className="home" id="home">
      {/* decorative rings */}
      <div className="home__ring home__ring-1" />
      <div className="home__ring home__ring-2" />

      <div className="container">
        <Data />
      </div>

      {/* scroll hint */}
      <div className="home__scroll">
        <a href="#about" className="home__scroll-button">
          <span>Scroll</span>
          <i className="uil uil-arrow-down home__scroll-arrow"></i>
        </a>
      </div>
    </section>
  );
};

export default Home;
