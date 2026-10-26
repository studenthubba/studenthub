"use client";

import { useState } from "react";
import Link from "next/link";

export default function TemaPage() {
  const [komentari, setKomentari] = useState([
    {
      id: 1,
      autor: "Amina T.",
      inicijal: "A",
      boja: "linear-gradient(135deg, #2575fc, #6a11cb)",
      vrijeme: "prije 1 sat",
      tekst:
        "Ma nema šanse da će padati kiša, prognoza se stalno mijenja. Vidimo se na Koševu! ⚽",
      lajkovi: 3,
    },
    {
      id: 2,
      autor: "Marko M.",
      inicijal: "M",
      boja: "linear-gradient(135deg, #4CAF50, #8BC34A)",
      vrijeme: "prije 30 min",
      tekst: "Hvala na info za fan shop, idem sutra da uzmem šal!",
      lajkovi: 1,
    },
  ]);

  const [noviKomentar, setNoviKomentar] = useState("");

  const handleOdgovori = (ime: string) => {
    setNoviKomentar(`@${ime} `);
    document.getElementById("textarea-komentar")?.focus();
  };

  const handlePosalji = () => {
    if (noviKomentar.trim() === "") return;

    setKomentari([
      ...komentari,
      {
        id: Date.now(),
        autor: "Vi",
        inicijal: "V",
        boja: "var(--primary-orange)",
        vrijeme: "Upravo sada",
        tekst: noviKomentar,
        lajkovi: 0,
      },
    ]);
    setNoviKomentar("");
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
            <Link href="/stanovi">Stanovi</Link>
            <Link href="/poslovi">Poslovi</Link>
            <Link href="/skripte">Skripte</Link>
            <Link href="/cimeri">Cimeri</Link>
            <Link href="/forum" className="active">
              Forum
            </Link>
          </div>
          <div className="nav-actions">
            <Link href="/dodaj" className="btn-icon" title="Dodaj oglas">
              <i className="fa-solid fa-plus"></i>
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
        <Link
          href="/forum"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "var(--primary-orange)",
            textDecoration: "none",
            marginBottom: "20px",
            fontWeight: "500",
          }}
        >
          <i className="fa-solid fa-arrow-left"></i> Nazad na Forum
        </Link>

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "40px",
            flexWrap: "wrap",
          }}
        >
          {/* SIDEBAR (Autor) */}
          <div style={{ width: "200px", flexShrink: 0 }}>
            <div
              style={{
                background: "var(--glass-bg)",
                backdropFilter: "var(--glass-blur)",
                border: "1px solid var(--glass-border)",
                borderRadius: "16px",
                padding: "20px",
                textAlign: "center",
                boxShadow: "var(--glass-shadow)",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background:
                    "url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80') center/cover",
                  margin: "0 auto 15px auto",
                  border: "3px solid var(--primary-orange)",
                }}
              ></div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  marginBottom: "5px",
                  color: "white",
                }}
              >
                plisek
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--text-gray)",
                  marginBottom: "15px",
                }}
              >
                Student ETF-a
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "var(--text-gray)",
                  textAlign: "left",
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  paddingTop: "10px",
                }}
              >
                <p
                  style={{
                    marginBottom: "5px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Postovi:</span>{" "}
                  <strong style={{ color: "white" }}>1235</strong>
                </p>
                <p
                  style={{
                    marginBottom: "5px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Pridružen:</span>{" "}
                  <strong style={{ color: "white" }}>09.03.2024.</strong>
                </p>
                <p
                  style={{
                    marginBottom: "5px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Podrška:</span>{" "}
                  <strong style={{ color: "var(--primary-orange)" }}>
                    13 <i className="fa-solid fa-heart"></i>
                  </strong>
                </p>
              </div>
            </div>
          </div>

          {/* MAIN POST */}
          <div style={{ flex: 1, minWidth: "300px" }}>
            <div
              style={{
                background: "var(--glass-bg)",
                backdropFilter: "var(--glass-blur)",
                border: "1px solid var(--glass-border)",
                borderRadius: "16px",
                padding: "30px",
                boxShadow: "var(--glass-shadow)",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  paddingBottom: "15px",
                  marginBottom: "20px",
                }}
              >
                <h1
                  style={{
                    fontSize: "24px",
                    marginBottom: "10px",
                    color: "white",
                  }}
                >
                  Re: FK Sarajevo
                </h1>
                <div
                  style={{
                    fontSize: "13px",
                    color: "var(--text-gray)",
                    display: "flex",
                    gap: "15px",
                  }}
                >
                  <span>
                    <i className="fa-regular fa-user"></i> plisek
                  </span>
                  <span>
                    <i className="fa-regular fa-clock"></i> 23. okt 2026, 11:58
                  </span>
                </div>
              </div>

              <div
                style={{
                  fontSize: "15px",
                  lineHeight: "1.7",
                  color: "#ddd",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderLeft: "4px solid var(--primary-orange)",
                    padding: "15px",
                    borderRadius: "0 8px 8px 0",
                    marginBottom: "20px",
                    fontStyle: "italic",
                    color: "var(--text-gray)",
                  }}
                >
                  <strong>Karlovlandić je napisao/la:</strong>
                  <br />
                  <em>18500 od jutros sa godišnjim</em>
                </div>

                <p style={{ marginBottom: "10px" }}>odakle ti info ???</p>
                <p style={{ marginBottom: "10px" }}>Precice ovo 25 k 😭😭</p>
                <p style={{ marginBottom: "20px" }}>
                  Jutros prognoza kiša počinje oko 23:00 😭😭 Za ove sto su
                  neodlučni
                </p>

                <hr
                  style={{
                    borderColor: "rgba(255,255,255,0.1)",
                    margin: "20px 0",
                  }}
                />

                <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
                  iz fan shopa
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    paddingLeft: 0,
                    color: "var(--text-gray)",
                    fontSize: "14px",
                    lineHeight: "1.8",
                  }}
                >
                  <li>2x šampion Jugoslavije</li>
                  <li>5x šampion Bosne i Hercegovine</li>
                  <li>8x osvajač Kupa BiH</li>
                  <li>1x osvajač Superkupa BiH</li>
                  <li>--Najtrofejniji klub u Bosni i Hercegovini--</li>
                  <li>---------Saraj'vo, za tebe živimo!!---------</li>
                </ul>
              </div>
            </div>

            {/* KOMENTARI */}
            <div>
              <h3
                style={{
                  marginBottom: "20px",
                  fontSize: "20px",
                  color: "white",
                }}
              >
                Odgovori ({komentari.length})
              </h3>

              <div>
                {komentari.map((komentar) => (
                  <div
                    key={komentar.id}
                    style={{
                      display: "flex",
                      gap: "15px",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)",
                      padding: "20px",
                      borderRadius: "16px",
                      marginBottom: "15px",
                    }}
                  >
                    <div
                      style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                        background: komentar.boja,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        color: "white",
                        flexShrink: 0,
                      }}
                    >
                      {komentar.inicijal}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "8px",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: "600",
                            fontSize: "14px",
                            color: "white",
                          }}
                        >
                          {komentar.autor}
                        </span>
                        <span
                          style={{
                            fontSize: "12px",
                            color: "var(--text-gray)",
                          }}
                        >
                          {komentar.vrijeme}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: "14px",
                          color: "#ccc",
                          lineHeight: "1.5",
                        }}
                      >
                        {komentar.tekst}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "15px",
                          marginTop: "10px",
                          fontSize: "13px",
                        }}
                      >
                        <span
                          style={{
                            color: "var(--text-gray)",
                            cursor: "pointer",
                          }}
                        >
                          <i className="fa-regular fa-heart"></i> Sviđa mi se (
                          {komentar.lajkovi})
                        </span>
                        <span
                          onClick={() => handleOdgovori(komentar.autor)}
                          style={{
                            color: "var(--text-gray)",
                            cursor: "pointer",
                          }}
                        >
                          <i className="fa-solid fa-reply"></i> Odgovori
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DODAVANJE KOMENTARA */}
            <div
              style={{
                marginTop: "30px",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <textarea
                id="textarea-komentar"
                value={noviKomentar}
                onChange={(e) => setNoviKomentar(e.target.value)}
                placeholder="Napiši svoj odgovor..."
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "16px",
                  padding: "15px",
                  color: "white",
                  minHeight: "100px",
                  resize: "vertical",
                  outline: "none",
                  fontFamily: "'Inter', sans-serif",
                }}
              />
              <button
                onClick={handlePosalji}
                style={{
                  alignSelf: "flex-end",
                  background: "var(--primary-orange)",
                  color: "white",
                  border: "none",
                  padding: "12px 25px",
                  borderRadius: "10px",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow: "0 4px 15px rgba(255, 87, 34, 0.3)",
                }}
              >
                Pošalji odgovor
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
        <Link href="/svioglasi" className="nav-item">
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
