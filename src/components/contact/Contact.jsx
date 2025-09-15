import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "../../App.css";
import Aos from "aos";
import "aos/dist/aos.css";

const Contact = () => {
  useEffect(() => {
    emailjs.init("ZFq21k4pA450jZTVs");
  }, []);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    emailjs.send("service_58o5cdn", "template_woqda1h", {
      name: name,
      to_name: "Rafi Zimraan",
      from_name: email,
      message: message,
    });

    e.target.reset();
  };
  const [punyaKondisi, setPunyaKondisi] = useState(false);

  return (
    <iframe
      src="https://docs.google.com/forms/d/e/1FAIpQLSd1ICZDT-5DRKYRbhRgKmvMOR_xkggljcS5YbaohqieK5Todw/viewform?embedded=true"
      style={{ width: "100%", height: "100vh" }}
      frameborder="0"
      marginheight="0"
      marginwidth="0"
    >
      Memuat…
    </iframe>
    // <section className="contact section" id="contact">
    //   <h2
    //     className="section__title"
    //     data-aos="fade-up"
    //     data-aos-duration="1000"
    //   >
    //     Get in touch
    //   </h2>
    //   <span
    //     className="section__subtitle"
    //     data-aos="fade-up"
    //     data-aos-duration="1000"
    //     data-aos-delay="100"
    //   >
    //     Contact Me
    //   </span>

    //   <div className="contact__container container grid">
    //     <div className="contact__content">
    //       <h3
    //         className="contact__title"
    //         data-aos="fade-up"
    //         data-aos-duration="1000"
    //       >
    //         Form Pendaftaran Run For Nation
    //       </h3>

    //       <form ref={form} onSubmit={sendEmail} className="contact__form">
    //         {/* Nama Lengkap */}
    //         <div
    //           className="contact__form-div"
    //           data-aos="fade-up"
    //           data-aos-duration="1000"
    //           data-aos-delay="100"
    //         >
    //           <label className="contact__form-tag">Nama Lengkap</label>
    //           <input
    //             type="text"
    //             name="nama_lengkap"
    //             className="contact__form-input"
    //             placeholder="Isi nama lengkap"
    //             required
    //           />
    //         </div>

    //         {/* Jenis Kelamin */}
    //         <div
    //           className="contact__form-div"
    //           data-aos="fade-up"
    //           data-aos-duration="1000"
    //           data-aos-delay="200"
    //         >
    //           <label className="contact__form-tag">Jenis Kelamin</label>
    //           <div className="contact__form-input" style={{ padding: "10px" }}>
    //             <label style={{ marginRight: "15px" }}>
    //               <input
    //                 type="radio"
    //                 name="jenis_kelamin"
    //                 value="Laki-laki"
    //                 required
    //               />{" "}
    //               Laki-laki
    //             </label>
    //             <label>
    //               <input
    //                 type="radio"
    //                 name="jenis_kelamin"
    //                 value="Perempuan"
    //                 required
    //               />{" "}
    //               Perempuan
    //             </label>
    //           </div>
    //         </div>

    //         {/* Tempat, Tanggal Lahir */}
    //         <div
    //           className="contact__form-div"
    //           data-aos="fade-up"
    //           data-aos-duration="1000"
    //           data-aos-delay="300"
    //         >
    //           <label className="contact__form-tag">Tempat, Tanggal Lahir</label>
    //           <input
    //             type="text"
    //             name="ttl"
    //             className="contact__form-input"
    //             placeholder="Contoh: Pontianak, 01 Januari 2000"
    //             required
    //           />
    //         </div>

    //         {/* Usia */}
    //         <div
    //           className="contact__form-div"
    //           data-aos="fade-up"
    //           data-aos-duration="1000"
    //           data-aos-delay="400"
    //         >
    //           <label className="contact__form-tag">Usia</label>
    //           <input
    //             type="number"
    //             name="usia"
    //             className="contact__form-input"
    //             placeholder="Isi usia Anda"
    //             required
    //           />
    //         </div>

    //         {/* Nomor HP/WA */}
    //         <div
    //           className="contact__form-div"
    //           data-aos="fade-up"
    //           data-aos-duration="1000"
    //           data-aos-delay="500"
    //         >
    //           <label className="contact__form-tag">Nomor HP/WA Aktif</label>
    //           <input
    //             type="tel"
    //             name="hp"
    //             className="contact__form-input"
    //             placeholder="08xxxxxxxxxx"
    //             required
    //           />
    //         </div>

    //         {/* Email (Opsional) */}
    //         <div
    //           className="contact__form-div"
    //           data-aos="fade-up"
    //           data-aos-duration="1000"
    //           data-aos-delay="600"
    //         >
    //           <label className="contact__form-tag">Email (Opsional)</label>
    //           <input
    //             type="email"
    //             name="email"
    //             className="contact__form-input"
    //             placeholder="Isi email Anda"
    //           />
    //         </div>

    //         {/* Alamat Lengkap */}
    //         <div
    //           className="contact__form-div contact__form-area"
    //           data-aos="fade-up"
    //           data-aos-duration="1000"
    //           data-aos-delay="700"
    //         >
    //           <label className="contact__form-tag">Alamat Lengkap</label>
    //           <textarea
    //             name="alamat"
    //             cols="30"
    //             rows="4"
    //             className="contact__form-input"
    //             placeholder="Isi alamat lengkap Anda"
    //             required
    //           ></textarea>
    //         </div>

    //         {/* Ukuran Kaos Peserta */}
    //         <div
    //           className="contact__form-div"
    //           data-aos="fade-up"
    //           data-aos-duration="1000"
    //           data-aos-delay="800"
    //         >
    //           <label className="contact__form-tag">Ukuran Kaos Peserta</label>
    //           <div className="contact__form-input" style={{ padding: "10px" }}>
    //             {["S", "M", "L", "XL", "XXL"].map((size) => (
    //               <label key={size} style={{ marginRight: "15px" }}>
    //                 <input
    //                   type="radio"
    //                   name="ukuran_kaos"
    //                   value={size}
    //                   required
    //                 />{" "}
    //                 {size}
    //               </label>
    //             ))}
    //           </div>
    //         </div>

    //         {/* Upload KTP */}
    //         <div
    //           className="contact__form-div"
    //           data-aos="fade-up"
    //           data-aos-duration="1000"
    //           data-aos-delay="850"
    //         >
    //           <label className="contact__form-tag">Upload KTP (Opsional)</label>
    //           <input
    //             type="file"
    //             name="upload_ktp"
    //             accept="image/*,.pdf"
    //             className="contact__form-input"
    //             required
    //           />
    //         </div>

    //         <div
    //           className="contact__form-div"
    //           data-aos="fade-up"
    //           data-aos-duration="1000"
    //           data-aos-delay="900"
    //           style={{ marginBottom: 3 }}
    //         >
    //           <label className="contact__form-tag">
    //             Upload Foto Diri (Opsional)
    //           </label>
    //           <input
    //             type="file"
    //             name="upload_foto"
    //             accept="image/*"
    //             capture="environment" // bisa kamera belakang di mobile
    //             className="contact__form-input"
    //             required
    //           />
    //         </div>

    //         <small style={{ display: "block", marginBottom: 20, color: "red" }}>
    //           *Mohon upload foto terbaru Anda (dari kamera atau gallery)
    //         </small>

    //         {/* Riwayat Kesehatan */}
    //         <div
    //           style={{
    //             display: "flex",
    //             flexDirection: "column",
    //             gap: 10,
    //             marginBottom: 10,
    //             position: "relative",
    //           }}
    //         >
    //           <label>
    //             <input
    //               type="checkbox"
    //               name="kesehatan"
    //               value="Sehat"
    //               required
    //             />{" "}
    //             Saya dalam keadaan sehat dan sanggup mengikuti kegiatan lari ini
    //           </label>

    //           <label>
    //             <input
    //               type="checkbox"
    //               name="kesehatan"
    //               value="Kondisi Khusus"
    //               checked={punyaKondisi}
    //               onChange={(e) => setPunyaKondisi(e.target.checked)}
    //             />{" "}
    //             Saya memiliki kondisi kesehatan khusus
    //           </label>

    //           {punyaKondisi && (
    //             <input
    //               type="text"
    //               name="kondisi_khusus"
    //               className=""
    //               placeholder="Jika ada kondisi kesehatan khusus, sebutkan"
    //               style={{ padding: 10, borderRadius: 10 }}
    //             />
    //           )}

    //           <div
    //             className=""
    //             data-aos="fade-up"
    //             data-aos-duration="1000"
    //             data-aos-delay="1000"
    //             style={{ marginBottom: 30 }}
    //           >
    //             <div>
    //               <label>
    //                 <input type="checkbox" name="pernyataan" required /> Saya
    //                 menyatakan bahwa seluruh data yang saya isi adalah benar,
    //                 serta bersedia mengikuti seluruh aturan panitia{" "}
    //                 <b>Run Fora Nation 2025</b> dengan penuh sportivitas.
    //               </label>
    //             </div>
    //           </div>
    //         </div>

    //         {/* Submit Button */}
    //         <button
    //           className="button button--flex"
    //           data-aos="fade-up"
    //           data-aos-duration="1000"
    //           data-aos-delay="1100"
    //         >
    //           Daftar Sekarang
    //           <svg
    //             className="button__icon"
    //             xmlns="http://www.w3.org/2000/svg"
    //             width="24"
    //             height="24"
    //             viewBox="0 0 24 24"
    //             fill="none"
    //           >
    //             <path
    //               d="M14.2199 21.9352C13.0399 21.9352 11.3699 21.1052 10.0499 17.1352L9.32988 14.9752L7.16988 14.2552C3.20988 12.9352 2.37988 11.2652 2.37988 10.0852C2.37988 8.91525 3.20988 7.23525 7.16988 5.90525L15.6599 3.07525C17.7799 2.36525 19.5499 2.57525 20.6399 3.65525C21.7299 4.73525 21.9399 6.51525 21.2299 8.63525L18.3999 17.1252C17.0699 21.1052 15.3999 21.9352 14.2199 21.9352ZM7.63988 7.33525C4.85988 8.26525 3.86988 9.36525 3.86988 10.0852C3.86988 10.8052 4.85988 11.9052 7.63988 12.8252L10.1599 13.6652C10.3799 13.7352 10.5599 13.9152 10.6299 14.1352L11.4699 16.6552C12.3899 19.4352 13.4999 20.4252 14.2199 20.4252C14.9399 20.4252 16.0399 19.4352 16.9699 16.6552L19.7999 8.16525C20.3099 6.62525 20.2199 5.36525 19.5699 4.71525C18.9199 4.06525 17.6599 3.98525 16.1299 4.49525L7.63988 7.33525Z"
    //               fill="var(--container-color)"
    //             ></path>
    //             <path
    //               d="M10.11 14.7052C9.92005 14.7052 9.73005 14.6352 9.58005 14.4852C9.29005 14.1952 9.29005 13.7152 9.58005 13.4252L13.16 9.83518C13.45 9.54518 13.93 9.54518 14.22 9.83518C14.51 10.1252 14.51 10.6052 14.22 10.8952L10.64 14.4852C10.5 14.6352 10.3 14.7052 10.11 14.7052Z"
    //               fill="var(--container-color)"
    //             ></path>
    //           </svg>
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    // </section>
  );
};

export default Contact;
