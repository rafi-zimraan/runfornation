// import React from "react";
// import { Link } from "react-router-dom";

// const Payments = () => {
//   const cardStyle = {
//     background: "linear-gradient(145deg, #ffffff, #f2f2f2)",
//     color: "#fff",
//     borderRadius: "16px",
//     padding: "2rem",
//     maxWidth: "400px",
//     width: "100%",
//     boxShadow: "0px 8px 20px rgba(0,0,0,0.4)",
//     textAlign: "center",
//     position: "relative",
//   };

//   const buttonStyle = {
//     background: "linear-gradient(90deg, #014a91, #014a91)",
//     border: "none",
//     padding: "12px 20px",
//     borderRadius: "10px",
//     color: "#fff",
//     fontWeight: "bold",
//     cursor: "pointer",
//     width: "100%",
//     marginBottom: "1.5rem",
//     fontSize: "1rem",
//   };

//   const facilitiesStyle = {
//     listStyle: "none",
//     padding: 0,
//     margin: 0,
//     textAlign: "left",
//     lineHeight: "1.8rem",
//     color: "#888",
//   };

//   return (
//     <section
//       className="section"
//       style={{
//         padding: "4rem 0",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//       id="payment"
//     >
//       <div
//         style={{
//           display: "flex",
//           gap: "2rem",
//           flexWrap: "wrap",
//           justifyContent: "center",
//         }}
//       >
//         {/* Paket Normal */}
//         <div style={cardStyle}>
//           <div
//             style={{
//               position: "absolute",
//               top: "15px",
//               right: "15px",
//               background: "#888",
//               padding: "5px 12px",
//               borderRadius: "20px",
//               fontSize: "0.8rem",
//               fontWeight: "bold",
//               color: "#fff",
//             }}
//           >
//             Most popular
//           </div>

//           <h2
//             style={{
//               fontSize: "1.5rem",
//               marginBottom: "0.5rem",
//               color: "#000",
//             }}
//           >
//             Paket Umum
//           </h2>
//           <p
//             style={{
//               color: "#aaa",
//               fontSize: "0.9rem",
//               marginBottom: "1.5rem",
//             }}
//           >
//             Nikmati pengalaman berlari penuh keseruan dengan seluruh fasilitas
//             lengkap untuk peserta individu!
//           </p>

//           <h3 style={{ fontSize: "3rem", marginBottom: "1rem", color: "#000" }}>
//             Rp175.000
//           </h3>

//           <Link to={"/payment"}>
//             <button style={buttonStyle}>Pilih Paket Ini</button>
//           </Link>

//           <ul style={facilitiesStyle}>
//             <li>✅ Race Jersey</li>
//             <li>✅ BIB Number</li>
//             <li>✅ Medali Finisher</li>
//             <li>✅ Totebag</li>
//             <li>✅ Refreshment</li>
//             <li>✅ Support Medis</li>
//             <li>✅ Dokumen Race</li>
//             <li>✅ Undian Doorprize</li>
//           </ul>
//         </div>

//         {/* Paket Early Bird */}
//         <div style={cardStyle}>
//           <div
//             style={{
//               position: "absolute",
//               top: "15px",
//               right: "15px",
//               background: "#ff9800",
//               padding: "5px 12px",
//               borderRadius: "20px",
//               fontSize: "0.8rem",
//               fontWeight: "bold",
//               color: "#fff",
//             }}
//           >
//             Limited Offer
//           </div>

//           <h2
//             style={{
//               fontSize: "1.5rem",
//               marginBottom: "0.5rem",
//               color: "#000",
//             }}
//           >
//             Early Bird
//           </h2>
//           <p
//             style={{
//               color: "#aaa",
//               fontSize: "0.9rem",
//               marginBottom: "1.5rem",
//             }}
//           >
//             Dapatkan harga spesial untuk pendaftaran kolektif komunitas atau
//             tim. Semakin rame, semakin seru!
//           </p>

//           <h3 style={{ fontSize: "3rem", marginBottom: "1rem", color: "#000" }}>
//             Rp150.000
//           </h3>

//           <Link to={"/payment"}>
//             <button style={buttonStyle}>Pilih Paket Ini</button>
//           </Link>

//           <ul style={facilitiesStyle}>
//             <li>✅ Race Jersey</li>
//             <li>✅ BIB Number</li>
//             <li>✅ Medali Finisher</li>
//             <li>✅ Totebag</li>
//             <li>✅ Refreshment</li>
//             <li>✅ Support Medis</li>
//             <li>✅ Dokumen Race</li>
//             <li>✅ Undian Doorprize</li>
//           </ul>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Payments;

// ! Early Bird Closed Component
import React from "react";
import { Link } from "react-router-dom";

