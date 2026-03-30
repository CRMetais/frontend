import React, { useState, useEffect } from "react";
import styles from "../styles/Historico.module.css";
import { buscarHistorico } from "../services/histoticoService";

function Historico() {

  const [tableData, setTableData] = useState([]);
  const [tipoHistorico, setTipoHistorico] = useState("Entrada");
  const [loading, setLoading] = useState(false);

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString("pt-BR");
  };

  useEffect(() => {
    const carregarDados = async () => {
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
          <h1 className={styles.titulo}>
            Histórico de {tipoHistorico}
          </h1>

          <select
            className={styles.selectHistorico}
            value={tipoHistorico}
            onChange={(e) => setTipoHistorico(e.target.value)}
          >
            <option value="Entrada">Entrada</option>
            <option value="Saida">Saída</option>
          </select>
        </div>

        {/* TABELA */}
        <div className={styles.wrapperTabela}>
          <table className={styles.tabela}>
            <thead>
              <tr>
                <th>Id da Compra</th>
                <th>Produto</th>
                <th>Peso(Kg)</th>
                <th>Valor(R$)</th>
                <th>Total(R$)</th>
                <th>Rend(R$)</th>
                <th>Tipo</th>
                <th>Parceiro</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9">Carregando...</td>
                </tr>
              ) : tableData.length === 0 ? (
                <tr>
                  <td colSpan="9">Nenhum dado encontrado</td>
                </tr>
              ) : (
                tableData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.id}</td>
                    <td>{row.produto}</td>
                    <td>{row.peso}</td>
                    <td>{row.preco?.toFixed(2)}</td>
                    <td>{row.total?.toFixed(2)}</td>
                    <td>{row.rendimento ? row.rendimento.toFixed(2) : "-"}</td>
                    <td>{row.tipo}</td>
                    <td>{row.parceiro}</td>
                    <td>{formatarData(row.data)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}

export default Historico;