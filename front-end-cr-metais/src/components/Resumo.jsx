import "../styles/Resumo.css";
import { useState, useEffect } from "react";
import { api } from "../services/resumoService";

const EstoqueHeader = () => {
  return (
    <div className="estoque-header">
      <span className="estoque-produto">Produto</span>
      <span className="estoque-peso">Peso (Kg)</span>
      <span className="estoque-valor">Valor Unitário (R$)</span>
      <span className="estoque-total">Total (R$)</span>
    </div>
  );
};

const EstoqueItem = ({ produto }) => {
  return (
    <div className="estoque-line">
      <div className="estoque-item">
        <span className="estoque-produto">{produto.nome}</span>
        <span className="estoque-peso">{produto.peso.toFixed(2)}</span>
        <span className="estoque-valor">{produto.valor.toFixed(2)}</span>
        <span className="estoque-total">{produto.total.toFixed(2)}</span>
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
  const [resumo, setResumo] = useState(null);

// Quando for editar sem usar o java e o bd descomenta esse useEffect mockado e comenta o outro

//   useEffect(() => {
//   setResumo({
//     produtos: [
//       { nome: "Produto A", peso: 10, valor: 20, total: 200 },
//       { nome: "Produto B", peso: 5, valor: 30, total: 150 }
//     ],
//     totalAplicado: 350,
//     pesoTotal: 15,
//     notasHoje: 2,
//     pesoHoje: 15
//   });
// }, []);


// Usa esse useEffect quando ligar o java e bd
  useEffect(() => {
    api.get('/resumos')
      .then(res => {
        console.log('Resposta da API:', res.data);
        setResumo(res.data);
      })
      .catch(err => console.error('Erro ao buscar produtos:', err));
  }, []);
  
  if(!resumo){
    return <p>Carregando...</p>
  }

  return (
    <div className="estoque-container">
      <div className="estoque-esq">
        <h1 className="estoque-titulo">Estoque Atual</h1>
        <div className="estoque-grid">
          <EstoqueHeader />
          <div className="estoque-lista">
          {resumo.produtos.map((produto, index) => (
            <EstoqueItem key={index} produto={produto} />
          ))}
          </div>
        </div>
      </div>

      <div className="estoque-dir">
        <ResumoCard titulo="Total Aplicado:" valor={`R$ ${resumo.totalAplicado.toFixed(2)}`} />
        <ResumoCard titulo="Peso Total:" valor={`${resumo.pesoTotal.toFixed(2)} Kg`} />
        <ResumoCard titulo="Pg Notas (hoje):" valor={`${resumo.notasHoje.toFixed(2)} Kg`} />
        <ResumoCard titulo="Peso Kg (hoje):" valor={`${resumo.pesoHoje.toFixed(2)}`} />
      </div>
    </div>
  );
};

export default Resumo;