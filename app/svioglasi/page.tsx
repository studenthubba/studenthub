"use client";

import { useState } from "react";
import Link from "next/link";

export default function SviOglasiPage() {
  const [aktivniFilter, setAktivniFilter] = useState("svi");

  const oglasi = [
    {
      id: 1,
      kategorija: "stanovi",
      naslov: "Stan na Koševu",
      lokacija: "Sarajevo, Koševo",
      ikona: "fa-building",
      tagovi: ["2 cimera"],
      cijena: "300 KM/mj",
    },
    {
      id: 2,
      kategorija: "poslovi",
      naslov: "Honorarni posao",
      lokacija: "IT Firma, Remote",
      ikona: "fa-laptop-code",
      tagovi: ["Front-end"],
      cijena: "800 KM/mj",
    },
    {
      id: 3,
      kategorija: "skripte",
      naslov: "Skripta Analiza 2",
      lokacija: "ETF Sarajevo",
      ikona: "fa-file-code",
      tagovi: ["Polaganje"],
      cijena: "25 KM",
    },
    {
      id: 4,
      kategorija: "cimeri",
      naslov: "Tražim cimera",
      lokacija: "Grbavica",
      ikona: "fa-user-tie",
      tagovi: ["Useljivo odmah"],
      cijena: "250 KM",
    },
  ];

  const filtriraniOglasi = oglasi.filter(
    (oglas) => aktivniFilter === "svi" || oglas.kategorija === aktivniFilter,
  );

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
            <Link href="/stanovi">Stanovi</Link>
            <Link href="/poslovi">Poslovi</Link>
            <Link href="/skripte">Skripte</Link>
            <Link href="/cimeri">Cimeri</Link>
            <Link href="/forum">Forum</Link>
          </div>
          <div className="nav-actions">
            <Link href="/dodaj" className="btn-icon" title="Dodaj oglas">
              <i className="fa-solid fa-plus"></i>
            </Link>
            <Link
              href="/korpa"
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
                0
              </span>
            </Link>
            <Link href="/poruke" className="btn-icon" title="Poruke">
              <i className="fa-solid fa-comment-dots"></i>
            </Link>
            <Link href="/profil" className="btn-icon" title="Profil i postavke">
              <i className="fa-solid fa-gear"></i>
            </Link>
          </div>
        </div>
      </nav>

      {/* GLAVNI SADRŽAJ */}
      <main
        className="main-content"
        style={{
          padding: "20px",
          maxWidth: "1200px",
          margin: "0 auto",
          paddingBottom: "100px",
        }}
      >
        <section style={{ marginTop: "30px", marginBottom: "40px" }}>
          <div style={{ marginBottom: "25px" }}>
            <h2
              style={{
                fontSize: "32px",
                marginBottom: "10px",
                background: "linear-gradient(to right, #fff, #B0B0C0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Svi oglasi
            </h2>
            <p style={{ color: "var(--text-gray)", fontSize: "16px" }}>
              Pronađi sve što ti treba na jednom mjestu.
            </p>
          </div>

          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              background: "var(--glass-bg)",
              backdropFilter: "var(--glass-blur)",
              border: "1px solid var(--glass-border)",
              borderRadius: "16px",
              padding: "5px",
              maxWidth: "700px",
              boxShadow: "var(--glass-shadow)",
            }}
          >
            <i
              className="fa-solid fa-magnifying-glass"
              style={{
                position: "absolute",
                left: "20px",
                color: "var(--text-gray)",
              }}
            ></i>
            <input
              type="text"
              placeholder="Pretraži sve oglase..."
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                padding: "15px 15px 15px 50px",
                color: "white",
                fontSize: "15px",
                outline: "none",
              }}
            />
            <button
              style={{
                background: "var(--primary-orange)",
                color: "white",
                border: "none",
                padding: "12px 25px",
                borderRadius: "12px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Pretraži
            </button>
          </div>
        </section>

        {/* FILTERI */}
        <section
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "12px",
            overflowX: "auto",
            paddingBottom: "15px",
            marginBottom: "30px",
          }}
        >
          {[
            { id: "svi", label: "Svi oglasi" },
            { id: "stanovi", label: "Stanovi" },
            { id: "poslovi", label: "Poslovi" },
            { id: "skripte", label: "Skripte" },
            { id: "cimeri", label: "Cimeri" },
          ].map((filter) => (
            <div
              key={filter.id}
              onClick={() => setAktivniFilter(filter.id)}
              style={{
                background:
                  aktivniFilter === filter.id
                    ? "var(--primary-orange)"
                    : "var(--glass-bg)",
                border: `1px solid ${aktivniFilter === filter.id ? "var(--primary-orange)" : "var(--glass-border)"}`,
                color:
                  aktivniFilter === filter.id ? "white" : "var(--text-gray)",
                padding: "10px 22px",
                borderRadius: "50px",
                fontSize: "14px",
                fontWeight: "500",
                whiteSpace: "nowrap",
                cursor: "pointer",
                transition: "var(--transition)",
                boxShadow:
                  aktivniFilter === filter.id
                    ? "0 4px 15px rgba(255, 87, 34, 0.4)"
                    : "none",
              }}
            >
              {filter.label}
            </div>
          ))}
        </section>

        <section>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "25px",
            }}
          >
            <h2 style={{ fontSize: "24px", fontWeight: "600", color: "white" }}>
              Najnoviji oglasi
            </h2>
            <span
              style={{
                color: "var(--primary-orange)",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Prikazano {filtriraniOglasi.length} oglasa
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "25px",
            }}
          >
            {filtriraniOglasi.map((oglas) => (
              <Link
                key={oglas.id}
                href="/detalji"
                style={{
                  display: "block",
                  background: "var(--glass-bg)",
                  backdropFilter: "var(--glass-blur)",
                  borderRadius: "24px",
                  padding: "25px",
                  border: "1px solid var(--glass-border)",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "var(--transition)",
                  boxShadow: "var(--glass-shadow)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      background: "rgba(255, 87, 34, 0.15)",
                      border: "1px solid rgba(255, 87, 34, 0.3)",
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                      color: "var(--primary-orange)",
                    }}
                  >
                    <i className={`fa-solid ${oglas.ikona}`}></i>
                  </div>
                  <div
                    style={{
                      color: "var(--text-gray)",
                      fontSize: "20px",
                      padding: "8px",
                      cursor: "pointer",
                    }}
                  >
                    <i className="fa-regular fa-heart"></i>
                  </div>
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "19px",
                      marginBottom: "10px",
                      color: "white",
                    }}
                  >
                    {oglas.naslov}
                  </h3>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "var(--text-gray)",
                      marginBottom: "18px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <i className="fa-solid fa-location-dot"></i>{" "}
                    {oglas.lokacija}
                  </p>
                  <div
                    style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
                  >
                    {oglas.tagovi.map((tag, idx) => (
                      <span
                        key={idx}
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          padding: "6px 14px",
                          borderRadius: "10px",
                          fontSize: "12px",
                          color: "#ddd",
                          border: "1px solid rgba(255,255,255,0.1)",
                          fontWeight: "500",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                    <span
                      style={{
                        background: "rgba(255, 87, 34, 0.15)",
                        padding: "6px 14px",
                        borderRadius: "10px",
                        fontSize: "12px",
                        color: "var(--primary-orange)",
                        border: "1px solid rgba(255, 87, 34, 0.3)",
                        fontWeight: "700",
                      }}
                    >
                      {oglas.cijena}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* DONJA MOBILNA NAVIGACIJA */}
      <nav className="mobile-bottom-nav">
        <Link href="/" className="nav-item">
          <i className="fa-solid fa-house"></i>
          <span>Početna</span>
        </Link>
        <Link href="/svioglasi" className="nav-item active">
          <i className="fa-solid fa-magnifying-glass"></i>
          <span>Istraži</span>
        </Link>
        <Link href="/dodaj" className="nav-item">
          <i className="fa-solid fa-plus-circle"></i>
          <span>Dodaj</span>
        </Link>
        <Link href="/poruke" className="nav-item">
          <i className="fa-solid fa-comments"></i>
          <span>Poruke</span>
        </Link>
        <Link href="/profil" className="nav-item">
          <i className="fa-regular fa-user"></i>
          <span>Profil</span>
        </Link>
      </nav>
    </>
  );
}
