const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://bgnhonfcmynmtywfmphq.supabase.co";
const supabaseKey = "sb_publishable_VRszRdd0Hb2HvOoFlDDrgg_z0WX5J_e";
const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log("Ubacujem oglase...");

  // ID korisnika iz tvoje baze
  const korisnik_id = 5;

  const oglasi = [
    {
      korisnik_id,
      naslov: "Stan na Koševu",
      opis: "Lijep, svijetao stan blizu fakulteta.",
      cijena: 300,
      tip: "stan",
      grad: "Sarajevo",
      lokacija: "Koševo",
      status: "aktivan",
    },
    {
      korisnik_id,
      naslov: "Garsonjera Centar",
      opis: "Odlična garsonjera u centru grada.",
      cijena: 400,
      tip: "stan",
      grad: "Sarajevo",
      lokacija: "Baščaršija",
      status: "aktivan",
    },
    {
      korisnik_id,
      naslov: "Cimer za stan na Grbavici",
      opis: "Tražim cimera za trosoban stan.",
      cijena: 250,
      tip: "stan",
      grad: "Sarajevo",
      lokacija: "Grbavica",
      status: "aktivan",
    },
    {
      korisnik_id,
      naslov: "Front-end Developer",
      opis: "IT firma traži studenta za honorarni rad.",
      cijena: 800,
      tip: "posao",
      grad: "Sarajevo",
      lokacija: "Remote",
      status: "aktivan",
    },
    {
      korisnik_id,
      naslov: "Konobar u kafiću",
      opis: "Potreban konobar sa fleksibilnim radnim vremenom.",
      cijena: 500,
      tip: "posao",
      grad: "Sarajevo",
      lokacija: "Centar",
      status: "aktivan",
    },
    {
      korisnik_id,
      naslov: "Praksa u marketingu",
      opis: "Šestomjesečna praksa u marketinškoj agenciji.",
      cijena: 300,
      tip: "posao",
      grad: "Sarajevo",
      lokacija: "Marijin Dvor",
      status: "aktivan",
    },
    {
      korisnik_id,
      naslov: "Skripta Analiza 2",
      opis: "Skripta sa svim predavanjima i riješenim rokovima.",
      cijena: 25,
      tip: "skripta",
      grad: "Sarajevo",
      lokacija: "ETF Sarajevo",
      status: "aktivan",
    },
    {
      korisnik_id,
      naslov: "Materijali za Fiziku 1",
      opis: "Kompletni materijali za pripremu ispita.",
      cijena: 15,
      tip: "skripta",
      grad: "Sarajevo",
      lokacija: "PMF Sarajevo",
      status: "aktivan",
    },
    {
      korisnik_id,
      naslov: "Skripta iz Osnova ekonomije",
      opis: "Sažeta skripta za lakše polaganje.",
      cijena: 20,
      tip: "skripta",
      grad: "Sarajevo",
      lokacija: "Ekonomski fakultet",
      status: "aktivan",
    },
    {
      korisnik_id,
      naslov: "Zbirka zadataka iz Programiranja",
      opis: "Riješeni zadaci iz C++ i Java programiranja.",
      cijena: 30,
      tip: "skripta",
      grad: "Sarajevo",
      lokacija: "ETF Sarajevo",
      status: "aktivan",
    },
  ];

  const { error } = await supabase.from("oglas").insert(oglasi);

  if (error) {
    console.error("Greška:", error.message);
  } else {
    console.log("Uspješno ubaceno 10 oglasa!");
  }
}

seed();
