# CLAUDE.md — Run For Nation Website

Panduan ini membantu AI agent memahami struktur, konvensi, dan konteks project ini.

---

## Ringkasan Project

**Run For Nation: Spirit of Culture 2025** adalah website event Fun Run 6,2K yang diselenggarakan di Pontianak & Kubu Raya, Kalimantan Barat. Website ini berfungsi sebagai landing page event: menampilkan informasi event, tabel ukuran jersey, form pendaftaran, dan detail pembayaran.

---

## Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | React 18 + Vite 4 |
| Routing | React Router DOM v6 |
| Animasi scroll | AOS (Animate On Scroll) |
| Typing animation | react-typed |
| Email | @emailjs/browser |
| CSV parsing | PapaParse (dari Google Sheets) |
| Ikon | Boxicons 2.1.4 + Unicons 4.0.8 |
| Tracking iklan | Facebook Pixel (ID: `1593896754910524`) |
| Deploy | GitHub Actions → GitHub Pages |

---

## Struktur Folder

```
runfornation/
├── src/
│   ├── App.jsx                     # Root component, routing, Facebook Pixel init
│   ├── App.css                     # Global styles + CSS variables (dark/light mode)
│   ├── main.jsx                    # React entry point
│   ├── assets/
│   │   ├── Runners/                # Gambar aset (logo, background, size chart)
│   │   ├── Sun.jsx / Moon.jsx      # SVG icon komponen dark/light toggle
│   │   └── Sun.svg / Moon.svg
│   └── components/
│       ├── header/Header.jsx       # Navbar + dark/light mode toggle + mobile menu
│       ├── home/
│       │   ├── Home.jsx            # Section hero utama
│       │   ├── Data.jsx            # Teks deskripsi event + animasi react-typed
│       │   ├── Social.jsx          # Icon Instagram link
│       │   └── ScrollDown.jsx      # Animasi scroll down indicator
│       ├── about/
│       │   ├── About.jsx           # Section ketentuan pendaftaran (dengan modal)
│       │   └── Info.jsx            # Info singkat event (cards)
│       ├── size/Size.jsx           # Tabel ukuran jersey Dewasa & Kids
│       ├── contact/Contact.jsx     # Section pendaftaran (Google Form — sekarang ditutup)
│       ├── payment/
│       │   ├── Payments.jsx        # Section paket harga (Umum & Early Bird)
│       │   └── PaymentDetail.jsx   # Halaman detail transfer bank + konfirmasi WA
│       ├── footer/Footer.jsx       # Footer dengan nav links
│       ├── scrollUp/ScrollUp.jsx   # Tombol scroll ke atas
│       ├── scrollToHash/ScrollToHash.jsx # Smooth scroll ke section via hash URL
│       └── Toogle.jsx              # Dark/light mode toggle komponen
│           Toogle.css
├── index.html                      # HTML template (Boxicons + Unicons CDN)
├── vite.config.js                  # Vite config (plugin react)
├── package.json
├── dist/                           # Production build (auto-generated, jangan edit manual)
├── dist.zip                        # Compressed dist/ untuk upload manual ke hosting
└── .github/workflows/deploy.yml    # CI/CD: build → GitHub Pages
```

---

## Routing

Didefinisikan di `src/App.jsx` menggunakan `createBrowserRouter`:

| Path | Komponen | Keterangan |
|---|---|---|
| `/` | `Home + About + Size + Contact + Payments` | Halaman utama (one-page) |
| `/payment` | `PaymentDetail` | Halaman detail pembayaran & konfirmasi WA |

---

## Fitur Penting & State Kritis

### Toggle Buka/Tutup Pendaftaran
Di `src/components/payment/Payments.jsx` baris 185:
```js
const isRegistrationClosed = true; // ubah ke false untuk membuka kembali
```
Ubah nilai ini untuk mengaktifkan/menonaktifkan tombol pendaftaran dan banner "Pendaftaran Ditutup".

### Kuota Peserta (Google Sheets)
`Contact.jsx` dan `PaymentDetail.jsx` sama-sama fetch CSV dari Google Sheets untuk mengecek jumlah peserta:
```
MAX_PESERTA = 1500
```
Jika jumlah baris di spreadsheet mencapai 1500, form otomatis ditutup. URL CSV ada di kedua file tersebut.

### Facebook Pixel
Diinisialisasi di `src/App.jsx` dalam `useEffect`. Pixel ID: `1593896754910524`. Melacak `PageView` setiap kali website dibuka. Ini digunakan untuk tracking performa iklan Meta/Facebook Ads.

### Dark/Light Mode
Dikendalikan oleh `Toogle.jsx` dengan `data-theme` attribute pada `<body>`. CSS variable didefinisikan di `App.css`.

---

## Perintah Dev

```bash
npm run dev       # Jalankan dev server (localhost:5173)
npm run build     # Build production ke folder dist/
npm run preview   # Preview production build secara lokal
```

---

## Deploy

**Otomatis:** Setiap push ke branch `main` akan trigger GitHub Actions (`.github/workflows/deploy.yml`) yang build lalu deploy ke GitHub Pages.

**Manual (untuk hosting lain):**
1. Jalankan `npm run build`
2. Zip folder `dist/` → jadikan `dist.zip`
3. Upload `dist.zip` ke shared hosting / cPanel / VPS

---

## dist.zip — Untuk Apa?

`dist.zip` adalah hasil kompres dari folder `dist/` (production build). Digunakan untuk:
- **Upload manual ke hosting** (cPanel, Niagahoster, Hostinger, dsb.) — extract lalu taruh di `public_html/`
- **Backup build** sebelum deploy
- **Bukan** file khusus untuk iklan — untuk iklan, yang dibutuhkan adalah URL website yang sudah live

Cara generate ulang:
```bash
npm run build
# lalu zip folder dist/ secara manual atau via:
cd /path/ke/project && zip -r dist.zip dist/
```

---

## Facebook / Meta Ads — Cara Kerja Tracking

Pixel sudah terpasang di `App.jsx`. Alur iklan:
1. Buat iklan di Meta Ads Manager → masukkan URL website yang sudah live
2. Pixel otomatis mencatat setiap pengunjung yang datang dari iklan (`PageView`)
3. Data kembali ke Meta Ads untuk optimasi penayangan iklan

Pixel ID saat ini: `1593896754910524` (bisa dicek/ubah di `App.jsx` baris 48–49).

---

## Konvensi Kode

- Semua komponen menggunakan **functional component + React hooks**
- Styling menggunakan **CSS class** dari `App.css` (BEM-like: `section__title`, `nav__link`)
- Beberapa komponen baru menggunakan **Tailwind utility class** (Size.jsx)
- Animasi scroll menggunakan atribut `data-aos` (AOS library)
- **Tidak ada** global state manager (Redux, Zustand) — state lokal dengan `useState`

---

## Kontak & Info Event

- Instagram: [@runfornation.id](https://www.instagram.com/runfornation.id)
- WhatsApp Meli (konfirmasi pembayaran): +62 853-9366-9366
- WhatsApp Wildan (konfirmasi pembayaran): +62 812-5072-1792
- Bank transfer: BSI — No. Rek. 2024232215 a.n. Yahya Organizer
- Copyright: Crypticalcoder