const Payments = () => {
  const isRegistrationClosed = true; // 🔒 ubah ini ke false jika nanti dibuka lagi

  const cardStyle = {
    background: "linear-gradient(145deg, #ffffff, #f2f2f2)",
    borderRadius: "16px",
    padding: "2rem",
    maxWidth: "400px",
    width: "100%",
    boxShadow: "0px 8px 20px rgba(0,0,0,0.4)",
    textAlign: "center",
    position: "relative",
  };

  const buttonStyle = {
    background: isRegistrationClosed
      ? "#ccc"
      : "linear-gradient(90deg, #014a91, #014a91)",
    border: "none",
    padding: "12px 20px",
    borderRadius: "10px",
    color: "#fff",
    fontWeight: "bold",
    cursor: isRegistrationClosed ? "not-allowed" : "pointer",
    width: "100%",
    marginBottom: "1.5rem",
    fontSize: "1rem",
    opacity: isRegistrationClosed ? 0.7 : 1,
  };

  const facilitiesStyle = {
    listStyle: "none",
    padding: 0,
    margin: 0,
    textAlign: "left",
    lineHeight: "1.8rem",
    color: "#888",
  };

  const closedBanner = (
    <div
      style={{
        background: "#ff4d4d",
        color: "#fff",
        padding: "1rem",
        borderRadius: "10px",
        textAlign: "center",
        marginBottom: "2rem",
        fontWeight: "bold",
      }}
    >
      🚫 Pendaftaran Telah Ditutup — Terima kasih atas antusiasmenya!
      <br />
      🎉{" "}
      <span style={{ fontWeight: "600" }}>
        Sampai jumpa di event berikutnya!
      </span>
    </div>
  );

  return (
    <section
      className="section"
      style={{
        padding: "4rem 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      id="payment"
    >
      {isRegistrationClosed && closedBanner}

      <div
        style={{
          display: "flex",
          gap: "2rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {/* Paket Normal */}
        <div style={cardStyle}>
          <div
            style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              background: "#888",
              padding: "5px 12px",
              borderRadius: "20px",
              fontSize: "0.8rem",
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            Most popular
          </div>

          <h2
            style={{
              fontSize: "1.5rem",
              marginBottom: "0.5rem",
              color: "#000",
            }}
          >
            Paket Umum
          </h2>
          <p
            style={{
              color: "#aaa",
              fontSize: "0.9rem",
              marginBottom: "1.5rem",
            }}
          >
            Nikmati pengalaman berlari penuh keseruan dengan seluruh fasilitas
            lengkap untuk peserta individu!
          </p>

          <h3 style={{ fontSize: "3rem", marginBottom: "1rem", color: "#000" }}>
            Rp175.000
          </h3>

          {isRegistrationClosed ? (
            <button style={buttonStyle} disabled>
              Pendaftaran Ditutup
            </button>
          ) : (
            <Link to={"/payment"}>
              <button style={buttonStyle}>Pilih Paket Ini</button>
            </Link>
          )}

          <ul style={facilitiesStyle}>
            <li>✅ Race Jersey</li>
            <li>✅ BIB Number</li>
            <li>✅ Medali Finisher</li>
            <li>✅ Totebag</li>
            <li>✅ Refreshment</li>
            <li>✅ Support Medis</li>
            <li>✅ Dokumen Race</li>
            <li>✅ Undian Doorprize</li>
          </ul>
        </div>

        {/* Paket Early Bird */}
        <div style={cardStyle}>
          <div
            style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              background: "#ff9800",
              padding: "5px 12px",
              borderRadius: "20px",
              fontSize: "0.8rem",
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            Limited Offer
          </div>

          <h2
            style={{
              fontSize: "1.5rem",
              marginBottom: "0.5rem",
              color: "#000",
            }}
          >
            Early Bird
          </h2>
          <p
            style={{
              color: "#aaa",
              fontSize: "0.9rem",
              marginBottom: "1.5rem",
            }}
          >
            Dapatkan harga spesial untuk pendaftaran kolektif komunitas atau
            tim. Semakin rame, semakin seru!
          </p>

          <h3 style={{ fontSize: "3rem", marginBottom: "1rem", color: "#000" }}>
            Rp150.000
          </h3>

          {isRegistrationClosed ? (
            <button style={buttonStyle} disabled>
              Pendaftaran Ditutup
            </button>
          ) : (
            <Link to={"/payment"}>
              <button style={buttonStyle}>Pilih Paket Ini</button>
            </Link>
          )}

          <ul style={facilitiesStyle}>
            <li>✅ Race Jersey</li>
            <li>✅ BIB Number</li>
            <li>✅ Medali Finisher</li>
            <li>✅ Totebag</li>
            <li>✅ Refreshment</li>
            <li>✅ Support Medis</li>
            <li>✅ Dokumen Race</li>
            <li>✅ Undian Doorprize</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Payments;
