import React, { useState, useEffect } from "react";
import styles from "../styles/Clientes.module.css";
import CustomSelect from "./BoxSelects";

const TOTAL_STEPS = 6;

export default function EditarFornecedorModal({ isOpen, isClosing, onClose, fornecedorId }) {
    const [step, setStep] = useState(1);
    const [cepLoading, setCepLoading] = useState(false);
    const [cepErro, setCepErro] = useState("");
    const [tabelasDisponiveis, setTabelasDisponiveis] = useState([]);
    const [loading, setLoading] = useState(false);

    const [idEndereco, setIdEndereco] = useState(null);
    const [idContaPagamento, setIdContaPagamento] = useState(null);

    const [dadosPessoais, setDadosPessoais] = useState({
        nomeCompleto: "", cpfCnpj: "", telefone: "", apelido: "", tipoPessoa: "",
    });

    const [endereco, setEndereco] = useState({
        cep: "", bairro: "", logradouro: "", numero: "", municipio: "", uf: "",
    });

    const [pagamento, setPagamento] = useState({
        tipoPagamento: "", pertenceCliente: "",
    });

    const [dadosPix, setDadosPix] = useState({ chavePix: "" });

    const [dadosBancarios, setDadosBancarios] = useState({
        banco: "", agencia: "", numeroConta: "", tipoConta: "",
    });

    const [responsavel, setResponsavel] = useState({
        nomeCompleto: "", cpfCnpj: "",
    });

    const [tabela, setTabela] = useState({
        idTabela: null, nomeTabela: "",
    });

    // ─── Carrega todos os dados ao abrir ───
    useEffect(() => {
        if (!isOpen || !fornecedorId) return;

        setLoading(true);
        setStep(1);

        Promise.all([
            fetch("http://localhost:8080/tabelas-precos").then((r) => r.json()),
            fetch(`http://localhost:8080/fornecedores/${fornecedorId}`).then((r) => r.json()),
            fetch("http://localhost:8080/contas-pagamentos").then((r) => r.ok ? r.json() : []),
        ])
            .then(([tabelasData, fornecedor, todasContas]) => {

                // Tabelas — pega apenas a versão mais recente de cada nome
                const tabelas = Array.isArray(tabelasData) ? tabelasData : [];
                const maisRecentes = Object.values(
                    tabelas.reduce((acc, t) => {
                        if (!acc[t.nomeTabela] || t.versao > acc[t.nomeTabela].versao) acc[t.nomeTabela] = t;
                        return acc;
                    }, {})
                );
                setTabelasDisponiveis(maisRecentes);

                // Dados pessoais
                setDadosPessoais({
                    nomeCompleto: fornecedor.nome ?? "",
                    cpfCnpj: fornecedor.documento ?? "",
                    telefone: fornecedor.telefone ?? "",
                    apelido: fornecedor.apelido ?? "",
                    tipoPessoa: fornecedor.tipoFornecedor ?? "",
                });

                // Endereço
                const end = fornecedor.endereco ?? {};
                setIdEndereco(end.idEndereco ?? null);
                setEndereco({
                    cep: end.cep ?? "",
                    bairro: end.bairro ?? "",
                    logradouro: end.logradouro ?? "",
                    numero: end.numero ?? "",
                    municipio: end.cidade ?? "",
                    uf: end.estado ?? "",
                });

                // Tabela de preço
                const tp = fornecedor.tabelaPreco;
                if (tp) {
                    setTabela({ idTabela: tp.idTabela, nomeTabela: tp.nomeTabela });
                }

                // Conta de pagamento — filtra pelo fornecedor
                const contas = Array.isArray(todasContas) ? todasContas : [];
                const conta = contas.find(
                    (c) => c.fornecedor?.idFornecedor === fornecedorId && c.contaAtiva
                );

                if (conta) {
                    setIdContaPagamento(conta.idContaPagamento);

                    const isPix = conta.pix;
                    setPagamento({
                        tipoPagamento: isPix ? "Pix" : "Conta Bancária",
                        pertenceCliente: conta.pertenceFornecedor ? "Sim" : "Não",
                    });

                    if (isPix) {
                        setDadosPix({ chavePix: conta.chavePix ?? "" });
                    } else {
                        const tipoContaReverso = { C: "Conta Corrente", P: "Conta Poupança" };
                        setDadosBancarios({
                            banco: conta.banco ?? "",
                            agencia: conta.agencia ?? "",
                            numeroConta: conta.conta ?? "",
                            tipoConta: tipoContaReverso[conta.tipoConta] ?? "",
                        });
                    }

                    setResponsavel({
                        nomeCompleto: conta.nome ?? "",
                        cpfCnpj: conta.documento ?? "",
                    });
                }
            })
            .catch((err) => {
                console.error(err);
                alert("Erro ao carregar dados do fornecedor.");
            })
            .finally(() => setLoading(false));

    }, [isOpen, fornecedorId]);

    if (!isOpen) return null;

    const buscarCep = async (cep) => {
        const cepLimpo = cep.replace(/\D/g, "");
        if (cepLimpo.length !== 8) return;
        setCepLoading(true);
        setCepErro("");
        try {
            const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
            const data = await res.json();
            if (data.erro) { setCepErro("CEP não encontrado. Verifique e tente novamente."); return; }
            setEndereco((prev) => ({
                ...prev,
                bairro: data.bairro || "",
                logradouro: data.logradouro || "",
                municipio: data.localidade || "",
                uf: data.uf || "",
            }));
        } catch {
            setCepErro("Erro ao buscar CEP. Verifique sua conexão.");
        } finally {
            setCepLoading(false);
        }
    };

    const handleNext = () => {
        if (step === 1) {
            if (!dadosPessoais.nomeCompleto || !dadosPessoais.cpfCnpj || !dadosPessoais.telefone || !dadosPessoais.tipoPessoa) {
                alert("Preencha todos os campos obrigatórios antes de continuar.");
                return;
            }
        }
        if (step === 2) {
            if (!endereco.cep || !endereco.bairro || !endereco.logradouro || !endereco.numero || !endereco.municipio || !endereco.uf) {
                alert("Preencha todos os campos de endereço, incluindo o número.");
                return;
            }
        }
        if (step === 3 && !pagamento.tipoPagamento) {
            alert("Selecione um tipo de pagamento.");
            return;
        }
        setStep((s) => Math.min(s + 1, TOTAL_STEPS));
    };

    const handleBack = () => setStep((s) => Math.max(s - 1, 1));

    const handleFinish = async () => {
        try {
            // 1. Atualiza endereço
            const enderecoPayload = {
                estado: endereco.uf,
                cidade: endereco.municipio,
                cep: endereco.cep.replace(/\D/g, ""),
                logradouro: endereco.logradouro,
                complemento: null,
                bairro: endereco.bairro,
                numero: endereco.numero,
            };

            const resEndereco = await fetch(`http://localhost:8080/enderecos/${idEndereco}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(enderecoPayload),
            });
            if (!resEndereco.ok) throw new Error("Erro ao atualizar endereço");

            // 2. Atualiza fornecedor
            const fornecedorPayload = {
                nome: dadosPessoais.nomeCompleto,
                documento: dadosPessoais.cpfCnpj.replace(/\D/g, ""),
                tipoFornecedor: dadosPessoais.tipoPessoa,
                telefone: dadosPessoais.telefone.replace(/\D/g, ""),
                apelido: dadosPessoais.apelido,
                tabelaPreco: tabela.idTabela ? { idTabela: tabela.idTabela } : null,
            };

            const resFornecedor = await fetch(`http://localhost:8080/fornecedores/${fornecedorId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(fornecedorPayload),
            });
            if (!resFornecedor.ok) throw new Error("Erro ao atualizar fornecedor");

            // 3. Atualiza conta de pagamento
            const isPix = pagamento.tipoPagamento === "Pix";
            const tipoContaMap = { "Conta Corrente": "C", "Conta Poupança": "P" };

            const contaPayload = {
                pix: isPix,
                pertenceFornecedor: pagamento.pertenceCliente === "Sim",
                contaAtiva: true,
                idFornecedor: fornecedorId,
                nome: responsavel.nomeCompleto || null,
                documento: responsavel.cpfCnpj ? responsavel.cpfCnpj.replace(/\D/g, "") : null,
                chavePix: isPix ? dadosPix.chavePix : null,
                banco: !isPix ? dadosBancarios.banco : null,
                agencia: !isPix ? dadosBancarios.agencia : null,
                conta: !isPix ? dadosBancarios.numeroConta : null,
                tipoConta: !isPix ? tipoContaMap[dadosBancarios.tipoConta] : null,
            };

            const contaUrl = idContaPagamento
                ? `http://localhost:8080/contas-pagamentos/${idContaPagamento}`
                : `http://localhost:8080/contas-pagamentos`;

            const contaMethod = idContaPagamento ? "PUT" : "POST";

            const resConta = await fetch(contaUrl, {
                method: contaMethod,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(contaPayload),
            });
            if (!resConta.ok) throw new Error("Erro ao atualizar conta de pagamento");

            onClose();
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    if (loading) {
        return (
            <div className={styles.modalOverlay}>
                <div className={`${styles.modal} ${isClosing ? styles.closing : ""}`}>
                    <p style={{ textAlign: "center", padding: "2rem" }}>Carregando dados...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={`${styles.modal} ${isClosing ? styles.closing : ""}`}>

                {/* ETAPA 1 — Dados pessoais */}
                {step === 1 && (
                    <>
                        <h2 className={styles.modalTitle}>✏️ Editar fornecedor ✏️</h2>

                        <div className={styles.campos}>
                            <span>Nome completo</span>
                            <input className={styles.inputs} type="text" value={dadosPessoais.nomeCompleto}
                                onChange={(e) => setDadosPessoais({ ...dadosPessoais, nomeCompleto: e.target.value })} />
                        </div>
                        <div className={styles.campos}>
                            <span>CPF ou CNPJ</span>
                            <input className={styles.inputs} type="text" value={dadosPessoais.cpfCnpj}
                                onChange={(e) => setDadosPessoais({ ...dadosPessoais, cpfCnpj: e.target.value })} />
                        </div>
                        <div className={styles.campos}>
                            <span>Telefone para contato</span>
                            <input className={styles.inputs} type="text" value={dadosPessoais.telefone}
                                onChange={(e) => setDadosPessoais({ ...dadosPessoais, telefone: e.target.value })} />
                        </div>
                        <div className={styles.campos}>
                            <span>Apelido</span>
                            <input className={styles.inputs} type="text" value={dadosPessoais.apelido}
                                onChange={(e) => setDadosPessoais({ ...dadosPessoais, apelido: e.target.value })} />
                        </div>
                        <div className={styles.campos}>
                            <span>Pessoa Física / Jurídica</span>
                            <CustomSelect options={["PESSOA_FISICA", "PESSOA_JURIDICA"]} value={dadosPessoais.tipoPessoa}
                                onChange={(val) => setDadosPessoais({ ...dadosPessoais, tipoPessoa: val })} />
                        </div>

                        <button className={styles.btn_proxima_pagina} onClick={handleNext}>Próxima página</button>
                        <button className={styles.btn_fechar} onClick={onClose}>Fechar</button>
                    </>
                )}

                {/* ETAPA 2 — Endereço */}
                {step === 2 && (
                    <>
                        <h2 className={styles.modalTitle}>✏️ Editar fornecedor ✏️</h2>

                        <div className={styles.campos}>
                            <span>CEP</span>
                            <input className={styles.inputs} type="text" value={endereco.cep}
                                onChange={(e) => { setEndereco({ ...endereco, cep: e.target.value }); setCepErro(""); }}
                                onBlur={(e) => buscarCep(e.target.value)} />
                            {cepLoading && <span style={{ fontSize: "0.8rem", color: "#888" }}>Buscando CEP...</span>}
                            {cepErro && <span style={{ fontSize: "0.8rem", color: "red" }}>{cepErro}</span>}
                        </div>
                        <div className={styles.campos}>
                            <span>Bairro</span>
                            <input className={styles.inputs} type="text" value={endereco.bairro}
                                onChange={(e) => setEndereco({ ...endereco, bairro: e.target.value })} />
                        </div>
                        <div className={styles.campos}>
                            <span>Logradouro</span>
                            <input className={styles.inputs} type="text" value={endereco.logradouro}
                                onChange={(e) => setEndereco({ ...endereco, logradouro: e.target.value })} />
                        </div>
                        <div className={styles.campos}>
                            <span>Número</span>
                            <input className={styles.inputs} type="text" value={endereco.numero}
                                onChange={(e) => setEndereco({ ...endereco, numero: e.target.value })} />
                        </div>
                        <div className={styles.campos}>
                            <span>Município</span>
                            <input className={styles.inputs} type="text" value={endereco.municipio}
                                onChange={(e) => setEndereco({ ...endereco, municipio: e.target.value })} />
                        </div>
                        <div className={styles.campos}>
                            <span>UF</span>
                            <input className={styles.inputs} type="text" maxLength={2} value={endereco.uf}
                                onChange={(e) => setEndereco({ ...endereco, uf: e.target.value.toUpperCase() })} />
                        </div>

                        <button className={styles.btn_proxima_pagina} onClick={handleNext}>Próxima página</button>
                        <button className={styles.btn_fechar} onClick={handleBack}>Voltar</button>
                    </>
                )}

                {/* ETAPA 3 — Pagamento */}
                {step === 3 && (
                    <>
                        <h2 className={styles.modalTitle}>✏️ Editar fornecedor ✏️</h2>

                        <div className={styles.campos}>
                            <span>Tipo de pagamento</span>
                            <CustomSelect placeholder="Pix ou Conta Bancária" options={["Pix", "Conta Bancária"]}
                                value={pagamento.tipoPagamento}
                                onChange={(val) => setPagamento({ ...pagamento, tipoPagamento: val })} />
                        </div>
                        <div className={styles.campos}>
                            <span>Pertence ao fornecedor</span>
                            <CustomSelect placeholder="Sim ou Não" options={["Sim", "Não"]}
                                value={pagamento.pertenceCliente}
                                onChange={(val) => setPagamento({ ...pagamento, pertenceCliente: val })} />
                        </div>

                        <button className={styles.btn_proxima_pagina} onClick={handleNext}>Próxima página</button>
                        <button className={styles.btn_fechar} onClick={handleBack}>Voltar</button>
                    </>
                )}

                {/* ETAPA 4 — Pix */}
                {step === 4 && pagamento.tipoPagamento === "Pix" && (
                    <>
                        <h2 className={styles.modalTitle}>✏️ Editar fornecedor ✏️</h2>

                        <div className={styles.campos}>
                            <span>Chave Pix</span>
                            <input className={styles.inputs} type="text" value={dadosPix.chavePix}
                                onChange={(e) => setDadosPix({ chavePix: e.target.value })} />
                        </div>

                        <button className={styles.btn_proxima_pagina} onClick={handleNext}>Próxima página</button>
                        <button className={styles.btn_fechar} onClick={handleBack}>Voltar</button>
                    </>
                )}

                {/* ETAPA 4 — Conta Bancária */}
                {step === 4 && pagamento.tipoPagamento === "Conta Bancária" && (
                    <>
                        <h2 className={styles.modalTitle}>✏️ Editar fornecedor ✏️</h2>

                        <div className={styles.campos}>
                            <span>Banco</span>
                            <input className={styles.inputs} type="text" value={dadosBancarios.banco}
                                onChange={(e) => setDadosBancarios({ ...dadosBancarios, banco: e.target.value })} />
                        </div>
                        <div className={styles.campos}>
                            <span>Agência</span>
                            <input className={styles.inputs} type="text" value={dadosBancarios.agencia}
                                onChange={(e) => setDadosBancarios({ ...dadosBancarios, agencia: e.target.value })} />
                        </div>
                        <div className={styles.campos}>
                            <span>Número da conta</span>
                            <input className={styles.inputs} type="text" value={dadosBancarios.numeroConta}
                                onChange={(e) => setDadosBancarios({ ...dadosBancarios, numeroConta: e.target.value })} />
                        </div>
                        <div className={styles.campos}>
                            <span>Tipo de conta</span>
                            <CustomSelect placeholder="Corrente ou Poupança" options={["Conta Corrente", "Conta Poupança"]}
                                value={dadosBancarios.tipoConta}
                                onChange={(val) => setDadosBancarios({ ...dadosBancarios, tipoConta: val })} />
                        </div>

                        <button className={styles.btn_proxima_pagina} onClick={handleNext}>Próxima página</button>
                        <button className={styles.btn_fechar} onClick={handleBack}>Voltar</button>
                    </>
                )}

                {/* ETAPA 5 — Responsável */}
                {step === 5 && (
                    <>
                        <h2 className={styles.modalTitle}>✏️ Editar fornecedor ✏️</h2>

                        <div className={styles.campos}>
                            <span>Nome completo</span>
                            <input className={styles.inputs} type="text" value={responsavel.nomeCompleto}
                                onChange={(e) => setResponsavel({ ...responsavel, nomeCompleto: e.target.value })} />
                        </div>
                        <div className={styles.campos}>
                            <span>CPF / CNPJ</span>
                            <input className={styles.inputs} type="text" value={responsavel.cpfCnpj}
                                onChange={(e) => setResponsavel({ ...responsavel, cpfCnpj: e.target.value })} />
                        </div>

                        <button className={styles.btn_proxima_pagina} onClick={handleNext}>Próxima página</button>
                        <button className={styles.btn_fechar} onClick={handleBack}>Voltar</button>
                    </>
                )}

                {/* ETAPA 6 — Tabela */}
                {step === 6 && (
                    <>
                        <h2 className={styles.modalTitle}>✏️ Editar fornecedor ✏️</h2>

                        <div className={styles.campos}>
                            <span>Tabela de preço</span>
                            <CustomSelect placeholder="Selecione a tabela" options={tabelasDisponiveis.map((t) => t.nomeTabela)}
                                value={tabela.nomeTabela}
                                onChange={(nomeTabela) => {
                                    const selecionada = tabelasDisponiveis.find((t) => t.nomeTabela === nomeTabela);
                                    setTabela({ nomeTabela, idTabela: selecionada?.idTabela });
                                }} />
                        </div>

                        <button className={styles.btn_proxima_pagina} onClick={handleFinish}>Salvar alterações</button>
                        <button className={styles.btn_fechar} onClick={handleBack}>Voltar</button>
                    </>
                )}

            </div>
        </div>
    );
}