import React from "react";

const PaymentDetail = ({ isEarlyBirdOpen = true }) => {
  if (!isEarlyBirdOpen) {
    return (
      <section
        style={{
          padding: "4rem 0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            background: "linear-gradient(145deg, #ffffff, #f2f2f2)",
            padding: "2.5rem 2rem",
            borderRadius: "20px",
            maxWidth: "480px",
            width: "100%",
            textAlign: "center",
            boxShadow: "0px 8px 25px rgba(0,0,0,0.6)",
          }}
          data-aos="zoom-in"
          data-aos-duration="1000"
        >
          <h2
            style={{
              fontSize: "1.8rem",
              marginBottom: "1rem",
              color: "#b91c1c",
            }}
            data-aos="fade-down"
            data-aos-duration="1000"
          >
            Pendaftaran Early Bird Ditutup
          </h2>
          <p style={{ color: "#555" }} data-aos="fade-up" data-aos-delay="200">
            Kuota 200 peserta pertama sudah terpenuhi. Tunggu batch berikutnya
            ya…
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="section"
      style={{
        padding: "4rem 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          background: "linear-gradient(145deg, #ffffff, #f2f2f2)",
          padding: "2.5rem 2rem",
          borderRadius: "20px",
          maxWidth: "480px",
          width: "100%",
          textAlign: "center",
          boxShadow: "0px 8px 25px rgba(0,0,0,0.6)",
        }}
        data-aos="zoom-in"
        data-aos-duration="1000"
      >
        <h2
          style={{ fontSize: "1.8rem", marginBottom: "1rem" }}
          data-aos="fade-down"
          data-aos-duration="1000"
        >
          Detail Pembayaran
        </h2>
        <p
          style={{ color: "#bbb", marginBottom: "2rem" }}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Silakan lakukan transfer ke rekening berikut untuk menyelesaikan
          pendaftaran:
        </p>

        <div
          style={{
            background: "#1f1f1f",
            padding: "1.5rem",
            borderRadius: "12px",
            marginBottom: "2rem",
            lineHeight: "1.6rem",
          }}
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <p>
            <strong>Bank:</strong> BSI
          </p>
          <p>
            <strong>No. Rekening:</strong> 2024232215
          </p>
          <p>
            <strong>Atas Nama:</strong> Yahya Organizer
          </p>
        </div>

        <p
          style={{ color: "#aaa", marginBottom: "1rem" }}
          data-aos="fade-up"
          data-aos-delay="300"
        >
          Setelah transfer, simpan bukti pembayaran (foto/scan) dan lakukan
          konfirmasi ke panitia melalui WhatsApp berikut dengan melampirkan foto
          bukti pembayaran:
        </p>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <a
            href="https://wa.me/628115751432?text=Halo%20kak%20Meli,%20saya%20sudah%20transfer%20untuk%20pendaftaran%20Run%20For%20Nation.%20Saya%20lampirkan%20bukti%20pembayaran."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#25D366",
              padding: "12px",
              borderRadius: "10px",
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            WhatsApp Meli (+62 811-5751-432)
          </a>

          <a
            href="https://wa.me/6281250721792?text=Halo%20bang%20Wildan,%20saya%20sudah%20transfer%20untuk%20pendaftaran%20Run%20For%20Nation.%20Saya%20lampirkan%20bukti%20pembayaran."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#25D366",
              padding: "12px",
              borderRadius: "10px",
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            WhatsApp Wildan (+62 812-5072-1792)
          </a>
        </div>
      </div>
    </section>
  );
};

export default PaymentDetail;
