# Design System — Run For Nation

Diambil langsung dari token yang benar-benar didefinisikan di `src/App.css` — bukan usulan baru.
Terakhir diperbarui: 2026-07-11.

---

## 1. Warna

### Brand Blues
| Token | Hex | Pemakaian |
|---|---|---|
| `--blue-950` | `#020817` | Background gradient tergelap (PaymentDetail) |
| `--blue-900` | `#0A1540` | Teks utama mode terang, gradient |
| `--blue-800` | `#0F1F6B` | Gradient PaymentDetail |
| `--blue-700` | `#1530A0` | Hover state |
| `--blue-600` | `#1B3CC0` | Warna aksen utama (kategori 5K, tombol primer) |
| `--blue-500` | `#2D55E0` | |
| `--blue-400` | `#5578F0` | |
| `--blue-200` | `#C7D2FE` | |
| `--blue-100` | `#EEF2FF` | Surface sekunder mode terang |
| `--blue-50`  | `#F5F7FF` | Background mode terang |

### Gold (aksen)
| Token | Hex | Pemakaian |
|---|---|---|
| `--gold` | `#F5CC00` | CTA utama, highlight teks ("NATION"), badge OPEN NOW |
| `--gold-dark` | `#C9A800` | |
| `--gold-light` | `#FFF59D` | |

### Utility
| Token | Hex | Pemakaian |
|---|---|---|
| `--red` | `#D42020` | Warna aksen kategori 10K, badge "Habis", peringatan |
| `--white` / `--black` | `#FFFFFF` / `#0A0A0A` | |

### Semantic (berubah sesuai tema)
| Token | Light | Dark |
|---|---|---|
| `--bg` | `--blue-50` | `#080D24` |
| `--surface` | `--white` | `#0F1635` |
| `--surface-2` | `--blue-100` | `#1A234A` |
| `--border` | `rgba(15,31,107,.1)` | `rgba(245,204,0,.10)` |
| `--text` | `--blue-900` | `#DDE3FF` |
| `--text-muted` | `#4A5C8A` | `rgba(221,227,255,.5)` |

Kategori punya warna tetap terlepas dari tema: **5K = biru (`#1B3CC0`)**, **10K = merah (`#D42020`)** — konsisten dipakai di Payments, PaymentDetail, dan widget notifikasi (`BuyerFeedToast`).

## 2. Tipografi

- **Font:** Poppins (Google Fonts), fallback `sans-serif`. Weight 300–900 dimuat.
- **Skala ukuran** (`--fs-*`): `xs` 0.75rem → `7xl` 4.5rem, 11 tingkat. Skala non-linear, dioptimalkan untuk hero text besar (`--fs-7xl`) turun ke `2.5rem` di mobile (≤480px).

## 3. Spacing, Radius, Shadow

- **Border radius:** `sm` 8px, `md` 12px, `lg` 16px, `xl` 24px, `full` 9999px (pill).
- **Shadow:** `xs`/`sm`/`md`/`lg` untuk elevasi umum; `shadow-gold` & `shadow-blue` khusus untuk elemen branded (tombol CTA, scroll-up).
- **Transisi:** `--ease` cubic-bezier(0.4,0,0.2,1), durasi `fast` 150ms / `base` 250ms / `slow` 400ms.

## 4. Layout & Z-index

- `--header-h: 4rem` — dipakai untuk offset padding-top konten & perhitungan posisi elemen fixed-bottom di mobile.
- Z-index: `above` 10 (scroll-up, buyer toast), `fixed` 100 (header), `modal` 1000 (modal ketentuan).

## 5. Komponen — Pola yang Sudah Ada

| Pola | Contoh pemakaian |
|---|---|
| Card dengan accent stripe atas | Kartu paket harga (Payments) |
| Badge pill kecil, uppercase, letter-spacing 0.07em | "Early Bird", "Habis", "Most Popular" |
| Toggle switch custom (bukan native checkbox styling) | "Tangan Panjang" di Payments |
| Toast/card fixed-position dengan fade+slide | Scroll-up button, **BuyerFeedToast (baru)** |
| Modal fullscreen-overlay dengan close icon pojok | Modal ketentuan lengkap (About) |
| Bottom sheet drawer (mobile nav) | `.nav__menu` di ≤768px |

## 6. Spesifikasi Desain: BuyerFeedToast (fitur baru)

```
┌──────────────────────────────────────────┐
│  ●●    Ahmad Rozi telah membeli tiket 10K │  ×
│  ✓     Run For Nation 2026                │
└──────────────────────────────────────────┘
```

- **Posisi:** fixed, kiri-bawah (`left: 1.5rem; bottom: 2rem`), desktop. Mobile: melebar penuh
  (`left/right: 1rem`), naik ke atas navbar bottom-fixed (`bottom: calc(var(--header-h) + env(safe-area-inset-bottom) + 1rem)`).
- **Ikon:** lingkaran 2.25rem, warna solid sesuai kategori (biru/merah), ikon check `uil-check-circle`.
- **Tipografi teks:** `--fs-sm`, nama & kategori bold, kategori diwarnai sesuai warna kategori.
- **Sub-label:** `--fs-xs`, `--text-muted`, "Run For Nation 2026".
- **Animasi:** fade + translateY(0.75rem → 0), durasi `--t-base`, dinonaktifkan penuh saat `prefers-reduced-motion: reduce`.
- **Interaksi:** tombol × pojok kanan menutup permanen untuk sesi browser berjalan (`sessionStorage`).
- **Rasionalisasi posisi kiri-bawah:** tombol scroll-up sudah menempati pojok kanan-bawah; kiri-bawah menghindari tumpang tindih dan tetap dalam "zona aman" ibu jari untuk mobile.

## 7. Dark/Light Mode

Dikendalikan via atribut `data-theme` pada `<body>` (`Toogle.jsx`), bukan `prefers-color-scheme`
otomatis — user punya kontrol eksplisit, preferensi tersimpan di `localStorage["rfn_theme"]`.
Default: **dark**.

## 8. Referensi Silang

- Wireframe/layout halaman → `wireframe.md`
- Spesifikasi fungsional widget → `frd.md` § FR-4
