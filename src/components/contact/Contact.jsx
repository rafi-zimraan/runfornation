import React from "react";
import "../../App.css";

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdcAgdrKgmhseK9ULfD5apMpOa2M1nm-vWrkUB9SuLcx61taw/viewform?usp=dialog";

const Contact = () => {
  return (
    <section className="section" id="contact" style={{ background: "var(--surface-2)" }}>
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span className="section__tag">
            <i className="uil uil-file-alt"></i>
            Pendaftaran
          </span>
          <h2 className="section__title">Form Pendaftaran</h2>
          <p className="section__subtitle" style={{ marginBottom: 0 }}>
            Isi data dengan lengkap dan benar. Pastikan email aktif untuk menerima konfirmasi.
          </p>
        </div>

        {/* Form wrapper */}
        <div
          data-aos="fade-up"
          data-aos-duration="800"
          style={{
            background: "var(--surface)",
            border: "1.5px solid var(--border)",
            borderRadius: "var(--r-xl)",
            overflow: "hidden",
            boxShadow: "var(--shadow-sm)",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          {/* Card header */}
          <div
            style={{
              padding: "1.25rem 1.5rem",
              borderBottom: "1.5px solid var(--border)",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              background: "linear-gradient(135deg, #0F2280, #1B3CC0)",
            }}
          >
            <div
              style={{
                width: "2.5rem", height: "2.5rem",
                borderRadius: "var(--r-md)",
                background: "rgba(255,255,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: "1.125rem",
              }}
            >
              <i className="uil uil-file-edit-alt"></i>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "var(--fs-base)", color: "#fff" }}>
                Run For Nation 2026 — Form Pendaftaran
              </div>
              <div style={{ fontSize: "var(--fs-xs)", color: "rgba(255,255,255,0.65)" }}>
                Isi semua kolom yang tersedia dengan benar
              </div>
            </div>
          </div>

          {/* Embedded form */}
          <iframe
            src={FORM_URL}
            title="Form Pendaftaran Run For Nation 2026"
            style={{
              width: "100%",
              height: "80vh",
              minHeight: "600px",
              border: "none",
              display: "block",
            }}
            loading="lazy"
          >
            Memuat form pendaftaran…
          </iframe>
        </div>

        {/* Info note */}
        <div
          style={{
            maxWidth: "800px",
            margin: "1rem auto 0",
            padding: "0.875rem 1.125rem",
            background: "rgba(27,60,192,0.06)",
            border: "1px solid rgba(27,60,192,0.12)",
            borderRadius: "var(--r-md)",
            display: "flex",
            gap: "0.5rem",
            fontSize: "var(--fs-xs)",
            color: "var(--blue-600)",
            fontWeight: 500,
          }}
        >
          <i className="uil uil-info-circle" style={{ fontSize: "1rem", flexShrink: 0, marginTop: "0.1rem" }}></i>
          Setelah mengisi form, lanjutkan ke bagian <strong>Pembayaran</strong> di bawah untuk menyelesaikan pendaftaran Anda.
        </div>

      </div>
    </section>
  );
};

export default Contact;
