import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";

const isRegistrationClosed = false; // ubah ke true untuk menutup pendaftaran

const INCLUDES = [
  "Jersey Event",
  "Medali Finisher",
  "BIB Number",
  "Produk Sponsor",
  "Kupon Undian",
  "Tote Bag",
  "Water Station",
  "Refreshment",
  "Foto / Dokumentasi",
  "Support Medis",
];

const PACKAGES = [
  {
    category: "5K",
    type: "Fun Run",
    earlyBird: 165000,
    normal: 180000,
    badge: "Most Popular",
    badgeColor: "#1B3CC0",
    desc: "Kategori santai untuk semua kalangan — pemula, komunitas, dan keluarga. Nikmati suasana sportainment budaya Pontianak di rute 5 kilometer!",
    color: "#1B3CC0",
    icon: "uil-smile-beam",
  },
  {
    category: "10K",
    type: "Fun Race",
    earlyBird: 195000,
    normal: 225000,
    badge: "Challenge",
    badgeColor: "#D42020",
    desc: "Kategori santai, kompetitif & profesional untuk pelari berpengalaman dan profesional. Buktikan kemampuan terbaik Anda di jalur penuh tantangan 10 kilometer!",
    color: "#D42020",
    icon: "uil-bolt",
  },
];

const fmt = (n) => new Intl.NumberFormat("id-ID").format(n);

