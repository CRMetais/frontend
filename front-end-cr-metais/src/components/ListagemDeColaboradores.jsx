import React, { useState, useEffect } from "react";
import "../styles/ListagemDeColaboradoresStyle.css";
import CadastroColaboradorModal from "./CadastroColaborador";
import { listarUsuarios, excluirUsuario, editarUsuario } from "../services/usuarioService";

const ColaboradorItem = ({ colaborador, onAcoesClick }) => {
  return (
    <div className="colaborador-line">
      <div className="colaborador-item">
        <span className="colaborador-nome">{colaborador.nome}</span>
        <span className="colaborador-email">{colaborador.email}</span>
        <button className="btn-acoes" onClick={() => onAcoesClick(colaborador)}>
          Ações
        </button>
      </div>
      <div className="divisao"></div>
    </div>
  );
};

const ListaColaboradores = () => {
  const [colaboradores, setColaboradores] = useState([]);
  const [colaboradorSelecionado, setColaboradorSelecionado] = useState(null);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [dadosEditados, setDadosEditados] = useState({});

  const carregarUsuarios = async () => {
    try {
      const usuarios = await listarUsuarios();
      const usuariosFormatados = usuarios.map(u => ({
        id: u.idUsuario,
        nome: u.nome,
        email: u.email,
        cargo: u.cargo
      }));
      setColaboradores(usuariosFormatados);
    } catch (erro) {
      console.error("Erro ao buscar usuários:", erro);
      alert("Erro ao carregar colaboradores!");
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const abrirModal = (colaborador) => {
    setColaboradorSelecionado(colaborador);
    setDadosEditados(colaborador);
    setModoEdicao(false);
  };

  const excluirColaborador = async (id) => {
    try {
      await excluirUsuario(id);
      await carregarUsuarios();
      setColaboradorSelecionado(null);
    } catch (erro) {
      console.error("Erro ao excluir:", erro);
      alert("Erro ao excluir colaborador!");
    }
  };

  const salvarAlteracoes = async () => {
    try {
      await editarUsuario(dadosEditados.id, {
        nome: dadosEditados.nome,
        email: dadosEditados.email,
        cargo: dadosEditados.cargo
      });
      await carregarUsuarios();
      setColaboradorSelecionado(null);
      setModoEdicao(false);
    } catch (erro) {
      console.error("Erro ao editar:", erro);
      alert("Erro ao salvar alterações!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDadosEditados((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="lista-colaboradores-page">
      <div className="lista-colaboradores-container">
        <h1 className="lista-colaboradores-titulo">Colaboradores</h1>
        <div className="lista-colaboradores-grid">
          {colaboradores.map((colaborador) => (
            <ColaboradorItem
              key={colaborador.id}
              colaborador={colaborador}
              onAcoesClick={abrirModal}
            />
          ))}
        </div>
      </div>

      {colaboradorSelecionado && (
        <div className="modal-overlay" onClick={() => setColaboradorSelecionado(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setColaboradorSelecionado(null)}>
              ×
            </button>
            <h1 className="modal-title">
              {modoEdicao ? "Editar Colaborador" : colaboradorSelecionado.nome}
            </h1>
            <div className="modal-fields">
              {modoEdicao ? (
                <>
                  <input name="nome" value={dadosEditados.nome} onChange={handleChange} className="modal-input" />
                  <input name="email" value={dadosEditados.email} onChange={handleChange} className="modal-input" />
                  <input name="cargo" value={dadosEditados.cargo} onChange={handleChange} className="modal-input" />
                </>
              ) : (
                <>
                  <p><strong>Nome:</strong> {colaboradorSelecionado.nome}</p>
                  <p><strong>Email:</strong> {colaboradorSelecionado.email}</p>
                  <p><strong>Cargo:</strong> {colaboradorSelecionado.cargo}</p>
                </>
              )}
            </div>
            <div className="modal-footer">
              {modoEdicao ? (
                <>
                  <button className="modal-btn-editar" onClick={salvarAlteracoes}>💾 Salvar</button>
                  <button className="modal-btn-excluir" onClick={() => setModoEdicao(false)}>Cancelar</button>
                </>
              ) : (
                <>
                  <button className="modal-btn-editar" onClick={() => setModoEdicao(true)}>✏ Editar</button>
                  <button className="modal-btn-excluir" onClick={() => excluirColaborador(colaboradorSelecionado.id)}>🗑 Excluir</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <CadastroColaboradorModal onCadastroSucesso={carregarUsuarios} />
    </div>
  );
};

export default ListaColaboradores;