"use client";

import React, { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
}

export default function Toast({ message, type = "success", onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const boje = {
    success: { bg: "rgba(76, 175, 80, 0.95)", ikona: "fa-solid fa-circle-check" },
    error: { bg: "rgba(255, 59, 48, 0.95)", ikona: "fa-solid fa-circle-exclamation" },
    info: { bg: "rgba(29, 161, 242, 0.95)", ikona: "fa-solid fa-circle-info" },
  };

  const stil = boje[type] || boje.success;

  return (
    <div
      style={{
        position: "fixed",
        top: "90px",
        right: "20px",
        background: stil.bg,
        color: "white",
        padding: "15px 25px",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
        zIndex: 10000,
        fontWeight: 600,
        fontSize: "14px",
        animation: "slideInRight 0.4s ease-out",
        maxWidth: "350px",
      }}
    >
      <i className={stil.ikona} style={{ fontSize: "20px" }}></i>
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: "transparent",
          border: "none",
          color: "white",
          cursor: "pointer",
          marginLeft: "10px",
          fontSize: "16px",
          opacity: 0.7,
        }}
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
}