import React, { useState } from "react";
import styles from "../styles/Historico.module.css";

function Historico() {
  const [tableData] = useState([
    { id: 1, produto: "Bronze", peso: 10, valor: 38.0, total: 380.0, rend: 89.0, status: "-", cliente: "José Silva", data: "29/09/25", balanco: "SIM", classe: "Entrega", nFiscal: "SIM" },
    { id: 1, produto: "Bronze", peso: 10, valor: 38.0, total: 380.0, rend: 89.0, status: "-", cliente: "José Silva", data: "29/09/25", balanco: "SIM", classe: "Entrega", nFiscal: "SIM" },
    { id: 1, produto: "Bronze", peso: 10, valor: 38.0, total: 380.0, rend: 89.0, status: "-", cliente: "José Silva", data: "29/09/25", balanco: "SIM", classe: "Entrega", nFiscal: "SIM" },
    { id: 1, produto: "Bronze", peso: 10, valor: 38.0, total: 380.0, rend: 89.0, status: "-", cliente: "José Silva", data: "29/09/25", balanco: "SIM", classe: "Entrega", nFiscal: "SIM" },
    { id: 1, produto: "Bronze", peso: 10, valor: 38.0, total: 380.0, rend: 89.0, status: "-", cliente: "José Silva", data: "29/09/25", balanco: "SIM", classe: "Entrega", nFiscal: "SIM" },
    { id: 1, produto: "Bronze", peso: 10, valor: 38.0, total: 380.0, rend: 89.0, status: "-", cliente: "José Silva", data: "29/09/25", balanco: "SIM", classe: "Entrega", nFiscal: "SIM" },
    { id: 1, produto: "Bronze", peso: 10, valor: 38.0, total: 380.0, rend: 89.0, status: "-", cliente: "José Silva", data: "29/09/25", balanco: "SIM", classe: "Entrega", nFiscal: "SIM" },
    { id: 1, produto: "Bronze", peso: 10, valor: 38.0, total: 380.0, rend: 89.0, status: "-", cliente: "José Silva", data: "29/09/25", balanco: "SIM", classe: "Entrega", nFiscal: "SIM" },
    { id: 1, produto: "Bronze", peso: 10, valor: 38.0, total: 380.0, rend: 89.0, status: "-", cliente: "José Silva", data: "29/09/25", balanco: "SIM", classe: "Entrega", nFiscal: "SIM" },
    { id: 1, produto: "Bronze", peso: 10, valor: 38.0, total: 380.0, rend: 89.0, status: "-", cliente: "José Silva", data: "29/09/25", balanco: "SIM", classe: "Entrega", nFiscal: "SIM" },

  ]);

  const handleExportCSV = () => {
    console.log("Exportar CSV");
  };

  return (
    <div className={styles.containerPrincipal}>
      <main className={styles.conteudoPrincipal}>
        <div className={styles.barraTitulo}>
          <h1 className={styles.titulo}>Histórico de Entrada</h1>

          <button className={styles.botaoCsv} onClick={handleExportCSV}>
            Gerar CSV
          </button>
        </div>

        <div className={styles.wrapperTabela}>
          <table className={styles.tabela}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Produto</th>
                <th>Peso</th>
                <th>Valor</th>
                <th>Total</th>
                <th>Rend</th>
                <th>Status</th>
                <th>Cliente</th>
                <th>Data</th>
                <th>Balanço</th>
                <th>Classe</th>
                <th>N. Fiscal</th>
              </tr>
            </thead>

            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td>{row.id}</td>
                  <td>{row.produto}</td>
                  <td>{row.peso}</td>
                  <td>{row.valor.toFixed(2)}</td>
                  <td>{row.total.toFixed(2)}</td>
                  <td>{row.rend.toFixed(2)}</td>
                  <td>{row.status}</td>
                  <td>{row.cliente}</td>
                  <td>{row.data}</td>
                  <td>{row.balanco}</td>
                  <td>{row.classe}</td>
                  <td>{row.nFiscal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Historico;
