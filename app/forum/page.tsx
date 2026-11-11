"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "../../lib/supabase";

export default function ForumPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [teme, setTeme] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const supabase = createClient();

  // 1. Učitavamo teme iz baze
  const fetchTeme = async () => {
    const { data, error } = await supabase
      .from("forum_teme")
      .select(
        `
        id,
        naslov,
        prikaceno,
        kreirano_u,
        forum_kategorije (naziv),
        korisnici (ime, prezime)
      `,
      )
      .order("kreirano_u", { ascending: false });

    if (data) setTeme(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTeme();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 2. Logika za dodavanje nove teme
  const handleNovaTema = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    const form = e.currentTarget;
    const naslov = (form.elements.namedItem("naslov") as HTMLInputElement)
      .value;
    const kategorijaNaziv = (
      form.elements.namedItem("kategorija") as HTMLSelectElement
    ).value;

    // Provjera da li je korisnik ulogovan
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      alert("Morate biti prijavljeni da biste započeli temu.");
      setSaving(false);
      return;
    }

    // Nalazimo ID korisnika u tabeli 'korisnici'
    const { data: korisnik } = await supabase
      .from("korisnici")
      .select("id")
      .eq("auth_user_id", user.id)
      .single();

    if (!korisnik) {
      alert("Greška: Korisnik nije pronađen.");
      setSaving(false);
      return;
    }

    // Nalazimo ID kategorije na osnovu izabranog naziva
    const { data: kategorija } = await supabase
      .from("forum_kategorije")
      .select("id")
      .eq("naziv", kategorijaNaziv)
      .single();

    // Upisujemo u tabelu forum_teme
    const { error } = await supabase.from("forum_teme").insert({
      naslov: naslov,
      kategorija_id: kategorija?.id || null,
      autor_id: korisnik.id,
      prikaceno: false,
    });

    if (error) {
      alert("Greška pri objavi: " + error.message);
      setSaving(false);
    } else {
      alert("Tema uspješno objavljena!");
      setIsModalOpen(false);
      form.reset();
      fetchTeme(); // Osvježavamo listu tema bez reloada stranice
      setSaving(false);
    }
  };

  // Pomoćna funkcija za formatiranje datuma
  const formatirajDatum = (datum: string) => {
    return new Date(datum).toLocaleDateString("bs-BA", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading)
    return (
      <div style={{ color: "white", textAlign: "center", marginTop: "100px" }}>
        Učitavanje foruma...
      </div>
    );

  return (
    <>
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

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
            <Link href="/korpa" className="btn-icon" title="Korpa">
              <i className="fa-solid fa-cart-shopping"></i>
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
          {teme.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "50px",
                color: "var(--text-gray)",
              }}
            >
              <i
                className="fa-solid fa-comments"
                style={{
                  fontSize: "50px",
                  marginBottom: "20px",
                  color: "var(--primary-orange)",
                }}
              ></i>
              <h3 style={{ fontSize: "20px", color: "white" }}>
                Nema aktivnih tema.
              </h3>
              <p>Budi prvi koji će započeti diskusiju!</p>
            </div>
          ) : (
            teme.map((tema) => (
              <Link
                key={tema.id}
                href={`/tema/${tema.id}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    background: "var(--glass-bg)",
                    backdropFilter: "var(--glass-blur)",
                    border: "1px solid var(--glass-border)",
                    borderRadius: "16px",
                    padding: "20px",
                    display: "flex",
                    gap: "20px",
                    alignItems: "center",
                    transition: "var(--transition)",
                  }}
                  className="hover:border-orange-500"
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "12px",
                      background:
                        "linear-gradient(135deg, var(--primary-orange), var(--gradient-end))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                      color: "white",
                      flexShrink: 0,
                    }}
                  >
                    <i className="fa-solid fa-comment-dots"></i>
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
                        <i className="fa-regular fa-user"></i>{" "}
                        {tema.korisnici?.ime} {tema.korisnici?.prezime}
                      </span>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <i className="fa-regular fa-clock"></i>{" "}
                        {formatirajDatum(tema.kreirano_u)}
                      </span>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <i className="fa-solid fa-tag"></i>{" "}
                        {tema.forum_kategorije?.naziv || "Općenito"}
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
                        0
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
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </main>

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
                  Kategorija
                </label>
                <select
                  name="kategorija"
                  required
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
                  <option
                    value="Pravni fakultet"
                    style={{ background: "#1E1E32" }}
                  >
                    Pravni fakultet
                  </option>
                  <option
                    value="Stanovi i cimeri"
                    style={{ background: "#1E1E32" }}
                  >
                    Stanovi i cimeri
                  </option>
                  <option value="Sport" style={{ background: "#1E1E32" }}>
                    Sport
                  </option>
                  <option
                    value="Ispiti i skripte"
                    style={{ background: "#1E1E32" }}
                  >
                    Ispiti i skripte
                  </option>
                </select>
              </div>
              <button
                type="submit"
                disabled={saving}
                style={{
                  width: "100%",
                  background: "var(--primary-orange)",
                  color: "white",
                  border: "none",
                  padding: "14px",
                  borderRadius: "12px",
                  fontWeight: "600",
                  fontSize: "16px",
                  cursor: saving ? "not-allowed" : "pointer",
                  boxShadow: "0 4px 15px rgba(255, 87, 34, 0.4)",
                  marginTop: "10px",
                  opacity: saving ? 0.7 : 1,
                }}
              >
                {saving ? "Objavljivanje..." : "Objavi temu"}
              </button>
            </form>
          </div>
        </div>
      )}

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
