import { useState } from "react";
import "../styles/NavbarStyle.css";
import logo from "../styles/img/LOGO.png";

export default function Navbar() {
  const [active, setActive] = useState("");

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
      <div className="logo">
        <p className="texto_logo">CR Metais</p>
       <img src={logo} alt="Logo" id="logo"/>
      </div>
      <ul className="item_list">
        {items.map(item => (
          <li 
            key={item} 
            className={active === item ? "active" : "inactivated"}
            onClick={() => setActive(item)}
          >
            {item}
          </li>
        ))}
      </ul>
      <button className="btn_sair">Sair</button>
    </nav>
  );
}
