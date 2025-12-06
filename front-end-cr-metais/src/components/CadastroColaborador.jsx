import React, { useState } from "react";
import "../styles/CadastroClienteStyle.css";
import info from "../styles/img/yellow-bars-img.png";
import check from "../styles/img/check.png";
import logo from "../styles/img/LOGO.png";

export default function CadastroClienteModal() {
  const [step, setStep] = useState(1);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [csenha, setcSenha] = useState("");
  const [nivel, setNivel] = useState("");


  const [cpfCnpj, setCpfCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [apelido, setApelido] = useState("");
  const [tipoPessoa, setTipoPessoa] = useState("");
  

  function nextStep() {
    if (step < 4) setStep(step + 1);
  }

  function prevStep() {
    if (step > 1) setStep(step - 1);
  }

  function restart() {
    setStep(1);
  }

  function renderStep() {
    switch (step) {
      case 1:
        return (
          <>
            <div className="input-box">
              <img src={info} className="icon-img" />
              <input
                placeholder="Informe seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className="input-box">
              <img src={info} className="icon-img" />
              <input
                placeholder="Informe seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-box">
              <img src={info} className="icon-img" />
              <input
                placeholder="Informe sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <div className="input-box">
              <img src={info} className="icon-img" />
              <input
                placeholder="Confirme sua senha"
                value={csenha}
                onChange={(e) => setcSenha(e.target.value)}
              />
            </div>

            <div className="input-box">
              <img src={info} className="icon-img" />
              <input
                placeholder="Nível do cargo"
                value={nivel}
                onChange={(e) => setNivel(e.target.value)}
              />
            </div>

            
          </>
        );

      case 2:
        return (
          <div className="final-step">
            <h2 className="final-title">Cadastro realizado com sucesso!</h2>

            <img src={check} alt="Sucesso" className="final-check" />
          </div>
        );

      default:
        return null;
    }
  }

  return (
    <div className="cadastro-box">
      <h1 className="title">
        <img src={logo} className="logo-img" /> CR Metais 
      </h1>

      <p className="subtitle">Cadastro de novo colaborador</p>

      {renderStep()}

      <div className="btn-wrapper">
        {step === 1 && (
          <button className="btn-prev" onClick={nextStep}>
            Próximo
          </button>
        )}

        {step === 2 && (
          <button className="btn-prev" onClick={restart}>
            Finalizar
          </button>
        )}
      </div>
    </div>
  );
}
