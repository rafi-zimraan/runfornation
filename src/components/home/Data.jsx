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
          RUN FOR
          <br />
          <span className="home__title-accent">NATION</span>
        </h1>

        <p className="home__subtitle">Fun Race 5K &amp; 10K — Pontianak</p>

        <div className="home__meta">
          <span className="home__meta-item">
            <i className="uil uil-map-marker"></i>
            Pontianak
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

        <p className="home__desc">
          Selamat datang di pendaftaran resmi{" "}
          <strong>Run For Nation 2026: "Spirit of Culture"</strong> — Fun Race
          di Pontianak yang memadukan olahraga, budaya, dan kebersamaan dengan
          semangat
          <em> "Persatuan dan Kebudayaan"</em>. Tahun ini kami menghadirkan
          kategori <strong>5KM dan 10KM</strong>, terbuka untuk semua kalangan —
          dari pemula hingga profesional, dengan selalu mengutamakan sportivitas
          profesional — dengan rute seru dan suasana <em>sportainment</em>{" "}
          budaya yang menegaskan Pontianak sebagai destinasi baru pelari lintas
          daerah dan regional.
        </p>

        {/* Category cards */}
        <div className="home__cats">
          <a href="#payment" className="home__cat home__cat--fun">
            <div className="home__cat-top">
              <span className="home__cat-km">5K</span>
              <i className="uil uil-smile-beam home__cat-icon"></i>
            </div>
            <span className="home__cat-type">Fun Run</span>
          </a>
          <div className="home__cats-divider">
            <span>VS</span>
          </div>
          <a href="#payment" className="home__cat home__cat--race">
            <div className="home__cat-top">
              <span className="home__cat-km">10K</span>
              <i className="uil uil-bolt home__cat-icon"></i>
            </div>
            <span className="home__cat-type">Fun Race</span>
          </a>
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
      <div
        className="home__promo"
        data-aos="fade-left"
        data-aos-duration="800"
        data-aos-delay="100"
      >
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
