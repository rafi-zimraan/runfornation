import React from "react";
import { Link } from "react-router-dom";

const Payments = () => {
  return (
    <section
      className="section"
      style={{
        padding: "4rem 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      id="payment"
    >
      <div
        style={{
          background: "linear-gradient(145deg, #ffffff, #f2f2f2)",
          color: "#fff",
          borderRadius: "16px",
          padding: "2rem",
          maxWidth: "400px",
          width: "100%",
          boxShadow: "0px 8px 20px rgba(0,0,0,0.4)",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Badge */}
        <div
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            background: "#888",
            padding: "5px 12px",
            borderRadius: "20px",
            fontSize: "0.8rem",
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          Most popular
        </div>

        {/* Title */}
        <h2
          style={{ fontSize: "1.5rem", marginBottom: "0.5rem", color: "#000" }}
        >
          Paket Early Bird
        </h2>
        <p
          style={{ color: "#aaa", fontSize: "0.9rem", marginBottom: "1.5rem" }}
        >
          Daftar dan nikmati semua fasilitas peserta eksklusif!
        </p>

        {/* Price */}
        <h3 style={{ fontSize: "3rem", marginBottom: "1rem", color: "#000" }}>
          Rp150.000
        </h3>
        <p
          style={{
            color: "#888",
            fontSize: "0.9rem",
            marginBottom: "1.5rem",
          }}
        >
          Early Bird (200 peserta pertama) <br /> Harga normal{" "}
          <p style={{ textDecoration: "line-through", color: "red" }}>
            Rp175.000
          </p>
        </p>

        {/* Button */}
        <Link to={"/payment"}>
          <button
            style={{
              background: "linear-gradient(90deg, #014a91, #014a91",
              border: "none",
              padding: "12px 20px",
              borderRadius: "10px",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
              width: "100%",
              marginBottom: "1.5rem",
              fontSize: "1rem",
            }}
          >
            Pilih Paket Ini
          </button>
        </Link>

        {/* Fasilitas */}
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            textAlign: "left",
            lineHeight: "1.8rem",
            color: "#888",
          }}
        >
          <li>✅ Race Jersey</li>
          <li>✅ BIB Number</li>
          <li>✅ Medali Finisher</li>
          <li>✅ Totebag</li>
          <li>✅ Refreshment</li>
          <li>✅ Support Medis</li>
          <li>✅ Dokumen Race</li>
          <li>✅ Undian Doorprize</li>
        </ul>
      </div>
    </section>
  );
};

export default Payments;
