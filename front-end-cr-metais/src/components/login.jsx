import { useState } from 'react';
import styles from '../styles/login.module.css';

export default function Login({ setCurrentPage }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  const enviar = async () => {
    setErro('');

    if (!email || !senha) {
      setErro('Informe email e senha.');
      return;
    }

    try {
      setCarregando(true);

      const resposta = await fetch(`${API_URL}/usuarios/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      if (!resposta.ok) {
        let mensagem = 'Não foi possível fazer login.';
        try {
          const erroBody = await resposta.json();
          mensagem = erroBody?.message || erroBody?.erro || mensagem;
        } catch {
          // ignora se não vier JSON
        }

        if (resposta.status === 401) {
          setErro(mensagem || 'Credenciais inválidas.');
        } else {
          setErro(mensagem);
        }
        return;
      }

      const dados = await resposta.json();

      // Ajuste conforme o nome do campo retornado no seu UsuarioTokenDto
      const token = dados?.token || dados?.accessToken || dados?.jwt;

      if (token) {
        localStorage.setItem('token', token);
      }

      localStorage.setItem('usuario', JSON.stringify(dados));
      setCurrentPage('Dashboard');
    } catch {
      setErro('Erro de conexão com o servidor.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.logo}>
          <h1>CRmetais</h1>
          <img src="/img/LOGO.png" alt="Logo" />
        </div>

        <p className={styles.loginSubtitle}>Bem-vindo de volta!</p>

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

        {erro && <p style={{ color: '#d32f2f', marginTop: 12 }}>{erro}</p>}

        <button onClick={enviar} className={styles.loginButton} disabled={carregando}>
          {carregando ? 'Entrando...' : 'Entrar'}
        </button>
      </div>
    </div>
  );
}
