# FRD — Functional Requirements Document
## Run For Nation: Spirit of Culture 2026

Terakhir diperbarui: 2026-07-11.

Spesifikasi fungsional per fitur — input, proses, output, dan aturan error handling.
Untuk konteks kenapa (why), lihat `prd.md` / `brd.md`. Untuk detail keamanan, lihat `security.md`.

---

## FR-1: Toggle Buka/Tutup Pendaftaran

- **Input:** konstanta `isRegistrationClosed` di `Payments.jsx` (baris 5), diubah manual oleh developer.
- **Proses:** jika `true`, tombol CTA di tiap kartu paket diganti tombol disabled "Pendaftaran Ditutup"; toggle tangan panjang juga dinonaktifkan (cursor `not-allowed`).
- **Output:** UI berubah total tanpa perlu mengubah komponen lain.
- **Status saat ini:** `false` (pendaftaran dibuka).

## FR-2: Kalkulasi & Tampilan Harga

- **Input:** `PACKAGES` (Payments.jsx) / `PRICES` (PaymentDetail.jsx) — masing-masing berisi `earlyBird` & `normal` per kategori; state `longSleeve` (boolean, per kartu).
- **Proses:**
  - `normalFinal = pkg.normal + (longSleeve ? 10000 : 0)`
  - `earlyFinal = pkg.earlyBird + (longSleeve ? 10000 : 0)` — **hanya untuk tampilan dicoret**, tidak lagi dipakai sebagai nilai transfer aktual.
- **Output:**
  - Payments.jsx: baris Early Bird dicoret + badge "Habis"; baris Normal ditampilkan besar sebagai harga utama.
  - PaymentDetail.jsx: "Total (Harga Normal)" = `normalFinal` — **ini nilai yang harus ditransfer peserta**.
- **Aturan kritis:** kedua file (`Payments.jsx` & `PaymentDetail.jsx`) menyimpan angka harga secara independen (tidak ada shared source) — setiap perubahan harga wajib diterapkan di **keduanya**, kalau tidak, tampilan paket dan tagihan transfer akan tidak sinkron.
- **Test coverage:** `Payments.test.jsx`, `PaymentDetail.test.jsx`.

## FR-3: Gate Form Pendataan Diri

- **Input:** kunjungan ke `/payment?kategori=<5K|10K>&lengan=<pendek|panjang>`.
- **Proses:**
  1. `PaymentDetail.jsx` saat mount menulis ke `localStorage["rfn_reg_unlocked"]`:
     `{ unlocked: true, kategori, lengan, unlockedAt: ISOString }`
  2. `Contact.jsx` saat mount membaca key yang sama via `readGateInfo()` (lazy `useState` initializer). Jika parse gagal atau `unlocked !== true`, dianggap terkunci — **tidak pernah throw error**.
- **Output:**
  - Jika unlocked: tampilkan iframe Google Form + blok konfirmasi WhatsApp (nomor Meli), teks pesan WA pre-filled sesuai kategori & lengan.
  - Jika terkunci: tampilkan kartu "Form Pendataan Diri Terkunci" + tombol ke section Pembayaran.
- **Edge case tertangani:** data localStorage corrupt/bukan JSON → fallback ke status terkunci (tidak crash).
- **Test coverage:** `Contact.test.jsx`, `PaymentDetail.test.jsx` (bagian localStorage write).

## FR-4: Widget Notifikasi Pembeli (BuyerFeedToast)

- **Lokasi:** `src/components/notifications/BuyerFeedToast.jsx`, dirender sitewide dari `App.jsx` (di dalam layout utama, tampil di semua halaman: `/` dan `/payment`).
- **Input:** `BUYER_FEED_CSV_URL` (konstanta di top-level file) — link CSV hasil publish sheet `Public Feed` (kolom Nama + Kategori saja, lihat `security.md`).
- **Proses:**
  1. Saat mount: jika `BUYER_FEED_CSV_URL` kosong atau widget sudah pernah di-dismiss di sesi ini (`sessionStorage["rfn_buyer_feed_dismissed"] === "1"`), tidak melakukan apa-apa.
  2. `fetch(url)` → ambil teks CSV → `parseBuyers(csvText)`:
     - Deteksi kolom nama: header pertama yang mengandung kata "nama" (case-insensitive).
     - Deteksi kolom kategori: header pertama yang mengandung kata "kategori" (case-insensitive).
     - Filter baris: nama tidak kosong, kategori setelah `.toUpperCase()` harus persis `"5K"` atau `"10K"`.
  3. Data di-refresh otomatis tiap 2 menit (`REFRESH_MS`) — **bukan real-time**. Selain interval ini, snapshot CSV hasil "Publish to web" milik Google juga punya jeda refresh sendiri (biasanya beberapa menit) sebelum submission baru ikut terbawa — di luar kendali kode.
  4. Hasil parse diambil **30 baris terakhir saja** (`RECENT_POOL_SIZE`) lalu dibalik urutannya (`.slice(-30).reverse()`), supaya pendaftar **paling baru tampil duluan** dan widget hanya berputar di antara pendaftar terkini — bukan mengulang seluruh riwayat pendaftar sejak awal.
  5. Entri ditampilkan bergantian tiap 5 detik (`ROTATE_MS`), dengan animasi fade+slide (dinonaktifkan jika `prefers-reduced-motion`).
