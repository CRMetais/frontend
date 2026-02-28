import { useEffect, useMemo, useState } from "react";
import "../styles/TabelaPreco.css";


const TABELAS = ["VITAL", "TOCANTINS"];


const DATAS_PADRAO = ["17/10", "16/10", "15/10", "14/10", "13/10", "12/10", "11/10"];


function expandProdutosPorDatas(produtosBase, datas) {
  let id = 1;
  const rows = [];
  for (const p of produtosBase) {
    for (const d of datas) {
      rows.push({
        id: id++,
        nome: p.nome,
        peso: p.precos[d] ?? "—",
        data: d,
      });
    }
  }
  return rows;
}

const produtosBaseVital = [
  { nome: "Aerosol", precos: Object.fromEntries(DATAS_PADRAO.map(d => [d, "R$10,00"])) },
  { nome: "Aerosol Sujo", precos: Object.fromEntries(DATAS_PADRAO.map(d => [d, "R$3,00"])) },
  { nome: "Bateria KG", precos: { "17/10": "R$3,20", "16/10": "R$4,20", "15/10": "R$4,20", "14/10": "R$4,20", "13/10": "R$4,20", "12/10": "R$4,20", "11/10": "R$4,20" } },
  { nome: "Bloco BR", precos: Object.fromEntries(DATAS_PADRAO.map(d => [d, "R$3,50"])) },
  { nome: "Bloco limpo", precos: Object.fromEntries(DATAS_PADRAO.map(d => [d, "R$8,00"])) },
  { nome: "Bloco misto", precos: Object.fromEntries(DATAS_PADRAO.map(d => [d, "R$7,60"])) },
  { nome: "Bronze", precos: Object.fromEntries(DATAS_PADRAO.map(d => [d, "R$41,00"])) },
  { nome: "Cavaco de alumínio", precos: Object.fromEntries(DATAS_PADRAO.map(d => [d, "R$6,00"])) },
  { nome: "Cavaco de inox", precos: Object.fromEntries(DATAS_PADRAO.map(d => [d, "R$3,00"])) },
  { nome: "Cavaco de metal", precos: Object.fromEntries(DATAS_PADRAO.map(d => [d, "R$25,00"])) },
  { nome: "Chaparia", precos: Object.fromEntries(DATAS_PADRAO.map(d => [d, "R$9,70"])) },
  { nome: "Chumbo de roda", precos: Object.fromEntries(DATAS_PADRAO.map(d => [d, "R$7,70"])) },
  { nome: "Chumbo mole", precos: Object.fromEntries(DATAS_PADRAO.map(d => [d, "R$7,50"])) },
  { nome: "Cobre de quarta", precos: Object.fromEntries(DATAS_PADRAO.map(d => [d, "R$42,50"])) },
  { nome: "Cobre mel", precos: { "17/10": "R$58,10", "16/10": "R$53,10", "15/10": "R$53,10", "14/10": "R$53,10", "13/10": "R$53,10", "12/10": "R$53,10", "11/10": "R$53,10" } },
  { nome: "Cobre misto", precos: { "17/10": "R$51,00", "16/10": "R$49,00", "15/10": "R$49,00", "14/10": "R$49,00", "13/10": "R$49,00", "12/10": "R$49,00", "11/10": "R$49,00" } },
  { nome: "Ferroso", precos: Object.fromEntries(DATAS_PADRAO.map(d => [d, "R$1,10"])) },
  { nome: "Fio instalação", precos: Object.fromEntries(DATAS_PADRAO.map(d => [d, "R$30,50"])) },
  { nome: "Fio misto", precos: Object.fromEntries(DATAS_PADRAO.map(d => [d, "R$16,50"])) },
];

const produtosBaseTocantins = [
  // Pode ser igual por enquanto, mas já está separado pra trocar depois
  ...produtosBaseVital,
  { nome: "Inox", precos: Object.fromEntries(DATAS_PADRAO.map(d => [d, "R$4,40"])) },
];

const MOCK_DB = {
  VITAL: expandProdutosPorDatas(produtosBaseVital, DATAS_PADRAO),
  TOCANTINS: expandProdutosPorDatas(produtosBaseTocantins, DATAS_PADRAO),
};


async function fetchPrecosPorTabela(tabela, useMock = true) {
  if (useMock) {
    // simulando latência
    await new Promise((r) => setTimeout(r, 150));
    return MOCK_DB[tabela] ?? [];
  }


  // const res = await fetch(`/api/precos?vendedor=${encodeURIComponent(tabela)}`);
  // if (!res.ok) throw new Error(`Erro ao buscar dados (${res.status})`);
  // const data = await res.json();
  // return data;

  return [];
}

