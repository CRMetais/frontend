import { useState } from "react";
import "../styles/NavbarStyle.css";

export default function Navbar() {
  const [active, setActive] = useState("Clientes");

  const items = [
    "Resumo",
    "Histórico",
    "Clientes",
    "Tabelas Preço",
    "Notas",
    "Gestão de dados",
    "Dashboard",
  ];

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <span className="logo-text">CR Metais</span>
        <div className="logo-bars">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>

      {/* Menu */}
      <ul className="navbar-menu">
        {items.map((item) => (
          <li key={item} className="menu-item">
            <button
              onClick={() => setActive(item)}
              className={`menu-link ${active === item ? "active" : ""}`}
            >
              {item}
            </button>
            {active === item && <span className="underline" />}
          </li>
        ))}
      </ul>

      {/* Logout */}
      <button className="logout-btn">Sair</button>
    </nav>
  );
}
