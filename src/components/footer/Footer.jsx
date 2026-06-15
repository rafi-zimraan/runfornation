import React from "react";
import "../../App.css";
import GriyaLogo from "../../assets/Runners/LOGOGRIYAITNUSANTARANEW.png";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__container">
          <div className="footer__title">RUN FOR NATION</div>

          <p
            style={{
              fontSize: "var(--fs-xs)",
              color: "rgba(255,255,255,0.4)",
              textAlign: "center",
            }}
          >
            Spirit Of Culture 2026 &mdash; Fun Run 5K &amp; 10K, Pontianak
          </p>

          <nav>
            <ul className="footer__list">
              {[
                { href: "#home", label: "Home" },
                { href: "#about", label: "Ketentuan" },
                { href: "#size", label: "Size Chart" },
                { href: "#contact", label: "Pendaftaran" },
                { href: "#payment", label: "Pembayaran" },
              ].map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="footer__link">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href="https://www.instagram.com/runfornation.id"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "var(--fs-sm)",
              color: "rgba(255,255,255,0.5)",
              transition: "color var(--t-fast) var(--ease)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
            }
          >
            <i
              className="uil uil-instagram"
              style={{ fontSize: "1.125rem" }}
            ></i>
            @runfornation.id
          </a>

          <div className="footer__divider" />

          {/* Made by Griya IT Nusantara */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.625rem",
            }}
          >
            <span
              style={{
                fontSize: "var(--fs-xs)",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              Website dibuat oleh
            </span>
            <a
              href="https://griyaitnusantara.my.id/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
                padding: "0.5rem 1rem",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "var(--r-lg)",
                transition: "all var(--t-fast) var(--ease)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.borderColor = "rgba(245,204,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              }}
            >
              <img
                src={GriyaLogo}
                alt="Griya IT Nusantara"
                style={{
                  height: "2rem",
                  width: "auto",
                  borderRadius: "6px",
                  background: "#fff",
                  padding: "2px 4px",
                  objectFit: "contain",
                }}
              />
              <div style={{ textAlign: "left" }}>
                <div
                  style={{
                    fontSize: "var(--fs-sm)",
                    fontWeight: 700,
                    color: "#fff",
                    lineHeight: 1.2,
                  }}
                >
                  Griya IT Nusantara
                </div>
                <div
                  style={{
                    fontSize: "var(--fs-xs)",
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.2,
                  }}
                >
                  Solusi Digital, Nilai Berkah
                </div>
              </div>
            </a>
            <span className="footer__copy">
              &copy; {year} Griya IT Nusantara. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
