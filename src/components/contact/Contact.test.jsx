import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Contact from "./Contact";

const REG_UNLOCK_KEY = "rfn_reg_unlocked";

const renderContact = () =>
  render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>
  );

describe("Contact — gate form pendataan diri", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("menampilkan kartu 'Form Terkunci' jika belum pernah membuka /payment", () => {
    renderContact();
    expect(
      screen.getByText(/form pendataan diri terkunci/i)
    ).toBeInTheDocument();
    expect(screen.queryByTitle(/form pendataan diri run for nation/i)).not.toBeInTheDocument();
  });

  it("membuka form iframe & tombol WA jika localStorage sudah unlocked", () => {
    localStorage.setItem(
      REG_UNLOCK_KEY,
      JSON.stringify({ unlocked: true, kategori: "10K" })
    );
    renderContact();

    expect(
      screen.getByTitle(/form pendataan diri run for nation/i)
    ).toBeInTheDocument();

    const waLink = screen.getByRole("link", { name: /meli/i });
    expect(waLink).toHaveAttribute("href", expect.stringContaining("wa.me/6285393669366"));
    expect(decodeURIComponent(waLink.getAttribute("href"))).toContain(
      "Fun Race 10K dan sudah transfer"
    );
  });

  it("mengabaikan data localStorage yang rusak / bukan JSON valid", () => {
    localStorage.setItem(REG_UNLOCK_KEY, "not-json");
    renderContact();
    expect(
      screen.getByText(/form pendataan diri terkunci/i)
    ).toBeInTheDocument();
  });
});
