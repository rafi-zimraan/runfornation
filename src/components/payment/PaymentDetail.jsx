import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import "../../App.css";

const fmt = (n) => new Intl.NumberFormat("id-ID").format(n);

const PRICES = {
  "5K":  { earlyBird: 165000, normal: 180000 },
  "10K": { earlyBird: 195000, normal: 225000 },
};

const PaymentDetail = () => {
  const [params] = useSearchParams();
  const kategori = params.get("kategori") || "5K";
  const isLong   = params.get("lengan") === "panjang";
  const pkg      = PRICES[kategori] ?? PRICES["5K"];
  const addon    = isLong ? 10000 : 0;
  const earlyFinal  = pkg.earlyBird + addon;

  return (
    <div
      style={{
        minHeight: "100svh",
        background: "linear-gradient(135deg, var(--blue-950) 0%, var(--blue-900) 60%, var(--blue-800) 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 1.5rem 3rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* background glow */}
      <div style={{
        position: "absolute", top: "-20%", right: "-10%",
        width: "50%", aspectRatio: "1", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,204,0,0.08) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      {/* Back link */}
      <Link
        to="/"
        style={{
          position: "fixed", top: "1.25rem", left: "1.25rem",
          display: "flex", alignItems: "center", gap: "0.4rem",
          fontSize: "var(--fs-sm)", color: "rgba(255,255,255,0.6)",
          fontWeight: 500, transition: "color var(--t-fast) var(--ease)",
          zIndex: 101,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
      >
        <i className="uil uil-arrow-left"></i> Kembali
      </Link>

      {/* Main card */}
      <div
        data-aos="zoom-in"
        data-aos-duration="700"
        style={{
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "var(--r-xl)",
          padding: "2.5rem 2rem",
          maxWidth: "480px",
          width: "100%",
          boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: "3.5rem", height: "3.5rem",
            borderRadius: "var(--r-lg)",
            background: "rgba(245,204,0,0.12)",
            border: "1px solid rgba(245,204,0,0.25)",
            marginBottom: "1rem",
            fontSize: "1.5rem",
          }}>
            🎽
          </div>
          <h2 style={{ fontSize: "var(--fs-2xl)", fontWeight: 800, color: "#fff", marginBottom: "0.375rem" }}>
            Detail Pembayaran
          </h2>
          <p style={{ fontSize: "var(--fs-sm)", color: "rgba(255,255,255,0.55)" }}>
            Run For Nation 2026 — Fun Run {kategori}
          </p>
        </div>

        {/* Paket summary */}
        <div style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "var(--r-lg)",
          padding: "1.25rem",
          marginBottom: "1.5rem",
        }}>
          <p style={{ fontSize: "var(--fs-xs)", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.875rem" }}>
            Ringkasan Paket
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "var(--fs-sm)", color: "rgba(255,255,255,0.7)" }}>Fun Run {kategori}</span>
            <span style={{ fontSize: "var(--fs-sm)", fontWeight: 600, color: "#fff" }}>Rp{fmt(pkg.earlyBird)}</span>
          </div>
          {isLong && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "var(--fs-sm)", color: "rgba(255,255,255,0.7)" }}>Jersey Tangan Panjang</span>
              <span style={{ fontSize: "var(--fs-sm)", fontWeight: 600, color: "var(--gold)" }}>+Rp10.000</span>
            </div>
          )}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: "0.75rem", paddingTop: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "var(--fs-sm)", fontWeight: 700, color: "#fff" }}>Total (Early Bird)</span>
            <span style={{ fontSize: "var(--fs-xl)", fontWeight: 900, color: "var(--gold)" }}>Rp{fmt(earlyFinal)}</span>
          </div>
        </div>

        {/* Bank info */}
        <div style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "var(--r-lg)",
          padding: "1.25rem",
          marginBottom: "1.5rem",
        }}>
          <p style={{ fontSize: "var(--fs-xs)", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>
            Transfer ke Rekening
          </p>
          {[
            { label: "Bank",          value: "BSI (Bank Syariah Indonesia)" },
            { label: "No. Rekening",  value: "2024232215" },
            { label: "Atas Nama",     value: "Yahya Organizer" },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.625rem" }}>
              <span style={{ fontSize: "var(--fs-sm)", color: "rgba(255,255,255,0.5)" }}>{label}</span>
              <span style={{ fontSize: "var(--fs-sm)", fontWeight: 700, color: "#fff" }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Instruction */}
        <p style={{
          fontSize: "var(--fs-xs)",
          color: "rgba(255,255,255,0.5)",
          lineHeight: 1.7,
          marginBottom: "1.25rem",
          textAlign: "center",
        }}>
          Setelah transfer, simpan bukti pembayaran dan konfirmasi ke panitia via WhatsApp dengan melampirkan foto bukti transfer.
        </p>

        {/* WhatsApp buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {[
            {
              name:  "Meli",
              phone: "6285393669366",
              text:  `Halo kak Meli, saya sudah transfer untuk pendaftaran Run For Nation 2026 kategori ${kategori}${isLong ? " + jersey tangan panjang" : ""}. Saya lampirkan bukti pembayaran.`,
            },
            {
              name:  "Wildan",
              phone: "6281250721792",
              text:  `Halo bang Wildan, saya sudah transfer untuk pendaftaran Run For Nation 2026 kategori ${kategori}${isLong ? " + jersey tangan panjang" : ""}. Saya lampirkan bukti pembayaran.`,
            },
          ].map(({ name, phone, text }) => (
            <a
              key={name}
              href={`https://wa.me/${phone}?text=${encodeURIComponent(text)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: "0.875rem",
                borderRadius: "var(--r-md)",
                background: "#25D366",
                color: "#fff",
                fontSize: "var(--fs-sm)",
                fontWeight: 700,
                transition: "opacity var(--t-fast) var(--ease)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <i className="uil uil-whatsapp" style={{ fontSize: "1.125rem" }}></i>
              Konfirmasi ke {name}
              <span style={{ opacity: 0.75, fontSize: "var(--fs-xs)" }}>
                (+{phone.replace(/^62/, "0").replace(/(\d{4})(\d{4})(\d+)/, "$1-$2-$3")})
              </span>
            </a>
          ))}
        </div>

      </div>
    </div>
  );
};

export default PaymentDetail;
