import React, { useState, useEffect } from "react";
import { cadastrarCliente } from "../services/clienteService";
import { API_URL } from "../services/apiClient";
import styles from "../styles/Clientes.module.css";
 
export default function NovoClienteModal({ isOpen, isClosing, onClose, onSuccess }) {
  const [cnpj, setCnpj] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [telContato, setTelContato] = useState("");
  const [idEndereco, setIdEndereco] = useState("");
  const [idTabelaPreco, setIdTabelaPreco] = useState("");
  const [tabelas, setTabelas] = useState([]);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_URL}/tabelas-preco`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => setTabelas(data || []))
      .catch(() => {});
  }, []);
 
  async function handleSubmit() {
    setErro("");
 
    if (!cnpj || cnpj.replace(/\D/g, "").length < 14) {
      setErro("Informe um CNPJ válido (14 dígitos).");
      return;
    }
    if (!razaoSocial.trim()) {
      setErro("Razão social é obrigatória.");
      return;
    }
    if (!telContato || telContato.replace(/\D/g, "").length < 10) {
      setErro("Telefone deve ter ao menos 10 dígitos.");
      return;
    }
    if (!idEndereco) {
      setErro("Informe o ID do endereço.");
      return;
    }
    if (!idTabelaPreco) {
      setErro("Selecione uma tabela de preço.");
      return;
    }
 
    setLoading(true);
    try {
      await cadastrarCliente({
        cnpj: cnpj.replace(/\D/g, ""),
        razaoSocial,
        telContato: telContato.replace(/\D/g, ""),
        idEndereco: Number(idEndereco),
        idTabelaPreco: Number(idTabelaPreco),
      });
      onSuccess?.();
      handleClose();
    } catch (err) {
      setErro("Erro ao cadastrar cliente. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  }
 
  function handleClose() {
    setCnpj("");
    setRazaoSocial("");
    setTelContato("");
    setIdEndereco("");
    setIdTabelaPreco("");
    setErro("");
    onClose();
  }
 
  if (!isOpen) return null;
 
  return (
    <div className={`${styles.modalOverlay} ${isClosing ? styles.fadeOut : styles.fadeIn}`}>
      <div className={`${styles.modalBox} ${isClosing ? styles.slideOut : styles.slideIn}`}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitulo}>Cadastrar Cliente</h2>
          <button className={styles.modalFechar} onClick={handleClose}>✕</button>
        </div>
 
        <div className={styles.modalBody}>
          <label className={styles.label}>CNPJ</label>
          <input
            className={styles.input}
            placeholder="00.000.000/0000-00"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
          />
 
          <label className={styles.label}>Razão Social</label>
          <input
            className={styles.input}
            placeholder="Nome da empresa"
            value={razaoSocial}
            onChange={(e) => setRazaoSocial(e.target.value)}
          />
 
          <label className={styles.label}>Telefone de Contato</label>
          <input
            className={styles.input}
            placeholder="(11) 99999-9999"
            value={telContato}
            onChange={(e) => setTelContato(e.target.value)}
          />
 
          <label className={styles.label}>ID do Endereço</label>
          <input
            className={styles.input}
            placeholder="Ex: 1"
            type="number"
            value={idEndereco}
            onChange={(e) => setIdEndereco(e.target.value)}
          />
 
          <label className={styles.label}>Tabela de Preço</label>
          {tabelas.length > 0 ? (
            <select
              className={styles.input}
              value={idTabelaPreco}
              onChange={(e) => setIdTabelaPreco(e.target.value)}
            >
              <option value="">Selecione...</option>
              {tabelas.map((t) => (
                <option key={t.idTabelaPreco} value={t.idTabelaPreco}>
                  {t.nomeTabela}
                </option>
              ))}
            </select>
          ) : (
            <input
              className={styles.input}
              placeholder="ID da tabela de preço"
              type="number"
              value={idTabelaPreco}
              onChange={(e) => setIdTabelaPreco(e.target.value)}
            />
          )}
 
          {erro && <p className={styles.erroMsg}>{erro}</p>}
        </div>
 
        <div className={styles.modalFooter}>
          <button className={styles.btnCancelar} onClick={handleClose}>
            Cancelar
          </button>
          <button className={styles.btnSalvar} onClick={handleSubmit} disabled={loading}>
            {loading ? "Salvando..." : "Cadastrar"}
          </button>
        </div>
      </div>
    </div>
  );
}