import React, { useState } from "react";
import "../styles/CadastroClienteStyle.css";
import CadastroClienteContainer from "./CadastroCliente";
import { useEffect } from "react";
import ClienteModal from "./ClienteModal";


/* ================= MOCK ================= */

const CLIENTES_MOCK = [
  {
    id: 1,
    nome: "João Silva",
    responsavel: "joao@empresa.com",
    tabela: "VITAL",
  },
  {
    id: 2,
    nome: "Maria Oliveira",
    responsavel: "maria@empresa.com",
    tabela: "VITAL",
  },
  {
    id: 3,
    nome: "Carlos Souza",
    responsavel: "carlos@empresa.com",
    tabela: "VITAL",
  },
  {
    id: 4,
    nome: "Ana Pereira",
    responsavel: "ana@empresa.com",
    tabela: "VITAL",
  },
  {
    id: 5,
    nome: "Pedro Santos",
    responsavel: "pedro@empresa.com",
    tabela: "VITAL",
  },
  {
    id: 6,
    nome: "Fernanda Lima",
    responsavel: "fernanda@empresa.com",
    tabela: "VITAL",
  },
  {
    id: 7,
    nome: "Lucas Almeida",
    responsavel: "lucas@empresa.com",
    tabela: "VITAL",
  },
  {
    id: 8,
    nome: "Juliana Costa",
    responsavel: "juliana@empresa.com",
    tabela: "VITAL",
  },
  {
    id: 9,
    nome: "Ricardo Ferreira",
    responsavel: "ricardo@empresa.com",
    tabela: "VITAL",
  },
  {
    id: 10,
    nome: "Patricia Gomes",
    responsavel: "patricia@empresa.com",
    tabela: "VITAL",
  },
  {
    id: 11,
    nome: "Rafael Martins",
    responsavel: "rafael@empresa.com",
    tabela: "VITAL",
  },
  {
    id: 12,
    nome: "Camila Rocha",
    responsavel: "camila@empresa.com",
    tabela: "VITAL",
  },
  {
    id: 13,
    nome: "Bruno Ribeiro",
    responsavel: "bruno@empresa.com",
    tabela: "VITAL",
  },
  {
    id: 14,
    nome: "Aline Carvalho",
    responsavel: "aline@empresa.com",
    tabela: "VITAL",
  },
  {
    id: 15,
    nome: "Diego Mendes",
    responsavel: "diego@empresa.com",
    tabela: "VITAL",
  },
];



/* ================= COMPONENTE ================= */

export default function ListaClientes() {
  const [clientes] = useState(CLIENTES_MOCK);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    document.title = "CR Metais | Clientes"
  })

  function abrirModal(cliente) {
    setClienteSelecionado(cliente);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
  }

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
            <div
              key={cliente.id}
              className="colaborador-line"
              onClick={() => abrirModal(cliente)}
              style={{ cursor: "pointer" }}
            >

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

      {modalAberto && (
        <ClienteModal
          cliente={clienteSelecionado}
          onClose={fecharModal}
        />
      )}
    </div>
  );
}