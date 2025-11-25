import React from "react";

const colaboradores = [
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
    <div className="colaborador-item">
      <span className="colaborador-nome">{colaborador.nome}</span>
      <span className="colaborador-email">{colaborador.email}</span>
      <button className="btn-acoes" onClick={handleAcoesClick}>
        Ações
      </button>
    </div>
  );
};

const ListaColaboradores = ({ lista = colaboradores }) => {
  return (
    <div className="lista-colaboradores-container">
      <h2 className="lista-colaboradores-titulo">Colaboradores</h2>

      <div className="lista-colaboradores-grid">
        {lista.map((colaborador) => (
          <ColaboradorItem key={colaborador.id} colaborador={colaborador} />
        ))}
      </div>
    </div>
  );
};

export default ListaColaboradores;
