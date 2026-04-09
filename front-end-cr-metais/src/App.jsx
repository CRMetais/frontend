import { useEffect, useState } from 'react';
import "./App.css";
import CadastroClienteModal from "./components/CadastroCliente";
import Dashboard from "./components/Dashboard";
import ListaColaboradores from "./components/ListagemDeColaboradores";
import ListaCliente from "./components/ListagemDeCliente";
import Boleta from "./components/Boleta";
import Navbar from "./components/Navbar";
import Resumo from "./components/Resumo"
import Login from "./components/login";
import Historico from "./components/Historico";
import TabelaPreco from "./components/TabelasPreco"
import { isUsuarioComum } from "./services/usuarioService";

const PAGINAS_RESTRITAS_COMUM = ["Gestão de dados", "Dashboard"];


function App() {
  const [currentPage, setCurrentPage] = useState("Login");

  const [resumoData, setResumoData] = useState(null);
  const usuarioComum = isUsuarioComum();

  useEffect(() => {
    if (usuarioComum && PAGINAS_RESTRITAS_COMUM.includes(currentPage)) {
      setCurrentPage("Resumo");
    }
  }, [currentPage, usuarioComum]);

  const renderPage = () => {
    if (usuarioComum && PAGINAS_RESTRITAS_COMUM.includes(currentPage)) {
      return <Resumo />;
    }

    switch(currentPage) {
      case "Resumo":
        // return <div style={{padding: "2rem", textAlign: "center"}}><h1>Resumo - Em desenvolvimento</h1></div>;
        return <Resumo />;
      case "Histórico":
        return <Historico />;
      case "Fornecedores":
        return <ListaCliente />;
      case "Tabelas Preço":
       return <TabelaPreco/>;
      case "Boleta":
        return <Boleta />;
      case "Gestão de dados":
        return <ListaColaboradores />;
      case "Dashboard":
        return <Dashboard />;
      case "Login":
        return <Login setCurrentPage={setCurrentPage} />;
      default:
        return <Dashboard />;
    }
  };

  return (
  <div>
    {currentPage !== "Login" && (
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
    )}

    <div>
      {renderPage()}
    </div>
  </div>
);

}

export default App;
