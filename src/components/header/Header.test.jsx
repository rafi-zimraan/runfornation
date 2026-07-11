import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

describe("Header — navigasi", () => {
  it("merender semua link navigasi utama dengan href yang benar", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const expected = [
      ["Home", "/#home"],
      ["Ketentuan", "/#about"],
      ["Size", "/#size"],
      ["Pembayaran", "/#payment"],
      ["Daftar", "/#contact"],
    ];

    expected.forEach(([label, href]) => {
      expect(screen.getByRole("link", { name: label })).toHaveAttribute(
        "href",
        href
      );
    });
  });

  it("logo mengarah ke halaman utama", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText("RUN FOR NATION").closest("a")).toHaveAttribute(
      "href",
      "/"
    );
  });
});
