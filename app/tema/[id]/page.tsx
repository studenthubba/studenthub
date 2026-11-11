"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createClient } from "../../../lib/supabase";

export default function TemaDetaljiPage() {
  const { id } = useParams();
  const supabase = createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tema, setTema] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [postovi, setPostovi] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [noviKomentar, setNoviKomentar] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchTema = async () => {
      const { data: temaData } = await supabase
        .from("forum_teme")
        .select(`
          id, naslov, kreirano_u,
          forum_kategorije (naziv),
          korisnici (ime, prezime)
        `)
        .eq("id", id)
        .single();

      if (temaData) setTema(temaData);

      const { data: postoviData } = await supabase
        .from("forum_postovi")
        .select(`
          id, sadrzaj, kreirano_u,
          korisnici (ime, prezime)
        `)
        .eq("tema_id", id)
        .order("kreirano_u", { ascending: true });

      if (postoviData) setPostovi(postoviData);
      setLoading(false);
    };

    fetchTema();
  }, [id, supabase]);

  const handlePosalji = async (e: React.FormEvent) => {
    e.preventDefault();
    if (noviKomentar.trim() === "") return;
    setSaving(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("Morate biti prijavljeni da biste odgovorili.");
      setSaving(false);
      return;
    }

    const { data: korisnik } = await supabase
      .from("korisnici")
      .select("id")
      .eq("auth_user_id", user.id)
      .single();

    if (!korisnik) {
      alert("Korisnik nije pronađen.");
      setSaving(false);
      return;
    }

    const { error } = await supabase.from("forum_postovi").insert({
      tema_id: Number(id),
      autor_id: korisnik.id,
      sadrzaj: noviKomentar,
    });

    if (error) {
      alert("Greška: " + error.message);
    } else {
      setPostovi([...postovi, {
        id: Date.now(),
        sadrzaj: noviKomentar,
        kreirano_u: new Date().toISOString(),
        korisnici: { ime: "Vi", prezime: "" }
      }]);
      setNoviKomentar("");
    }
    setSaving(false);
  };

  const formatirajDatum = (datum: string) => {
    return new Date(datum).toLocaleDateString("bs-BA", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) return <div style={{ color: "white", textAlign: "center", marginTop: "100px" }}>Učitavanje teme...</div>;
  if (!tema) return <div style={{ color: "white", textAlign: "center", marginTop: "100px" }}>Tema nije pronađena.</div>;

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
            <Link href="/skripte">Skripte</Link>
            <Link href="/cimeri">Cimeri</Link>
            <Link href="/forum" className="active">Forum</Link>
          </div>
          <div className="nav-actions">
            <Link href="/dodaj" className="btn-icon" title="Dodaj oglas"><i className="fa-solid fa-plus"></i></Link>
            <Link href="/korpa" className="btn-icon" title="Korpa"><i className="fa-solid fa-cart-shopping"></i></Link>
            <Link href="/poruke" className="btn-icon" title="Poruke"><i className="fa-solid fa-comment-dots"></i></Link>
            <Link href="/profil" className="btn-icon" title="Profil i postavke"><i className="fa-solid fa-gear"></i></Link>
          </div>
        </div>
      </nav>

      <main className="main-content" style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto", paddingBottom: "100px", paddingTop: "100px" }}>
        <Link href="/forum" className="see-all" style={{ marginBottom: "20px", display: "inline-flex" }}>
          <i className="fa-solid fa-arrow-left"></i> Nazad na forum
        </Link>

        <div style={{ background: "var(--glass-bg)", borderRadius: "16px", padding: "30px", border: "1px solid var(--glass-border)", marginBottom: "20px" }}>
          <h1 style={{ fontSize: "24px", marginBottom: "10px", color: "white" }}>{tema.naslov}</h1>
          <div style={{ fontSize: "13px", color: "var(--text-gray)", display: "flex", gap: "15px", flexWrap: "wrap", marginBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "15px" }}>
            <span><i className="fa-regular fa-user"></i> {tema.korisnici?.ime} {tema.korisnici?.prezime}</span>
            <span><i className="fa-regular fa-clock"></i> {formatirajDatum(tema.kreirano_u)}</span>
            <span><i className="fa-solid fa-tag"></i> {tema.forum_kategorije?.naziv || "Općenito"}</span>
          </div>
          <p style={{ color: "#ddd", fontSize: "15px", lineHeight: "1.6" }}>
            Ova tema je započeta na forumu.
          </p>
        </div>

        <h3 style={{ color: "white", marginBottom: "20px", fontSize: "20px" }}>Odgovori ({postovi.length})</h3>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "30px" }}>
          {postovi.length === 0 ? (
            <p style={{ color: "var(--text-gray)" }}>Još nema odgovora. Budi prvi!</p>
          ) : (
            postovi.map((post) => (
              <div key={post.id} style={{ background: "var(--glass-bg)", padding: "20px", borderRadius: "16px", border: "1px solid var(--glass-border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                  <span style={{ fontWeight: "600", color: "white" }}>{post.korisnici?.ime} {post.korisnici?.prezime}</span>
                  <span style={{ fontSize: "12px", color: "var(--text-gray)" }}>{formatirajDatum(post.kreirano_u)}</span>
                </div>
                <p style={{ color: "#ddd", fontSize: "14px", lineHeight: "1.5" }}>{post.sadrzaj}</p>
              </div>
            ))
          )}
        </div>

        <div style={{ background: "var(--glass-bg)", padding: "20px", borderRadius: "16px", border: "1px solid var(--glass-border)" }}>
          <form onSubmit={handlePosalji} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <textarea
              value={noviKomentar}
              onChange={(e) => setNoviKomentar(e.target.value)}
              placeholder="Napiši svoj odgovor..."
              required
              rows={4}
              style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "15px", borderRadius: "10px", color: "white", outline: "none", fontFamily: "'Inter', sans-serif" }}
            />
            <button type="submit" disabled={saving} style={{ alignSelf: "flex-end", background: "var(--primary-orange)", color: "white", border: "none", padding: "12px 25px", borderRadius: "10px", fontWeight: "600", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}>
              {saving ? "Slanje..." : "Pošalji odgovor"}
            </button>
          </form>
        </div>
      </main>

      <nav className="mobile-bottom-nav">
        <Link href="/" className="nav-item"><i className="fa-solid fa-house"></i><span>Početna</span></Link>
        <Link href="/svioglasi" className="nav-item"><i className="fa-solid fa-magnifying-glass"></i><span>Istraži</span></Link>
        <Link href="/dodaj" className="nav-item"><i className="fa-solid fa-plus-circle"></i><span>Dodaj</span></Link>
        <Link href="/poruke" className="nav-item"><i className="fa-solid fa-comments"></i><span>Poruke</span></Link>
        <Link href="/profil" className="nav-item"><i className="fa-regular fa-user"></i><span>Profil</span></Link>
      </nav>
    </>
  );
}