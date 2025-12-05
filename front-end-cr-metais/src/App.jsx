// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import CadastroClienteModal from "./components/CadastroClienteModal";
import Dashboard from "./components/Dashboard";
import ListaColaboradores from "./components/ListagemDeColaboradores";
import ListaCliente from "./components/ListagemDeCliente";
import Navbar from "./components/Navbar";
import Login from "./components/login";
import CadastroColaboradorModal from "./components/CadastroColaboradorModal"

function App() {
  return (
    <div>
      <CadastroClienteModal></CadastroClienteModal>
    </div>
  );
}

export default App;
