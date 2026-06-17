import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdcAgdrKgmhseK9ULfD5apMpOa2M1nm-vWrkUB9SuLcx61taw/viewform?embedded=true";

const REG_UNLOCK_KEY = "rfn_reg_unlocked";

const WA_CONTACTS = [
  { name: "Meli", phone: "6285393669366", desc: "Konfirmasi Pribadi / Personal" },
];

const readGateInfo = () => {
  try {
    const raw = localStorage.getItem(REG_UNLOCK_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    return data?.unlocked === true ? data : null;
  } catch {
    return null;
  }
};

const Contact = () => {
  const [gateInfo] = useState(readGateInfo);
  const isUnlocked = !!gateInfo;

  const kategori  = gateInfo?.kategori || "5K";
  const isLong    = gateInfo?.lengan === "panjang";
  const tipeRace  = kategori === "10K" ? "Fun Race" : "Fun Run";
  const raceColor = kategori === "10K" ? "#D42020" : "#1B3CC0";

  return (
    <section className="section" id="contact" style={{ background: "var(--surface-2)" }}>
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span className="section__tag">
            <i className="uil uil-file-alt"></i>
            Pendaftaran
          </span>
          <h2 className="section__title">Form Pendataan Diri</h2>
          <p className="section__subtitle" style={{ marginBottom: 0 }}>
            {isUnlocked
              ? "Isi data dengan lengkap dan benar, lalu lampirkan bukti transfer Anda pada kolom yang tersedia."
              : "Selesaikan pembayaran terlebih dahulu untuk membuka form ini."}
          </p>
        </div>

        {isUnlocked ? (
          <>
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
                  borderBottom: "1.5px solid rgba(245,204,0,0.15)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  background: "linear-gradient(135deg, #0A0E23 0%, #111827 100%)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div
                    style={{
                      width: "2.5rem", height: "2.5rem",
                      borderRadius: "var(--r-md)",
                      background: "rgba(245,204,0,0.12)",
                      border: "1px solid rgba(245,204,0,0.25)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "var(--gold)", fontSize: "1.125rem",
                    }}
                  >
                    <i className="uil uil-file-edit-alt"></i>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "var(--fs-base)", color: "#fff" }}>
                      Run For Nation 2026 — Form Pendataan Diri
                    </div>
                    <div style={{ fontSize: "var(--fs-xs)", color: "rgba(255,255,255,0.5)" }}>
                      Isi semua kolom yang tersedia dengan benar
                    </div>
                  </div>
                </div>
              </div>

              {/* Embedded form */}
              <iframe
                src={FORM_URL}
                title="Form Pendataan Diri Run For Nation 2026"
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

            {/* WA confirmation — langkah terakhir setelah isi form */}
            <div
              data-aos="fade-up"
              data-aos-duration="700"
              style={{
                maxWidth: "800px",
                margin: "1.5rem auto 0",
                background: "var(--surface)",
                border: "1.5px solid var(--border)",
                borderRadius: "var(--r-xl)",
                padding: "1.5rem",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <div style={{
                  width: "2.5rem", height: "2.5rem",
                  borderRadius: "50%",
                  background: "rgba(37,211,102,0.12)", color: "#25D366",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.25rem", flexShrink: 0,
                }}>
                  <i className="uil uil-whatsapp"></i>
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "var(--fs-sm)", color: "var(--text)" }}>
                    Langkah Terakhir: Konfirmasi ke Panitia
                  </div>
                  <div style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)" }}>
                    Sudah selesai mengisi form di atas? Kirim konfirmasi beserta bukti transfer Anda.
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {WA_CONTACTS.map(({ name, phone, desc }) => {
                  const text = `Halo kak ${name}, saya sudah mengisi form pendaftaran Run For Nation 2026 kategori ${tipeRace} ${kategori}${isLong ? " + jersey tangan panjang" : ""} dan sudah transfer. Saya lampirkan bukti pembayaran.`;
                  return (
                    <a
                      key={name}
                      href={`https://wa.me/${phone}?text=${encodeURIComponent(text)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact__wa-link"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "rgba(37,211,102,0.5)";
                        e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,211,102,0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "";
                        e.currentTarget.style.boxShadow = "";
                      }}
                    >
                      <div style={{
                        width: "2.75rem", height: "2.75rem",
                        borderRadius: "var(--r-md)",
                        background: "#25D366",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "1.25rem", color: "#fff", flexShrink: 0,
                      }}>
                        <i className="uil uil-whatsapp"></i>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.125rem" }}>
                        <span style={{ fontWeight: 700, fontSize: "var(--fs-sm)", color: "var(--text)" }}>
                          {name}
                        </span>
                        <span style={{ fontSize: "var(--fs-xs)", color: "#25D366", fontWeight: 600 }}>
                          {desc}
                        </span>
                        <span style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)", opacity: 0.7 }}>
                          (+{phone.replace(/^62/, "0").replace(/(\d{4})(\d{4})(\d+)/, "$1-$2-$3")})
                        </span>
                      </div>
                      <div className="contact__wa-badge">
                        <i className="uil uil-message" style={{ fontSize: "0.75rem" }}></i>
                        Hubungi
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          /* Gate — form terkunci sampai user memilih paket & melihat pembayaran */
          <div
            data-aos="fade-up"
            data-aos-duration="800"
            className="contact__gate-card"
            style={{
              background: "var(--surface)",
              border: "1.5px solid var(--border)",
              borderRadius: "var(--r-xl)",
              boxShadow: "var(--shadow-sm)",
              maxWidth: "800px",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "4rem", height: "4rem",
                borderRadius: "50%",
                background: "rgba(212,32,32,0.1)",
                color: "#D42020",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.75rem",
                margin: "0 auto 1.25rem",
              }}
            >
              <i className="uil uil-lock"></i>
            </div>
            <h3 style={{ fontSize: "var(--fs-xl)", fontWeight: 700, color: "var(--text)", marginBottom: "0.625rem" }}>
              Form Pendataan Diri Terkunci
            </h3>
            <p style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)", lineHeight: 1.7, maxWidth: "480px", margin: "0 auto 1.75rem" }}>
              Untuk menjaga proses pendaftaran tetap rapi, isi form ini <strong>hanya bisa dilakukan setelah Anda memilih paket &amp; melihat detail pembayaran</strong>.
              Silakan pilih paket terlebih dahulu di bagian Pembayaran.
            </p>
            <Link to="/#payment" style={{ display: "inline-block" }}>
              <button
                style={{
                  padding: "0.875rem 1.75rem",
                  borderRadius: "var(--r-md)",
                  background: "#1B3CC0", color: "#fff",
                  fontSize: "var(--fs-sm)", fontWeight: 700,
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  border: "none", cursor: "pointer",
                  transition: "opacity var(--t-fast) var(--ease)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <i className="uil uil-wallet"></i>
                Lihat Paket &amp; Lakukan Pembayaran
              </button>
            </Link>

            <div
              style={{
                marginTop: "1.75rem",
                padding: "0.875rem 1.125rem",
                background: "rgba(212,32,32,0.06)",
                border: "1px solid rgba(212,32,32,0.12)",
                borderRadius: "var(--r-md)",
                display: "flex",
                gap: "0.5rem",
                fontSize: "var(--fs-xs)",
                color: "#D42020",
                fontWeight: 500,
                textAlign: "left",
              }}
            >
              <i className="uil uil-info-circle" style={{ fontSize: "1rem", flexShrink: 0, marginTop: "0.1rem" }}></i>
              Sudah pernah membuka halaman Pembayaran tapi form masih terkunci? Coba refresh halaman ini, atau hubungi panitia.
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Contact;
