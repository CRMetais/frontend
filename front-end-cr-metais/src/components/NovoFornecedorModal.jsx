import React, { useState, useEffect } from "react";
import styles from "../styles/Clientes.module.css";
import CustomSelect from "./BoxSelects";
import { API_URL } from "../services/apiClient";

const TOTAL_STEPS = 6;

export default function NovoFornecedorModal({ isOpen, isClosing, onClose, onSuccess }) {
  const [step, setStep] = useState(1);
  const [cepLoading, setCepLoading] = useState(false);
  const [cepErro, setCepErro] = useState("");
  const [tabelasDisponiveis, setTabelasDisponiveis] = useState([]);

  const resetarEstados = () => {
    setStep(1);
    setCepErro("");
    setDadosPessoais({ nomeCompleto: "", cpfCnpj: "", telefone: "", apelido: "", tipoPessoa: "" });
    setEndereco({ cep: "", bairro: "", logradouro: "", numero: "", municipio: "", uf: "" });
    setPagamento({ tipoPagamento: "", pertenceCliente: "" });
    setDadosPix({ chavePix: "" });
    setDadosBancarios({ banco: "", agencia: "", numeroConta: "", tipoConta: "" });
    setResponsavel({ nomeCompleto: "", cpfCnpj: "" });
    setTabela({ idTabela: null, nomeTabela: "" });
    setResponsavelSelecionado({ idUsuario: null, nomeUsuario: "" });
  };

  const [usuariosDisponiveis, setUsuariosDisponiveis] = useState([]);
  const [responsavelSelecionado, setResponsavelSelecionado] = useState({
    idUsuario: null,
    nomeUsuario: "",
  });

  const [dadosPessoais, setDadosPessoais] = useState({
    nomeCompleto: "",
    cpfCnpj: "",
    telefone: "",
    apelido: "",
    tipoPessoa: "",
  });

  const [endereco, setEndereco] = useState({
    cep: "",
    bairro: "",
    logradouro: "",
    numero: "",
    municipio: "",
    uf: "",
  });

  const [pagamento, setPagamento] = useState({
    tipoPagamento: "",
    pertenceCliente: "",
  });

  const [dadosPix, setDadosPix] = useState({
    chavePix: "",
  });

  const [dadosBancarios, setDadosBancarios] = useState({
    banco: "",
    agencia: "",
    numeroConta: "",
    tipoConta: "",
  });

  const [responsavel, setResponsavel] = useState({
    nomeCompleto: "",
    cpfCnpj: "",
  });

  const [tabela, setTabela] = useState({
    idTabela: null,
    nomeTabela: "",
  });

  useEffect(() => {
    if (isOpen) {
      Promise.all([
        fetch(`${API_URL}/tabelas-precos`).then((r) => {
          if (!r.ok) throw new Error("Erro ao buscar tabelas");
          return r.json();
        }),
        fetch(`${API_URL}/usuarios`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }).then((r) => {
          if (!r.ok) throw new Error("Erro ao buscar usuários");
          return r.json();
        }),
      ])
        .then(([tabelasData, usuariosData]) => {
          const tabelas = Array.isArray(tabelasData) ? tabelasData : [];
          const maisRecentes = Object.values(
            tabelas.reduce((acc, tabela) => {
              const nome = tabela.nomeTabela;
              if (!acc[nome] || tabela.versao > acc[nome].versao) acc[nome] = tabela;
              return acc;
            }, {})
          );
          setTabelasDisponiveis(maisRecentes);
          setUsuariosDisponiveis(Array.isArray(usuariosData) ? usuariosData : []);
        })
        .catch((err) => {
          console.error(err);
          alert("Erro ao carregar dados iniciais");
        });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const buscarCep = async (cep) => {
    const cepLimpo = cep.replace(/\D/g, "");
    if (cepLimpo.length !== 8) return;

    setCepLoading(true);
    setCepErro("");

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await res.json();

      if (data.erro) {
        setCepErro("CEP não encontrado. Verifique e tente novamente.");
        return;
      }

      setEndereco((prev) => ({
        ...prev,
        bairro: data.bairro || "",
        logradouro: data.logradouro || "",
        municipio: data.localidade || "",
        uf: data.uf || "",
      }));
    } catch (err) {
      setCepErro("Erro ao buscar CEP. Verifique sua conexão.");
    } finally {
      setCepLoading(false);
    }
  };

  const handleNext = () => {
    // Validação etapa 1
    if (step === 1) {
      if (!dadosPessoais.nomeCompleto || !dadosPessoais.cpfCnpj || !dadosPessoais.telefone || !dadosPessoais.tipoPessoa) {
        alert("Preencha todos os campos obrigatórios antes de continuar.");
        return;
      }
    }

    // Validação etapa 2
    if (step === 2) {
      if (!endereco.cep || !endereco.bairro || !endereco.logradouro || !endereco.numero || !endereco.municipio || !endereco.uf) {
        alert("Preencha todos os campos de endereço, incluindo o número.");
        return;
      }
    }

    // Se não selecionou tipo de pagamento, pula a etapa 4
    if (step === 3 && !pagamento.tipoPagamento) {
      setStep(5);
      return;
    }

    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const handleBack = () => {
    if (step === 5) {
      setStep(pagamento.tipoPagamento ? 4 : 3);
      return;
    }
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleFinish = async () => {
    try {
      // 1. Salva o endereço
      const enderecoPayload = {
        estado: endereco.uf,
        cidade: endereco.municipio,
        cep: endereco.cep.replace(/\D/g, ""),
        logradouro: endereco.logradouro,
        complemento: null,
        bairro: endereco.bairro,
        numero: endereco.numero,
      };

      const resEndereco = await fetch(`${API_URL}/enderecos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enderecoPayload),
      });

      if (!resEndereco.ok) {
        const erro = await resEndereco.text();
        console.error("Erro endereço:", erro);
        throw new Error("Erro ao salvar endereço");
      }

      const enderecoSalvo = await resEndereco.json();

      // 2. Salva o fornecedor
      const fornecedorPayload = {
        nome: dadosPessoais.nomeCompleto,
        documento: dadosPessoais.cpfCnpj.replace(/\D/g, ""),
        telefone: dadosPessoais.telefone.replace(/\D/g, ""),
        apelido: dadosPessoais.apelido,
        tipoFornecedor: dadosPessoais.tipoPessoa,
        idEndereco: enderecoSalvo.idEndereco,
        idTabelaPreco: tabela.idTabela,
        idUsuario: responsavelSelecionado.idUsuario,
      };

      console.log("Payload fornecedor:", JSON.stringify(fornecedorPayload));

      const resFornecedor = await fetch(`${API_URL}/fornecedores`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fornecedorPayload),
      });

      if (!resFornecedor.ok) {
        const erro = await resFornecedor.text();
        console.error("Erro fornecedor:", erro);
        throw new Error("Erro ao salvar fornecedor");
      }

      const fornecedorSalvo = await resFornecedor.json();

      // 3. Salva conta de pagamento (se preenchida)
      if (pagamento.tipoPagamento) {
        const isPix = pagamento.tipoPagamento === "Pix";

        // Mapeia "Conta Corrente" → "C" e "Conta Poupança" → "P"
        const tipoContaMap = {
          "Conta Corrente": "C",
          "Conta Poupança": "P",
        };

        const contaPayload = {
          pix: isPix,
          pertenceFornecedor: pagamento.pertenceCliente === "Sim",
          contaAtiva: true,
          idFornecedor: fornecedorSalvo.idFornecedor,
          nome: responsavel.nomeCompleto || null,
          documento: responsavel.cpfCnpj ? responsavel.cpfCnpj.replace(/\D/g, "") : null,

          // Campos de Pix
          chavePix: isPix ? dadosPix.chavePix : null,

          // Campos de Conta Bancária
          banco: !isPix ? dadosBancarios.banco : null,
          agencia: !isPix ? dadosBancarios.agencia : null,
          conta: !isPix ? dadosBancarios.numeroConta : null,
          tipoConta: !isPix ? tipoContaMap[dadosBancarios.tipoConta] : null,
        };

        const resConta = await fetch(`${API_URL}/contas-pagamentos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contaPayload),
        });

        if (!resConta.ok) {
          const erro = await resConta.text();
          console.error("Erro conta pagamento:", erro);
          throw new Error("Erro ao salvar conta de pagamento");
        }
      }

      resetarEstados();
      onSuccess?.();
      onClose();

    } catch (err) {
      console.error(err);
      alert(err.message);
    }

    console.log("idUsuario enviado:", responsavelSelecionado.idUsuario);
  };

  const handleClose = () => {
    resetarEstados();
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={`${styles.modal} ${isClosing ? styles.closing : ""}`}>

        {/* ───────────── ETAPA 1 — Dados pessoais ───────────── */}
        {step === 1 && (
          <>
            <h2 className={styles.modalTitle}>✏️ Novo fornecedor ✏️</h2>

            <div className={styles.campos}>
              <span>Nome completo</span>
              <input
                className={styles.inputs}
                type="text"
                placeholder="Fulano de Tal"
                value={dadosPessoais.nomeCompleto}
                onChange={(e) =>
                  setDadosPessoais({ ...dadosPessoais, nomeCompleto: e.target.value })
                }
              />
            </div>

            <div className={styles.campos}>
              <span>CPF ou CNPJ</span>
              <input
                className={styles.inputs}
                type="text"
                placeholder="123.456.789-00"
                value={dadosPessoais.cpfCnpj}
                onChange={(e) =>
                  setDadosPessoais({ ...dadosPessoais, cpfCnpj: e.target.value })
                }
              />
            </div>

            <div className={styles.campos}>
              <span>Telefone para contato</span>
              <input
                className={styles.inputs}
                type="text"
                placeholder="(11) 99999-9999"
                value={dadosPessoais.telefone}
                onChange={(e) =>
                  setDadosPessoais({ ...dadosPessoais, telefone: e.target.value })
                }
              />
            </div>

            <div className={styles.campos}>
              <span>Apelido</span>
              <input
                className={styles.inputs}
                type="text"
                placeholder="Fulano da Região Tal"
                value={dadosPessoais.apelido}
                onChange={(e) =>
                  setDadosPessoais({ ...dadosPessoais, apelido: e.target.value })
                }
              />
            </div>

            <div className={styles.campos}>
              <span>Pessoa Física / Jurídica</span>
              <CustomSelect
                options={["PESSOA_FISICA", "PESSOA_JURIDICA"]}
                value={dadosPessoais.tipoPessoa}
                onChange={(val) =>
                  setDadosPessoais({ ...dadosPessoais, tipoPessoa: val })
                }
              />
            </div>

            <button className={styles.btn_proxima_pagina} onClick={handleNext}>
              Próxima página
            </button>
            <button className={styles.btn_fechar} onClick={handleClose}>
              Fechar
            </button>
          </>
        )}

        {/* ───────────── ETAPA 2 — Endereço ───────────── */}
        {step === 2 && (
          <>
            <h2 className={styles.modalTitle}>✏️ Novo fornecedor ✏️</h2>

            <div className={styles.campos}>
              <span>CEP</span>
              <input
                className={styles.inputs}
                type="text"
                placeholder="00000-000"
                value={endereco.cep}
                onChange={(e) => {
                  setEndereco({ ...endereco, cep: e.target.value });
                  setCepErro("");
                }}
                onBlur={(e) => buscarCep(e.target.value)}
              />
              {cepLoading && (
                <span style={{ fontSize: "0.8rem", color: "#888" }}>Buscando CEP...</span>
              )}
              {cepErro && (
                <span style={{ fontSize: "0.8rem", color: "red" }}>{cepErro}</span>
              )}
            </div>

            <div className={styles.campos}>
              <span>Bairro</span>
              <input
                className={styles.inputs}
                type="text"
                placeholder="Centro"
                value={endereco.bairro}
                onChange={(e) => setEndereco({ ...endereco, bairro: e.target.value })}
              />
            </div>

            <div className={styles.campos}>
              <span>Logradouro</span>
              <input
                className={styles.inputs}
                type="text"
                placeholder="Rua das Flores"
                value={endereco.logradouro}
                onChange={(e) => setEndereco({ ...endereco, logradouro: e.target.value })}
              />
            </div>

            <div className={styles.campos}>
              <span>Número</span>
              <input
                className={styles.inputs}
                type="text"
                placeholder="123"
                value={endereco.numero}
                onChange={(e) => setEndereco({ ...endereco, numero: e.target.value })}
              />
            </div>

            <div className={styles.campos}>
              <span>Município</span>
              <input
                className={styles.inputs}
                type="text"
                placeholder="São Paulo"
                value={endereco.municipio}
                onChange={(e) => setEndereco({ ...endereco, municipio: e.target.value })}
              />
            </div>

            <div className={styles.campos}>
              <span>UF</span>
              <input
                className={styles.inputs}
                type="text"
                placeholder="SP"
                maxLength={2}
                value={endereco.uf}
                onChange={(e) =>
                  setEndereco({ ...endereco, uf: e.target.value.toUpperCase() })
                }
              />
            </div>

            <div className={styles.btns_back_prox}>
              <button className={styles.btn_fechar} onClick={handleBack}>
                Voltar
              </button>
              <button className={styles.btn_proxima_pagina} onClick={handleNext}>
                Próx. página
              </button>
            </div>

            <button className={styles.btn_fechar} onClick={handleClose}>
              Fechar
            </button>
          </>
        )}

        {/* ───────────── ETAPA 3 — Pagamento ───────────── */}
        {step === 3 && (
          <>
            <h2 className={styles.modalTitle}>✏️ Novo fornecedor ✏️</h2>

            <div className={styles.campos}>
              <span>Tipo de pagamento</span>
              <CustomSelect
                placeholder="Pix ou Conta Bancária"
                options={["Pix", "Conta Bancária"]}
                value={pagamento.tipoPagamento}
                onChange={(val) =>
                  setPagamento({ ...pagamento, tipoPagamento: val })
                }
              />
            </div>

            <div className={styles.campos}>
              <span>Pertence ao fornecedor</span>
              <CustomSelect
                placeholder="Sim ou Não"
                options={["Sim", "Não"]}
                value={pagamento.pertenceCliente}
                onChange={(val) =>
                  setPagamento({ ...pagamento, pertenceCliente: val })
                }
              />
            </div>

            <div className={styles.btns_back_prox}>
              <button className={styles.btn_fechar} onClick={handleBack}>
                Voltar
              </button>
              <button className={styles.btn_proxima_pagina} onClick={handleNext}>
                Próx. página
              </button>
            </div>

            <button className={styles.btn_fechar} onClick={handleClose}>
              Fechar
            </button>
          </>
        )}

        {/* ───────────── ETAPA 4 — Detalhe do pagamento ───────────── */}
        {step === 4 && pagamento.tipoPagamento === "Pix" && (
          <>
            <h2 className={styles.modalTitle}>✏️ Novo fornecedor ✏️</h2>

            <div className={styles.campos}>
              <span>Chave Pix</span>
              <input
                className={styles.inputs}
                type="text"
                placeholder="CPF, e-mail, telefone ou chave aleatória"
                value={dadosPix.chavePix}
                onChange={(e) => setDadosPix({ chavePix: e.target.value })}
              />
            </div>

            <div className={styles.btns_back_prox}>
              <button className={styles.btn_fechar} onClick={handleBack}>
                Voltar
              </button>
              <button className={styles.btn_proxima_pagina} onClick={handleNext}>
                Próx. página
              </button>
            </div>

            <button className={styles.btn_fechar} onClick={handleClose}>
              Fechar
            </button>
          </>
        )}

        {step === 4 && pagamento.tipoPagamento === "Conta Bancária" && (
          <>
            <h2 className={styles.modalTitle}>✏️ Novo fornecedor ✏️</h2>

            <div className={styles.campos}>
              <span>Banco</span>
              <input
                className={styles.inputs}
                type="text"
                placeholder="Ex: Itaú, Bradesco, Nubank..."
                value={dadosBancarios.banco}
                onChange={(e) =>
                  setDadosBancarios({ ...dadosBancarios, banco: e.target.value })
                }
              />
            </div>

            <div className={styles.campos}>
              <span>Agência</span>
              <input
                className={styles.inputs}
                type="text"
                placeholder="0000"
                value={dadosBancarios.agencia}
                onChange={(e) =>
                  setDadosBancarios({ ...dadosBancarios, agencia: e.target.value })
                }
              />
            </div>

            <div className={styles.campos}>
              <span>Número da conta</span>
              <input
                className={styles.inputs}
                type="text"
                placeholder="00000-0"
                value={dadosBancarios.numeroConta}
                onChange={(e) =>
                  setDadosBancarios({ ...dadosBancarios, numeroConta: e.target.value })
                }
              />
            </div>

            <div className={styles.campos}>
              <span>Tipo de conta</span>
              <CustomSelect
                placeholder="Corrente ou Poupança"
                options={["Conta Corrente", "Conta Poupança"]}
                value={dadosBancarios.tipoConta}
                onChange={(val) =>
                  setDadosBancarios({ ...dadosBancarios, tipoConta: val })
                }
              />
            </div>

            <div className={styles.btns_back_prox}>
              <button className={styles.btn_fechar} onClick={handleBack}>
                Voltar
              </button>
              <button className={styles.btn_proxima_pagina} onClick={handleNext}>
                Próx. página
              </button>
            </div>

            <button className={styles.btn_fechar} onClick={handleClose}>
              Fechar
            </button>
          </>
        )}

        {/* ───────────── ETAPA 5 — Responsável ───────────── */}
        {step === 5 && (
          <>
            <h2 className={styles.modalTitle}>✏️ Novo fornecedor ✏️</h2>

            <div className={styles.campos}>
              <span>Nome completo</span>
              <input
                className={styles.inputs}
                type="text"
                placeholder="Fulano de Tal"
                value={responsavel.nomeCompleto}
                onChange={(e) =>
                  setResponsavel({ ...responsavel, nomeCompleto: e.target.value })
                }
              />
            </div>

            <div className={styles.campos}>
              <span>CPF / CNPJ</span>
              <input
                className={styles.inputs}
                type="text"
                placeholder="123.456.789-00"
                value={responsavel.cpfCnpj}
                onChange={(e) =>
                  setResponsavel({ ...responsavel, cpfCnpj: e.target.value })
                }
              />
            </div>

            <div className={styles.btns_back_prox}>
              <button className={styles.btn_fechar} onClick={handleBack}>
                Voltar
              </button>
              <button className={styles.btn_proxima_pagina} onClick={handleNext}>
                Próx. página
              </button>
            </div>

            <button className={styles.btn_fechar} onClick={handleClose}>
              Fechar
            </button>
          </>
        )}

        {/* ───────────── ETAPA 6 — Tabela ───────────── */}
        {step === 6 && (
          <>
            <h2 className={styles.modalTitle}>✏️ Novo fornecedor ✏️</h2>

            <div className={styles.campos}>
              <span>Responsável</span>
              <CustomSelect
                placeholder="Selecione o responsável"
                options={usuariosDisponiveis.map((u) => u.nome)}
                value={responsavelSelecionado.nomeUsuario}
                onChange={(nomeUsuario) => {
                  const selecionado = usuariosDisponiveis.find((u) => u.nome === nomeUsuario);
                  setResponsavelSelecionado({
                    nomeUsuario,
                    idUsuario: selecionado?.idUsuario ?? null,
                  });
                }}
              />
            </div>

            <div className={styles.campos}>
              <span>Tabela de preço</span>
              <CustomSelect
                placeholder="Selecione a tabela"
                options={tabelasDisponiveis.map((t) => t.nomeTabela)}
                value={tabela.nomeTabela}
                onChange={(nomeTabela) => {
                  const selecionada = tabelasDisponiveis.find((t) => t.nomeTabela === nomeTabela);
                  setTabela({ nomeTabela, idTabela: selecionada?.idTabela });
                }}
              />
            </div>

            <div className={styles.btns_back_prox}>
              <button className={styles.btn_fechar} onClick={handleBack}>Voltar</button>
              <button className={styles.btn_proxima_pagina} onClick={handleFinish}>Finalizar</button>
            </div>

            <button className={styles.btn_fechar} onClick={handleClose}>Fechar</button>
          </>
        )}

      </div>
    </div>
  );
}