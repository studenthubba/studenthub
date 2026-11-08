"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createClient } from "../../../lib/supabase";

export default function OglasDetaljiPage() {
  const { id } = useParams(); 
  const supabase = createClient();

  const [oglas, setOglas] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchOglas = async () => {
      const { data } = await supabase
        .from("oglas")
        .select("*")
        .eq("id", id)
        .single();

      if (data) setOglas(data);
      setLoading(false);

      // Povećavamo broj pregleda pomoću SQL funkcije
      await supabase.rpc("inkrementiraj_preglede", { p_oglas: Number(id) });

    };

    fetchOglas();
  }, [id, supabase]);

  if (loading)
    return <div style={{ color: "white", textAlign: "center", marginTop: "100px" }}>Učitavanje oglasa...</div>;
  
  if (!oglas)
    return <div style={{ color: "white", textAlign: "center", marginTop: "100px" }}>Oglas nije pronađen.</div>;

  // Ikona na osnovu tipa
  const ikona = oglas.tip === "stan" ? "fa-building" : oglas.tip === "posao" ? "fa-laptop-code" : "fa-file-code";

  return (
    <>
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      {/* NAVIGACIJA (Dodane ikonice da bude isto kao na ostalim stranicama) */}
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
            <Link href="/skripte">Skripte</Link>
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

      <main className="main-content" style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto", paddingTop: "100px", paddingBottom: "100px" }}>
        <Link href="/svioglasi" className="see-all" style={{ marginBottom: "20px", display: "inline-flex" }}>
          <i className="fa-solid fa-arrow-left"></i> Nazad na oglase
        </Link>

        <div className="listing-card" style={{ maxWidth: "800px", margin: "0 auto", cursor: "default", background: "var(--glass-bg)", padding: "25px", borderRadius: "24px", border: "1px solid var(--glass-border)" }}>
          <div style={{ display: "flex", gap: "15px", alignItems: "center", marginBottom: "20px" }}>
            <div style={{ width: "80px", height: "80px", background: "rgba(255, 87, 34, 0.15)", border: "1px solid rgba(255, 87, 34, 0.3)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", color: "var(--primary-orange)" }}>
              <i className={`fa-solid ${ikona}`}></i>
            </div>
            <div>
              <h3 style={{ fontSize: "24px", marginBottom: "5px", color: "white" }}>{oglas.naslov}</h3>
              <p style={{ fontSize: "14px", marginBottom: 0, color: "var(--text-gray)", display: "flex", alignItems: "center", gap: "6px" }}>
                <i className="fa-solid fa-location-dot"></i> {oglas.lokacija || "Nepoznato"}
              </p>
            </div>
          </div>

          <div style={{ marginTop: "20px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "20px" }}>
            <h4 style={{ color: "var(--primary-orange)", marginBottom: "10px" }}>O oglasu</h4>
            <p style={{ color: "#ddd", fontSize: "15px", lineHeight: "1.6", marginBottom: "20px" }}>
              {oglas.opis || "Nema opisa."}
            </p>

            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
              <span className="tag"><i className="fa-solid fa-tag"></i> {oglas.tip}</span>
              {oglas.cijena && (
                <span className="tag price-tag" style={{ background: "rgba(255, 87, 34, 0.15)", color: "var(--primary-orange)", borderColor: "rgba(255, 87, 34, 0.3)", fontWeight: "700" }}>
                  {oglas.cijena} KM
                </span>
              )}
              <span className="tag"><i className="fa-solid fa-eye"></i> {oglas.broj_pregleda || 0} pregleda</span>
            </div>
          </div>
        </div>
      </main>

      {/* DONJA MOBILNA NAVIGACIJA */}
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