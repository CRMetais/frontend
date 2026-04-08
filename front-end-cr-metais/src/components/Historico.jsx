import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "../styles/Historico.module.css";
import { buscarHistorico } from "../services/histoticoService";

function Historico() {

  const PAGE_SIZE = 10;

  const [tableData, setTableData] = useState([]);
  const [tipoHistorico, setTipoHistorico] = useState("Entrada");
  const [loading, setLoading] = useState(false);
  const [pagina, setPagina] = useState(0);
  const [temMais, setTemMais] = useState(true);

  const observer = useRef(null);
  const loadingRef = useRef(false);

  const HistoricoHeader = () => (
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

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString("pt-BR");
  };

  const HistoricoList = ({ produto, isEven, refProp }) => (
    <div
      ref={refProp}
      className={`${styles.historicoLine} ${isEven ? styles.linhaPar : styles.linhaImpar}`}
    >
      <div className={styles.item}>
        <span className={styles.idCompra}>{produto.id}</span>
        <span className={styles.produto}>{produto.produto}</span>

        <span className={styles.peso}>
          {produto.peso ? `${produto.peso.toLocaleString("pt-BR")} Kg` : ""}
        </span>

        <span className={styles.valor}>
          {produto.preco?.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>

        <span className={styles.total}>
          {produto.total?.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>

        <span className={styles.rendimento}>
          {produto.rendimento
            ? produto.rendimento.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })
            : "-"}
        </span>

        <span className={styles.tipo}>{produto.tipo}</span>
        <span className={styles.parceiro}>{produto.parceiro}</span>

        <span className={styles.data}>
          {produto.data ? formatarData(produto.data) : ""}
        </span>
      </div>
    </div>
  );

  // 🔥 FUNÇÃO DE CARREGAMENTO
  const carregarDados = useCallback(async (paginaAtual) => {
    if (loadingRef.current) return;

    loadingRef.current = true;
    setLoading(true);

    try {
      const tipoApi = tipoHistorico === "Entrada" ? "COMPRA" : "VENDA";

      const data = await buscarHistorico(tipoApi, paginaAtual, PAGE_SIZE);
      const novosDados = data.content;

      setTableData(prev =>
        paginaAtual === 0 ? novosDados : [...prev, ...novosDados]
      );

      setTemMais(novosDados.length === PAGE_SIZE);

      setPagina(prev => prev + 1);

    } catch (error) {
      console.error("Erro no componente:", error);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [tipoHistorico]);

  // 🔥 OBSERVER
  const lastElementRef = useCallback(node => {
    if (loadingRef.current) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && temMais) {
        carregarDados(pagina);
      }
    });

    if (node) observer.current.observe(node);
  }, [temMais, carregarDados, pagina]);

  // 🔥 RESET TOTAL AO TROCAR TIPO
  useEffect(() => {
    document.title = "CR Metais | Histórico";

    setTableData([]);
    setPagina(0);
    setTemMais(true);

    loadingRef.current = false;

    // 🔥 garante execução após reset
    setTimeout(() => {
      carregarDados(0);
    }, 0);

  }, [tipoHistorico]);

  return (
    <div className={styles.containerPrincipal}>
      <main className={styles.conteudoPrincipal}>

        <div className={styles.barraTitulo}>
          <div className={styles.titulos}>
            <h1 className={styles.titulo}>
              Histórico de {tipoHistorico}
            </h1>

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
              setTipoHistorico(prev =>
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
            {tableData.map((produto, index) => {
              if (index === tableData.length - 1) {
                return (
                  <HistoricoList
                    key={`${produto.id}-${index}`}
                    produto={produto}
                    isEven={index % 2 === 0}
                    refProp={lastElementRef}
                  />
                );
              }

              return (
                <HistoricoList
                  key={`${produto.id}-${index}`}
                  produto={produto}
                  isEven={index % 2 === 0}
                />
              );
            })}
          </div>

          {loading && <p>Carregando...</p>}
        </div>
      </main>
    </div>
  );
}

export default Historico;