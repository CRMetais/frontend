import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import "../styles/TabelaPreco.css";
import "../styles/TabelasCompra.css";
import { isUsuarioComum } from "../services/usuarioService";
import {
  fetchPrecosPorTabela,
  fetchNomesTabelasCompra,
  cadastrarTabelaCompra,
  fetchTodosProdutos,
  salvarPrecosEmLote,
} from "../services/tabelaPrecoService";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isoParaDDMM(iso) {
  if (!iso) return "—";
  const [, m, d] = String(iso).split("-");
  return `${d}/${m}`;
}

function isoParaExtenso(iso) {
  if (!iso) return "";
  const [ano, m, d] = iso.split("-");
  const meses = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];
  return `${d}/${meses[parseInt(m, 10) - 1]}/${ano}`;
}

function hojeISO() { return new Date().toISOString().slice(0, 10); }

function parseBRL(valor) {
  if (valor === null || valor === undefined || valor === "—" || valor === "") return null;
  if (typeof valor === "number") return valor;
  const cleaned = String(valor)
    .replace("R$", "").replace(/\s/g, "").replace(/\./g, "").replace(",", ".");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

function formatBRL(valor) {
  if (valor === null || valor === undefined) return "—";
  return `R$ ${Number(valor).toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}

function separarProdutos(produtos) {
  const pc = [];
  const ferro = [];
  const metais = [];
  for (const p of produtos) {
    if (p.startsWith("PC - ")) pc.push(p);
    else if (p.startsWith("Ferro ")) ferro.push(p);
    else metais.push(p);
  }
  return { metais, pc, ferro };
}

/**
 * Margem = precoVital - precoCliente
 * Positiva = cliente paga menos que vital (bom)
 * Negativa = cliente paga mais que vital (ruim)
 */
function calcMargem(precoCliente, precoVital) {
  const c = parseBRL(precoCliente);
  const v = parseBRL(precoVital);
  if (c === null || v === null) return null;
  return Math.round((v - c) * 100) / 100;
}

function corMargem(margem) {
  if (margem === null) return { bg: "transparent", color: "#aaa" };
  if (margem > 2)    return { bg: "#dcfce7", color: "#15803d" };
  if (margem > 1)    return { bg: "#fef9c3", color: "#a16207" };
  if (margem > 0.5)  return { bg: "#ffedd5", color: "#c2410c" };
  return               { bg: "#fee2e2", color: "#b91c1c" };
}

function buildTableModel(rows, todosProdutos = [], tabelaNova = false) {
  const productSet = new Set();
  const valueMap = new Map();
  let versao = null;
  let dataAtual = null;

  const produtosVistos = new Set();
  for (const r of rows) {
    const nome = String(r.nomeTabela ?? "").trim();
    const iso = String(r.dataInicioValidade ?? "").trim();
    const preco = r.precoProduto ?? null;
    if (!nome) continue;
    if (!produtosVistos.has(nome)) {
      produtosVistos.add(nome);
      productSet.add(nome);
      valueMap.set(nome, preco);
      if (!versao) versao = r.versao;
      if (!dataAtual) dataAtual = iso;
    }
  }

  if (tabelaNova) {
    dataAtual = hojeISO();
    versao = 1.0;
    for (const p of todosProdutos) productSet.add(p.nome);
  }

  const produtos = Array.from(productSet).sort((a, b) => a.localeCompare(b, "pt-BR"));
  return { produtos, valueMap, versao, dataAtual };
}

// ─── Modal nova tabela ────────────────────────────────────────────────────────

function ModalNovaTabela({ onConfirmar, onCancelar, salvando }) {
  const [nome, setNome] = useState("");
  const [erro, setErro] = useState("");

  function handleConfirmar() {
    const nomeTrimmed = nome.trim().toUpperCase();
    if (!nomeTrimmed) { setErro("O nome e obrigatorio."); return; }
    setErro("");
    onConfirmar(nomeTrimmed);
  }

  return (
    <div className="modalOverlay">
      <div className="modal-container-cliente" style={{ maxWidth: "460px" }}>
        <div className="modal-header-cliente">
          <h2 style={{ margin: 0, color: "#020618", fontSize: "1.1rem", fontWeight: 700 }}>
            Nova tabela de compra
          </h2>
        </div>
        <div style={{ padding: "16px 0" }}>
          <label style={{ fontSize: "0.85rem", color: "#314158", fontWeight: 500, display: "block", marginBottom: "6px" }}>
            Nome da tabela
          </label>
          <input
            style={{
              width: "100%", padding: "9px 12px", border: "1px solid #ccc",
              borderRadius: "6px", fontSize: "0.9rem", fontFamily: "inherit",
              color: "#020618", outline: "none", boxSizing: "border-box",
              textTransform: "uppercase",
            }}
            placeholder="Ex: PADRAO"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleConfirmar()}
            autoFocus
          />
          {erro && <span style={{ color: "#dc2626", fontSize: "0.8rem", display: "block", marginTop: "4px" }}>{erro}</span>}
          <span style={{ color: "#6b7280", fontSize: "0.78rem", lineHeight: 1.5, display: "block", marginTop: "6px" }}>
            Sera criada com tipo Compra, versao 1.0 e data de inicio hoje.
          </span>
        </div>
        <div className="modal-footer" style={{ gap: "8px" }}>
          <button
            style={{ padding: "8px 20px", background: "#dc2626", color: "white", border: "none", borderRadius: "6px", fontSize: "0.85rem", fontWeight: 500, cursor: "pointer" }}
            onClick={onCancelar} disabled={salvando}
          >
            Fechar
          </button>
          <button
            style={{ padding: "8px 20px", background: "#2ecc71", color: "white", border: "none", borderRadius: "6px", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer" }}
            onClick={handleConfirmar} disabled={salvando}
          >
            {salvando ? "Criando..." : "Criar tabela"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-tabela ───────────────────────────────────────────────────────────────

function SubTabela({ titulo, produtos, valueMap, vitalMap, edits, onCellChange, onCellBlur, isEditavel, obs }) {
  if (produtos.length === 0) return null;

  return (
    <div className="compraSubTabela">
      <div className="compraSubHeader">{titulo}</div>
      <table className="compraTable">
        <thead>
          <tr>
            <th className="compraTh compraTthLeft">Produto</th>
            <th className="compraTh">Preco (R$)</th>
            <th className="compraTh">Margem</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((nome, i) => {
            const precoCliente = valueMap.get(nome) ?? null;
            const precoVital   = vitalMap.get(nome) ?? null;
            const margem       = calcMargem(precoCliente, precoVital);
            const { bg, color } = corMargem(margem);
            const valorEdit    = edits[nome];
            const displayValue = valorEdit !== undefined ? valorEdit : formatBRL(precoCliente);

            return (
              <tr key={nome} style={{ background: i % 2 === 0 ? "#ffffff" : "#f4f4f5" }} className="compraRow">
                <td className="compraTd compraTdLeft">{nome}</td>

                <td className="compraTd">
                  {isEditavel ? (
                    <input
                      className={`cellInput ${valorEdit !== undefined ? "cellInputDirty" : ""}`}
                      value={displayValue}
                      onChange={(e) => onCellChange(nome, e.target.value)}
                      onFocus={(e) => e.target.select()}
                      onBlur={(e) => onCellBlur(nome, e.target.value)}
                    />
                  ) : displayValue}
                </td>

                <td className="compraTd" style={{ background: bg, color, fontWeight: 700, fontSize: "0.85dvw" }}>
                  {margem !== null ? formatBRL(margem) : "—"}
                </td>
              </tr>
            );
          })}
          {obs && (
            <tr>
              <td colSpan={3} style={{ padding: "5px 8px", fontStyle: "italic", fontSize: "0.78dvw", color: "#666", textAlign: "center" }}>
                {obs}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// ─── Preview para copiar como imagem ─────────────────────────────────────────

function PreviewImagem({ produtos, valueMap, onFechar }) {
  const previewRef = useRef(null);
  const [copiando, setCopiando] = useState(false);
  const [copiado, setCopiado] = useState(false);

  const { metais, pc, ferro } = separarProdutos(produtos);

  // Data de hoje formatada para exibir na imagem
  const dataHoje = isoParaExtenso(hojeISO());

  // async function handleCopiar() {
  //   if (!previewRef.current) return;
  //   setCopiando(true);
  //   try {
  //     const html2canvas = (await import("html2canvas")).default;
  //     const canvas = await html2canvas(previewRef.current, {
  //       scale: 2,
  //       backgroundColor: "#ffffff",
  //       useCORS: true,
  //     });
  //     canvas.toBlob(async (blob) => {
  //       if (!blob) return;
  //       await navigator.clipboard.write([
  //         new ClipboardItem({ "image/png": blob }),
  //       ]);
  //       setCopiado(true);
  //       setTimeout(() => setCopiado(false), 3000);
  //     }, "image/png");
  //   } catch (e) {
  //     console.error("Erro ao copiar imagem:", e);
  //   } finally {
  //     setCopiando(false);
  //   }
  // }

  return (
    <div className="modalOverlay">
      <div className="previewModal">
        <div className="previewModalHeader">
          <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "#020618" }}>
            Copiar tabela como imagem
          </span>
          <button
            onClick={onFechar}
            style={{ background: "#dc2626", border: "none", color: "white", borderRadius: "6px", padding: "5px 14px", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem" }}
          >
            Fechar
          </button>
        </div>

        {/* Area capturada — sem versão nem nome da tabela */}
        <div ref={previewRef} className="previewConteudo">
          <div className="previewHeaderImg">
            <div className="previewLogo">
              <span style={{ fontWeight: 900, fontSize: "1.3rem", color: "#020618" }}>CR</span>
              <span style={{ fontWeight: 400, fontSize: "1.3rem", color: "#020618" }}>|metais</span>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 700, fontSize: "1rem", color: "#020618" }}>
                TABELA DE PRECOS (DIARIA)
              </div>
              <div style={{ fontSize: "0.85rem", color: "#314158" }}>{dataHoje}</div>
            </div>
          </div>

          <div className="previewTabelas">
            {metais.length > 0 && (
              <div className="previewSubTabela">
                <div className="previewSubHeader">METAIS</div>
                <table className="previewTable">
                  <thead>
                    <tr>
                      <th className="previewTh previewThLeft">Produto</th>
                      <th className="previewTh">Preco (R$)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metais.map((nome, i) => (
                      <tr key={nome} style={{ background: i % 2 === 0 ? "#fff" : "#f4f4f5" }}>
                        <td className="previewTd previewTdLeft">{nome}</td>
                        <td className="previewTd">{formatBRL(valueMap.get(nome))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="previewColunaDireita">
              {pc.length > 0 && (
                <div className="previewSubTabela">
                  <div className="previewSubHeader">PLACAS ELETRONICAS</div>
                  <table className="previewTable">
                    <thead>
                      <tr>
                        <th className="previewTh previewThLeft">Produto</th>
                        <th className="previewTh">Preco (R$)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pc.map((nome, i) => (
                        <tr key={nome} style={{ background: i % 2 === 0 ? "#fff" : "#f4f4f5" }}>
                          <td className="previewTd previewTdLeft">{nome}</td>
                          <td className="previewTd">{formatBRL(valueMap.get(nome))}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {ferro.length > 0 && (
                <div className="previewSubTabela" style={{ marginTop: "12px" }}>
                  <div className="previewSubHeader">FERRO</div>
                  <table className="previewTable">
                    <thead>
                      <tr>
                        <th className="previewTh previewThLeft">Produto</th>
                        <th className="previewTh">Preco (R$)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ferro.map((nome, i) => (
                        <tr key={nome} style={{ background: i % 2 === 0 ? "#fff" : "#f4f4f5" }}>
                          <td className="previewTd previewTdLeft">{nome}</td>
                          <td className="previewTd">{formatBRL(valueMap.get(nome))}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div style={{ fontSize: "0.7rem", fontStyle: "italic", color: "#666", textAlign: "center", padding: "3px" }}>
                    Obs. Ferro somente entrega
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "14px", gap: "12px" }}>
          {copiado && (
            <span style={{ color: "#16a34a", fontWeight: 600, fontSize: "0.85rem" }}>
              Imagem copiada com sucesso!
            </span>
          )}
          <button
            onClick={handleCopiar}
            disabled={copiando}
            style={{
              background: "#020618", color: "white", border: "none", borderRadius: "8px",
              padding: "10px 24px", fontSize: "0.9rem", fontWeight: 700, cursor: "pointer",
            }}
          >
            {copiando ? "Gerando..." : "Copiar tabela"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function TabelaPrecoCompra({ onVoltar }) {
  const usuarioComum = isUsuarioComum();

  const [tabelas, setTabelas]           = useState([]);
  const [tabela, setTabela]             = useState("");
  const [rows, setRows]                 = useState([]);
  const [vitalRows, setVitalRows]       = useState([]);
  const [todosProdutos, setTodosProdutos] = useState([]);
  const [tabelaNova, setTabelaNova]     = useState(false);
  const [loading, setLoading]           = useState(false);
  const [salvando, setSalvando]         = useState(false);
  const [criandoTabela, setCriandoTabela] = useState(false);
  const [showModal, setShowModal]       = useState(false);
  const [showPreview, setShowPreview]   = useState(false);
  const [erro, setErro]                 = useState("");
  const [sucesso, setSucesso]           = useState("");
  const [edits, setEdits]               = useState({});

  const carregarTabelas = useCallback(async () => {
    try {
      const nomes = await fetchNomesTabelasCompra();
      setTabelas(nomes);
      if (nomes.length > 0 && !tabela) setTabela(nomes[0]);
    } catch { setTabelas([]); }
  }, [tabela]);

  useEffect(() => { carregarTabelas(); }, []);

  useEffect(() => {
    fetchTodosProdutos()
      .then((d) => setTodosProdutos(Array.isArray(d) ? d : []))
      .catch(() => setTodosProdutos([]));
  }, []);

  // Carrega preços da VITAL para margem — apenas uma vez
  useEffect(() => {
    fetchPrecosPorTabela("VITAL")
      .then((d) => setVitalRows(Array.isArray(d) ? d : []))
      .catch(() => setVitalRows([]));
  }, []);

  const carregarDados = useCallback(async (t) => {
    if (!t) return;
    setLoading(true); setErro(""); setSucesso(""); setEdits({}); setTabelaNova(false);
    try {
      const data = await fetchPrecosPorTabela(t);
      setRows(Array.isArray(data) ? data : []);
      if (!data || data.length === 0) setTabelaNova(true);
    } catch (e) {
      setRows([]);
      setErro(e?.response?.data?.message || e?.message || "Erro ao carregar dados");
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { if (tabela) carregarDados(tabela); }, [tabela, carregarDados]);
  useEffect(() => { document.title = "CR Metais | Tabelas Cliente"; }, []);

  const { produtos, valueMap, versao, dataAtual } = useMemo(
    () => buildTableModel(rows, todosProdutos, tabelaNova),
    [rows, todosProdutos, tabelaNova]
  );

  // Mapa de preços VITAL — só versão mais recente por produto
  const vitalMap = useMemo(() => {
    const m = new Map();
    const vistos = new Set();
    for (const r of vitalRows) {
      const nome = String(r.nomeTabela ?? "").trim();
      if (!nome || vistos.has(nome)) continue;
      vistos.add(nome);
      m.set(nome, r.precoProduto ?? null);
    }
    return m;
  }, [vitalRows]);

  const { metais, pc, ferro } = useMemo(() => separarProdutos(produtos), [produtos]);

  function handleCellChange(nome, valor) {
    setEdits((prev) => ({ ...prev, [nome]: valor }));
  }

  function handleCellBlur(nome, valorDigitado) {
    const nDigitado = parseBRL(valorDigitado);
    const nOriginal = parseBRL(valueMap.get(nome));
    if (nDigitado === null || nDigitado === nOriginal) {
      setEdits((prev) => { const next = { ...prev }; delete next[nome]; return next; });
      return;
    }
    handleCellChange(nome, formatBRL(nDigitado));
  }

  async function handleSalvar() {
    setSalvando(true); setErro(""); setSucesso("");
    try {
      const itens = produtos
        .map((nome) => {
          const valorFinal = edits[nome] !== undefined ? edits[nome] : valueMap.get(nome);
          return { nomeProduto: nome, preco: parseBRL(valorFinal) };
        })
        .filter((i) => i.preco !== null && i.preco > 0);
      await salvarPrecosEmLote(tabela, itens);
      setSucesso("Precos salvos. Nova versao criada.");
      setTabelaNova(false);
      await carregarDados(tabela);
    } catch (e) {
      setErro(e?.response?.data?.message || e?.message || "Erro ao salvar");
    } finally { setSalvando(false); }
  }

  async function handleCriarTabela(nomeTabela) {
    setCriandoTabela(true); setErro("");
    try {
      await cadastrarTabelaCompra(nomeTabela);
      await carregarTabelas();
      setTabela(nomeTabela);
      setShowModal(false);
      setSucesso(`Tabela "${nomeTabela}" criada.`);
    } catch (e) {
      setErro(e?.response?.data?.message || e?.message || "Erro ao criar tabela");
      setShowModal(false);
    } finally { setCriandoTabela(false); }
  }

  const temEdicoes = Object.keys(edits).length > 0;
  const qtdEdicoes = Object.keys(edits).length;

  // Mapa consolidado com edições para o preview
  const valueMapComEdits = useMemo(() => {
    const m = new Map(valueMap);
    for (const [nome, valor] of Object.entries(edits)) {
      const n = parseBRL(valor);
      if (n !== null) m.set(nome, n);
    }
    return m;
  }, [valueMap, edits]);

  return (
    <div className="page">
      {showModal && (
        <ModalNovaTabela
          onConfirmar={handleCriarTabela}
          onCancelar={() => setShowModal(false)}
          salvando={criandoTabela}
        />
      )}

      {showPreview && (
        <PreviewImagem
          produtos={produtos}
          valueMap={valueMapComEdits}
          onFechar={() => setShowPreview(false)}
        />
      )}

      <div className="card">
        <div className="headerYellow" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
          TABELAS CLIENTE - {tabela}
          {versao && <span className="versaoBadge">v{versao}</span>}
        </div>

        <div className="body">
          {/* ── TABELAS ── */}
          <div className="tableWrap">
            {loading && <div className="status">Carregando...</div>}
            {!loading && erro && <div className="status error">{erro}</div>}
            {!loading && sucesso && <div className="status" style={{ color: "#16a34a" }}>{sucesso}</div>}

            {!loading && (
              <div className="compraLayout">
                <div className="compraColuna">
                  <SubTabela
                    titulo="PRODUTOS"
                    produtos={metais}
                    valueMap={valueMap}
                    vitalMap={vitalMap}
                    edits={edits}
                    onCellChange={handleCellChange}
                    onCellBlur={handleCellBlur}
                    isEditavel={!usuarioComum}
                  />
                </div>

                <div className="compraColuna">
                  <SubTabela
                    titulo="PRODUTOS"
                    produtos={pc}
                    valueMap={valueMap}
                    vitalMap={vitalMap}
                    edits={edits}
                    onCellChange={handleCellChange}
                    onCellBlur={handleCellBlur}
                    isEditavel={!usuarioComum}
                  />
                  <div style={{ marginTop: "16px" }}>
                    <SubTabela
                      titulo="FERRO"
                      produtos={ferro}
                      valueMap={valueMap}
                      vitalMap={vitalMap}
                      edits={edits}
                      onCellChange={handleCellChange}
                      onCellBlur={handleCellBlur}
                      isEditavel={!usuarioComum}
                      obs="Obs. Ferro somente entrega"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── PAINEL LATERAL ── */}
          <div className="side">
            <div className="sideLabel">Selecione a tabela:</div>
            <select
              className="select"
              value={tabela}
              onChange={(e) => setTabela(e.target.value)}
              disabled={loading}
            >
              {tabelas.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>

            {!usuarioComum && (
              <button className="btnNovaTabela" onClick={() => setShowModal(true)} disabled={loading}>
                + Nova tabela
              </button>
            )}

            <div className="hint">
              {loading ? "Atualizando..." : `${produtos.length} produto(s)`}
              {versao && !loading && <><br /><strong>Versao: v{versao}</strong></>}
              {dataAtual && !loading && <><br />Atualizado: {isoParaExtenso(dataAtual)}</>}
            </div>

            {!usuarioComum && (
              <>
                <button
                  className={`btnSalvar ${temEdicoes ? "btnSalvarAtivo" : ""}`}
                  onClick={handleSalvar}
                  disabled={salvando || loading || !temEdicoes}
                >
                  {salvando ? "Salvando..." : "Salvar precos de hoje"}
                </button>
                {temEdicoes && (
                  <div className="hint hintWarning">{qtdEdicoes} preco(s) alterado(s)</div>
                )}
                <button
                  className="btnCancelar"
                  onClick={() => setEdits({})}
                  disabled={!temEdicoes || salvando}
                >
                  Cancelar edicoes
                </button>
              </>
            )}

            <button
              className="btnCopiarTabela"
              onClick={() => setShowPreview(true)}
              disabled={loading || produtos.length === 0}
            >
              Copiar tabela
            </button>

            <div style={{ marginTop: "auto", paddingTop: "16px", borderTop: "1px solid gainsboro" }}>
              <button className="btnCompra" onClick={onVoltar}>
                Tabelas Venda
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
