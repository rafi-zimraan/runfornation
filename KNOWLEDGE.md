# KNOWLEDGE.md — Basis Pengetahuan Run For Nation

Semua **fakta non-kode** tentang project ini: event, harga, link, form, orang, hosting, dan
jebakan yang sudah pernah menggigit. Kode dijelaskan di [`CLAUDE.md`](CLAUDE.md); *kenapa*
sesuatu jadi begitu dicatat di [`MEMORY.md`](MEMORY.md).

> **Aturan emas:** kalau sebuah fakta tidak ada di sini dan tidak ada di kode — **tanya, jangan
> karang.** Angka harga, nomor rekening, dan link form adalah hal yang langsung dilihat dan
> ditransfer orang; salah satu digit berarti uang nyasar.

Terakhir diverifikasi: **24 November 2026**.

---

## 1. Dua lini yang berjalan bersamaan

Project ini bukan satu produk. Ada dua lini, dan agent sering tertukar:

| | **A. Event offline** | **B. Virtual Run** |
|---|---|---|
| Nama | Run For Nation: Spirit of Culture 2026 | RFN Virtual Run Challenge 10K |
| Bentuk | Fun Run 5K & 10K, Pontianak & Kubu Raya | Lari mandiri di mana saja, submit via app |
| Medium | **Website ini** (repo React) | **Google Form saja** — tidak ada kode di repo |
| Status | Pendaftaran **DITUTUP** | Pendaftaran buka **21 Nov – 10 Des 2026** |
| Harga | 5K Rp180.000 · 10K Rp225.000 (Normal) | Medal Only Rp69.000 · Medal+Jersey Rp125.000 |

**Implikasi penting:** permintaan soal "form", "link pendaftaran", "harga", atau "jersey" bisa
mengarah ke salah satu lini. Pastikan dulu yang mana. Pekerjaan lini B **tidak menyentuh repo ini
sama sekali** kecuali untuk menitipkan aset gambar (lihat §6).

---

## 2. Lini A — Event offline (website ini)

- **Kategori & harga** (Early Bird sudah habis; yang berlaku kolom Normal):

  | Kategori | Early Bird | **Normal (berlaku)** |
  |---|---|---|
  | 5K | Rp165.000 | **Rp180.000** |
  | 10K | Rp195.000 | **Rp225.000** |

  Harga ini ada di **dua file** tanpa sumber bersama — `Payments.jsx` (`PACKAGES`) dan
  `PaymentDetail.jsx` (`PRICES`). **Selalu ubah keduanya.**

- **Status pendaftaran:** DITUTUP. Satu saklar: `src/config/registration.js` →
  `IS_REGISTRATION_CLOSED = true`.
- **Pembayaran:** BSI, No. Rek. **2024232215** a.n. **Yahya Organizer**.
- **Konfirmasi peserta:** WhatsApp **+62 853-9366-9366** (Meli).
- **Tanggal hari-H:** *tidak tercatat di repo mana pun.* Kalau dibutuhkan, tanya panitia —
  jangan menebak dari poster.

---

## 3. Lini B — Virtual Run Challenge 10K

Semuanya hidup di Google Form; repo ini hanya menumpang untuk hosting gambar.

- **Kategori:** Virtual Run 10K, individual. Platform: Strava / Garmin / Running Apps.
- **Paket:**
  - Medal Only — **IDR 69.000**
  - Medal + Jersey — **IDR 125.000**
  - **NB: Harga belum termasuk biaya pengiriman** (ditambahkan 20 Nov 2026 atas permintaan
    Bang Heri). Nominal ongkir & cara tagihnya **belum diputuskan** per 20 Nov 2026.
- **Jadwal:**
  - Pendaftaran: 21 November – 10 Desember 2026
  - Lari & submit hasil: 3 – 25 Desember 2026
  - Pengiriman medali & jersey: 5 Januari 2027
- **Jersey:** oranye (khusus 10K — keputusan direktur, bukan hijau), ukuran S/M/L/XL
  (S 49/67 · M 50/69 · L 52/70 · XL 54/73, toleransi 2 cm).
