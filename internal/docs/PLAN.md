# Run For Nation — Project Plan & Fitur

Dokumen ini adalah sumber kebenaran untuk fitur yang sudah ada, keputusan desain,
dan rencana ke depan untuk website **Run For Nation: Spirit of Culture 2026**.

> Dokumen pendukung lain di folder ini: `blueprint.md` (arsitektur), `prd.md`/`brd.md`/`frd.md`
> (requirements), `security.md` (**baca dulu — ada insiden keamanan data aktif**), `design.md`,
> `wireframe.md`, `techstack.md`, `roadmap.md`, `TESTING_CHECKLIST.md`.

Terakhir diperbarui: 2026-07-11.

---

## 1. Status Saat Ini

| Area | Status |
|---|---|
| Pendaftaran | **Dibuka** (`isRegistrationClosed = false` di `Payments.jsx`) |
| Early Bird | **Habis** — harga yang berlaku sekarang adalah harga **Normal** |
| Form pendataan diri | Google Form (embed iframe), terkunci sampai user melihat halaman `/payment` |
| Konfirmasi pembayaran | Manual via WhatsApp (Meli) setelah isi form |

---

## 2. Fitur Utama (sudah ada)

### 2.1 Landing Page One-Page (`/`)
Urutan section pada `App.jsx`: `Header → Home → About → Size → Payments → Contact → Footer`.

- **Header** (`components/header/Header.jsx`) — navbar sticky, highlight link aktif, hamburger menu mobile, toggle dark/light (`Toogle.jsx`).
- **Home** (`components/home/Home.jsx` + `Data.jsx`) — hero section, judul animasi, kartu kategori 5K/10K, kartu promo dengan gambar `bannerRunForNationFixs.jpeg`.
- **About** (`components/about/About.jsx` + `Info.jsx`) — ketentuan pendaftaran ringkas (3 kartu info) + modal "Lihat Ketentuan Lengkap" berisi 8 poin regulasi.
- **Size** (`components/size/Size.jsx`) — tabel ukuran jersey Dewasa (XXS–3X) & Kids (S–XL KDS), berbasis Tailwind + inline style.
- **Payments** (`components/payment/Payments.jsx`) — kartu paket 5K (Fun Run) & 10K (Fun Race), toggle jersey tangan panjang (+Rp10.000), harga Early Bird (sekarang dicoret/"Habis") & harga Normal (sekarang jadi harga utama yang ditonjolkan).
- **Contact** (`components/contact/Contact.jsx`) — form pendataan diri (Google Form iframe), **terkunci** (gated) sampai user membuka halaman `/payment` minimal sekali (status disimpan di `localStorage` key `rfn_reg_unlocked`). Setelah isi form, user diarahkan konfirmasi ke WhatsApp panitia.
- **Footer** (`components/footer/Footer.jsx`) — nav link + logo sponsor Griya IT Nusantara.

### 2.2 Halaman Detail Pembayaran (`/payment`)
`components/payment/PaymentDetail.jsx` — menampilkan ringkasan paket (kategori, tangan panjang), **total harga Normal** (bukan Early Bird lagi), info rekening bank BSI, instruksi transfer, dan tombol lanjut ke form pendataan diri. Saat halaman ini dibuka, otomatis membuka gate `Contact.jsx` via `localStorage`.

### 2.3 Dark / Light Mode
`Toogle.jsx` menyimpan preferensi via `data-theme` attribute di `<body>`. CSS variable warna didefinisikan di `App.css`.

### 2.4 Tracking Iklan (Facebook Pixel)
Diinisialisasi di `App.jsx` `useEffect` — pixel ID `1593896754910524`, event `PageView` setiap load halaman.

