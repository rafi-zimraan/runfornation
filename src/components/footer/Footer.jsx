import React from "react";
import "../../App.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <h1
          className="footer__title"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          Spirit Of Culture 2025
        </h1>

        <ul
          className="footer__list"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="100"
        >
          <li>
            <a href="#home" className="footer__link">
              Home
            </a>
          </li>

          <li>
            <a href="#about" className="footer__link">
              About
            </a>
          </li>

          <li>
            <a href="#size" className="footer__link">
              Size
            </a>
          </li>

          <li>
            <a href="#payment" className="footer__link">
              Payment
            </a>
          </li>

          <li>
            <a href="#contact" className="footer__link">
              Contact
            </a>
          </li>
        </ul>

        <span
          className="footer__copy"
          // data-aos="fade-up"
          data-aos-duration="1000"
        >
          &#169; Crypticalcoder. All rights reserved
        </span>
      </div>
    </footer>
  );
};

export default Footer;
