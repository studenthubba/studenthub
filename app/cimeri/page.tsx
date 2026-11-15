"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { createClient } from "../../lib/supabase";

export default function CimeriPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [myProfile, setMyProfile] = useState<any>(null);
  const [userId, setUserId] = useState<number | null>(null);

  const [budzet, setBudzet] = useState("");
  const [opis, setOpis] = useState("");
  const [tagovi, setTagovi] = useState("");
  const [pusac, setPusac] = useState(false);
  const [saving, setSaving] = useState(false);

  // Stanja za swipe
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | "up" | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffsetX, setDragOffsetX] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const supabase = createClient();

  useEffect(() => {
    const init = async () => {
      // 1. Provjeravamo ko je ulogovan
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

          const { data: profil } = await supabase
            .from("matchmaking_prefili")
            .select("*")
            .eq("korisnik_id", korisnik.id)
            .single();

          if (profil) {
            setMyProfile(profil);
            setBudzet(profil.budzet_max?.toString() || "");
            setOpis(profil.opis || "");
            setTagovi(profil.lifestyle_tagovi || "");
            setPusac(profil.pusac || false);
          }

          // 2. Učitavamo profile, ALI preskačemo one koje smo već swipovali
          
          // Prvo nalazimo sve ID-jeve koje je korisnik već swipovao (lajk ili odbijeno)
          const { data: swipeOdluke } = await supabase
            .from("swipe_odluke")
            .select("oglas_id")
            .eq("korisnik_id", korisnik.id)
            .in("odluka", ["lajk", "odbijeno"]); // Ne sklanjamo 'preskoceno'

          const vecSwipovaniIds = swipeOdluke?.map(o => o.oglas_id) || [];

          // Uzimamo sve profile za cimere
          let query = supabase
            .from("matchmaking_prefili")
            .select(`
              id, 
              budzet_max, 
              lifestyle_tagovi, 
              opis, 
              korisnici (id, ime, prezime, slika_url, grad)
            `)
            .neq("korisnik_id", korisnik.id) // Ne prikazuj sam sebe
            .limit(20);

          // Ako ima swipovanih, isključi ih iz upita
          if (vecSwipovaniIds.length > 0) {
            query = query.not("korisnik_id", "in", `(${vecSwipovaniIds.join(",")})`);
          }

          const { data: sviProfili } = await query;

          if (sviProfili) {
            setCards(
              sviProfili.map((item: any) => ({
                id: item.id,
                korisnikId: item.korisnici?.id, // Bitno nam je za čuvanje odluke
                ime: `${item.korisnici?.ime || "Nepoznato"} ${item.korisnici?.prezime?.charAt(0) || ""}.`,
                grad: item.korisnici?.grad || "Sarajevo",
                slika: item.korisnici?.slika_url || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
                tagovi: item.lifestyle_tagovi
                  ? item.lifestyle_tagovi.split(",").map((t: string) => t.trim())
                  : ["Student"],
                bio: item.opis || "Nema opisa.",
                budzet: `${item.budzet_max || "?"} KM/mj`,
              })),
            );
          }
        }
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

    if (error) {
      alert("Greška: " + error.message);
    } else {
      alert("Profil uspješno sačuvan!");
      window.location.reload();
    }
    setSaving(false);
  };

  // --- LOGIKA ZA SWIPE ---

  const handleSwipe = async (direction: "left" | "right" | "up") => {
    if (swipeDirection || currentIndex >= cards.length) return;
    setSwipeDirection(direction);

    const trenutnaKartica = cards[currentIndex];
    
    // Mapiranje smjera u odluku za bazu
    let odluka = "preskoceno";
    if (direction === "right") odluka = "lajk";
    if (direction === "left") odluka = "odbijeno";

    // Upisujemo u bazu (ako je korisnik ulogovan i imamo userId)
    if (userId && trenutnaKartica?.korisnikId) {
      await supabase.from("swipe_odluke").upsert({
        korisnik_id: userId,
        oglas_id: trenutnaKartica.korisnikId, // Koristimo ID korisnika kao referencu
        odluka: odluka
      }, { onConflict: "korisnik_id,oglas_id" });
    }

    // Sačekaj da se završi CSS animacija pa prebaci na sljedeću
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setSwipeDirection(null);
      setDragOffsetX(0);
    }, 400);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (swipeDirection) return;
    setIsDragging(true);
    setDragStartX(e.clientX);
    if (cardRef.current) {
      cardRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const offset = e.clientX - dragStartX;
    setDragOffsetX(offset);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (dragOffsetX > 100) {
      handleSwipe("right");
    } else if (dragOffsetX < -100) {
      handleSwipe("left");
    } else {
      setDragOffsetX(0);
    }
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
            <Link href="/cimeri" className="active">
              Cimeri
            </Link>
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

      <main className="main-content">
        <div
          className="matchmaking-header"
          style={{ textAlign: "center", marginBottom: "30px" }}
        >
          <h2>Nađi cimera</h2>
        </div>

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
                <label style={{ color: "var(--text-gray)", display: "block", marginBottom: "5px" }}>
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
                <label style={{ color: "var(--text-gray)", display: "block", marginBottom: "5px" }}>
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
                <label style={{ color: "var(--text-gray)", display: "block", marginBottom: "5px" }}>
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
              <div style={{ display: "flex", gap: "10px", color: "white", alignItems: "center" }}>
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
          <div className="matchmaking-layout">
            <p style={{ textAlign: "center", color: "var(--text-gray)", marginBottom: "20px" }}>
              Povuci karticu lijevo/desno ili koristi dugmiće ispod.
            </p>

            <div className="card-stack-container">
              {currentIndex >= cards.length ? (
                <div style={{ textAlign: "center", padding: "50px 20px", color: "var(--text-gray)" }}>
                  <i className="fa-solid fa-face-smile-wink" style={{ fontSize: "50px", color: "var(--primary-orange)", marginBottom: "20px" }}></i>
                  <h3>Nema više profila!</h3>
                  <p>Trenutno nema studenata koji traže cimera.</p>
                </div>
              ) : (
                cards.map((card, index) => {
                  const isActive = index === currentIndex;
                  const isNext = index === currentIndex + 1;
                  
                  if (!isActive && !isNext) return null;

                  let swipeClass = "";
                  if (isActive && swipeDirection === "left") swipeClass = "swipe-left";
                  if (isActive && swipeDirection === "right") swipeClass = "swipe-right";
                  if (isActive && swipeDirection === "up") swipeClass = "swipe-up";

                  const dragStyle = isActive && isDragging ? {
                    transform: `translateX(${dragOffsetX}px) rotate(${dragOffsetX * 0.05}deg)`,
                    transition: "none"
                  } : {};

                  return (
                    <div
                      key={card.id}
                      ref={isActive ? cardRef : null}
                      className={`match-card ${isActive ? "active-card" : ""} ${isNext ? "next-card" : ""} ${swipeClass}`}
                      style={{ display: isActive || isNext ? "flex" : "none", ...dragStyle }}
                      onPointerDown={isActive ? handlePointerDown : undefined}
                      onPointerMove={isActive ? handlePointerMove : undefined}
                      onPointerUp={isActive ? handlePointerUp : undefined}
                    >
                      <div className="match-img-container">
                        <img src={card.slika} alt="Profil" draggable={false} />
                        <div className="match-gradient"></div>
                        <div className="match-info">
                          <h3>{card.ime}</h3>
                          <p>
                            <i className="fa-solid fa-location-dot"></i> {card.grad}
                          </p>
                        </div>
                      </div>
                      <div className="match-details">
                        <div className="tags">
                          {card.tagovi.map((tag: string, i: number) => (
                            <span className="tag" key={i}>{tag}</span>
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

            {currentIndex < cards.length && (
              <div className="action-buttons">
                <button className="btn-action btn-reject" onClick={() => handleSwipe("left")} title="Odbij">
                  <i className="fa-solid fa-xmark"></i>
                </button>
                <button className="btn-action btn-super" onClick={() => handleSwipe("up")} title="Sačuvaj za kasnije">
                  <i className="fa-solid fa-star"></i>
                </button>
                <button className="btn-action btn-accept" onClick={() => handleSwipe("right")} title="Prihvati">
                  <i className="fa-solid fa-heart"></i>
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </>
  );
}