/**
 * Monta modelo pra tabela:
 * - datas: colunas
 * - produtos: linhas
 * - valueMap: lookup rápido por (nome,data)
 */
function buildTableModel(rows) {
  const dateSet = new Set();
  const productSet = new Set();
  const valueMap = new Map();

  for (const r of rows) {
    const nome = String(r.nome ?? "").trim();
    const data = String(r.data ?? "").trim();
    const peso = String(r.peso ?? "—").trim();
    if (!nome || !data) continue;

    dateSet.add(data);
    productSet.add(nome);
    valueMap.set(`${nome}__${data}`, peso);
  }

  // Ordena dd/mm desc (bom dentro do mesmo mês)
  const datas = Array.from(dateSet).sort((a, b) => {
    const [da, ma] = a.split("/").map(Number);
    const [db, mb] = b.split("/").map(Number);
    if (mb !== ma) return mb - ma;
    return db - da;
  });

  const produtos = Array.from(productSet).sort((a, b) =>
    a.localeCompare(b, "pt-BR")
  );

  return { datas, produtos, valueMap };
}

/**
 * "R$58,10" -> 58.10
 * "—" / vazio -> null
 */
function parseBRL(brl) {
  if (!brl) return null;
  const s = String(brl).trim();
  if (s === "—") return null;

  // remove "R$", espaços, pontos de milhar, troca vírgula por ponto
  const cleaned = s
    .replace("R$", "")
    .replace(/\s/g, "")
    .replace(/\./g, "")
    .replace(",", ".");

  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

/**
 * Regra de cor:
 * compara o valor da data atual com a data "anterior" (mais antiga).
 * Como datas estão em ordem desc (17/10, 16/10, ...),
 * a "anterior" é a coluna à direita (index+1).
 */
function getTrendClass(currentStr, prevStr) {
  const current = parseBRL(currentStr);
  const prev = parseBRL(prevStr);

  if (current === null || prev === null) return ""; // sem cor se não der pra comparar
  if (current > prev) return "cellUp";
  if (current < prev) return "cellDown";
  return "";
}

export default function PrecosVenda() {
  const [tabela, setTabela] = useState(TABELAS[0]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  // Troque pra false quando tiver API
  const useMock = true;

  useEffect(() => {
    let alive = true;

    async function load() {
      setLoading(true);
      setErro("");

      try {
        const data = await fetchPrecosPorTabela(tabela, useMock);
        if (!alive) return;
        if (!Array.isArray(data)) throw new Error("Backend precisa retornar um ARRAY");
        setRows(data);
      } catch (e) {
        if (!alive) return;
        setRows([]);
        setErro(e?.message || "Erro ao carregar dados");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [tabela]);

  const { datas, produtos, valueMap } = useMemo(() => buildTableModel(rows), [rows]);

  return (
    <div className="page">
      <div className="card">
        <div className="headerYellow">PREÇOS VENDA - {tabela}</div>

        <div className="body">
          {/* ===== TABELA ===== */}
          <div className="tableWrap">
            {loading && <div className="status">Carregando…</div>}
            {!loading && erro && <div className="status error">{erro}</div>}
            {!loading && !erro && rows.length === 0 && (
              <div className="status">Sem dados para exibir.</div>
            )}

            <table className="table">
              <thead>
                <tr>
                  <th className="th thLeft">Produto</th>
                  {datas.map((d) => (
                    <th key={d} className="th">
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {produtos.map((nome) => (
                  <tr key={nome} className="trHover">
                    <td className="td tdLeft">{nome}</td>

                    {datas.map((d, idx) => {
                      const current = valueMap.get(`${nome}__${d}`) ?? "—";
                      const prevDate = datas[idx + 1]; // mais antigo
                      const prev = prevDate ? (valueMap.get(`${nome}__${prevDate}`) ?? "—") : null;

                      const trendClass = prevDate ? getTrendClass(current, prev) : "";

                      return (
                        <td key={d} className={`td ${trendClass}`}>
                          {current}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ===== LADO DIREITO ===== */}
          <div className="side">
            <div className="sideLabel">Selecione a tabela:</div>

            <select
              className="select"
              value={tabela}
              onChange={(e) => setTabela(e.target.value)}
            >
              {TABELAS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <div className="hint">
              {loading ? "Atualizando…" : `Registros: ${rows.length}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}