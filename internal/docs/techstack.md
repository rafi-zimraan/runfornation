# Tech Stack — Run For Nation

Terakhir diperbarui: 2026-07-11.

---

## 1. Frontend

| Layer | Teknologi | Versi | Catatan |
|---|---|---|---|
| Framework | React | 18.2.0 | Functional component + hooks, tanpa state manager global |
| Build tool | Vite | 4.4.9 | Dipin ke major 4 — jangan upgrade ke Vite 5/6/7 tanpa migrasi terpisah (lihat § 4) |
| Plugin React | @vitejs/plugin-react | 4.7.0 | Perlu v4.x agar kompatibel dengan Vitest (v3.x lama gagal fast-refresh preamble saat testing) |
| Routing | react-router-dom | 6.30.4 | Sudah di-patch dari kerentanan XSS open-redirect (GHSA-2w69-qvjg-hvjx) — jangan turunkan versi |
| Animasi scroll | AOS | 2.3.4 | `data-aos` attribute, di-init sekali di `App.jsx` |
| Typing animation | react-typed | 2.0.12 | Dipakai di hero text |
| CSV parsing | PapaParse | 5.5.3 | Dipakai untuk fetch & parse Google Sheet CSV (widget notifikasi pembeli) |
| Ikon | Boxicons 2.1.4, Unicons 4.0.8 | — | Dimuat via CDN `<link>` di `index.html`, bukan npm package |
| Styling | CSS murni (BEM-like) + inline style | — | `App.css` untuk class/variable global; beberapa komponen baru (Payments, PaymentDetail, Size) pakai inline style/Tailwind utility |

## 2. Testing

| Tool | Versi | Catatan |
|---|---|---|
| Vitest | 1.6.1 | **Jangan** upgrade ke Vitest 4.x tanpa juga migrasi Vite ke major yang sesuai — pernah dicoba dan menghasilkan nested Vite 8 yang bentrok dengan toolchain Vite 4 project ini |
| @testing-library/react | 16.3.2 | |
| @testing-library/jest-dom | 6.9.1 | Matcher tambahan (`toBeInTheDocument`, dll), di-load via `src/setupTests.js` |
| @testing-library/user-event | 14.6.1 | Simulasi interaksi user (klik, toggle) |
| jsdom | 29.1.1 | Environment DOM untuk test |

Jalankan test: `npm test` (sekali jalan) atau `npm run test:watch` (mode watch). Konfigurasi ada di `vite.config.js` blok `test: {...}`.

## 3. Integrasi Eksternal

| Layanan | Fungsi | Lokasi kode |
|---|---|---|
| Google Form (embed iframe) | Form pendataan diri peserta | `src/components/contact/Contact.jsx` |
| Google Sheet (published CSV) | Sumber data widget notifikasi "baru saja daftar" | `src/components/notifications/BuyerFeedToast.jsx` — **hanya boleh pakai link sheet minimal (Nama+Kategori), lihat `security.md`** |
| Facebook Pixel | Tracking iklan Meta Ads | `src/App.jsx` (`fbq init/track PageView`) |
| WhatsApp (wa.me link) | Konfirmasi pembayaran manual | `src/components/contact/Contact.jsx`, `src/components/payment/Payments.jsx` |
| GitHub Pages | Hosting production | `.github/workflows/deploy.yml` |

## 4. Batasan Versi & Alasannya

- **Vite tetap di major 4** — project ini pakai konfigurasi & plugin yang sudah teruji di Vite 4. Upgrade ke Vite 5/6/7 kemungkinan butuh penyesuaian `vite.config.js`, plugin React, dan revalidasi seluruh build — jangan dilakukan sambil lalu.
- **react-router-dom dikunci ke `6.30.4` minimum** — versi di bawah itu (≤6.30.3) rentan CVE XSS open-redirect. Tetap di major 6 (bukan 7) karena `App.jsx` masih pakai API `createBrowserRouter` gaya v6; migrasi ke v7 adalah pekerjaan terpisah.
- **Dependency yang sengaja tidak dipakai:** `@emailjs/browser` dan `emailjs-com` sudah dihapus dari `package.json` (sesi 2026-07-11) karena dead dependency — tidak ada import-nya di `src/` manapun.

## 5. Perintah Penting

```bash
npm run dev        # Dev server, localhost:5173
npm run build      # Build production ke dist/
npm run preview    # Preview hasil build production
npm test           # Jalankan semua unit test sekali
npm run test:watch # Unit test mode watch
```
