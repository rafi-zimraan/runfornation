import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

/**
 * Status pendaftaran dibaca dari src/config/registration.js, jadi tiap test
 * memuat ulang komponen dengan nilai flag yang diinginkan.
 */
const renderPayments = async (closed) => {
  vi.resetModules();
  vi.doMock("../../config/registration", async () => {
    const actual = await vi.importActual("../../config/registration");
    return { ...actual, IS_REGISTRATION_CLOSED: closed };
  });
  const { default: Payments } = await import("./Payments");
  return render(
    <MemoryRouter>
      <Payments />
    </MemoryRouter>
  );
};

afterEach(() => {
  vi.doUnmock("../../config/registration");
  vi.resetModules();
});

describe("Payments — harga & Early Bird sold out", () => {
  it("menampilkan harga Normal sebagai harga utama untuk tiap kategori", async () => {
    await renderPayments(true);
    expect(screen.getByText("Rp180.000")).toBeInTheDocument(); // 5K normal
    expect(screen.getByText("Rp225.000")).toBeInTheDocument(); // 10K normal
  });

  it("menampilkan harga Early Bird dicoret dengan badge Sold Out", async () => {
    await renderPayments(true);
    const soldOutBadges = screen.getAllByText("Sold Out");
    expect(soldOutBadges).toHaveLength(2); // satu per kartu paket

    const earlyBird5K = screen.getByText("Rp165.000");
    expect(earlyBird5K).toHaveStyle({ textDecoration: "line-through" });

    const earlyBird10K = screen.getByText("Rp195.000");
    expect(earlyBird10K).toHaveStyle({ textDecoration: "line-through" });
  });

  it("tidak lagi menampilkan opsi tambahan lengan panjang", async () => {
    await renderPayments(true);
    expect(screen.queryAllByRole("switch")).toHaveLength(0);
    expect(screen.queryByText(/tambahan lengan panjang/i)).not.toBeInTheDocument();
    expect(screen.queryByText("+Rp10.000")).not.toBeInTheDocument();
  });
});

describe("Payments — pendaftaran DITUTUP (status produksi saat ini)", () => {
  it("mengganti CTA dengan tombol nonaktif 'Pendaftaran Ditutup'", async () => {
    await renderPayments(true);

    expect(
      screen.queryAllByRole("link", { name: /daftar sekarang/i })
    ).toHaveLength(0);

    const closedButtons = screen.getAllByRole("button", {
      name: /pendaftaran ditutup/i,
    });
    expect(closedButtons).toHaveLength(2); // satu per kartu paket
    closedButtons.forEach((btn) => expect(btn).toBeDisabled());
  });

  it("tidak menyisakan link menuju halaman /payment", async () => {
    const { container } = await renderPayments(true);
    const paymentLinks = [...container.querySelectorAll("a[href]")].filter((a) =>
      a.getAttribute("href").includes("/payment")
    );
    expect(paymentLinks).toHaveLength(0);
  });

  it("menampilkan banner ucapan terima kasih untuk yang sudah mendaftar", async () => {
    await renderPayments(true);
    expect(
      screen.getByText(/terima kasih untuk semua yang telah mendaftar/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/terima kasih sebesar-besarnya kepada seluruh pelari/i)
    ).toBeInTheDocument();
  });

  it("menyediakan tombol WhatsApp panitia di banner", async () => {
    await renderPayments(true);
    const waLink = screen.getByRole("link", { name: /hubungi panitia/i });
    expect(waLink).toHaveAttribute(
      "href",
      expect.stringContaining("wa.me/6285393669366")
    );
  });
});

describe("Payments — pendaftaran DIBUKA (jalur buka kembali)", () => {
  it("link CTA aktif & membawa query kategori saja", async () => {
    await renderPayments(false);

    const ctaLinks = screen.getAllByRole("link", { name: /daftar sekarang/i });
    expect(ctaLinks[0]).toHaveAttribute("href", "/payment?kategori=5K");
    expect(ctaLinks[1]).toHaveAttribute("href", "/payment?kategori=10K");
  });

  it("tidak menampilkan banner penutupan maupun tombol nonaktif", async () => {
    await renderPayments(false);
    expect(screen.queryByText(/pendaftaran ditutup/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/terima kasih untuk semua yang telah mendaftar/i)
    ).not.toBeInTheDocument();
  });
});
