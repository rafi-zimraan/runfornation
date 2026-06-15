import React from "react";
import "../../App.css";

const items = [
  { icon: "bx bx-shield-check", title: "Setujui Regulasi", sub: "Mendaftar = menyetujui seluruh ketentuan" },
  { icon: "bx bx-user", title: "Min. 10 Tahun", sub: "Didampingi orangtua jika di bawah usia tersebut" },
  { icon: "bx bx-heart", title: "Cek Kesehatan", sub: "MCU dianjurkan sebelum hari H" },
];

const Info = () => (
  <div className="about__info">
    {items.map((item, i) => (
      <div
        key={i}
        className="about__box"
        data-aos="fade-up"
        data-aos-duration="700"
        data-aos-delay={i * 80}
      >
        <i className={`${item.icon} about__icon`}></i>
        <h3 className="about__title">{item.title}</h3>
        <span className="about__subtitle">{item.sub}</span>
      </div>
    ))}
  </div>
);

export default Info;
