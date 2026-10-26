"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForumPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Početne teme
  const [teme, setTeme] = useState([
    {
      id: 1,
      naslov: "Kakva je Analiza 2 kod profesora Hadžića?",
      autor: "Amina T.",
      vrijeme: "prije 2 sata",
      kategorija: "ETF Sarajevo",
      ikona: "fa-graduation-cap",
      boja: "linear-gradient(135deg, #FF5722, #FF3D00)",
      odgovora: 0,
      pregleda: 0,
    },
    {
      id: 2,
      naslov: "Re: FK Sarajevo - Navijači i studentske akcije",
      autor: "plisek",
      vrijeme: "juče u 11:58",
      kategorija: "Sport",
      ikona: "fa-futbol",
      boja: "linear-gradient(135deg, #4CAF50, #8BC34A)",
      odgovora: 0,
      pregleda: 0,
    },
  ]);

  const handleNovaTema = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const naslov = (form.elements.namedItem("naslov") as HTMLInputElement)
      .value;
    const kategorija = (
      form.elements.namedItem("kategorija") as HTMLSelectElement
    ).value;

    const novaTema = {
      id: Date.now(),
      naslov: naslov,
      autor: "Vi", // Kasnije ide iz baze
      vrijeme: "Upravo sada",
      kategorija: kategorija,
      ikona: "fa-comment-dots",
      boja: "linear-gradient(135deg, var(--primary-orange), var(--gradient-end))",
      odgovora: 0,
      pregleda: 0,
    };

    setTeme([novaTema, ...teme]);
    setIsModalOpen(false);
    form.reset();
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
            <Link href="/forum" className="active">
              Forum
            </Link>
          </div>
          <div className="nav-actions">
            <Link href="/dodaj" className="btn-icon" title="Dodaj oglas">
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
        style={{
          padding: "20px",
          maxWidth: "1200px",
          margin: "0 auto",
          paddingBottom: "100px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "32px",
                marginBottom: "10px",
                background: "linear-gradient(to right, #fff, #B0B0C0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Studentski Forum
            </h2>
            <p style={{ color: "var(--text-gray)", fontSize: "16px" }}>
              Pitaj, diskutuj i podijeli iskustva sa kolegama.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              background: "var(--primary-orange)",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "12px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 15px rgba(255, 87, 34, 0.4)",
            }}
          >
            <i className="fa-solid fa-plus"></i> Nova tema
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {teme.map((tema) => (
            <div
              key={tema.id}
              style={{
                background: "var(--glass-bg)",
                backdropFilter: "var(--glass-blur)",
                border: "1px solid var(--glass-border)",
                borderRadius: "16px",
                padding: "20px",
                display: "flex",
                gap: "20px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "12px",
                  background: tema.boja,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  color: "white",
                  flexShrink: 0,
                }}
              >
                <i className={`fa-solid ${tema.ikona}`}></i>
              </div>

              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    marginBottom: "5px",
                    color: "white",
                  }}
                >
                  {tema.naslov}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "var(--text-gray)",
                    display: "flex",
                    gap: "15px",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <i className="fa-regular fa-user"></i> {tema.autor}
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <i className="fa-regular fa-clock"></i> {tema.vrijeme}
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <i className="fa-solid fa-tag"></i> {tema.kategorija}
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                  marginLeft: "auto",
                  paddingLeft: "20px",
                  borderLeft: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <h4
                    style={{
                      fontSize: "18px",
                      color: "var(--primary-orange)",
                      marginBottom: "2px",
                    }}
                  >
                    {tema.odgovora}
                  </h4>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "var(--text-gray)",
                      textTransform: "uppercase",
                    }}
                  >
                    Odgovora
                  </p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <h4
                    style={{
                      fontSize: "18px",
                      color: "var(--primary-orange)",
                      marginBottom: "2px",
                    }}
                  >
                    {tema.pregleda}
                  </h4>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "var(--text-gray)",
                      textTransform: "uppercase",
                    }}
                  >
                    Pregleda
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* MODAL ZA NOVU TEMU */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(5px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "rgba(18, 18, 36, 0.95)",
              border: "1px solid var(--glass-border)",
              borderRadius: "24px",
              padding: "30px",
              width: "90%",
              maxWidth: "500px",
              position: "relative",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
            }}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
                color: "var(--text-gray)",
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
                Započni novu temu
              </h2>
              <p style={{ color: "var(--text-gray)", fontSize: "14px" }}>
                Podijeli pitanje ili diskusiju sa studentima.
              </p>
            </div>

            <form
              onSubmit={handleNovaTema}
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    color: "var(--text-gray)",
                    marginBottom: "5px",
                  }}
                >
                  Naslov teme
                </label>
                <input
                  name="naslov"
                  type="text"
                  placeholder="npr. Gdje kupiti skripte za prvu godinu?"
                  required
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    padding: "12px 15px",
                    borderRadius: "10px",
                    color: "white",
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    color: "var(--text-gray)",
                    marginBottom: "5px",
                  }}
                >
                  Kategorija / Tag
                </label>
                <select
                  name="kategorija"
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    padding: "12px 15px",
                    borderRadius: "10px",
                    color: "white",
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  <option value="Općenito" style={{ background: "#1E1E32" }}>
                    Općenito
                  </option>
                  <option
                    value="ETF Sarajevo"
                    style={{ background: "#1E1E32" }}
                  >
                    ETF Sarajevo
                  </option>
                  <option
                    value="Ekonomski fakultet"
                    style={{ background: "#1E1E32" }}
                  >
                    Ekonomski fakultet
                  </option>
                  <option value="Stanovi" style={{ background: "#1E1E32" }}>
                    Stanovi
                  </option>
                  <option value="Sport" style={{ background: "#1E1E32" }}>
                    Sport
                  </option>
                </select>
              </div>
              <button
                type="submit"
                style={{
                  width: "100%",
                  background: "var(--primary-orange)",
                  color: "white",
                  border: "none",
                  padding: "14px",
                  borderRadius: "12px",
                  fontWeight: "600",
                  fontSize: "16px",
                  cursor: "pointer",
                  boxShadow: "0 4px 15px rgba(255, 87, 34, 0.4)",
                  marginTop: "10px",
                }}
              >
                Objavi temu
              </button>
            </form>
          </div>
        </div>
      )}

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
        <Link href="/dodaj" className="nav-item">
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
