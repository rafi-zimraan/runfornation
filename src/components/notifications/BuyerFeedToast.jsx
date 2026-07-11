import React, { useEffect, useMemo, useState } from "react";
import Papa from "papaparse";
import "../../App.css";

// Link CSV hasil "Publish to web" dari sheet `Public Feed` (HANYA kolom
// Nama + Kategori — sudah diverifikasi 2026-07-11, tidak ada NIK/alamat/
// no. HP). Jangan pernah ganti ke link sheet respons mentah.
const BUYER_FEED_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSg5Jq5fNaqyOYnA3yVEU274QLt-b6HqNU92HfPMS72mFvocB_fyVCeEcxlUZrYMUdKCHl1EpxoChpM/pub?gid=1413171820&single=true&output=csv";

const DISMISS_KEY = "rfn_buyer_feed_dismissed";
const ROTATE_MS = 5000;
const REFRESH_MS = 2 * 60 * 1000;
const RECENT_POOL_SIZE = 30;

const CATEGORY_COLOR = {
  "5K": "#1B3CC0",
  "10K": "#D42020",
};

const findKey = (row, includes) =>
  Object.keys(row).find((k) => k.toLowerCase().includes(includes));

// Format Google Form: "DD/MM/YYYY H:mm:ss" (jam boleh 1 atau 2 digit).
// new Date(string) tidak dipakai karena itu mengasumsikan format US MM/DD/YYYY.
const parseIndoTimestamp = (str) => {
  const m = (str || "")
    .trim()
    .match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2}):(\d{2})$/);
  if (!m) return null;
  const [, dd, mm, yyyy, hh, min, ss] = m.map(Number);
  const date = new Date(yyyy, mm - 1, dd, hh, min, ss);
  return Number.isNaN(date.getTime()) ? null : date;
};

const relativeTimeLabel = (date) => {
  if (!date) return null;
  const diffMin = Math.floor((Date.now() - date.getTime()) / 60000);
  if (diffMin < 1) return "Baru saja";
  if (diffMin < 60) return `${diffMin} menit lalu`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour} jam lalu`;
  const diffDay = Math.floor(diffHour / 24);
  return `${diffDay} hari lalu`;
};

const parseBuyers = (csvText) => {
  const { data } = Papa.parse(csvText, { header: true, skipEmptyLines: true });
  if (!data.length) return [];

  const nameKey = findKey(data[0], "nama");
  const categoryKey = findKey(data[0], "kategori");
  const timestampKey = findKey(data[0], "timestamp");
  if (!nameKey || !categoryKey) return [];

  return data
    .map((row) => ({
      nama: (row[nameKey] || "").trim(),
      kategori: (row[categoryKey] || "").trim().toUpperCase(),
      timestamp: timestampKey ? (row[timestampKey] || "").trim() : "",
    }))
    .filter((b) => b.nama && (b.kategori === "5K" || b.kategori === "10K"));
};

const BuyerFeedToast = ({ csvUrl = BUYER_FEED_CSV_URL }) => {
  const [buyers, setBuyers] = useState([]);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(
    () => sessionStorage.getItem(DISMISS_KEY) === "1"
  );

  useEffect(() => {
    if (!csvUrl || dismissed) return;

    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch(csvUrl, { cache: "no-store" });
        const text = await res.text();
        const parsed = parseBuyers(text);
        // Tampilkan pendaftar TERBARU dulu (baris CSV paling akhir = submit
        // paling baru), dan hanya putar di antara yang terbaru — supaya
        // pendaftar baru langsung kelihatan, bukan menunggu giliran di
        // belakang ratusan entri lama.
        const recent = parsed.slice(-RECENT_POOL_SIZE).reverse();
        if (!cancelled && recent.length) setBuyers(recent);
      } catch {
        // Gagal fetch (offline / link belum diisi) — widget cukup tidak tampil.
      }
    };

    load();
    const refreshTimer = setInterval(load, REFRESH_MS);
    return () => {
      cancelled = true;
      clearInterval(refreshTimer);
    };
  }, [csvUrl, dismissed]);

  useEffect(() => {
    if (!buyers.length || dismissed) return;

    setVisible(true);
    const hideTimer = setTimeout(() => setVisible(false), ROTATE_MS - 600);
    const nextTimer = setTimeout(() => {
      setIndex((i) => (i + 1) % buyers.length);
    }, ROTATE_MS);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [buyers, index, dismissed]);

  const current = useMemo(() => buyers[index], [buyers, index]);

  const handleDismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setDismissed(true);
    setVisible(false);
  };

  if (dismissed || !current) return null;

  const color = CATEGORY_COLOR[current.kategori] || "var(--blue-600)";
  const subLabel =
    relativeTimeLabel(parseIndoTimestamp(current.timestamp)) ||
    "Run For Nation 2026";

  return (
    <div
      className={`buyer-toast${visible ? " buyer-toast--visible" : ""}`}
      role="status"
      aria-live="polite"
    >
      <div className="buyer-toast__icon" style={{ background: color }}>
        <i className="uil uil-check-circle"></i>
      </div>
      <div className="buyer-toast__body">
        <p className="buyer-toast__text">
          <strong>{current.nama}</strong> telah membeli tiket{" "}
          <strong style={{ color }}>{current.kategori}</strong>
        </p>
        <span className="buyer-toast__sub">{subLabel}</span>
      </div>
      <button
        type="button"
        className="buyer-toast__close"
        aria-label="Tutup notifikasi"
        onClick={handleDismiss}
      >
        <i className="uil uil-times"></i>
      </button>
    </div>
  );
};

export default BuyerFeedToast;
export { parseBuyers, parseIndoTimestamp, relativeTimeLabel };
