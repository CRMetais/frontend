import { useState } from 'react';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const enviar = () => {
    console.log('Login:', { email, senha });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">
          CR Metais <span className="login-bars">|||</span>
        </h1>
        <p className="login-subtitle">Bem-vindo de volta!</p>

        <div className="input-group">
          <span className="input-icon">ⓘ</span>
          <input
            type="email"
            placeholder="Informe seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="input-group">
          <span className="input-icon">ⓘ</span>
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