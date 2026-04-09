import styles from "../styles/NavbarStyle.module.css";
import logo from "../styles/img/LOGO.png";
import logout from "../styles/img/icon-logout.png";
import { isUsuarioComum } from "../services/usuarioService";

export default function Navbar({ currentPage, setCurrentPage }) {
  const usuarioComum = isUsuarioComum();
  const items = [
    "Resumo",
    "Histórico",
    "Fornecedores",
    "Tabelas Preço",
    "Boleta",
    "Gestão de dados",
    "Dashboard",
  ];
  const itensVisiveis = usuarioComum
    ? items.filter((item) => item !== "Gestão de dados" && item !== "Dashboard")
    : items;

  const handleItemClick = (item) => {
    setCurrentPage(item);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setCurrentPage("Login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" className={styles.logoImg} />
        <p className={styles.texto_logo}>CR Metais</p>
      </div>

      <ul className={styles.item_list}>
        {itensVisiveis.map((item) => (
          <li
            key={item}
            className={currentPage === item ? styles.active : ""}
            onClick={() => handleItemClick(item)}
          >
            {item}
          </li>
        ))}
      </ul>

      <div className={styles.btn_sair} onClick={handleLogout}>
        Sair
        <img className={styles.btn_logout} src={logout} alt="Ícone de Sair" />
      </div>
    </nav>
  );
}