- **Pembayaran:** rekening yang sama dengan lini A (BSI 2024232215 a.n. Yahya Organizer),
  bukti transfer diupload di dalam form. **Akibatnya peserta wajib login akun Google** sebelum
  bisa membuka form (aturan Google untuk form yang punya pertanyaan Upload File). Ini langkah
  paling berat bagi yang membuka link dari WhatsApp. Usulan menghapus upload dan memindah bukti
  transfer ke WA admin **menunggu keputusan Bang Heri** (20 Nov 2026), lihat `MEMORY.md`.
- **Admin:** WhatsApp **0853-9366-9366** — nomor yang sama dengan Meli.
- **Tidak ada grup WhatsApp peserta** untuk Virtual Run (keputusan direktur, 19 Nov 2026).
  Jangan menambahkan link `bit.ly/runfornation2026` (itu grup event offline).

---

## 4. Link & form — daftar resmi

| Keperluan | Link | Catatan |
|---|---|---|
| Daftar Virtual Run (pengganti TinyURL) | `runfornation.my.id/RFNVirtual` | Dibuat 20 Nov 2026 lewat `public/.htaccess`: satu pengalihan 302 langsung ke form. Huruf besar/kecil bebas. **Aktif hanya setelah `.htaccess` di-upload ke `public_html/`.** ⚠️ **Per 24 Nov 2026 masih 404 — file itu belum pernah naik ke server.** |
| Daftar Virtual Run (lama) | `tinyurl.com/RFNVirtual` | Short link sejak 20 Nov 2026. Kena cek bot Cloudflare, jangan disebar lagi (lihat bawah). |
| Daftar Virtual Run (asli) | `forms.gle/vA6EzR7DLqULgW4t8` | Tetap aktif. Masih tercetak di poster lama. |
| Edit form daftar Virtual Run | `docs.google.com/forms/d/1djnVRmlhhDSODcFcvDBjv_Dv6DE5ORY9Fg9ieb9VYww/edit` | |
| Submit hasil lari | `forms.gle/RF6rwkHvGyVS6pMw5` | Belum punya short link. |
| Edit form submit hasil | `docs.google.com/forms/d/14cNaXSkbq3GothkDGncBtxwP6VcN2lbAkdo2Eh-XmC4/edit` | |
| Form pendaftaran event offline | form ID `1ZRpwDEb-fo0UqQHQy_dddcwvz96W8jbxHtdkAUS5WL8` | 4 bagian, bercabang per kategori. |
| Instagram | `@runfornation.id` | |
| Domain live | `runfornation.my.id` | Lihat §7 — **bukan** GitHub Pages. |

**Short link `tinyurl.com/RFNVirtual` dibuat tanpa akun** → gratis & permanen, tapi **tujuannya
tidak bisa diubah atau dihapus selamanya**. Kalau suatu saat butuh link yang bisa dialihkan,
jangan coba edit yang ini: buat baru lewat akun TinyURL/Bitly, atau pakai
`runfornation.my.id/RFNVirtual` (file redirect di hosting).

**Jebakan (20 Nov 2026): link TinyURL tanpa akun bisa kena halaman cek bot Cloudflare.** Kalau dibuka
dari WhatsApp di iPhone, yang muncul bisa dulu halaman "Melakukan verifikasi keamanan" yang lambat atau
macet, sebelum diteruskan ke form. Bang Heri mengeluhkannya ("berat linknya"). `forms.gle/...` langsung
redirect ke form (302, <1 detik). Jangan pakai TinyURL anonim untuk link yang disebar ke publik.

---

## 5. Orang & peran

| Orang | Peran | Yang perlu diingat |
|---|---|---|
| **Bang Heri** (Heri Khairiansyah Ismuhuyahya) | Direktur — **pengambil keputusan** | Semua keputusan desain/konten/harga naik ke dia. Minta arahannya lewat WhatsApp + laporan PDF (lihat `MEMORY.md`). |
| **Rafi Zimraan** | Yang mengerjakan | Pemilik repo & akun Google form. |
| **Meli** | Admin peserta | WA 0853-9366-9366, menerima konfirmasi transfer kedua lini. |
| **Yahya Organizer** | Pemilik rekening | Nama di rekening BSI 2024232215. |
| **Griya IT Nusantara** | Pembuat website | Credit di footer, `griyaitnusantara.my.id`. |

