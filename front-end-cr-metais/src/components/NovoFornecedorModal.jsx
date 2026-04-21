import React from "react";
import styles from "../styles/Clientes.module.css";
import CustomSelect from "./BoxSelects";

export default function NovoFornecedorModal({ isOpen, isClosing, onClose }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={`${styles.modal} ${isClosing ? styles.closing : ""}`}>
        <h2 className={styles.modalTitle}>✏️ Novo fornecedor ✏️</h2>

        <div className={styles.campos}>
          <span>Nome completo</span>
          <input className={styles.inputs} type="text" placeholder="Fulano de Tal" />
        </div>

        <div className={styles.campos}>
          <span>CPF ou CNPJ</span>
          <input className={styles.inputs} type="text" placeholder="123.456.789-00" />
        </div>

        <div className={styles.campos}>
          <span>Telefone para contato</span>
          <input className={styles.inputs} type="text" placeholder="(11) 99999-9999" />
        </div>

        <div className={styles.campos}>
          <span>Apelido</span>
          <input className={styles.inputs} type="text" placeholder="Fulano da Região Tal" />
        </div>

        <div className={styles.campos}>
          <span>Pessoa Física / Jurídica</span>
          <CustomSelect />
        </div>

        <button className={styles.btn_proxima_pagina} onClick={onClose}>
          Próxima página
        </button>

        <button className={styles.btn_fechar} onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}