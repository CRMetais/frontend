import React, { useState, useEffect } from "react";
import "../styles/CadastroClienteStyle.css";
import info from "../styles/img/yellow-bars-img.png";
import check from "../styles/img/check.png";
import logo from "../styles/img/LOGO.png";
import { cadastrarUsuario } from "../services/usuarioService";

export default function CadastroClienteModal({ onCadastroSucesso }) {
  const [step, setStep] = useState(1);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [csenha, setCSenha] = useState("");
  const [cargo, setCargo] = useState("");
  const [erros, setErros] = useState({});

  function emailValido(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  useEffect(() => {
    validarTempoReal(nome, email, senha, csenha, cargo);
  }, [nome, email, senha, csenha, cargo]);

  function validarTempoReal(nomeVal, emailVal, senhaVal, csenhaVal, cargoVal) {
    let novosErros = {};
    if (nomeVal.length > 0 && nomeVal.trim().length <= 2)
      novosErros.nome = "Nome deve conter pelo menos 3 letras";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailVal.length > 0 && !regex.test(emailVal))
      novosErros.email = "Email inválido";
    if (senhaVal.length > 0 && senhaVal.length < 8)
      novosErros.senha = "Senha deve conter no mínimo 8 caracteres";
    if (csenhaVal.length > 0 && senhaVal !== csenhaVal)
      novosErros.csenha = "As senhas não coincidem";
    if (cargoVal.length > 0 && cargoVal.trim().length === 0)
      novosErros.cargo = "Informe um cargo";
    setErros(novosErros);
  }

  function validarCampos() {
    let novosErros = {};
    if (nome.trim().length <= 2) novosErros.nome = "Nome deve conter pelo menos 3 letras";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) novosErros.email = "Email inválido";
    if (senha.length < 8) novosErros.senha = "Senha deve conter no mínimo 8 caracteres";
    if (senha !== csenha) novosErros.csenha = "As senhas não coincidem";
    if (cargo.trim().length === 0) novosErros.cargo = "Informe um cargo";
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  async function enviarCadastro() {
    if (!validarCampos()) return;
    const novoUsuario = { nome, email, senha, cargo };
    try {
      await cadastrarUsuario(novoUsuario);
      setStep(2);
      if (onCadastroSucesso) onCadastroSucesso();
    } catch (erro) {
      console.error("Erro ao cadastrar:", erro.response?.data || erro);
      alert("Erro ao conectar com o servidor!");
    }
  }

  function limparFormulario() {
    setNome("");
    setEmail("");
    setSenha("");
    setCSenha("");
    setCargo("");
    setErros({});
    setStep(1);
  }

  function handleButtonClick() {
    if (step === 1) {
      enviarCadastro();
    } else {
      limparFormulario();
    }
  }

  function renderStep() {
    if (step === 1) {
      return (
        <>
          <div className="input-box">
            <img src={info} className="icon-img" /> 
            <input placeholder="Informe seu nome" value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
          {erros.nome && <span className="erro">{erros.nome}</span>}

          <div className="input-box">
            <img src={info} className="icon-img" />
            <input placeholder="Informe seu email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          {erros.email && <span className="erro">{erros.email}</span>}

          <div className="input-box">
            <img src={info} className="icon-img" />
            <input type="password" placeholder="Informe sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
          </div>
          {erros.senha && <span className="erro">{erros.senha}</span>}

          <div className="input-box">
            <img src={info} className="icon-img" />
            <input type="password" placeholder="Confirme sua senha" value={csenha} onChange={(e) => setCSenha(e.target.value)} />
          </div>
          {erros.csenha && <span className="erro">{erros.csenha}</span>}

          <div className="input-box">
            <img src={info} className="icon-img" />
            <input placeholder="Cargo (ex: ADMIN)" value={cargo} onChange={(e) => setCargo(e.target.value)} />
          </div>
          {erros.cargo && <span className="erro">{erros.cargo}</span>}
        </>
      );
    }

    if (step === 2) {
      return (
        <div className="final-step">
          <h2 className="final-title">Cadastro realizado com sucesso!</h2>
          <img src={check} alt="Sucesso" className="final-check" />
        </div>
      );
    }

    return null;
  }

  const step1Valido =
    nome.trim().length > 2 &&
    emailValido(email) &&
    senha.length >= 8 &&
    senha === csenha &&
    cargo.trim().length > 0;

  return (
    <div className="cadastro-box">
      <h1 className="title">
        <img src={logo} className="logo-img" /> CR Metais
      </h1>
      <p className="subtitle">Cadastro de novo colaborador</p>
      {renderStep()}
      <div className="btn-wrapper">
        <button className="btn-prev" onClick={handleButtonClick} disabled={step === 1 && !step1Valido}>
          {step === 1 ? "Próximo" : "Finalizados"}
        </button>
      </div>
    </div>
  );
}