# Testing Checklist — Run For Nation

Checklist ini untuk memverifikasi unit test otomatis **dan** QA manual sebelum deploy.
Centang `[x]` setelah kamu benar-benar memverifikasi item tersebut.

Jalankan semua unit test dengan:

```bash
npm test
```

(atau `npm run test:watch` untuk mode watch selagi development)

---

## 1. Unit Test Otomatis (Vitest)

### `src/components/payment/Payments.test.jsx`
- [x] Harga Normal (Rp180.000 / Rp225.000) tampil sebagai harga utama tiap kategori
- [x] Harga Early Bird tampil dicoret (`line-through`) + badge "Habis" di kedua kartu
- [x] Toggle "Tangan Panjang" menambah Rp10.000 ke harga Normal & Early Bird
- [x] Link CTA membawa query `kategori` yang benar (opsi lengan panjang sudah dihapus)
- [x] Tombol pendaftaran aktif (bukan "Pendaftaran Ditutup") selama `isRegistrationClosed = false`

### `src/components/payment/PaymentDetail.test.jsx`
- [x] Total transfer 5K tanpa tangan panjang = **Rp180.000** (harga Normal, bukan Rp165.000 Early Bird)
- [x] Total transfer 10K + tangan panjang = **Rp235.000** (225.000 + 10.000)
- [x] Halaman `/payment` membuka gate `rfn_reg_unlocked` di `localStorage` dengan kategori yang benar
- [x] Kategori tidak dikenal di URL fallback ke 5K

### `src/components/contact/Contact.test.jsx`
- [x] Form pendataan diri terkunci jika `localStorage` belum di-set (belum buka halaman pembayaran)
- [x] Form iframe + tombol WA Meli terbuka saat `rfn_reg_unlocked` sudah `true`, dengan teks pesan WA menyesuaikan kategori
- [x] Data `localStorage` yang rusak (bukan JSON valid) tidak membuat app crash — tetap dianggap terkunci

### `src/components/header/Header.test.jsx`
- [x] Semua link navigasi (Home, Ketentuan, Size, Pembayaran, Daftar) merender href yang benar
- [x] Logo navbar mengarah ke `/`

### `src/components/notifications/BuyerFeedToast.test.jsx`
- [x] Mem-parse CSV dengan header "Nama"/"Kategori" apa adanya
- [x] Tetap mengenali header asli Google Form ("Nama Lengkap ", "Pilih Kategori Lari")
- [x] Membuang baris dengan nama kosong atau kategori di luar 5K/10K
- [x] Mengembalikan array kosong jika kolom nama/kategori tidak ditemukan
- [x] Mengembalikan array kosong untuk CSV kosong

> Status saat ini: **19/19 test lulus** (terakhir dijalankan 2026-07-11). Jalankan `npm test` untuk verifikasi ulang setelah setiap perubahan kode.

---

## 2. Area Yang Belum Ada Unit Test (rekomendasi ke depan)

- [ ] `About.jsx` — buka/tutup modal "Lihat Ketentuan Lengkap"
- [ ] `Size.jsx` — render tabel ukuran Dewasa & Kids
- [ ] `Toogle.jsx` — simpan & baca preferensi tema dari `localStorage`
- [ ] `ScrollToHash.jsx` — smooth scroll ke section sesuai hash URL
- [ ] `App.jsx` — routing `/` vs `/payment`, inisialisasi Facebook Pixel
- [ ] `BuyerFeedToast.jsx` — rotasi timer, fetch retry, dismiss via `sessionStorage` (saat ini baru fungsi `parseBuyers` yang di-test, bukan efek samping berbasis waktu)

---

## 3. QA Manual di Browser (checklist visual)

Jalankan `npm run dev`, buka `http://localhost:5173`, lalu cek satu per satu:

- [ ] Gambar promo di Hero (kanan atas) tampil sebagai `bannerRunForNationFixs.jpeg`, bukan logo lama
- [ ] Gambar di section Ketentuan (About) tampil sebagai `bannerRunForNationFixs.jpeg`
- [ ] Section Pembayaran: harga Early Bird terlihat **dicoret** dengan badge merah "Habis"
- [ ] Section Pembayaran: harga Normal terlihat **lebih besar/menonjol** dibanding Early Bird
- [ ] Toggle jersey tangan panjang mengubah kedua harga (+Rp10.000) secara real-time
- [ ] Klik "Daftar Sekarang" → masuk ke `/payment` → total yang tertera sama dengan harga Normal (bukan Early Bird)
- [ ] Scroll ke Contact sebelum buka `/payment` → form terkunci dengan pesan yang jelas
- [ ] Setelah buka `/payment`, kembali ke Contact → form iframe & tombol WA Meli muncul
- [ ] Tombol WA membuka `wa.me` dengan pesan yang sudah terisi kategori yang benar
- [ ] Dark/Light mode toggle bekerja & tersimpan setelah refresh halaman
- [ ] Tidak ada error di browser console (`F12` → Console)
- [ ] Responsive: cek tampilan di lebar mobile (< 480px) — khususnya kartu harga & navbar hamburger
- [ ] Widget notifikasi pembeli (pojok kiri-bawah): setelah `BUYER_FEED_CSV_URL` diisi link `Public Feed`, cek nama+kategori tampil benar, bergantian tiap ±5 detik, tombol × menutup & tidak muncul lagi di sesi yang sama
- [ ] **Buka Network tab (F12) saat widget aktif** — pastikan request CSV yang ter-load HANYA berisi kolom Nama+Kategori, bukan sheet mentah (cek isi response di tab Network)

---

## 4. Sebelum Deploy ke Production

- [ ] `npm test` — semua lulus
- [ ] `npm run build` — build sukses tanpa error
- [ ] `npm run preview` — cek hasil build production secara lokal
- [ ] Cek ulang halaman live setelah GitHub Actions selesai deploy