### 2.5 Widget Notifikasi Pembeli (BuyerFeedToast) — baru, 2026-07-11
`components/notifications/BuyerFeedToast.jsx`, tampil sitewide. Toast pojok kiri-bawah bergantian
menampilkan "**{Nama}** telah membeli tiket **{Kategori}**" dari sheet Google `Public Feed`
(Nama+Kategori saja, via `ARRAYFORMULA` — otomatis ikut update saat ada pendaftar baru).
**Sudah aktif dengan data sungguhan** sejak 2026-07-11 — link CSV sudah diverifikasi hanya berisi
kolom Nama+Kategori (299 baris, tidak ada NIK/alamat/no. HP) sebelum dipasang ke `BUYER_FEED_CSV_URL`.
Kolom **Timestamp** juga sudah ditambahkan ke `Public Feed` (via `ARRAYFORMULA`), sehingga widget
menampilkan label waktu relatif sungguhan ("7 jam lalu", "15 menit lalu", dst.) menggantikan label
statis. Sudah diverifikasi tampil benar di browser.

### 2.6 Animasi
- AOS (`data-aos` attribute) untuk scroll-reveal di hampir semua section.
- `react-typed` untuk efek mengetik pada judul hero (jika dipakai di `Data.jsx`/`Home.jsx`).

---

## 3. Perubahan Terbaru (sesi 2026-07-11)

1. **Ganti gambar promosi/logo** — `Data.jsx` (kartu promo hero) dan `About.jsx` (gambar ketentuan) sekarang memakai
   `assets/Runners/bannerRunForNationFixs.jpeg`, menggantikan `logoRunFornationTwo.jpeg` yang lama.
2. **Harga Early Bird resmi habis:**
   - `Payments.jsx`: baris harga Early Bird sekarang dicoret (`text-decoration: line-through`) dengan badge merah "Habis". Harga **Normal** diperbesar (`--fs-3xl`, bold) dan jadi harga utama yang ditonjolkan.
   - Banner promosi "Pendaftaran Resmi Dibuka!" diubah teksnya agar tidak lagi menyebut Early Bird masih tersedia.
   - **`PaymentDetail.jsx` (penting):** total yang harus ditransfer sebelumnya dihitung dari `pkg.earlyBird`. Ini sudah diperbaiki menjadi `pkg.normal + addon` — karena Early Bird habis, nominal transfer yang ditampilkan ke user sekarang benar (harga Normal), bukan salah kurang bayar.

---

## 4. Known Issues / Utang Teknis

| Item | Detail | Status |
|---|---|---|
| `src/components/work/*` | Folder `Work.jsx`, `Works.jsx`, `WorkItems.jsx`, `Data.jsx` — sisa template portfolio lama, tidak diimport di mana pun. | **Sudah dihapus** (sesi 2026-07-11). |
| Aset gambar tidak terpakai | `logorunningnation.png`, `BGRUNFORNATION.jpg`, `BGRunnerIsmuhuYahya.jpg`, `logoRunFornationTwo.jpeg` — total ~4.8MB tidak direferensikan di kode manapun. | **Sudah dihapus** (sesi 2026-07-11). |
| Dependency tidak dipakai | `@emailjs/browser` & `emailjs-com` — tidak ada satupun import `emailjs` di `src/`. | **Sudah dihapus** dari `package.json`. |
| Kerentanan keamanan `react-router-dom` | Versi lama (≤6.30.3) rentan XSS via open redirect (GHSA-2w69-qvjg-hvjx). | **Sudah di-upgrade** ke `6.30.4` (masih dalam range `^6.30.1`, tidak breaking). |
| Grid Size Chart tidak responsif | `Size.jsx` memakai inline style `gridTemplateColumns: "1fr 1fr"` tanpa breakpoint mobile — di layar HP akan tampil 2 kolom sempit (gambar + tabel berdesakan). | **Sudah diperbaiki**: dipindah ke class `.size__grid` di `App.css` dengan breakpoint `max-width: 768px` → 1 kolom. |
| iOS safe-area untuk bottom nav | Navbar mobile pindah ke `position: fixed; bottom: 0`, tapi tidak memperhitungkan `env(safe-area-inset-bottom)` — berpotensi mepet/ketutup home-indicator di iPhone X ke atas. | **Sudah diperbaiki**: tambah `viewport-fit=cover` di `index.html` + `padding-bottom`/`height` pakai `env(safe-area-inset-bottom)` di `App.css`. |
| Tidak ada `apple-touch-icon` / `theme-color` | Saat disimpan ke home screen iOS/Android, icon & warna status bar tidak konsisten. | **Sudah ditambahkan** di `index.html`. |
| Gambar tanpa lazy loading | Gambar below-the-fold (About, Size, Footer) ikut dimuat sekaligus di awal — boros data terutama di koneksi mobile. | **Sudah ditambahkan** `loading="lazy" decoding="async"`; gambar hero (LCP) diberi `fetchPriority="high"` sebagai gantinya. |
| CLAUDE.md basi | Menyebut Contact.jsx & PaymentDetail.jsx fetch CSV Google Sheets untuk kuota (`MAX_PESERTA`) — ini sudah tidak ada di kode. | **Sudah diperbarui** (lihat task Upgrade CLAUDE.md). |
| Belum ada automated test | Tidak ada test framework sebelum sesi ini. | **Sudah ditambahkan** Vitest + Testing Library, 14 test (lihat `internal/docs/TESTING_CHECKLIST.md`). |
| Ukuran gambar besar | Aset yang dipakai (`bannerRunForNationFixs.jpeg` 368K, `LogoSizeNew.jpeg` 169K) belum dikompres/di-resize untuk web. | Belum dikerjakan — lihat Roadmap § 5. |

