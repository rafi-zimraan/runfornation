import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("menampilkan harga Early Bird dicoret dengan badge Habis", () => {
    renderPayments();
    const habisBadges = screen.getAllByText("Habis");
    expect(habisBadges).toHaveLength(2); // satu per kartu paket

    const earlyBird5K = screen.getByText("Rp165.000");
    expect(earlyBird5K).toHaveStyle({ textDecoration: "line-through" });

    const earlyBird10K = screen.getByText("Rp195.000");
    expect(earlyBird10K).toHaveStyle({ textDecoration: "line-through" });
  });

  it("menambahkan Rp10.000 ke harga Normal & Early Bird saat toggle tangan panjang aktif", async () => {
    const user = userEvent.setup();
    renderPayments();

    const switches = screen.getAllByRole("switch");
    await user.click(switches[0]); // kartu 5K

    expect(screen.getByText("Rp190.000")).toBeInTheDocument(); // 180.000 + 10.000
    expect(screen.getByText("Rp175.000")).toBeInTheDocument(); // 165.000 + 10.000 (dicoret)
  });

  it("link CTA membawa query kategori & lengan yang benar", async () => {
    const user = userEvent.setup();
    renderPayments();

    const ctaLinks = screen.getAllByRole("link", { name: /daftar sekarang/i });
    expect(ctaLinks[0]).toHaveAttribute(
      "href",
      "/payment?kategori=5K&lengan=pendek"
    );

    const switches = screen.getAllByRole("switch");
    await user.click(switches[0]);

    const ctaLinksAfter = screen.getAllByRole("link", {
      name: /daftar sekarang/i,
    });
    expect(ctaLinksAfter[0]).toHaveAttribute(
      "href",
      "/payment?kategori=5K&lengan=panjang"
    );
  });

  it("tombol pendaftaran aktif (bukan Pendaftaran Ditutup) selama isRegistrationClosed = false", () => {
    renderPayments();
    expect(screen.queryByText(/pendaftaran ditutup/i)).not.toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: /daftar sekarang/i }).length
    ).toBeGreaterThan(0);
  });
});
