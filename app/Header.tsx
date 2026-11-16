"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// OBRISANO: const navCss = ...

export default function Header() {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // ... ostala stanja ...

  return (
    <>
      {/* OBRISANO: <style>{navCss}</style> */}

      <nav className="top-nav">
        <div className="nav-container">
          {/* ... tvoja navigacija ... */}
        </div>
      </nav>

      {/* ... modal ... */}
    </>
  );
}