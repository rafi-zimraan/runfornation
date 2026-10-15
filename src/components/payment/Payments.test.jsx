import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Payments from "./Payments";

const renderPayments = () =>
  render(
    <MemoryRouter>
      <Payments />
    </MemoryRouter>
  );

describe("Payments — harga & Early Bird sold out", () => {
  it("menampilkan harga Normal sebagai harga utama untuk tiap kategori", () => {
    renderPayments();
    expect(screen.getByText("Rp180.000")).toBeInTheDocument(); // 5K normal
    expect(screen.getByText("Rp225.000")).toBeInTheDocument(); // 10K normal
  });

  it("menampilkan harga Early Bird dicoret dengan badge Sold Out", () => {
    renderPayments();
    const soldOutBadges = screen.getAllByText("Sold Out");
    expect(soldOutBadges).toHaveLength(2); // satu per kartu paket

    const earlyBird5K = screen.getByText("Rp165.000");
    expect(earlyBird5K).toHaveStyle({ textDecoration: "line-through" });

    const earlyBird10K = screen.getByText("Rp195.000");
    expect(earlyBird10K).toHaveStyle({ textDecoration: "line-through" });
  });

  it("tidak lagi menampilkan opsi tambahan lengan panjang", () => {
    renderPayments();
    expect(screen.queryAllByRole("switch")).toHaveLength(0);
    expect(screen.queryByText(/tambahan lengan panjang/i)).not.toBeInTheDocument();
    expect(screen.queryByText("+Rp10.000")).not.toBeInTheDocument();
  });

  it("link CTA hanya membawa query kategori, tanpa parameter lengan", () => {
    renderPayments();

    const ctaLinks = screen.getAllByRole("link", { name: /daftar sekarang/i });
    expect(ctaLinks[0]).toHaveAttribute("href", "/payment?kategori=5K");
    expect(ctaLinks[1]).toHaveAttribute("href", "/payment?kategori=10K");
  });

  it("tombol pendaftaran aktif (bukan Pendaftaran Ditutup) selama isRegistrationClosed = false", () => {
    renderPayments();
    expect(screen.queryByText(/pendaftaran ditutup/i)).not.toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: /daftar sekarang/i }).length
    ).toBeGreaterThan(0);
  });
});
