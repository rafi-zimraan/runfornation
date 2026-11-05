import React, { useEffect, useState } from "react";
import {
  IS_REGISTRATION_CLOSED,
  REGISTRATION_CLOSED_TITLE,
  REGISTRATION_THANKS,
  REGISTRATION_CLOSED_NOTE,
  REGISTRATION_WA,
  REGISTRATION_WA_URL,
} from "../../config/registration";

const DISMISS_KEY = "rfn_closed_notice_dismissed";

const readDismissed = () => {
  try {
    return localStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
};

/**
 * Layer (overlay) sitewide yang memberitahu pendaftaran sudah ditutup
 * sekaligus mengucapkan terima kasih ke semua yang sudah mendaftar.
 * Tampil sekali per browser — setelah ditutup, disimpan di localStorage.
 */
const RegistrationClosedLayer = () => {
  const [open, setOpen] = useState(
    () => IS_REGISTRATION_CLOSED && !readDismissed()
  );

  useEffect(() => {
    if (!open) return;

    const close = () => {
      setOpen(false);
      try {
        localStorage.setItem(DISMISS_KEY, "1");
      } catch {
        /* localStorage diblokir (private mode) — abaikan */
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!IS_REGISTRATION_CLOSED || !open) return null;

  const dismiss = () => {
    setOpen(false);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* abaikan */
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="rfn-closed-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000, // = var(--z-modal), di atas header (--z-fixed: 100)
        background: "rgba(2,8,23,0.78)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.25rem",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "520px",
          background:
            "linear-gradient(135deg, var(--blue-950) 0%, var(--blue-900) 65%, var(--blue-800) 100%)",
          border: "1px solid rgba(245,204,0,0.22)",
          borderRadius: "var(--r-xl)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.55)",
          padding: "2.25rem 1.75rem 1.75rem",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* aksen atas */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background:
              "linear-gradient(90deg, var(--gold), #D42020 55%, #1B3CC0)",
          }}
        />

        {/* tombol tutup */}
        <button
          type="button"
          onClick={dismiss}
          aria-label="Tutup pemberitahuan"
          style={{
            position: "absolute",
            top: "0.875rem",
            right: "0.875rem",
            width: "2rem",
            height: "2rem",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.7)",
            fontSize: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1,
          }}
        >
          <i className="uil uil-times"></i>
        </button>

        {/* ikon kunci */}
        <div
          style={{
            width: "4rem",
            height: "4rem",
            margin: "0 auto 1.125rem",
            borderRadius: "var(--r-lg)",
            background: "rgba(245,204,0,0.12)",
            border: "1px solid rgba(245,204,0,0.28)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--gold)",
            fontSize: "1.75rem",
          }}
        >
          <i className="uil uil-lock-alt"></i>
        </div>

        <span
          style={{
            display: "inline-block",
            fontSize: "var(--fs-xs)",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)",
            marginBottom: "0.5rem",
          }}
        >
          Run For Nation 2026 · Spirit of Culture
        </span>

        <h2
          id="rfn-closed-title"
          style={{
            fontSize: "var(--fs-2xl)",
            fontWeight: 800,
            color: "#fff",
            margin: "0 0 0.875rem",
          }}
        >
          {REGISTRATION_CLOSED_TITLE}
        </h2>

        {/* ucapan terima kasih */}
        <p
          style={{
            fontSize: "var(--fs-sm)",
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.75,
            margin: "0 auto 1.25rem",
            maxWidth: "420px",
          }}
        >
          🙏 {REGISTRATION_THANKS}
        </p>

        {/* catatan untuk yang sudah transfer */}
        <div
          style={{
            background: "rgba(245,204,0,0.08)",
            border: "1px solid rgba(245,204,0,0.2)",
            borderRadius: "var(--r-md)",
            padding: "0.8rem 1rem",
            marginBottom: "1.5rem",
            display: "flex",
            gap: "0.5rem",
            alignItems: "flex-start",
            textAlign: "left",
          }}
        >
          <i
            className="uil uil-info-circle"
            style={{
              color: "var(--gold)",
              fontSize: "1rem",
              flexShrink: 0,
              marginTop: "0.1rem",
            }}
          ></i>
          <p
            style={{
              fontSize: "var(--fs-xs)",
              color: "rgba(255,255,255,0.78)",
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            {REGISTRATION_CLOSED_NOTE}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.625rem",
          }}
        >
          <button
            type="button"
            onClick={dismiss}
            style={{
              flex: "1 1 160px",
              padding: "0.8rem 1rem",
              borderRadius: "var(--r-md)",
              background: "var(--gold)",
              color: "var(--blue-900)",
              fontSize: "var(--fs-sm)",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.4rem",
            }}
          >
            <i className="uil uil-check"></i>
            Mengerti
          </button>

          <a
            href={REGISTRATION_WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: "1 1 160px",
              padding: "0.8rem 1rem",
              borderRadius: "var(--r-md)",
              background: "rgba(37,211,102,0.14)",
              border: "1px solid rgba(37,211,102,0.4)",
              color: "#4ade80",
              fontSize: "var(--fs-sm)",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.4rem",
            }}
          >
            <i className="uil uil-whatsapp"></i>
            Tanya Panitia ({REGISTRATION_WA.name})
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegistrationClosedLayer;
