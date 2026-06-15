import React, { useState } from "react";
import "../../App.css";
import LogoImg from "../../assets/Runners/logoRunFornationTwo.jpeg";
import Info from "./Info";

const About = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="about section" id="about">
      <div className="container">

        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="section__tag">
            <i className="uil uil-clipboard-notes"></i>
            Ketentuan
          </span>
          <h2 className="section__title">Pendaftaran Run For Nation</h2>
          <p className="section__subtitle" style={{ marginBottom: 0 }}>Spirit Of Culture 2026 — Pontianak &amp; Kubu Raya</p>
        </div>

        <div className="about__container">
          {/* Image */}
          <div className="about__img-wrap" data-aos="fade-right" data-aos-duration="800">
            <img src={LogoImg} alt="Run For Nation 2026" className="about__img" />
          </div>

          {/* Data */}
          <div data-aos="fade-left" data-aos-duration="800" data-aos-delay="100">
            <Info />

            <button
              className="btn btn-blue"
              style={{ marginTop: "1.5rem" }}
              onClick={() => setModalOpen(true)}
            >
              <i className="uil uil-file-alt"></i>
              Lihat Ketentuan Lengkap
            </button>
          </div>
        </div>

      </div>

      {/* Modal */}
      <div className={`services__modal${modalOpen ? " active-modal" : ""}`}>
        <div className="services__modal-content">
          <i
            className="uil uil-times services__modal-close"
            onClick={() => setModalOpen(false)}
          />
          <h3 className="services__modal-title">
            Ketentuan Pendaftaran Run For Nation<br />Spirit Of Culture 2026
          </h3>
          <ul className="services__modal-services">
            {[
              "Mendaftar berarti menyetujui seluruh regulasi.",
              "Seluruh peserta akan dikirimkan email konfirmasi setelah mengisi form pendaftaran.",
              "Umur minimal peserta yaitu 10 tahun. Di bawah usia yang ditentukan wajib didampingi orangtua.",
              "Peserta wajib mengisi form dengan data sesuai dan faktual. Ketidaksesuaian data akan mengakibatkan diskualifikasi tanpa refund.",
              "Peserta yang sudah terdaftar tidak dapat digantikan atau dipindahtangankan.",
              "Peserta tidak diperkenankan mengganti data setelah mengirim jawaban pendaftaran.",
              "Peserta tidak diperkenankan melakukan refund.",
              "Peserta disarankan melakukan MCU (Medical Check Up) untuk memastikan kondisi fisik dalam keadaan sehat.",
              "Penyelenggara tidak bertanggungjawab atas bahaya (penyakit, kecelakaan, kelumpuhan, kematian, Force Majeure) apapun.",
            ].map((text, i) => (
              <li key={i} className="services__modal-service">
                <i className="uil uil-check-circle services__modal-icon" />
                <p className="services__modal-info">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
