// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import CadastroClienteModal from "./components/CadastroClienteModal";
import ListaColaboradores from "./components/ListagemDeColaboradores";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <br />
      <div style={{ display: "flex", gap: "300px", alignItems: "flex-start" }}>
      <ListaColaboradores></ListaColaboradores>
      <CadastroClienteModal></CadastroClienteModal>
      </div>
      
    </div>
  );
}

export default App;
