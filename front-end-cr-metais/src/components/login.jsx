import { useState } from 'react';
import "../styles/login.css";

export default function Login({ setCurrentPage }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const enviar = () => {
    console.log('Login:', { email, senha });
    setCurrentPage('Dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo"><h1>CRmetais</h1>
        <img src="src\styles\img\LOGO.png" alt="" /></div>
    
        <p className="login-subtitle">Bem-vindo de volta!</p>

        <div className="input-group">
          <input
            type="email"
            placeholder="Informe seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        
  
          <input
            type="password"
            placeholder="Informe sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="input-field"
          />
        </div>

        <button onClick={enviar} className="login-button">
          Entrar
        </button>
      </div>
    </div>
  );
}