---

## 5. Rencana Ke Depan (Roadmap)

> Catatan: Ini adalah usulan berbasis kondisi kode saat ini. Prioritas & tanggal perlu dikonfirmasi bersama tim/organizer.

- [x] ~~Bersihkan aset & folder tidak terpakai~~ (`work/`, gambar orphan) — selesai 2026-07-11.
- [x] ~~Tambah automated test~~ — Vitest + Testing Library, 14 test, jalan lokal via `npm test`.
- [x] ~~Progressive image loading~~ — `loading="lazy"` untuk gambar below-the-fold, `fetchPriority="high"` untuk hero.
- [x] ~~Perbaiki responsivitas Size Chart & safe-area iOS~~ — selesai 2026-07-11.
- [ ] **Kompres semua gambar** di `assets/Runners/` ke format web-optimized (WebP/AVIF) + resize sesuai kebutuhan tampilan aktual (`bannerRunForNationFixs.jpeg` 368K & `LogoSizeNew.jpeg` 169K masih bisa dipangkas jauh).
- [ ] **Tambah automated test ke CI** — jalankan `npm test` di GitHub Actions sebelum build/deploy (`.github/workflows/deploy.yml`), saat ini baru jalan manual/lokal.
- [ ] **Reaktifkan pengecekan kuota peserta** bila dibutuhkan lagi (dulu via Google Sheets CSV + PapaParse — saat ini tidak dipakai karena form sudah pindah ke Google Form native).
- [ ] **Uji nyata di perangkat iOS/Android fisik** (Safari iPhone, Chrome Android, iPad) — perbaikan safe-area & responsive grid sudah dilakukan berbasis review kode & breakpoint CSS, tapi belum diverifikasi visual di device/emulator sungguhan.
- [ ] **Update tahun & copy event** secara berkala tiap musim event baru (2026 → 2027, dst.) — cek semua string "2026" tersebar di banyak file.

---

## 6. Referensi Cepat

- Toggle buka/tutup pendaftaran: `src/components/payment/Payments.jsx` (`const isRegistrationClosed = ...`)
- Harga paket: `src/components/payment/Payments.jsx` (`PACKAGES`) dan `src/components/payment/PaymentDetail.jsx` (`PRICES`) — **harus selalu diubah bersamaan**, keduanya sumber harga yang terpisah (tidak shared/import satu sama lain).
- Gate form pendataan diri: `localStorage` key `rfn_reg_unlocked`, ditulis oleh `PaymentDetail.jsx`, dibaca oleh `Contact.jsx`.
- Facebook Pixel ID: `src/App.jsx` (`fbq("init", "...")`)
- Dark/light mode: `src/components/Toogle.jsx` + CSS variable di `src/App.css`
