# Wireframe — Run For Nation

Wireframe tekstual (ASCII) berdasarkan struktur komponen yang sudah ada di kode — bukan mockup
baru. Terakhir diperbarui: 2026-07-11.

---

## 1. Halaman `/` — Desktop

```
┌────────────────────────────────────────────────────────────────────┐
│ RUN FOR NATION      Home  Ketentuan  Size  Pembayaran  Daftar   🌙  │ ← Header (fixed top)
├────────────────────────────────────────────────────────────────────┤
│  🏆 SPIRIT OF CULTURE 2026                                          │
│  RUN FOR                                    ┌──────────────────┐    │
│  NATION                                     │   [poster promo] │    │
│  Fun Race 5K & 10K — Pontianak              │  bannerRunForNa- │    │  ← Home
│  📍 Pontianak  👥 Semua kalangan  🛡 Min.10  │  tionFixs.jpeg   │    │
│  <deskripsi event...>                       └──────────────────┘    │
│  [5K Fun Run] VS [10K Fun Race]                                     │
│  [Lihat Paket]  [Ketentuan]                                         │
├────────────────────────────────────────────────────────────────────┤
│              Ketentuan Pendaftaran Run For Nation                   │
│  ┌────────────┐   ✓ Setujui Regulasi  ✓ Min.10 Tahun  ✓ Cek Kesehatan│  ← About
│  │ [gambar]   │   [Lihat Ketentuan Lengkap]                         │
│  └────────────┘                                                     │
├────────────────────────────────────────────────────────────────────┤
│                        Size Chart  [Dewasa]/[Kids]                  │
│  ┌────────────┐   ┌──────────────────────────────┐                  │  ← Size
│  │ [gambar]   │   │ SIZE | LB | TB  (tabel)       │                  │
│  └────────────┘   └──────────────────────────────┘                  │
├────────────────────────────────────────────────────────────────────┤
│  🎉 Pendaftaran Resmi Dibuka! — Early Bird sudah habis, harga Normal │
│  ┌──────────────────────┐   ┌──────────────────────┐                │
│  │ Fun Run 5K            │   │ Fun Race 10K          │                │  ← Payments
│  │ Tangan Panjang [○──]  │   │ Tangan Panjang [○──]  │                │
│  │ Early Bird ~~165rb~~🔴HABIS│ Early Bird ~~195rb~~🔴HABIS│         │
│  │ Harga Normal  Rp180rb │   │ Harga Normal  Rp225rb │                │
│  │ [Daftar Sekarang→]    │   │ [Daftar Sekarang→]    │                │
│  │ Sudah termasuk: ...   │   │ Sudah termasuk: ...   │                │
│  └──────────────────────┘   └──────────────────────┘                │
├────────────────────────────────────────────────────────────────────┤
│                    Form Pendataan Diri                              │
│  ┌──────────────────────────────────────────────────────┐           │  ← Contact
│  │ (terkunci) 🔒 Pilih paket dulu di Pembayaran           │           │
│  │        — atau —                                       │           │
│  │ [iframe Google Form]  →  [Konfirmasi WA: Meli]         │           │
│  └──────────────────────────────────────────────────────┘           │
├────────────────────────────────────────────────────────────────────┤
│  RUN FOR NATION | Home Ketentuan Size Pendaftaran Pembayaran         │
│  📷 @runfornation.id     Website dibuat oleh [Griya IT Nusantara]    │  ← Footer
│  © 2026 Griya IT Nusantara                                           │
└────────────────────────────────────────────────────────────────────┘
                                                          [↑ scroll-up]  ← pojok kanan-bawah
[🔵 Ahmad Rozi telah membeli tiket 10K]  ×                              ← pojok kiri-bawah
   Run For Nation 2026                                        (BuyerFeedToast, baru)
```

## 2. Halaman `/` — Mobile (≤768px)

```
┌───────────────────────────┐
│ RUN FOR NATION        🌙  │ ← Header tetap di atas saat scroll ke bawah
├───────────────────────────┤
│  🏆 SPIRIT OF CULTURE     │
│  RUN FOR NATION            │
│  Fun Race 5K & 10K         │
│  <deskripsi, dipusatkan>   │
│  ┌───────────────────┐    │
│  │   [poster promo]  │    │
│  └───────────────────┘    │
│  [5K] VS [10K]             │
│  [Lihat Paket]             │
│  [Ketentuan]                │
│  ⋮ (About, Size, Payments,  │
│     Contact — 1 kolom)      │
├───────────────────────────┤
│ [🔵 Ahmad Rozi — 10K]  ×   │ ← BuyerFeedToast, melebar penuh,
│    Run For Nation 2026     │   di atas navbar bawah
├───────────────────────────┤
│  🏠    📋    📏   💳   📝  │ ← Header pindah jadi bottom tab bar
│ Home  Ketentuan Size Bayar Daftar│  (safe-area aware, iPhone notch-safe)
└───────────────────────────┘
```

## 3. Halaman `/payment`

```
┌───────────────────────────────────────┐
│ ← Kembali   RUN FOR NATION             │
│                                         │
│              🎽                        │
│         Detail Pembayaran              │
│         Run For Nation 2026             │
│         [Fun Run 5K]                    │
│                                         │
│  Ringkasan Paket                        │
│  Fun Run 5K ............... Rp180.000   │
│  ─────────────────────────────────      │
│  Total (Harga Normal) ..... Rp180.000   │ ← bukan lagi Early Bird
│                                         │
│  Transfer ke Rekening                   │
│  Bank ......... BSI                     │
│  No. Rekening.. 2024232215              │
│  Atas Nama..... Yahya Organizer         │
│                                         │
│  ℹ Form data diri sudah terbuka...      │
│                                         │
│  [→ Lanjut Isi Form Pendataan Diri]     │
└───────────────────────────────────────┘
```

## 4. Alur Navigasi Fungsional (bukan visual, tapi state)

```
Payments (pilih paket)
   │  klik "Daftar Sekarang"
   ▼
/payment?kategori=X&lengan=Y
   │  useEffect → localStorage.rfn_reg_unlocked = true
   ▼
Contact (kembali ke "/", scroll ke #contact)
   │  baca localStorage → gate terbuka
   ▼
Isi Google Form (iframe) → upload bukti transfer
   │
   ▼
Klik tombol WhatsApp → chat ke Meli dengan pesan pre-filled
```

## 5. Referensi Silang

- Token warna/tipografi dipakai di wireframe ini → `design.md`
- Spesifikasi fungsional tiap elemen → `frd.md`
