# Security — Run For Nation

Dokumen kebijakan keamanan data. Level prioritas: **TINGGI** — project ini menangani data pribadi
real (NIK, alamat, nomor HP) dari ratusan peserta event, jadi kebocoran bukan risiko teoretis.

Terakhir diperbarui: 2026-07-11.

---

## 1. Klasifikasi Data

| Level | Data | Contoh field | Boleh publik? |
|---|---|---|---|
| **Kritis** | Identitas resmi & finansial | NIK, bukti transfer/pembayaran | **TIDAK — tidak pernah** |
| **Sensitif** | Kontak & data pribadi | No. HP peserta, no. HP kontak darurat, alamat domisili, tanggal lahir, golongan darah | **TIDAK — tidak pernah** |
| **Terbatas** | Identitas dasar | Nama lengkap, email | Hanya jika ada tujuan spesifik & terbatas (mis. nama untuk widget notifikasi) |
| **Publik** | Data event, bukan personal | Kategori lomba (5K/10K), jumlah total pendaftar, harga paket | Boleh |

Aturan dasar: **default tertutup**. Setiap kolom baru yang ditambahkan ke Google Form harus dianggap Sensitif sampai dinyatakan sebaliknya secara eksplisit.

---

## 2. Insiden yang Ditemukan (2026-07-11)

**Apa yang terjadi:** Sheet respons Google Form (`Form Responses 1`) dipublikasikan ke web sebagai CSV
dengan opsi **"Seluruh dokumen"**, sehingga seluruh kolom — termasuk **NIK, tanggal lahir, alamat
domisili, golongan darah, nomor WhatsApp peserta, nama & nomor WhatsApp kontak darurat, dan link
bukti transfer** — dapat diakses publik oleh siapa saja yang memiliki link tersebut, tanpa login.

**Dampak:** ~299 baris data pendaftar asli (bukan data uji) berpotensi terekspos, termasuk data
pihak ketiga (kontak darurat) yang bahkan tidak pernah mengisi form itu sendiri.

**Cara ditemukannya:** Ditemukan saat proses pengembangan fitur widget notifikasi "pembeli
terbaru", ketika link CSV publikasi diminta untuk keperluan development dan diperiksa isinya
sebelum dipakai di kode.

**Remediasi yang diminta ke pemilik project (aksi manual di Google Sheets, bukan di kode):**
1. Buka dialog "Publikasikan di web" pada spreadsheet respons → **Batalkan publikasi** untuk
   sheet mentah (`Form Responses 1`) segera.
2. Buat sheet turunan baru (`Public Feed`) berisi **hanya** kolom Nama + Kategori (copy manual
   atau formula `ARRAYFORMULA`, bukan seluruh dokumen).
3. Publikasikan **sheet turunan itu saja** (bukan "Seluruh dokumen") sebagai CSV, dan hanya link
   inilah yang boleh dipakai di `BuyerFeedToast.jsx`.

**Status (update 2026-07-11):**
- Langkah 2–3 **sudah selesai** — sheet turunan `Public Feed` (gid `1413171820`) sudah dibuat
  (kolom Nama + Kategori via `ARRAYFORMULA`), sudah diverifikasi isinya (299 baris, tidak ada
  NIK/alamat/no. HP) sebelum dipasang ke `BuyerFeedToast.jsx`.
- Langkah 1 (**batalkan publikasi sheet mentah `Form Responses 1`, gid `226105680`**) **belum
  dikonfirmasi selesai**. Sheet mentah kemungkinan masih published terpisah dari `Public Feed` —
  ini tetap harus dicabut oleh pemilik akun Google, di luar kendali kode/AI agent.

**Pelajaran untuk ke depan:** Lihat § 3 "Aturan Wajib" agar insiden serupa tidak terulang saat
menambah fitur baru yang butuh data dari Google Sheets.

---

## 3. Aturan Wajib untuk Publish Google Sheets ke Web

Aturan ini berlaku permanen untuk project ini, tidak hanya untuk insiden di atas:

1. **Jangan pernah** memilih "Seluruh dokumen" saat Publish to Web pada sheet yang berisi data
   respons form asli.
2. **Selalu** buat sheet turunan khusus untuk data yang memang ditujukan untuk konsumsi publik
   (mis. widget notifikasi), berisi kolom paling minimal yang dibutuhkan — bukan lebih.
3. **Sebelum** menambahkan link CSV baru ke kode manapun, unduh & periksa dulu header kolomnya
   (lihat pola verifikasi di § 5) untuk memastikan tidak ada kolom sensitif ikut terbawa.
4. **Jangan** menaruh kolom seperti NIK, nomor HP, alamat, tanggal lahir, golongan darah, atau
   link bukti pembayaran di sheet manapun yang berstatus "dipublikasikan ke web" — titik.
