import React, { useState } from "react";
import "../styles/CadastroClienteModalStyle.css";
import info from "../styles/img/yellow-bars-img.png";
import check from "../styles/img/check.png";
import logo from "../styles/img/Logo.png"


export default function CadastroClienteModal() {
  const [step, setStep] = useState(1);

  // Step 1 - Dados Gerais
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [apelido, setApelido] = useState("");
  const [tipoPessoa, setTipoPessoa] = useState("");
  const [email, setEmail] = useState("");

  // Step 2 - Endereço
  const [cep, setCep] = useState("");
  const [bairro, setBairro] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [uf, setUf] = useState("");

  // Step 3 - Pagamento
  const [pagamento, setPagamento] = useState("pix");
  const [chavePix, setChavePix] = useState("");
  const [banco, setBanco] = useState("");
  const [agencia, setAgencia] = useState("");
  const [conta, setConta] = useState("");
  const [tipoConta, setTipoConta] = useState("");

  // Pertence ao cliente
  const [pertenceCliente, setPertenceCliente] = useState("sim");

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

      // STEP 1 -------------------------
      case 1:
        return (
          <>
            <div className="input-box">
              <img src={info} className="icon-img" />
              <input
                placeholder="CPF ou CNPJ"
                value={cpfCnpj}
                onChange={(e) => setCpfCnpj(e.target.value)}
              />
            </div>

            <div className="input-box">
              <img src={info} className="icon-img" />
              <input
                placeholder="Nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className="input-box">
              <img src={info} className="icon-img" />
              <input
                placeholder="Telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </div>

            <div className="input-box">
              <img src={info} className="icon-img" />
              <input
                placeholder="Apelido"
                value={apelido}
                onChange={(e) => setApelido(e.target.value)}
              />
            </div>

            <div className="input-box">
              <img src={info} className="icon-img" />
              <input
                placeholder="Tipo Pessoa (Física / Jurídica)"
                value={tipoPessoa}
                onChange={(e) => setTipoPessoa(e.target.value)}
              />
            </div>

            <div className="input-box">
              <img src={info} className="icon-img" />
              <input
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </>
        );

      // STEP 2 -------------------------
      case 2:
        return (
          <>
            {["CEP", "Bairro", "Logradouro", "Número", "Município", "UF"].map(
              (placeholder, index) => {
                const setters = [
                  setCep, setBairro, setLogradouro,
                  setNumero, setMunicipio, setUf
                ];
                const values = [cep, bairro, logradouro, numero, municipio, uf];

                return (
                  <div className="input-box" key={index}>
                    <img src={info} className="icon-img" />
                    <input
                      placeholder={placeholder}
                      value={values[index]}
                      onChange={(e) => setters[index](e.target.value)}
                    />
                  </div>
                );
              }
            )}
          </>
        );

      // STEP 3 -------------------------
      case 3:
        return (
          <>
            <div className="payment-radio-box">
              <label className="radio-option">
                <input
                  type="radio"
                  name="pagamento"
                  value="pix"
                  checked={pagamento === "pix"}
                  onChange={() => setPagamento("pix")}
                />
                <span>Pix</span>
              </label>

              <label className="radio-option">
                <input
                  type="radio"
                  name="pagamento"
                  value="banco"
                  checked={pagamento === "banco"}
                  onChange={() => setPagamento("banco")}
                />
                <span>Dados Bancários</span>
              </label>
            </div>

            {pagamento === "pix" && (
              <div className="input-box">
                <img src={info} className="icon-img" />
                <input
                  placeholder="Chave Pix"
                  value={chavePix}
                  onChange={(e) => setChavePix(e.target.value)}
                />
              </div>
            )}

            {pagamento === "banco" && (
              <>
                {[
                  "Banco",
                  "Agência",
                  "Conta",
                  "Tipo de Conta"
                ].map((placeholder, index) => {
                  const setters = [setBanco, setAgencia, setConta, setTipoConta];
                  const values = [banco, agencia, conta, tipoConta];

                  return (
                    <div className="input-box" key={index}>
                      <img src={info} className="icon-img" />
                      <input
                        placeholder={placeholder}
                        value={values[index]}
                        onChange={(e) => setters[index](e.target.value)}
                      />
                    </div>
                  );
                })}
              </>
            )}

            <p className="question-title">Pertence ao cliente?</p>

            <div className="payment-radio-box">
              <label className="radio-option">
                <input
                  type="radio"
                  name="pertence"
                  value="sim"
                  checked={pertenceCliente === "sim"}
                  onChange={() => setPertenceCliente("sim")}
                />
                <span>Sim</span>
              </label>

              <label className="radio-option">
                <input
                  type="radio"
                  name="pertence"
                  value="nao"
                  checked={pertenceCliente === "nao"}
                  onChange={() => setPertenceCliente("nao")}
                />
                <span>Não</span>
              </label>
            </div>
          </>
        );

      // STEP 4 — FINALIZAÇÃO -------------------------
      case 4:
        return (
          <div className="final-step">
            <h2 className="final-title">Cadastro realizado com sucesso!</h2>

            <img
              src={check}
              alt="Sucesso"
              className="final-check"
            />
          </div>
        );

      default:
        return null;
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h1 className="title">
          CR Metais{" "}
          <img src={logo} className="logo-img" />
        </h1>

        <p className="subtitle">Cadastro de novo cliente</p>

        {renderStep()}

        <div className="btn-wrapper">
          

          {step < 4 && (
            <button className="btn-prev" onClick={nextStep}>
              Próximo
            </button>
          )}

          {step > 1 && step < 4 && (
            <button className="btn-prev" onClick={prevStep}>
              Voltar
            </button>
          )}

          {step === 4 && (
            <button className="btn-prev" onClick={restart}>
              Finalizar
            </button>
          )}
        </div>

        <div className="dots-wrapper">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`dot ${step === i ? "active" : ""}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
