import styles from "../styles/Resumo.module.css";
import { useState, useEffect } from "react";
import { api } from "../services/resumoService";
import { FaSearch } from "react-icons/fa";

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

const EstoqueItem = ({ produto, isEven }) => {
  const total = produto.peso * produto.valor;

  return (
    <div
      className={`${styles.estoqueLine} ${
        isEven ? styles.linhaPar : styles.linhaImpar
      }`}
    >
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
          {total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
        <span className={styles.estoqueDestino}>
          {produto.destino || " - "}
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
  const [busca, setBusca] = useState("");

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

  const termo = busca.toLowerCase().trim();

  // Preserva o índice original para manter as listras corretas após o filtro
  const produtosFiltrados = resumo.produtos
    .map((produto, originalIndex) => ({ produto, originalIndex }))
    .filter(({ produto }) =>
      !termo || produto.nome?.toLowerCase().includes(termo)
    );

  return (
    <div className={styles.conteudo}>
      <div className={styles.titulo}>
        <span className={styles.estoqueTitulo}>Estoque atual</span>
        <span className={styles.subtitulo}>
          Visão geral dos produtos em estoque
        </span>
      </div>

      <div className={styles.containers}>
        <div className={styles.leftSide}>
          <div className={styles.searchWrapper}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Buscar por produto..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
            {busca && (
              <button
                className={styles.searchClear}
                onClick={() => setBusca("")}
                aria-label="Limpar busca"
              >
                ✕
              </button>
            )}
          </div>

          <div className={styles.estoqueGrid}>
            <EstoqueHeader />

            <div className={styles.estoqueLista}>
              {produtosFiltrados.length > 0 ? (
                produtosFiltrados.map(({ produto, originalIndex }) => (
                  <EstoqueItem
                    key={originalIndex}
                    produto={produto}
                    isEven={originalIndex % 2 === 0}
                  />
                ))
              ) : (
                <div className={styles.semResultados}>
                  Nenhum produto encontrado para &quot;{busca}&quot;
                </div>
              )}
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
  );
};

export default Resumo;