import React, { useState } from "react";
import "../styles/CadastroClienteStyle.css";
import styles from "../styles/Clientes.module.css";
import { API_URL } from "../services/apiClient";
import CadastroClienteContainer from "./CadastroCliente";
import { useEffect } from "react";
import ClienteModal from "./ClienteModal";
import { listarClientes } from "../services/clienteService";
import CustomSelect from "./BoxSelects";
import { deleteUser } from "../services/clienteService";
import NovoFornecedorModal from "./NovoFornecedorModal";
import EditarFornecedorModal from "./EditarFornecedorModal";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';




export default function ListaClientes() {
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditClosing, setIsEditClosing] = useState(false);
  const [fornecedorEditandoId, setFornecedorEditandoId] = useState(null);

  useEffect(() => {
    document.title = "CR Metais | Fornecedores";
  });

  function abrirModal(cliente) {
    setClienteSelecionado(cliente);
    setModalAberto(true);
  }

  function abrirEdicao(id) {
    setFornecedorEditandoId(id);
    setIsEditModalOpen(true);
  }

  function fecharEdicao() {
    setIsEditClosing(true);
    setTimeout(() => {
      setIsEditModalOpen(false);
      setIsEditClosing(false);
      setFornecedorEditandoId(null);
    }, 300);
  }

  async function excluirCliente(id) {
    const confirmado = window.confirm("Tem certeza que deseja excluir este fornecedor?");
    if (!confirmado) return;

    try {
      const res = await fetch(`${API_URL}/fornecedores/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Erro ao excluir fornecedor");

      setClientes((prev) => prev.filter((c) => c.idFornecedor !== id));
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir fornecedor. Tente novamente.");
    }
  }

  function fecharModal() {
    setModalAberto(false);
  }

  const carregarClientes = async () => {
    try {
      const data = await listarClientes();
      setClientes(data || []);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  const ClientesHeader = () => {
    return (
      <div className={styles.clientesHeader}>
        <span className={styles.clienteId}>ID</span>
        <span className={styles.clienteNome}>Nome</span>
        <span className={styles.clienteResponsavel}>Responsável</span>
        <span className={styles.clienteTabela}>Tabela</span>
        <span className={styles.clienteTabela}>Ações</span>
      </div>
    );
  };

  const ClienteItem = ({ cliente, isEven }) => {
    return (
      <div
        className={`${styles.clienteLine} ${isEven ? styles.linhaPar : styles.linhaImpar}`}
      >
        <div className={styles.clienteItem}>
          <span className={styles.clienteId}>
            {cliente?.idFornecedor}
          </span>

          <span className={styles.clienteNome}>
            {cliente?.nome}
          </span>

          <span className={styles.clienteResponsavel}>
            {cliente.responsavel?.nome || "-"}
          </span>

          <span className={styles.clienteTabela}>
            {cliente.tabelaPreco?.nomeTabela || "-"}
          </span>

          {/* <div className={styles.clienteEdicao}>
            <div className={styles.editar} onClick={() => abrirEdicao(cliente.idFornecedor)}>
              🖋️
            </div>
            <div className={styles.excluir} onClick={() => excluirCliente(cliente.idFornecedor)}>
              🗑️
            </div>
          </div> */}

          <div className={styles.clienteEdicao}>
            <Tippy content="Clique aqui para exluir o usuário" theme="light">
              <span
                className={`${styles.acao} ${styles.editar}`}
                onClick={() => abrirEdicao(cliente.idFornecedor)}
              >
                {/* <span>🖋️</span> */}

                <div>
                  <FaTrashAlt className={styles.trashAlt} />
                </div>

                {/* <span className={styles.label}>Editar</span> */}
              </span>
            </Tippy>

            <Tippy content="Clique aqui para editar o usuário" theme="light">
              <span
                className={`${styles.acao} ${styles.excluir}`}
                onClick={() => excluirCliente(cliente.idFornecedor)}
              >
                {/* <span>🗑️</span> */}
                <div>
                  <FaEdit className={styles.editIcon} />
                </div>
                {/* <span className={styles.label}>Excluir</span> */}
              </span>
            </Tippy>
          </div>
        </div>

        <div className={styles.divisao}></div>
      </div>
    );
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [filtroNome, setFiltroNome] = useState("");

  const fornecedoresFiltrados = clientes.filter((cliente) =>
    cliente.nome?.toLowerCase().includes(filtroNome.toLowerCase())
  );

  const handleClose = () => {
    setIsClosing(true);

    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
    }, 300);
  };

  return (
    <div className={styles.listaClientesContainer}>

      <div className={styles.cabecalho}>
        <div className={styles.titulos}>
          <span className={styles.titulo}>Fornecedores</span>
          <span className={styles.subtitulo}>
            Veja aqui todos os fornecedores cadastrados e clique para cadastrar, editar ou excluir um fornecedor existente.
          </span>
        </div>

        <div className={styles.cabecalhoAcoes}>
          <input
            type="text"
            className={styles.searchInput}
            value={filtroNome}
            onChange={(e) => setFiltroNome(e.target.value)}
            placeholder="Pesquisar por nome"
          />
          <button onClick={() => setIsModalOpen(true)}>
            Cadastrar fornecedor
          </button>
        </div>

        <NovoFornecedorModal
          isOpen={isModalOpen}
          isClosing={isClosing}
          onClose={handleClose}
          onSuccess={carregarClientes}
        />

        <EditarFornecedorModal
          isOpen={isEditModalOpen}
          isClosing={isEditClosing}
          onClose={fecharEdicao}
          fornecedorId={fornecedorEditandoId}
          onSuccess={carregarClientes} // ✅ chama carregarClientes após salvar
        />
      </div>

      <div className={styles.containerInfos}>

        {/* TABELA ESQUERDA */}
        <div className={styles.listaClientesGrid}>
          <ClientesHeader />

          <div className={styles.clientesLista}>
            {fornecedoresFiltrados.length === 0 ? (
              <p>Nenhum cliente encontrado</p>
            ) : (
              fornecedoresFiltrados.map((cliente, index) => (
                <ClienteItem
                  key={cliente.idFornecedor}
                  cliente={cliente}
                  isEven={index % 2 === 0}
                />
              ))
            )}
          </div>
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