import React, { useState } from "react";
import "../styles/CadastroClienteStyle.css";
import CadastroClienteContainer from "./CadastroCliente";

/* ================= MOCK ================= */

const CLIENTES_MOCK = [
  {
    id: 1,
    nome: "João Silva",
    responsavel: "joao@email.com",
    tabela: "Varejo",
  },
  {
    id: 2,
    nome: "Empresa ABC",
    responsavel: "contato@abc.com",
    tabela: "Atacado",
  },
    {
    id: 2,
    nome: "Empresa ABC",
    responsavel: "contato@abc.com",
    tabela: "Atacado",
  },
    {
    id: 2,
    nome: "Empresa ABC",
    responsavel: "contato@abc.com",
    tabela: "Atacado",
  },
    {
    id: 2,
    nome: "Empresa ABC",
    responsavel: "contato@abc.com",
    tabela: "Atacado",
  },
    {
    id: 2,
    nome: "Empresa ABC",
    responsavel: "contato@abc.com",
    tabela: "Atacado",
  },
    {
    id: 2,
    nome: "Empresa ABC",
    responsavel: "contato@abc.com",
    tabela: "Atacado",
  },  {
    id: 2,
    nome: "Empresa ABC",
    responsavel: "contato@abc.com",
    tabela: "Atacado",
  },  {
    id: 2,
    nome: "Empresa ABC",
    responsavel: "contato@abc.com",
    tabela: "Atacado",
  },  {
    id: 2,
    nome: "Empresa ABC",
    responsavel: "contato@abc.com",
    tabela: "Atacado",
  },  {
    id: 2,
    nome: "Empresa ABC",
    responsavel: "contato@abc.com",
    tabela: "Atacado",
  },  {
    id: 2,
    nome: "Empresa ABC",
    responsavel: "contato@abc.com",
    tabela: "Atacado",
  },  {
    id: 2,
    nome: "Empresa ABC",
    responsavel: "contato@abc.com",
    tabela: "Atacado",
  },  {
    id: 2,
    nome: "Empresa ABC",
    responsavel: "contato@abc.com",
    tabela: "Atacado",
  },  {
    id: 2,
    nome: "Empresa ABC",
    responsavel: "contato@abc.com",
    tabela: "Atacado",
  },  {
    id: 2,
    nome: "Empresa ABC",
    responsavel: "contato@abc.com",
    tabela: "Atacado",
  },  {
    id: 2,
    nome: "Empresa ABC",
    responsavel: "contato@abc.com",
    tabela: "Atacado",
  },
];

/* ================= COMPONENTE ================= */

export default function ListaClientes() {
  const [clientes] = useState(CLIENTES_MOCK);

  return (
    <div className="lista-colaboradores-container">

      <h1>Clientes</h1>

      <div className="containerInfos"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 400px",
          gap: "40px",
          alignItems: "start",
        }}
      >

        {/* TABELA ESQUERDA */}

        <div className="lista-colaboradores-grid">

          {/* HEADER */}

          <div className="colaborador-header">
            <span className="colaborador-id">ID</span>
            <span className="colaborador-nome">Nome</span>
            <span className="colaborador-email">Responsável</span>
            <span className="colaborador-email">Tabela</span>
          </div>

          {/* LISTA */}

          {clientes.map((cliente) => (
            <div key={cliente.id} className="colaborador-line">

              <div className="colaborador-item">
                <span className="colaborador-id">{cliente.id}</span>
                <span className="colaborador-nome">{cliente.nome}</span>
                <span className="colaborador-email">{cliente.responsavel}</span>
                <span className="colaborador-email">{cliente.tabela}</span>
              </div>

              <div className="divisao"></div>

            </div>
          ))}

        </div>

        {/* LADO DIREITO */}

        <CadastroClienteContainer />

      </div>
    </div>
  );
}