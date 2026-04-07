import React, { useState } from "react";
import "../styles/CadastroClienteStyle.css";
import styles from "../styles/Clientes.module.css";
import CadastroClienteContainer from "./CadastroCliente";
import { useEffect } from "react";
import ClienteModal from "./ClienteModal";
import { listarClientes } from "../services/clienteService";
import Swal from "sweetalert2";


/* ================= MOCK ================= */

// const CLIENTES_MOCK = [
//   {
//     id: 1,
//     nome: "João Silva",
//     responsavel: "joao@empresa.com",
//     tabela: "VITAL",
//   },
//   {
//     id: 2,
//     nome: "Maria Oliveira",
//     responsavel: "maria@empresa.com",
//     tabela: "VITAL",
//   },
//   {
//     id: 3,
//     nome: "Carlos Souza",
//     responsavel: "carlos@empresa.com",
//     tabela: "VITAL",
//   },
//   {
//     id: 4,
//     nome: "Ana Pereira",
//     responsavel: "ana@empresa.com",
//     tabela: "VITAL",
//   },
//   {
//     id: 5,
//     nome: "Pedro Santos",
//     responsavel: "pedro@empresa.com",
//     tabela: "VITAL",
//   },
//   {
//     id: 6,
//     nome: "Fernanda Lima",
//     responsavel: "fernanda@empresa.com",
//     tabela: "VITAL",
//   },
//   {
//     id: 7,
//     nome: "Lucas Almeida",
//     responsavel: "lucas@empresa.com",
//     tabela: "VITAL",
//   },
//   {
//     id: 8,
//     nome: "Juliana Costa",
//     responsavel: "juliana@empresa.com",
//     tabela: "VITAL",
//   },
//   {
//     id: 9,
//     nome: "Ricardo Ferreira",
//     responsavel: "ricardo@empresa.com",
//     tabela: "VITAL",
//   },
//   {
//     id: 10,
//     nome: "Patricia Gomes",
//     responsavel: "patricia@empresa.com",
//     tabela: "VITAL",
//   },
//   {
//     id: 11,
//     nome: "Rafael Martins",
//     responsavel: "rafael@empresa.com",
//     tabela: "VITAL",
//   },
//   {
//     id: 12,
//     nome: "Camila Rocha",
//     responsavel: "camila@empresa.com",
//     tabela: "VITAL",
//   },
//   {
//     id: 13,
//     nome: "Bruno Ribeiro",
//     responsavel: "bruno@empresa.com",
//     tabela: "VITAL",
//   },
//   {
//     id: 14,
//     nome: "Aline Carvalho",
//     responsavel: "aline@empresa.com",
//     tabela: "VITAL",
//   },
//   {
//     id: 15,
//     nome: "Diego Mendes",
//     responsavel: "diego@empresa.com",
//     tabela: "VITAL",
//   },
// ];



/* ================= COMPONENTE ================= */

export default function ListaClientes() {
  const [clientes, setClientes] = useState([]);
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

  useEffect(() => {
    const carregarClientes = async () => {
      try {
        const data = await listarClientes();
        console.log("CLIENTES:", data); // debug
        setClientes(data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };

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
        className={`${styles.clienteLine} ${isEven ? styles.linhaPar : styles.linhaImpar
          }`}
        onClick={() => abrirModal(cliente)}
      >
        <div className={styles.clienteItem}>
          <span className={styles.clienteId}>
            {cliente.idCliente}
          </span>

          <span className={styles.clienteNome}>
            {cliente.razaoSocial}
          </span>

          <span className={styles.clienteResponsavel}>
            {cliente.telContato || "-"}
          </span>

          <span className={styles.clienteTabela}>
            {cliente.tabelaPreco || "-"}
          </span>

          <div className={styles.clienteEdicao}>
            <div className={styles.editar}>
              <img src="../src/styles/img/icon-edit.png" alt="Editar" />
              <span className={styles.tooltip}>Editar</span>

            </div>
            <div className={styles.excluir}>
              <img src="../src/styles/img/icon-lixeira.png" alt="Excluir" />
              <span className={styles.tooltip}>Excluir</span>
            </div>
          </div>
        </div>

        <div className={styles.divisao}></div>
      </div>
    );
  };

  return (
    <div className={styles.listaClientesContainer}>

      <div className={styles.cabecalho}>
        <div className={styles.titulos}>
          <span className={styles.titulo}>Clientes</span>
          <span className={styles.subtitulo}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </span>
        </div>

        <button
          onClick={async () => {
            const { value: formValues } = await Swal.fire({
              didOpen: (btns) => {
                const popup = Swal.getPopup();
                popup.style.borderRadius = '1rem'; // Altere o valor aqui
                popup.style.color = '#020618';
                
                const btn_confirmar = Swal.getConfirmButton();
                btn_confirmar.style.backgroundColor = '#020618';
                btn_confirmar.style.color = '#f8fafc';
                btn_confirmar.style.borderRadius = '0.9rem';

                const btn_cancelar = Swal.getCancelButton();
                btn_cancelar.style.backgroundColor = '#ffffff';
                btn_cancelar.style.boxShadow = 'inset 0 0 0 3px #020618';
                btn_cancelar.style.color = '#020618';
                btn_cancelar.style.borderRadius = '0.9rem';
              },
              title: "Cadastro",
              html: `
              <p>djsadakjdsa</p>
        <input id="nome" class="swal2-input" placeholder="Nome">
        <input id="email" class="swal2-input" placeholder="Email">
        <input id="telefone" class="swal2-input" placeholder="Telefone">
      `,
              showCancelButton: true,
               confirmButtonText: "Salvar",
              preConfirm: () => {
                const nome = document.getElementById("nome").value;
                const email = document.getElementById("email").value;
                const telefone = document.getElementById("telefone").value;

                if (!nome || !email || !telefone) {
                  Swal.showValidationMessage("Preencha tudo");
                  return false;
                }

                return { nome, email, telefone };
              }
            });

            if (formValues) {
              console.log(formValues);
            }
          }}
        >
          Cadastrar novo cliente
        </button>
      </div>

      <div className={styles.containerInfos}>

        {/* TABELA ESQUERDA */}

        <div className={styles.listaClientesGrid}>
          <ClientesHeader />

          <div className={styles.clientesLista}>
            {clientes.length === 0 ? (
              <p>Nenhum cliente encontrado</p>
            ) : (
              clientes.map((cliente, index) => (
                <ClienteItem
                  key={cliente.idCliente}
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

      {
        modalAberto && (
          <ClienteModal
            cliente={clienteSelecionado}
            onClose={fecharModal}
          />
        )
      }
    </div >
  );
}