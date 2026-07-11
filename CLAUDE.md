# CLAUDE.md — Run For Nation Website

Panduan ini membantu AI agent memahami struktur, konvensi, dan konteks project ini.

> Dokumentasi lengkap ada di `internal/docs/`:
> [`PLAN.md`](internal/docs/PLAN.md) (status & fitur) ·
> [`blueprint.md`](internal/docs/blueprint.md) (arsitektur) ·
> [`prd.md`](internal/docs/prd.md) / [`brd.md`](internal/docs/brd.md) / [`frd.md`](internal/docs/frd.md) (requirements) ·
> [`security.md`](internal/docs/security.md) (**wajib baca — ada insiden keamanan data aktif**) ·
> [`design.md`](internal/docs/design.md) · [`wireframe.md`](internal/docs/wireframe.md) · [`techstack.md`](internal/docs/techstack.md) · [`roadmap.md`](internal/docs/roadmap.md) ·
> [`TESTING_CHECKLIST.md`](internal/docs/TESTING_CHECKLIST.md) (checklist test)

---

## Ringkasan Project

**Run For Nation: Spirit of Culture 2026** adalah website event Fun Run 5K & 10K yang diselenggarakan di Pontianak & Kubu Raya, Kalimantan Barat. Website ini berfungsi sebagai landing page event: menampilkan informasi event, tabel ukuran jersey, paket harga, form pendaftaran, dan detail pembayaran.

---

## Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | React 18 + Vite 4 |
| Routing | React Router DOM v6 |
| Animasi scroll | AOS (Animate On Scroll) |
| Typing animation | react-typed |
| Ikon | Boxicons 2.1.4 + Unicons 4.0.8 |
| Tracking iklan | Facebook Pixel (ID: `1593896754910524`) |
| Testing | Vitest + @testing-library/react |
| Deploy | GitHub Actions → GitHub Pages |

---

## Struktur Folder

