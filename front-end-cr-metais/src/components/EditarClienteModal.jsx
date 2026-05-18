import React, { useState, useEffect } from "react";
import { buscarClientePorId, atualizarCliente } from "../services/clienteService";
import styles from "../styles/Clientes.module.css";
 
export default function EditarClienteModal({ isOpen, isClosing, onClose, clienteId, onSuccess }) {
  const [cnpj, setCnpj] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [telContato, setTelContato] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    if (isOpen && clienteId) {
      buscarClientePorId(clienteId)
        .then((data) => {
          setCnpj(data.cnpj || data.responsavel || "");
          setRazaoSocial(data.razaoSocial || "");
          setTelContato(data.telContato || data.tabelaPreco || "");
        })
        .catch(() => setErro("Erro ao carregar dados do cliente."));
    }
  }, [isOpen, clienteId]);
 
  async function handleSubmit() {
    setErro("");
    if (!razaoSocial.trim()) {
      setErro("Razão social é obrigatória.");
      return;
    }
 
    setLoading(true);
    try {
      await atualizarCliente(clienteId, {
        cnpj,
        razaoSocial,
        telContato,
      });
      onSuccess?.();
      handleClose();
    } catch {
      setErro("Erro ao atualizar cliente.");
    } finally {
      setLoading(false);
    }
  }
 
  function handleClose() {
    setCnpj("");
    setRazaoSocial("");
    setTelContato("");
    setErro("");
    onClose();
  }
 
  if (!isOpen) return null;
 
  return (
    <div className={`${styles.modalOverlay} ${isClosing ? styles.fadeOut : styles.fadeIn}`}>
      <div className={`${styles.modalBox} ${isClosing ? styles.slideOut : styles.slideIn}`}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitulo}>Editar Cliente</h2>
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
 
          {erro && <p className={styles.erroMsg}>{erro}</p>}
        </div>
 
        <div className={styles.modalFooter}>
          <button className={styles.btnCancelar} onClick={handleClose}>Cancelar</button>
          <button className={styles.btnSalvar} onClick={handleSubmit} disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}
 