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

export const baixarHistoricoCsv = async (tipo, dataInicio, dataFim) => {
  try {

    // URL da Lambda — após deploy, coloque no .env:
    // REACT_APP_LAMBDA_URL=https://xxxxxx.lambda-url.us-east-1.on.aws/
    const lambdaUrl = import.meta.env.VITE_LAMBDA_URL;

    const url = `${lambdaUrl}?tipo=${tipo}&dataInicio=${dataInicio}&dataFim=${dataFim}`;

    const response = await fetch(url, { method: "GET" });

    if (!response.ok) throw new Error("Erro ao chamar Lambda");

    const urlDownload = await response.text();

    return urlDownload;

  } catch (error) {
    console.error("Erro ao baixar CSV:", error);
    throw error;
  }
};