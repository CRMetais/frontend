import api from "./apiClient";

export const buscarHistorico = async (tipo) => {
  try {
    const response = await api.get("/historico", {
      params: { tipo }
    });

    return response.data;

  } catch (error) {
    console.error("Erro ao buscar histórico:", error);
    throw error;
  }
};