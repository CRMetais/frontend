import { useState } from 'react';
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


function App() {
  const [currentPage, setCurrentPage] = useState("Login");

  const renderPage = () => {
    switch(currentPage) {
      case "Resumo":
        // return <div style={{padding: "2rem", textAlign: "center"}}><h1>Resumo - Em desenvolvimento</h1></div>;
        return <Resumo />;
      case "Histórico":
        return <Historico />;
      case "Clientes":
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

    <div style={{ paddingTop: currentPage !== "Login" ? "88px" : "0" }}>
      {renderPage()}
    </div>
  </div>
);

}

export default App;
