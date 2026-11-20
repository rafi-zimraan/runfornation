# MEMORY.md — Catatan Keputusan & Riwayat

Tempat menyimpan **kenapa** sesuatu jadi seperti sekarang. Fakta yang berlaku hari ini ada di
[`KNOWLEDGE.md`](KNOWLEDGE.md); aturan kerja di [`CLAUDE.md`](CLAUDE.md). File ini isinya
keputusan bertanggal — jangan hapus entri lama walau sudah tidak berlaku, **tandai saja sebagai
dicabut**, karena keputusan yang dicabut pun memberi tahu alasan yang pernah dipertimbangkan.

Format: `### YYYY-MM-DD — Judul` lalu **Keputusan / Alasan / Konsekuensi**.
Entri terbaru di atas.

---

### 2026-11-20 — Ganti TinyURL dengan `runfornation.my.id/RFNVirtual`

**Keputusan.** Short link pendaftaran Virtual Run pindah dari `tinyurl.com/RFNVirtual` ke
`runfornation.my.id/RFNVirtual`. Caranya satu aturan pengalihan 302 di `public/.htaccess`, yang
langsung mengarah ke URL Google Form tanpa singgah di forms.gle.

**Alasan.** Bang Heri mengeluh di WA (13.41): "Agak lama loadingnya" dan "Berat fi linknya".
Screenshot dari iPhone-nya menunjukkan TinyURL menahan pengunjung di halaman Cloudflare
"Melakukan verifikasi keamanan" sebelum diteruskan. Uji `curl` mengonfirmasi: TinyURL membalas
403 dengan halaman cek bot, sementara forms.gle langsung 302 ke form dalam <1 detik. TinyURL
anonim tidak bisa diatur, jadi masalahnya tidak bisa diperbaiki di sisi TinyURL. Domain sendiri
dipilih karena paling ringan (satu lompatan, tanpa halaman perantara), terlihat resmi, dan
tujuannya bisa diganti kapan saja.

**Konsekuensi.**
- Aturan sudah diuji di Apache lokal: `/RFNVirtual`, `/rfnvirtual`, dan `/RFNVirtual/` →
  302 ke form, sedangkan `/` tetap 200. **Belum live:** `.htaccess` harus di-upload manual ke
  `public_html/` (per 20 Nov 2026 path itu masih 404).
- Link TinyURL dan QR yang mengarah ke sana, termasuk QR di PDF laporan 20 Nov, tetap jalan tapi
  lambat. Jangan disebar lagi. QR di laporan perlu dibuat ulang.
- **Ditemukan saat mengecek:** penyebab berat yang lebih besar adalah **form-nya sendiri**.
  Pertanyaan "Upload Bukti Pembayaran" membuat Google mewajibkan login. Setelan lain (kumpulkan
  email, batasi 1 jawaban) sudah mati, jadi upload adalah satu-satunya penyebab.
- **Menunggu keputusan Bang Heri:** hapus pertanyaan upload dan minta bukti transfer dikirim ke
  WA admin 0853-9366-9366, supaya form terbuka tanpa login. Belum diubah, karena upload itu
  dulu permintaan Bang Heri sendiri ("seperti biasanya").

---

### 2026-11-20 — Short link `tinyurl.com/RFNVirtual` & NB ongkir di form Virtual Run

> **Bagian short link dicabut pada hari yang sama**: TinyURL kena cek bot Cloudflare, diganti
> `runfornation.my.id/RFNVirtual` (entri di atas). Bagian NB ongkir tetap berlaku.

**Keputusan.** (1) Deskripsi form pendaftaran Virtual Run diberi baris
`NB: Harga belum termasuk biaya pengiriman`, tepat di bawah daftar paket. (2) Link pendaftaran
diberi nama: `tinyurl.com/RFNVirtual`.

**Alasan.** Permintaan Bang Heri lewat WhatsApp — harga paket menimbulkan salah paham karena
peserta mengira sudah termasuk ongkir, dan link `forms.gle/vA6EzR7DLqULgW4t8` tidak mungkin
diingat atau diketik ulang dari poster.

**Konsekuensi.**
- Short link dibuat di TinyURL **tanpa akun** → permanen, **tujuannya tidak bisa diubah/dihapus
  selamanya**. Dipilih karena cepat dan tidak perlu login; konsekuensinya diterima sadar.
- Link lama tetap aktif, jadi poster yang sudah tersebar tidak mati.
- **Belum selesai:** poster masih memuat link lama dan belum ada NB ongkir; nominal ongkir serta
  cara menagihnya belum diputuskan; NB belum ditambahkan di bagian pembayaran form.
- Laporan PDF dikirim ke Bang Heri (lihat entri format laporan di bawah).

---

### 2026-11-19 — Google Form Virtual Run dibuat, tanpa grup WhatsApp

**Keputusan.** Virtual Run dijalankan lewat dua Google Form (pendaftaran + submit hasil lari),
**tanpa grup WhatsApp peserta** — cukup nomor admin untuk konfirmasi. Jersey 10K **oranye**,
bukan hijau. Pembayaran ditaruh di dalam form (upload bukti transfer) "seperti biasanya",
meniru pola form event offline.

**Alasan.** Keputusan direktur. Grup WA menambah beban moderasi untuk event yang pesertanya
tidak pernah bertemu; jersey oranye membedakan 10K dari stok hijau lama.

