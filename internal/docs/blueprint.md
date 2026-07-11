# Blueprint — Run For Nation

Gambaran arsitektur teknis menyeluruh: bagaimana semua bagian sistem saling terhubung.
Terakhir diperbarui: 2026-07-11.

---

## 1. Diagram Arsitektur (tekstual)

```
┌─────────────────────────────────────────────────────────────────┐
│                        BROWSER PENGUNJUNG                        │
│                                                                   │
│   React SPA (Vite build, hosted di GitHub Pages)                 │
│   ┌───────────────────────────────────────────────────────┐     │
│   │ App.jsx (router + Facebook Pixel init)                  │     │
│   │  ├─ Header (nav + dark/light toggle)                    │     │
│   │  ├─ "/" → Home, About, Size, Payments, Contact           │     │
│   │  ├─ "/payment" → PaymentDetail                          │     │
│   │  ├─ Footer                                              │     │
│   │  ├─ ScrollUp                                             │     │
│   │  └─ BuyerFeedToast  ───────────────┐                    │     │
│   └────────────────────────────────────┼────────────────────┘     │
│                                        │                          │
└────────────────────────────────────────┼──────────────────────────┘
                                         │ fetch CSV (public, read-only)
                                         ▼
                     ┌───────────────────────────────────────┐
                     │   Google Sheet "Public Feed" (published)│
                     │   kolom: Nama, Kategori — TIDAK ADA PII │
                     └───────────────────────────────────────┘
                                         ▲
                                         │ auto-terisi dari
                                         │ (copy manual / formula)
                     ┌───────────────────────────────────────┐
                     │  Google Sheet "Form Responses 1"        │
                     │  (mentah, berisi NIK/alamat/no.HP/dll)  │
                     │  TIDAK PERNAH dipublish ke web           │
                     └───────────────────────────────────────┘
                                         ▲
                                         │ submit
                     ┌───────────────────────────────────────┐
                     │   Google Form (embed iframe di Contact) │
                     └───────────────────────────────────────┘

   Alur registrasi terpisah (tidak melalui backend sendiri):
   Payments (pilih paket) → PaymentDetail (lihat total & rekening,
   set localStorage rfn_reg_unlocked) → Contact (form terbuka,
   isi data) → konfirmasi manual via WhatsApp ke panitia
```

**Poin penting:** Tidak ada backend/server milik sendiri. Semua "backend" adalah layanan pihak ketiga (Google Form/Sheets, WhatsApp manual, GitHub Pages static hosting). Ini menyederhanakan operasional tapi juga berarti **kontrol keamanan data sepenuhnya bergantung pada konfigurasi Google Sheets**, bukan kode aplikasi (lihat `security.md`).

---

## 2. Lapisan Sistem

### 2.1 Presentation Layer (React SPA)
Semua komponen di `src/components/`. Tidak ada state management global — state lokal (`useState`) + `localStorage` untuk gate form pendataan diri (`rfn_reg_unlocked`) dan preferensi tema (`rfn_theme`), serta `sessionStorage` untuk dismiss widget notifikasi (`rfn_buyer_feed_dismissed`).

### 2.2 Data Layer (eksternal, tanpa autentikasi)
- **Google Form** — satu-satunya jalur input data pendaftar. Tidak ada validasi/keamanan tambahan dari sisi aplikasi; sepenuhnya mengandalkan validasi bawaan Google Form.
- **Google Sheet (mentah)** — linked response sheet, berisi seluruh kolom termasuk PII (NIK, alamat, no. HP, kontak darurat). **Wajib tidak pernah dipublikasikan ke web** (lihat insiden di `security.md` § 2).
- **Google Sheet "Public Feed"** — sheet turunan berisi hanya kolom Nama + Kategori, hasil copy/formula dari sheet mentah. Ini satu-satunya sumber data yang boleh di-publish & di-fetch oleh frontend.

### 2.3 Notification Widget (BuyerFeedToast)
`src/components/notifications/BuyerFeedToast.jsx` — fetch CSV dari `Public Feed` setiap 2 menit, tampilkan satu nama+kategori bergantian tiap 5 detik dalam toast di pojok kiri-bawah. Fail-silent bila fetch gagal atau URL belum diisi (tidak pernah menyebabkan crash halaman).

### 2.4 Deployment Layer
GitHub Actions (`.github/workflows/deploy.yml`) build project via `npm run build` lalu deploy hasil `dist/` ke GitHub Pages setiap push ke `main`. Alternatif manual: `dist.zip` untuk upload ke shared hosting/cPanel.

---

## 3. Keputusan Arsitektur Kunci

| Keputusan | Alasan |
|---|---|
| Tidak ada backend sendiri | Event musiman, tim kecil, prioritas kecepatan rilis di atas kontrol penuh — Google Form/Sheets cukup untuk skala ~300-1500 pendaftar |
| Harga disimpan terpisah di 2 file (`Payments.jsx` & `PaymentDetail.jsx`) | Konsekuensi dari tidak adanya shared config/API — trade-off yang diterima untuk project sekecil ini, tapi wajib diubah bersamaan (lihat `CLAUDE.md`) |
| Gate form via `localStorage`, bukan server-side session | Tidak ada backend untuk menyimpan session; localStorage cukup untuk UX "harus lihat halaman pembayaran dulu" tanpa perlu keamanan ketat (bukan data sensitif) |
| Widget notifikasi fetch CSV publik, bukan API privat | Tidak ada backend untuk proxy request — konsekuensinya keamanan data 100% bergantung pada sheet mana yang dipublikasikan (lihat `security.md`) |

---

## 4. Referensi Silang

- Detail fitur & status terkini → `PLAN.md`
- Kebutuhan produk & metrik sukses → `prd.md`
- Justifikasi bisnis & aturan harga/kuota → `brd.md`
- Spesifikasi fungsional detail per fitur → `frd.md`
- Kebijakan & insiden keamanan → `security.md`
- Design system & tampilan → `design.md`
- Wireframe halaman → `wireframe.md`
