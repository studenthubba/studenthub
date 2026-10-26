"use client";

import { useState } from "react";
import Link from "next/link";

export default function DodajOglasPage() {
  const [tipOglasa, setTipOglasa] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const naslov = (
      e.currentTarget.elements.namedItem("naslov") as HTMLInputElement
    ).value;
    const lokacija = (
      e.currentTarget.elements.namedItem("lokacija") as HTMLInputElement
    ).value;

    alert(
      `Uspješno ste objavili oglas!\n\nKategorija: ${tipOglasa}\nNaslov: ${naslov}\nLokacija: ${lokacija}`,
    );

    // Kasnije ćemo ovdje dodati upis u bazu
    if (tipOglasa === "stanovi") window.location.href = "/";
    else if (tipOglasa === "poslovi") window.location.href = "/";
    else if (tipOglasa === "skripte") window.location.href = "/detalji";
    else if (tipOglasa === "cimeri") window.location.href = "/cimeri";
    else window.location.href = "/";
  };

  return (
    <>
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
            <Link
              href="/dodaj"
              className="btn-icon"
              title="Dodaj oglas"
              style={{
                color: "var(--primary-orange)",
                borderColor: "var(--primary-orange)",
              }}
            >
              <i className="fa-solid fa-plus"></i>
            </Link>
            <a href="#" className="btn-icon" title="Poruke">
              <i className="fa-solid fa-comment-dots"></i>
            </a>
            <Link href="/profil" className="btn-icon" title="Profil i postavke">
              <i className="fa-solid fa-gear"></i>
            </Link>
          </div>
        </div>
      </nav>

      {/* GLAVNI SADRŽAJ */}
      <main
        className="main-content"
        style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}
      >
        <div
          className="hero-section"
          style={{
            textAlign: "center",
            marginBottom: "30px",
            marginTop: "20px",
          }}
        >
          <div className="hero-text">
            <h2
              style={{
                fontSize: "32px",
                marginBottom: "10px",
                background: "linear-gradient(to right, #fff, #B0B0C0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Objavi nešto novo
            </h2>
            <p style={{ color: "var(--text-gray)", fontSize: "16px" }}>
              Podijeli sa studentima ono što tražiš ili nudiš.
            </p>
          </div>
        </div>

        <div
          style={{
            background: "var(--glass-bg)",
            backdropFilter: "var(--glass-blur)",
            border: "1px solid var(--glass-border)",
            borderRadius: "24px",
            padding: "30px",
            maxWidth: "700px",
            margin: "0 auto",
            boxShadow: "var(--glass-shadow)",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <label
                style={{
                  fontSize: "14px",
                  color: "var(--text-gray)",
                  fontWeight: "500",
                }}
              >
                Šta želiš objaviti?
              </label>
              <select
                value={tipOglasa}
                onChange={(e) => setTipOglasa(e.target.value)}
                required
                style={{
                  width: "100%",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  color: "white",
                  fontSize: "15px",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="" disabled>
                  Izaberi kategoriju...
                </option>
                <option value="stanovi">Stan</option>
                <option value="poslovi">Posao / Praksa</option>
                <option value="skripte">Skripta / Materijal</option>
                <option value="cimeri">Cimer</option>
              </select>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <label
                style={{
                  fontSize: "14px",
                  color: "var(--text-gray)",
                  fontWeight: "500",
                }}
              >
                Naslov oglasa
              </label>
              <input
                name="naslov"
                type="text"
                placeholder="npr. Tražim cimera za stan na Grbavici"
                required
                style={{
                  width: "100%",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  color: "white",
                  fontSize: "15px",
                  outline: "none",
                }}
              />
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <label
                style={{
                  fontSize: "14px",
                  color: "var(--text-gray)",
                  fontWeight: "500",
                }}
              >
                Opis
              </label>
              <textarea
                placeholder="Opiši detaljnije šta nudiš ili tražiš..."
                required
                style={{
                  width: "100%",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  color: "white",
                  fontSize: "15px",
                  outline: "none",
                  resize: "vertical",
                  minHeight: "120px",
                }}
              />
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <label
                style={{
                  fontSize: "14px",
                  color: "var(--text-gray)",
                  fontWeight: "500",
                }}
              >
                Lokacija
              </label>
              <input
                name="lokacija"
                type="text"
                placeholder="npr. Sarajevo, Grbavica"
                required
                style={{
                  width: "100%",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  color: "white",
                  fontSize: "15px",
                  outline: "none",
                }}
              />
            </div>

            {/* DINAMIČKA POLJA */}
            {(tipOglasa === "stanovi" || tipOglasa === "cimeri") && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  animation: "fadeIn 0.4s ease",
                }}
              >
                <label
                  style={{
                    fontSize: "14px",
                    color: "var(--text-gray)",
                    fontWeight: "500",
                  }}
                >
                  Cijena (KM/mj)
                </label>
                <input
                  type="number"
                  placeholder="npr. 250"
                  style={{
                    width: "100%",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    color: "white",
                    fontSize: "15px",
                    outline: "none",
                  }}
                />
              </div>
            )}

            {tipOglasa === "poslovi" && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  animation: "fadeIn 0.4s ease",
                }}
              >
                <label
                  style={{
                    fontSize: "14px",
                    color: "var(--text-gray)",
                    fontWeight: "500",
                  }}
                >
                  Vrsta posla / Plata
                </label>
                <input
                  type="text"
                  placeholder="npr. Honorarno, 800 KM"
                  style={{
                    width: "100%",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    color: "white",
                    fontSize: "15px",
                    outline: "none",
                  }}
                />
              </div>
            )}

            {tipOglasa === "skripte" && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  animation: "fadeIn 0.4s ease",
                }}
              >
                <label
                  style={{
                    fontSize: "14px",
                    color: "var(--text-gray)",
                    fontWeight: "500",
                  }}
                >
                  Fakultet / Predmet
                </label>
                <input
                  type="text"
                  placeholder="npr. ETF, Analiza 2"
                  style={{
                    width: "100%",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    color: "white",
                    fontSize: "15px",
                    outline: "none",
                  }}
                />
              </div>
            )}

            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <label
                style={{
                  fontSize: "14px",
                  color: "var(--text-gray)",
                  fontWeight: "500",
                }}
              >
                Slike (Opciono)
              </label>
              <div
                style={{
                  border: "2px dashed var(--glass-border)",
                  borderRadius: "16px",
                  padding: "30px",
                  textAlign: "center",
                  cursor: "pointer",
                  background: "rgba(255, 255, 255, 0.02)",
                }}
              >
                <i
                  className="fa-solid fa-cloud-arrow-up"
                  style={{
                    fontSize: "30px",
                    color: "var(--primary-orange)",
                    marginBottom: "10px",
                  }}
                ></i>
                <p style={{ color: "white" }}>Klikni da dodaš sliku</p>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                />
              </div>
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                background:
                  "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
                color: "white",
                border: "none",
                padding: "16px",
                borderRadius: "12px",
                fontWeight: "700",
                fontSize: "16px",
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(255, 87, 34, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              <i className="fa-solid fa-paper-plane"></i> Objavi oglas
            </button>
          </form>
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
        <Link href="/dodaj" className="nav-item active">
          <i className="fa-solid fa-plus-circle"></i>
          <span>Dodaj</span>
        </Link>
        <a href="#" className="nav-item">
          <i className="fa-solid fa-comments"></i>
          <span>Poruke</span>
        </a>
        <Link href="/profil" className="nav-item">
          <i className="fa-regular fa-user"></i>
          <span>Profil</span>
        </Link>
      </nav>
    </>
  );
}
