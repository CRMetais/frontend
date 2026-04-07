import React, { useState, useEffect } from "react";
import styles from "../styles/Historico.module.css";
import { buscarHistorico } from "../services/histoticoService";

function Historico() {

  const [tableData, setTableData] = useState([]);
  const [tipoHistorico, setTipoHistorico] = useState("Entrada");
  const [loading, setLoading] = useState(false);

  const HistoricoHeader = () => {
    return (
      <div className={styles.historicoHeader}>
        <span className={styles.idCompra}>Id</span>
        <span className={styles.produto}>Produto</span>
        <span className={styles.peso}>Peso</span>
        <span className={styles.valor}>Valor</span>
        <span className={styles.total}>Total</span>
        <span className={styles.rendimento}>Rendimento</span>
        <span className={styles.tipo}>Tipo</span>
        <span className={styles.parceiro}>Parceiro</span>
        <span className={styles.data}>Data</span>
      </div>
    );
  };

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString("pt-BR");
  };

  const HistoricoList = ({ produto, isEven }) => {
    return (
      <div className={`${styles.historicoLine} ${isEven ? styles.linhaPar : styles.linhaImpar}`}>
        <div className={styles.item}>
          <span className={styles.idCompra}>
            {produto.id || ""}
          </span>

          <span className={styles.produto}>
            {produto.produto || ""}
          </span>

          <span className={styles.peso}>
            {produto.peso
              ? `${produto.peso.toLocaleString("pt-BR")} Kg`
              : ""}
          </span>

          <span className={styles.valor}>
            {produto.preco
              ? produto.preco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })
              : ""}
          </span>

          <span className={styles.total}>
            {produto.total
              ? produto.total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })
              : ""}
          </span>

          <span className={styles.rendimento}>
            {produto.rendimento
              ? produto.rendimento.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })
              : ""}
          </span>

          <span className={styles.tipo}>
            {produto.tipo || ""}
          </span>

          <span className={styles.parceiro}>
            {produto.parceiro || ""}
          </span>

          <span className={styles.data}>
            {produto.data || ""}
          </span>
        </div>
      </div>
    );
  };

  useEffect(() => {
  })


  useEffect(() => {
    const carregarDados = async () => {

      document.title = "CR Metais | Histórico"

      try {
        setLoading(true);

        const tipoApi = tipoHistorico === "Entrada" ? "COMPRA" : "VENDA";

        const data = await buscarHistorico(tipoApi);

        console.log("DADOS DA API:", data); // 👈 DEBUG

        setTableData(data);

      } catch (error) {
        console.error("Erro no componente:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, [tipoHistorico]);

  return (

    <div className={styles.containerPrincipal}>
      <main className={styles.conteudoPrincipal}>

        {/* HEADER */}
        <div className={styles.barraTitulo}>
          <div className={styles.titulos}>
            <h1 className={styles.titulo}>
              Histórico de {tipoHistorico}
            </h1>

            {/* <span className={styles.subtitulo}>Alterne a visualização clicando em <b>Alternar para {tipoHistorico}</b></span> */}
            <span className={styles.subtitulo}>
              Alterne a visualização clicando em{" "}
              <b>
                Alternar para {tipoHistorico === "Entrada" ? "Saída" : "Entrada"}
              </b>
            </span>
          </div>

          <button
            className={styles.selectHistorico}
            onClick={() =>
              setTipoHistorico((prev) =>
                prev === "Entrada" ? "Saída" : "Entrada"
              )
            }
          >
            Alternar para {tipoHistorico === "Entrada" ? "Saída" : "Entrada"}
          </button>
        </div>






        <div className={styles.historicoGrid}>
          <HistoricoHeader />

          <div className={styles.historicoLista}>
            {tableData.map((produto, index) => (
              <HistoricoList
                key={index}
                produto={produto}
                isEven={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </main>
    </div>


    //     {/* TABELA */}
    //     <div className={styles.wrapperTabela}>
    //       <table className={styles.tabela}>
    //         <thead>
    //           <tr>
    //             <th>Id da Compra</th>
    //             <th>Produto</th>
    //             <th>Peso(Kg)</th>
    //             <th>Valor(R$)</th>
    //             <th>Total(R$)</th>
    //             <th>Rend(R$)</th>
    //             <th>Tipo</th>
    //             <th>Parceiro</th>
    //             <th>Data</th>
    //           </tr>
    //         </thead>

    //         <tbody>
    //           {loading ? (
    //             <tr>
    //               <td colSpan="9">Carregando...</td>
    //             </tr>
    //           ) : tableData.length === 0 ? (
    //             <tr>
    //               <td colSpan="9">Nenhum dado encontrado</td>
    //             </tr>
    //           ) : (
    //             tableData.map((row, index) => (
    //               <tr key={index}>
    //                 <td>{row.id}</td>
    //                 <td>{row.produto}</td>
    //                 <td>{row.peso}</td>
    //                 <td>{row.preco?.toFixed(2)}</td>
    //                 <td>{row.total?.toFixed(2)}</td>
    //                 <td>{row.rendimento ? row.rendimento.toFixed(2) : "-"}</td>
    //                 <td>{row.tipo}</td>
    //                 <td>{row.parceiro}</td>
    //                 <td>{formatarData(row.data)}</td>
    //               </tr>
    //             ))
    //           )}
    //         </tbody>
    //       </table>
    //     </div>

    //   </main>
    // </div>
  );
}

export default Historico;