5. Kolom timestamp boleh disertakan di sheet publik (tidak sensitif), tapi tidak wajib.

---

## 4. Mengapa Ini Berbeda dari "Link yang Cuma Perlu Dijaga Rahasia"

Kesalahan umum: menganggap "asal linknya tidak disebar, aman". Ini **tidak berlaku** begitu link
CSV tersebut dipakai di kode frontend (`fetch(url)` di `BuyerFeedToast.jsx`):

- Setiap pengunjung situs otomatis meng-fetch link itu di browser mereka.
- Link itu langsung terlihat di tab **Network** DevTools browser — bisa dibuka siapa saja yang
  klik kanan → Inspect, tanpa keahlian teknis khusus.
- Artinya begitu link dipakai di kode, link itu **efektif menjadi publik ke semua pengunjung**,
  bukan lagi "rahasia yang kebetulan bisa ditebak siapa saja yang tahu URL-nya".

Karena itu, satu-satunya jaminan keamanan yang valid adalah: **sheet yang dipublikasikan memang
hanya berisi data yang sudah kita putuskan aman untuk dilihat semua orang** — bukan mengandalkan
kerahasiaan link.

---

## 5. Checklist Keamanan Berkelanjutan

- [ ] Sheet respons mentah (`Form Responses 1`) **tidak** berstatus "Dipublikasikan" — cek berkala
- [ ] Hanya sheet `Public Feed` (Nama + Kategori) yang berstatus published
- [ ] Sebelum commit link CSV baru ke kode: unduh & cek header kolomnya dulu (`curl -sL <url> | head -1`)
- [ ] Dependency produksi (`npm audit --omit=dev`) menunjukkan **0 kerentanan** — cek tiap kali
      menambah/mengubah dependency (lihat `techstack.md` § 4 soal `react-router-dom`)
- [ ] Tidak ada API key, token, atau kredensial ter-hardcode di kode manapun (project ini tidak
      butuh API key eksternal apapun — kalau suatu saat ditambahkan, wajib pakai env variable,
      bukan hardcode)
- [ ] Semua form/embed pihak ketiga (Google Form iframe) memakai HTTPS
- [ ] `.gitignore` mencegah `.env`/kredensial ter-commit — catatan: `node_modules` & `dist` di
      repo ini justru **sudah tercatat di git** meski ada di `.gitignore` (ditambahkan sebelum
      `.gitignore` dibuat) — bukan risiko keamanan data pribadi, tapi tetap tidak ideal untuk
      ukuran repo; tidak diubah dalam sesi ini karena di luar scope yang diminta

---

## 6. Rencana Jika Terjadi Kebocoran (Incident Response)

Jika suatu saat ditemukan data sensitif (NIK/no.HP/alamat) benar-benar sempat/sedang bocor publik:

1. **Segera** batalkan publikasi sheet yang bersangkutan (Publish to Web → Batalkan publikasi).
   Ini menghentikan akses baru, meski salinan yang sudah terlanjur diunduh pihak lain tidak bisa
   ditarik kembali.
2. Ganti/rotasi data yang bisa diganti jika relevan (mis. jika ada password/token yang ikut bocor
   — untuk project ini tidak ada, karena tidak ada kredensial di alur manapun).
3. Informasikan ke peserta terdampak jika kebocoran sempat live dalam durasi signifikan —
   terutama karena NIK adalah data kependudukan resmi (perlindungan berdasarkan UU PDP).
4. Audit ulang seluruh link Google Sheets/Form terkait project untuk memastikan tidak ada sheet
   lain dengan kesalahan setelan publish yang sama.
5. Dokumentasikan insiden (seperti § 2 di atas) agar ada jejak dan pelajaran untuk ke depan.

---

## 7. Kerentanan Dependency (Software Supply Chain)

- Production dependency saat ini: **0 kerentanan diketahui** (`npm audit --omit=dev`).
- `react-router-dom` dikunci minimum `6.30.4` karena versi di bawahnya rentan XSS via open
  redirect (GHSA-2w69-qvjg-hvjx). Jangan downgrade.
- Kerentanan yang tersisa (`npm audit` tanpa `--omit=dev`) seluruhnya ada di **tool build/test**
  (Vite/Vitest/Rollup internals) — tidak ikut ter-bundle ke output production, jadi tidak
  berdampak ke pengunjung situs. Tetap baik untuk dipantau berkala via `npm audit`.

---

## 8. Referensi Silang

- Alur data end-to-end → `blueprint.md`
- Spesifikasi fungsional widget notifikasi → `frd.md`
- Checklist QA umum (bukan khusus keamanan) → `TESTING_CHECKLIST.md`
