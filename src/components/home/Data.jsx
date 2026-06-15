import React from "react";
import "../../App.css";
import PromoImg from "../../assets/Runners/logoRunFornationTwo.jpeg";

const Data = () => {
  return (
    <div className="home__container">
      {/* Left — text content */}
      <div className="home__left" data-aos="fade-right" data-aos-duration="800">
        <span className="home__badge">
          <i className="uil uil-trophy"></i>
          Spirit of Culture 2026
        </span>

        <h1 className="home__title">
          RUN FOR<br />
          <span className="home__title-accent">NATION</span>
        </h1>

        <p className="home__subtitle">Fun Run 5K &amp; 10K — Pontianak</p>

        <div className="home__meta">
          <span className="home__meta-item">
            <i className="uil uil-map-marker"></i>
            Pontianak &amp; Kubu Raya
          </span>
          <span className="home__meta-item">
            <i className="uil uil-users-alt"></i>
            Terbuka untuk semua kalangan
          </span>
          <span className="home__meta-item">
            <i className="uil uil-shield-check"></i>
            Min. 10 tahun
          </span>
        </div>

        <div className="home__actions">
          <a href="#payment" className="btn btn-gold">
            <i className="uil uil-ticket"></i>
            Lihat Paket
          </a>
          <a href="#about" className="btn btn-outline-white">
            <i className="uil uil-info-circle"></i>
            Ketentuan
          </a>
        </div>

        <div className="home__social-row">
          <span className="home__social-label">Follow</span>
          <a
            href="https://www.instagram.com/runfornation.id"
            className="home__social-icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Run For Nation"
          >
            <i className="uil uil-instagram"></i>
          </a>
        </div>
      </div>

      {/* Right — promo card */}
      <div className="home__promo" data-aos="fade-left" data-aos-duration="800" data-aos-delay="100">
        <div className="home__promo-card">
          <span className="home__promo-badge">🏃 Spirit of Culture 2026</span>
          <img
            src={PromoImg}
            alt="Run For Nation 2026 — Early Bird Ticket"
            className="home__promo-img"
          />
        </div>
      </div>
    </div>
  );
};

export default Data;
