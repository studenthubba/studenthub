"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase";

export default function ProfilPage() {
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profil, setProfil] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const fetchProfil = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push("/");
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data, error } = await supabase
        .from('korisnici')
        .select('*')
        .eq('auth_user_id', session.user.id)
        .single();

      if (data) {
        setProfil(data);
        setUser(session.user);
      }
      setLoading(false);
    };

    fetchProfil();
  }, [supabase, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) return <div style={{ color: 'white', textAlign: 'center', marginTop: '100px' }}>Učitavanje profila...</div>;

  const inicijal = profil?.ime ? profil.ime.charAt(0).toUpperCase() : "K";

  return (
    <>
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      {/* NAVIGACIJA */}
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
            <Link href="/profil" className="btn-icon" title="Profil i postavke" style={{ color: "var(--primary-orange)", borderColor: "var(--primary-orange)" }}><i className="fa-solid fa-gear"></i></Link>
          </div>
        </div>
      </nav>

      {/* GLAVNI SADRŽAJ */}
      <main className="main-content" style={{ padding: "20px", paddingBottom: "100px", maxWidth: "1200px", margin: "0 auto" }}>
        
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "40px", marginTop: "20px" }}>
          <div style={{ width: "120px", height: "120px", borderRadius: "50%", backgroundColor: "#1E1E32", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "50px", color: "white", fontWeight: "bold", border: "4px solid rgba(255,255,255,0.1)", boxShadow: "0 10px 30px rgba(255, 87, 34, 0.3)", position: "relative", marginBottom: "15px" }}>
            {inicijal}
            <div style={{ position: "absolute", bottom: "-5px", right: "-5px", background: "#FF5722", border: "3px solid #0a0a16", width: "38px", height: "38px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "16px", cursor: "pointer", zIndex: 10 }}>
              <i className="fa-solid fa-camera"></i>
            </div>
          </div>
          
          <div style={{ fontSize: "24px", fontWeight: "700", marginBottom: "5px", display: "flex", alignItems: "center", gap: "8px", color: "white" }}>
            {profil?.ime} {profil?.prezime}
          </div>
          <p style={{ color: "#B0B0C0", fontSize: "14px" }}>Student</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "600px", margin: "0 auto" }}>
          
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "20px", padding: "20px", border: "1px solid rgba(255,255,255,0.1)" }}>
            <h3 style={{ fontSize: "16px", color: "#FF5722", marginBottom: "15px", display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "10px" }}>
              <i className="fa-solid fa-user-pen"></i> Lični podaci
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "15px" }}>
              <label style={{ fontSize: "13px", color: "#B0B0C0" }}>Ime i prezime</label>
              <input type="text" defaultValue={`${profil?.ime || ''} ${profil?.prezime || ''}`} readOnly style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "12px 15px", borderRadius: "10px", color: "white", fontSize: "14px", outline: "none" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "15px" }}>
              <label style={{ fontSize: "13px", color: "#B0B0C0" }}>Email adresa</label>
              <input type="email" defaultValue={profil?.email || ''} readOnly style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "12px 15px", borderRadius: "10px", color: "white", fontSize: "14px", outline: "none" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "15px" }}>
              <label style={{ fontSize: "13px", color: "#B0B0C0" }}>Fakultet</label>
              <input type="text" defaultValue={profil?.fakultet_id || 'Nije upisan'} readOnly style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "12px 15px", borderRadius: "10px", color: "white", fontSize: "14px", outline: "none", opacity: 0.7 }} />
            </div>
          </div>

          <button onClick={handleLogout} style={{ width: "100%", marginTop: "10px", background: "transparent", color: "#FF3B30", border: "1px solid rgba(255, 59, 48, 0.3)", padding: "12px", borderRadius: "10px", fontWeight: "600", cursor: "pointer" }}>
            <i className="fa-solid fa-right-from-bracket"></i> Odjavi se
          </button>
        </div>
      </main>
    </>
  );
}