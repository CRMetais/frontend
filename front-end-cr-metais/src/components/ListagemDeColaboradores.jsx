import React, { useState } from "react";
import "../styles/ListagemDeColaboradoresStyle.css";
import CadastroColaboradorModal from "./CadastroColaborador";

const colaboradoresIniciais = [
  { id: 1, nome: "Carlos Almeida", email: "carlosAlmeida@gmail.com", cargo: "Vendedor", status: "Ativo" },
  { id: 2, nome: "Cláudio Filho", email: "claudioFilho@gmail.com", cargo: "Supervisor", status: "Ativo" },
  { id: 3, nome: "João Vitor", email: "joaoVitor@gmail.com", cargo: "Gerente", status: "Ativo" },
  { id: 4, nome: "Wellington Souza", email: "wellSouza@gmail.com", cargo: "Analista", status: "Inativo" },
  { id: 5, nome: "Alexandre Silva", email: "alexandreSilva@gmail.com", cargo: "Vendedor", status: "Ativo" },
];

const ColaboradorItem = ({ colaborador, onAcoesClick }) => {
  return (
    <div className="colaborador-line">
      <div className="colaborador-item">
        <span className="colaborador-nome">{colaborador.nome}</span>
        <span className="colaborador-email">{colaborador.email}</span>
        <button
          className="btn-acoes"
          onClick={() => onAcoesClick(colaborador)}
        >
          Ações
        </button>
      </div>
      <div className="divisao"></div>
    </div>
  );
};

const ListaColaboradores = () => {
  const [colaboradores, setColaboradores] = useState(colaboradoresIniciais);
  const [colaboradorSelecionado, setColaboradorSelecionado] = useState(null);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [dadosEditados, setDadosEditados] = useState({});

  const abrirModal = (colaborador) => {
    setColaboradorSelecionado(colaborador);
    setDadosEditados(colaborador);
    setModoEdicao(false);
  };

  const excluirColaborador = (id) => {
    const novaLista = colaboradores.filter((c) => c.id !== id);
    setColaboradores(novaLista);
    setColaboradorSelecionado(null);
  };

  const salvarAlteracoes = () => {
    const novaLista = colaboradores.map((c) =>
      c.id === dadosEditados.id ? dadosEditados : c
    );
    setColaboradores(novaLista);
    setColaboradorSelecionado(dadosEditados);
    setModoEdicao(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDadosEditados((prev) => ({
      ...prev,
      [name]: value,
    }));
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
        <div
          className="modal-overlay"
          onClick={() => setColaboradorSelecionado(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setColaboradorSelecionado(null)}
            >
              ×
            </button>

            <h1 className="modal-title">
              {modoEdicao ? "Editar Colaborador" : colaboradorSelecionado.nome}
            </h1>

            <div className="modal-grid">
              <div className="modal-section">
                <h3 className="modal-section-title">Informações</h3>

                <div className="modal-fields">

                  
                  {modoEdicao ? (
                    <input
                      type="text"
                      name="nome"
                      value={dadosEditados.nome}
                      onChange={handleChange}
                      className="modal-input"
                    />
                  ) : (
                    <p className="modal-field">
                      <strong>Nome:</strong> {colaboradorSelecionado.nome}
                    </p>
                  )}

                  
                  {modoEdicao ? (
                    <input
                      type="email"
                      name="email"
                      value={dadosEditados.email}
                      onChange={handleChange}
                      className="modal-input"
                    />
                  ) : (
                    <p className="modal-field">
                      <strong>E-mail:</strong> {colaboradorSelecionado.email}
                    </p>
                  )}

                 
                  {modoEdicao ? (
                    <input
                      type="text"
                      name="cargo"
                      value={dadosEditados.cargo}
                      onChange={handleChange}
                      className="modal-input"
                    />
                  ) : (
                    <p className="modal-field">
                      <strong>Cargo:</strong> {colaboradorSelecionado.cargo}
                    </p>
                  )}

                 
                  {modoEdicao ? (
                    <select
                      name="status"
                      value={dadosEditados.status}
                      onChange={handleChange}
                      className="modal-input"
                    >
                      <option value="Ativo">Ativo</option>
                      <option value="Inativo">Inativo</option>
                    </select>
                  ) : (
                    <p className="modal-field">
                      <strong>Status:</strong> {colaboradorSelecionado.status}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              {modoEdicao ? (
                <>
                  <button
                    className="modal-btn-editar"
                    onClick={salvarAlteracoes}
                  >
                    💾 Salvar
                  </button>

                  <button
                    className="modal-btn-excluir"
                    onClick={() => setModoEdicao(false)}
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="modal-btn-editar"
                    onClick={() => setModoEdicao(true)}
                  >
                    ✏ Editar
                  </button>

                  <button
                    className="modal-btn-excluir"
                    onClick={() =>
                      excluirColaborador(colaboradorSelecionado.id)
                    }
                  >
                    🗑 Excluir
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="cadastro-colaborador-card">
        <CadastroColaboradorModal isOpen={true} onClose={() => {}} />
      </div>
    </div>
  );
};

export default ListaColaboradores;