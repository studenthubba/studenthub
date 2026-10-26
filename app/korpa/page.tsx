"use client";

import { useState } from "react";
import Link from "next/link";

export default function KorpaPage() {
  // Privremeni podaci za korpu (kasnije idu iz baze)
  const [korpa, setKorpa] = useState<any[]>([
    {
      id: 1,
      naslov: "Skripta - Analiza 2",
      opis: "Skripta - ETF Sarajevo",
      cijena: 25,
      ikona: "fa-solid fa-file-code",
    },
  ]);

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [nacinDostave, setNacinDostave] = useState("");

  const handleUkloni = (id: number) => {
    setKorpa(korpa.filter((item) => item.id !== id));
  };

  const handleKupovina = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Kupovina uspješna! Hvala na povjerenju.");
    setKorpa([]);
    setIsCheckoutModalOpen(false);
    window.location.href = "/";
  };

  const ukupnaCijena = korpa.reduce((sum, item) => sum + item.cijena, 0);

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
                {korpa.length}
              </span>
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
        <div style={{ marginBottom: "30px" }}>
          <h2
            style={{
              fontSize: "32px",
              marginBottom: "10px",
              background: "linear-gradient(to right, #fff, #B0B0C0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Moja korpa
          </h2>
          <p style={{ color: "var(--text-gray)", fontSize: "16px" }}>
            Pregledajte artikle koje želite kupiti.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "30px",
            maxWidth: "1000px",
            margin: "0 auto",
            flexWrap: "wrap",
          }}
        >
          {/* LISTA ARTIKALA */}
          <div
            style={{
              flex: "2 1 500px",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            {korpa.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "50px 20px",
                  color: "var(--text-gray)",
                  background: "var(--glass-bg)",
                  borderRadius: "20px",
                  border: "1px solid var(--glass-border)",
                }}
              >
                <i
                  className="fa-solid fa-cart-shopping"
                  style={{
                    fontSize: "60px",
                    color: "var(--primary-orange)",
                    marginBottom: "20px",
                  }}
                ></i>
                <h3
                  style={{
                    fontSize: "20px",
                    marginBottom: "10px",
                    color: "white",
                  }}
                >
                  Vaša korpa je prazna
                </h3>
                <p>Idite na oglase i pronađite nešto zanimljivo.</p>
                <Link
                  href="/"
                  style={{
                    display: "inline-block",
                    marginTop: "20px",
                    padding: "12px 25px",
                    background: "var(--primary-orange)",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "12px",
                    fontWeight: "600",
                  }}
                >
                  Pregledaj oglase
                </Link>
              </div>
            ) : (
              korpa.map((artikal) => (
                <div
                  key={artikal.id}
                  style={{
                    display: "flex",
                    gap: "20px",
                    background: "var(--glass-bg)",
                    borderRadius: "16px",
                    padding: "20px",
                    alignItems: "center",
                    border: "1px solid var(--glass-border)",
                  }}
                >
                  <div
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "12px",
                      background: "rgba(255, 87, 34, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "28px",
                      color: "var(--primary-orange)",
                      flexShrink: 0,
                    }}
                  >
                    <i className={artikal.ikona}></i>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        fontSize: "18px",
                        marginBottom: "5px",
                        color: "white",
                      }}
                    >
                      {artikal.naslov}
                    </h3>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "var(--text-gray)",
                        marginBottom: "10px",
                      }}
                    >
                      {artikal.opis}
                    </p>
                    <div
                      style={{
                        fontSize: "18px",
                        color: "var(--primary-orange)",
                        fontWeight: "700",
                      }}
                    >
                      {artikal.cijena} KM
                    </div>
                  </div>
                  <button
                    onClick={() => handleUkloni(artikal.id)}
                    style={{
                      background: "rgba(255, 59, 48, 0.1)",
                      color: "#FF3B30",
                      border: "1px solid rgba(255, 59, 48, 0.3)",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              ))
            )}
          </div>

          {/* SAŽETAK */}
          <div
            style={{
              flex: "1 1 300px",
              background: "var(--glass-bg)",
              borderRadius: "20px",
              padding: "25px",
              border: "1px solid var(--glass-border)",
              height: "fit-content",
            }}
          >
            <h3
              style={{
                fontSize: "20px",
                marginBottom: "20px",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                paddingBottom: "10px",
                color: "white",
              }}
            >
              Sažetak
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "15px",
                fontSize: "14px",
                color: "var(--text-gray)",
              }}
            >
              <span>Broj artikala:</span>
              <span>{korpa.length}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "15px",
                fontSize: "14px",
                color: "var(--text-gray)",
              }}
            >
              <span>Dostava:</span>
              <span>Besplatno</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
                paddingTop: "15px",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                fontSize: "20px",
                fontWeight: "700",
                color: "white",
              }}
            >
              <span>Ukupno:</span>
              <span style={{ color: "var(--primary-orange)" }}>
                {ukupnaCijena} KM
              </span>
            </div>
            <button
              onClick={() => setIsCheckoutModalOpen(true)}
              disabled={korpa.length === 0}
              style={{
                width: "100%",
                background: "var(--primary-orange)",
                color: "white",
                border: "none",
                padding: "15px",
                borderRadius: "12px",
                fontWeight: "600",
                fontSize: "16px",
                cursor: korpa.length === 0 ? "not-allowed" : "pointer",
                marginTop: "20px",
                opacity: korpa.length === 0 ? 0.5 : 1,
              }}
            >
              Završi kupovinu
            </button>
          </div>
        </div>
      </main>

      {/* MODAL ZA PLAĆANJE */}
      {isCheckoutModalOpen && (
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
            }}
          >
            <button
              onClick={() => setIsCheckoutModalOpen(false)}
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
                Završetak kupovine
              </h2>
              <p style={{ color: "var(--text-gray)", fontSize: "14px" }}>
                Izaberite način plaćanja i dostave.
              </p>
            </div>

            <form
              onSubmit={handleKupovina}
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
                  Način plaćanja
                </label>
                <select
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
                >
                  <option value="" disabled>
                    Izaberi način plaćanja...
                  </option>
                  <option value="Pouzećem" style={{ background: "#1E1E32" }}>
                    Pouzećem (Plaćanje pri dostavi)
                  </option>
                  <option value="Karticom" style={{ background: "#1E1E32" }}>
                    Karticom (Online)
                  </option>
                </select>
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
                  Način dostave
                </label>
                <select
                  required
                  value={nacinDostave}
                  onChange={(e) => setNacinDostave(e.target.value)}
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    padding: "12px 15px",
                    borderRadius: "10px",
                    color: "white",
                    outline: "none",
                  }}
                >
                  <option value="" disabled>
                    Izaberi način dostave...
                  </option>
                  <option
                    value="Dostava na adresu"
                    style={{ background: "#1E1E32" }}
                  >
                    Dostava na adresu
                  </option>
                  <option
                    value="Lično preuzimanje"
                    style={{ background: "#1E1E32" }}
                  >
                    Lično preuzimanje
                  </option>
                </select>
              </div>

              {nacinDostave === "Dostava na adresu" && (
                <div style={{ animation: "fadeIn 0.3s ease" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      color: "var(--text-gray)",
                      marginBottom: "5px",
                    }}
                  >
                    Adresa za dostavu
                  </label>
                  <input
                    type="text"
                    placeholder="Ulica, broj, grad"
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
              )}

              <button
                type="submit"
                style={{
                  width: "100%",
                  background: "var(--primary-orange)",
                  color: "white",
                  border: "none",
                  padding: "15px",
                  borderRadius: "12px",
                  fontWeight: "600",
                  fontSize: "16px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                Potvrdi kupovinu
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
