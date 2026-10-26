"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function PorukePage() {
  const [poruke, setPoruke] = useState([
    {
      id: 1,
      tekst: "Zdravo! Vidjela sam tvoj oglas za cimera.",
      posiljalac: "primljena",
      vrijeme: "10:30",
    },
    {
      id: 2,
      tekst: "Cao Džejla! Da, stan je još uvijek slobodan.",
      posiljalac: "poslana",
      vrijeme: "10:32",
    },
    {
      id: 3,
      tekst: "Super! Da li je uračunata režija u cijenu?",
      posiljalac: "primljena",
      vrijeme: "10:33",
    },
    {
      id: 4,
      tekst: "Režije se dijele na pola, ali internet je uključen u cijenu.",
      posiljalac: "poslana",
      vrijeme: "10:35",
    },
  ]);

  const [novaPoruka, setNovaPoruka] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Skroluj na dno kada se doda nova poruka
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [poruke]);

  const handlePosalji = () => {
    if (novaPoruka.trim() === "") return;

    const now = new Date();
    const vrijeme = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

    setPoruke([
      ...poruke,
      {
        id: Date.now(),
        tekst: novaPoruka,
        posiljalac: "poslana",
        vrijeme: vrijeme,
      },
    ]);

    setNovaPoruka("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handlePosalji();
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
            <Link href="/forum">Forum</Link>
          </div>
          <div className="nav-actions">
            <Link
              href="/poruke"
              className="btn-icon"
              title="Poruke"
              style={{
                color: "var(--primary-orange)",
                borderColor: "var(--primary-orange)",
              }}
            >
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
        <div
          style={{
            display: "flex",
            height: "calc(100vh - 150px)",
            background: "var(--glass-bg)",
            backdropFilter: "var(--glass-blur)",
            borderRadius: "24px",
            border: "1px solid var(--glass-border)",
            overflow: "hidden",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          {/* SIDEBAR (Lista kontakata) */}
          <div
            style={{
              width: "320px",
              borderRight: "1px solid var(--glass-border)",
              display: "flex",
              flexDirection: "column",
            }}
            className="hidden md:flex"
          >
            <div
              style={{
                padding: "20px",
                borderBottom: "1px solid var(--glass-border)",
              }}
            >
              <h3 style={{ fontSize: "18px", color: "white" }}>Poruke</h3>
            </div>
            <div style={{ overflowY: "auto", flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  padding: "15px 20px",
                  cursor: "pointer",
                  background: "rgba(255,255,255,0.05)",
                  borderBottom: "1px solid rgba(255,255,255,0.02)",
                }}
              >
                <div
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    background: "var(--primary-orange)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    color: "white",
                    flexShrink: 0,
                  }}
                >
                  DŽ
                </div>
                <div>
                  <h4
                    style={{
                      fontSize: "14px",
                      marginBottom: "3px",
                      color: "white",
                    }}
                  >
                    Džejla R.
                  </h4>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "var(--text-gray)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "180px",
                    }}
                  >
                    Zdravo, da li je stan još slobodan?
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  padding: "15px 20px",
                  cursor: "pointer",
                  borderBottom: "1px solid rgba(255,255,255,0.02)",
                }}
              >
                <div
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    background: "#2575fc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    color: "white",
                    flexShrink: 0,
                  }}
                >
                  AM
                </div>
                <div>
                  <h4
                    style={{
                      fontSize: "14px",
                      marginBottom: "3px",
                      color: "white",
                    }}
                  >
                    Amer T.
                  </h4>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "var(--text-gray)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "180px",
                    }}
                  >
                    Super, vidimo se sutra!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CHAT MAIN */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {/* Chat Header */}
            <div
              style={{
                padding: "15px 20px",
                borderBottom: "1px solid var(--glass-border)",
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <Link
                href="/"
                style={{
                  color: "white",
                  textDecoration: "none",
                  marginRight: "10px",
                }}
              >
                <i className="fa-solid fa-arrow-left"></i>
              </Link>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "var(--primary-orange)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  color: "white",
                  fontSize: "14px",
                }}
              >
                DŽ
              </div>
              <div>
                <h3 style={{ fontSize: "16px", color: "white" }}>Džejla R.</h3>
                <p style={{ fontSize: "12px", color: "#4CAF50" }}>Online</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div
              style={{
                flex: 1,
                padding: "20px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              {poruke.map((poruka) => (
                <div
                  key={poruka.id}
                  style={{
                    maxWidth: "70%",
                    padding: "12px 18px",
                    borderRadius: "18px",
                    fontSize: "14px",
                    lineHeight: "1.4",
                    position: "relative",
                    background:
                      poruka.posiljalac === "poslana"
                        ? "var(--primary-orange)"
                        : "rgba(255,255,255,0.08)",
                    color: poruka.posiljalac === "poslana" ? "white" : "white",
                    alignSelf:
                      poruka.posiljalac === "poslana"
                        ? "flex-end"
                        : "flex-start",
                    borderBottomLeftRadius:
                      poruka.posiljalac === "primljena" ? "4px" : "18px",
                    borderBottomRightRadius:
                      poruka.posiljalac === "poslana" ? "4px" : "18px",
                    boxShadow:
                      poruka.posiljalac === "poslana"
                        ? "0 4px 15px rgba(255, 87, 34, 0.3)"
                        : "none",
                  }}
                >
                  {poruka.tekst}
                  <span
                    style={{
                      fontSize: "10px",
                      opacity: 0.6,
                      marginTop: "5px",
                      display: "block",
                      textAlign: "right",
                    }}
                  >
                    {poruka.vrijeme}
                  </span>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div
              style={{
                padding: "15px 20px",
                borderTop: "1px solid var(--glass-border)",
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <input
                type="text"
                value={novaPoruka}
                onChange={(e) => setNovaPoruka(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Napiši poruku..."
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "20px",
                  padding: "12px 20px",
                  color: "white",
                  outline: "none",
                }}
              />
              <button
                onClick={handlePosalji}
                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "50%",
                  background: "var(--primary-orange)",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
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
        <Link href="/dodaj" className="nav-item">
          <i className="fa-solid fa-plus-circle"></i>
          <span>Dodaj</span>
        </Link>
        <Link href="/poruke" className="nav-item active">
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
