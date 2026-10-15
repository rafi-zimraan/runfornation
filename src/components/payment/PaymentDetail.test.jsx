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

  it("menampilkan total Rp180.000 untuk 5K (harga Normal, bukan Early Bird)", () => {
    renderAt("/payment?kategori=5K");
    expect(screen.getByText("Total (Harga Normal)")).toBeInTheDocument();
    // muncul 2x: baris ringkasan paket & baris total (sama karena tanpa addon)
    expect(screen.getAllByText("Rp180.000")).toHaveLength(2);
    expect(screen.queryByText("Rp165.000")).not.toBeInTheDocument();
  });

  it("menampilkan total Rp225.000 untuk 10K tanpa baris tambahan lengan panjang", () => {
    renderAt("/payment?kategori=10K");
    // muncul 2x: baris ringkasan paket & baris total
    expect(screen.getAllByText("Rp225.000")).toHaveLength(2);
    expect(screen.queryByText("Jersey Lengan Panjang")).not.toBeInTheDocument();
    expect(screen.queryByText("+Rp10.000")).not.toBeInTheDocument();
  });

  it("mengabaikan parameter lengan dari link lama (tidak menambah Rp10.000)", () => {
    renderAt("/payment?kategori=10K&lengan=panjang");
    expect(screen.queryByText("Rp235.000")).not.toBeInTheDocument();
    expect(screen.getAllByText("Rp225.000")).toHaveLength(2);
  });

  it("membuka gate form pendataan diri di localStorage saat halaman dibuka", () => {
    renderAt("/payment?kategori=10K");
    const stored = JSON.parse(localStorage.getItem("rfn_reg_unlocked"));
    expect(stored.unlocked).toBe(true);
    expect(stored.kategori).toBe("10K");
    expect(stored.lengan).toBeUndefined();
  });

  it("default ke kategori 5K jika parameter kategori tidak dikenal", () => {
    renderAt("/payment?kategori=UNKNOWN");
    expect(screen.getAllByText("Rp180.000")).toHaveLength(2);
  });
});
