"use client";

import { useState, useEffect } from "react";
import { createClient } from "../lib/supabase";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "register">("login");
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  // 1. Provjera sesije pri učitavanju
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    checkUser();
  }, [supabase]);

  // 2. Logika za prijavu
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("login-email") as HTMLInputElement)
      .value;
    const password = (
      form.elements.namedItem("login-password") as HTMLInputElement
    ).value;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert("Greška: " + error.message);
    else {
      alert("Uspješno ste prijavljeni!");
      setIsModalOpen(false);
      window.location.reload();
    }
  };

  // 3. Logika za registraciju
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("reg-email") as HTMLInputElement)
      .value;
    const password = (
      form.elements.namedItem("reg-password") as HTMLInputElement
    ).value;
    const ime = (form.elements.namedItem("reg-ime") as HTMLInputElement).value;
    const prezime = (form.elements.namedItem("reg-prezime") as HTMLInputElement)
      .value;
    const fakultet = (
      form.elements.namedItem("reg-fakultet") as HTMLSelectElement
    ).value;
    const godina = (form.elements.namedItem("reg-godina") as HTMLSelectElement)
      .value;
    const grad = (form.elements.namedItem("reg-grad") as HTMLInputElement)
      .value;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          ime,
          prezime,
          fakultet_id: fakultet,
          godina_studija: godina,
          grad,
        },
      },
    });

    if (error) alert("Greška: " + error.message);
    else {
      alert("Nalog napravljen! Možete se prijaviti.");
      setAuthTab("login");
    }
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
            <a href="#" className="active">
              Početna
            </a>
            <a href="#">Stanovi</a>
            <a href="#">Poslovi</a>
            <a href="#">Skripte</a>
            <a href="#">Cimeri</a>
            <a href="#">Forum</a>
          </div>
          <div className="nav-actions">
            <a
              href="#"
              className="btn-icon"
              style={{ display: user ? "flex" : "none" }}
              title="Dodaj oglas"
            >
              <i className="fa-solid fa-plus"></i>
            </a>
            <a
              href="#"
              className="btn-icon"
              title="Korpa"
              style={{ position: "relative" }}
            >
              <i className="fa-solid fa-cart-shopping"></i>
            </a>

            {!user ? (
              <>
                <button
                  className="btn-login"
                  onClick={() => {
                    setIsModalOpen(true);
                    setAuthTab("login");
                  }}
                >
                  Prijava
                </button>
                <button
                  className="btn-register"
                  onClick={() => {
                    setIsModalOpen(true);
                    setAuthTab("register");
                  }}
                >
                  Registracija
                </button>
              </>
            ) : (
              <a
                href="#"
                className="btn-icon"
                style={{
                  background:
                    "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
                  color: "white",
                }}
              >
                {user.user_metadata?.ime?.charAt(0) || "K"}
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* GLAVNI SADRŽAJ */}
      <main className="main-content">
        <section className="hero-section">
          <div className="hero-text">
            <h2>Pronađi sve na jednom mestu</h2>
            <p>Stanovi, poslovi, skripte i cimeri za studente.</p>
          </div>
          <div className="search-container">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Šta tražiš danas? (npr. Stan na Koševu...)"
            />
            <button className="search-btn">Pretraži</button>
          </div>
        </section>

        <section className="categories-section">
          <a href="#" className="cat-card">
            <div className="cat-icon">
              <i className="fa-solid fa-house"></i>
            </div>
            <span>Stanovi</span>
          </a>
          <a href="#" className="cat-card">
            <div className="cat-icon">
              <i className="fa-solid fa-briefcase"></i>
            </div>
            <span>Poslovi</span>
          </a>
          <a href="#" className="cat-card">
            <div className="cat-icon">
              <i className="fa-solid fa-book"></i>
            </div>
            <span>Skripte</span>
          </a>
          <a href="#" className="cat-card">
            <div className="cat-icon">
              <i className="fa-solid fa-user-group"></i>
            </div>
            <span>Cimeri</span>
          </a>
        </section>

        <section className="listings-section">
          <div className="section-header">
            <h2>Istaknuti oglasi</h2>
            <a href="#" className="see-all">
              Vidi sve <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>

          <div className="listings-grid">
            <a href="#" className="listing-card">
              <div className="card-header">
                <div className="card-img">
                  <i className="fa-solid fa-building"></i>
                </div>
                <div className="card-action">
                  <i className="fa-regular fa-heart"></i>
                </div>
              </div>
              <div className="card-body">
                <h3>Stan na Koševu</h3>
                <p className="location">
                  <i className="fa-solid fa-location-dot"></i> Sarajevo, Koševo
                </p>
                <div className="tags">
                  <span className="tag">2 cimera</span>
                  <span className="tag price-tag">300 KM/mj</span>
                </div>
              </div>
            </a>
            <a href="#" className="listing-card">
              <div className="card-header">
                <div className="card-img">
                  <i className="fa-solid fa-laptop-code"></i>
                </div>
                <div className="card-action">
                  <i className="fa-regular fa-heart"></i>
                </div>
              </div>
              <div className="card-body">
                <h3>Honorarni posao</h3>
                <p className="location">
                  <i className="fa-solid fa-code"></i> IT Firma, Remote
                </p>
                <div className="tags">
                  <span className="tag">Front-end</span>
                  <span className="tag price-tag">800 KM/mj</span>
                </div>
              </div>
            </a>
            <a href="#" className="listing-card">
              <div className="card-header">
                <div className="card-img">
                  <i className="fa-solid fa-file-code"></i>
                </div>
                <div className="card-action">
                  <i className="fa-regular fa-heart"></i>
                </div>
              </div>
              <div className="card-body">
                <h3>Skripta Analiza 2</h3>
                <p className="location">
                  <i className="fa-solid fa-graduation-cap"></i> ETF Sarajevo
                </p>
                <div className="tags">
                  <span className="tag">Polaganje</span>
                  <span className="tag price-tag">25 KM</span>
                </div>
              </div>
            </a>
          </div>
        </section>
      </main>

      {/* MODAL ZA PRIJAVU / REGISTRACIJU */}
      <div
        className={`modal-overlay ${isModalOpen ? "show" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsModalOpen(false);
        }}
      >
        <div className="modal-content">
          <button className="modal-close" onClick={() => setIsModalOpen(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
          <div className="modal-header">
            <h2>Dobrodošli na StudentHub</h2>
            <p>Prijavi se ili napravi novi nalog.</p>
          </div>

          <div className="auth-tabs">
            <button
              className={`auth-tab ${authTab === "login" ? "active" : ""}`}
              onClick={() => setAuthTab("login")}
            >
              Prijava
            </button>
            <button
              className={`auth-tab ${authTab === "register" ? "active" : ""}`}
              onClick={() => setAuthTab("register")}
            >
              Registracija
            </button>
          </div>

          {/* FORMA ZA PRIJAVU */}
          <form
            onSubmit={handleLogin}
            className={`auth-form ${authTab === "login" ? "active-form" : ""}`}
            style={{ display: authTab === "login" ? "block" : "none" }}
          >
            <div className="input-group">
              <label>Email adresa</label>
              <input
                type="email"
                name="login-email"
                placeholder="tvoj.email@student.ba"
                required
              />
            </div>
            <div className="input-group">
              <label>Lozinka</label>
              <input
                type="password"
                name="login-password"
                placeholder="••••••••"
                required
              />
            </div>
            <button type="submit" className="btn-submit">
              Prijavi se
            </button>
          </form>

          {/* FORMA ZA REGISTRACIJU */}
          <form
            onSubmit={handleRegister}
            className={`auth-form ${authTab === "register" ? "active-form" : ""}`}
            style={{ display: authTab === "register" ? "block" : "none" }}
          >
            <div className="input-group">
              <label>Ime</label>
              <input type="text" name="reg-ime" placeholder="Amina" required />
            </div>
            <div className="input-group">
              <label>Prezime</label>
              <input
                type="text"
                name="reg-prezime"
                placeholder="Tadić"
                required
              />
            </div>
            <div className="input-group">
              <label>Email adresa</label>
              <input
                type="email"
                name="reg-email"
                placeholder="tvoj.email@student.ba"
                required
              />
            </div>
            <div className="input-group">
              <label>Lozinka (min. 6 karaktera)</label>
              <input
                type="password"
                name="reg-password"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
            <div className="input-group">
              <label>Fakultet</label>
              <select name="reg-fakultet" required defaultValue="">
                <option value="" disabled>
                  Izaberi fakultet
                </option>
                <option value="1">Elektrotehnički fakultet (ETF)</option>
                <option value="2">Ekonomski fakultet</option>
                <option value="3">Pravni fakultet</option>
                <option value="4">Medicinski fakultet</option>
              </select>
            </div>
            <div className="input-group">
              <label>Godina studija</label>
              <select name="reg-godina" required defaultValue="">
                <option value="" disabled>
                  Izaberi godinu
                </option>
                <option value="1">1. godina</option>
                <option value="2">2. godina</option>
                <option value="3">3. godina</option>
                <option value="4">4. godina</option>
                <option value="5">Master</option>
              </select>
            </div>
            <div className="input-group">
              <label>Grad</label>
              <input
                type="text"
                name="reg-grad"
                placeholder="Sarajevo"
                required
              />
            </div>
            <button type="submit" className="btn-submit">
              Napravi nalog
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
