"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "../../lib/supabase";

export default function SkriptePage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [oglasi, setOglasi] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchOglasi = async () => {
      const { data } = await supabase
        .from("oglas")
        .select("*")
        .eq("status", "aktivan")
        .eq("tip", "skripta")
        .order("datum_objave", { ascending: false });

      if (data) setOglasi(data);
      setLoading(false);
    };
    fetchOglasi();
  }, [supabase]);

  if (loading) return <div style={{ color: "white", textAlign: "center", marginTop: "100px" }}>Učitavanje...</div>;

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
            <div className="logo-icon"><i className="fa-solid fa-graduation-cap"></i></div>
            <div className="logo-text"><h1>StudentHub</h1></div>
          </div>
          <div className="nav-links">
            <Link href="/">Početna</Link>
            <Link href="/stanovi">Stanovi</Link>
            <Link href="/poslovi">Poslovi</Link>
            <Link href="/skripte" className="active">Skripte</Link>
            <Link href="/cimeri">Cimeri</Link>
            <Link href="/forum">Forum</Link>
          </div>
          <div className="nav-actions">
            <Link href="/dodaj" className="btn-icon" title="Dodaj oglas"><i className="fa-solid fa-plus"></i></Link>
            <Link href="/korpa" className="btn-icon" title="Korpa"><i className="fa-solid fa-cart-shopping"></i></Link>
            <Link href="/poruke" className="btn-icon" title="Poruke"><i className="fa-solid fa-comment-dots"></i></Link>
            <Link href="/profil" className="btn-icon" title="Profil i postavke"><i className="fa-solid fa-gear"></i></Link>
          </div>
        </div>
      </nav>

      <main className="main-content" style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto", paddingBottom: "100px", paddingTop: "100px" }}>
        <section style={{ marginBottom: "40px" }}>
          <div style={{ marginBottom: "25px" }}>
            <h2 style={{ fontSize: "32px", marginBottom: "10px", background: "linear-gradient(to right, #fff, #B0B0C0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Pronađi skripte i materijale
            </h2>
            <p style={{ color: "var(--text-gray)", fontSize: "16px" }}>Sve što ti treba za polaganje ispita na jednom mjestu.</p>
          </div>
          
          <div style={{ position: "relative", display: "flex", alignItems: "center", background: "var(--glass-bg)", backdropFilter: "var(--glass-blur)", border: "1px solid var(--glass-border)", borderRadius: "16px", padding: "5px", maxWidth: "700px", boxShadow: "var(--glass-shadow)" }}>
            <i className="fa-solid fa-magnifying-glass" style={{ position: "absolute", left: "20px", color: "var(--text-gray)" }}></i>
            <input type="text" placeholder="Pretraži po predmetu, fakultetu..." style={{ width: "100%", background: "transparent", border: "none", padding: "15px 15px 15px 50px", color: "white", fontSize: "15px", outline: "none" }} />
            <button style={{ background: "var(--primary-orange)", color: "white", border: "none", padding: "12px 25px", borderRadius: "12px", fontWeight: "600", cursor: "pointer" }}>Pretraži</button>
          </div>
        </section>

        <section>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "600", color: "white" }}>Dostupne skripte</h2>
            <span style={{ color: "var(--primary-orange)", fontSize: "14px", fontWeight: "500" }}>Prikazano {oglasi.length} skripti</span>
          </div>

          {oglasi.length === 0 ? (
            <div style={{ textAlign: "center", padding: "50px", color: "var(--text-gray)" }}>
              <i className="fa-solid fa-folder-open" style={{ fontSize: "50px", marginBottom: "20px", color: "var(--primary-orange)" }}></i>
              <h3 style={{ fontSize: "20px", color: "white" }}>Nema dostupnih skripti.</h3>
              <p>Budi prvi koji će objaviti skriptu!</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "25px" }}>
              {oglasi.map((oglas) => (
                <Link key={oglas.id} href={`/oglas/${oglas.id}`} style={{ display: "block", background: "var(--glass-bg)", backdropFilter: "var(--glass-blur)", borderRadius: "24px", padding: "25px", border: "1px solid var(--glass-border)", textDecoration: "none", color: "inherit", transition: "var(--transition)", boxShadow: "var(--glass-shadow)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                    <div style={{ width: "60px", height: "60px", background: "rgba(255, 87, 34, 0.15)", border: "1px solid rgba(255, 87, 34, 0.3)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", color: "var(--primary-orange)" }}>
                      <i className="fa-solid fa-file-code"></i>
                    </div>
                  </div>
                  <div>
                    <h3 style={{ fontSize: "19px", marginBottom: "10px", color: "white" }}>{oglas.naslov}</h3>
                    <p style={{ fontSize: "13px", color: "var(--text-gray)", marginBottom: "18px", display: "flex", alignItems: "center", gap: "6px" }}>
                      <i className="fa-solid fa-location-dot"></i> {oglas.lokacija || "Nepoznato"}
                    </p>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {oglas.cijena && (
                        <span style={{ background: "rgba(255, 87, 34, 0.15)", padding: "6px 14px", borderRadius: "10px", fontSize: "12px", color: "var(--primary-orange)", border: "1px solid rgba(255, 87, 34, 0.3)", fontWeight: "700" }}>{oglas.cijena} KM</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      <nav className="mobile-bottom-nav">
        <Link href="/" className="nav-item"><i className="fa-solid fa-house"></i><span>Početna</span></Link>
        <Link href="/svioglasi" className="nav-item active"><i className="fa-solid fa-magnifying-glass"></i><span>Istraži</span></Link>
        <Link href="/dodaj" className="nav-item"><i className="fa-solid fa-plus-circle"></i><span>Dodaj</span></Link>
        <Link href="/poruke" className="nav-item"><i className="fa-solid fa-comments"></i><span>Poruke</span></Link>
        <Link href="/profil" className="nav-item"><i className="fa-regular fa-user"></i><span>Profil</span></Link>
      </nav>
    </>
  );
}