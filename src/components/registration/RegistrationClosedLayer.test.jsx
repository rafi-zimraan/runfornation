import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

const DISMISS_KEY = "rfn_closed_notice_dismissed";

const renderLayer = async (closed) => {
  vi.resetModules();
  vi.doMock("../../config/registration", async () => {
    const actual = await vi.importActual("../../config/registration");
    return { ...actual, IS_REGISTRATION_CLOSED: closed };
  });
  const { default: RegistrationClosedLayer } = await import(
    "./RegistrationClosedLayer"
  );
  return render(<RegistrationClosedLayer />);
};

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  vi.doUnmock("../../config/registration");
  vi.resetModules();
  document.body.style.overflow = "";
});

describe("RegistrationClosedLayer", () => {
  it("menampilkan layer pemberitahuan + ucapan terima kasih saat pendaftaran ditutup", async () => {
    await renderLayer(true);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /pendaftaran ditutup/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/terima kasih sebesar-besarnya kepada seluruh pelari/i)
    ).toBeInTheDocument();
  });

  it("tidak menampilkan apa pun saat pendaftaran dibuka", async () => {
    await renderLayer(false);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("menutup layer dan mengingatnya di localStorage saat tombol Mengerti diklik", async () => {
    await renderLayer(true);

    fireEvent.click(screen.getByRole("button", { name: /mengerti/i }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(localStorage.getItem(DISMISS_KEY)).toBe("1");
  });

  it("tidak tampil lagi jika sudah pernah ditutup sebelumnya", async () => {
    localStorage.setItem(DISMISS_KEY, "1");
    await renderLayer(true);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("mengembalikan scroll body setelah layer ditutup", async () => {
    await renderLayer(true);
    expect(document.body.style.overflow).toBe("hidden");

    fireEvent.click(screen.getByRole("button", { name: /mengerti/i }));
    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("menyediakan tautan WhatsApp panitia", async () => {
    await renderLayer(true);
    const waLink = screen.getByRole("link", { name: /tanya panitia/i });
    expect(waLink).toHaveAttribute(
      "href",
      expect.stringContaining("wa.me/6285393669366")
    );
  });
});
