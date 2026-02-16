import "../styles/Resumo.css";

const produtos = [
  { id: 1, nome: "Aerosol", peso: "123kg", valorKg: "R$10,00", total: "R$1.230,00" },
  { id: 2, nome: "Aerosol", peso: "123kg", valorKg: "R$10,00", total: "R$1.230,00" },
  { id: 3, nome: "Aerosol", peso: "123kg", valorKg: "R$10,00", total: "R$1.230,00" },
  { id: 4, nome: "Aerosol", peso: "123kg", valorKg: "R$10,00", total: "R$1.230,00" },
  { id: 5, nome: "Aerosol", peso: "123kg", valorKg: "R$10,00", total: "R$1.230,00" },
  { id: 6, nome: "Aerosol", peso: "123kg", valorKg: "R$10,00", total: "R$1.230,00" },
  { id: 7, nome: "Aerosol", peso: "123kg", valorKg: "R$10,00", total: "R$1.230,00" },
  { id: 8, nome: "Aerosol", peso: "123kg", valorKg: "R$10,00", total: "R$1.230,00" },
  { id: 9, nome: "Aerosol", peso: "123kg", valorKg: "R$10,00", total: "R$1.230,00" },
  { id: 10, nome: "Aerosol", peso: "123kg", valorKg: "R$10,00", total: "R$1.230,00" },
  { id: 11, nome: "Aerosol", peso: "123kg", valorKg: "R$10,00", total: "R$1.230,00" },
];

const EstoqueHeader = () =>{
    return (
        <div className="estoqueHeader">
            <span className="estoque-produto">Produto</span>
            <span className="estoque-peso">Peso</span>
            <span className="estoque-valor">Valor</span>
            <span className="estoque-total">Total</span>
        </div>
    );
};

const EstoqueItem = ({ produtos }) => {
    return (
        <div className="estoque-line">
            <div className="estoque-item">
                <span className="estoque-produto">{produtos.nome}</span>
                <span className="estoque-peso">{produtos.peso}</span>
                <span className="estoque-valor">{produtos.valorKg}</span>
                <span className="estoque-total">{produtos.total}</span>
            </div>
            <div className="divisao"></div>
        </div>
    );
};

const ResumoCard = ({ titulo, valor}) => {
    return (
        <div className="resumo-card">
            <span className="resumo-titulo">{titulo}</span>
            <h3>{valor}</h3>
        </div>
    );
};

const Resumo = ({ lista = produtos }) => {
    return (
        <div className="estoque-container">

            <div className="estoque-esq">
                <h1 className="estoque-titulo">Estoque Atual</h1>
               
                <div className="estoque-grid">
                <EstoqueHeader />
                {lista.map((produtos) => (
                    <EstoqueItem key={produtos.id} produtos={produtos} />
                ))}
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