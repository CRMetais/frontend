import { useEffect, useState } from "react";
import styles from "../styles/DashboardStyle.module.css";
import { BarChart } from "@mui/x-charts/BarChart";

export default function Dashboard(){
    const [chartWidth, setChartWidth] = useState(600);
    const [topProdutos, setTopProdutos] = useState([]);
    const [topFornecedores, setTopFornecedores] = useState([]);
    const [carregandoGraficos, setCarregandoGraficos] = useState(false);
    const [erroGraficos, setErroGraficos] = useState("");

    const normalizarNumero = (valor) => {
        const numero = Number(valor);
        return Number.isNaN(numero) ? 0 : numero;
    };

    const normalizarLista = (dados) => {
        if (Array.isArray(dados)) return dados;
        if (Array.isArray(dados?.content)) return dados.content;
        return [];
    };

    const formatarPeso = (valor) => {
        return `${new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }).format(valor)} KG`;
    };

    const formatarMoeda = (valor) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(valor);
    };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setChartWidth(Math.min(width - 40, 350));
      } else if (width < 768) {
        setChartWidth(Math.min(width - 60, 500));
      } else if (width < 1200) {
        setChartWidth(Math.min(width - 100, 600));
      } else {
        setChartWidth(630);
      }
    };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const carregarGraficos = async () => {
            setCarregandoGraficos(true);
            setErroGraficos("");

            try {
                const [resProdutos, resFornecedores] = await Promise.all([
                    fetch("http://localhost:8080/produtos/top-peso-vendido"),
                    fetch("http://localhost:8080/fornecedores/top-rendimento"),
                ]);

                if (!resProdutos.ok || !resFornecedores.ok) {
                    throw new Error("Falha ao carregar dados dos gráficos");
                }

                const [dadosProdutos, dadosFornecedores] = await Promise.all([
                    resProdutos.json(),
                    resFornecedores.json(),
                ]);

                const produtosFormatados = normalizarLista(dadosProdutos)
                    .map((item) => ({
                        categoria:
                            item?.nome ||
                            item?.nomeProduto ||
                            item?.nome_produto ||
                            "Sem nome",
                        valor: normalizarNumero(
                            item?.totalPesoVendido ??
                            item?.total_peso_vendido ??
                            item?.pesoTotal ??
                            item?.total
                        ),
                    }))
                    .slice(0, 10);

                const fornecedoresFormatados = normalizarLista(dadosFornecedores)
                    .map((item) => ({
                        categoria:
                            item?.apelido ||
                            item?.nome ||
                            item?.razaoSocial ||
                            item?.razao_social ||
                            "Sem nome",
                        valor: normalizarNumero(
                            item?.totalRendimento ??
                            item?.total_rendimento ??
                            item?.rendimentoTotal ??
                            item?.total
                        ),
                    }))
                    .slice(0, 10);

                setTopProdutos(produtosFormatados);
                setTopFornecedores(fornecedoresFormatados);
            } catch {
                setErroGraficos("Não foi possível carregar os gráficos.");
                setTopProdutos([]);
                setTopFornecedores([]);
            } finally {
                setCarregandoGraficos(false);
            }
        };

        carregarGraficos();
    }, []);

    const pesoTotal = topProdutos.reduce(
        (acumulador, item) => acumulador + normalizarNumero(item.valor),
        0
    );

    const rendimentoTotal = topFornecedores.reduce(
        (acumulador, item) => acumulador + normalizarNumero(item.valor),
        0
    );

    const totalVendas = rendimentoTotal;

    return(
        <div className="container_dash">
            <div className="container_kpi">
                <div className="date_filter">
                    <div>
                        <p className="tit_data">Data inicial</p>
                        <input type="date" defaultValue="2025-09-01"/>
                    </div>
                    <div>
                        <p className="tit_data">Data final</p>
                        <input type="date" defaultValue="2025-10-01"/>
                    </div>
                </div>
                <div className="cards_kpi">
                    <div className="card_kpi">
                        <p className="titulo_kpi">Peso total:</p>
                        <div className="container_valor_card">
                            <p className="valor_kpi">
                                {carregandoGraficos ? '...' : formatarPeso(pesoTotal)}
                            </p>
                        </div>
                    </div>
                    <div className="card_kpi">
                        <p className="titulo_kpi">Rendimento:</p>
                        <div className="container_valor_card">
                            <p className="valor_kpi">
                                {carregandoGraficos ? '...' : formatarMoeda(rendimentoTotal)}
                            </p>
                        </div>
                    </div>
                    <div className="card_kpi">
                        <p className="titulo_kpi">Total de vendas:</p>
                        <div className="container_valor_card">
                            <p className="valor_kpi">
                                {carregandoGraficos ? '...' : formatarMoeda(totalVendas)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container_graficos">
                {carregandoGraficos && <p>Carregando gráficos...</p>}
                {!carregandoGraficos && erroGraficos && <p>{erroGraficos}</p>}

                <div className="grafico">
                    <h3>TOP 10 PRODUTOS</h3>
                    <BarChart
                        xAxis={[
                            {
                                id: 'barCategories',
                                data: topProdutos.map((item) => item.categoria),
                                scaleType: 'band',
                            },
                        ]}
                        series={[
                            {
                                data: topProdutos.map((item) => item.valor),
                                color: '#FACC15',
                            },
                        ]}
                        width={chartWidth}
                        height={400}
                    />
                </div>
                
                <div className="grafico">
                    <h3>TOP 10 FORNECEDORES</h3>
                    <BarChart
                        layout="horizontal"
                        yAxis={[
                            {
                                id: 'barCategories',
                                data: topFornecedores.map((item) => item.categoria),
                                scaleType: 'band',
                            },
                        ]}
                        series={[
                            {
                                data: topFornecedores.map((item) => item.valor),
                                color: '#60A5FA',
                            },
                        ]}
                        width={chartWidth}
                        height={400}
                    />
                </div>
            </div>
        </div>
    )
}