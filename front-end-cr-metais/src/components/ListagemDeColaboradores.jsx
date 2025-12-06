import React, { useState } from "react";
import "../styles/ListagemDeColaboradoresStyle.css";
import CadastroColaboradorModal from "./CadastroColaborador";

const colaboradoresIniciais = [
  { id: 1, nome: "Carlos Almeida", email: "carlosAlmeida@gmail.com" },
  { id: 2, nome: "Cláudio Filho", email: "claudioFilho@gmail.com" },
  { id: 3, nome: "João Vitor", email: "joaoVitor@gmail.com" },
  { id: 4, nome: "Wellington Souza", email: "wellSouza@gmail.com" },
  { id: 5, nome: "Alexandre Silva", email: "alexandreSilva@gmail.com" },
  { id: 6, nome: "Bruno Miranda", email: "brunoMiranda@gmail.com" },
  { id: 7, nome: "Ronaldo Ferraz", email: "ronaldoFerraz@gmail.com" },
  { id: 8, nome: "Jairo Torres", email: "jairoTorres@gmail.com" },
  { id: 9, nome: "Floriano Silveira", email: "florianoSilveira@gmail.com" },
  { id: 10, nome: "Luis Fernando", email: "luisFernando@gmail.com" },
  { id: 11, nome: "Paulo Muniz", email: "pauloMuniz@gmail.com" },
  { id: 12, nome: "Jorge Pereira", email: "jorgePereira@gmail.com" },
  { id: 13, nome: "Luis Fernando", email: "luisFernando@gmail.com" },
];

const ColaboradorItem = ({ colaborador }) => {
  const handleAcoesClick = () => {
    console.log(`Ações para ${colaborador.nome}`);
  };

  return (
    <div className="colaborador-line">
      <div className="colaborador-item">
        <span className="colaborador-nome">{colaborador.nome}</span>
        <span className="colaborador-email">{colaborador.email}</span>
        <button className="btn-acoes" onClick={handleAcoesClick}>
          Ações
        </button>
      </div>
      <div className="divisao"></div>
    </div>
  );
};

const ListaColaboradores = () => {
  const [colaboradores, setColaboradores] = useState(colaboradoresIniciais);

  return (
    <div className="lista-colaboradores-page">
      <div className="lista-colaboradores-container">
        <h1 className="lista-colaboradores-titulo">Colaboradores</h1>

        <div className="lista-colaboradores-grid">
          {colaboradores.map((colaborador) => (
            <ColaboradorItem key={colaborador.id} colaborador={colaborador} />
          ))}
        </div>
      </div>

      <div className="cadastro-colaborador-card">
        <CadastroColaboradorModal isOpen={true} onClose={() => {}} />
      </div>
    </div>
  );
};

export default ListaColaboradores;
