# Roadmap — Run For Nation

Terakhir diperbarui: 2026-07-11. Prioritas & tanggal masih perlu dikonfirmasi bersama panitia —
dokumen ini usulan berbasis kondisi kode & data saat ini.

---

## Fase 0 — Selesai (2026-07-11)

- [x] Ganti gambar promo/logo ke `bannerRunForNationFixs.jpeg`
- [x] Early Bird resmi ditandai habis: harga Normal jadi tampilan utama, total transfer di `/payment` diperbaiki dari `earlyBird` → `normal`
- [x] Upgrade `CLAUDE.md` agar sesuai kondisi kode terkini
- [x] Setup unit testing (Vitest + Testing Library), 19 test lulus
- [x] Bersihkan folder/aset/dependency tidak terpakai (`work/`, gambar orphan, `emailjs-*`)
- [x] Patch kerentanan keamanan `react-router-dom` (XSS open-redirect)
- [x] Perbaiki grid Size Chart yang tidak responsif di mobile
- [x] Tuning iOS/Android: safe-area, `apple-touch-icon`, `theme-color`, lazy-load gambar
- [x] Widget notifikasi pembeli (`BuyerFeedToast`) — kode & test selesai
- [x] **Ditemukan & dilaporkan:** insiden publish sheet respons mentah ke web (lihat `security.md`) — remediasi menunggu aksi manual pemilik akun Google

## Fase 1 — Menunggu Aksi Manual (blocking)

- [ ] **Batalkan publikasi sheet respons mentah** (`Form Responses 1`, gid `226105680`) di Google Sheets — **masih outstanding**, prioritas tertinggi (lihat `security.md` § 2). Sheet `Public Feed` sudah aman, tapi sheet mentahnya kemungkinan masih published terpisah dan tetap perlu dicabut.
- [x] Buat & publish sheet turunan `Public Feed` (Nama + Kategori, via `ARRAYFORMULA`) — selesai 2026-07-11
- [x] Isi `BUYER_FEED_CSV_URL` di `BuyerFeedToast.jsx` dengan link `Public Feed` yang sudah diverifikasi aman — selesai 2026-07-11
- [x] Verifikasi widget tampil benar di browser dengan data sungguhan — selesai 2026-07-11

## Fase 2 — Peningkatan Jangka Pendek

- [ ] Kompres gambar di `assets/Runners/` ke WebP/AVIF (terutama `bannerRunForNationFixs.jpeg` 368K & `ukuranbajurunfornation.jpeg` 169K)
- [ ] Tambahkan `npm test` ke GitHub Actions (`.github/workflows/deploy.yml`) supaya build gagal jika ada test yang rusak
- [ ] Uji nyata di perangkat iOS/Android fisik (bukan cuma review kode & breakpoint CSS)
- [ ] Tambahkan consent/pemberitahuan di form pendaftaran bahwa nama & kategori berpotensi tampil di widget publik (lihat `brd.md` § 7)

## Fase 3 — Peningkatan Jangka Menengah

- [ ] Formula auto-update untuk `Public Feed` (`ARRAYFORMULA`) supaya tidak perlu copy-paste manual tiap ada pendaftar baru
- [ ] Reaktifkan pengecekan kuota peserta otomatis jika panitia butuh batas keras jumlah pendaftar
- [ ] Tambah metrik konversi (klik "Daftar Sekarang" → submit form) — perlu keputusan tools (mis. event Facebook Pixel custom, atau Google Analytics)
- [ ] Konsolidasi sumber harga (`Payments.jsx` & `PaymentDetail.jsx`) ke satu file konstanta bersama, supaya tidak ada risiko dua tempat tidak sinkron

## Fase 4 — Musiman (setiap event baru)

- [ ] Update semua string tahun "2026" → tahun event berikutnya
- [ ] Reset widget notifikasi & sheet `Public Feed` ke data kosong untuk gelombang pendaftaran baru
- [ ] Review ulang `security.md` checklist sebelum publish sheet manapun untuk musim baru

---

## Dependensi Antar Fase

```
Fase 0 (selesai)
   │
   ▼
Fase 1 (blocking — butuh aksi pemilik akun Google, bukan kode)
   │
   ▼
Fase 2 ──┬── Fase 3 (bisa paralel setelah Fase 1 selesai)
         │
         ▼
      Fase 4 (berulang tiap musim)
```

## Referensi Silang

- Status detail & known issues → `PLAN.md`
- Kriteria fitur & metrik sukses → `prd.md`
- Insiden keamanan yang memblokir Fase 1 → `security.md`
