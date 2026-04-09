import React from "react";
import "../styles/ClienteModalStyle.css"
import { isUsuarioComum } from "../services/usuarioService";


export default function ClienteModal({ cliente, onClose }) {
  if (!cliente) return null;

  const usuarioComum = isUsuarioComum();

  return (
    <div className="modal-overlay">

      <div className="modal-container-cliente">

        {/* BOTÃO FECHAR */}

        <div className="modal-header-cliente">
          <h2>Editar Cliente</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">

          {/* ================= INFORMAÇÕES ================= */}

          <h3>Informações</h3>

          <div className="modal-grid">

            <input placeholder="Apelido" />
            <input placeholder="Telefone" />
            <input placeholder="E-mail" />
            <input placeholder="CPF/CNPJ" />
            <input placeholder="IE" />
            <input placeholder="RG" />
            <input placeholder="Tipo Pessoa" />

          </div>

          {/* ================= ENDEREÇO ================= */}

          <h3>Endereço</h3>

          <div className="modal-grid">

            <input placeholder="Cidade" />
            <input placeholder="Estado" />
            <input placeholder="Bairro" />
            <input placeholder="Rua" />
            <input placeholder="Número" />
            <input placeholder="CEP" />

          </div>

          {/* ================= CONTA ================= */}

          <h3>Conta Bancária</h3>

          <div className="modal-grid">

            <input placeholder="Responsável" />
            <input placeholder="Documento" />
            <input placeholder="Chave Pix" />
            <input placeholder="Tipo Conta" />
            <input placeholder="Conta" />
            <input placeholder="Agência" />
            <input placeholder="Banco" />

          </div>

          {/* ================= TABELA ================= */}

          <h3>Tabela de Preço</h3>

          <div className="modal-grid">

            <input placeholder="Tabela" />
            <input placeholder="Gestor" />
            <input placeholder="Tabela semanal" />
            <input placeholder="Última venda" />
            <input placeholder="Status" />
            <input placeholder="Status Cadastro" />
            {!usuarioComum && <input placeholder="Rendimento" />}

          </div>

        </div>

        {/* BOTÃO SALVAR */}

        <div className="modal-footer">
          <button className="modal-save">
            Salvar edição
          </button>
        </div>

      </div>
    </div>
  );
}