/**
 * Status pendaftaran Run For Nation 2026 — SATU SUMBER KEBENARAN.
 *
 * Dipakai oleh:
 *  - src/components/payment/Payments.jsx            (tombol CTA + banner di section Tiket)
 *  - src/components/contact/Contact.jsx             (kartu pengganti form pendataan diri)
 *  - src/components/registration/RegistrationClosedLayer.jsx (layer/overlay sitewide)
 *
 * Cara MEMBUKA pendaftaran lagi: ubah IS_REGISTRATION_CLOSED ke false.
 * Cukup di file ini saja — semua komponen di atas ikut berubah.
 */
export const IS_REGISTRATION_CLOSED = true;

export const REGISTRATION_CLOSED_TITLE = "Pendaftaran Ditutup";

/** Ucapan terima kasih untuk semua yang sudah mendaftar. */
export const REGISTRATION_THANKS =
  "Terima kasih sebesar-besarnya kepada seluruh pelari yang telah mendaftar Run For Nation 2026 — Spirit of Culture. Antusiasme dan dukungan Anda luar biasa. Sampai jumpa di garis start!";

/** Catatan untuk peserta yang sudah transfer tapi belum menyelesaikan pendataan diri. */
export const REGISTRATION_CLOSED_NOTE =
  "Sudah transfer tapi belum mengisi form pendataan diri? Data Anda tetap kami proses — silakan hubungi panitia via WhatsApp agar dibantu sampai selesai.";

/** Kontak panitia (Meli) untuk konfirmasi & bantuan pendaftaran. */
export const REGISTRATION_WA = {
  name: "Meli",
  phone: "6285393669366",
  text: "Halo kak Meli, saya ingin bertanya soal pendaftaran Run For Nation 2026.",
};

export const REGISTRATION_WA_URL = `https://wa.me/${
  REGISTRATION_WA.phone
}?text=${encodeURIComponent(REGISTRATION_WA.text)}`;
