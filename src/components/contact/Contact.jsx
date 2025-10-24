import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "../../App.css";
import Aos from "aos";
import "aos/dist/aos.css";
import Papa from "papaparse";

const MAX_PESERTA = 1500;

const Contact = () => {
  const [isEarlyBirdOpen, setIsEarlyBirdOpen] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const csvUrl =
          "https://docs.google.com/spreadsheets/d/e/2PACX-1vQZMfCu2YjL-eZhoVtv3dDH7DhkdAVnu8B2mMwRjjKKJY1A50AAE6JfEOgiGJ397cjX1gJDYPaJRegB/pub?output=csv";

        const response = await fetch(csvUrl);
        const text = await response.text();

        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const rows = result.data;
            if (rows.length >= MAX_PESERTA) {
              setIsEarlyBirdOpen(false);
            }
          },
        });
      } catch (error) {
        console.error("Error fetching CSV:", error);
      }
    };

    fetchData();
  }, []);

  // Jika kuota habis
  if (!isEarlyBirdOpen) {
    return (
      <section
        style={{
          padding: "4rem 0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            background: "linear-gradient(145deg, #ffffff, #f2f2f2)",
            padding: "2.5rem 2rem",
            borderRadius: "20px",
            maxWidth: "480px",
            width: "100%",
            textAlign: "center",
            boxShadow: "0px 8px 25px rgba(0,0,0,0.6)",
          }}
          data-aos="zoom-in"
          data-aos-duration="1000"
        >
          <h2
            style={{
              fontSize: "1.8rem",
              marginBottom: "1rem",
              color: "#b91c1c",
            }}
            data-aos="fade-down"
            data-aos-duration="1000"
          >
            Pendaftaran Ditutup
          </h2>
          <p style={{ color: "#555" }} data-aos="fade-up" data-aos-delay="200">
            Kuota 200 peserta pertama sudah terpenuhi. Tunggu batch berikutnya
            ya…
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="section"
      style={{
        padding: "4rem 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      id="contact"
    >
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSd1ICZDT-5DRKYRbhRgKmvMOR_xkggljcS5YbaohqieK5Todw/viewform?embedded=true"
        style={{ width: "100%", height: "100vh" }}
        frameborder="0"
        marginheight="0"
        marginwidth="0"
      >
        Memuat…
      </iframe>
    </section>
  );
};

export default Contact;
