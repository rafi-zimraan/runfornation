# BRD — Business Requirements Document
## Run For Nation: Spirit of Culture 2026

Terakhir diperbarui: 2026-07-11.

---

## 1. Latar Belakang Bisnis

Run For Nation: Spirit of Culture 2026 adalah event Fun Run/Fun Race (5K & 10K) di Pontianak &
Kubu Raya, Kalimantan Barat, diselenggarakan oleh Yahya Organizer bekerja sama dengan Borneo
Runners Club. Website ini adalah kanal utama pendaftaran & informasi publik untuk event tersebut.

## 2. Stakeholder

| Pihak | Peran |
|---|---|
| Yahya Organizer | Penyelenggara utama, penerima dana transfer rekening |
| Meli | Admin konfirmasi pembayaran & pendataan diri (WhatsApp) |
| Borneo Runners Club | Mitra kolaborasi event |
| Griya IT Nusantara | Pengembang website |
| Peserta lari | Pengguna akhir/pelanggan |
| Sponsor produk | Pihak yang produknya dibagikan sebagai bagian fasilitas peserta |

## 3. Model Bisnis & Aturan Harga

| Kategori | Early Bird | Normal | Status saat ini |
|---|---|---|---|
| 5K (Fun Run) | Rp165.000 | Rp180.000 | **Early Bird habis** — harga berlaku: Rp180.000 |
| 10K (Fun Race) | Rp195.000 | Rp225.000 | **Early Bird habis** — harga berlaku: Rp225.000 |
| Tambahan (semua kategori) | Jersey tangan panjang: +Rp10.000 | | |

**Aturan bisnis kritis:** Karena Early Bird sudah habis, **seluruh transaksi baru harus memakai
harga Normal**. Ini sudah diterapkan di kode (`PaymentDetail.jsx` menghitung total dari
`pkg.normal`, bukan `pkg.earlyBird`) — perubahan ini vital karena kesalahan di titik ini berarti
peserta membayar kurang dari yang seharusnya.

## 4. Kuota & Kapasitas

- Belum ada penegakan kuota otomatis di kode saat ini (fitur `MAX_PESERTA` via Google Sheets CSV
  yang disebut di dokumentasi versi lama **sudah tidak ada** — form sekarang murni Google Form
  tanpa pengecekan kuota otomatis).
- Jika panitia butuh batas kuota keras (mis. 1500 peserta), ini perlu diaktifkan kembali sebagai
  fitur terpisah — lihat `roadmap.md`.

## 5. Kanal Pembayaran & Konfirmasi

1. Peserta pilih paket di Payments → diarahkan ke `/payment` (ringkasan & rekening bank)
2. Transfer manual ke rekening **BSI 2024232215 a.n. Yahya Organizer**
3. Isi form pendataan diri (Google Form, termasuk upload bukti transfer)
4. Konfirmasi manual ke **WhatsApp Meli (+62 853-9366-9366)**

Tidak ada verifikasi otomatis bahwa transfer benar-benar terjadi — proses ini 100% bergantung pada
kejujuran peserta & verifikasi manual panitia lewat WhatsApp + bukti upload.

## 6. Aturan Bisnis Lain

- Usia minimum peserta: 10 tahun (di bawah itu wajib didampingi orang tua)
- Tidak ada refund dalam kondisi apapun (tercantum di ketentuan pendaftaran)
- Data yang tidak sesuai/tidak faktual → diskualifikasi tanpa refund
- Peserta terdaftar tidak dapat dipindahtangankan ke orang lain

## 7. Justifikasi Fitur Widget Notifikasi Pembeli

**Kebutuhan bisnis:** meningkatkan konversi dengan menunjukkan aktivitas pendaftaran nyata kepada
pengunjung yang masih mempertimbangkan untuk ikut — taktik *social proof* yang umum di halaman
penjualan tiket event.

**Batasan bisnis yang harus dipatuhi (bukan cuma teknis):**
- Karena ini menampilkan nama asli orang, secara etis panitia perlu memastikan peserta menyadari
  bahwa data pendaftaran (khususnya nama & kategori) berpotensi ditampilkan secara publik di
  website — idealnya dicantumkan di ketentuan pendaftaran/consent form. **Ini keputusan bisnis
  panitia, bukan sesuatu yang bisa diputuskan lewat kode.**
- Data yang boleh tampil publik dibatasi ketat ke Nama + Kategori saja (lihat `security.md`) —
  bukan pilihan teknis semata, tapi kebutuhan kepatuhan terhadap privasi peserta & pihak ketiga
  (kontak darurat) yang datanya ikut terkumpul di form yang sama.

## 8. Referensi Silang

- Kebutuhan produk & kriteria fitur → `prd.md`
- Spesifikasi fungsional & alur detail → `frd.md`
- Kebijakan keamanan data → `security.md`
