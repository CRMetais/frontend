import { useState } from 'react';
import "./App.css";
import CadastroClienteModal from "./components/CadastroCliente";
import Dashboard from "./components/Dashboard";
import ListaColaboradores from "./components/ListagemDeColaboradores";
import ListaCliente from "./components/ListagemDeCliente";
import Navbar from "./components/Navbar";
import Login from "./components/login";

function App() {
  const [currentPage, setCurrentPage] = useState("Login");

  const renderPage = () => {
    switch(currentPage) {
      case "Resumo":
        return <div style={{padding: "2rem", textAlign: "center"}}><h1>Resumo - Em desenvolvimento</h1></div>;
      case "Histórico":
        return <div style={{padding: "2rem", textAlign: "center"}}><h1>Histórico - Em desenvolvimento</h1></div>;
      case "Clientes":
        return <ListaCliente />;
      case "Tabelas Preço":
        return <div style={{padding: "2rem", textAlign: "center"}}><h1>Tabelas de Preço - Em desenvolvimento</h1></div>;
      case "Notas":
        return <div style={{padding: "2rem", textAlign: "center"}}><h1>Notas - Em desenvolvimento</h1></div>;
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
      {renderPage()}
    </div>
  );
}

export default App;
