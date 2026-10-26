"use client";

import { useState } from "react";
import Link from "next/link";

export default function ProfilPage() {
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Privremeni podaci (kasnije idu iz baze)
  const ime = "Amina Tadić";
  const email = "amina.tadic@student.ba";
  const fakultet = "Elektrotehnički fakultet (ETF)";
  const jeVerifikovan = false; // Promijeni u true da vidiš značku

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) =>
        setPreviewImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        color: "white",
        minHeight: "100vh",
        backgroundColor: "#0a0a16",
      }}
    >
      {/* POZADINSKE SFERE */}
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      {/* NAVIGACIJA */}
      <nav className="top-nav" style={{ display: "block" }}>
        <div className="nav-container">
          <div className="logo-area">
            <div className="logo-icon">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <div className="logo-text">
              <h1>StudentHub</h1>
            </div>
          </div>
          <div className="nav-links">
            <Link href="/">Početna</Link>
            <a href="#">Stanovi</a>
            <a href="#">Poslovi</a>
            <a href="#">Skripte</a>
            <Link href="/cimeri">Cimeri</Link>
            <a href="#">Forum</a>
          </div>
          <div className="nav-actions">
            <a href="#" className="btn-icon" title="Dodaj oglas">
              <i className="fa-solid fa-plus"></i>
            </a>
            <a
              href="#"
              className="btn-icon"
              title="Korpa"
              style={{ position: "relative" }}
            >
              <i className="fa-solid fa-cart-shopping"></i>
              <span
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-5px",
                  background: "#FF5722",
                  color: "white",
                  fontSize: "10px",
                  fontWeight: "bold",
                  borderRadius: "50%",
                  width: "18px",
                  height: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                0
              </span>
            </a>
            <a href="#" className="btn-icon" title="Poruke">
              <i className="fa-solid fa-comment-dots"></i>
            </a>
            <a
              href="#"
              className="btn-icon"
              title="Profil i postavke"
              style={{ color: "#FF5722", borderColor: "#FF5722" }}
            >
              <i className="fa-solid fa-gear"></i>
            </a>
          </div>
        </div>
      </nav>

      <main
        className="main-content"
        style={{
          padding: "20px",
          paddingBottom: "100px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* ZAGLAVLJE PROFILA */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "40px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              backgroundColor: "#1E1E32",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "50px",
              color: "white",
              fontWeight: "bold",
              border: "4px solid rgba(255,255,255,0.1)",
              boxShadow: "0 10px 30px rgba(255, 87, 34, 0.3)",
              position: "relative",
              marginBottom: "15px",
            }}
          >
            {ime.charAt(0).toUpperCase()}
            <div
              style={{
                position: "absolute",
                bottom: "-5px",
                right: "-5px",
                background: "#FF5722",
                border: "3px solid #0a0a16",
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "16px",
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              <i className="fa-solid fa-camera"></i>
            </div>
          </div>

          <div
            style={{
              fontSize: "24px",
              fontWeight: "700",
              marginBottom: "5px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {ime}
            {jeVerifikovan && (
              <i
                className="fa-solid fa-circle-check"
                style={{
                  color: "#1DA1F2",
                  fontSize: "18px",
                  filter: "drop-shadow(0 0 5px rgba(29, 161, 242, 0.5))",
                }}
              ></i>
            )}
          </div>
          <p style={{ color: "#B0B0C0", fontSize: "14px" }}>{fakultet}</p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          {/* LIČNI PODACI */}
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              borderRadius: "20px",
              padding: "20px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                color: "#FF5722",
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                paddingBottom: "10px",
              }}
            >
              <i className="fa-solid fa-user-pen"></i> Lični podaci
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginBottom: "15px",
              }}
            >
              <label style={{ fontSize: "13px", color: "#B0B0C0" }}>
                Ime i prezime
              </label>
              <input
                type="text"
                defaultValue={ime}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  padding: "12px 15px",
                  borderRadius: "10px",
                  color: "white",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginBottom: "15px",
              }}
            >
              <label style={{ fontSize: "13px", color: "#B0B0C0" }}>
                Email adresa
              </label>
              <input
                type="email"
                defaultValue={email}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  padding: "12px 15px",
                  borderRadius: "10px",
                  color: "white",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginBottom: "15px",
              }}
            >
              <label style={{ fontSize: "13px", color: "#B0B0C0" }}>
                Fakultet
              </label>
              <input
                type="text"
                defaultValue={fakultet}
                readOnly
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  padding: "12px 15px",
                  borderRadius: "10px",
                  color: "white",
                  fontSize: "14px",
                  outline: "none",
                  opacity: 0.7,
                  cursor: "not-allowed",
                  userSelect: "none",
                }}
              />
            </div>
          </div>

          {/* SAČUVANI OGLASI */}
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              borderRadius: "20px",
              padding: "20px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                color: "#FF5722",
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                paddingBottom: "10px",
              }}
            >
              <i className="fa-solid fa-bookmark"></i> Sačuvani oglasi
            </h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <p style={{ color: "#B0B0C0", fontSize: "14px" }}>
                Nemate sačuvanih oglasa.
              </p>
            </div>
          </div>

          {/* VERIFIKACIJA */}
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              borderRadius: "20px",
              padding: "20px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                color: "#FF5722",
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                paddingBottom: "10px",
              }}
            >
              <i className="fa-solid fa-shield-halved"></i> Verifikacija
            </h3>
            <p
              style={{
                fontSize: "13px",
                color: "#B0B0C0",
                marginBottom: "15px",
              }}
            >
              Verifikuj svoj studentski status kako bi dobio/la povjerenje
              drugih korisnika.
            </p>
            <button
              onClick={() => setIsVerifyModalOpen(true)}
              style={{
                background: jeVerifikovan ? "#4CAF50" : "#1DA1F2",
                color: "white",
                border: "none",
                padding: "12px 20px",
                borderRadius: "10px",
                fontWeight: "600",
                cursor: "pointer",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <i
                className={
                  jeVerifikovan ? "fa-solid fa-check" : "fa-solid fa-id-card"
                }
              ></i>
              {jeVerifikovan
                ? "Verifikovan student"
                : "Verifikuj studentski status"}
            </button>
          </div>

          {/* PRIVATNOST */}
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              borderRadius: "20px",
              padding: "20px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                color: "#FF5722",
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                paddingBottom: "10px",
              }}
            >
              <i className="fa-solid fa-lock"></i> Privatnost
            </h3>

            {[
              { label: "Prikaži moj profil u pretrazi", checked: true },
              { label: "Dozvoli poruke od nepoznatih", checked: true },
              { label: "Prikaži broj telefona", checked: false },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 0",
                  borderBottom:
                    idx !== 2 ? "1px solid rgba(255,255,255,0.05)" : "none",
                }}
              >
                <span style={{ fontSize: "14px", color: "#ddd" }}>
                  {item.label}
                </span>
                <label
                  style={{
                    position: "relative",
                    display: "inline-block",
                    width: "46px",
                    height: "24px",
                  }}
                >
                  <input
                    type="checkbox"
                    defaultChecked={item.checked}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      cursor: "pointer",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: item.checked
                        ? "#FF5722"
                        : "rgba(255,255,255,0.1)",
                      transition: ".4s",
                      borderRadius: "24px",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        content: '""',
                        height: "18px",
                        width: "18px",
                        left: item.checked ? "22px" : "3px",
                        bottom: "3px",
                        backgroundColor: "white",
                        transition: ".4s",
                        borderRadius: "50%",
                      }}
                    ></span>
                  </span>
                </label>
              </div>
            ))}
          </div>

          <button
            style={{
              background: "#FF5722",
              color: "white",
              border: "none",
              padding: "15px",
              borderRadius: "12px",
              fontWeight: "600",
              fontSize: "16px",
              cursor: "pointer",
              width: "100%",
              marginTop: "10px",
              boxShadow: "0 4px 15px rgba(255, 87, 34, 0.4)",
            }}
          >
            <i className="fa-solid fa-floppy-disk"></i> Sačuvaj izmjene
          </button>

          <button
            style={{
              width: "100%",
              marginTop: "10px",
              background: "transparent",
              color: "#FF3B30",
              border: "1px solid rgba(255, 59, 48, 0.3)",
              padding: "12px",
              borderRadius: "10px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            <i className="fa-solid fa-right-from-bracket"></i> Odjavi se
          </button>
        </div>
      </main>

      {/* DONJA MOBILNA NAVIGACIJA */}
      <nav className="mobile-bottom-nav">
        <Link href="/" className="nav-item">
          <i className="fa-solid fa-house"></i>
          <span>Početna</span>
        </Link>
        <a href="#" className="nav-item">
          <i className="fa-solid fa-magnifying-glass"></i>
          <span>Istraži</span>
        </a>
        <a href="#" className="nav-item">
          <i className="fa-solid fa-plus-circle"></i>
          <span>Dodaj</span>
        </a>
        <a href="#" className="nav-item">
          <i className="fa-solid fa-comments"></i>
          <span>Poruke</span>
        </a>
        <a href="#" className="nav-item active">
          <i className="fa-regular fa-user"></i>
          <span>Profil</span>
        </a>
      </nav>

      {/* MODAL ZA VERIFIKACIJU */}
      {isVerifyModalOpen && (
        <div
          className="modal-overlay show"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="modal-content"
            style={{
              background: "rgba(18, 18, 36, 0.95)",
              padding: "30px",
              borderRadius: "24px",
              border: "1px solid rgba(255,255,255,0.1)",
              width: "90%",
              maxWidth: "450px",
              position: "relative",
            }}
          >
            <button
              onClick={() => setIsVerifyModalOpen(false)}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#B0B0C0",
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            <div style={{ textAlign: "center", marginBottom: "25px" }}>
              <h2
                style={{
                  fontSize: "24px",
                  marginBottom: "5px",
                  background: "linear-gradient(to right, #fff, #B0B0C0)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Verifikacija profila
              </h2>
              <p style={{ color: "#B0B0C0", fontSize: "14px" }}>
                Molimo priložite sliku vaše studentske legitimacije ili indeksa.
              </p>
            </div>

            <div
              style={{
                border: "2px dashed rgba(255,255,255,0.1)",
                borderRadius: "16px",
                padding: "30px 20px",
                textAlign: "center",
                cursor: "pointer",
                background: "rgba(255, 255, 255, 0.02)",
              }}
            >
              <i
                className="fa-solid fa-cloud-arrow-up"
                style={{
                  fontSize: "40px",
                  color: "#FF5722",
                  marginBottom: "10px",
                }}
              ></i>
              <p style={{ fontSize: "14px" }}>Klikni ovde ili prevuci sliku</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                }}
              ></label>
            </div>

            {previewImage && (
              <div
                style={{
                  marginTop: "15px",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <button
                  onClick={() => setPreviewImage(null)}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "rgba(255, 59, 48, 0.8)",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "30px",
                    height: "30px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
                <img
                  src={previewImage}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "150px",
                    borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                />
              </div>
            )}

            <button
              style={{
                width: "100%",
                background: "#FF5722",
                color: "white",
                border: "none",
                padding: "15px",
                borderRadius: "12px",
                fontWeight: "600",
                fontSize: "16px",
                cursor: "pointer",
                marginTop: "20px",
                boxShadow: "0 4px 15px rgba(255, 87, 34, 0.4)",
              }}
            >
              Pošalji na verifikaciju
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