/* ── per-card component ── */
const PackageCard = ({ pkg, index }) => {
  const [longSleeve, setLongSleeve] = useState(false);

  const addon = longSleeve ? 10000 : 0;
  const earlyFinal = pkg.earlyBird + addon;
  const normalFinal = pkg.normal + addon;

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="700"
      data-aos-delay={index * 100}
      style={{
        background: "var(--surface)",
        border: "1.5px solid var(--border)",
        borderRadius: "var(--r-xl)",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
        transition:
          "transform var(--t-fast) var(--ease), box-shadow var(--t-fast) var(--ease), border-color var(--t-fast) var(--ease)",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "var(--shadow-md)";
        e.currentTarget.style.borderColor = pkg.color + "50";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "";
        e.currentTarget.style.borderColor = "";
      }}
    >
      {/* top accent stripe */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: `linear-gradient(90deg, ${pkg.color}, ${pkg.color}88)`,
        }}
      />

      {/* badge */}
      <span
        style={{
          position: "absolute",
          top: "1.25rem",
          right: "1.25rem",
          background: pkg.badgeColor,
          color: "#fff",
          fontSize: "var(--fs-xs)",
          fontWeight: 700,
          padding: "0.25rem 0.75rem",
          borderRadius: "var(--r-full)",
        }}
      >
        {pkg.badge}
      </span>

      {/* category icon */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "3.5rem",
          height: "3.5rem",
          borderRadius: "var(--r-md)",
          background: pkg.color + "12",
          color: pkg.color,
          fontSize: "1.375rem",
        }}
      >
        <i className={`uil ${pkg.icon}`}></i>
      </div>

      {/* title + desc */}
      <div>
        <h3
          style={{
            fontSize: "var(--fs-xl)",
            fontWeight: 700,
            color: "var(--text)",
            margin: "0 0 0.5rem",
          }}
        >
          {pkg.type} {pkg.category}
        </h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.375rem",
            marginBottom: "0.625rem",
          }}
        >
          {(pkg.type === "Fun Run"
            ? ["Santai", "Semua Kalangan"]
            : ["Kompetitif", "Profesional"]
          ).map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "var(--fs-xs)",
                fontWeight: 700,
                padding: "0.2rem 0.625rem",
                borderRadius: "var(--r-full)",
                background: pkg.color + "18",
                color: pkg.color,
                border: `1px solid ${pkg.color}30`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <p
          style={{
            fontSize: "var(--fs-sm)",
            color: "var(--text-muted)",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {pkg.desc}
        </p>
      </div>

      {/* ── Long Sleeve Toggle ── */}
      <div
        style={{
          background: longSleeve ? `${pkg.color}08` : "var(--surface-2)",
          border: `1.5px solid ${longSleeve ? pkg.color + "30" : "var(--border)"}`,
          borderRadius: "var(--r-md)",
          padding: "0.875rem 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.75rem",
          transition: "all var(--t-fast) var(--ease)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
          <i
            className="uil uil-tshirt"
            style={{
              fontSize: "1.25rem",
              color: longSleeve ? pkg.color : "var(--text-muted)",
            }}
          ></i>
          <div>
            <div
              style={{
                fontSize: "var(--fs-sm)",
                fontWeight: 600,
                color: "var(--text)",
              }}
            >
              Tangan Panjang
            </div>
            <div
              style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)" }}
            >
              +Rp10.000
            </div>
          </div>
        </div>

        {/* toggle switch */}
        <div
          onClick={() => !isRegistrationClosed && setLongSleeve(!longSleeve)}
          role="switch"
          aria-checked={longSleeve}
          style={{
            width: "3rem",
            height: "1.625rem",
            borderRadius: "var(--r-full)",
            background: longSleeve ? pkg.color : "#CBD5E1",
            position: "relative",
            cursor: isRegistrationClosed ? "not-allowed" : "pointer",
            transition: "background var(--t-fast) var(--ease)",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "3px",
              left: longSleeve ? "calc(100% - 1.1rem - 3px)" : "3px",
              width: "1.1rem",
              height: "1.1rem",
              borderRadius: "50%",
              background: "#fff",
              boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
              transition: "left var(--t-fast) var(--ease)",
            }}
          />
        </div>
      </div>

      {/* Price box */}
      <div
        style={{
          background: pkg.color + "08",
          border: `1px solid ${pkg.color}20`,
          borderRadius: "var(--r-md)",
          padding: "1rem 1.25rem",
        }}
      >
        {/* Early Bird row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: "0.5rem",
          }}
        >
          <span
            style={{
              fontSize: "var(--fs-xs)",
              fontWeight: 700,
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.07em",
            }}
          >
            Early Bird
          </span>
          <span
            style={{
              fontSize: "var(--fs-2xl)",
              fontWeight: 800,
              color: pkg.color,
              transition: "all var(--t-fast) var(--ease)",
            }}
          >
            Rp{fmt(earlyFinal)}
          </span>
        </div>

        {/* Normal row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <span
            style={{
              fontSize: "var(--fs-xs)",
              fontWeight: 700,
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.07em",
            }}
          >
            Normal
          </span>
          <span
            style={{
              fontSize: "var(--fs-lg)",
              fontWeight: 600,
              color: "var(--text-muted)",
              transition: "all var(--t-fast) var(--ease)",
            }}
          >
            Rp{fmt(normalFinal)}
          </span>
        </div>

        {/* Addon note */}
        {longSleeve && (
          <div
            style={{
              marginTop: "0.625rem",
              paddingTop: "0.625rem",
              borderTop: `1px dashed ${pkg.color}30`,
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              fontSize: "var(--fs-xs)",
              color: pkg.color,
              fontWeight: 600,
            }}
          >
            <i className="uil uil-check-circle"></i>
            Termasuk jersey tangan panjang (+Rp10.000)
          </div>
        )}
      </div>

      {/* CTA Button */}
      {isRegistrationClosed ? (
        <button
          disabled
          style={{
            width: "100%",
            padding: "0.875rem",
            borderRadius: "var(--r-md)",
            background: "var(--surface-2)",
            color: "var(--text-muted)",
            fontSize: "var(--fs-sm)",
            fontWeight: 600,
            cursor: "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <i className="uil uil-lock"></i> Pendaftaran Ditutup
        </button>
      ) : (
        <Link
          to={`/payment?kategori=${pkg.category}&lengan=${longSleeve ? "panjang" : "pendek"}`}
          style={{ display: "block" }}
        >
          <button
            style={{
              width: "100%",
              padding: "0.875rem",
              borderRadius: "var(--r-md)",
              background: pkg.color,
              color: "#fff",
              fontSize: "var(--fs-sm)",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              transition: "opacity var(--t-fast) var(--ease)",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <i className="uil uil-arrow-right"></i>
            Daftar Sekarang — {pkg.category}
            {longSleeve && " + Tangan Panjang"}
          </button>
        </Link>
      )}

      {/* Includes list */}
      <div>
        <p
          style={{
            fontSize: "var(--fs-xs)",
            fontWeight: 700,
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "0.625rem",
          }}
        >
          Sudah Termasuk
        </p>
        <ul
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            rowGap: "0.35rem",
            columnGap: "0.5rem",
          }}
        >
          {INCLUDES.map((item) => (
            <li
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "var(--fs-xs)",
                color: "var(--text-muted)",
              }}
            >
              <i
                className="uil uil-check"
                style={{
                  color: pkg.color,
                  flexShrink: 0,
                  fontSize: "0.875rem",
                }}
              ></i>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

/* ── Main Section ── */
const Payments = () => (
  <section className="section" id="payment" style={{ background: "var(--bg)" }}>
    <div className="container">
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <span className="section__tag">
          <i className="uil uil-ticket"></i>
          Tiket
        </span>
        <h2 className="section__title">Paket Pendaftaran</h2>
        <p className="section__subtitle" style={{ marginBottom: 0 }}>
          Pilih kategori &amp; tambahkan opsi jersey sesuai kebutuhan Anda.
        </p>
      </div>

      {/* Category info banner */}
      <div
        data-aos="fade-up"
        data-aos-duration="600"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        {/* Fun Run 5K */}
        <div
          style={{
            background: "rgba(27,60,192,0.06)",
            border: "1.5px solid rgba(27,60,192,0.2)",
            borderRadius: "var(--r-lg)",
            padding: "1.125rem 1.25rem",
            display: "flex",
            gap: "0.875rem",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              width: "2.5rem",
              height: "2.5rem",
              flexShrink: 0,
              borderRadius: "var(--r-md)",
              background: "rgba(27,60,192,0.1)",
              color: "#1B3CC0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.125rem",
            }}
          >
            <i className="uil uil-smile-beam"></i>
          </div>
          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: "var(--fs-sm)",
                color: "#1B3CC0",
                marginBottom: "0.25rem",
              }}
            >
              Fun Run — 5K
            </div>
            <div
              style={{
                fontSize: "var(--fs-xs)",
                color: "var(--text-muted)",
                lineHeight: 1.65,
              }}
            >
              Kategori <strong>santai &amp; rekreasi</strong>. Terbuka untuk
              semua kalangan — pemula, komunitas, pasangan, dan keluarga. Fokus
              pada kesenangan &amp; kebersamaan.
            </div>
          </div>
        </div>

        {/* Fun Race 10K */}
        <div
          style={{
            background: "rgba(212,32,32,0.05)",
            border: "1.5px solid rgba(212,32,32,0.2)",
            borderRadius: "var(--r-lg)",
            padding: "1.125rem 1.25rem",
            display: "flex",
            gap: "0.875rem",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              width: "2.5rem",
              height: "2.5rem",
              flexShrink: 0,
              borderRadius: "var(--r-md)",
              background: "rgba(212,32,32,0.1)",
              color: "#D42020",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.125rem",
            }}
          >
            <i className="uil uil-bolt"></i>
          </div>
          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: "var(--fs-sm)",
                color: "#D42020",
                marginBottom: "0.25rem",
              }}
            >
              Fun Race — 10K
            </div>
            <div
              style={{
                fontSize: "var(--fs-xs)",
                color: "var(--text-muted)",
                lineHeight: 1.65,
              }}
            >
              Kategori{" "}
              <strong> santai &amp; kompetitif &amp; profesional</strong>. Untuk
              pelari berpengalaman yang ingin menguji batas kemampuan. Rute
              penuh tantangan dengan target waktu.
            </div>
          </div>
        </div>
      </div>

      {/* Open banner */}
      {!isRegistrationClosed && (
        <div
          data-aos="fade-up"
          data-aos-duration="600"
          style={{
            background: "linear-gradient(135deg, #0F2280, #1B3CC0)",
            color: "#fff",
            padding: "1.125rem 1.5rem",
            borderRadius: "var(--r-lg)",
            marginBottom: "2.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.625rem",
            flexWrap: "wrap",
            fontSize: "var(--fs-sm)",
            fontWeight: 600,
          }}
        >
          <span style={{ fontSize: "1.125rem" }}>🎉</span>
          Pendaftaran Resmi Dibuka! — Early Bird terbatas, segera amankan slot
          Anda.
          <span
            style={{
              background: "var(--gold)",
              color: "var(--blue-900)",
              fontSize: "var(--fs-xs)",
              fontWeight: 800,
              padding: "0.2rem 0.75rem",
              borderRadius: "var(--r-full)",
            }}
          >
            OPEN NOW
          </span>
        </div>
      )}

      {/* Package cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {PACKAGES.map((pkg, i) => (
          <PackageCard key={pkg.category} pkg={pkg} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Payments;
