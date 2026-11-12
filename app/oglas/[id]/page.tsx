"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "../../../lib/supabase";

export default function OglasDetaljiPage() {
  const { id } = useParams();
  const router = useRouter();
  const supabase = createClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [oglas, setOglas] = useState<Record<string, any> | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [slike, setSlike] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [trenutnaSlika, setTrenutnaSlika] = useState(0);

  useEffect(() => {
    if (!id) return;

    const fetchOglas = async () => {
      // 1. Uzimamo podatke o oglasu
      const { data: oglasData, error: oglasError } = await supabase
        .from("oglas")
        .select("*")
        .eq("id", id)
        .single();

      if (oglasError) {
        console.error("Greška pri učitavanju oglasa:", oglasError);
      }

      if (oglasData) {
        setOglas(oglasData);

        // 2. Uzimamo slike vezane za ovaj oglas
        const { data: slikeData } = await supabase
          .from("oglasi_slike")
          .select("*")
          .eq("oglas_id", id)
          .order("redoslijed", { ascending: true });

        if (slikeData && slikeData.length > 0) {
          setSlike(slikeData);
        }
      }
      setLoading(false);

      // 3. Povećavamo broj pregleda (samo jednom po tabu)
      const sessionKey = `pregledano_${id}`;
      if (!sessionStorage.getItem(sessionKey)) {
        sessionStorage.setItem(sessionKey, "true");
        await supabase.rpc("inkrementiraj_preglede", { p_oglas: Number(id) });
      }
    };

    fetchOglas();
  }, [id, supabase]);

  const handleDodajUKorpu = async () => {
    if (!oglas) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      alert("Morate biti prijavljeni da biste dodali oglas u korpu.");
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
      return;
    }

    // Ubacujemo u tabelu korpa_stavke
    const { error } = await supabase.from("korpa_stavke").insert({
      korisnik_id: korisnik.id,
      oglas_id: oglas.id,
      kolicina: 1,
    });

    if (error) {
      if (error.code === "23505") {
        alert("Ovaj oglas je već u vašoj korpi!");
      } else {
        alert("Greška: " + error.message);
      }
    } else {
      alert("Oglas je uspješno dodan u korpu!");
    }
  };

  const handleSacuvaj = async () => {
    if (!oglas) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      alert("Morate biti prijavljeni da biste sačuvali oglas.");
      return;
    }

    const { data: korisnik } = await supabase
      .from("korisnici")
      .select("id")
      .eq("auth_user_id", user.id)
      .single();

    if (!korisnik) return;

    const { error } = await supabase.from("sacuvani_oglasi").insert({
      korisnik_id: korisnik.id,
      oglas_id: oglas.id,
    });

    if (error) {
      if (error.code === "23505") {
        alert("Oglas je već sačuvan na vašem profilu.");
      } else {
        alert("Greška: " + error.message);
      }
    } else {
      alert("Oglas je uspješno sačuvan! Možete ga pronaći na profilu.");
    }
  };

  const handlePoruka = async () => {
    if (!oglas) return;
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      alert("Morate biti prijavljeni da biste poslali poruku.");
      return;
    }
    // Kasnije ide logika za kreiranje chat sobe
    router.push("/poruke");
  };

  // DUGME ZA SHARE
  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert("Link oglasa je kopiran! Možete ga zalijepiti gdje god želite.");
  };

  if (loading)
    return (
      <div style={{ color: "white", textAlign: "center", marginTop: "100px" }}>
        Učitavanje oglasa...
      </div>
    );

  if (!oglas)
    return (
      <div style={{ color: "white", textAlign: "center", marginTop: "100px" }}>
        Oglas nije pronađen.
      </div>
    );

  const ikona =
    oglas.tip === "stan"
      ? "fa-building"
      : oglas.tip === "posao"
        ? "fa-laptop-code"
        : "fa-file-code";

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
            <Link href="/forum">Forum</Link>
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
          maxWidth: "1000px",
          margin: "0 auto",
          paddingTop: "100px",
          paddingBottom: "100px",
        }}
      >
        <Link
          href="/svioglasi"
          className="see-all"
          style={{ marginBottom: "20px", display: "inline-flex" }}
        >
          <i className="fa-solid fa-arrow-left"></i> Nazad na oglase
        </Link>

        <div
          className="listing-card"
          style={{
            cursor: "default",
            background: "var(--glass-bg)",
            padding: "30px",
            borderRadius: "24px",
            border: "1px solid var(--glass-border)",
          }}
        >
          {/* PRIKAZ SLIKA (Galerija) */}
          {slike.length > 0 && (
            <div style={{ marginBottom: "30px" }}>
              <div
                style={{
                  width: "100%",
                  height: "400px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  position: "relative",
                  background: "#111",
                }}
              >
                <img
                  src={slike[trenutnaSlika].slika_url}
                  alt="Slika oglasa"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              {slike.length > 1 && (
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "15px",
                    overflowX: "auto",
                  }}
                >
                  {slike.map((slika, index) => (
                    <div
                      key={slika.id}
                      onClick={() => setTrenutnaSlika(index)}
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "10px",
                        overflow: "hidden",
                        cursor: "pointer",
                        border:
                          trenutnaSlika === index
                            ? "2px solid var(--primary-orange)"
                            : "2px solid transparent",
                        opacity: trenutnaSlika === index ? 1 : 0.6,
                      }}
                    >
                      <img
                        src={slika.slika_url}
                        alt={`Slika ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ZAGLAVLJE OGLASA */}
          <div
            style={{
              display: "flex",
              gap: "15px",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
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
                flexShrink: 0,
              }}
            >
              <i className={`fa-solid ${ikona}`}></i>
            </div>
            <div>
              <h3
                style={{
                  fontSize: "28px",
                  marginBottom: "5px",
                  color: "white",
                }}
              >
                {oglas.naslov}
              </h3>
              <p
                style={{
                  fontSize: "15px",
                  marginBottom: 0,
                  color: "var(--text-gray)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <i className="fa-solid fa-location-dot"></i>{" "}
                {oglas.lokacija || "Nepoznato"}
              </p>
            </div>
          </div>

          {/* OPIS I TAGOVI */}
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
                fontSize: "16px",
                lineHeight: "1.7",
                marginBottom: "25px",
                whiteSpace: "pre-wrap",
              }}
            >
              {oglas.opis || "Nema opisa."}
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginBottom: "30px",
              }}
            >
              <span
                className="tag"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                <i className="fa-solid fa-tag"></i> {oglas.tip}
              </span>
              {oglas.cijena && (
                <span
                  className="tag price-tag"
                  style={{
                    background: "rgba(255, 87, 34, 0.15)",
                    color: "var(--primary-orange)",
                    borderColor: "rgba(255, 87, 34, 0.3)",
                    fontWeight: "700",
                    fontSize: "15px",
                    padding: "8px 18px",
                  }}
                >
                  {oglas.cijena} KM
                </span>
              )}
              <span
                className="tag"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                <i className="fa-solid fa-eye"></i> {oglas.broj_pregleda || 0}{" "}
                pregleda
              </span>
            </div>
          </div>

          {/* DUGMIĆI */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              marginTop: "20px",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              paddingTop: "25px",
            }}
          >
            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
              {/* DODAJ U KORPU (samo za skripte) */}
              {oglas.tip === "skripta" && (
                <button
                  onClick={handleDodajUKorpu}
                  style={{
                    flex: "1 1 200px",
                    background: "transparent",
                    border: "2px solid var(--primary-orange)",
                    color: "var(--primary-orange)",
                    padding: "15px",
                    borderRadius: "12px",
                    fontWeight: "700",
                    fontSize: "16px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    transition: "var(--transition)",
                  }}
                >
                  <i className="fa-solid fa-cart-plus"></i> Dodaj u korpu
                </button>
              )}

              {/* SAČUVAJ OGLAS */}
              <button
                onClick={handleSacuvaj}
                style={{
                  flex: "1 1 200px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "white",
                  padding: "15px",
                  borderRadius: "12px",
                  fontWeight: "600",
                  fontSize: "16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  transition: "var(--transition)",
                }}
              >
                <i className="fa-regular fa-heart"></i> Sačuvaj oglas
              </button>

              {/* DUGME ZA SHARE */}
              <button
                onClick={handleShare}
                style={{
                  flex: "1 1 200px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "white",
                  padding: "15px",
                  borderRadius: "12px",
                  fontWeight: "600",
                  fontSize: "16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  transition: "var(--transition)",
                }}
              >
                <i className="fa-solid fa-share-nodes"></i> Podijeli
              </button>
            </div>

            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
              {/* POŠALJI PORUKU */}
              <button
                onClick={handlePoruka}
                style={{
                  flex: "1 1 200px",
                  background: "var(--primary-orange)",
                  color: "white",
                  border: "none",
                  padding: "15px",
                  borderRadius: "12px",
                  fontWeight: "700",
                  fontSize: "16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  boxShadow: "0 4px 15px rgba(255, 87, 34, 0.3)",
                }}
              >
                <i className="fa-solid fa-comment-dots"></i> Pošalji poruku
              </button>

              {/* POZOVI */}
              <button
                style={{
                  flex: "0.5 1 120px",
                  background: "var(--glass-bg)",
                  border: "1px solid var(--glass-border)",
                  color: "white",
                  padding: "15px",
                  borderRadius: "12px",
                  fontWeight: "600",
                  fontSize: "16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <i className="fa-solid fa-phone"></i> Pozovi
              </button>
            </div>
          </div>
        </div>
      </main>

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