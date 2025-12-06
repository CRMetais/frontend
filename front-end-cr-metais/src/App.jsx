import { useState } from 'react';
import "./App.css";
import CadastroClienteModal from "./components/CadastroClienteModal";
import Dashboard from "./components/Dashboard";
import ListaColaboradores from "./components/ListagemDeColaboradores";
import ListaCliente from "./components/ListagemDeCliente";
import Navbar from "./components/Navbar";
import Login from "./components/login";

function App() {
  const [currentPage, setCurrentPage] = useState("Dashboard");

  const renderPage = () => {
    switch(currentPage) {
      case "Resumo":
        return <div style={{padding: "2rem", textAlign: "center"}}><h1>Resumo - Em desenvolvimento</h1></div>;
      case "Histórico":
        return <div style={{padding: "2rem", textAlign: "center"}}><h1>Histórico - Em desenvolvimento</h1></div>;
      case "Clientes":
        return <ListaColaboradores />;
      case "Tabelas Preço":
        return <div style={{padding: "2rem", textAlign: "center"}}><h1>Tabelas de Preço - Em desenvolvimento</h1></div>;
      case "Notas":
        return <div style={{padding: "2rem", textAlign: "center"}}><h1>Notas - Em desenvolvimento</h1></div>;
      case "Gestão de dados":
        return <div style={{padding: "2rem", textAlign: "center"}}><h1>Gestão de Dados - Em desenvolvimento</h1></div>;
      case "Dashboard":
        return <Dashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <Dashboard></Dashboard>
    </div>
  );
}

export default App;
