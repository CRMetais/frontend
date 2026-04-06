import styles from "../styles/Resumo.module.css";
import { useState, useEffect } from "react";
import { api } from "../services/resumoService";

const EstoqueHeader = () => {
  return (
    <div className={styles.estoqueHeader}>
      <span className={styles.estoqueProduto}>Produto</span>
      <span className={styles.estoquePeso}>Peso (Kg)</span>
      <span className={styles.estoqueValor}>Valor Unitário (R$)</span>
      <span className={styles.estoqueTotal}>Total (R$)</span>
      <span className={styles.estoqueDestino}>Destino</span>
    </div>
  );
};

const EstoqueItem = ({ produto }) => {
  return (
    <div className={styles.estoqueLine}>
      <div className={styles.estoqueItem}>
        <span className={styles.estoqueProduto}>{produto.nome}</span>
        <span className={styles.estoquePeso}>
          {`${produto.peso.toLocaleString("pt-BR")} Kg`}
        </span>
        <span className={styles.estoqueValor}>
          {produto.valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
        <span className={styles.estoqueTotal}>
          {produto.total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
        <span className={styles.estoqueDestino}>
          {produto.destino || ""}
        </span>
      </div>
      <div className={styles.divisao}></div>
    </div>
  );
};

const ResumoCard = ({ titulo, valor }) => {
  return (
    <div className={styles.resumoCard}>
      <span className={styles.resumoTitulo}>{titulo}</span>
      <h3>{valor}</h3>
    </div>
  );
};

const Resumo = () => {
  const [resumo, setResumo] = useState(null);

  useEffect(() => {
    document.title = "CR Metais | Resumo";
  }, []);

  useEffect(() => {
    api
      .get("/resumos")
      .then((res) => {
        console.log("Resposta da API:", res.data);
        setResumo(res.data);
      })
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  }, []);

  if (!resumo) {
    return <p>Carregando...</p>;
  }

  return (
    // <div className="titulo">
    //   <h1 className={styles.estoqueTitulo}>Resumo do Dia</h1>
    // </div>

    <div className={styles.conteudo}>
      <div className={styles.titulo}>
        <h1 className={styles.estoqueTitulo}>Estoque atual</h1>
      </div>

      <div className={styles.containers}>
        <div className={styles.leftSide}>
          <div className={styles.estoqueGrid}>
            <EstoqueHeader />

            <div className={styles.estoqueLista}>
              {resumo.produtos.map((produto, index) => (
                <EstoqueItem key={index} produto={produto} />
              ))}
            </div>
          </div>
        </div>

        <div className={styles.rightSide}>
          <div className={styles.containerCards}>
            <ResumoCard
              titulo="Total Aplicado:"
              valor={resumo.totalAplicado.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            />
            <ResumoCard
              titulo="Peso Total:"
              valor={`${resumo.pesoTotal.toLocaleString("pt-BR")} Kg`}
            />

            <ResumoCard
              titulo="Pg Notas (hoje):"
              valor={resumo.notasHoje.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            />

            <ResumoCard
              titulo="Peso Kg (hoje):"
              valor={`${resumo.pesoHoje.toLocaleString("pt-BR")} Kg`}
            />
          </div>
        </div>
      </div>
    </div>

    // <div className={styles.estoqueContainer}>
    //   <div className={styles.estoqueEsq}>
    //     <h1 className={styles.estoqueTitulo}>Estoque Atual</h1>

    //     <div className={styles.estoqueGrid}>
    //       <EstoqueHeader />

    //       <div className={styles.estoqueLista}>
    //         {resumo.produtos.map((produto, index) => (
    //           <EstoqueItem key={index} produto={produto} />
    //         ))}
    //       </div>
    //     </div>
    //   </div>

    //   <div className={styles.estoqueDir}>
    //     <div className={styles.containerCards}>
    //       <ResumoCard
    //         titulo="Total Aplicado:"
    //         valor={resumo.totalAplicado.toLocaleString("pt-BR", {
    //           style: "currency",
    //           currency: "BRL",
    //         })}
    //       />
    //       <ResumoCard
    //         titulo="Peso Total:"
    //         valor={`${resumo.pesoTotal.toLocaleString("pt-BR")} Kg`}
    //       />
    //       <ResumoCard
    //         titulo="Pg Notas (hoje):"
    //         valor={resumo.notasHoje.toLocaleString("pt-BR", {
    //           style: "currency",
    //           currency: "BRL",
    //         })}
    //       />
    //       <ResumoCard
    //         titulo="Peso Kg (hoje):"
    //         valor={`${resumo.pesoHoje.toLocaleString("pt-BR")} Kg`}
    //       />
    //     </div>
    //   </div>
    // </div>
  );
};

export default Resumo;