**Konsekuensi.** Karena ada kolom upload file, **peserta wajib login akun Google** dan semua
bukti transfer masuk ke Google Drive pemilik form. Size chart oranye harus dibuat baru dan
di-commit ke `public/` hanya untuk mendapat URL publik.

---

### 2026-11-19 — Fakta hosting diluruskan: domain bukan di GitHub Pages

**Temuan.** `runfornation.my.id` dilayani DomaiNesia, bukan GitHub Pages. Workflow `deploy.yml`
hanya mengisi branch `gh-pages` yang tidak dipakai domain.

**Konsekuensi.** Push ke `main` **tidak** membuat perubahan live. Harus upload `dist/` manual ke
hosting. Jangan pernah melaporkan perubahan "sudah tayang" hanya karena CI hijau.

---

### 2026-11-19 — Format laporan PDF untuk Bang Heri

**Keputusan.** Setiap batch pekerjaan yang perlu persetujuan direktur dilaporkan sebagai PDF
A4 satu-dua halaman: banner event di atas, eyebrow `LAPORAN PENGERJAAN · <tanggal>`, judul biru,
baris `Untuk: Bang Heri · Disusun oleh: Rafi`, kartu link + QR, tabel permintaan→hasil dengan
badge **Selesai**, blok **Sebelum → Sesudah**, lalu daftar hal yang masih perlu keputusan.
Dikirim via WhatsApp bersama skrip pesan singkat.

**Alasan.** Direktur tidak membaca thread teknis; dia butuh satu lembar yang bisa dibaca di HP
dan langsung memperlihatkan apa yang berubah dan apa yang menunggu dia.

**Konsekuensi.** Cara membuatnya ada di [`CLAUDE.md`](CLAUDE.md) bagian *Laporan untuk direktur*.
Laporan tersimpan di `~/Downloads/`, bukan di repo (berisi screenshot & aset non-kode).

---

### 2026-11-19 — Pendaftaran event offline ditutup

**Keputusan.** `IS_REGISTRATION_CLOSED = true` di `src/config/registration.js`, disertai banner
ucapan terima kasih dan layer sitewide sekali per browser.

**Konsekuensi.** Peserta yang **sudah** punya `rfn_reg_unlocked` di localStorage tetap bisa
mengisi form pendataan diri — ini disengaja supaya yang terlanjur transfer tidak terblokir.
Halaman `/payment` juga sengaja tetap dapat diakses lewat URL langsung, meski tidak ada lagi
link menuju ke sana dari UI.

---

### 2026-11-02 — Form pendaftaran offline dipecah 4 bagian (size M 5K habis)

**Keputusan.** Form bercabang per kategori: 10K memakai pertanyaan `SIZE BAJU` (M/L/XL), 5K
memakai pertanyaan baru `SIZE BAJU 5K` (L/XL saja).

**Alasan.** Stok size M untuk 5K habis, tapi 10K masih ada.

**Konsekuensi.** Data ukuran peserta kini **tersebar di dua kolom spreadsheet** — saat merekap,
gabungkan `SIZE BAJU` dan `SIZE BAJU 5K`. Kalau M restock, cukup tambah opsi M di `SIZE BAJU 5K`.

---

### 2026-07-11 — Insiden kebocoran data & aturan CSV

**Temuan.** Sheet respons Google Form dipublikasikan sebagai CSV dengan opsi "Seluruh dokumen";
±299 baris data asli — NIK, tanggal lahir, alamat, golongan darah, no. WhatsApp peserta, serta
nama & nomor **kontak darurat** (pihak ketiga yang tidak pernah mengisi form) — dapat diakses
publik tanpa login. Ditemukan saat link CSV diminta untuk fitur widget notifikasi pembeli dan
isinya diperiksa sebelum dipakai.

**Keputusan.** Publikasi sheet mentah dibatalkan; dibuat sheet turunan `Public Feed` berisi
**hanya** kolom publik; hanya link itu yang boleh masuk ke kode.

**Konsekuensi & status.** Diverifikasi ulang **20 Nov 2026**: `BUYER_FEED_CSV_URL` di
`BuyerFeedToast.jsx` kini menunjuk CSV 3 kolom (`Nama Lengkap`, `Pilih Kategori Lari`,
`Timestamp`) — aman. Aturan tetap berlaku untuk selamanya: **periksa header kolom sebelum
memakai link CSV apa pun.** Kebijakan penuh di `internal/docs/security.md`.

---

### Riwayat kode yang membentuk keadaan sekarang

Diringkas dari git log — detail per commit ada di `git log`.

- **Early Bird habis** → `PaymentDetail.jsx` menghitung total dari `pkg.normal`, bukan
  `earlyBird`. Di `Payments.jsx` harga Early Bird ditampilkan dicoret dengan badge "Habis".
  Kalau Early Bird dibuka lagi, logika ini harus dikembalikan **di kedua file**.
- **Gate form pendataan diri** → `Contact.jsx` tidak lagi menarik CSV untuk cek kuota. Form
  Google di-embed dan terkunci sampai user membuka `/payment` sekali (`rfn_reg_unlocked` di
  localStorage).
- **Opsi jersey lengan panjang dihapus**, size chart disederhanakan jadi murni Dewasa Unisex
  (tab Kids dihapus), lalu dikompres ke WebP.
