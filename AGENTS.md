# AGENTS.md

Titik masuk untuk semua AI coding agent di repo ini (Claude Code, Codex, Cursor, dsb.).
Berlaku untuk seluruh isi repo.

Website landing page event **Run For Nation: Spirit of Culture 2026** — React 18 + Vite 4,
one-page + halaman `/payment`. Bahasa jawaban ke pemilik repo: **Indonesia**.

## Baca dulu, sesuai kebutuhan

| File | Isinya | Kapan dibaca |
|---|---|---|
| [`CLAUDE.md`](CLAUDE.md) | Struktur kode, konvensi, perintah, cara kerja fitur | **Selalu**, sebelum mengubah kode |
| [`KNOWLEDGE.md`](KNOWLEDGE.md) | Fakta event: harga, link, form, orang, hosting, jebakan | Sebelum menyentuh angka, link, atau konten |
| [`MEMORY.md`](MEMORY.md) | Keputusan bertanggal + alasannya | Saat sesuatu terlihat aneh/tidak efisien — biasanya ada alasannya |
| [`internal/docs/security.md`](internal/docs/security.md) | Kebijakan data pribadi + riwayat insiden nyata | **Wajib** sebelum menyentuh CSV / Google Sheets / data peserta |

## Perintah

```bash
npm run dev      # dev server, localhost:5173
npm test         # Vitest sekali jalan (CI mode)
npm run build    # production build ke dist/
```

Jalankan `npm test` setelah mengubah harga, status pendaftaran, atau gate form — tiga hal itu
punya test sendiri.

## Aturan yang tidak boleh dilanggar

1. **Harga ada di dua file.** `src/components/payment/Payments.jsx` (`PACKAGES`) dan
   `src/components/payment/PaymentDetail.jsx` (`PRICES`). Ubah **keduanya**, selalu. Angka ini
   yang dilihat dan ditransfer peserta.
2. **Status pendaftaran punya satu saklar:** `src/config/registration.js`. Jangan menambah flag
   baru di komponen.
3. **Jangan pernah memakai link CSV sheet respons mentah.** Hanya sheet turunan berisi kolom
   publik. Periksa header kolomnya sebelum dipakai. Repo ini punya riwayat kebocoran data nyata.
4. **Push ≠ live.** Domain `runfornation.my.id` ada di DomaiNesia, bukan GitHub Pages. Perubahan
   baru tayang setelah `dist/` diupload manual. Jangan melaporkan sesuatu sudah live tanpa itu.
5. **Jangan mengarang angka, tanggal, nomor rekening, atau link.** Kalau tidak ada di
   `KNOWLEDGE.md` atau di kode — tanya.
6. **`dist/` dan `dist.zip` hasil build** — jangan diedit manual.

## Hal yang terlihat salah tapi disengaja

- Halaman `/payment` tetap bisa dibuka via URL langsung walau pendaftaran ditutup (untuk peserta
  yang sudah terlanjur transfer). **Catatan 20 Nov 2026:** di server live path ini justru 404
  karena tidak ada SPA fallback. Lihat `KNOWLEDGE.md` §9 sebelum mengubahnya.
- `public/.htaccess` bukan sisa konfigurasi. Isinya short link `/RFNVirtual` ke Google Form
  Virtual Run. Jangan dihapus, dan jangan pakai TinyURL sebagai gantinya.
- Peserta yang punya `rfn_reg_unlocked` di localStorage tetap bisa mengisi form walau pendaftaran
  ditutup.
- `public/sizechart-10k-oranye.jpg` tidak dipakai website — hanya agar punya URL publik untuk
  Google Form.

Selengkapnya: `KNOWLEDGE.md` §9.

## Di luar repo

Ada lini kedua, **RFN Virtual Run Challenge 10K**, yang seluruhnya berjalan di Google Form —
tidak ada kodenya di sini. Permintaan soal "form" atau "link pendaftaran" bisa mengarah ke sana.
Lihat `KNOWLEDGE.md` §3–§4.
