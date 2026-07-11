import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import BuyerFeedToast, {
  parseBuyers,
  parseIndoTimestamp,
  relativeTimeLabel,
} from "./BuyerFeedToast";

describe("parseBuyers — parsing feed CSV pendaftar", () => {
  it("mem-parse baris dengan header 'Nama' & 'Kategori' apa adanya", () => {
    const csv = "Nama,Kategori\nAhmad Rozi,10K\nSiti Amara,5K\n";
    expect(parseBuyers(csv)).toEqual([
      { nama: "Ahmad Rozi", kategori: "10K", timestamp: "" },
      { nama: "Siti Amara", kategori: "5K", timestamp: "" },
    ]);
  });

  it("tetap mengenali header asli hasil copy-paste kolom Google Form (mis. 'Nama Lengkap ', 'Pilih Kategori Lari')", () => {
    const csv = "Nama Lengkap ,Pilih Kategori Lari\nBudi Santoso,5k\n";
    expect(parseBuyers(csv)).toEqual([
      { nama: "Budi Santoso", kategori: "5K", timestamp: "" },
    ]);
  });

  it("membuang baris dengan nama kosong atau kategori di luar 5K/10K", () => {
    const csv = "Nama,Kategori\n,10K\nRina,\nJoko,21K\nDedi,10K\n";
    expect(parseBuyers(csv)).toEqual([
      { nama: "Dedi", kategori: "10K", timestamp: "" },
    ]);
  });

  it("mengembalikan array kosong jika kolom nama/kategori tidak ditemukan", () => {
    const csv = "Email,NIK\na@b.com,12345\n";
    expect(parseBuyers(csv)).toEqual([]);
  });

  it("mengembalikan array kosong untuk CSV kosong", () => {
    expect(parseBuyers("")).toEqual([]);
  });

  it("ikut mengambil kolom Timestamp jika ada", () => {
    const csv =
      "Timestamp,Nama,Kategori\n17/06/2026 11:08:08,Ahmad Rozi,10K\n";
    expect(parseBuyers(csv)).toEqual([
      { nama: "Ahmad Rozi", kategori: "10K", timestamp: "17/06/2026 11:08:08" },
    ]);
  });
});

describe("parseIndoTimestamp — parsing format DD/MM/YYYY H:mm:ss dari Google Form", () => {
  it("mem-parse jam 2 digit", () => {
    const d = parseIndoTimestamp("17/06/2026 11:08:08");
    expect(d.getFullYear()).toBe(2026);
    expect(d.getMonth()).toBe(5); // Juni = index 5
    expect(d.getDate()).toBe(17);
    expect(d.getHours()).toBe(11);
    expect(d.getMinutes()).toBe(8);
  });

  it("mem-parse jam 1 digit (mis. '18/06/2026 5:27:48')", () => {
    const d = parseIndoTimestamp("18/06/2026 5:27:48");
    expect(d.getHours()).toBe(5);
  });

  it("mengembalikan null untuk format yang tidak dikenali", () => {
    expect(parseIndoTimestamp("bukan tanggal")).toBeNull();
    expect(parseIndoTimestamp("")).toBeNull();
    expect(parseIndoTimestamp(undefined)).toBeNull();
  });
});

describe("relativeTimeLabel — label waktu relatif", () => {
  const NOW = new Date(2026, 6, 11, 12, 0, 0); // 11 Juli 2026, 12:00:00

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("mengembalikan null jika tanggal null", () => {
    expect(relativeTimeLabel(null)).toBeNull();
  });

  it("'Baru saja' untuk kurang dari 1 menit lalu", () => {
    expect(relativeTimeLabel(new Date(2026, 6, 11, 11, 59, 30))).toBe(
      "Baru saja"
    );
  });

  it("format menit untuk < 1 jam lalu", () => {
    expect(relativeTimeLabel(new Date(2026, 6, 11, 11, 45, 0))).toBe(
      "15 menit lalu"
    );
  });

  it("format jam untuk < 1 hari lalu", () => {
    expect(relativeTimeLabel(new Date(2026, 6, 11, 9, 0, 0))).toBe("3 jam lalu");
  });

  it("format hari untuk >= 1 hari lalu", () => {
    expect(relativeTimeLabel(new Date(2026, 6, 9, 12, 0, 0))).toBe(
      "2 hari lalu"
    );
  });
});