```
runfornation/
├── internal/
│   └── docs/
│       ├── PLAN.md                 # Plan & daftar fitur lengkap (sumber kebenaran)
│       └── TESTING_CHECKLIST.md    # Checklist unit test & manual QA
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
│       │   ├── Data.jsx            # Teks deskripsi event + animasi react-typed + kartu promo (banner)
│       │   ├── Social.jsx          # Icon Instagram link
│       │   └── ScrollDown.jsx      # Animasi scroll down indicator
│       ├── about/
│       │   ├── About.jsx           # Section ketentuan pendaftaran (dengan modal)
│       │   └── Info.jsx            # Info singkat event (cards)
│       ├── size/Size.jsx           # Tabel ukuran jersey Dewasa & Kids
│       ├── contact/Contact.jsx     # Form pendataan diri (Google Form iframe) — gated, lihat bagian "Gate Form"
│       ├── payment/
│       │   ├── Payments.jsx        # Section paket harga (5K/10K, Early Bird habis → harga Normal jadi utama)
│       │   └── PaymentDetail.jsx   # Halaman /payment — detail transfer bank + total harga Normal
│       ├── footer/Footer.jsx       # Footer dengan nav links + credit Griya IT Nusantara
│       ├── scrollUp/ScrollUp.jsx   # Tombol scroll ke atas
│       ├── scrollToHash/ScrollToHash.jsx # Smooth scroll ke section via hash URL
│       └── Toogle.jsx              # Dark/light mode toggle komponen
│           Toogle.css
├── index.html                      # HTML template (Boxicons + Unicons CDN)
├── vite.config.js                  # Vite config (plugin react + vitest config)
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
| `/` | `Home + About + Size + Payments + Contact` (dibungkus `Header` + `Footer`) | Halaman utama (one-page) |
| `/payment` | `PaymentDetail` | Halaman detail pembayaran & konfirmasi WA |

---

## Fitur Penting & State Kritis

### Toggle Buka/Tutup Pendaftaran
Di `src/components/payment/Payments.jsx` baris 5:
```js
const isRegistrationClosed = false; // ubah ke true untuk menutup pendaftaran
```
Ubah nilai ini untuk mengaktifkan/menonaktifkan tombol pendaftaran dan banner "Pendaftaran Ditutup".

### Harga Paket & Status Early Bird
Harga didefinisikan **terpisah di dua file** (tidak ada shared source) — **selalu ubah keduanya bersamaan**:
- `src/components/payment/Payments.jsx` → `const PACKAGES = [...]` (field `earlyBird` & `normal` per kategori)
- `src/components/payment/PaymentDetail.jsx` → `const PRICES = {...}`

Status saat ini: **Early Bird sudah habis**. Di `Payments.jsx`, harga Early Bird ditampilkan dicoret dengan badge "Habis"; harga **Normal** yang ditonjolkan (font lebih besar). Di `PaymentDetail.jsx`, total yang harus ditransfer dihitung dari `pkg.normal + addon` (bukan `earlyBird` lagi) — ini krusial karena itu adalah nominal yang dilihat & ditransfer user.

Jika Early Bird dibuka lagi di masa depan, kembalikan logic di `PaymentDetail.jsx` untuk menghitung dari `earlyBird` dan sesuaikan tampilan `Payments.jsx`.

### Gate Form Pendataan Diri (Contact.jsx)
`Contact.jsx` **tidak lagi** fetch CSV dari Google Sheets untuk cek kuota. Form pendataan diri sekarang adalah Google Form yang di-embed via `<iframe>`, dan **terkunci** sampai user membuka halaman `/payment` minimal satu kali:
- `PaymentDetail.jsx` menulis `localStorage.setItem("rfn_reg_unlocked", {...})` setiap kali halaman dibuka.
- `Contact.jsx` membaca key `rfn_reg_unlocked` dari `localStorage` — jika ada & `unlocked: true`, form iframe + tombol konfirmasi WhatsApp ditampilkan; jika tidak, tampil kartu "Form Terkunci" yang mengarahkan ke section Pembayaran.
- Konfirmasi ke panitia dilakukan via WhatsApp (nomor Meli) setelah user selesai isi form — bukan lagi via embed di awal.

### Widget Notifikasi Pembeli (BuyerFeedToast)
`src/components/notifications/BuyerFeedToast.jsx`, dirender sitewide dari `App.jsx`. Menampilkan
toast pojok kiri-bawah "**{Nama}** telah membeli tiket **{Kategori}**", bergantian tiap 5 detik,
data dari `BUYER_FEED_CSV_URL` (konstanta di file itu — saat ini **masih kosong**, menunggu link
CSV aman). **PENTING:** link CSV yang dipakai di sana **wajib** hanya berisi kolom Nama + Kategori
dari sheet turunan `Public Feed` — jangan pernah pakai link sheet respons mentah (berisi NIK,
alamat, no. HP). Lihat `internal/docs/security.md` untuk detail insiden & aturan wajibnya.

### Facebook Pixel
Diinisialisasi di `src/App.jsx` dalam `useEffect`. Pixel ID: `1593896754910524`. Melacak `PageView` setiap kali website dibuka. Ini digunakan untuk tracking performa iklan Meta/Facebook Ads.

### Dark/Light Mode
Dikendalikan oleh `Toogle.jsx` dengan `data-theme` attribute pada `<body>`. CSS variable didefinisikan di `App.css`.

---

## Testing

```bash
npm test          # Jalankan seluruh unit test sekali (CI mode)
npm run test:watch  # Jalankan test dalam mode watch
```

Test ditulis dengan **Vitest + @testing-library/react**, berlokasi di sebelah file yang diuji (`*.test.jsx`). Fokus test saat ini: logic harga (Early Bird habis → Normal), gate form pendataan diri, dan toggle pendaftaran. Checklist lengkap ada di `internal/docs/TESTING_CHECKLIST.md` — centang manual setelah verifikasi.

---

## Perintah Dev

```bash
npm run dev       # Jalankan dev server (localhost:5173)
npm run build     # Build production ke folder dist/
npm run preview   # Preview production build secara lokal
npm test          # Jalankan unit test
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

Pixel ID saat ini: `1593896754910524` (bisa dicek/ubah di `App.jsx`, dalam script `fbq("init", ...)`).

---

## Konvensi Kode

- Semua komponen menggunakan **functional component + React hooks**
- Styling menggunakan **CSS class** dari `App.css` (BEM-like: `section__title`, `nav__link`) dan **inline style** di komponen yang lebih baru (mis. `Payments.jsx`, `PaymentDetail.jsx`, `Contact.jsx`)
- Beberapa komponen menggunakan **Tailwind utility class** (Size.jsx)
- Animasi scroll menggunakan atribut `data-aos` (AOS library)
- **Tidak ada** global state manager (Redux, Zustand) — state lokal dengan `useState`, dan `localStorage` untuk gate form pendataan diri

---

## Kontak & Info Event

- Instagram: [@runfornation.id](https://www.instagram.com/runfornation.id)
- WhatsApp Meli (konfirmasi pembayaran & pendataan diri): +62 853-9366-9366
- Bank transfer: BSI — No. Rek. 2024232215 a.n. Yahya Organizer
- Website dibuat oleh: Griya IT Nusantara ([griyaitnusantara.my.id](https://griyaitnusantara.my.id/))
