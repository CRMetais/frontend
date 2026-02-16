import { useState } from 'react';
import styles from '../styles/login.module.css'; // IMPORT CORRETO

export default function Login({ setCurrentPage }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const enviar = () => {
    console.log('Login:', { email, senha });
    setCurrentPage('Dashboard');
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.logo}>
          <h1>CRmetais</h1>
          <img src="/img/LOGO.png" alt="Logo" />
        </div>
    
        <p className={styles.loginSubtitle}>
          Bem-vindo de volta!
        </p>

        <div className={styles.inputGroup}>
          <input
            type="email"
            placeholder="Informe seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.inputField}
          />
        
          <input
            type="password"
            placeholder="Informe sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className={styles.inputField}
          />
        </div>

        <button 
          onClick={enviar} 
          className={styles.loginButton}
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
