import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PaymentDetail from "./PaymentDetail";

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <PaymentDetail />
    </MemoryRouter>
  );

describe("PaymentDetail — total transfer harus pakai harga Normal (Early Bird habis)", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("menampilkan total Rp180.000 untuk 5K tanpa tangan panjang (harga Normal, bukan Early Bird)", () => {
    renderAt("/payment?kategori=5K&lengan=pendek");
    expect(screen.getByText("Total (Harga Normal)")).toBeInTheDocument();
    // muncul 2x: baris ringkasan paket & baris total (sama karena tanpa addon)
    expect(screen.getAllByText("Rp180.000")).toHaveLength(2);
    expect(screen.queryByText("Rp165.000")).not.toBeInTheDocument();
  });

  it("menampilkan total Rp235.000 untuk 10K + tangan panjang (225.000 + 10.000)", () => {
    renderAt("/payment?kategori=10K&lengan=panjang");
    expect(screen.getByText("Rp235.000")).toBeInTheDocument();
    expect(screen.getByText("Jersey Tangan Panjang")).toBeInTheDocument();
  });

  it("membuka gate form pendataan diri di localStorage saat halaman dibuka", () => {
    renderAt("/payment?kategori=10K&lengan=panjang");
    const stored = JSON.parse(localStorage.getItem("rfn_reg_unlocked"));
    expect(stored.unlocked).toBe(true);
    expect(stored.kategori).toBe("10K");
    expect(stored.lengan).toBe("panjang");
  });

  it("default ke kategori 5K jika parameter kategori tidak dikenal", () => {
    renderAt("/payment?kategori=UNKNOWN");
    expect(screen.getAllByText("Rp180.000")).toHaveLength(2);
  });
});
