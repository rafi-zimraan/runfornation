import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const REG_UNLOCK_KEY = "rfn_reg_unlocked";

/**
 * Status pendaftaran dibaca dari src/config/registration.js, jadi tiap test
 * memuat ulang komponen dengan nilai flag yang diinginkan.
 */
const renderContact = async (closed) => {
  vi.resetModules();
  vi.doMock("../../config/registration", async () => {
    const actual = await vi.importActual("../../config/registration");
    return { ...actual, IS_REGISTRATION_CLOSED: closed };
  });
  const { default: Contact } = await import("./Contact");
  return render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>
  );
};

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  vi.doUnmock("../../config/registration");
  vi.resetModules();
});

describe("Contact — pendaftaran DITUTUP (status produksi saat ini)", () => {
  it("menampilkan kartu 'Pendaftaran Ditutup' + ucapan terima kasih, bukan kartu 'Form Terkunci'", async () => {
    await renderContact(true);

    expect(screen.getByText(/pendaftaran ditutup/i)).toBeInTheDocument();
    expect(
      screen.getByText(/terima kasih sebesar-besarnya kepada seluruh pelari/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/form pendataan diri terkunci/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTitle(/form pendataan diri run for nation/i)
    ).not.toBeInTheDocument();
  });

  it("tetap membuka form untuk peserta yang sudah melewati halaman pembayaran", async () => {
    localStorage.setItem(
      REG_UNLOCK_KEY,
      JSON.stringify({ unlocked: true, kategori: "10K" })
    );
    await renderContact(true);

    expect(
      screen.getByTitle(/form pendataan diri run for nation/i)
    ).toBeInTheDocument();
    expect(screen.queryByText(/pendaftaran ditutup/i)).not.toBeInTheDocument();
  });

  it("mengarahkan pendaftar baru ke WhatsApp panitia", async () => {
    await renderContact(true);
    const waLink = screen.getByRole("link", { name: /hubungi panitia/i });
    expect(waLink).toHaveAttribute(
      "href",
      expect.stringContaining("wa.me/6285393669366")
    );
  });
});

describe("Contact — gate form pendataan diri (saat pendaftaran dibuka)", () => {
  it("menampilkan kartu 'Form Terkunci' jika belum pernah membuka /payment", async () => {
    await renderContact(false);
    expect(
      screen.getByText(/form pendataan diri terkunci/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByTitle(/form pendataan diri run for nation/i)
    ).not.toBeInTheDocument();
  });

  it("membuka form iframe & tombol WA jika localStorage sudah unlocked", async () => {
    localStorage.setItem(
      REG_UNLOCK_KEY,
      JSON.stringify({ unlocked: true, kategori: "10K" })
    );
    await renderContact(false);

    expect(
      screen.getByTitle(/form pendataan diri run for nation/i)
    ).toBeInTheDocument();

    const waLink = screen.getByRole("link", { name: /meli/i });
    expect(waLink).toHaveAttribute(
      "href",
      expect.stringContaining("wa.me/6285393669366")
    );
    expect(decodeURIComponent(waLink.getAttribute("href"))).toContain(
      "Fun Race 10K dan sudah transfer"
    );
  });

  it("mengabaikan data localStorage yang rusak / bukan JSON valid", async () => {
    localStorage.setItem(REG_UNLOCK_KEY, "not-json");
    await renderContact(false);
    expect(
      screen.getByText(/form pendataan diri terkunci/i)
    ).toBeInTheDocument();
  });
});
