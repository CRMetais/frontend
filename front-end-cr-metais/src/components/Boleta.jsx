import React from "react";
import "../styles/BoletaStyle.css";

const itensBoleta = [
  { id: "1", produto: "Aerosol", peso: "54.00", valor: "R$ 8.00", total: "R$ 432.00", bags: "1" },
  { id: "2", produto: "Lata", peso: "258.00", valor: "R$ 9.00", total: "R$ 2322.00", bags: "8" },
  { id: "3", produto: "Bloco Limpo", peso: "54.00", valor: "R$ 5.50", total: "R$ 297.00", bags: "1" },
  { id: "4", produto: "Ferroso", peso: "32.00", valor: "R$ 2.20", total: "R$ 70.40", bags: "1" },
  { id: "5", produto: "Ferroso", peso: "32.00", valor: "R$ 2.20", total: "R$ 70.40", bags: "1" },
  { id: "X", produto: "XXXXXXX", peso: "XX.XX", valor: "R$ X.XX", total: "R$ XX.XX", bags: "X" },
  { id: "X", produto: "XXXXXXX", peso: "XX.XX", valor: "R$ X.XX", total: "R$ XX.XX", bags: "X" },
  { id: "X", produto: "XXXXXXX", peso: "XX.XX", valor: "R$ X.XX", total: "R$ XX.XX", bags: "X" },
  { id: "X", produto: "XXXXXXX", peso: "XX.XX", valor: "R$ X.XX", total: "R$ XX.XX", bags: "X" },
  { id: "X", produto: "XXXXXXX", peso: "XX.XX", valor: "R$ X.XX", total: "R$ XX.XX", bags: "X" },
];

const camposNota = [
  { label: "NOME", value: "JOSÉ CARLOS" },
  { label: "TABELA", value: "ALTA" },
  { label: "CLASSE", value: "RETIRADA" },
  { label: "TIPO", value: "SAÍDA" },
];

const Boleta = () => {
  return (
    <div className="pagina">
      <div className="conteudo_principal">
        <div className="codigo_cliente" />

        <div className="card_nota">
          <div className="cabecalho_card">
            <h2>NOTA DE PAGAMENTO</h2>
            <button type="button" className="botao_adicionar">
              ADICIONAR PRODUTO
            </button>
          </div>

          <div className="rolagem_tabela">
            <table className="tabela">
              <thead>
                <tr>
                  <th>NUM</th>
                  <th>Produto</th>
                  <th>Peso (Kg)</th>
                  <th>Valor</th>
                  <th>Total</th>
                  <th>Qtd. Bags</th>
                </tr>
              </thead>
              <tbody>
                {itensBoleta.map((item, index) => (
                  <tr key={`${item.id}-${index}`}>
                    <td>{item.id}</td>
                    <td>{item.produto}</td>
                    <td>{item.peso}</td>
                    <td>{item.valor}</td>
                    <td>{item.total}</td>
                    <td>{item.bags}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <aside className="conteudo_lateral">
        <div className="caixa_info">
          <p className="titulo_lateral">Informações da Nota</p>
          <div className="lista_info">
            {camposNota.map((campo) => (
              <div className="linha_info" key={campo.label}>
                <span>{campo.label}</span>
                <strong>{campo.value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="caixa_info caixa_acoes">
          <p className="titulo_lateral">Informações da Nota</p>
          <div className="botoes_acao">
            <button type="button">CONFIRMAR PAGAMENTO</button>
            <button type="button">GERAR NOTA FISCAL</button>
            <button type="button" className="botao_copiar">
              <span className="texto_copiar">Copiar Nota</span>
              <span className="icone_copiar texto_copiar" aria-hidden="true">
                ⧉
              </span>
            </button>
          </div>
        </div>

        <div className="card_total">
          <p className="label_total">Valor Total</p>
          <p className="valor_total">R$ 3.121,40</p>
          <div className="divisor_total" />
          <div className="detalhes_total">
            <span>Produtos</span>
            <span>Bags</span>
            <span>Peso</span>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Boleta;