---

## 6. Aset & file di luar repo

- `~/Downloads/Poster RFN Virtual Run - link Google Form.jpg` — poster publik. **Per 20 Nov 2026
  masih mencantumkan link lama `forms.gle/...` dan belum ada NB ongkir** → butuh revisi.
- `~/Downloads/Banner Header Google Form RFN Virtual Run.png` — banner 1600×400, dipakai sebagai
  header kedua Google Form dan header laporan PDF.
- `~/Downloads/Alur Pendaftaran Virtual Run/` — alur A–Z (PDF + 4 JPG) & laporan 19 Nov 2026.
- `public/sizechart-10k-oranye.jpg` — **di dalam repo**, tapi bukan untuk website: file ini
  di-commit supaya punya URL publik (`raw.githubusercontent.com`) untuk disisipkan ke Google Form.

---

## 7. Hosting — kenyataan vs yang tertulis di config

**Domain live `runfornation.my.id` dilayani DomaiNesia** (IP 103.147.154.185), **bukan GitHub
Pages.** Push ke `main` menjalankan GitHub Actions yang deploy ke branch `gh-pages`, dan **itu
tidak menyentuh domain.** Perubahan baru benar-benar live setelah `dist/` diupload manual ke
hosting.

Artinya: **"sudah saya push" ≠ "sudah live".** Jangan pernah melaporkan sebuah perubahan sebagai
sudah tayang hanya karena CI hijau.

**`.htaccess`** (sejak 20 Nov 2026) ada di `public/.htaccess` dan ikut ter-copy ke `dist/` saat
build. Isinya (1) pengalihan short link `/RFNVirtual` → Google Form Virtual Run, dan (2) SPA
fallback supaya route React seperti `/payment` bisa dibuka lewat URL langsung. Untuk mengganti
tujuan link, edit file itu lalu upload ulang **file itu saja** ke `public_html/`. Di File Manager
DomaiNesia, nyalakan **Show Hidden Files** dulu: file berawalan titik tersembunyi, dan kalau di
server sudah ada `.htaccess`, gabungkan isinya. Jangan menimpanya begitu saja.

---

## 8. Data pribadi — garis merah

Project ini memegang data asli ratusan peserta (NIK, alamat, no. HP). Pernah ada **insiden
kebocoran nyata** (11 Juli 2026): sheet respons form dipublikasikan sebagai CSV "Seluruh dokumen"
sehingga ±299 baris data — termasuk NIK dan kontak darurat pihak ketiga — bisa diakses publik.
Detail lengkap & kebijakannya: [`internal/docs/security.md`](internal/docs/security.md) (**wajib
dibaca sebelum menyentuh apa pun yang berbau CSV/Sheets**).

Aturan praktis yang tidak bisa ditawar:
1. CSV yang dipakai di kode **hanya boleh** sheet turunan berisi kolom publik — tidak pernah sheet
   respons mentah.
2. Setiap kolom baru di Google Form dianggap **Sensitif** sampai dinyatakan sebaliknya.
3. Sebelum memakai link CSV apa pun, **periksa dulu header kolomnya.**

**Status `BuyerFeedToast.jsx` (diverifikasi 20 Nov 2026):** `BUYER_FEED_CSV_URL` sudah terisi dan
**aman** — CSV-nya hanya 3 kolom: `Nama Lengkap`, `Pilih Kategori Lari`, `Timestamp` (1.100 baris).
Remediasi insiden Juli sudah dijalankan. Kolom `Timestamp` adalah tambahan di luar "Nama +
Kategori" yang didokumentasikan — tidak berbahaya, tapi tidak dipakai widget.

---

## 9. Jebakan yang sudah pernah menggigit

- **Harga di dua tempat.** `Payments.jsx` dan `PaymentDetail.jsx`. Ubah satu saja = peserta
  melihat harga A tapi diminta transfer harga B.
