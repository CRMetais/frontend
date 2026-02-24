import { useEffect, useState } from "react";
import styles from "../styles/DashboardStyle.module.css";
import { BarChart } from "@mui/x-charts/BarChart";

export default function Dashboard() {
  const [chartWidth, setChartWidth] = useState(600);

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
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.container_dash}>
      <div className={styles.container_kpi}>
        <div className={styles.date_filter}>
          <div>
            <p className={styles.tit_data}>Data inicial</p>
            <input type="date" defaultValue="2025-09-01" className={styles.input}/>
          </div>
          <div>
            <p className={styles.tit_data}>Data final</p>
            <input type="date" defaultValue="2025-10-01" className={styles.input}/>
          </div>
        </div>

        <div className={styles.cards_kpi}>
          <div className={styles.card_kpi}>
            <p className={styles.titulo_kpi}>Peso total:</p>
            <div className={styles.container_valor_card}>
              <p className={styles.valor_kpi}>28.586 KG</p>
            </div>
          </div>

          <div className={styles.card_kpi}>
            <p className={styles.titulo_kpi}>Rendimento:</p>
            <div className={styles.container_valor_card}>
              <p className={styles.valor_kpi}>R$25.458,52</p>
            </div>
          </div>

          <div className={styles.card_kpi}>
            <p className={styles.titulo_kpi}>Total de vendas:</p>
            <div className={styles.container_valor_card}>
              <p className={styles.valor_kpi}>R$100.000,52</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.container_graficos}>
        <div className={styles.grafico}>
          <h3 className={styles.titulo_grafico}>TOP 10 PRODUTOS</h3>
          <BarChart
            xAxis={[{
              id: "barCategories",
              data: ["Lata","Panela","Cobre misto","Perfil natural","Ferroso","Panela","Chaparia","Bloco Limpo","Fio misto","Bateria KG"],
              scaleType: "band",
            }]}
            series={[{
              data: [1000, 980, 920, 950, 940, 900, 950, 970, 960, 950],
              color: "#FACC15",
            }]}
            width={chartWidth}
            height={400}
          />
        </div>

        <div className={styles.grafico}>
          <h3 className={styles.titulo_grafico}>TOP 10 CLIENTES</h3>
          <BarChart
            layout="horizontal"
            yAxis={[{
              id: "barCategories",
              data: ["José","Maria","Carlos","Manuel","Francisco","João","Ana","Diego","Roberto","Edson"],
              scaleType: "band",
            }]}
            series={[{
              data: [10000, 9500, 9200, 9000, 8800, 9100, 9150, 8500, 7000, 6000],
              color: "#60A5FA",
            }]}
            width={chartWidth}
            height={400}
          />
        </div>
      </div>
    </div>
  );
}