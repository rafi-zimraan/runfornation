# Run For Nation — Spirit of Culture 2025

> Fun Run 6,2K | Pontianak & Kubu Raya, Kalimantan Barat

![Banner](./src/assets/Runners/BGRUNFORNATION.jpg)

Website resmi event **Run For Nation: Spirit of Culture 2025** — ajang lari yang memadukan olahraga, budaya, dan kebersamaan dengan semangat *Persatuan dan Kebudayaan*. Terbuka untuk semua kalangan, dari pemula hingga atlet profesional.

---

## Tentang Event

| Detail | Info |
|---|---|
| Kategori | Fun Run 6,2K |
| Lokasi | Pontianak & Kubu Raya, Kalimantan Barat |
| Tema | Persatuan dan Kebudayaan |
| Peserta | Semua kalangan (min. 10 tahun) |

**Fasilitas peserta:**
- Race Jersey eksklusif
- BIB Number
- Medali Finisher
- Totebag
- Refreshment
- Support Medis
- Dokumen Race
- Undian Doorprize

---

## Tech Stack

- **Framework:** React 18 + Vite 4
- **Routing:** React Router DOM v6
- **Animasi:** AOS (Animate On Scroll) + react-typed
- **Email:** EmailJS
- **Data peserta:** PapaParse — CSV dari Google Sheets
- **Ikon:** Boxicons + Unicons
- **Tracking:** Facebook Pixel
- **Deploy:** GitHub Actions → GitHub Pages

---

## Fitur Website

- Hero section dengan animasi typing
- Ketentuan pendaftaran dengan modal pop-up
- Size chart jersey (Dewasa & Kids)
- Form pendaftaran online (Google Form)
- Paket harga (Umum & Early Bird) dengan sistem buka/tutup
- Detail pembayaran & konfirmasi via WhatsApp
- Dark / Light mode
- Smooth scroll + scroll-to-top
- Responsive mobile-first

---

## Memulai Development

```bash
# Clone repository
git clone https://github.com/rafi-zimraan/portofolio.git run-for-nation
cd run-for-nation

# Install dependencies
npm install

# Jalankan dev server
npm run dev
# → http://localhost:5173
```

### Script tersedia

```bash
npm run dev       # Dev server dengan hot reload
npm run build     # Build production ke folder dist/
npm run preview   # Preview build production secara lokal
```

---

## Deploy

**Otomatis via GitHub Actions:**
Setiap push ke branch `main` akan otomatis build dan deploy ke GitHub Pages.

**Manual ke hosting (cPanel / Niagahoster / VPS):**
```bash
npm run build
# Lalu zip folder dist/ dan upload ke public_html/ hosting Anda
```

---

## Konfigurasi Penting

### Buka / Tutup Pendaftaran

Edit `src/components/payment/Payments.jsx`:
```js
const isRegistrationClosed = true;  // true = ditutup, false = dibuka
```

### Kuota Peserta

`Contact.jsx` dan `PaymentDetail.jsx` otomatis menutup form ketika jumlah peserta di Google Sheets mencapai batas:
```js
const MAX_PESERTA = 1500;
```

### Facebook Pixel

Pixel ID dikonfigurasi di `src/App.jsx` untuk tracking performa iklan Meta/Facebook Ads.

---

## Struktur Folder

```
src/
├── App.jsx                  # Root + routing + Facebook Pixel
├── components/
│   ├── header/              # Navbar + dark mode toggle
│   ├── home/                # Hero section
│   ├── about/               # Ketentuan pendaftaran
│   ├── size/                # Size chart jersey
│   ├── contact/             # Form pendaftaran
│   ├── payment/             # Paket harga & detail pembayaran
│   ├── footer/              # Footer
│   ├── scrollUp/            # Tombol scroll ke atas
│   └── scrollToHash/        # Smooth scroll ke hash anchor
└── assets/Runners/          # Gambar & logo event
```

---

## Kontak Panitia

| Nama | WhatsApp |
|---|---|
| Meli | +62 853-9366-9366 |
| Wildan | +62 812-5072-1792 |

**Rekening pembayaran:** BSI — 2024232215 a.n. Yahya Organizer

**Instagram:** [@runfornation.id](https://www.instagram.com/runfornation.id)

---

&copy; Crypticalcoder. All rights reserved.
