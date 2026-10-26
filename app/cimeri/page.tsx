"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "../../lib/supabase";

export default function CimeriPage() {
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [myProfile, setMyProfile] = useState<any>(null);
  const [userId, setUserId] = useState<number | null>(null);

  // Stanja za formu
  const [budzet, setBudzet] = useState("");
  const [opis, setOpis] = useState("");
  const [tagovi, setTagovi] = useState("");
  const [pusac, setPusac] = useState(false);
  const [saving, setSaving] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        const { data: korisnik } = await supabase
          .from("korisnici")
          .select("id")
          .eq("auth_user_id", session.user.id)
          .single();

        if (korisnik) {
          setUserId(korisnik.id);
          // Provjeri ima li profil
          const { data: profil } = await supabase
            .from("matchmaking_prefili")
            .select("*")
            .eq("korisnik_id", korisnik.id)
            .single();

          if (profil) setMyProfile(profil);
        }
      }

      // Ucitaj sve profile za swipe
      const { data } = await supabase
        .from("matchmaking_prefili")
        .select(
          `id, budzet_max, lifestyle_tagovi, opis, korisnici (ime, prezime, slika_url, grad)`,
        )
        .limit(10);

      if (data) {
        setCards(
          data.map((item: any) => ({
            id: item.id,
            ime: `${item.korisnici?.ime || "Nepoznato"} ${item.korisnici?.prezime?.charAt(0) || ""}.`,
            grad: item.korisnici?.grad || "Sarajevo",
            slika:
              item.korisnici?.slika_url ||
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
            tagovi: item.lifestyle_tagovi
              ? item.lifestyle_tagovi.split(",").map((t: string) => t.trim())
              : ["Student"],
            bio: item.opis || "Nema opisa.",
            budzet: `${item.budzet_max || "?"} KM/mj`,
          })),
        );
      }
      setLoading(false);
    };
    init();
  }, [supabase]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return alert("Morate biti prijavljeni!");
    setSaving(true);

    const { error } = await supabase.from("matchmaking_prefili").upsert(
      {
        korisnik_id: userId,
        budzet_max: parseFloat(budzet) || 0,
        opis: opis,
        lifestyle_tagovi: tagovi,
        pusac: pusac,
      },
      { onConflict: "korisnik_id" },
    );

    if (error) alert("Greška: " + error.message);
    else {
      alert("Profil sačuvan!");
      window.location.reload();
    }
    setSaving(false);
  };

  if (loading)
    return (
      <div style={{ color: "white", textAlign: "center", marginTop: "100px" }}>
        Učitavanje...
      </div>
    );

  return (
    <>
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <nav className="top-nav">
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
            <Link href="/cimeri" className="active">
              Cimeri
            </Link>
            <a href="#">Forum</a>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <div
          className="matchmaking-header"
          style={{ textAlign: "center", marginBottom: "30px" }}
        >
          <h2>Nađi cimera</h2>
        </div>

        {/* AKO KORISNIK NEMA PROFIL, POKAŽI FORMU */}
        {!myProfile && userId ? (
          <div
            style={{
              maxWidth: "500px",
              margin: "0 auto",
              background: "var(--glass-bg)",
              padding: "30px",
              borderRadius: "20px",
              border: "1px solid var(--glass-border)",
            }}
          >
            <h3 style={{ color: "white", marginBottom: "20px" }}>
              Popuni svoj profil za cimere
            </h3>
            <p
              style={{
                color: "var(--text-gray)",
                marginBottom: "20px",
                fontSize: "14px",
              }}
            >
              Da bi te drugi mogli pronaći, moraš unijeti osnovne podatke.
            </p>

            <form
              onSubmit={handleSave}
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <div>
                <label
                  style={{
                    color: "var(--text-gray)",
                    display: "block",
                    marginBottom: "5px",
                  }}
                >
                  Budžet (KM/mj)
                </label>
                <input
                  type="number"
                  value={budzet}
                  onChange={(e) => setBudzet(e.target.value)}
                  required
                  placeholder="250"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #444",
                    background: "#222",
                    color: "white",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    color: "var(--text-gray)",
                    display: "block",
                    marginBottom: "5px",
                  }}
                >
                  O sebi
                </label>
                <textarea
                  value={opis}
                  onChange={(e) => setOpis(e.target.value)}
                  required
                  placeholder="Tražim cimerku..."
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #444",
                    background: "#222",
                    color: "white",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    color: "var(--text-gray)",
                    display: "block",
                    marginBottom: "5px",
                  }}
                >
                  Tagovi (odvoji zarezom)
                </label>
                <input
                  type="text"
                  value={tagovi}
                  onChange={(e) => setTagovi(e.target.value)}
                  placeholder="Nepušač, Sport"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #444",
                    background: "#222",
                    color: "white",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  color: "white",
                  alignItems: "center",
                }}
              >
                <input
                  type="checkbox"
                  checked={pusac}
                  onChange={(e) => setPusac(e.target.checked)}
                  style={{ width: "18px", height: "18px" }}
                />
                <label>Pušač</label>
              </div>
              <button
                type="submit"
                disabled={saving}
                style={{
                  padding: "12px",
                  background: "var(--primary-orange)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  marginTop: "10px",
                  cursor: "pointer",
                }}
              >
                {saving ? "Čuvanje..." : "Sačuvaj profil"}
              </button>
            </form>
          </div>
        ) : (
          /* AKO IMA PROFIL, POKAŽI TINDER */
          <div className="matchmaking-layout">
            <p
              style={{
                textAlign: "center",
                color: "var(--text-gray)",
                marginBottom: "20px",
              }}
            >
              Swipe-uj lijevo da odbiješ, desno da prihvatiš.
            </p>

            <div className="card-stack-container">
              {cards.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "50px 20px",
                    color: "var(--text-gray)",
                  }}
                >
                  <i
                    className="fa-solid fa-face-smile-wink"
                    style={{
                      fontSize: "50px",
                      color: "var(--primary-orange)",
                      marginBottom: "20px",
                    }}
                  ></i>
                  <h3>Nema više profila!</h3>
                  <p>Trenutno nema studenata koji traže cimera.</p>
                </div>
              ) : (
                cards.map((card, index) => {
                  const isActive = index === 0;
                  const isNext = index === 1;
                  return (
                    <div
                      key={card.id}
                      className={`match-card ${isActive ? "active-card" : ""} ${isNext ? "next-card" : ""}`}
                      style={{
                        display: !isActive && !isNext ? "none" : "flex",
                      }}
                    >
                      <div className="match-img-container">
                        <img src={card.slika} alt="Profil" />
                        <div className="match-gradient"></div>
                        <div className="match-info">
                          <h3>{card.ime}</h3>
                          <p>
                            <i className="fa-solid fa-location-dot"></i>{" "}
                            {card.grad}
                          </p>
                        </div>
                      </div>
                      <div className="match-details">
                        <div className="tags">
                          {card.tagovi.map((tag: string, i: number) => (
                            <span className="tag" key={i}>
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="match-bio">"{card.bio}"</p>
                        <div className="match-budget">
                          <span>Budžet:</span> <strong>{card.budzet}</strong>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
