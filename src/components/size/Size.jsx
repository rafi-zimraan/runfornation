import React, { useState } from "react";
import "../../App.css";
import DewasaImg from "../../assets/Runners/logoSize.png";
import KidsImg from "../../assets/Runners/logoSize.png";

const ADULT = [
  ["3S", 44, 62], ["2S", 45, 64], ["XS", 47, 66],
  ["S",  49, 68], ["M",  50, 70], ["L",  52, 72],
  ["XL", 54, 74], ["2XL",56, 76], ["3XL",58, 78],
];

const KIDS = [
  [2, 30, 40], [4, 32, 46], [6, 34, 48], [8, 36, 50], [10, 38, 51],
];

const SizeTable = ({ rows }) => (
  <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead>
      <tr>
        {["Size", "Lebar Dada", "Panjang Baju"].map((h) => (
          <th
            key={h}
            style={{
              padding: "0.7rem 1rem",
              background: "var(--blue-600)",
              color: "#fff",
              fontSize: "var(--fs-xs)",
              fontWeight: 700,
              textAlign: "center",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {h}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map(([size, dada, panjang], i) => (
        <tr
          key={size}
          style={{ background: i % 2 === 0 ? "var(--surface)" : "var(--surface-2)" }}
        >
          <td style={{ padding: "0.6rem 1rem", textAlign: "center", fontWeight: 800, color: "var(--blue-600)", fontSize: "var(--fs-sm)" }}>
            {size}
          </td>
          <td style={{ padding: "0.6rem 1rem", textAlign: "center", color: "var(--text)", fontSize: "var(--fs-sm)" }}>
            {dada} cm
          </td>
          <td style={{ padding: "0.6rem 1rem", textAlign: "center", color: "var(--text)", fontSize: "var(--fs-sm)" }}>
            {panjang} cm
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const Size = () => {
  const [tab, setTab] = useState("dewasa");
  const isDewasa = tab === "dewasa";

  return (
    <section className="size section" id="size">
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span className="section__tag">
            <i className="uil uil-tshirt"></i>
            Jersey
          </span>
          <h2 className="section__title">Size Chart</h2>
          <p className="section__subtitle" style={{ marginBottom: "1.75rem" }}>
            Panduan ukuran jersey Run For Nation 2026. Toleransi 2cm.
          </p>

          {/* Tab switcher */}
          <div
            style={{
              display: "inline-flex",
              background: "var(--surface)",
              border: "1.5px solid var(--border)",
              borderRadius: "var(--r-lg)",
              padding: "0.3rem",
              gap: "0.25rem",
            }}
          >
            {[
              { key: "dewasa", label: "Dewasa", icon: "uil-user" },
              { key: "kids",   label: "Kids",   icon: "uil-kid" },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.55rem 1.5rem",
                  borderRadius: "var(--r-md)",
                  fontSize: "var(--fs-sm)",
                  fontWeight: 600,
                  background: tab === t.key ? "var(--blue-600)" : "transparent",
                  color: tab === t.key ? "#fff" : "var(--text-muted)",
                  transition: "all var(--t-fast) var(--ease)",
                  cursor: "pointer",
                  border: "none",
                }}
              >
                <i className={`uil ${t.icon}`}></i>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "start",
          }}
        >
          {/* Image */}
          <div
            data-aos="fade-right"
            data-aos-duration="800"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <img
              src={isDewasa ? DewasaImg : KidsImg}
              alt={`Size Chart ${isDewasa ? "Dewasa" : "Kids"}`}
              style={{
                width: "100%",
                maxWidth: "380px",
                borderRadius: "var(--r-xl)",
                boxShadow: "var(--shadow-md)",
                objectFit: "contain",
                transition: "opacity var(--t-base) var(--ease)",
              }}
            />
          </div>

          {/* Table card */}
          <div data-aos="fade-left" data-aos-duration="800">
            <div
              style={{
                background: "var(--surface)",
                border: "1.5px solid var(--border)",
                borderRadius: "var(--r-xl)",
                overflow: "hidden",
                boxShadow: "var(--shadow-sm)",
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
                }}
              >
                <div
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "var(--r-md)",
                    background: "var(--blue-100)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--blue-600)",
                    fontSize: "1.125rem",
                    flexShrink: 0,
                  }}
                >
                  <i className="uil uil-tshirt"></i>
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "var(--fs-base)", color: "var(--text)" }}>
                    Ukuran {isDewasa ? "Dewasa" : "Kids"}
                  </div>
                  <div style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)" }}>
                    {isDewasa ? "Size 3S hingga 3XL" : "Size 2 hingga 10 (tahun)"}
                  </div>
                </div>
              </div>

              {/* Table */}
              <div style={{ overflowX: "auto" }}>
                <SizeTable rows={isDewasa ? ADULT : KIDS} />
              </div>

              {/* Footer note */}
              <div
                style={{
                  padding: "0.875rem 1.25rem",
                  background: "rgba(212,32,32,0.05)",
                  borderTop: "1px solid rgba(212,32,32,0.1)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontSize: "var(--fs-xs)",
                  color: "var(--red)",
                  fontWeight: 500,
                }}
              >
                <i className="uil uil-exclamation-triangle"></i>
                Toleransi 2cm dikarenakan suhu mesin dan proses jahit
              </div>
            </div>

            {/* Info note */}
            <div
              style={{
                marginTop: "1rem",
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
              <i className="uil uil-lightbulb-alt" style={{ fontSize: "1rem", flexShrink: 0 }}></i>
              Jika ragu antara dua ukuran, pilih ukuran yang lebih besar untuk kenyamanan maksimal.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Size;
