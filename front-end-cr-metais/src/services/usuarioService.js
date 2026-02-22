import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080"
});

export const cadastrarUsuario = async (dadosUsuario) => {
  try {
    const response = await api.post("/usuarios", dadosUsuario);
    return response;
  } catch (error) {
    throw error;
  }
};

export async function listarUsuarios() {
  const response = await api.get("/usuarios");
  return response.data;
}

export async function excluirUsuario(id) {
  return await api.delete(`/usuarios/${id}`);
}

export async function editarUsuario(id, dados) {
  return await api.put(`/usuarios/${id}`, dados);
}