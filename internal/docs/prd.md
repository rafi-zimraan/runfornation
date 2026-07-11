# PRD — Product Requirements Document
## Run For Nation: Spirit of Culture 2026

Terakhir diperbarui: 2026-07-11.

---

## 1. Ringkasan Produk

Landing page satu-halaman untuk event lari **Run For Nation: Spirit of Culture 2026** (Fun Run 5K
& Fun Race 10K, Pontianak & Kubu Raya). Produk ini bukan aplikasi pendaftaran penuh — ia adalah
**jembatan informasi & konversi** yang mengarahkan pengunjung dari "tahu soal event" ke "sudah
transfer & mengisi form pendataan diri", dengan konfirmasi akhir manual via WhatsApp.

## 2. Masalah yang Diselesaikan

- Calon peserta butuh satu tempat untuk memahami: apa event-nya, berapa biayanya, ukuran jersey
  apa yang tersedia, dan bagaimana cara daftar — tanpa perlu bolak-balik chat panitia untuk info dasar.
- Panitia butuh cara mengumpulkan pendaftaran & pembayaran tanpa membangun sistem backend sendiri
  (tim kecil, event musiman, anggaran terbatas).
- Panitia butuh sinyal kepercayaan (social proof) agar pengunjung yang ragu-ragu merasa yakin
  event ini benar-benar berjalan dan banyak yang sudah daftar.

## 3. Target Pengguna (Persona)

| Persona | Kebutuhan | Titik sentuh utama |
|---|---|---|
| **Calon peserta umum** | Info jelas soal harga, kategori, size chart, cara daftar | Home → About → Size → Payments |
| **Peserta yang sudah mantap** | Proses bayar & konfirmasi cepat, tidak ribet | Payments → PaymentDetail → Contact → WhatsApp |
| **Peserta ragu-ragu** | Bukti sosial bahwa orang lain sudah daftar & event kredibel | Widget notifikasi pembeli, banner "Pendaftaran Dibuka" |
| **Panitia (Meli, Wildan, dkk)** | Terima konfirmasi pembayaran yang mudah diverifikasi | WhatsApp link dari Contact.jsx |
| **Sponsor/mitra (Griya IT Nusantara, dll)** | Logo & kredit tampil di halaman | Footer |

## 4. Fitur Utama (existing)

1. Hero + deskripsi event dengan animasi (Home)
2. Ketentuan pendaftaran + modal regulasi lengkap (About)
3. Size chart Dewasa & Kids (Size)
4. Paket harga 5K/10K dengan opsi tangan panjang (Payments)
5. Halaman detail pembayaran & rekening bank (PaymentDetail)
6. Form pendataan diri ter-gate, baru terbuka setelah lihat halaman pembayaran (Contact)
7. Dark/light mode
8. Tracking iklan Facebook Pixel

## 5. Fitur Baru: Widget Notifikasi Pembeli ("Social Proof Toast")

**Tujuan:** menampilkan notifikasi kecil di pojok layar seperti *"Ahmad Rozi telah membeli tiket
10K"* yang muncul bergantian, untuk memberi sinyal bahwa pendaftaran aktif & ramai.

**User story:**
> Sebagai calon peserta yang masih ragu, saya ingin melihat bahwa orang lain sudah mendaftar,
> supaya saya lebih yakin untuk ikut mendaftar juga.

**Kriteria penerimaan:**
- [x] Notifikasi muncul di pojok (kiri-bawah), tidak menghalangi tombol scroll-up atau navbar mobile
- [x] Menampilkan nama peserta + kategori (5K/10K) — tidak ada data lain yang ditampilkan
- [x] Berganti otomatis ke entri lain setiap ±5 detik
- [x] Bisa ditutup manual (tombol ×), tidak muncul lagi di sesi browser yang sama setelah ditutup
- [x] Data berasal dari sheet Google yang **hanya berisi Nama + Kategori** (lihat `security.md`) — tidak pernah dari sheet mentah yang berisi NIK/data pribadi lain
- [x] Tidak membuat halaman crash/error jika sumber data belum tersedia atau gagal diambil
- [ ] *(belum, menunggu link CSV aman dari pemilik project)* Terhubung ke data pendaftar sungguhan

**Di luar scope (untuk versi ini):**
- Bukan verifikasi real-time bahwa pembayaran benar-benar sudah dikonfirmasi (nama muncul begitu
  ada baris baru di sheet, terlepas dari status verifikasi pembayaran oleh panitia)
- Bukan animasi/gamifikasi tambahan (confetti, sound, dsb.) kecuali diminta terpisah

## 6. Metrik Sukses

Karena tidak ada analytics backend sendiri, metrik utama berasal dari Facebook Ads Manager
(via Pixel) dan observasi manual panitia:

| Metrik | Sumber |
|---|---|
| Jumlah PageView | Facebook Pixel / Meta Ads Manager |
| Jumlah submit form pendataan diri | Jumlah baris di Google Sheet respons |
| Rasio klik "Daftar Sekarang" → sampai isi form | Tidak terukur otomatis saat ini — potensi improvement ke depan (lihat `roadmap.md`) |

## 7. Non-Goals

- Bukan sistem manajemen event penuh (tidak ada dashboard admin, tidak ada database sendiri)
- Bukan payment gateway terintegrasi — pembayaran tetap transfer manual + konfirmasi WhatsApp
- Bukan aplikasi multi-event/multi-tenant — dibangun spesifik untuk Run For Nation 2026

## 8. Referensi Silang

- Justifikasi bisnis & aturan harga → `brd.md`
- Spesifikasi fungsional detail → `frd.md`
- Keamanan data → `security.md`
- Roadmap & fitur mendatang → `roadmap.md`
