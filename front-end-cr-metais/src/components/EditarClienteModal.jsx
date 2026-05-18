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
          // Buscando estritamente as propriedades correspondentes
          setCnpj(data.cnpj || "");
          setRazaoSocial(data.razaoSocial || "");
          setTelContato(data.telContato || "");
        })
        .catch(() => setErro("Erro ao carregar dados do cliente."));
    }
  }, [isOpen, clienteId]);

  // Função simples para limpar pontuações se o seu banco salvar apenas números
  function apenasNumeros(valor) {
    return valor.replace(/\D/g, "");
  }

  async function handleSubmit() {
    setErro("");
    
    if (!razaoSocial.trim()) {
      setErro("Razão social é obrigatória.");
      return;
    }

    if (!cnpj.trim()) {
      setErro("CNPJ é obrigatório.");
      return;
    }

    setLoading(true);
    try {
      await atualizarCliente(clienteId, {
        // Use apenasNumeros(cnpj) caso seu back-end espere apenas os 14 dígitos limpos
        cnpj: cnpj.trim(), 
        razaoSocial: razaoSocial.trim(),
        telContato: telContato.trim(),
      });
      
      onSuccess?.();
      handleClose();
    } catch (error) {
      // Captura a mensagem real enviada pelo Spring Boot (se houver)
      const mensagemServidor = error.response?.data?.message || error.response?.data[0]?.interpolatedMessage;
      setErro(mensagemServidor || "Erro ao atualizar cliente. Verifique os dados.");
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
          <label className={styles.label}>Razão Social</label>
          <input
            className={styles.input}
            placeholder="Nome da empresa"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
          />

          <label className={styles.label}>CNPJ</label>
          <input
            className={styles.input}
            placeholder="00.000.000/0000-00"
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