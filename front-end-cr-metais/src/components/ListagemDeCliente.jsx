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

            let pagina = 1;
            let formData = {};

            function renderPagina() {
              if (pagina === 1) {
                return `
                  <h1 style="font-size: 1.5rem; margin: 0">Cadastro de novo cliente</h1>

                  <br>

                  <label>CPF ou CNPJ</label>
                  <input id="cpf" class="swal2-input">

                  <label>Nome completo</label>
                  <input id="nome" class="swal2-input">

                  <label>Telefone</label>
                  <input id="telefone" class="swal2-input">

                  <label>Apelido</label>
                  <input id="apelido" class="swal2-input">

                  <label>Tipo pessoa</label>
                  <div id="tipoPessoa" class="custom-select" style="display: flex; justify-content: space-between; padding-bottom: 0.5rem;">

                    <div data-value="Fisica" style="background-color: #facc15; padding: 10px 20px; color: white; border-radius: 0.8rem; width: 49%">Física</div>
                    <div data-value="Juridica" style="background-color: #facc15; padding: 10px 20px; color: white; border-radius: 0.8rem; width: 49%">Jurídica</div>
                  </div>

                  <label>Email</label>
                  <input id="email" class="swal2-input">
                `;
              }

              if (pagina === 2) {
                return `
                <label>CEP</label>
                <input id="cep" class="swal2-input">

                <label>Bairro</label>
                <input id="bairro" class="swal2-input">

                <label>Número</label>
                <input id="numero" class="swal2-input">

                <label>Município</label>
                <input id="cidade" class="swal2-input">

                <label>UF</label>
                <input id="uf" class="swal2-input">
                `;
              }

              if (pagina === 3) {
                return `
                <label>Forma de pagamento</label>
                <div id="tipoPagamento" style="display: flex; justify-content: space-between; padding-bottom: 0.5rem;"">
                  <div data-value="pix" style="background-color: #facc15; padding: 10px 20px; color: white; border-radius: 0.8rem; width: 49%">Pix</div>
                  <div data-value="banco" style="background-color: #facc15; padding: 10px 20px; color: white; border-radius: 0.8rem; width: 49%">Dados Bancários</div>
                </div>

                <div id="dadosPagamento"></div>
                 `;
              }

              if (pagina === 4) {
                return `
                  <h1 style="font-size: 1.5rem; margin: 0">Dados do Dono da Conta</h1>

                  <br>

                  <label>Nome completo</label>
                  <input id="nomeDono" class="swal2-input">

                  <label>CPF ou CNPJ</label>
                  <input id="cpfDono" class="swal2-input">

                  <label>Tabela</label>
                  <input id="tabela" class="swal2-input">

                  <label>Gestor da Tabela</label>
                  <input id="gestor" class="swal2-input">

                  <label>Tabela semanal?</label>
                  <div id="tabelaSemanal" style="display: flex; justify-content: space-between; padding-bottom: 0.5rem;">
                    <div data-value="sim">Sim</div>
                    <div data-value="nao">Não</div>
                  </div>
                  `;
              }
            }

            async function abrirModal() {
              while (true) {
                const { isConfirmed, isDenied } = await Swal.fire({
                  html: renderPagina(),
                  showCancelButton: true,
                  confirmButtonText: pagina === 4 ? "Finalizar" : "Próxima",
                  cancelButtonText: "Cancelar",
                  showDenyButton: pagina > 1,
                  denyButtonText: "Página anterior",

                  didOpen: () => {
                    aplicarEventos();

                    const janela = Swal.getPopup();
                    const container = Swal.getHtmlContainer();
                    const btn_proxima_pagina = Swal.getConfirmButton();
                    const btn_cancelar = Swal.getCancelButton();
                    const btn_pagina_anterior = Swal.getDenyButton();
                    const actions = document.querySelector(".swal2-actions");

                    // console.log("actions:", actions);

                    // actions.style.border = "solid red thin";
                    actions.style.width = "calc(100% - 3rem)";
                    actions.style.alignSelf = "center";
                    actions.style.padding = "0";
                    actions.style.margin = "0";
                    actions.style.gap = "0.5rem";


                    btn_proxima_pagina.style.backgroundColor = "#020618";
                    btn_proxima_pagina.style.height = "2.5rem";
                    btn_cancelar.style.height = "2.5rem";
                    btn_pagina_anterior.style.height = "2.5rem";
                    btn_proxima_pagina.style.borderRadius = "0.8rem";
                    btn_cancelar.style.borderRadius = "0.8rem";
                    btn_pagina_anterior.style.borderRadius = "0.8rem";
                    btn_proxima_pagina.style.margin = "0";
                    btn_cancelar.style.backgroundColor = "white";
                    btn_cancelar.style.boxShadow = " 0 0 0 2px #020618 inset";
                    btn_cancelar.style.color = "#020618";
                    btn_cancelar.style.margin = "0 0 1rem 0";
                    actions.style.display = "flex";
                    // actions.backgrounColor = "red";

                    container.style.display = "flex";
                    container.style.flexDirection = "column";
                    container.style.margin = "0";

                    janela.style.padding = "1rem 1rem";
                    janela.style.borderRadius = "1rem";
                    janela.style.display = "flex";
                    janela.style.flexDirection = "column";
                    janela.style.justifyContent = "center";
                    janela.style.alingItems = "center";
                    janela.style.fontFamily = `
                      -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
                      "Oxygen", "Ubuntu", "Cantarell", sans-serif
                      `;

                    document.querySelectorAll(".swal2-input").forEach(input => {
                      input.style.borderRadius = "8px";
                      input.style.border = "1px solid #cbd5f5";
                      input.style.padding = "20px";
                      input.style.height = "2.5rem";
                      input.style.width = "100%";
                      input.style.margin = "0 0 1rem 0"
                      input.style.borderRadius = "0.8rem"
                      // input.style.outline = "#facc15 none"
                      // input.style.border = "#facc15 none"
                    });

                    const labels = document.querySelectorAll("label");

                    labels.forEach(label => {
                      console.log(label);

                      label.style.alignSelf = "start";
                      label.style.padding = "0.2rem 0 0.4rem 0"
                      // label.style.padding = "0 3rem";
                    });
                  }
                });

                if (isDenied) {
                  pagina--;
                  continue;
                }

                if (!isConfirmed) break;

                salvarDados();

                if (pagina < 4) {
                  pagina++;
                } else {
                  // console.log("DADOS FINAIS:", formData);

                  console.log("DADOS FINAIS:");
                  console.table(formData);

                  break;
                }
              }
            }

            function salvarDados() {
              document.querySelectorAll("input").forEach(input => {
                formData[input.id] = input.value;
              });
            }

            function aplicarEventos() {
              // SELECT CUSTOM
              document.querySelectorAll(".custom-select div").forEach(el => {
                el.addEventListener("click", () => {
                  const parent = el.parentElement;
                  parent.querySelectorAll("div").forEach(d => d.classList.remove("active"));
                  el.classList.add("active");

                  formData[parent.id] = el.dataset.value;

                  // PIX / BANCO
                  if (parent.id === "tipoPagamento") {
                    const container = document.getElementById("dadosPagamento");

                    if (el.dataset.value === "pix") {
                      container.innerHTML = `
            <label>Chave Pix</label>
            <input id="pix" class="swal2-input">

            <label>Pertence ao cliente?</label>
            <div id="pertencePix" style="display: flex; justify-content: space-between; padding-bottom: 0.5rem;">
              <div data-value="sim" >Sim</div>
              <div data-value="nao" >Não</div>
            </div>
          `;
                    } else {
                      container.innerHTML = `
            <label>Banco</label>
            <input id="banco" class="swal2-input">

            <label>Agência</label>
            <input id="agencia" class="swal2-input">

            <label>Conta</label>
            <input id="conta" class="swal2-input">

            <label>Tipo Conta</label>
            <div id="tipoConta" class="custom-select">
              <div data-value="corrente">Corrente</div>
              <div data-value="poupanca">Poupança</div>
            </div>
          `;
                    }

                    aplicarEventos();
                  }
                });
              });

              // VIA CEP
              const cepInput = document.getElementById("cep");
              if (cepInput) {
                cepInput.addEventListener("blur", async () => {
                  const cep = cepInput.value.replace(/\D/g, "");

                  if (cep.length === 8) {
                    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                    const data = await res.json();

                    document.getElementById("bairro").value = data.bairro || "";
                    document.getElementById("cidade").value = data.localidade || "";
                    document.getElementById("uf").value = data.uf || "";
                  }
                });
              }
            }

            if (formData) {
              console.log(formData);
            }


            await abrirModal();
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