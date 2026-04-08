import api from "./apiClient";

export const buscarHistorico = async (tipo, pagina = 0, tamanho = 10) => {
  try {
    const response = await api.get("/historico", {
      params: {
        tipo,
        pagina,   // ✅ igual backend
        tamanho   // ✅ igual backend
      }
    });

    return response.data;

  } catch (error) {
    console.error("Erro ao buscar histórico:", error);
    throw error;
  }
};