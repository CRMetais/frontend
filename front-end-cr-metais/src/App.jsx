// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import CadastroClienteModal from "./components/CadastroClienteModal";
import Dashboard from "./components/Dashboard";
import ListaColaboradores from "./components/ListagemDeColaboradores";
import Navbar from "./components/Navbar";
import Login from "./components/login";


function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Dashboard></Dashboard>
    </div>
  );
}

export default App;
