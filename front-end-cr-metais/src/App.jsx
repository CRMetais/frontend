// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import ListaColaboradores from "./components/ListagemDeColaboradores";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <ListaColaboradores></ListaColaboradores>
      {/* <CadastroClienteModal></CadastroClienteModal> */}
    </div>
  );
}

export default App;