- **Output:** toast di pojok kiri-bawah (desktop) / melebar penuh di atas navbar mobile (≤768px): ikon lingkaran berwarna sesuai kategori (biru=5K, merah=10K), teks **"{Nama} telah membeli tiket {Kategori}"**, sub-label "Run For Nation 2026", tombol tutup (×).
- **Error handling:** fetch gagal (network error, URL kosong/invalid, sheet belum dipublish) → widget tidak render apapun (`return null`), tidak ada console error yang mengganggu, tidak pernah menyebabkan crash halaman lain.
- **Dismiss:** klik tombol × → set `sessionStorage["rfn_buyer_feed_dismissed"] = "1"` → widget hilang untuk sisa sesi browser tsb (reset saat tab/browser ditutup, karena `sessionStorage` bukan `localStorage`).
- **Test coverage:** `BuyerFeedToast.test.jsx` — mencakup fungsi murni `parseBuyers` (deteksi kolom & filtering), rendering komponen penuh dengan `fetch` yang di-mock (toast tampil dengan nama+kategori benar, urutan terbaru-dulu, pembatasan ke 30 terbaru, tidak render apapun jika `csvUrl` kosong/fetch gagal). Timer rotasi antar-entri (5 detik) belum ada test khusus karena efek samping berbasis waktu nyata.
- **Prasyarat sebelum fitur ini punya data sungguhan:** `BUYER_FEED_CSV_URL` harus diisi dengan link CSV `Public Feed` yang valid (lihat `security.md` § 2–3). Sampai saat itu, widget tidak menampilkan apapun (fail-safe, bukan fail-open).

## FR-5: Dark/Light Mode

- **Input:** klik toggle di `Toogle.jsx`.
- **Proses:** simpan preferensi ke `localStorage["rfn_theme"]` (`"dark"`/`"light"`), set atribut `data-theme` pada `<body>`.
- **Output:** seluruh CSS variable warna di `App.css` berubah sesuai `data-theme`.
- **Default:** dark, kecuali ada preferensi tersimpan.

## FR-6: Facebook Pixel Tracking

- **Input:** tidak ada input user — otomatis jalan saat `App.jsx` mount.
- **Proses:** inject script `fbevents.js`, `fbq("init", "1593896754910524")`, `fbq("track", "PageView")`.
- **Output:** data pageview terkirim ke Meta Ads Manager untuk optimasi iklan.

## FR-7: Responsivitas Size Chart

- **Input:** lebar viewport.
- **Proses:** `.size__grid` (App.css) — `grid-template-columns: 1fr 1fr` di desktop, collapse ke `1fr` di ≤768px.
- **Output:** di mobile, gambar size chart & tabel tersusun vertikal (bukan berdampingan sempit).
- **Catatan:** sebelumnya ini inline style tanpa breakpoint — sudah diperbaiki 2026-07-11.

## FR-8: Safe-Area iOS untuk Navbar Mobile

- **Input:** perangkat dengan home indicator (iPhone X ke atas) dalam mode `viewport-fit=cover`.
- **Proses:** `.header` (mobile, ≤768px) & `.buyer-toast`/`.scrollup` menambah `env(safe-area-inset-bottom)` ke `height`/`padding-bottom`/`bottom`.
- **Output:** elemen fixed-bottom tidak tertutup/tabrakan dengan gesture bar iOS.

---

## Ringkasan Test Coverage Otomatis

| File | Jumlah test |
|---|---|
| `Payments.test.jsx` | 5 |
| `PaymentDetail.test.jsx` | 4 |
| `Contact.test.jsx` | 3 |
| `Header.test.jsx` | 2 |
| `BuyerFeedToast.test.jsx` | 5 |
| **Total** | **19** |

Jalankan via `npm test`. Checklist manual QA (non-otomatis) ada di `TESTING_CHECKLIST.md`.
