import api from "./apiClient";

/**
 * Busca todos os preços de uma tabela pelo nome.
 * Retorna lista de { nomeTabela, dataInicioValidade, precoProduto, versao }
 */
export async function fetchPrecosPorTabela(nomeTabela) {
  const response = await api.get("/tabelas-precos/precos", {
    params: { nome: nomeTabela },
  });
  if (response.status === 204) return [];
  return response.data;
}

/**
 * Busca nomes únicos de todas as tabelas de VENDA (tipo = V).
 */
export async function fetchNomesTabelasVenda() {
  const response = await api.get("/tabelas-precos/venda");
  if (response.status === 204) return [];
  const nomes = [...new Set(response.data.map((t) => t.nomeTabela))];
  return nomes.sort();
}

/**
 * Cadastra uma nova tabela de venda.
 * Backend preenche tipo=V, versao=1.0, dataInicio=hoje, ativa=true.
 */
export async function cadastrarTabelaVenda(nomeTabela) {
  const response = await api.post("/tabelas-precos/venda", { nomeTabela });
  return response.data;
}

/**
 * Busca todos os produtos cadastrados no banco.
 * Usado para montar linhas de tabela nova (sem preços ainda).
 */
export async function fetchTodosProdutos() {
  const response = await api.get("/produtos");
  if (response.status === 204) return [];
  return response.data;
}

/**
 * Salva preços em lote para hoje.
 * Cria nova versão da tabela e insere os preços vinculados.
 */
export async function salvarPrecosEmLote(nomeTabela, itens) {
  await api.post("/preco-produtos-tabelas/lote", { nomeTabela, itens });
}