- **Google Forms, menu Indonesia:** jenis file **"Gambar" = Google Drawing**. Untuk
  screenshot/foto peserta, pilih **"Foto"**.
- **Upload gambar lokal ke Google Form via browser otomatis: tidak bisa** (picker dalam iframe,
  file chooser tertahan, fetch ke localhost diblokir). Jalan yang berhasil: taruh file di URL
  publik → "Sisipkan gambar → Melalui URL".
- **Klik pertama ke kolom deskripsi Google Form menyeleksi seluruh teksnya.** Klik sekali lagi
  untuk menaruh kursor, kalau tidak teks lama akan tertimpa saat mengetik.
- **Size jersey event offline tersebar di dua kolom spreadsheet** (`SIZE BAJU` dan `SIZE BAJU 5K`)
  sejak size M untuk 5K habis. Saat merekap, gabungkan keduanya.
- **Kolom "Ukuran Jersey" kosong untuk peserta Medal Only** di rekap Virtual Run — itu normal,
  bukan data rusak.
- **Halaman `/payment` sengaja masih bisa dibuka lewat URL langsung** walau pendaftaran ditutup,
  supaya peserta yang terlanjur transfer bisa menyelesaikan pendataan. Jangan "dirapikan".
  **⚠️ Tapi per 20 Nov 2026, di server live `runfornation.my.id/payment` mengembalikan 404.**
  DomaiNesia tidak punya aturan SPA fallback (semua path ke `index.html`), jadi route React
  hanya jalan kalau user masuk dari halaman utama. Di `npm run dev` halaman itu normal.
  **Diperbaiki 20 Nov 2026** dengan aturan SPA fallback di `public/.htaccess` (sudah diuji di
  Apache lokal). Live setelah file itu di-upload. Kalau `.htaccess` di server hilang, `/payment`
  kembali 404.
  **⚠️ Diverifikasi ulang 24 Nov 2026: `.htaccess` ternyata belum pernah di-upload.**
  `curl` ke live memberi `/` → 200, tapi `/payment` → 404 dan `/RFNVirtual` → 404,
  keduanya halaman 404 bawaan Apache. Artinya short link yang dicetak & disebar **mati**, dan
  peserta yang sudah transfer tidak bisa menyelesaikan pendataan diri. Perbaikan ada di repo
  sejak 20 Nov tapi tidak berarti apa-apa sampai file itu naik ke `public_html/`.
- **Google Form yang punya pertanyaan Upload File selalu mewajibkan login Google.** Ini
  tidak bisa dimatikan lewat setelan apa pun. Kalau form harus ringan dibuka dari WhatsApp, jangan
  pakai pertanyaan upload. Minta file dikirim lewat WA admin.
  **Bukti lapangan 24 Nov 2026:** Rafi melaporkan "kebanyakan gagal upload bukti tf" di form
  Virtual Run. Yang memperparah: pertanyaan upload itu di-set **Wajib diisi**, jadi satu kegagalan
  upload membatalkan **seluruh** pendaftaran — nama, alamat, paket, dan size yang sudah diisi
  ikut hilang. Yang hilang pendaftarnya, bukan cuma lampirannya.
  Mitigasi yang tidak butuh persetujuan siapa pun: matikan **Wajib diisi**, dan matikan
  **"Izinkan hanya jenis file tertentu"** (filter itu menolak HEIC dari iPhone dan tidak
  melindungi apa pun).
- **TinyURL tanpa akun bisa kena halaman cek bot Cloudflare** (lihat §4). Jangan dipakai untuk
  link yang disebar ke publik.
- **`dist.zip` di repo tidak otomatis ikut `npm run build`.** Per 24 Nov 2026 isinya masih build
  **5 November** — tanpa `.htaccess` dan tanpa size chart 10K. Upload zip basi itu ke
  `public_html/` = menayangkan build lama dan 404-nya tetap ada, padahal terasa seperti sudah
  diperbaiki. **Selalu `npm run build` lalu zip ulang sebelum upload**, dan verifikasi dengan
  `unzip -l dist.zip | grep htaccess` — `.htaccess` berawalan titik, paling mudah hilang.
