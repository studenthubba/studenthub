"use client";

import { useState } from "react";
import Link from "next/link";

export default function DetaljiOglasaPage() {
  const [sacuvan, setSacuvan] = useState(false);
  const [korpaBroj, setKorpaBroj] = useState(0);

  // Funkcija za dodavanje u korpu (privremeno samo na ekranu)
  const handleDodajUKorpu = () => {
    setKorpaBroj((prev) => prev + 1);
    alert("Artikal 'Skripta - Analiza 2' je uspješno dodan u korpu!");
  };

  const handleSacuvaj = () => {
    setSacuvan(!sacuvan);
    if (!sacuvan) {
      alert("Oglas je sačuvan! Možete ga pronaći na svom profilu.");
    }
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
            <a href="#" className="active">
              Skripte
            </a>
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
                  background: "var(--primary-orange)",
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
                {korpaBroj}
              </span>
            </a>
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
        <Link
          href="/"
          className="see-all"
          style={{ marginBottom: "20px", display: "inline-flex" }}
        >
          <i className="fa-solid fa-arrow-left"></i> Nazad na skripte
        </Link>

        <div
          className="listing-card"
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            cursor: "default",
            background: "var(--glass-bg)",
            padding: "25px",
            borderRadius: "24px",
            border: "1px solid var(--glass-border)",
          }}
        >
          <div
            className="card-header"
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  background: "rgba(255, 87, 34, 0.15)",
                  border: "1px solid rgba(255, 87, 34, 0.3)",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "32px",
                  color: "var(--primary-orange)",
                }}
              >
                <i className="fa-solid fa-file-code"></i>
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "24px",
                    marginBottom: "5px",
                    color: "white",
                  }}
                >
                  Skripta - Analiza 2
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    marginBottom: 0,
                    color: "var(--text-gray)",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <i className="fa-solid fa-graduation-cap"></i> ETF Sarajevo
                </p>
              </div>
            </div>

            <div
              onClick={handleSacuvaj}
              style={{
                fontSize: "24px",
                color: sacuvan ? "var(--primary-orange)" : "var(--text-gray)",
                cursor: "pointer",
                transition: "var(--transition)",
              }}
            >
              <i
                className={
                  sacuvan ? "fa-solid fa-heart" : "fa-regular fa-heart"
                }
              ></i>
            </div>
          </div>

          <div
            style={{
              marginTop: "20px",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              paddingTop: "20px",
            }}
          >
            <h4
              style={{ color: "var(--primary-orange)", marginBottom: "10px" }}
            >
              O oglasu
            </h4>
            <p
              style={{
                color: "#ddd",
                fontSize: "15px",
                lineHeight: "1.6",
                marginBottom: "20px",
              }}
            >
              "Prodajem skriptu iz predmeta Analiza 2. Skripta je u odličnom
              stanju, sadrži sva predavanja i vježbe, kao i riješene ispitne
              rokove. Odlična za pripremu ispita!"
            </p>

            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                marginBottom: "20px",
              }}
            >
              <span className="tag">
                <i className="fa-solid fa-book"></i> 120 str.
              </span>
              <span className="tag">
                <i className="fa-solid fa-file-pdf"></i> PDF
              </span>
              <span className="tag">
                <i className="fa-solid fa-graduation-cap"></i> ETF
              </span>
              <span
                className="tag price-tag"
                style={{
                  background: "rgba(255, 87, 34, 0.15)",
                  color: "var(--primary-orange)",
                  borderColor: "rgba(255, 87, 34, 0.3)",
                  fontWeight: "700",
                }}
              >
                25 KM
              </span>
            </div>
          </div>

          <div style={{ marginTop: "20px", marginBottom: "15px" }}>
            <button
              onClick={handleDodajUKorpu}
              style={{
                width: "100%",
                background: "transparent",
                border: "1px solid var(--primary-orange)",
                color: "var(--primary-orange)",
                padding: "12px",
                borderRadius: "12px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "var(--transition)",
              }}
            >
              <i className="fa-solid fa-cart-plus"></i> Dodaj u korpu
            </button>
          </div>

          <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
            <a
              href="#"
              style={{
                flex: 1,
                textAlign: "center",
                textDecoration: "none",
                background: "var(--primary-orange)",
                color: "white",
                padding: "12px",
                borderRadius: "12px",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <i className="fa-solid fa-comment-dots"></i> Pošalji poruku
            </a>
            <button
              style={{
                flex: 0.5,
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
                color: "white",
                padding: "12px",
                borderRadius: "12px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <i className="fa-solid fa-phone"></i> Pozovi
            </button>
          </div>
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
        <Link href="/profil" className="nav-item">
          <i className="fa-regular fa-user"></i>
          <span>Profil</span>
        </Link>
      </nav>
    </>
  );
}
