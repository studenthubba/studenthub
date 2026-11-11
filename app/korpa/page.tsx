"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function KorpaPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [korpa, setKorpa] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [nacinDostave, setNacinDostave] = useState("");
  const [adresa, setAdresa] = useState("");

  const supabase = createClient();
  const router = useRouter();

  // 1. Učitavanje korpe iz baze
  const fetchKorpa = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return; // Ako nije ulogovan, korpa je prazna
    }

    // Nalazimo ID korisnika
    const { data: korisnik } = await supabase
      .from("korisnici")
      .select("id")
      .eq("auth_user_id", user.id)
      .single();

    if (!korisnik) {
      setLoading(false);
      return;
    }

    // Povlačimo stavke iz korpe i spajamo sa tabelom oglas
    const { data, error } = await supabase
      .from("korpa_stavke")
      .select(
        `
        id,
        oglas_id,
        oglas (
          naslov,
          opis,
          cijena,
          tip
        )
      `,
      )
      .eq("korisnik_id", korisnik.id);

    if (data) {
      // Formatiramo podatke za prikaz
      const formatirano = data.map((stavka: any) => ({
        id: stavka.id,
        oglas_id: stavka.oglas_id,
        naslov: stavka.oglas?.naslov || "Nepoznat oglas",
        opis: stavka.oglas?.opis || "",
        cijena: stavka.oglas?.cijena || 0,
        ikona:
          stavka.oglas?.tip === "skripta"
            ? "fa-solid fa-file-code"
            : stavka.oglas?.tip === "stan"
              ? "fa-solid fa-building"
              : "fa-solid fa-box",
      }));
      setKorpa(formatirano);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchKorpa();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 2. Uklanjanje iz korpe
  const handleUkloni = async (id: number) => {
    const { error } = await supabase.from("korpa_stavke").delete().eq("id", id);
    if (!error) {
      // Uklanjamo iz lokalnog stanja bez reloada
      setKorpa(korpa.filter((item) => item.id !== id));
    } else {
      alert("Greška pri uklanjanju: " + error.message);
    }
  };

  // 3. Kupovina (Kreiranje narudžbe)
  const handleKupovina = async (e: React.FormEvent) => {
    e.preventDefault();
    if (korpa.length === 0) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return alert("Morate biti prijavljeni.");

    const { data: korisnik } = await supabase
      .from("korisnici")
      .select("id")
      .eq("auth_user_id", user.id)
      .single();
    if (!korisnik) return alert("Korisnik nije pronađen.");

    // Uzimamo ID prodavca iz prvog oglasa u korpi (pretpostavka: sve stavke su od istog prodavca)
    const { data: oglas } = await supabase
      .from("oglas")
      .select("korisnik_id")
      .eq("id", korpa[0].oglas_id)
      .single();
    if (!oglas) return alert("Greška sa oglasom.");

    const ukupnaCijena = korpa.reduce((sum, item) => sum + item.cijena, 0);

    // Kreiramo narudžbu
    const { data: narudzba, error: narudzbaError } = await supabase
      .from("narudzbe")
      .insert({
        kupac_id: korisnik.id,
        prodavac_id: oglas.korisnik_id,
        ukupni_iznos: ukupnaCijena,
        nacin_dostave: nacinDostave === "Dostava na adresu" ? "posta" : "licno",
        adresa_primaoca: adresa,
        status: "u_obradi",
      })
      .select()
      .single();

    if (narudzbaError) {
      alert("Greška pri kreiranju narudžbe: " + narudzbaError.message);
      return;
    }

    // Ubacujemo stavke narudžbe
    const stavkeZaUbacivanje = korpa.map((item) => ({
      narudzba_id: narudzba.id,
      oglas_id: item.oglas_id,
      cijena: item.cijena,
    }));

    const { error: stavkeError } = await supabase
      .from("narudzba_stavke")
      .insert(stavkeZaUbacivanje);

    if (stavkeError) {
      alert("Greška pri dodavanju stavki: " + stavkeError.message);
      return;
    }

    // Brišemo korpu nakon uspješne kupovine
    await supabase.from("korpa_stavke").delete().eq("korisnik_id", korisnik.id);

    alert("Kupovina uspješna! Hvala na povjerenju.");
    setIsCheckoutModalOpen(false);
    router.push("/");
  };

  if (loading)
    return (
      <div style={{ color: "white", textAlign: "center", marginTop: "100px" }}>
        Učitavanje korpe...
      </div>
    );

  const ukupnaCijena = korpa.reduce((sum, item) => sum + item.cijena, 0);

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
                  href="/svioglasi"
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
                Izaberite način dostave i potvrdite.
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
                    value={adresa}
                    onChange={(e) => setAdresa(e.target.value)}
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