describe("BuyerFeedToast — render toast dengan data sungguhan (mocked fetch)", () => {
  beforeEach(() => {
    sessionStorage.clear();
    global.fetch = vi.fn().mockResolvedValue({
      text: () => Promise.resolve("Nama,Kategori\nAhmad Rozi,10K\nSiti Amara,5K\n"),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("menampilkan pendaftar TERBARU (baris CSV paling akhir) lebih dulu, bukan yang paling lama", async () => {
    render(<BuyerFeedToast csvUrl="https://mock.test/public-feed.csv" />);

    // "Siti Amara" adalah baris terakhir di CSV (pendaftar paling baru) —
    // harus tampil duluan, bukan "Ahmad Rozi" yang mendaftar lebih dulu.
    await waitFor(() => {
      expect(screen.getByText("Siti Amara")).toBeInTheDocument();
    });
    expect(screen.getByText("5K")).toBeInTheDocument();
    expect(screen.queryByText("Ahmad Rozi")).not.toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith(
      "https://mock.test/public-feed.csv",
      expect.objectContaining({ cache: "no-store" })
    );
  });

  it("menampilkan label waktu relatif jika kolom Timestamp tersedia", async () => {
    const fifteenMinAgo = new Date(Date.now() - 15 * 60000);
    const pad = (n) => String(n).padStart(2, "0");
    const ts = `${pad(fifteenMinAgo.getDate())}/${pad(
      fifteenMinAgo.getMonth() + 1
    )}/${fifteenMinAgo.getFullYear()} ${fifteenMinAgo.getHours()}:${pad(
      fifteenMinAgo.getMinutes()
    )}:${pad(fifteenMinAgo.getSeconds())}`;

    global.fetch = vi.fn().mockResolvedValue({
      text: () =>
        Promise.resolve(`Timestamp,Nama,Kategori\n${ts},Ahmad Rozi,10K\n`),
    });

    render(<BuyerFeedToast csvUrl="https://mock.test/public-feed.csv" />);

    await waitFor(() => {
      expect(screen.getByText("15 menit lalu")).toBeInTheDocument();
    });
  });

  it("fallback ke label statis jika kolom Timestamp tidak ada/tidak valid", async () => {
    render(<BuyerFeedToast csvUrl="https://mock.test/public-feed.csv" />);

    await waitFor(() => {
      expect(screen.getByText("Run For Nation 2026")).toBeInTheDocument();
    });
  });

  it("tidak merender apapun jika csvUrl kosong (default sebelum link diisi)", () => {
    const { container } = render(<BuyerFeedToast csvUrl="" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("tidak merender apapun jika fetch gagal (mis. link belum dipublish)", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("network error"));
    const { container } = render(
      <BuyerFeedToast csvUrl="https://mock.test/down.csv" />
    );

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(container).toBeEmptyDOMElement();
  });

  it("dengan >30 pendaftar, hanya menampilkan dari 30 terbaru (bukan pendaftar paling lama)", async () => {
    const rows = Array.from(
      { length: 50 },
      (_, i) => `Pendaftar ${i + 1},5K`
    ).join("\n");
    global.fetch = vi.fn().mockResolvedValue({
      text: () => Promise.resolve(`Nama,Kategori\n${rows}\n`),
    });

    render(<BuyerFeedToast csvUrl="https://mock.test/public-feed.csv" />);

    // Baris ke-50 (paling baru) harus jadi yang pertama tampil.
    await waitFor(() => {
      expect(screen.getByText("Pendaftar 50")).toBeInTheDocument();
    });
    // Pendaftar 1-20 (di luar 30 terbaru) tidak boleh pernah masuk pool rotasi.
    expect(screen.queryByText("Pendaftar 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Pendaftar 20")).not.toBeInTheDocument();
  });
});
