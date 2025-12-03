import React from "react";
import "../styles/ListagemDeColaboradoresStyle.css";

const clientes = [
  { id: 1, nome: "Carlos Almeida", reponsavel: "carlosAlmeida@gmail.com", tabela: "Alta" },
  { id: 2, nome: "Cláudio Filho", reponsavel: "claudioFilho@gmail.com", tabela: "Alta" },
  { id: 3, nome: "João Vitor", reponsavel: "joaoVitor@gmail.com", tabela: "Alta" },
  { id: 4, nome: "Wellington Souza", reponsavel: "wellSouza@gmail.com", tabela: "Alta" },
  { id: 5, nome: "Alexandre Silva", reponsavel: "alexandreSilva@gmail.com", tabela: "Alta" },
  { id: 6, nome: "Bruno Miranda", reponsavel: "brunoMiranda@gmail.com", tabela: "Alta" },
  { id: 7, nome: "Ronaldo Ferraz", reponsavel: "ronaldoFerraz@gmail.com", tabela: "Alta" },
  { id: 8, nome: "Jairo Torres", reponsavel: "jairoTorres@gmail.com", tabela: "Alta" },
  { id: 9, nome: "Floriano Silveira", reponsavel: "florianoSilveira@gmail.com", tabela: "Alta" },
  { id: 10, nome: "Luis Fernando", reponsavel: "luisFernando@gmail.com", tabela: "Alta" },
  { id: 11, nome: "Paulo Muniz", reponsavel: "pauloMuniz@gmail.com", tabela: "Alta" },
  { id: 12, nome: "Jorge Pereira", reponsavel: "jorgePereira@gmail.com", tabela: "Alta" },
  { id: 13, nome: "Luis Fernando", reponsavel: "luisFernando@gmail.com", tabela: "Alta" },
];

const ClienteItem = ({ cliente }) => {
  const handleAcoesClick = () => {
    console.log(`Ações para ${cliente.nome}`);
  };

  return (
    <div className="colaborador-line">
      <div className="colaborador-item">
        <span className="colaborador-nome">{cliente.nome}</span>
        <span className="colaborador-email">{cliente.reponsavel}</span>
        <span className="colaborador-email">{cliente.tabela}</span>
        <button className="btn-acoes" onClick={handleAcoesClick}>
          Ações
        </button>
      </div>
      <div className="divisao"></div>
    </div>
  );
};

const ListaClientes = ({ lista = clientes }) => {
  return (
    <div className="lista-colaboradores-container">
      <h1 className="lista-colaboradores-titulo">Clientes</h1>
      <br />

      <div className="lista-colaboradores-grid">
        {lista.map((cliente) => (
          <ClienteItem key={cliente.id} cliente={cliente} />
        ))}
      </div>
    </div>
  );
};

export default ListaClientes;