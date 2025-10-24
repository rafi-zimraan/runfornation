import React from "react";
import "../../App.css";

const Info = () => {
  return (
    <div className="about__info grid">
      <div className="about__box" data-aos="fade-up" data-aos-duration="1000">
        <i className="bx bx-check-shield about__icon"></i>
        <h3 className="about__title">
          Mendaftar berarti menyetujui seluruh regulasi.
        </h3>
      </div>

      <div
        className="about__box"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="100"
      >
        <i className="bx bx-user about__icon"></i>
        <h3 className="about__title">Umur minimal peserta yaitu 10 tahun</h3>
        <span className="about__subtitle">
           (di bawah usia yang telah ditentukan, wajib didampingi orangtua).
        </span>
      </div>

      <div
        className="about__box"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="200"
      >
        <i className="bx bx-heart about__icon"></i>
        <h3 className="about__title">
          Peserta disarankan melakukan MCU (Medical Check Up)
        </h3>
        <span className="about__subtitle">
          {" "}
          memastikan kondisi fisik individu dalam keadaan sehat.
        </span>
      </div>
    </div>
  );
};

export default Info;
