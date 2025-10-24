import React from "react";
import "../../App.css";
import DewasaImg from "../../assets/Runners/Size.jpeg";
import KidsImg from "../../assets/Runners/KidsSize.jpeg";

const Size = () => {
  return (
    <section className="size section" id="size">
      <h2
        className="section__title"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        Size Chart
      </h2>
      <span
        className="section__subtitle"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="100"
      >
        Dewasa & Kids
      </span>

      <div className="container grid gap-16">
        {/* Dewasa */}
        <div className="about__container grid md:grid-cols-2 items-center gap-8">
          <img
            src={DewasaImg}
            alt="Size Chart Dewasa"
            className="rounded-xl shadow-lg"
            data-aos="fade-right"
            data-aos-duration="1000"
          />

          <div
            className="overflow-x-auto"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center md:text-left">
              Dewasa
            </h3>
            <table className="w-full border border-gray-300 border-collapse text-center">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="border border-gray-300 p-2">SIZE</th>
                  <th className="border border-gray-300 p-2">Lebar Dada</th>
                  <th className="border border-gray-300 p-2">Panjang Baju</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["3S", 44, 62],
                  ["2S", 45, 64],
                  ["XS", 47, 66],
                  ["S", 49, 68],
                  ["M", 50, 70],
                  ["L", 52, 72],
                  ["XL", 54, 74],
                  ["2XL", 56, 76],
                  ["3XL", 58, 78],
                ].map(([size, dada, panjang], i) => (
                  <tr
                    key={size}
                    className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="border border-gray-300 p-2">{size}</td>
                    <td className="border border-gray-300 p-2">{dada}</td>
                    <td className="border border-gray-300 p-2">{panjang}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-sm text-red-500 mt-3 text-center">
              Note: Toleransi 2cm (dikarenakan suhu mesin dan proses jahit)
            </p>
          </div>
        </div>

        {/* Kids */}
        <div className="about__container grid md:grid-cols-2 items-center gap-8">
          {/* Tabel dulu biar alternate layout */}
          <div
            className="overflow-x-auto order-2 md:order-1"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center md:text-left">
              Kids
            </h3>
            <table className="w-full border border-gray-300 border-collapse text-center">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="border border-gray-300 p-2">SIZE</th>
                  <th className="border border-gray-300 p-2">Lebar Dada</th>
                  <th className="border border-gray-300 p-2">Panjang Baju</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [2, 30, 40],
                  [4, 32, 46],
                  [6, 34, 48],
                  [8, 36, 50],
                  [10, 38, 51],
                ].map(([size, dada, panjang], i) => (
                  <tr
                    key={size}
                    className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="border border-gray-300 p-2">{size}</td>
                    <td className="border border-gray-300 p-2">{dada}</td>
                    <td className="border border-gray-300 p-2">{panjang}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-sm text-red-500 mt-3 text-center">
              Note: Toleransi 2cm (dikarenakan suhu mesin dan proses jahit)
            </p>
          </div>

          <img
            src={KidsImg}
            alt="Size Chart Kids"
            className="rounded-xl shadow-lg order-1 md:order-2"
            data-aos="fade-left"
            data-aos-duration="1000"
          />
        </div>
      </div>
    </section>
  );
};

export default Size;
