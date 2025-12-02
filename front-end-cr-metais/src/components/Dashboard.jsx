import "../styles/DashboardStyle.css";
import { BarChart } from '@mui/x-charts/BarChart';

export default function Dashboard(){
    return(
        <div className="container_dash">
            <div className="container_kpi">
                <div className="date_filter">
                    <div>
                        <p>Data inicial</p>
                        <input type="date" />
                    </div>
                    <div>
                        <p>Data final</p>
                        <input type="date" />
                    </div>
                </div>
                <div className="cards_kpi">
                    <div className="card_kpi">
                        <p className="titulo_kpi">Total de vendas</p>
                        <div className="container_valor_card">
                            <p>R$100.000,52</p>
                        </div>
                    </div>
                    <div className="card_kpi">
                        <p className="titulo_kpi">Total de vendas</p>
                        <div className="container_valor_card">
                            <p>R$100.000,52</p>
                        </div>
                    </div>
                    <div className="card_kpi">
                        <p className="titulo_kpi">Total de vendas</p>
                        <div className="container_valor_card">
                            <p>R$100.000,52</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container_graficos">
                <div className="grafico">
                    <h3>TOP 10 PRODUTOS</h3>
                    <BarChart
                        xAxis={[
                            {
                                id: 'barCategories',
                                data: ['Lata', 'Panela', 'Cobre misto', 'Perfil natural', 'Ferroso', 'Panela', 'Chaparia', 'Bloco Limpo', 'Fio misto', 'Bateria KG'],
                                scaleType: 'band',
                            },
                        ]}
                        series={[
                            {
                                data: [1000, 980, 920, 950, 940, 900, 950, 970, 960, 950],
                                color: '#FACC15',
                            },
                        ]}
                        width={600}
                        height={250}
                    />
                </div>
                
                <div className="grafico">
                    <h3>TOP 10 CLIENTES</h3>
                    <BarChart
                        layout="horizontal"
                        yAxis={[
                            {
                                id: 'barCategories',
                                data: ['José', 'Maria', 'Carlos', 'Manuel', 'Francisco', 'João', 'Ana', 'Diego', 'Roberto', 'Edson'],
                                scaleType: 'band',
                            },
                        ]}
                        series={[
                            {
                                data: [10000, 9500, 9200, 9000, 8800, 9100, 9150, 8500, 7000, 6000],
                                color: '#60A5FA',
                            },
                        ]}
                        width={600}
                        height={250}
                    />
                </div>
            </div>
        </div>
    )
}