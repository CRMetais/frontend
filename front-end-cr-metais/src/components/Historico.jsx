import React, { useState } from 'react';
import styles from './App.module.css';

function Historico() {
  // Dados de exemplo - você pode adicionar mais linhas facilmente
  const [tableData] = useState([
    { id: 1, produto: 'Bronze', peso: 10, valor: 38.00, total: 380.00, rend: 89.00, status: '-', cliente: 'José Silva', data: '29/09/25', balanco: 'SIM', classe: 'Entrega', nFiscal: 'SIM' },
    { id: 1, produto: 'Bronze', peso: 10, valor: 38.00, total: 380.00, rend: 89.00, status: '-', cliente: 'José Silva', data: '29/09/25', balanco: 'SIM', classe: 'Entrega', nFiscal: 'SIM' },
    { id: 1, produto: 'Bronze', peso: 10, valor: 38.00, total: 380.00, rend: 89.00, status: '-', cliente: 'José Silva', data: '29/09/25', balanco: 'SIM', classe: 'Entrega', nFiscal: 'SIM' },
    { id: 1, produto: 'Bronze', peso: 10, valor: 38.00, total: 380.00, rend: 89.00, status: '-', cliente: 'José Silva', data: '29/09/25', balanco: 'SIM', classe: 'Entrega', nFiscal: 'SIM' },
    { id: 1, produto: 'Bronze', peso: 10, valor: 38.00, total: 380.00, rend: 89.00, status: '-', cliente: 'José Silva', data: '29/09/25', balanco: 'SIM', classe: 'Entrega', nFiscal: 'SIM' },
    { id: 1, produto: 'Bronze', peso: 10, valor: 38.00, total: 380.00, rend: 89.00, status: '-', cliente: 'José Silva', data: '29/09/25', balanco: 'SIM', classe: 'Entrega', nFiscal: 'SIM' },
    { id: 1, produto: 'Bronze', peso: 10, valor: 38.00, total: 380.00, rend: 89.00, status: '-', cliente: 'José Silva', data: '29/09/25', balanco: 'SIM', classe: 'Entrega', nFiscal: 'SIM' },
    { id: 1, produto: 'Bronze', peso: 10, valor: 38.00, total: 380.00, rend: 89.00, status: '-', cliente: 'José Silva', data: '29/09/25', balanco: 'SIM', classe: 'Entrega', nFiscal: 'SIM' },
    { id: 1, produto: 'Bronze', peso: 10, valor: 38.00, total: 380.00, rend: 89.00, status: '-', cliente: 'José Silva', data: '29/09/25', balanco: 'SIM', classe: 'Entrega', nFiscal: 'SIM' },
    { id: 1, produto: 'Bronze', peso: 10, valor: 38.00, total: 380.00, rend: 89.00, status: '-', cliente: 'José Silva', data: '29/09/25', balanco: 'SIM', classe: 'Entrega', nFiscal: 'SIM' },
  ]);

  const handleExportCSV = () => {
    // Implementar exportação CSV aqui
    console.log('Exportar CSV');
  };

  return (
    
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.titleBar}>
          <h1 className={styles.title}>Histórico de Entrada</h1>
          <button className={styles.csvButton} onClick={handleExportCSV}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 4v5M8 9l-2-2M8 9l2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Gerar CSV
          </button>
        </div>

        {/* Table */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
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