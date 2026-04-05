import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: "http://localhost:8080"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export function getUsuarioLogadoId() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return Number(decoded.idUsuario ?? decoded.sub);
  } catch (e) {
    return null;
  }
}

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