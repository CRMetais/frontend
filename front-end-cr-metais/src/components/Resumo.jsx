import "../styles/Resumo.css";
import { useState, useEffect } from "react";
import { api } from "../services/resumoService";

const EstoqueHeader = () => {
  return (
    <div className="estoque-header">
      <span className="estoque-produto">Produto</span>
      <span className="estoque-peso">Peso</span>
      <span className="estoque-valor">Valor</span>
      <span className="estoque-total">Total</span>
    </div>
  );
};

const EstoqueItem = ({ produto }) => {
  return (
    <div className="estoque-line">
      <div className="estoque-item">
        <span className="estoque-produto">{produto.nome}</span>
        <span className="estoque-peso">{produto.peso || "N/A"}</span>
        <span className="estoque-valor">{produto.valorKg || "N/A"}</span>
        <span className="estoque-total">{produto.total || "N/A"}</span>
      </div>
      <div className="divisao"></div>
    </div>
  );
};

const ResumoCard = ({ titulo, valor }) => {
  return (
    <div className="resumo-card">
      <span className="resumo-titulo">{titulo}</span>
      <h3>{valor}</h3>
    </div>
  );
};

const Resumo = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    api.get('/produtos')
      .then(res => {
        console.log('Resposta da API:', res.data);
        setProdutos(res.data);
      })
      .catch(err => console.error('Erro ao buscar produtos:', err));
  }, []);

  return (
    <div className="estoque-container">
      <div className="estoque-esq">
        <h1 className="estoque-titulo">Estoque Atual</h1>
        <div className="estoque-grid">
          <EstoqueHeader />
          <div className="estoque-lista">
          {produtos.map(produto => (
            <EstoqueItem key={produto.idProduto} produto={produto} />
          ))}
          </div>
        </div>
      </div>

      <div className="estoque-dir">
        <ResumoCard titulo="Total Aplicado:" valor="R$ 43.231,67" />
        <ResumoCard titulo="Peso Total:" valor="7.545,500 kg" />
        <ResumoCard titulo="Pg Notas (hoje):" valor="R$ 12.458,32" />
        <ResumoCard titulo="Peso Kg (hoje):" valor="1.145,200 kg" />
      </div>
    </div>
  );
};

export default Resumo;