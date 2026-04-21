import api from "./apiClient";
import axios from "axios";


// 1. Cadastrar Cliente (POST)
export const cadastrarCliente = async (dadosCliente) => {
  return await api.post("/clientes", dadosCliente);
};

// 2. Listar todos os Clientes (GET)
export async function listarClientes() {
  const response = await api.get("/fornecedores");
  return response.data; // Retorna o JSON com a lista que vem do Spring
}

// 3. Deletar por ID (DELETE)
export async function excluirCliente(id) {
  return await api.delete(`/clientes/${id}`);
}

// 4. Atualizar dados (PUT)
export async function editarCliente(id, dados) {
  return await api.put(`/clientes/${id}`, dados);
}


// A que fizemos
export const deleteUser = async (id) => {
  try {
    await axios.delete(`http://localhost:8080/fornecedores/${id}`);
    alert("Fornecedor removido!");
    // Atualize sua lista local após o sucesso
  } catch (error) {
    console.error("Erro ao deletar:", error);
  }
};
